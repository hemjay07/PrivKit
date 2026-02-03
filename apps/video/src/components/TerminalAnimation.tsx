import { AbsoluteFill, useCurrentFrame } from "remotion";

// Design System Colors
const COLORS = {
  bgMain: "#0A0A0F",
  bgSurface: "#12121A",
  bgElevated: "#1A1A24",
  primary: "#F59E0B",
  textDim: "#71717A",
};

interface TerminalLine {
  text: string;
  delay: number;
  typeSpeed?: number;
  color?: string;
  prefix?: string;
}

interface TerminalAnimationProps {
  lines: TerminalLine[];
  startFrame?: number;
  width?: number;
  height?: number;
}

export const TerminalAnimation: React.FC<TerminalAnimationProps> = ({
  lines,
  startFrame = 0,
  width = 900,
  height = 500,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width,
          height,
          backgroundColor: COLORS.bgMain,
          borderRadius: "16px",
          overflow: "hidden",
          border: `1px solid ${COLORS.bgElevated}`,
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            height: 44,
            backgroundColor: COLORS.bgSurface,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 8,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28c840" }} />
          <span
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              color: COLORS.textDim,
              fontSize: 13,
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            Terminal
          </span>
        </div>

        {/* Terminal Content */}
        <div
          style={{
            padding: "20px 24px",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 16,
            lineHeight: 1.8,
          }}
        >
          {lines.map((line, index) => {
            const lineStartFrame = startFrame + line.delay;
            const typeSpeed = line.typeSpeed || 2;
            const relativeFrame = frame - lineStartFrame;

            if (relativeFrame < 0) return null;

            const visibleChars = Math.floor(relativeFrame / typeSpeed);
            const fullText = (line.prefix || "") + line.text;
            const displayText = fullText.slice(0, visibleChars);
            const isTyping = visibleChars < fullText.length;

            return (
              <div key={index} style={{ minHeight: 28 }}>
                <span style={{ color: line.color || COLORS.primary }}>{displayText}</span>
                {isTyping && (
                  <span
                    style={{
                      backgroundColor: COLORS.primary,
                      width: 10,
                      height: 20,
                      display: "inline-block",
                      marginLeft: 2,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
