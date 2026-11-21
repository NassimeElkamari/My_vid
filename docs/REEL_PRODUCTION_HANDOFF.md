# Reel production handoff: English brand and واش عارف؟

**Project:** `my-video`  
**Handoff snapshot:** 20 November 2026  
**Intended reader:** the user, a future ChatGPT/Codex chat, or another collaborator working on upcoming reels.

This file records the current project, what was built, the user's feedback and approvals, and a practical starting point for future reels. It is a handoff snapshot, not proof that any reel has been published or that every creative choice applies to every future reel. Inspect the actual project and the user's latest instructions before changing anything.

## 1. Start here

1. Read this file, then inspect `src/Root.tsx`, `package.json`, the relevant composition, and the working tree (`git status --short`). Existing work may be uncommitted or untracked: do not discard, overwrite, rename, or reset it.
2. Confirm which brand and composition the user wants to work on. The English reel and Darija reel share a technical project but have separate visual identities and scene implementations.
3. Preserve an existing reel and its assets unless the user asks to change it. For a new reel, prefer a separately registered composition and separately organized files rather than replacing an existing composition.
4. Inspect the actual narration, script, assets, and license records. Use the supplied approved wording; do not silently invent, translate, or formalize Darija. Mark uncertainty and verify it rather than treating automated transcription as authoritative.
5. Make timing, subtitle, and audio cues easy to adjust. Render to a new descriptive filename; the repository's Remotion config enables output overwriting, so check the target path before rendering.
6. Follow the current request's scope and approval instructions. In the lightning project, the user reviewed a subtitle plan and a short audio test before full integration. Those were approvals for those particular steps and assets, not permission to publish or a blanket rule that all future tasks must pause.
7. Report what actually changed, what was tested, where the preview is, what remains uncertain, and whether a result is a draft, a user-approved test, or a published deliverable.

## 2. The two content brands

### Existing English cinematic documentary reel

- **Composition ID:** `InternetDisappearsPreview`.
- **Topic:** a hypothetical 24-hour global internet disappearance, presented as a cinematic documentary. The on-screen hook says “WHAT IF THE INTERNET DIED?”
- **Status in this handoff:** this composition already existed when the Darija work began. We inspected it as a technical foundation. The subsequent Darija-specific work did not intentionally redesign its scenes. Its current working-tree files may already have pre-existing changes; do not infer their origin from this handoff.
- **Identity:** dark cinematic documentary, near-black/navy backgrounds, blue/cyan highlights, warning red, atmospheric lighting, global network and technology imagery. This should remain distinct from the Darija brand.
- **Current format:** 1080 × 1920, 30 fps, 1,350 frames / 45 seconds; `src/styles/theme.ts` is the source of truth.
- **Scenes:** hook (5 s), first hour (7 s), finance (10 s), logistics (13 s), conclusion (10 s). See the five components in `src/scenes/` and registration in `src/Composition.tsx`.
- **Audio:** separate scene narration files, a music track, and seven scheduled sound effects. `src/audio/music.ts` uses the music source segment 90–135 seconds and a frame-based volume envelope; `src/audio/soundEffects.ts` contains effect timing and gains. Verify the actual source and permissions of `public/audio/music/background.mp3` before reusing it: this project snapshot did not establish its provenance or license. The effects have a source record at `public/audio/sfx/LICENSES.md`.
- **Existing preview:** `out/internet-disappears-music-preview.mp4`. Its presence is not by itself proof of final approval or publication.

### Darija educational brand: واش عارف؟

- **Brand language:** Moroccan Darija in Arabic script. Keep the user's actual wording and a natural local voice. Badr is the narrator of the first Darija reel.
- **Visual direction requested:** modern educational motion graphics; warm cream/off-white, electric blue, yellow and orange; bold Arabic typography; playful but sophisticated scientific storytelling. The user wanted it to feel substantially different from the English cinematic documentary.
- **Creative standard:** strong visual storytelling, meaningful motion, animated scientific elements and character actions rather than static cards or PowerPoint-style slides. Let the narration drive timing. Keep the layout clean and concise.
- **Typography:** project-local `public/fonts/darija/Tajawal-Bold.ttf` and `OFL.txt`; explicitly use RTL direction and correct Arabic shaping. Use `delayRender`/font loading as appropriate, and inspect actual Remotion-rendered frames. Do not assume that an ordinary browser preview proves correct rendering.
- **Social format:** current reel is 1080 × 1920 and 30 fps. Avoid placing subtitles under Instagram's username/description overlays or side controls; overlay positions vary by device, so review in-app where possible.
- **Current identity colors in `src/darija/Illustrations.tsx`:** cream `#FFF8E9`, ink `#17345E`, blue `#1859DB`, yellow `#FFCE42`, orange `#F4874A`. Other supporting colors also exist in the source. These are current implementation values, not a universal rule for every future asset.

