#!/usr/bin/env node
/**
 * ICONS automation pipeline.
 *
 * For every client folder under clients/<slug>/:
 *   1. If intake.md changed since last run, ask Claude (via the Agent SDK,
 *      using docs/ICONS_System_Prompt.md as its system prompt) to structure
 *      it into clients/<slug>/data.json, applying the ICONS science layer.
 *   2. If data.json changed since last run, run it through the pre-export
 *      validation gate (src/validate.mjs — catches things like a "weaker
 *      side" claim that contradicts the raw Styku numbers, stray
 *      generation artifacts, and overlong cues). Any error-level finding
 *      blocks rendering. On a clean pass, render to
 *      deliverables/<slug>/<slug>.docx and .pdf via the deterministic
 *      engines, then audit the PDF for overflow.
 *
 * State (content hashes) is tracked per-client in clients/<slug>/.state.json
 * so unchanged clients are skipped on every run.
 *
 * Usage:
 *   node src/generate.mjs            # process every client
 *   node src/generate.mjs <slug>...  # process only the named client(s)
 */

import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { query } from '@anthropic-ai/claude-agent-sdk';
import { validateClientData, formatIssues } from './validate.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const CLIENTS_DIR = path.join(REPO_ROOT, 'clients');
const DELIVERABLES_DIR = path.join(REPO_ROOT, 'deliverables');
const SYSTEM_PROMPT_PATH = path.join(REPO_ROOT, 'docs', 'ICONS_System_Prompt.md');
const RENDER_DOCX_SCRIPT = path.join(REPO_ROOT, 'my-agent', 'engine', 'render.cjs');
const RENDER_PDF_SCRIPT = path.join(REPO_ROOT, 'my-agent', 'scripts', 'icons_pdf.py');
const PYTHON_BIN = process.env.ICONS_PYTHON || 'python3';

function sha256(text) {
  return createHash('sha256').update(text).digest('hex');
}

function readJsonSafe(p) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return null;
  }
}

function writeJson(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
}

