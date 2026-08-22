/**
 * ICONS Trainer Interview Gameplan — Brace Life Studios
 *
 * A run-of-show for interviewing a NEW TRAINER candidate: a verbal screen
 * plus a live physical practical, scored on one rubric, ending in a
 * documented hire / trial / no decision.
 *
 * Why this document type exists (added 8/22/2026, at Xolokan's request —
 * "im interviewing a new trainer today give me a good gameplan based on
 * our standards, it should include verbal & actual physical training"):
 *
 *   trainer_education/ already covers a trainer who is ALREADY HIRED —
 *   Format 1 (gated HTML knowledge modules), Format 2 (Train-the-Trainer
 *   physical programs), Format 3 (individual athlete programs). Nothing
 *   in the repo covered the step BEFORE onboarding: deciding whether to
 *   hire the person at all. This is that step.
 *
 * Design decisions worth knowing before editing:
 *
 *   1. The five stages are colored on the ICONS intensity ladder
 *      (60 teal -> 70 green -> 80 gold -> 90 red -> AR blue). That is
 *      deliberate: the interview escalates the same way a training week
 *      does, and the candidate physically feels the system's own
 *      structure during their interview.
 *
 *   2. ICONS-SPECIFIC NUMBERS ARE NOT PASS/FAIL. A candidate cannot be
 *      expected to know ALST 5.5 kg/m^2, the Block Method slot order, or
 *      the intensity color system — that is exactly what Format 1 and
 *      Format 2 exist to teach after hire. What IS pass/fail is safety
 *      judgment, scope discipline, coaching eye, and whether they bluff
 *      an answer instead of saying "I don't know." This distinction is
 *      written into the scorecard, not left to the interviewer's memory.
 *
 *   3. Every physical exercise in Stages 3 and 4 is selected from the
 *      confirmed in-studio inventory (CLAUDE.md "STUDIO EQUIPMENT"),
 *      inside the 60 lb/hand DB and 25 lb KB ceilings, and the Kieser is
 *      named rather than a nonexistent cable stack. The candidate is
 *      being tested in the room they would actually work in.
 *
 *   4. The planted scenarios test the two things this system cares most
 *      about and that a resume never shows: does the candidate SEE a
 *      fault, and does the candidate REFER instead of diagnose. Jason
 *      Bethea is the in-house ortho referral; pelvic floor stays an
 *      EXTERNAL referral, per CLAUDE.md's scope boundary — a candidate
 *      is not expected to name either, only to refer rather than treat.
 *
 *   5. Composed from icons_template.js primitives rather than through
 *      buildDocument(): an interview is not a training week, and forcing
 *      it into the days/blocks/exercises schema would have mislabeled
 *      the verbal stages with EXERCISE/SETS/REPS/LOAD table headers.
 *      Page setup, running header/footer, color system, dayHeader,
 *      exTable, baselinesTable, weeklySummary and every callout come
 *      from the engine unchanged — this is a new composition of the
 *      house primitives, not a second engine.
 *
 * Output: trainer_education/ICONS_Trainer_Interview_Gameplan.docx
 */

const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, PageBreak, AlignmentType,
} = require('docx');
const T = require('./icons_template');

const {
  C, PAGE_W, PAGE_H, MARGIN,
  buildHeader, buildFooter,
  coverHeader, clientStats, weekOverview, baselinesTable, weeklySummary,
  dayHeader, exTable, labeledPara,
  goldCallout, greenCallout, redCallout, tealCallout, blueCallout, purpleCallout,
  clinicalFlag, watchFlag, clearFlag,
  sectionTitle,
} = T;

// Local mirrors of the engine's private low-level helpers. Font/size
// defaults come from the document's default style, same as the engine.
const txt = (text, o = {}) => new TextRun({ text, font: 'Arial', ...o });
const para = (children, o = {}) => new Paragraph({ children, ...o });
const spacer = (after = 100) => new Paragraph({ children: [], spacing: { after } });
const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

