import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

interface TextRevealProps {
  text: string;
  startFrame?: number;
  fontSize?: number;
  color?: string;
  style?: "fade" | "slide" | "typewriter" | "blur";
  align?: "left" | "center" | "right";
  y?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  startFrame = 0,
  fontSize = 48,
  color = "#fff",
  style = "fade",
  align = "center",
  y,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0) return null;

  const progress = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const getAnimationStyles = () => {
    switch (style) {
      case "fade":
        return {
          opacity: interpolate(relativeFrame, [0, 20], [0, 1], {
            extrapolateRight: "clamp",
          }),
        };
      case "slide":
        return {
          opacity: interpolate(relativeFrame, [0, 15], [0, 1], {
            extrapolateRight: "clamp",
          }),
          transform: `translateY(${interpolate(progress, [0, 1], [40, 0])}px)`,
        };
      case "typewriter":
        const visibleChars = Math.floor(relativeFrame / 2);
        return {
          clipPath: `inset(0 ${100 - (visibleChars / text.length) * 100}% 0 0)`,
        };
      case "blur":
        return {
          opacity: interpolate(relativeFrame, [0, 20], [0, 1], {
            extrapolateRight: "clamp",
          }),
          filter: `blur(${interpolate(relativeFrame, [0, 20], [15, 0], {
            extrapolateRight: "clamp",
          })}px)`,
        };
      default:
        return {};
    }
  };

  return (
    <AbsoluteFill
      style={{
        justifyContent: y !== undefined ? "flex-start" : "center",
        alignItems: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
        paddingTop: y,
        paddingLeft: align === "left" ? 80 : 0,
        paddingRight: align === "right" ? 80 : 0,
      }}
    >
      <div
        style={{
          fontSize,
          fontWeight: 700,
          color,
          fontFamily: "Inter, system-ui, sans-serif",
          letterSpacing: "-0.02em",
          ...getAnimationStyles(),
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