## 3. Project architecture

- `src/index.ts` is the Remotion entry point; `src/Root.tsx` registers three separate compositions:
  - `InternetDisappearsPreview` from `src/Composition.tsx`.
  - `Wach3arefLightningReel` from `src/darija/Wach3arefReel.tsx`.
  - `Wach3arefLightningOpeningV2` from `src/darija/opening-v2/OpeningV2.tsx`.
- English reusable components live under `src/components/`; English scenes under `src/scenes/`; its visual theme and durations are in `src/styles/theme.ts`.
- Darija-specific files are under `src/darija/`. Its reusable SVG character, room, landscape, storm, rain and lightning are currently in `src/darija/Illustrations.tsx`. `Wach3arefReel.tsx` currently defines the full reel's scene components and composes the narration, separate sound design layer, and subtitle layer.
- Static files are served from `public/` using Remotion `staticFile()`. Use Remotion `Audio`, `Sequence`, `useCurrentFrame`, and frame-based `interpolate` for determinism where suitable. The current implementation has one continuous narration WAV for the full Darija reel.
- Versions at this snapshot: Remotion/CLI 4.0.545, React 19.3.1, TypeScript 5.9.3. See `package.json` for current versions and scripts; do not add dependencies without a real need.
- The user environment is Windows/PowerShell; `npm.cmd`/`npx.cmd` have been used successfully. Beware of encoding when editing Arabic text: read and write UTF-8 explicitly, and visually inspect the result.
- `out/` is ignored by Git, and `build/` is not currently listed in `.gitignore`. Renders in `out/` may not travel with a checkout. Several source and public files were untracked at the handoff; check the current status before any Git operation.

## 4. First Darija reel: lightning and thunder

**Topic:** `علاش كنشوفو البرق قبل ما نسمعو الرعد؟`  
**Composition:** `Wach3arefLightningReel`  
**Video:** 1,080 × 1,920; 30 fps; exactly 2,004 frames / 66.8 seconds.  
**Original narration:** `public/audio/darija/lightning-thunder.mp3`.  
**Master used by the full reel:** `public/audio/darija/lightning-thunder-master.wav`.  
**Timing source:** `src/darija/timing.ts`.

The original narration was measured at approximately 66.769 seconds and starts at frame 0. The WAV master has the same decoded sample count and no measured alignment shift relative to the source. Do not change its speed, pitch, cut points, or duration unless explicitly asked. The final MP4 audio stream may be slightly longer than the video due to AAC padding; the video stream itself is 66.8 seconds.

### Current six-scene timing

Scene boundaries are frame-based at 30 fps, end-exclusive in practical use. The arrays and scene code are authoritative; these markers were informed by an approximate local word-timestamp transcription and may benefit from a human listening check.

| Scene | Frames | Approximate seconds | Current visual purpose |
| --- | --- | --- | --- |
| Hook / room | 0–269 | 0.00–8.97 | Recurring character, living room, rain and flashes. |
| Storm | 270–534 | 9.00–17.80 | Cloud, discharge, lightning and expanding pressure waves. |
| Light | 535–834 | 17.83–27.80 | Light path to observer and 300,000 km/s graphic. |
| Sound | 835–1008 | 27.83–33.60 | Slower wave, followed by return to the room. |
| Experiment | 1009–1579 | 33.63–52.63 | House and storm, stopwatch, 3/6/9-second distance milestones. |
| Safety / outro | 1580–2003 | 52.67–66.77 | Character moves away from the window; 30-minute timer and brand outro. |

Scene transitions overlap by 15 frames. Frame numbers are not a promise that every spoken word was independently checked by human listening. Recheck cue-level timing against the actual WAV when precision matters.

### Evolution and user feedback

