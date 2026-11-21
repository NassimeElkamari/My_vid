import { MyComposition } from "./Composition";
import { Wach3arefComposition } from "./darija/Wach3arefReel";
import { OpeningV2Composition } from "./darija/opening-v2/OpeningV2";
import { Reel02Composition } from "./darija/reel-02/Reel02";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Wach3arefComposition />
      <OpeningV2Composition />
      <Reel02Composition />
    </>
  );
};
