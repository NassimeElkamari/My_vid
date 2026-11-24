import { MyComposition } from "./Composition";
import { Wach3arefComposition } from "./darija/Wach3arefReel";
import { OpeningV2Composition } from "./darija/opening-v2/OpeningV2";
import { Reel02Composition } from "./darija/reel-02/Reel02";

import { TicklesComposition } from "./darija/reel-03/TicklesReel";

import { PaperComposition } from "./darija/reel-03-paper/PaperReel";

import { Reel4Composition } from "./reel4/Reel4";

import { Reel5Composition } from "./reel5/Reel5";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Wach3arefComposition />
      <OpeningV2Composition />
      <Reel02Composition />
      <TicklesComposition />
      <PaperComposition />
      <Reel4Composition />
      <Reel5Composition />
    </>
  );
};
