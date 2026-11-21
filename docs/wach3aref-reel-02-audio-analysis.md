# Wach 3aref Reel 02 — narration audio analysis and timing

**Status: narration master completed; transcript alignment and scene timing are provisional pending a human listening review.**

This document was prepared from the supplied original MP3, its new WAV master, the approved narration V2 text supplied by the user in this conversation, FFmpeg measurements, signal checks, and an automatic local Arabic speech-recognition pass. No video, composition, music, or sound effects were changed or created for this task.

**Important limitation:** the available workflow did not provide a way for the assistant to listen to the recording. The speech recognizer makes noticeable errors on Darija. Consequently, the table below is the user's approved text **aligned approximately to the machine's recognized phrase boundaries**; it is not a certified verbatim transcription of the recording. The recording's exact wording, pronunciation, naturalness, and possible ElevenLabs artifacts still require listening. Recognition disagreements listed below are review points, not proof that the voice says something different.

## Files and provenance

- Original, user-provided and approved ElevenLabs narration by Badr: `public/audio/darija/wach3aref-reel-02-voice-original.mp3`.
- Separate narration master: `public/audio/darija/wach3aref-reel-02-voice-master.wav`.
- Approved text: supplied directly by the user during this task; it is reproduced in the phrase table without intentional rewriting.
- Original SHA-256 before and after processing: `61A9D44016A8CFD37D06085AC1711961124B57625CD24D513298F50E2B390924`.
- Reel 01 and the English composition were not modified. No new Reel 02 composition was created.

## Original and mastered audio measurements

| Property | Original MP3 | Master WAV |
| --- | ---: | ---: |
| Codec / sample format | MP3 | PCM 24-bit WAV |
| Sample rate | 44,100 Hz | 44,100 Hz |
| Channels | Mono | Mono |
| Container-reported duration | 53.551000 s | 53.551020 s |
| Decoded samples | 2,361,600 | 2,361,600 |
| Duration from decoded samples | 53.5510204 s | 53.5510204 s |
| Integrated loudness | −23.57 LUFS | −17.10 LUFS |
| True peak | −2.83 dBTP | −2.47 dBTP |
| Loudness range | 2.50 LU | 1.80 LU |
| Sample peak, absolute amplitude | 0.721432 | 0.750888 |
| Decoded samples at or above full scale | 0 | 0 |

The MP3 duration shown by the container is estimated; the sample-derived duration is the more precise value for the decoded audio. Zero full-scale samples and a true peak below 0 dBTP mean no digital full-scale clipping was detected in these decoded files; they cannot prove that clipping or other distortion never occurred before the MP3 was delivered.

### Processing and verification

- Measured original with the bundled FFmpeg `loudnorm` filter: integrated target `I=-17`, true peak `TP=-2.5`, loudness range target `LRA=11`.
- Input measurements supplied to the mastering pass: `measured_I=-23.57`, `measured_TP=-2.83`, `measured_LRA=2.50`, `measured_thresh=-33.73`, `offset=0.56`.
- Master exported at 44.1 kHz, mono, 24-bit PCM. FFmpeg reported **dynamic** normalization, despite requesting `linear=true`; its mastering-pass estimate was −17.07 LUFS and −2.50 dBTP. The independent remeasurement in the table is the authoritative measurement of the produced WAV.
- No intentional trimming, speed change, pitch change, EQ, denoising, or other creative processing was applied. Dynamic loudness normalization changes amplitude over time.
- Decoded original and master have identical sample counts. Cross-correlation found **0-sample relative lag** in five-second windows starting at 0, 20 and 45 seconds. This supports unchanged alignment across the recording; it is not a subjective voice-quality assessment.
- The original file's SHA-256 was unchanged after mastering. The source and destination files are separate.

## Recommended composition duration

At 30 FPS, `ceil(2,361,600 / 44,100 × 30) = 1,607` frames. The recommended minimum composition length is therefore **1,607 frames / 53.566667 seconds**. Its end is about **0.015646 seconds after** the decoded narration ends, avoiding a cut in the final video frame. This is a frame-rounding tail, not a trim or stretch of the narration. Any longer visual hold should be a separate creative decision.