// A verbal interview question: the ask, then a gray italic scoring line.
// Two paragraphs rather than one labeledPara, because the interviewer
// needs the question and the listen-for separated at a glance while
// talking to a person.
function question(num, tag, ask, listenFor, redFlag, accent) {
  return [
    ...labeledPara(`Q${num} · ${tag}`, ask, accent),
    para([
      txt('Listen for:  ', { bold: true, italics: true, size: 15, color: C.flagGreen }),
      txt(listenFor, { italics: true, size: 15, color: C.mid }),
      txt('     Red flag:  ', { bold: true, italics: true, size: 15, color: C.flagRed }),
      txt(redFlag, { italics: true, size: 15, color: C.mid }),
    ], { spacing: { after: 140 } }),
  ];
}

const children = [];

// ══════════════════════════════════════════════════════════════════════
// PAGE 1 — COVER & RUN OF SHOW
// ══════════════════════════════════════════════════════════════════════
children.push(...coverHeader(
  'Candidate: ______________________     Date: ______________',
  'Trainer Interview Gameplan',
  'Verbal Screen · Live Physical Practical · Scored Decision'
));
children.push(...clientStats([
  '105 minutes total',
  '5 stages',
  'Interviewer: Xolokan',
  'Mock client: staff member or interviewer',
  'One scorecard, filled in live',
]));

children.push(...weekOverview([
  { day: 'STAGE 1', intensity: 60, focus: 'Open & Fit\n15 min' },
  { day: 'STAGE 2', intensity: 70, focus: 'Method &\nScope · 25 min' },
  { day: 'STAGE 3', intensity: 80, focus: 'They Coach\nYou · 35 min' },
  { day: 'STAGE 4', intensity: 90, focus: 'They Lift\n15 min' },
  { day: 'STAGE 5', intensity: 'AR', focus: 'Build & Close\n15 min' },
]));

children.push(sectionTitle('How To Run This'));

children.push(...goldCallout('The Shape Of It',
  'The five stages escalate on the same intensity ladder a training week does — teal conversation, green method, gold live coaching, red their own lifting, blue close. That is not decoration: by the end of 105 minutes the candidate has physically been through the structure of the system they are applying to deliver, and you have watched them under each of its loads. Run them in order. The verbal stages set up the scenarios the physical stages then test for real.'));

children.push(...watchFlag('Tell The Candidate Before They Arrive',
  'This is a working interview and they need to know that in advance, in writing: bring training clothes and shoes, expect roughly 50 minutes on the floor, expect to both coach and lift. Nothing today is maximal — they get a real warm-up, moderate loads, and they choose their own working weight on every lift. A candidate who shows up in jeans because nobody told them is not a candidate who failed the practical; reschedule the physical half rather than score them on it.'));

children.push(...tealCallout('Who Plays The Client',
  'You, or a staff member who has agreed to it. Do not use a paying client as an interview prop without their explicit, advance consent — and if a client does agree, they are entitled to a normal, complete session, not a broken-up demo. Whoever plays the client needs to read the scenario card and the planted faults on Stage 3 beforehand, so the plants land naturally instead of being announced.'));

children.push(...greenCallout('What You Are Actually Measuring',
  'Not whether they can recite our thresholds — they cannot yet, and should not be able to. You are measuring four things a resume never shows: whether they SEE a movement fault without being told it is there, whether they REFER instead of diagnose when a client reports a symptom, whether they can build and defend a session order, and whether they take a correction inside the same hour they receive it. Everything on the scorecard is a proxy for one of those four.'));

children.push(...clinicalFlag('Do Not Fail A Candidate For Not Knowing Our Numbers',
  'ALST 5.5 kg/m², the Block Method slot order, the intensity color system, our asymmetry trigger, the RIR tiers — none of that is interview content. It is onboarding content, and we have three formats built to teach it (see trainer_education/README.md). A strong candidate will not know any of it today. What is disqualifying is a candidate who BLUFFS a number rather than saying "I don\'t know that one — how do you handle it here?" This studio\'s entire documentation practice depends on people who flag the edge of their own knowledge out loud. Test for that directly: ask at least one question you know they cannot answer, and score the honesty, not the answer.'));