1. Started with a separate seven-beat, warm educational motion-graphics version and one continuous narration track. The user found it too static and too much like animated presentation cards.
2. Rebuilt the visual story into a character-led educational mini-documentary: reusable layered SVG room, character, rain, clouds, light path, sound waves, stopwatch, and safety sequence. Six scene groups replaced the first draft's seven visual beats while covering the same subject matter.
3. The user flagged two large dark shapes on the character's face and a strip of different background appearing at the left from around 30–50 seconds. The shapes were oversized ears; these were reduced and placed behind the face. Camera transforms in the experiment and safety scenes were corrected to keep the background filling the frame. A transition dimming issue was also corrected.
4. The user approved a verified Darija transcript for subtitles. The draft in `docs/wach3aref-subtitle-plan-draft.md` predates that approval and contains uncertain automated transcription; it is **not** the final authority. The currently implemented approved subtitle text and timings are in `src/darija/subtitles/timing.ts`.
5. Added 24 phrase-level subtitles in `src/darija/subtitles/DarijaSubtitles.tsx`, with no more than two lines, cream text, orange highlights and frame-based entry/exit. The user then asked to remove duplicate scene captions and move subtitles away from the Instagram username/description area. Old explanatory `<Text>` elements were removed; the brand mark, numerical illustrations and outro remain. Default subtitle top is 300 px; the experiment cues use top 620 px. These positions should be assessed in context on the target device, not blindly reused for future reels.
6. Mastered narration in a separate WAV rather than replacing the original MP3. Original measured approximately −23.19 LUFS / −3.42 dBTP; WAV master measured approximately −17.15 LUFS / −2.49 dBTP. No decoded samples at or above full scale were reported in either file.
7. Before adding music/effects, the user asked for an asset, license and timing plan. A separate 25.27-second test used two narration excerpts, music, lightning, delayed thunder, one transition, and sparse ticks. The test measured −16.63 LUFS / −5.02 dBTP with zero decoded full-scale samples. The user approved that test and requested music about 3 dB louder for the full reel.
8. Integrated that approved direction in a separate audio layer without changing the narration or subtitle wording. The measured full encoded preview was −17.07 LUFS / −4.69 dBTP, with no decoded samples at or above full scale. Signal comparison checked the four stopwatch tick positions. These are measurements from the specified preview, not a substitute for listening.

### Approved Darija transcript

This is the wording the user supplied and explicitly approved for subtitle implementation. Preserve the exact Darija for this reel; the current cue splits and highlights are stored in `src/darija/subtitles/timing.ts`.

> واش عمرك تسولتي علاش كنشوفو البرق قبل ما نسمعو الرعد؟
>
> مع أن بجوج كيوقعو تقريباً فنفس اللحظة؟
>
> الجواب بسيط، ولكن فيه واحد المعلومة مدهشة!
>
> البرق هو داك الضو القوي اللي كنشوف فالسماء، والرعد هو الصوت اللي كينتج على نفس الظاهرة.
>
> ولكن الفرق الكبير هو السرعة!
>
> الضو سريع بزاف، كيسافر بسرعة تقريباً ثلاثمية ألف كيلومتر فالثانية.
>
> يعني منين كيوقع البرق، الضو كيوصل لعينيك تقريباً فالحين.
>
> أما الصوت فكيكون أبطأ بزاف، وكيحتاج وقت باش ينتاقل فالهواء ويوصل حتى لعندك.
>
> وهنا كاينة واحد الحيلة تقدر تجربها بوحدك!
>
> منين تشوف البرق، بدا حسب الثواني حتى تسمع الرعد.
>
> كل ثلاث ثواني تقريباً كتعني أن العاصفة بعيدة عليك بحوالي كيلومتر واحد.
>
> مثلاً، إلا حسبتي تسع ثواني بين البرق والرعد، فهذا كيعني أن العاصفة ممكن تكون على بعد ثلاثة كيلومترات تقريباً.
>
> ولكن رد بالك! إلا سمعتي الرعد، راه العاصفة قريبة بما يكفي باش تكون معرض للخطر.
>
> دخل لدار ولا لسيارة مسدودة بسقف صلب، وبقى تما حتى يدوزو ثلاثين دقيقة من آخر رعدة.
>
> ودابا، واش كنتي عارف هاد المعلومة؟

## 5. Current Darija audio design

