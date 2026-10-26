# Immutable fact / source ledger. Honest proof is the priority.

## Official FlowGuard AI data
- Actual app: https://flowguard-ai-smoky.vercel.app/
- Actual source repo: https://github.com/allfridhosaragii/FlowGuard-AI
- Final PR: https://github.com/allfridhosaragii/FlowGuard-AI/pull/14
- Official TestSprite V3 **97 PASSED, 0 failed, 0 blocked** on final PR head `0f575c33d3d424843885eac73b46f2ff4b832d0e` (not main squash SHA): https://www.testsprite.com/dashboard-v3/o/28a6d5ec-2a40-54eb-9bf6-0c87db224fde/projects/570eab99-607a-49fa-96b2-fe5ef724f2d9/execution/901e7027-1c4a-477f-adc9-ca0d17b16635
- Main merge commit `dd00c0b0a64712da5137c454927ef9c50cebd8be`; main postmerge CI 118/118 Vitest and 70/70 Chromium Playwright: https://github.com/allfridhosaragii/FlowGuard-AI/actions/runs/40273469302
- Final PR head and main squash have identical tree, but separate TestSprite execution on main is NOT demonstrated.
- Earlier tests included blocked cases; do not rewrite historical narrative as 100% clean from day one.

## Real-world examples and their uncertainty
- Reddit report Indonesia 2025: https://www.reddit.com/r/indotech/comments/1osvnyi/jebakan_betmen_apa_ada_yang_pernah_gagal/ — reportedly debited QRIS app purchase and Google Play cancelled, root cause unknown, amount unspecified. DO NOT invent Rp50,000 or bank account UI.
- Uber Eats report April 2026: https://www.reddit.com/r/UberEATS/comments/1sn6soa/uber_this_is_ridiculous/ — unavailable/pending funds discussed, possible authorization hold; neither settled double charge nor no-settlement is independently proven.
- Medusa GitHub issue #16681 Sep 2026: https://github.com/medusajs/medusa/issues/16681 — reports risky refund retry with a different idempotency key. If provider succeeded before response loss, a second refund could theoretically occur. NOT a verified customer double refund; FlowGuard did not fix that product.
- Stripe docs on idempotency: https://docs.stripe.com/api/idempotent_requests — supporting principle, not source of invented `INV-PAYMENT-001` standard.

## Actual product scope
- Agents: Requirement Analyst, Risk Hunter, Verification Planner. External PR snippet analysis creates POTENTIAL findings and proposed checks, no execution of arbitrary external code. AI neural inference opt-in, deterministic heuristic fallback possible; never claim each run uses live neural AI.
- Controlled first-party refund fixtures: 2 concurrent attempts; vulnerable 2 effects (`VERIFIED_FAIL`), corrected 1 (`VERIFIED_PASS`). Corrected design uses synchronous in-flight key/amount reservation before asynchronous work, not a distributed mutex. Do not depict actual bank withdrawals.
- SQL deadlock and healthy stream are synthetic models, not integrations to live production databases.
- Historic screenshot `github-pr14-checks.webp` shows earlier PR state / Draft and must be labelled HISTORICAL, not final run. Historic `testsprite-97-passed-overview.webp` is from earlier successful result; final run proof must use current official bot report and SHA.
- Labels: `Test Pass Rate 100%` okay for 97/97. `Code Coverage 100%` NOT demonstrated, must not appear.

## Source treatment
Always show concise attribution and link in final film description, strip personal usernames/account details from consumer reports. Public reports illustrate problem relevance; they are NOT historical origin proof that inspired the initial project, do not prove exact bug classes, and are not testimonials of FlowGuard AI.