children.push(...purpleCallout('The Population Filter',
  'We train women in their 40s to 60s through hormonal, physical and life transitions. The single most common disqualifier in this hire is a good general trainer who treats that client as a fragile version of a 25-year-old — lighter loads, more machines, more caution, less progress. The correct posture is the opposite: she is powerful, capable and still evolving, and she needs heavy compound loading more than almost anyone. Listen for that distinction all the way through Stage 1 and Stage 2. A candidate who defaults to fragility can be taught our numbers; they usually cannot be taught this.'));

// ══════════════════════════════════════════════════════════════════════
// PAGE 2 — SCORECARD
// ══════════════════════════════════════════════════════════════════════
children.push(pageBreak());
children.push(sectionTitle('Scorecard — Fill This In Live, Not From Memory'));

children.push(...baselinesTable([
  ['Coaching Eye', '20%', '___ / 5',
   'Named the planted fault within two reps, unprompted. Stopped or corrected before the set degraded further.'],
  ['Safety & Scope', 'GATE', 'PASS / FAIL',
   'Stopped the set on a reported symptom, did NOT name a condition, modified to pain-free work, said they would document it and refer out. Kept the client training rather than sending her home.'],
  ['Cue Economy & Voice', '15%',  '___ / 5',
   'One cue at a time, plain language, delivered before the rep not after it. The mock client actually moved better after the cue.'],
  ['Session Architecture', '15%', '___ / 5',
   'Sequenced activation before load, compound before accessory, and could defend the order when pushed. Did not stack three same-pattern lifts back to back.'],
  ['Load Judgment', '15%',  '___ / 5',
   'Picked a working load that landed near the stated effort target, then adjusted set to set off what they saw rather than off the plan.'],
  ['Population Fit', '15%',  '___ / 5',
   'Treated a 58-year-old client as capable, not breakable. Named at least one real physiological consideration without turning it into a reason to go light.'],
  ['Own Movement Quality', '10%', '___ / 5',
   'Moves well enough to demonstrate the lifts they would coach. Self-reported effort within about one rep of what you observed.'],
  ['Coachability', '10%', '___ / 5',
   'Took the live correction you gave them in Stage 3 and visibly applied it before the stage ended. Asked at least one question about how we do it.'],
], ['COMPETENCY', 'WEIGHT', 'SCORE', 'WHAT A PASS LOOKS LIKE']));

children.push(...redCallout('Hard Stops — Automatic No, Whatever The Total Says',
  'Named a medical condition or told the client what is wrong with her anatomically.  ·  Told a client reporting pain to push through it, breathe through it, or that it is normal.  ·  Invented a number, a certification, or a client outcome you can check.  ·  Dismissed or minimized a symptom the client volunteered.  ·  Loaded or spotted unsafely, or walked away from a loaded bar.  ·  Talked about a former client or employer in a way you would not want said about this studio.'));

children.push(...goldCallout('Decision — Write It Before You Leave The Room',
  'HIRE: gate passed, weighted score at or above 3.5, and you would put them with a real client inside two weeks.   ·   PAID OBSERVED TRIAL: gate passed, score 2.5–3.4, one specific fixable gap — name the gap and the session you will watch them run.   ·   NO: gate failed, score below 2.5, or any hard stop. Decide today. A scorecard filled in tomorrow is a memory of an interview, not a record of one.'));

children.push(...blueCallout('If You Hire Them — Their First Two Weeks',
  'Start at ICONS_Trainer_Learning_Module.html (ungated foundation, five modules, about 100 minutes), then one gated variant — A, B or C — chosen for whatever the scorecard says is thinnest: A for intensity and load judgment, B for zone structure and session architecture, C for baseline testing and rescan discipline. Then one physical Train-the-Trainer program, because you cannot coach what you have not felt. Do not hand a new hire the Aug 2026 delta module; it exists to un-teach corrections to trainers who certified before 8/17/2026, and a new trainer has nothing to unlearn.'));

