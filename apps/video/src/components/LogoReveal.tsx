import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

interface LogoRevealProps {
  startFrame?: number;
  duration?: number;
}

export const LogoReveal: React.FC<LogoRevealProps> = ({
  startFrame = 0,
  duration = 60,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0) return null;

  const progress = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 15, stiffness: 100, mass: 0.5 },
  });

  const opacity = interpolate(relativeFrame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = interpolate(progress, [0, 1], [0.5, 1]);
  const blur = interpolate(relativeFrame, [0, 15], [10, 0], {
    extrapolateRight: "clamp",
  });

  // Glow animation
  const glowIntensity = interpolate(
    relativeFrame,
    [20, 40, 60],
    [0, 1, 0.6],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          filter: `blur(${blur}px)`,
          textAlign: "center",
        }}
      >
        {/* ASCII Logo */}
        <pre
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 14,
            color: "#fff",
            textShadow: `0 0 ${30 * glowIntensity}px #8b5cf6, 0 0 ${60 * glowIntensity}px #8b5cf680`,
            lineHeight: 1.2,
            margin: 0,
          }}
        >
{`  ██████╗ ██████╗ ██╗██╗   ██╗██╗  ██╗██╗████████╗
  ██╔══██╗██╔══██╗██║██║   ██║██║ ██╔╝██║╚══██╔══╝
  ██████╔╝██████╔╝██║██║   ██║█████╔╝ ██║   ██║
  ██╔═══╝ ██╔══██╗██║╚██╗ ██╔╝██╔═██╗ ██║   ██║
  ██║     ██║  ██║██║ ╚████╔╝ ██║  ██╗██║   ██║
  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝   ╚═╝`}
        </pre>

        {/* Tagline */}
        <div
          style={{
            marginTop: 24,
            fontSize: 24,
            color: "#a1a1aa",
            fontFamily: "Inter, system-ui, sans-serif",
            opacity: interpolate(relativeFrame, [30, 50], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          Zero to private in one command
        </div>
      </div>
    </AbsoluteFill>
  );
};
