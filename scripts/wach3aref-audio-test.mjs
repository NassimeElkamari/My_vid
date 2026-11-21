/** Build a short, non-destructive Wach3aref audio test using the bundled FFmpeg.
 * Source excerpts: 0–9.9 s and 33.48–48.45 s, separated by 0.4 s silence.
 * The cue times below are relative to each excerpt, not to the main reel.
 * Run from the project root: node scripts/wach3aref-audio-test.mjs [output.wav]
 */
import {spawnSync} from "node:child_process";
import {existsSync, mkdirSync} from "node:fs";
import {dirname} from "node:path";

const output = process.argv[2] ?? "out/Wach3aref-audio-test.wav";
if (existsSync(output)) throw new Error(`Refusing to overwrite ${output}`);
mkdirSync(dirname(output), {recursive:true});
const ffmpeg = "node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe";
const audio = "public/audio/darija/audio-test/";
const inputs = [
  "public/audio/darija/lightning-thunder-master.wav",
  "public/audio/darija/lightning-thunder-master.wav",
  `${audio}little-bells-diego-nava.mp3`, `${audio}little-bells-diego-nava.mp3`,
  `${audio}lightning-whip-1508.wav`, `${audio}lightning-whip-1508.wav`,
  `${audio}distant-thunder-1278.wav`, `${audio}distant-thunder-1278.wav`,
  "public/audio/sfx/global-coordination-impact.wav",
  `${audio}clock-ticker-1061.wav`, `${audio}clock-ticker-1061.wav`,
  `${audio}clock-ticker-1061.wav`, `${audio}clock-ticker-1061.wav`,
];
// Music is manually ducked by 27 dB throughout both speech excerpts.
const graph = [
  "[0:a]atrim=start=0:end=9.9,asetpts=PTS-STARTPTS,aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo[voice0]",
  "[1:a]atrim=start=33.48:end=48.45,asetpts=PTS-STARTPTS,aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo[voice1]",
  "[2:a]atrim=start=0:end=9.9,asetpts=PTS-STARTPTS,volume='0.04467*min(1,t/1.4)*min(1,(9.9-t)/0.6)':eval=frame[music0]",
  "[3:a]atrim=start=33.48:end=48.45,asetpts=PTS-STARTPTS,volume='0.04467*min(1,t/0.8)*min(1,(14.97-t)/0.8)':eval=frame[music1]",
  "[4:a]volume=0.04,adelay=2480:all=1[flash0]",
  "[5:a]volume=0.025,adelay=5450:all=1[flash1]",
  "[6:a]atrim=duration=2.8,asetpts=PTS-STARTPTS,volume='0.025*min(1,(2.8-t)/1.1)':eval=frame,adelay=3380:all=1[thunder0]",
  "[7:a]atrim=duration=2.8,asetpts=PTS-STARTPTS,volume='0.018*min(1,(2.8-t)/1.1)':eval=frame,adelay=6350:all=1[thunder1]",
  "[8:a]atrim=start=0.35:end=1.33,asetpts=PTS-STARTPTS,volume=0.025,adelay=8300:all=1[whoosh]",
  "[9:a]atrim=start=0.20:end=0.60,asetpts=PTS-STARTPTS,volume=0.045,adelay=3950:all=1[tick0]",
  "[10:a]atrim=start=0.20:end=0.60,asetpts=PTS-STARTPTS,volume=0.040,adelay=6950:all=1[tick1]",
  "[11:a]atrim=start=0.20:end=0.60,asetpts=PTS-STARTPTS,volume=0.040,adelay=9950:all=1[tick2]",
  "[12:a]atrim=start=0.20:end=0.60,asetpts=PTS-STARTPTS,volume=0.045,adelay=12950:all=1[tick3]",
  "[voice0][music0][flash0][flash1][thunder0][thunder1][whoosh]amix=inputs=7:duration=first:normalize=0[mix0]",
  "[voice1][music1][tick0][tick1][tick2][tick3]amix=inputs=6:duration=first:normalize=0[mix1]",
  "anullsrc=r=48000:cl=stereo,atrim=duration=0.4,asetpts=PTS-STARTPTS[gap]",
  "[mix0][gap][mix1]concat=n=3:v=0:a=1[out]",
].join(";");
const args = ["-hide_banner", "-n", ...inputs.flatMap((path) => ["-i", path]), "-filter_complex", graph, "-map", "[out]", "-ar", "48000", "-c:a", "pcm_s24le", output];
const result = spawnSync(ffmpeg, args, {stdio:"inherit"});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