// ══════════════════════════════════════════════════════════════════════
// PAGE 3 — STAGE 1 (VERBAL: OPEN & FIT)
// ══════════════════════════════════════════════════════════════════════
children.push(pageBreak());
children.push(...dayHeader(60, 'Stage 1 — Open & Fit',
  'Who They Are, Who They Have Trained, How They Think',
  'Verbal · 15 minutes · Conversation, not interrogation',
  { label: 'S1', sub: 'VERBAL' }));

children.push(...labeledPara('Run It Like This',
  'Talk, do not quiz. Every question below is open — if you get a one-line answer, follow it with "walk me through a specific client." Names and specifics are the signal; adjectives are not. Fifteen minutes is enough for four questions if you let them talk.',
  C.teal));

children.push(...question(1, 'Population',
  'Walk me through the last client you trained who was a woman in her fifties. What did you actually do differently for her than for a 28-year-old — and why?',
  'bone density, muscle preservation, recovery and sleep, joint tolerance, life load; heavy compound work framed as the answer, not the risk',
  '"same program, just lighter" · machines-only · treats age itself as the limitation',
  C.teal));

children.push(...question(2, 'Objection Handling',
  'A new client tells you she does not want to lift heavy because she will get bulky, and the last time she deadlifted she hurt her back. What do you say to her, in your actual words?',
  'takes the fear seriously first, then reframes with a real reason; offers a technique-first ramp-in and a concrete first step',
  'lectures her · dismisses the fear · promises she will not get hurt',
  C.teal));

children.push(...question(3, 'Self-Correction',
  'Tell me about a time you programmed something for a client that turned out to be wrong. What was the signal that told you, and what did you change?',
  'a specific client, a specific signal they noticed, an owned change; describes noticing before being told',
  'cannot produce one · blames the client\'s adherence · the mistake is secretly a strength',
  C.teal));

children.push(...question(4, 'Brand Fit',
  'Everything we hand a client is a written document with her actual numbers in it, and every session is expected to feel precise rather than casual. What does that ask of you on a Tuesday when you are tired and running late?',
  'concrete habits — writes loads down, prepares before the client arrives, treats documentation as part of coaching',
  'treats paperwork as overhead · "I keep it all in my head" · improvises the session on the floor',
  C.teal));

// ══════════════════════════════════════════════════════════════════════
// PAGE 3 (cont) — STAGE 2 (VERBAL: METHOD & SCOPE)
// ══════════════════════════════════════════════════════════════════════
children.push(spacer(200));
children.push(...dayHeader(70, 'Stage 2 — Method & Scope',
  'How They Build A Session, And Where They Stop',
  'Verbal · 25 minutes · The scope questions are the ones that matter',
  { label: 'S2', sub: 'VERBAL' }));

children.push(...labeledPara('Run It Like This',
  'These are answerable by any competent trainer from any background — none of them require knowing how we do it. Q9 through Q11 are the scope questions and they carry the most weight on the scorecard: a candidate who confidently answers a medical question is a bigger problem than a candidate who cannot sequence a session. Push back once on every answer, even a good one, and watch whether they defend it with a reason or fold.',
  C.green));

children.push(...question(5, 'Session Architecture',
  'You have sixty minutes with a client. Walk me through the order you put a session in, and tell me why that order and not another one.',
  'activation or corrective work first, main compound while fresh, accessory after, conditioning last if at all; can defend the order',
  'random order · cardio first "to warm up" · cannot explain why',
  C.green));

children.push(...question(6, 'Load Progression',
  'Same client, same lift, three weeks running. How do you decide when to add weight, hold it, or take some off?',
  'a rule they actually use — reps completed with clean form, effort left in the tank, what the last rep looked like',
  'adds weight every week on principle · "how she feels" with nothing behind it · never takes weight off',
  C.green));

children.push(...question(7, 'Effort & Failure',
  'Should a general client be training sets to failure? Make the case either way.',
  'no, not routinely; effort managed short of failure, failure reserved or avoided; can say why',
  '"no pain no gain" · every set to failure · cannot articulate a position at all',
  C.green));

