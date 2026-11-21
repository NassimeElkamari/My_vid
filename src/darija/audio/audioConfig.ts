/** All cue times are in frames on the 30 fps Wach3aref timeline. */
export type AudioCue = {
  id: string;
  src: string;
  from: number;
  duration: number;
  gain: number;
  trimBefore?: number;
  fadeIn: number;
  fadeOut: number;
};

// The test used a fixed 0.04467 gain under speech. The approved change is +3 dB.
export const music = {
  src: "audio/darija/audio-test/little-bells-diego-nava.mp3",
  gain: 0.04467 * Math.pow(10, 3 / 20),
  fadeIn: 42,
  fadeOut: 60,
} as const;

// The single flash accents are non-diegetic; the thunder follows later.
// Clock sounds are isolated ticks at the stopwatch start and 3/6/9 milestones.
export const audioCues: readonly AudioCue[] = [
  {id:"flash-1",src:"audio/darija/audio-test/lightning-whip-1508.wav",from:74,duration:25,gain:.04,fadeIn:1,fadeOut:5},
  {id:"thunder-1",src:"audio/darija/audio-test/distant-thunder-1278.wav",from:101,duration:84,gain:.025,fadeIn:1,fadeOut:33},
  {id:"flash-2",src:"audio/darija/audio-test/lightning-whip-1508.wav",from:164,duration:25,gain:.025,fadeIn:1,fadeOut:5},
  {id:"thunder-2",src:"audio/darija/audio-test/distant-thunder-1278.wav",from:190,duration:84,gain:.018,fadeIn:1,fadeOut:33},
  {id:"cloud-transition",src:"audio/sfx/global-coordination-impact.wav",from:249,duration:29,trimBefore:11,gain:.025,fadeIn:1,fadeOut:6},
  {id:"light-transition",src:"audio/sfx/global-coordination-impact.wav",from:514,duration:29,trimBefore:11,gain:.02,fadeIn:1,fadeOut:6},
  {id:"stopwatch-start",src:"audio/darija/audio-test/clock-ticker-1061.wav",from:1123,duration:12,trimBefore:6,gain:.045,fadeIn:1,fadeOut:2},
  {id:"distance-3",src:"audio/darija/audio-test/clock-ticker-1061.wav",from:1213,duration:12,trimBefore:6,gain:.04,fadeIn:1,fadeOut:2},
  {id:"distance-6",src:"audio/darija/audio-test/clock-ticker-1061.wav",from:1303,duration:12,trimBefore:6,gain:.04,fadeIn:1,fadeOut:2},
  {id:"distance-9",src:"audio/darija/audio-test/clock-ticker-1061.wav",from:1393,duration:12,trimBefore:6,gain:.045,fadeIn:1,fadeOut:2},
];