- **Narration:** `public/audio/darija/lightning-thunder-master.wav`, one continuous Remotion `Audio` track from frame 0. Preserve it and the original MP3.
- **Layer and cue configuration:** `src/darija/audio/Wach3arefAudioDesign.tsx` and `src/darija/audio/audioConfig.ts`. Cue `from`, `duration`, trim and fades are in frames at 30 fps.
- **Music:** “Little Bells” by Diego Nava, Mixkit asset 506, in `public/audio/darija/audio-test/little-bells-diego-nava.mp3`. The existing full-reel gain is `0.04467 * 10^(3/20)` (~0.0631), an increase of 3 dB over the test's fixed gain. It is a manually lowered bed, not automatic sidechain ducking. The music fades in over 42 frames and out over the final 60 frames.
- **Effects:** “Lightning whip” 1508, “Distant thunder explosion” 1278, and “Clock ticker single” 1061, all in `public/audio/darija/audio-test/`; a previously present “Cinematic whoosh fast transition” 1492 is `public/audio/sfx/global-coordination-impact.wav`.
- **Global cue starts in the current configuration:** flash 74, thunder 101, flash 164, thunder 190; cloud whoosh 249 and light whoosh 514; stopwatch/tick cues 1123, 1213, 1303, 1393. The clock samples have a source trim, so their audible transient arrives later than the sequence start; do not confuse the two.
- **License record:** `public/audio/darija/audio-test/LICENSES.md`; English/shared SFX record: `public/audio/sfx/LICENSES.md`. Check the current upstream terms for a new use and respect restrictions on redistributing assets, including as source files. Do not assume that an unrecorded local asset is cleared for publication.
- **Audio test reproduction:** `node scripts/wach3aref-audio-test.mjs [output.wav]`. It refuses to overwrite an existing output. It is a short test of excerpts, not a full-reel master.

## 6. Experimental seven-second opening

`Wach3arefLightningOpeningV2` is a separate composition, not the first seven seconds of the current full reel. Source: `src/darija/opening-v2/OpeningV2.tsx`; approved reference supplied by the user: `public/wach3aref/lightning/references/scene1-living-room.png`.

The supplied reference is a single flattened, wide image, with no person. The experiment uses a portrait crop, slow reframing, additional window rain, a lightning exposure overlay, and Arabic title text. It uses the original narration MP3 in a seven-second composition. Because the lightning is baked into the still and no independent character exists, it cannot show a believable character noticing the flash. A matching separately layered character and clean background would be needed for that; additional foreground/window layers would permit better parallax. Do not present this experimental opening as integrated into the full reel or approved for final publication without evidence.

## 7. Previews and review artifacts

All paths are relative to the project root and may not be available after moving the project because `out/` is ignored by Git.

| Artifact | What it represents | Status from conversation |
| --- | --- | --- |
| `out/internet-disappears-music-preview.mp4` | Existing English reel preview | Existing artifact; publication/approval not established here. |
| `out/wach3aref-lightning-draft.mp4` | Initial Darija draft | Superseded; user found it too static. |
| `out/Wach3arefLightningReel-revision.mp4` | Character-led visual revision | Superseded by later fixes. |
| `out/Wach3arefLightningReel-polished.mp4` | Face and framing fixes | Earlier preview, before later subtitle/audio work. |
| `out/Wach3arefLightningOpeningV2.mp4` | Separate 7-second reference-image experiment | Experimental, not integrated into full reel. |
| `out/Wach3arefLightningReel-audio-preview.mp4` | Narration-master preview | Earlier audio-only stage. |
| `out/Wach3arefLightningReel-subtitle-preview.mp4` | Subtitle implementation preview | Before the user's requested removal of duplicate scene text and higher placement. |
| `out/Wach3arefLightningReel-instagram-preview.mp4` | Subtitle-safe placement / removed duplicate captions | Earlier full-reel preview, before final music and effects. |
| `out/Wach3aref-audio-test.wav` | 25.27-second narration/music/SFX test | User approved the test and requested music +3 dB for full integration. |
| `out/Wach3arefLightningReel-audio-design-preview.mp4` | Latest recorded full reel with subtitles, mastered narration, music, and effects | Technical preview rendered and measured; user has not explicitly confirmed publication or final listening approval. |
| `out/instagram-subtitle-review/` | Cue contact sheets and rendered frames | Used for visual inspection; device UI may differ. |