children.push(...question(8, 'Sequencing Judgment',
  'A trainer hands you this block for a client: back squat, then Romanian deadlift, then walking lunges, back to back to back. Anything you would change?',
  'notices three same-pattern lifts stacked; swaps the third for a push or pull rather than deleting it',
  'sees no issue · deletes the exercise instead of resequencing · "she can handle it"',
  C.green));

children.push(...question(9, 'Scope — Symptom',
  'Mid-set on a heavy hip thrust, a client tells you she is feeling pressure and some leaking. What happens in the next sixty seconds, and what happens this week?',
  'stops the set, does not explain what it is, normalizes without minimizing, modifies to work she tolerates, documents it, refers to a pelvic floor specialist',
  'diagnoses it · tells her it is normal and continues · sends her home with nothing · has never heard of it and does not ask',
  C.green));

children.push(...question(10, 'Scope — Medical',
  'A client asks you three things in one session: should I be on hormone therapy, should I try a GLP-1, and should I take creatine. How do you answer each one?',
  'refers the first two out cleanly while staying useful about what training does; treats creatine as in-scope nutrition guidance',
  'answers all three with confidence · refuses to engage with any of them · gives a dosing protocol for a prescription drug',
  C.green));

children.push(...question(11, 'Scope — Pain',
  'A client says she gets a sharp pinch in the front of her shoulder at the top of an overhead press. She wants to keep pressing. What do you do today, and what do you do about next week?',
  'stops that movement, finds a pain-free pressing or pulling variation so she still trains, documents it, routes it to a physical therapist',
  'coaches through it · stretches it and continues · cancels all upper body work indefinitely',
  C.green));

children.push(...question(12, 'Constraint Handling',
  'Your client\'s schedule collapses from four days a week to two, permanently. What survives?',
  'full-body compound-first sessions, each major pattern still hit twice a week, accessory volume cut before compound',
  'keeps two of the four days as written · drops to maintenance · treats it as not worth programming',
  C.green));

children.push(...question(13, 'Coachability',
  'I am going to correct something you do in the next hour. Tell me about the last time a coach or manager corrected your coaching, and what you did with it.',
  'a real example, a specific change, no defensiveness; asks how feedback works here',
  'cannot recall being corrected · disagreed and kept doing it · defensive before you have corrected anything',
  C.green));

children.push(...question(14, 'Their Turn',
  'What do you want to ask me? — and hold the silence until they do.',
  'questions about the clients, the standards, how progress gets measured, what happens when something goes wrong',
  'only pay and hours · no questions at all · questions that show they did not look at the studio',
  C.green));

// ══════════════════════════════════════════════════════════════════════
// PAGE 4 — STAGE 3 (PHYSICAL: THEY COACH)
// ══════════════════════════════════════════════════════════════════════
children.push(pageBreak());
children.push(...dayHeader(80, 'Stage 3 — They Coach, You Are The Client',
  'The Stage That Actually Decides It',
  'Live practical · 35 minutes · Four blocks, two planted problems',
  { label: 'S3', sub: 'LIVE' }));

children.push(...labeledPara('Why This Stage Decides It',
  'Everything before this is what the candidate says about coaching. This is coaching. Hand them the scenario card, give them two minutes to look at the floor, then be the client — and be a real one: average effort, average attention, and the two planted problems below delivered as if you were not reading them off a page. Do not help. Do not fill silences. If they ask what equipment exists, point at the room.',
  C.gold));

children.push(...tealCallout('Scenario Card — Read Aloud, Then Hand It Over',
  '"Your client is 58, postmenopausal, six months of consistent training, no current injuries, cleared to lift. She wants to be strong and she is bored of being careful. Today is her main lower-body day. You have thirty minutes of her session and this room. Warm her up and take her through her main lift and one accessory. I am her."'));

