import { Composition } from "remotion";
import { PrivKitDemo } from "./PrivKitDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Main demo video - 84 seconds */}
      <Composition
        id="PrivKitDemo"
        component={PrivKitDemo}
        durationInFrames={2510}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