The frame/still directories under `out/` are review artifacts. Re-render or extract new stills after changes; an old contact sheet does not validate a new render.

## 8. Working method for an incoming reel

Use this as a starting pattern, adapted to the actual task and brand:

1. **Clarify the concrete brief from available information.** Identify the brand, topic, intended platform, reference assets, narration, script, desired duration, and what must not change. Make reasonable routine decisions; ask for missing information only when it materially affects the work.
2. **Inspect before editing.** Read the relevant composition, reusable components, existing timing/audio conventions, fonts, dependencies, reference images, local audio and license records. Keep the English and Darija identities separate.
3. **Establish narration and science.** Measure actual narration duration and subject changes; do not stretch or cut a supplied continuous narration without authorization. Verify factual claims and safety statements with appropriate authoritative sources for the new topic. Preserve the user's verified transcript; automatic transcription is only a draft and Darija recognition can be wrong.
4. **Plan visual beats around the audio.** Separate timing data from scene code, use unequal scene lengths when the narration requires them, and identify what is actually shown at each beat. Reuse the art system when suitable, but do not assume an earlier reel's composition or duration will fit a new one.
5. **Build the composition.** Keep new work in a dedicated area, register a new composition, and preserve unrelated scenes. Favor deliberate animation, character action, layered scientific illustration, clear transitions and readable compositions over static slide-like layouts. Handle Arabic shaping and RTL explicitly.
6. **Subtitles.** Use the verified narration, phrase-level frame timings, at most two lines, meaningful orange highlights and enough reading time. Avoid unnecessary duplicated scene captions and collisions with important illustrations or Instagram UI. Inspect rendered frames for every cue and verify timings by listening when possible.
7. **Audio design.** Inspect local assets and their provenance before sourcing. Record the exact source/license for new assets. Keep narration intelligible and dominant, use music fades and intentional ducking, and use effects sparingly in sync with visuals. If the user requests an asset plan or a separate test for approval, provide it before that requested action. Measure integrated loudness, true peak and clipping on the **encoded final output**, not just the source WAV.
8. **Validate and review.** Run checks appropriate to the changes, including `npm.cmd run lint` and `npm.cmd run build` when requested. Render a new, uniquely named preview; inspect representative frames and final duration, and verify the audio mix. Keep approved earlier artifacts intact. Report objective measurements separately from subjective listening judgments.
9. **Handoff and next step.** State file paths, what changed, tests and limits. Do not claim that a draft is approved, published, listened to, or synchronized at word level without evidence. Publication or other external actions require the user's instruction.

### Useful commands

Run from the project root in PowerShell:

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
npx.cmd remotion render Wach3arefLightningReel out/UNIQUE-NAME.mp4 --concurrency=4
npx.cmd remotion still Wach3arefLightningReel out/UNIQUE-FRAME.png --frame=1290
```

Choose a genuinely unused output name first: `remotion.config.ts` currently calls `Config.setOverwriteOutput(true)`. The installed Remotion compositor also contains `ffmpeg.exe` and `ffprobe.exe` under `node_modules/@remotion/compositor-win32-x64-msvc/`; availability depends on platform and installation. For a quick output check, probe the video stream for 1080×1920, 30 fps, frame count and duration, and measure the encoded audio with a loudness meter. A target of approximately −16 to −18 LUFS and true peak below −1.5 dBTP was requested for the first Darija reel; confirm targets for each new deliverable.

## 9. Remaining checks and open information

- The latest full Darija preview should receive a final human listening pass for music/SFX balance and exact spoken/subtitle timing, and an Instagram-device review for UI overlap. Previous automatic transcription and rendered still checks do not substitute for those reviews.
- The latest full preview's objective audio levels and frame count are recorded above. No final publication or user sign-off on that complete preview has been recorded in this conversation.
- The English brand's public name and publishing status were not established in the supplied context. Do not invent them.
- The local English background music's provenance/license was not established in this inspection. Verify it if planning redistribution or publication.
- The user's supplied reference for the V2 opening has no character layer. Obtain appropriate matching assets if asked for a realistic character reaction; do not warp the flattened image to simulate one.
- Keep this file up to date when meaningful future decisions are made, but check its statements against actual code and the user's most recent instructions. It is not a substitute for the project or current conversation.