children.push(...goldCallout('The Room They Have',
  'Squat rack and Olympic bar · hex/trap bar · dumbbells to 60 lbs per hand · kettlebells to 25 lbs · incline-capable bench · leg extension · hamstring curl · hyperextension · assisted pull-up · Kieser (this is our cable machine) · Total Gym · landmine · sled push · bike and rower · plyo boxes, bands, foam rollers, med balls. Nothing else exists. A candidate who programs a movement we do not own has told you something useful; a candidate who asks first has told you something better.'));

children.push(...exTable([
  {
    name: 'Candidate-Led Warm-Up',
    sets: '—', reps: '5 min', load: '—', tempo: '—', rest: '—',
    cue: 'Their content, their sequence, their voice. Say nothing.',
    insight: 'Score: does the warm-up prepare THIS day\'s lift — hips, T-spine, ankles — or is it a generic five minutes on the bike? Do they demonstrate, or only describe? Do they watch her do it, or set it and look at their phone?',
  },
  {
    name: 'Hex Bar Deadlift — Main Lift',
    sets: '3', reps: '5', load: 'They choose', tempo: 'Controlled', rest: '90–120s',
    cue: 'They set the load. Ask why that number, once.',
    flag: 'PLANT — on rep 3 of set 2, let your lower back round and your hips shoot up first.',
    insight: 'Score: do they see it within two reps? Do they stop the set or coach the next rep? Do they cue the fix in one sentence, or stack four cues? Do they drop the load, or just repeat the cue louder?',
  },
  {
    name: 'Accessory — Their Pick',
    sets: '2–3', reps: 'Their call', load: 'They choose', tempo: 'Their call', rest: '60–90s',
    cue: 'Ask: why this one, after that lift?',
    insight: 'Score: does the accessory complement the main lift or repeat it? Can they justify the choice in one sentence? Bonus signal if they pick a pattern the main lift did not already hammer.',
  },
  {
    name: 'Barbell Hip Thrust — Symptom Plant',
    sets: '2', reps: '8', load: 'Moderate', tempo: 'Controlled', rest: '90s',
    cue: 'Run this only if time allows — the plant matters more than the sets.',
    flag: 'PLANT — partway through set 2, say quietly: "I get some pressure down there when it gets heavy. Is that normal?"',
    insight: 'Score: THIS IS THE GATE. Pass = stops the set, does not name a condition, does not minimize it, keeps her training on something she tolerates, says they would write it down and get her to a specialist. Fail = diagnoses it, or says "that\'s normal, keep going."',
  },
  {
    name: 'Live Correction — Yours',
    sets: '1', reps: '—', load: '—', tempo: '—', rest: '—',
    cue: 'Correct one real thing you saw. Then keep going and watch.',
    insight: 'Score: coachability. Pick something genuine — a cue they buried, a load they left too light, a set they watched from six feet away. Did the correction show up in their behavior before the stage ended, or did they nod and carry on unchanged?',
  },
], 'gold'));

children.push(...watchFlag('Running The Plants Well',
  'Deliver both plants in the flow of the set, not as an announcement — the rounded back is a tired third rep, not a demonstration, and the symptom line is muttered, not declared. If the candidate misses the movement fault entirely, let the set finish and note it; do not rescue them. If they miss the symptom line, repeat it once more, louder, later in the set — a candidate who does not hear it the first time is a different finding from one who hears it and ignores it, and you want to know which one you have.'));

children.push(...blueCallout('Cool-Down',
  'Have them close the session the way they would close it for real — two minutes. What they say to her at the end, and whether they tell her what happens next, is the last thing she would remember about the session. Score it as part of Cue Economy & Voice.'));

// ══════════════════════════════════════════════════════════════════════
// PAGE 5 — STAGE 4 (PHYSICAL: THEY LIFT) + STAGE 5 (BUILD & CLOSE)
// ══════════════════════════════════════════════════════════════════════
children.push(pageBreak());
children.push(...dayHeader(90, 'Stage 4 — They Lift',
  'You Cannot Coach What You Have Not Felt',
  'Live practical · 15 minutes · Moderate loads only, no maximal attempts',
  { label: 'S4', sub: 'MODERATE' }));

