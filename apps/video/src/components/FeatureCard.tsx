import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  startFrame: number;
  x?: number;
  y?: number;
  color?: string;
  index?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  startFrame,
  x,
  y,
  color = "#8b5cf6",
  index = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame - index * 8;

  if (relativeFrame < 0) return null;

  const progress = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const opacity = interpolate(relativeFrame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(progress, [0, 1], [30, 0]);
  const scale = interpolate(progress, [0, 1], [0.9, 1]);

  // Use absolute positioning only if x and y are provided and non-zero
  const useAbsolute = x !== undefined && y !== undefined && (x !== 0 || y !== 0);

  return (
    <div
      style={{
        ...(useAbsolute
          ? { position: "absolute" as const, left: x, top: y }
          : {}),
        width: 280,
        backgroundColor: "#18181b",
        borderRadius: 16,
        padding: 24,
        border: `1px solid ${color}30`,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        boxShadow: `0 0 30px ${color}15`,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          backgroundColor: `${color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          fontSize: 24,
        }}
      >
        {icon}
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: "#fff",
          fontFamily: "Inter, system-ui, sans-serif",
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: 14,
          color: "#a1a1aa",
          fontFamily: "Inter, system-ui, sans-serif",
          lineHeight: 1.5,
        }}
      >
        {description}
      </div>
    </div>
  );
};
