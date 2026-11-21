import { interpolate } from "remotion";
import { theme } from "../styles/theme";

export const MUSIC_SOURCE_START_SECONDS = 90;
export const MUSIC_SOURCE_END_SECONDS = 135;

export const MUSIC_SOURCE_START_FRAME = MUSIC_SOURCE_START_SECONDS * theme.canvas.fps;
export const MUSIC_SOURCE_END_FRAME = MUSIC_SOURCE_END_SECONDS * theme.canvas.fps;

const volumeFrames = [
  0, 30,
  145, 161, 172,
  339, 355, 385,
  636, 654, 707,
  1004, 1028, 1100,
  1290, 1301, 1350,
];

const volumeLevels = [
  0, 0.08,
  0.08, 0.14, 0.09,
  0.09, 0.15, 0.1,
  0.1, 0.16, 0.1,
  0.1, 0.14, 0.08,
  0.08, 0.05, 0,
];

export const getBackgroundMusicVolume = (frame: number): number => {
  return interpolate(frame, volumeFrames, volumeLevels, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};
