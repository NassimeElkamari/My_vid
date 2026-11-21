import React from "react";
import { AbsoluteFill, Audio, Composition, Sequence, staticFile } from "remotion";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2FirstHour } from "./scenes/Scene2FirstHour";
import { Scene3Finance } from "./scenes/Scene3Finance";
import { Scene4Logistics } from "./scenes/Scene4Logistics";
import { Scene5Conclusion } from "./scenes/Scene5Conclusion";
import {
  getBackgroundMusicVolume,
  MUSIC_SOURCE_END_FRAME,
  MUSIC_SOURCE_START_FRAME,
} from "./audio/music";
import { getSoundEffectVolume, soundEffects } from "./audio/soundEffects";
import { frames, theme } from "./styles/theme";

const narrationTracks = [
  { scene: "Scene 1", startFrame: 5, src: "audio/narration/scene1.mp3", volume: 2.05 },
  { scene: "Scene 2", startFrame: 172, src: "audio/narration/scene2.mp3", volume: 1.95 },
  { scene: "Scene 3", startFrame: 385, src: "audio/narration/scene3.mp3", volume: 1.15 },
  { scene: "Scene 4", startFrame: 707, src: "audio/narration/scene4.mp3", volume: 1.15 },
  { scene: "Scene 5", startFrame: 1100, src: "audio/narration/scene5.mp3", volume: 2.4 },
] as const;

export const ReelPreview: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.ink }}>
      <Sequence durationInFrames={frames.hook} name="Scene 1 — The Hook">
        <Scene1Hook />
      </Sequence>
      <Sequence from={frames.hook} durationInFrames={frames.firstHour} name="Scene 2 — The First Hour">
        <Scene2FirstHour />
      </Sequence>
      <Sequence from={frames.hook + frames.firstHour} durationInFrames={frames.finance} name="Scene 3 — Financial Shock">
        <Scene3Finance />
      </Sequence>
      <Sequence from={frames.hook + frames.firstHour + frames.finance} durationInFrames={frames.logistics} name="Scene 4 — Global Disruption">
        <Scene4Logistics />
      </Sequence>
      <Sequence from={frames.hook + frames.firstHour + frames.finance + frames.logistics} durationInFrames={frames.conclusion} name="Scene 5 — The Silence">
        <Scene5Conclusion />
      </Sequence>
      {narrationTracks.map((track) => (
        <Sequence key={track.src} from={track.startFrame} name={`Narration — ${track.scene}`}>
          <Audio src={staticFile(track.src)} volume={track.volume} />
        </Sequence>
      ))}
      <Audio
        src={staticFile("audio/music/background.mp3")}
        trimBefore={MUSIC_SOURCE_START_FRAME}
        trimAfter={MUSIC_SOURCE_END_FRAME}
        volume={getBackgroundMusicVolume}
      />
      {soundEffects.map((effect) => (
        <Sequence
          key={effect.id}
          from={effect.from}
          durationInFrames={effect.durationInFrames}
          name={`SFX — ${effect.id}`}
        >
          <Audio src={staticFile(effect.src)} volume={getSoundEffectVolume(effect)} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const MyComposition: React.FC = () => (
  <Composition
    id="InternetDisappearsPreview"
    component={ReelPreview}
    durationInFrames={frames.preview}
    fps={theme.canvas.fps}
    width={theme.canvas.width}
    height={theme.canvas.height}
  />
);
