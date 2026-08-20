/**
 * Elizabeth Poynor — Brace Life Improvement Report
 * Brace Life Studios
 *
 * Compares two Styku scans on file for this client:
 *   Baseline: 2/7/2026 (105.0 lbs, uploaded this session — a simpler
 *             4-page report format with no segmental analysis/ALST/VFA/
 *             Shape Score page)
 *   Current:  8/7/2026 (114 lbs — the "Week 8 rescan" already
 *             incorporated into her training plan; 6-page report,
 *             first scan on file with segmental analysis)
 *
 * Because the 2/7 report has no ALST/VFA/Shape Score page, those three
 * metrics are presented as newly-established baselines (first available
 * 8/7/2026), not as a before/after comparison — nothing is fabricated
 * for the 2/7 side of those rows.
 *
 * Strength comparison is limited to Hex Deadlift, the only lift with an
 * exact documented prior number on file (175 lbs, per her training plan's
 * "Previous PR was 175 lbs" note). Hip Thrust, Push-Ups, and Plank are all
 * exceptional current baselines/PRs but have no exact prior number on
 * file, so they're described narratively rather than given a fabricated
 * "before" table value.
 *
 * LANGUAGE CORRECTION (8/17/2026, per CLAUDE.md's External Evidence Review
 * corrections — targeted framing fix only, no comparison numbers touched):
 * the "New Baselines Established" narrative labeled VFA 61.4 cm² as "Very
 * Low Risk" and ALST 5.85 kg/m² as flatly "Not At-Risk" with no further
 * qualification. CLAUDE.md's VFA risk-band table is retired entirely (no
 * absolute cm² reading gets a risk-band label in any client document any
 * longer) and the ALST table no longer implies a graded "how good" score
 * above the At-Risk line. Reworded both to trend-metric framing — same
 * numbers, corrected description only. See the same-day header revision
 * in `scripts/elizabeth_poynor_5day_plan.js` for the parallel fix (plus
 * the LIFTMOR ">85% 1RM" correction, which doesn't apply to this document).
 */

const fs = require('fs');
const path = require('path');
const { buildImprovementDoc } = require('../icons_template');

const client = {
  name: 'Elizabeth Poynor',
  subtitle: '6-Month Body Composition & Strength Progress',
  stats: ['Age 64', "5'5\"", 'Postmenopausal', 'Brace Life Studios'],
};

const data = {
  client,
  reportTitle: 'BRACE LIFE IMPROVEMENT REPORT',
  periodLabel: '2/7/2026  →  8/7/2026   ·   6-Month Progress Window',
  comparison: {
    title: 'Body Composition — Before & After',
    headers: ['Metric', '2/7/2026', '8/7/2026', 'Change'],
    rows: [
      ['Weight', '105.0 lbs', '114 lbs', '+9 lbs'],
      ['Body Fat %', '33.5%', '27.1%', '−6.4 pts'],
      ['Fat Mass', '35.2 lbs', '30.8 lbs', '−4.4 lbs'],
      ['Lean Mass', '65.6 lbs (62.5%)', '78.4 lbs (69.0%)', '+12.8 lbs'],
      ['Bone Mass', '4.2 lbs (4.0%)', '4.5 lbs (4.0%)', '+0.3 lbs'],
      ['Waist (Abdominal)', '29.9 in', '27.4 in', '−2.5 in'],
      ['Waist (Narrowest)', '29.6 in', '26.1 in', '−3.5 in'],
      ['Waist (Lower)', '29.4 in', '29.4 in', 'No change'],
      ['BMR', '1,122 cal/day', '1,159 cal/day', '+37 cal/day'],
      ['Body Fat Percentile', 'Lower than 50% of peers', 'Lower than 80% of peers', '+30 pts'],
    ],
  },
  narrative: [
    {
      type: 'green',
      label: 'A Genuine Body Recomposition',
      body: 'Over this 6-month window Elizabeth gained 12.8 lbs of lean mass while losing 4.4 lbs of fat mass — nearly 13 lbs of new muscle carried on a body that simultaneously got leaner. This is body recomposition, not just a number on the scale, and it is exactly what heavy compound lifting is supposed to do for a postmenopausal woman: muscle as medicine, working.',
    },
    {
      type: 'teal',
      label: 'New Baselines Established (8/7/2026)',
      body: 'The 2/7/2026 scan did not include segmental analysis, so ALST Index, VFA, and Shape Score have no prior comparison point — they are newly established at this rescan and become the tracking baseline going forward: ALST Index 5.85 kg/m² (Not At-Risk — within normal reference range, tracked as a trend metric), VFA 61.4 cm² (a low reading, worth tracking as a trend at future scans), Shape Score 98/100 (Excellent), BMI 18.9.',
    },
    {
      type: 'blue',
      label: 'Waist & Silhouette',
      body: 'Abdominal waist dropped 2.5 in (29.9→27.4) and narrowest waist dropped 3.5 in (29.6→26.1) — the visible shape change behind the recomposition above. Lower waist held essentially flat (29.4→29.4), suggesting the change is concentrated through the upper abdomen and natural waist rather than spread evenly. This is the "tall, open, sculpted" silhouette the ICONS system targets, not just a scale number.',
    },
    {
      type: 'watch',
      label: 'Bone Mass — Not the Same as Clinical Bone Density',
      body: 'Bone Mass rose 4.2→4.5 lbs (+0.3 lbs) while holding steady at 4.0% of total mass. This is Styku\'s soft-tissue-derived estimate, not a DEXA bone density scan or T-score — worth being precise about with Elizabeth so the gain isn\'t overstated. At 64 and postmenopausal, a true DEXA scan would be the next step to confirm bone density directly and screen LIFTMOR-protocol candidacy (T-score < -1.0) if she wants to pursue it.',
    },
    {
      type: 'gold',
      label: 'Strength Gains Beyond the Scan',
      body: 'The scan tells part of the story — the training log tells the rest. Hip Thrust 145 lbs ×5 (first documented heavy baseline for this lift), Push-Ups 28 reps, and a 2:00 plank hold are all exceptional current numbers with no directly comparable "before" on file, logged here as the current standard to build from rather than a fabricated improvement figure.',
    },
    {
      type: 'gold',
      label: '"You\'re not fragile. You\'re powerful, capable, and still evolving."',
      body: 'This is the ICONS mission statement made literal: a 64-year-old client adding 12.8 lbs of lean mass, improving her body-fat percentile by 30 points, and setting a new deadlift PR — visible, empowering change, not maintenance.',
    },
  ],
  strengthGains: {
    title: 'Strength Gains — Documented Before & After',
    headers: ['Lift', 'Previous PR', 'Current PR', 'Change'],
    rows: [
      ['Hex Bar Deadlift', '175 lbs', '195 lbs ×5 (Est. 1RM 228)', '+20 lbs'],
    ],
  },
  closingNote: 'Only lifts with an exact documented prior number are shown above — Hip Thrust, Push-Ups, and Plank Hold are exceptional current baselines noted in the callouts rather than given a fabricated "before" value.',
};

async function main() {
  const buffer = await buildImprovementDoc(data);
  const outDir = path.join(__dirname, '..', '..', 'clients', 'elizabeth_poynor');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'Elizabeth_Poynor_Brace_Life_Improvement_Report.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
