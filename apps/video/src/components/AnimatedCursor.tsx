import { interpolate, useCurrentFrame, Easing } from "remotion";

interface CursorPosition {
  frame: number;
  x: number;
  y: number;
  click?: boolean;
}

interface AnimatedCursorProps {
  positions: CursorPosition[];
  color?: string;
}

export const AnimatedCursor: React.FC<AnimatedCursorProps> = ({
  positions,
  color = "#fff",
}) => {
  const frame = useCurrentFrame();

  // Find current and next position
  let currentPos = positions[0];
  let nextPos = positions[0];
  let progress = 0;

  for (let i = 0; i < positions.length - 1; i++) {
    if (frame >= positions[i].frame && frame < positions[i + 1].frame) {
      currentPos = positions[i];
      nextPos = positions[i + 1];
      progress = interpolate(
        frame,
        [positions[i].frame, positions[i + 1].frame],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease) }
      );
      break;
    }
  }

  // Use last position if past all keyframes
  if (frame >= positions[positions.length - 1].frame) {
    currentPos = positions[positions.length - 1];
    nextPos = currentPos;
    progress = 1;
  }

  const x = interpolate(progress, [0, 1], [currentPos.x, nextPos.x]);
  const y = interpolate(progress, [0, 1], [currentPos.y, nextPos.y]);

  // Check for click animation
  const isClicking = currentPos.click && frame - currentPos.frame < 15;
  const clickScale = isClicking
    ? interpolate(frame - currentPos.frame, [0, 5, 15], [1, 0.8, 1], {
        extrapolateRight: "clamp",
      })
    : 1;

  const clickRipple = isClicking
    ? interpolate(frame - currentPos.frame, [0, 15], [0, 50], {
        extrapolateRight: "clamp",
      })
    : 0;

  const clickOpacity = isClicking
    ? interpolate(frame - currentPos.frame, [0, 15], [0.6, 0], {
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <>
      {/* Click Ripple */}
      {isClicking && (
        <div
          style={{
            position: "absolute",
            left: x - clickRipple / 2,
            top: y - clickRipple / 2,
            width: clickRipple,
            height: clickRipple,
            borderRadius: "50%",
            backgroundColor: color,
            opacity: clickOpacity,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Cursor */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        style={{
          position: "absolute",
          left: x,
          top: y,
          transform: `scale(${clickScale})`,
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
          pointerEvents: "none",
        }}
      >
        <path
          d="M4 4L12 20L14 14L20 12L4 4Z"
          fill={color}
          stroke="#000"
          strokeWidth="1.5"
        />
      </svg>
    </>
  );
};