## Phrase-by-phrase narration map

The wording below is the approved script supplied by the user. Times are approximate machine-derived estimates in seconds relative to the first decoded sample. They should not be treated as final subtitle in/out points until checked against the actual sound. Adjacent windows may include breaths, transitions, or low-level pauses.

| # | Start | End | Approved wording aligned provisionally |
| --- | ---: | ---: | --- |
| 1 | 0.00 | 1.52 | عمرك سجلتي شي أوديو، |
| 2 | 1.52 | 2.74 | وملي سمعتيه قلتي: |
| 3 | 2.74 | 3.94 | شنو هاد الصوت؟ |
| 4 | 3.94 | 5.60 | واش أنا اللي كنهضر بهاد الطريقة؟! |
| 5 | 5.60 | 7.00 | راه ماشي غير نتا! |
| 6 | 7.00 | 9.66 | هاد الإحساس كيوقع لينا كاملين تقريباً. |
| 7 | 9.66 | 12.92 | والسبب مخبي فالطريقة اللي كنسمعو بها صوتنا. |
| 8 | 12.92 | 14.70 | شوف، ملي كنهضرو، |
| 9 | 14.70 | 16.92 | الصوت كيوصل لودنينا عبر الهواء. |
| 10 | 16.92 | 18.24 | ولكن فنفس الوقت، |
| 11 | 18.24 | 19.76 | الاهتزازات ديال صوتنا |
| 12 | 19.76 | 22.40 | كتدوز حتى عبر عظام وأنسجة الراس، |
| 13 | 22.40 | 24.24 | وكتوصل للأذن الداخلية. |
| 14 | 24.24 | 26.68 | يعني حنا كنسمعو صوتنا بجوج طرق: |
| 15 | 26.68 | 27.64 | عبر الهواء، |
| 16 | 27.64 | 30.28 | وعبر الاهتزازات اللي كتدوز داخل الراس. |
| 17 | 30.28 | 31.96 | وهاد الجوج كيتجمعو |
| 18 | 31.96 | 34.08 | وكيعطيو لينا الصوت اللي متعودين عليه. |
| 19 | 34.08 | 36.04 | ولكن ملي كنسجلو صوتنا، |
| 20 | 36.04 | 39.34 | الميكروفون كيلتاقط الصوت اللي كيوصل ليه عبر الهواء. |
| 21 | 39.34 | 40.48 | ومنين كنسمعوه، |
| 22 | 40.48 | 42.94 | ما كنسمعوش نفس الاهتزازات الداخلية |
| 23 | 42.94 | 44.46 | اللي كانت كترافق كلامنا. |
| 24 | 44.46 | 46.56 | وداكشي علاش صوتنا فالتسجيل |
| 25 | 46.56 | 48.08 | كيقدر يبان لينا مختلف! |
| 26 | 48.08 | 50.10 | ماشي بالضرورة حيث التسجيل غلط، |
| 27 | 50.10 | 53.38 | ولكن حيث حنا متعودين نسمعوه بطريقة أخرى. |

The script is supplied text; punctuation and line segmentation are visual aids. The automatic recognizer does not establish whether each exact word, spelling or punctuation is audible as written.

## Proposed six-scene storyboard timing

Frame ranges below are **start-inclusive, end-exclusive** and are based on the speech map and detected low-level gaps. These are creative timing proposals, not final approved edits. The end of the last frame interval is the composition boundary, not the narration endpoint.

| # | Storyboard scene | Start | End | Frame interval | Duration | Rationale |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | The shocking playback | 0.000 s | 5.700 s | `[0, 171)` | 5.700 s | Opening audio-recording question and reaction. |
| 2 | The mystery | 5.700 s | 13.300 s | `[171, 399)` | 7.600 s | Reassurance that others experience it and the setup about how we hear ourselves. |
| 3 | Air conduction | 13.300 s | 17.133 s | `[399, 514)` | 3.833 s | Voice reaches the ears through air. |
| 4 | Bone conduction | 17.133 s | 34.233 s | `[514, 1027)` | 17.100 s | Vibrations through bones/tissues and the explanation of the two combined paths. |
| 5 | The revelation | 34.233 s | 44.567 s | `[1027, 1337)` | 10.333 s | Microphone records sound through air; playback lacks the same internal vibrations. |
| 6 | The conclusion | 44.567 s | 53.567 s | `[1337, 1607)` | 9.000 s | Why the recorded voice can sound different and the closing explanation. |

