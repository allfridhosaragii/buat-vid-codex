/**
 * Locked Scene Manifest & Subtitle Timings
 * Source of Truth: 03_SCENE_MANIFEST_6300_FRAMES.json and 04_VOICEOVER_EN.txt
 */

export interface SceneMeta {
  id: string;
  name: string;
  from: number;
  durationInFrames: number;
  toExclusive: number;
  seconds: number;
  brief: string;
  sourceUrls: string[];
  citationLabel?: string;
  subtitle: string;
}

export const SCENES: SceneMeta[] = [
  {
    id: 'S01',
    name: 'Hook',
    from: 0,
    durationInFrames: 360,
    toExclusive: 360,
    seconds: 12.0,
    brief: 'Human impact, conceptual animation',
    sourceUrls: [],
    subtitle:
      'Behind every software failure, there can be a real person. A delayed purchase. Money temporarily unavailable. A retry that behaves differently than expected.',
  },
  {
    id: 'S02',
    name: 'Indonesian QRIS report',
    from: 360,
    durationInFrames: 630,
    toExclusive: 990,
    seconds: 21.0,
    brief: 'Documented public Reddit report',
    sourceUrls: [
      'https://www.reddit.com/r/indotech/comments/1osvnyi/jebakan_betmen_apa_ada_yang_pernah_gagal/',
    ],
    citationLabel: 'Reddit r/indotech · Nov 2025 · Public user report · Cause unverified',
    subtitle:
      'In November 2025, an Indonesian customer publicly described a QRIS-funded app purchase. Their mobile banking balance had decreased, but the purchase never appeared, and Google Play marked it cancelled. The report describes the experience—not a verified technical root cause.',
  },
  {
    id: 'S03',
    name: 'Uber Eats pending hold report',
    from: 990,
    durationInFrames: 510,
    toExclusive: 1500,
    seconds: 17.0,
    brief: 'Documented customer report; hold is not proven double settlement',
    sourceUrls: [
      'https://www.reddit.com/r/UberEATS/comments/1sn6soa/uber_this_is_ridiculous/',
    ],
    citationLabel: 'Reddit r/UberEATS · Apr 2026 · Pending hold discussion · Illustrative',
    subtitle:
      'In April 2026, an Uber Eats customer reported extra funds they could not use. Commenters pointed to a pending authorization hold, rather than a proven second settled charge. The impact of uncertainty was still real.',
  },
  {
    id: 'S04',
    name: 'Medusa developer bug report',
    from: 1500,
    durationInFrames: 600,
    toExclusive: 2100,
    seconds: 20.0,
    brief: 'Public GitHub issue; conditional duplicate refund risk',
    sourceUrls: [
      'https://github.com/medusajs/medusa/issues/16681',
    ],
    citationLabel: 'GitHub medusajs/medusa #16681 · Sep 2026 · Conditional retry risk',
    subtitle:
      'Developers face a related engineering challenge. A September 2026 Medusa issue described a refund retry that could generate a different idempotency key after a provider error. If the first refund succeeded but its response was lost, another refund could become possible.',
  },
  {
    id: 'S05',
    name: 'Business invariant',
    from: 2100,
    durationInFrames: 480,
    toExclusive: 2580,
    seconds: 16.0,
    brief: 'Stripe idempotency docs',
    sourceUrls: [
      'https://docs.stripe.com/api/idempotent_requests',
    ],
    citationLabel: 'Stripe API Documentation · Idempotent Requests · Engineering invariant',
    subtitle:
      "That is why payment systems need explicit invariants. Stripe's documentation explains idempotent requests: retries should not silently duplicate an operation. The question is not only whether code runs—but whether the business rule still holds.",
  },
  {
    id: 'S06',
    name: 'Meet FlowGuard AI',
    from: 2580,
    durationInFrames: 510,
    toExclusive: 3090,
    seconds: 17.0,
    brief: 'Actual product homepage asset',
    sourceUrls: [
      'https://flowguard-ai-smoky.vercel.app/',
    ],
    citationLabel: 'FlowGuard AI · Production Web Interface · Vercel Deployment',
    subtitle:
      'Meet FlowGuard AI. Built to help developers reason about behavioral risk, turn a business requirement into testable expectations, and distinguish suspected bugs from observed proof.',
  },
  {
    id: 'S07',
    name: 'Three-stage analysis',
    from: 3090,
    durationInFrames: 900,
    toExclusive: 3990,
    seconds: 30.0,
    brief: 'Actual screenshots and roles, POTENTIAL only',
    sourceUrls: [
      'https://github.com/allfridhosaragii/FlowGuard-AI',
    ],
    citationLabel: 'FlowGuard Multi-Agent Pipeline · External findings labelled POTENTIAL',
    subtitle:
      "Start with a code snippet or a public GitHub pull request, then describe the rule that matters. FlowGuard's Requirement Analyst extracts invariants. Its Risk Hunter flags possible failure paths. Its Verification Planner proposes assertions to investigate. Findings from external code remain labelled POTENTIAL. Reading a pull request is not the same as executing it.",
  },
  {
    id: 'S08',
    name: 'Controlled verification lab',
    from: 3990,
    durationInFrames: 1080,
    toExclusive: 5070,
    seconds: 36.0,
    brief: '2 vs 1 side effects, first-party synthetic fixtures',
    sourceUrls: [
      'https://github.com/allfridhosaragii/FlowGuard-AI',
    ],
    citationLabel: 'Controlled Verification Lab · First-party synthetic fixtures only',
    subtitle:
      'Now watch our controlled Verification Lab. With two concurrent refund attempts and the same logical key, the intentionally vulnerable synthetic fixture commits two side effects. The invariant allows only one, so the observed result is VERIFIED FAIL. Switch to the corrected fixture under the same controlled rule: just one side effect. VERIFIED PASS. These are reproducible first-party simulations—not claims about a real bank or an external repository.',
  },
  {
    id: 'S09',
    name: 'Final TestSprite evidence',
    from: 5070,
    durationInFrames: 690,
    toExclusive: 5760,
    seconds: 23.0,
    brief: 'Actual official 97/97 on final PR head',
    sourceUrls: [
      'https://github.com/allfridhosaragii/FlowGuard-AI/pull/14',
      'https://www.testsprite.com/dashboard-v3/o/28a6d5ec-2a40-54eb-9bf6-0c87db224fde/projects/570eab99-607a-49fa-96b2-fe5ef724f2d9/execution/901e7027-1c4a-477f-adc9-ca0d17b16635',
    ],
    citationLabel: 'Official TestSprite V3 · PR #14 final head 0f575c3 · 97/97 Passed',
    subtitle:
      'The engineering workflow was tested too. TestSprite automatically ran on our GitHub pull request. Earlier blocked checks prompted real improvements and repeat verification. On the final PR head, the official TestSprite V3 suite passed all ninety-seven tests, with zero failures and zero blocked cases, before merge.',
  },
  {
    id: 'S10',
    name: 'Postmerge CI',
    from: 5760,
    durationInFrames: 330,
    toExclusive: 6090,
    seconds: 11.0,
    brief: '118/118 Vitest and 70/70 Chromium Playwright',
    sourceUrls: [
      'https://github.com/allfridhosaragii/FlowGuard-AI/actions/runs/40273469302',
    ],
    citationLabel: 'GitHub Actions Run 40273469302 · main @ dd00c0b · Post-merge CI',
    subtitle:
      'After merge, our independent CI also passed one hundred eighteen unit tests and seventy Chromium browser tests. Each result links back to a verifiable run.',
  },
  {
    id: 'S11',
    name: 'Closing',
    from: 6090,
    durationInFrames: 210,
    toExclusive: 6300,
    seconds: 7.0,
    brief: 'Brand and public app URL',
    sourceUrls: [
      'https://flowguard-ai-smoky.vercel.app/',
    ],
    citationLabel: 'FlowGuard AI · flowguard-ai-smoky.vercel.app',
    subtitle:
      "FlowGuard AI. Evidence before verdicts. Don't just review code. Prove the behavior.",
  },
];

export const TOTAL_FRAMES = 6300;
export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
