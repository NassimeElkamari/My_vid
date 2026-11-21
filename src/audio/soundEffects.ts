import {interpolate} from "remotion";

export type SoundEffect = {
  readonly id: string;
  readonly src: string;
  readonly from: number;
  readonly durationInFrames: number;
  readonly volume: number;
  readonly fadeInFrames: number;
  readonly fadeOutFrames: number;
};

// The cues are deliberately sparse. `from` uses global composition frames so
// every effect remains aligned if scene implementations move internally.
export const soundEffects: readonly SoundEffect[] = [
  {
    id: "network-collapse-whoosh",
    src: "audio/sfx/network-collapse-whoosh.wav",
    from: 80,
    durationInFrames: 94,
    volume: 0.075,
    fadeInFrames: 2,
    fadeOutFrames: 12,
  },
  {
    id: "message-failure",
    src: "audio/sfx/message-failure.wav",
    from: 252,
    durationInFrames: 109,
    volume: 0.08,
    fadeInFrames: 2,
    fadeOutFrames: 10,
  },
  {
    id: "payment-declined-impact",
    src: "audio/sfx/payment-declined-impact.wav",
    from: 418,
    durationInFrames: 105,
    volume: 0.11,
    fadeInFrames: 1,
    fadeOutFrames: 16,
  },
  {
    id: "market-feed-interference",
    src: "audio/sfx/market-feed-interference.wav",
    from: 595,
    durationInFrames: 87,
    volume: 0.075,
    fadeInFrames: 2,
    fadeOutFrames: 12,
  },
  {
    id: "airport-warning",
    src: "audio/sfx/airport-warning.wav",
    from: 735,
    durationInFrames: 135,
    volume: 0.065,
    fadeInFrames: 3,
    fadeOutFrames: 15,
  },
  {
    id: "cargo-radio-loss",
    src: "audio/sfx/cargo-radio-loss.wav",
    from: 865,
    durationInFrames: 186,
    volume: 0.055,
    fadeInFrames: 3,
    fadeOutFrames: 18,
  },
  {
    id: "global-coordination-impact",
    src: "audio/sfx/global-coordination-impact.wav",
    from: 1005,
    durationInFrames: 41,
    volume: 0.07,
    fadeInFrames: 1,
    fadeOutFrames: 10,
  },
];

export const getSoundEffectVolume = (effect: SoundEffect) => (frame: number): number => {
  const fadeIn = interpolate(frame, [0, effect.fadeInFrames], [0, effect.volume], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [effect.durationInFrames - effect.fadeOutFrames, effect.durationInFrames],
    [effect.volume, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return Math.min(fadeIn, fadeOut);
};