children.push(...labeledPara('Why This Stage Exists',
  'Our entire trainer-education track is built on the principle that a trainer runs the method on themselves before running it on a client. This is the fifteen-minute version of that, on the interview floor. Nothing here is a test of how strong they are, and you should say so out loud — they pick every load, and there are no maximal attempts. What you are watching is whether the lifts look like movements they have actually done, and whether their own report of their own effort matches what you can see.',
  C.red));

children.push(...redCallout('Say This Before They Start',
  '"Nothing here is a max. You pick every weight. If anything hurts, stop — that is the correct answer, not a failed test." Then let them warm themselves up. How a trainer warms up for their own lifting tells you what they believe about warming up a client.'));

children.push(...exTable([
  {
    name: 'Goblet Squat',
    sets: '2', reps: '8', load: 'Their pick', tempo: '3-0-1', rest: '60s',
    cue: 'Before set 2: "How many more could you have done?"',
    insight: 'Score: depth with control, ribs stacked over pelvis, no heel lift. Then compare their answer to what you saw — a self-report inside about one rep of reality is the signal; being wrong by four reps in either direction is the finding.',
  },
  {
    name: 'Hex Bar Deadlift',
    sets: '2', reps: '5', load: 'Their pick', tempo: 'Controlled', rest: '90s',
    cue: 'The same lift they just coached. Watch the difference.',
    insight: 'Score: does their own hinge look like the one they were cueing ten minutes ago? A candidate who coaches a braced neutral spine and then rounds their own is not a liar — they are a trainer who has never been coached. That is a trial, not a no.',
  },
  {
    name: 'Half-Kneeling Landmine Press',
    sets: '2', reps: '8 / side', load: 'Their pick', tempo: 'Controlled', rest: '60s',
    cue: 'Unilateral and scap-friendly — watch the ribs.',
    insight: 'Score: do they hold position on the working side, or lean and arch to finish the rep? This is the press variation we reach for with a shoulder-limited client, so a candidate who has never done one is worth watching learn it in real time.',
  },
  {
    name: 'Suitcase Carry',
    sets: '2', reps: '30 yd', load: '≤ 25 lb KB', tempo: '—', rest: '60s',
    cue: 'One hand. Walk tall, do not lean away from it.',
    insight: 'Score: posture under an asymmetrical load — the whole point of the carry. Also a low-stakes read on whether they can hold a quiet, upright, unhurried line, which is the posture standard we coach.',
  },
  {
    name: 'Plank Hold',
    sets: '1', reps: 'To form break', load: 'Bodyweight', tempo: '—', rest: '—',
    cue: 'Call it yourself when your form breaks. I am timing.',
    insight: 'Score: honesty. The instruction is to stop at form break, not at failure. A candidate who holds a sagging plank for another forty seconds to post a number has answered a question about ego that no interview question reaches.',
  },
], 'red'));

children.push(spacer(200));
children.push(...dayHeader('AR', 'Stage 5 — Build & Close',
  'One Whiteboard Session, Then The Decision',
  'Whiteboard + conversation · 15 minutes',
  { label: 'S5', sub: 'CLOSE' }));

children.push(...labeledPara('The Whiteboard Task',
  'Give them the marker and ten minutes: "Same 58-year-old client. She trains three days a week. Build me day one — the movements and the order, not the loads — using only the equipment in this room, and then talk me through why it is in that order." This is the single most predictive ten minutes of the interview, because it is the actual job. Let them work in silence, then push on two choices and see whether they defend with a reason or fold.',
  C.blue));

children.push(...blueCallout('What A Strong Board Looks Like',
  'Something that prepares her before it loads her, puts the heaviest compound lift where she is freshest, follows it with work that complements rather than repeats the same pattern, and closes with something integrated or conditioning rather than trailing off. Real equipment throughout. Reasoning available for every slot. You are not looking for our block architecture by name — you are looking for a person who thinks in structure at all, because that is the half we cannot teach quickly.'));

