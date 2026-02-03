import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface FocusHighlightProps {
  x: number;
  y: number;
  width: number;
  height: number;
  startFrame: number;
  duration?: number;
  label?: string;
  style?: "glow" | "bracket" | "underline" | "circle";
  color?: string;
}

export const FocusHighlight: React.FC<FocusHighlightProps> = ({
  x,
  y,
  width,
  height,
  startFrame,
  duration = 60,
  label,
  style = "glow",
  color = "#7c3aed",
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0 || relativeFrame > duration) return null;

  const opacity = interpolate(
    relativeFrame,
    [0, 10, duration - 10, duration],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  const scale = interpolate(relativeFrame, [0, 15], [0.8, 1], {
    extrapolateRight: "clamp",
  });

  const pulse = Math.sin(relativeFrame * 0.15) * 0.1 + 1;

  const getStyleClasses = () => {
    switch (style) {
      case "glow":
        return {
          border: `3px solid ${color}`,
          boxShadow: `0 0 20px ${color}80, 0 0 40px ${color}40, inset 0 0 20px ${color}20`,
          borderRadius: "8px",
        };
      case "bracket":
        return {
          borderLeft: `4px solid ${color}`,
          borderRight: `4px solid ${color}`,
          borderTop: "none",
          borderBottom: "none",
        };
      case "underline":
        return {
          borderBottom: `4px solid ${color}`,
          boxShadow: `0 4px 15px ${color}60`,
        };
      case "circle":
        return {
          border: `3px solid ${color}`,
          borderRadius: "50%",
          boxShadow: `0 0 25px ${color}60`,
        };
      default:
        return {};
    }
  };

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Highlight Box */}
      <div
        style={{
          position: "absolute",
          left: x - 8,
          top: y - 8,
          width: width + 16,
          height: height + 16,
          transform: `scale(${scale * pulse})`,
          transformOrigin: "center",
          pointerEvents: "none",
          ...getStyleClasses(),
        }}
      />

      {/* Label */}
      {label && (
        <div
          style={{
            position: "absolute",
            left: x + width / 2,
            top: y - 45,
            transform: "translateX(-50%)",
            backgroundColor: color,
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: 600,
            fontFamily: "Inter, system-ui, sans-serif",
            whiteSpace: "nowrap",
            boxShadow: `0 4px 15px ${color}60`,
          }}
        >
          {label}
          {/* Arrow */}
          <div
            style={{
              position: "absolute",
              bottom: -8,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: `8px solid ${color}`,
            }}
          />
        </div>
      )}
    </AbsoluteFill>
  );
};
