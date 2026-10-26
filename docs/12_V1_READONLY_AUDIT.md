# Known problems in Antigravity V1 to verify and correct in Codex V2

Old repo: https://github.com/allfridhosaragii/buat-vid commit `5de55c48fadd69330639cda2756be62fd0cf1321` (no writes).

- `remotion-project/src/Root.tsx`: `fps={60}` vs `FPS=30` and 6300 frames; **measure actual old MP4 if available** because CLI fps override could have been applied. Correct composition to 30fps.
- S02 QRIS story invented/unsupported `Rp 50.000` and illustrated balances 150,000→100,000; remove amounts or mark truly illustrative in layout, preferably remove.
- S03 UberEats `NOT SETTLED` stronger than the evidence; replace with *settlement not verified, possible authorization hold*.
- S04 Medusa `provider executed, response lost` is conditional, not confirmed settled payout.
- S09 `Coverage Rate 100%` is wrong metric; 97/97 passed means test pass rate, not code coverage.
- S09 historical PR Draft screenshot, although final 97/97 on a later PR SHA is supported; label historical distinctly or capture genuine read-only final output.
- S07/S08/S09 real screenshots often cropped by CSS `objectFit:cover` into short viewports; create readable camera crops or contain.
- Static `Subtitles.tsx` shows entire scene paragraph all at once; replace with actual word-timed captions based on audio.
- `test_boundaries.py` exit-code only does not prove no blank frames. Inspect decoded PNG pixel statistics and human visual contact sheets, actual export ffprobe, audio alignment.
- `Atomic mutex lock` terminology misstates fixture; genuine corrected refund path uses synchronous in-flight reservation before await.
- External PR risk findings remain POTENTIAL; no execution of arbitrary third-party PR code.
- Old V1 generated MP4 existed, but its claims in QA document are self-reported and not all independently confirmed.

Source-of-truth facts in `docs/06_FACT_AND_PROVENANCE_LEDGER.md` supersede speculative marketing phrases.