function listClientSlugs() {
  return fs
    .readdirSync(CLIENTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_') && !d.name.startsWith('.'))
    .map((d) => d.name);
}

async function structureIntake(slug, intakePath, dataPath) {
  const systemPrompt = fs.readFileSync(SYSTEM_PROMPT_PATH, 'utf8');
  const intake = fs.readFileSync(intakePath, 'utf8');

  const prompt = [
    'You are structuring a new ICONS client intake into the canonical data.json schema.',
    `Client slug: ${slug}`,
    `Raw intake notes:\n---\n${intake}\n---`,
    'Apply the ICONS science layer precisely: ALST thresholds, protein targets, ' +
      'weaker-side determination from Styku segmental LST (the LOWER number is the ' +
      'weaker side and leads all unilateral work), RIR language (never %RM effort ' +
      'language), coaching cues under ~50 characters, pelvic floor notes for ' +
      'postmenopausal clients on heavy carry/hip-thrust days, and clinical flags ' +
      '(clinicalFlag/watchFlag notes in baselineNotes) where thresholds are crossed.',
    `Write the result ONLY to clients/${slug}/data.json as a single JSON object ` +
      'matching the buildDocument() schema documented in the system prompt under ' +
      '"buildDocument() Full Data Schema". The file must be raw JSON parseable by ' +
      'JSON.parse — no markdown fences, no commentary. Do not write or edit any other file.',
  ].join('\n\n');

  let finalResult = null;
  for await (const message of query({
    prompt,
    options: {
      cwd: REPO_ROOT,
      systemPrompt,
      allowedTools: ['Read', 'Write'],
      permissionMode: 'acceptEdits',
      maxTurns: 20,
    },
  })) {
    if (message.type === 'result') {
      finalResult = message;
    }
  }

  // A turn-limit or other mid-flight error doesn't necessarily mean the
  // write failed — the agent may have already written a complete,
  // well-formed data.json before running out of turns on self-review.
  // Trust the file on disk over the SDK's result subtype: only hard-fail
  // when there's no usable output.
  const parsed = fs.existsSync(dataPath) ? readJsonSafe(dataPath) : null;

  if (!parsed) {
    throw new Error(`[${slug}] intake structuring failed: ${finalResult?.subtype || 'no result'}, and no valid data.json was written`);
  }
  if (!finalResult || finalResult.is_error) {
    console.warn(`[${slug}] agent finished with "${finalResult?.subtype || 'no result'}" but data.json is valid JSON — proceeding`);
  }
  return parsed;
}

function renderDeliverables(slug, dataPath) {
  const outDir = path.join(DELIVERABLES_DIR, slug);
  fs.mkdirSync(outDir, { recursive: true });
  const docxPath = path.join(outDir, `${slug}.docx`);
  const pdfPath = path.join(outDir, `${slug}.pdf`);

  const docxRun = spawnSync('node', [RENDER_DOCX_SCRIPT, dataPath, docxPath], { stdio: 'inherit' });
  if (docxRun.status !== 0) {
    throw new Error(`[${slug}] docx render failed (exit ${docxRun.status})`);
  }

  const pdfRun = spawnSync(PYTHON_BIN, [RENDER_PDF_SCRIPT, dataPath, pdfPath], { stdio: 'inherit' });
  if (pdfRun.status !== 0) {
    throw new Error(`[${slug}] pdf render/audit failed (exit ${pdfRun.status})`);
  }
}

async function processClient(slug) {
  const dir = path.join(CLIENTS_DIR, slug);
  const intakePath = path.join(dir, 'intake.md');
  const dataPath = path.join(dir, 'data.json');
  const statePath = path.join(dir, '.state.json');
  const state = readJsonSafe(statePath) || {};
  let touched = false;

  if (fs.existsSync(intakePath)) {
    const intakeHash = sha256(fs.readFileSync(intakePath, 'utf8'));
    if (intakeHash !== state.intakeHash) {
      console.log(`[${slug}] intake.md changed — structuring via Claude agent...`);
      await structureIntake(slug, intakePath, dataPath);
      state.intakeHash = intakeHash;
      touched = true;
    }
  }

  if (!fs.existsSync(dataPath)) {
    console.log(`[${slug}] no data.json yet — nothing to render`);
    writeJson(statePath, state);
    return false;
  }

  const dataHash = sha256(fs.readFileSync(dataPath, 'utf8'));
  if (dataHash !== state.dataHash || touched) {
    const parsed = readJsonSafe(dataPath);
    const issues = validateClientData(parsed);
    const errors = issues.filter((i) => i.severity === 'error');
    const warnings = issues.filter((i) => i.severity === 'warning');
    if (warnings.length) {
      console.warn(`[${slug}] validation warnings:\n${formatIssues(warnings)}`);
    }
    if (errors.length) {
      throw new Error(
        `[${slug}] pre-export validation failed — not rendering. Fix and rerun:\n${formatIssues(errors)}`,
      );
    }
    console.log(`[${slug}] validation clean — rendering deliverables...`);
    renderDeliverables(slug, dataPath);
    state.dataHash = dataHash;
    state.generatedAt = new Date().toISOString();
    writeJson(statePath, state);
    console.log(`[${slug}] done → deliverables/${slug}/`);
    return true;
  }

  console.log(`[${slug}] up to date`);
  return false;
}

async function main() {
  const requested = process.argv.slice(2);
  const slugs = requested.length ? requested : listClientSlugs();
  let anyGenerated = false;

  for (const slug of slugs) {
    try {
      const generated = await processClient(slug);
      anyGenerated = anyGenerated || generated;
    } catch (err) {
      console.error(`[${slug}] ERROR: ${err.message}`);
      process.exitCode = 1;
    }
  }

  if (anyGenerated) {
    console.log('New or updated deliverables were generated.');
  } else {
    console.log('No client changes detected — nothing to generate.');
  }
}

main();
