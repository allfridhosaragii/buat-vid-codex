# ENGLISH VOICEOVER MASTER — FACTUAL BASELINE, ADJUST PACING NATURALLY

This is a draft, NOT audio already generated. Preserve exact factual boundaries; shorten within each scene if TTS pacing requires. The total film MUST remain 210 seconds. Check TTS voice and alignment, not just timings estimated from text.

S01 [00:00–00:12]
Behind every software failure, there can be a real person. A delayed purchase. Money temporarily unavailable. A retry that behaves differently than expected.

S02 [00:12–00:33]
In November 2025, an Indonesian customer publicly described a QRIS-funded app purchase. Their mobile banking balance decreased, but the purchase never appeared, and Google Play marked it cancelled. The report describes an experience, not a proven technical root cause.

S03 [00:33–00:50]
In April 2026, an Uber Eats customer described additional funds they could not use. The discussion raised a possible pending authorization hold. That is not proof of two settled charges, but the uncertainty still mattered.

S04 [00:50–01:10]
Developers face a related challenge. A September 2026 Medusa issue described a refund retry that could generate a new idempotency key. If the provider completed the first refund but its response was lost, the retry could potentially cause a second refund.

S05 [01:10–01:26]
Reliable systems need explicit business invariants. Stripe documents idempotent requests to guard against duplicate side effects when network calls are retried. The key question is not just whether code runs, but whether the rule still holds.

S06 [01:26–01:43]
Meet FlowGuard AI. A developer-focused tool for reasoning about behavioral risks, turning business requirements into testable expectations, and keeping possible risks distinct from observed verification evidence.

S07 [01:43–02:13]
Start with a code snippet or public GitHub pull request, then describe the rule that matters. The Requirement Analyst extracts invariants. The Risk Hunter identifies possible failure paths. The Verification Planner proposes assertions. External code findings remain labelled POTENTIAL. Reading a pull request is not executing it.

S08 [02:13–02:49]
Now watch our controlled Verification Lab. Two refund attempts run concurrently with the same logical key. In the deliberately vulnerable synthetic fixture, two side effects are committed. The invariant allows just one. VERIFIED FAIL. The corrected fixture reserves the key before waiting on asynchronous work. This time there is only one committed side effect. VERIFIED PASS. These are reproducible first-party simulations, not real bank payments.

S09 [02:49–03:12]
TestSprite also tested our actual engineering workflow. Earlier blocked checks drove improvements and repeat verification. The official TestSprite V3 suite on the final pull request head passed all ninety-seven tests, with zero failed and zero blocked, before the pull request was merged.

S10 [03:12–03:23]
After the merge, independent CI passed one hundred eighteen Vitest tests and seventy Chromium Playwright browser tests. Both results are linked to real GitHub runs.

S11 [03:23–03:30]
FlowGuard AI. Evidence before verdicts. Don't just review code. Prove the behavior.