The proposed starts for scenes 3–6 fall near detected low-level gaps; the first two starts are tentative because recognition and the detected gap do not establish the exact spoken onset. Scene 4 is deliberately longer than the others because the narration explains both conduction paths and their combination in that interval. A human should confirm that this pacing works before the storyboard becomes final.

## Detected low-level pauses

FFmpeg `silencedetect` was run on the mastered WAV at **−40 dB for at least 0.18 s**. These are low-level intervals, not a judgment that the pauses sound natural, and a breath or quiet consonant may be present below the threshold.

| Low-level interval | Length | Possible editorial use |
| --- | ---: | --- |
| 2.947–3.139 s | 0.191 s | Within the opening reaction; check wording before cutting on it. |
| 5.700–6.064 s | 0.363 s | Near opening → mystery. |
| 6.976–7.257 s | 0.281 s | Between reassurance phrases. |
| 12.936–13.297 s | 0.361 s | Near mystery → air-conduction explanation. |
| 16.953–17.144 s | 0.191 s | Near air → bone-conduction contrast. |
| 24.208–24.414 s | 0.206 s | Before the two-path summary. |
| 30.286–30.471 s | 0.185 s | Before the paths combine. |
| 34.142–34.337 s | 0.195 s | Near bone-conduction summary → recording explanation. |
| 44.451–44.651 s | 0.200 s | Near revelation → conclusion. |

## Important emphasis and sound-aligned visual ideas

These are text/meaning markers from the approved script, not verified performance annotations:

- **2.74–5.60 s:** «شنو هاد الصوت؟» and «واش أنا اللي كنهضر بهاد الطريقة؟» — opening surprise.
- **9.66–12.92 s:** «السبب مخبي» — establish the mystery.
- **14.70–16.92 s:** «عبر الهواء» — introduce the first path.
- **18.24–24.24 s:** «الاهتزازات» and «عظام وأنسجة الراس» — introduce the internal path.
- **24.24–34.08 s:** «بجوج طرق» and «كيتجمعو» — visual summary of both paths.
- **34.08–44.46 s:** «الميكروفون» and «ما كنسمعوش نفس الاهتزازات الداخلية» — reveal what changes during playback.
- **44.46–53.38 s:** «كيقدر يبان لينا مختلف» and «ماشي بالضرورة حيث التسجيل غلط» — conclusion. Do not imply that the recording itself is necessarily defective.

## Narration checks requiring a listening decision

A human listening pass is needed before approving this document as a precise transcript/timing source. In particular:

1. **0.00–7.00 s:** confirm the exact wording and pronunciation of the opening and «راه ماشي غير نتا». The automatic model produced malformed Darija here.
2. **18.24–24.24 s:** confirm «الاهتزازات ديال صوتنا», «عظام وأنسجة الراس», and «الأذن الداخلية» against the recording; the recognizer mangled these words.
3. **31.96–34.08 s:** confirm «وكيعطيو لينا الصوت اللي متعودين عليه»; the recognizer was uncertain about the verb and ending.
4. **36.04–44.46 s:** confirm the exact microphone/playback wording and «اللي كانت كترافق كلامنا»; several words were misrecognized.
5. **44.46–53.38 s:** confirm the closing «كيقدر يبان لينا مختلف» and «ماشي بالضرورة حيث التسجيل غلط»; the machine transcript is not reliable enough to certify these exact phrases.
6. **Pronunciation, unnatural pauses and ElevenLabs artifacts:** cannot be assessed conclusively from the loudness, silence and timing measurements. No claim is made that the recording is free of those issues. The listed low-level pauses are not by themselves evidence of a problem.

Do not regenerate, cut, or rewrite the approved recording based solely on the automatic-recognition output. If a real spoken issue is heard, present its exact time and the user's approved wording for a decision before changing the narration.