children.push(...goldCallout('Close It Properly',
  'Tell them what happens next and when — a date, not "we\'ll be in touch." If you already know it is a no, say the timeline anyway and send it in writing tomorrow; this industry is small and how a studio closes an interview travels. Then, before you talk to anyone else, finish the scorecard on page two and write the decision line. Five minutes now is worth more than an hour of recall next week.'));

children.push(...clearFlag('Last Thing To Ask Yourself',
  'Would you put this person alone in a room with your most complicated client — the one with the rehab flag, the one who is nervous, the one who will quit if a session goes badly — inside two weeks? If the honest answer is yes, hire them. If it is "yes, once they learn our system," that is also a yes, and that is what onboarding is for. If it is "maybe, if they change how they are," it is a no.'));

// ══════════════════════════════════════════════════════════════════════
// PAGE 6 — LIVE NOTES GRID
// ══════════════════════════════════════════════════════════════════════
children.push(pageBreak());
children.push(sectionTitle('Live Notes — Write As You Go'));

children.push(...weeklySummary([
  ['S1', '15 min', 'Open & Fit', 'Q1–Q4', ' '],
  ['S2', '25 min', 'Method & Scope', 'Q5–Q14 · scope = Q9–Q11', ' '],
  ['S3', '35 min', 'They Coach', 'Warm-up · main lift · plant 1 · plant 2 · correction', ' '],
  ['S4', '15 min', 'They Lift', 'Squat · hinge · press · carry · plank', ' '],
  ['S5', '15 min', 'Build & Close', 'Whiteboard day one · their questions', ' '],
], ['STAGE', 'TIME', 'FOCUS', 'WHAT HAPPENS', 'WHAT YOU ACTUALLY SAW']));

children.push(spacer(160));
children.push(...labeledPara('Gate — Safety & Scope',
  'PASS  /  FAIL          (a fail here ends it regardless of every other score)',
  C.flagRed));
children.push(...labeledPara('Weighted Score',
  '________ / 5',
  C.gold));
children.push(...labeledPara('Decision',
  'HIRE          ·          PAID OBSERVED TRIAL          ·          NO',
  C.dark));
children.push(...labeledPara('If Trial — The One Gap To Watch',
  '________________________________________________________________________________________',
  C.flagAmber));
children.push(...labeledPara('If Hire — Which Module First',
  'A (Intensity Build)     ·     B (Three-Zone Practicum)     ·     C (Baseline to Rescan)',
  C.green));
children.push(...labeledPara('Signed',
  '________________________________________          Date  ______________________',
  C.mid));

children.push(spacer(240));
children.push(para([txt('BRACE LIFE STUDIOS  ·  ICONS INDEX  ·  bracelifestudios.com', { bold: true, size: 18, color: C.gold })], {
  alignment: AlignmentType.CENTER, spacing: { after: 40 },
}));
children.push(para([txt('Internal hiring document. Confidential — not for candidate distribution.', { italics: true, size: 16, color: C.mid })], {
  alignment: AlignmentType.CENTER,
}));

// ══════════════════════════════════════════════════════════════════════
// ASSEMBLE
// ══════════════════════════════════════════════════════════════════════
async function main() {
  const doc = new Document({
    sections: [{
      properties: {
        page: {
          size: { width: PAGE_W, height: PAGE_H },
          margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
        },
      },
      headers: { default: buildHeader('Trainer Interview', 'Interview Gameplan · Verbal + Physical') },
      footers: { default: buildFooter('Trainer Interview', 'Internal Hiring Document  |  Confidential') },
      children,
    }],
    styles: { default: { document: { run: { font: 'Arial', size: 17, color: C.dark } } } },
  });

  const buffer = await Packer.toBuffer(doc);
  const outDir = path.join(__dirname, '..', 'trainer_education');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'ICONS_Trainer_Interview_Gameplan.docx');
  fs.writeFileSync(outPath, buffer);
  console.log('Wrote', outPath);
}

main().catch((err) => { console.error(err); process.exit(1); });
