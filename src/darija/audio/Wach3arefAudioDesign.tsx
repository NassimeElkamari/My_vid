import React from "react";
import {Audio, Sequence, interpolate, staticFile} from "remotion";
import {timing} from "../timing";
import {audioCues, music} from "./audioConfig";

const clamp = {extrapolateLeft:"clamp" as const, extrapolateRight:"clamp" as const};

/** A separate layer: narration remains its own untouched continuous track. */
export const Wach3arefAudioDesign: React.FC = () => <>
  <Audio src={staticFile(music.src)} volume={(frame) => music.gain * Math.min(
    interpolate(frame,[0,music.fadeIn],[0,1],clamp),
    interpolate(frame,[timing.duration-music.fadeOut,timing.duration],[1,0],clamp),
  )}/>
  {audioCues.map((cue) => <Sequence key={cue.id} name={`Audio — ${cue.id}`} from={cue.from} durationInFrames={cue.duration}>
    <Audio src={staticFile(cue.src)} trimBefore={cue.trimBefore ?? 0} volume={(frame) => cue.gain * Math.min(
      interpolate(frame,[0,cue.fadeIn],[0,1],clamp),
      interpolate(frame,[cue.duration-cue.fadeOut,cue.duration],[1,0],clamp),
    )}/>
  </Sequence>)}
</>;
