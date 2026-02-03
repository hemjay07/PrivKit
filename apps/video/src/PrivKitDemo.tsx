import {
  AbsoluteFill,
  Sequence,
  useVideoConfig,
  interpolate,
  useCurrentFrame,
  spring,
  Audio,
  staticFile,
  Video,
  OffthreadVideo,
  Img,
  getRemotionEnvironment,
} from "remotion";
import { LogoReveal } from "./components/LogoReveal";
import { TerminalAnimation } from "./components/TerminalAnimation";

// ============================================================
// PRIVKIT DEMO VIDEO - FINAL
// Duration: ~84 seconds (2510 frames at 30fps)
// Colors: Gold/Amber (#F59E0B) - Crypto Casino Dark theme
// NO PURPLE - matches app design system
// ============================================================

// Design System Colors (from CLAUDE.md)
const COLORS = {
  bgMain: "#0A0A0F",
  bgSurface: "#12121A",
  bgElevated: "#1A1A24",
  primary: "#F59E0B",      // Gold
  primaryHover: "#FBBF24",
  primaryMuted: "#D97706",
  textPrimary: "#FAFAFA",
  textMuted: "#A1A1AA",
  textDim: "#71717A",
  border: "#27272A",
  success: "#22C55E",
  error: "#EF4444",
};

// Feature Card - Self-contained with relative timing
const FeatureCardInline: React.FC<{
  title: string;
  description: string;
  icon: string;
  delay: number;
  color: string;
}> = ({ title, description, icon, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - delay;

  const progress = spring({
    frame: Math.max(0, relativeFrame),
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const opacity = interpolate(relativeFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(progress, [0, 1], [30, 0]);

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: COLORS.bgSurface,
        borderRadius: 20,
        padding: 32,
        border: `1px solid ${COLORS.border}`,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          backgroundColor: `${color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
          fontSize: 28,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 600,
          color: COLORS.textPrimary,
          fontFamily: "Inter, system-ui, sans-serif",
          marginBottom: 12,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 16,
          color: COLORS.textMuted,
          fontFamily: "Inter, system-ui, sans-serif",
          lineHeight: 1.6,
        }}
      >
        {description}
      </div>
    </div>
  );
};

// Checklist Item - Self-contained with relative timing
const ChecklistItemInline: React.FC<{
  text: string;
  delay: number;
}> = ({ text, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - delay;

  const progress = spring({
    frame: Math.max(0, relativeFrame),
    fps,
    config: { damping: 20, stiffness: 150 },
  });

  const opacity = interpolate(relativeFrame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        fontSize: 32,
        color: COLORS.textPrimary,
        fontFamily: "Inter, system-ui, sans-serif",
        opacity,
        transform: `translateX(${interpolate(progress, [0, 1], [-30, 0])}px)`,
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 24,
      }}
    >
      <span style={{ color: COLORS.primary, fontSize: 28 }}>✓</span>
      {text}
    </div>
  );
};

export const PrivKitDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgMain,
      }}
    >
      {/* Background Music - looped with fade out at end */}
      <Audio
        src={staticFile("audio/bg-music.mp3")}
        loop
        volume={(f) => {
          // Fade in over first 30 frames (1 second)
          const fadeIn = interpolate(f, [0, 30], [0, 0.5], { extrapolateRight: "clamp" });
          // Fade out over last 60 frames (2 seconds)
          const fadeOut = interpolate(f, [2450, 2510], [0.5, 0], { extrapolateLeft: "clamp" });
          // Use minimum of both (fade in first, then fade out at end)
          return Math.min(fadeIn, fadeOut);
        }}
      />

      {/* ============================================================
          SCENE 1: Logo Reveal (0-60 frames / 0-2 seconds)
          ============================================================ */}
      <Sequence from={0} durationInFrames={60}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {(() => {
            const f = useCurrentFrame();
            const opacity = interpolate(f, [5, 20], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
            const scale = interpolate(
              spring({ frame: Math.max(0, f - 5), fps, config: { damping: 15 } }),
              [0, 1],
              [0.8, 1]
            );

            return (
              <div style={{ opacity, transform: `scale(${scale})`, textAlign: "center" }}>
                <pre
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 16,
                    color: COLORS.primary,
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
                <div
                  style={{
                    marginTop: 24,
                    fontSize: 24,
                    color: COLORS.textMuted,
                    fontFamily: "Inter, system-ui, sans-serif",
                    opacity: interpolate(f, [25, 40], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
                  }}
                >
                  Zero to private in one command
                </div>
              </div>
            );
          })()}
        </AbsoluteFill>
      </Sequence>

      {/* ============================================================
          SCENE 2: Problem Statement (60-130 frames / 2-4.3 seconds)
          ============================================================ */}
      <Sequence from={60} durationInFrames={70}>
        {(() => {
          const f = useCurrentFrame();
          const titleOpacity = interpolate(f, [0, 12], [0, 1], { extrapolateRight: "clamp" });
          const hardOpacity = interpolate(f, [15, 27], [0, 1], { extrapolateRight: "clamp" });
          const painOpacity = interpolate(f, [30, 42], [0, 1], { extrapolateRight: "clamp" });

          return (
            <AbsoluteFill
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: 64,
                  fontWeight: 700,
                  color: COLORS.textPrimary,
                  fontFamily: "Inter, system-ui, sans-serif",
                  textAlign: "center",
                  opacity: titleOpacity,
                }}
              >
                Building Solana Privacy Apps
              </div>
              <div
                style={{
                  fontSize: 64,
                  fontWeight: 700,
                  color: COLORS.error,
                  fontFamily: "Inter, system-ui, sans-serif",
                  textAlign: "center",
                  marginTop: 10,
                  opacity: hardOpacity,
                }}
              >
                is Hard.
              </div>
              <div
                style={{
                  marginTop: 50,
                  fontSize: 28,
                  color: COLORS.textDim,
                  fontFamily: "Inter, system-ui, sans-serif",
                  textAlign: "center",
                  opacity: painOpacity,
                }}
              >
                Multiple SDKs • Complex setup • Hours of boilerplate
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ============================================================
          SCENE 3: Solution Intro (130-170 frames / 4.3-5.7 seconds)
          ============================================================ */}
      <Sequence from={130} durationInFrames={40}>
        {(() => {
          const f = useCurrentFrame();
          const opacity = interpolate(f, [0, 12], [0, 1], { extrapolateRight: "clamp" });
          const scale = interpolate(
            spring({ frame: f, fps, config: { damping: 12, stiffness: 100 } }),
            [0, 1],
            [0.5, 1]
          );

          return (
            <AbsoluteFill
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: 96,
                  fontWeight: 700,
                  color: COLORS.primary,
                  fontFamily: "Inter, system-ui, sans-serif",
                  opacity,
                  transform: `scale(${scale})`,
                }}
              >
                Until Now.
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ============================================================
          SCENE 4: Terminal Demo (170-380 frames / 5.7-12.7 seconds)
          ============================================================ */}
      <Sequence from={170} durationInFrames={210}>
        <TerminalAnimation
          startFrame={0}
          lines={[
            { text: "$ npx create-solana-privacy-app my-app", delay: 0, color: COLORS.textPrimary, typeSpeed: 1 },
            { text: "", delay: 35 },
            { text: "  ██████╗ ██████╗ ██╗██╗   ██╗██╗  ██╗██╗████████╗", delay: 42, color: COLORS.primary, typeSpeed: 0.15 },
            { text: "  ██╔══██╗██╔══██╗██║██║   ██║██║ ██╔╝██║╚══██╔══╝", delay: 47, color: COLORS.primary, typeSpeed: 0.15 },
            { text: "  ██████╔╝██████╔╝██║██║   ██║█████╔╝ ██║   ██║", delay: 52, color: COLORS.primary, typeSpeed: 0.15 },
            { text: "  ██╔═══╝ ██╔══██╗██║╚██╗ ██╔╝██╔═██╗ ██║   ██║", delay: 57, color: COLORS.primary, typeSpeed: 0.15 },
            { text: "  ██║     ██║  ██║██║ ╚████╔╝ ██║  ██╗██║   ██║", delay: 62, color: COLORS.primary, typeSpeed: 0.15 },
            { text: "  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝   ╚═╝", delay: 67, color: COLORS.primary, typeSpeed: 0.15 },
            { text: "", delay: 75 },
            { text: "  Zero to private in one command", delay: 80, color: COLORS.textMuted, typeSpeed: 0.6 },
            { text: "", delay: 95 },
            { text: "? Which template?", delay: 100, color: COLORS.primary, typeSpeed: 0.6 },
            { text: "  ❯ privacy-cash   - Stablecoin privacy", delay: 115, color: COLORS.success, typeSpeed: 0.4 },
            { text: "    light-protocol - ZK compression", delay: 125, color: COLORS.textPrimary, typeSpeed: 0.4 },
            { text: "    arcium         - Multi-party compute", delay: 135, color: COLORS.textPrimary, typeSpeed: 0.4 },
            { text: "    full-stack     - All SDKs combined", delay: 145, color: COLORS.textPrimary, typeSpeed: 0.4 },
            { text: "", delay: 165 },
            { text: "✔ Created my-app successfully!", delay: 175, color: COLORS.success, typeSpeed: 0.6 },
          ]}
          width={1000}
          height={520}
        />
      </Sequence>

      {/* ============================================================
          SCENE 5: Features (380-530 frames / 12.7-17.7 seconds)
          ============================================================ */}
      <Sequence from={380} durationInFrames={150}>
        {(() => {
          const f = useCurrentFrame();
          const titleOpacity = interpolate(f, [0, 12], [0, 1], { extrapolateRight: "clamp" });
          const taglineOpacity = interpolate(f, [80, 95], [0, 1], { extrapolateRight: "clamp" });

          return (
            <AbsoluteFill>
              {/* Title */}
              <div
                style={{
                  position: "absolute",
                  top: 60,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  fontSize: 52,
                  fontWeight: 700,
                  color: COLORS.textPrimary,
                  fontFamily: "Inter, system-ui, sans-serif",
                  opacity: titleOpacity,
                }}
              >
                4 Production-Ready Templates
              </div>

              {/* Cards - 2x2 Grid */}
              <div
                style={{
                  position: "absolute",
                  top: 150,
                  left: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 600,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 380px)",
                    gridTemplateRows: "repeat(2, auto)",
                    gap: 40,
                  }}
                >
                  <FeatureCardInline
                    title="Privacy Cash"
                    description="Stablecoin privacy with zero-knowledge proofs for confidential transactions"
                    icon="🔐"
                    delay={15}
                    color={COLORS.success}
                  />
                  <FeatureCardInline
                    title="Light Protocol"
                    description="ZK compression for scalable private state on Solana"
                    icon="⚡"
                    delay={25}
                    color={COLORS.primary}
                  />
                  <FeatureCardInline
                    title="Arcium"
                    description="Multi-party computation for collaborative privacy solutions"
                    icon="🛡️"
                    delay={35}
                    color={COLORS.primaryMuted}
                  />
                  <FeatureCardInline
                    title="Full Stack"
                    description="All privacy SDKs combined with a unified API interface"
                    icon="🚀"
                    delay={45}
                    color={COLORS.primaryHover}
                  />
                </div>
              </div>

              {/* Tagline */}
              <div
                style={{
                  position: "absolute",
                  bottom: 60,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  fontSize: 26,
                  color: COLORS.textMuted,
                  fontFamily: "Inter, system-ui, sans-serif",
                  opacity: taglineOpacity,
                }}
              >
                Pre-configured • Type-safe • Ready to deploy
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ============================================================
          SCENE 6: What's Included (530-680 frames / 17.7-22.7 seconds)
          ============================================================ */}
      <Sequence from={530} durationInFrames={150}>
        {(() => {
          const f = useCurrentFrame();
          const titleOpacity = interpolate(f, [0, 12], [0, 1], { extrapolateRight: "clamp" });

          return (
            <AbsoluteFill
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Title */}
              <div
                style={{
                  position: "absolute",
                  top: 150,
                  fontSize: 56,
                  fontWeight: 700,
                  color: COLORS.textPrimary,
                  fontFamily: "Inter, system-ui, sans-serif",
                  opacity: titleOpacity,
                }}
              >
                Everything You Need
              </div>

              {/* Checklist - Two columns, centered */}
              <div
                style={{
                  display: "flex",
                  gap: 100,
                  marginTop: 80,
                }}
              >
                {/* Left column */}
                <div>
                  <ChecklistItemInline text="Next.js 14 App Router" delay={20} />
                  <ChecklistItemInline text="TypeScript + Tailwind" delay={30} />
                  <ChecklistItemInline text="Wallet Integration" delay={40} />
                </div>
                {/* Right column */}
                <div>
                  <ChecklistItemInline text="Privacy SDK Configured" delay={50} />
                  <ChecklistItemInline text="Test Suite Included" delay={60} />
                  <ChecklistItemInline text="Deploy Scripts Ready" delay={70} />
                </div>
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ============================================================
          SCENE 7: Homepage Demo (680-2420 frames / 22.7-80.7 seconds)
          Screen recording at 1x speed (normal)
          ============================================================ */}
      <Sequence from={680} durationInFrames={1740}>
        {(() => {
          const f = useCurrentFrame();
          const titleOpacity = interpolate(f, [0, 15, 60, 75], [0, 1, 1, 0], { extrapolateRight: "clamp" });
          const videoOpacity = interpolate(f, [30, 60], [0, 1], { extrapolateRight: "clamp" });
          const videoScale = interpolate(f, [30, 60], [0.95, 1], { extrapolateRight: "clamp" });

          return (
            <AbsoluteFill style={{ backgroundColor: COLORS.bgMain }}>
              {/* Title overlay - fades out */}
              <div
                style={{
                  position: "absolute",
                  top: 40,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  fontSize: 36,
                  fontWeight: 600,
                  color: COLORS.textPrimary,
                  fontFamily: "Inter, system-ui, sans-serif",
                  opacity: titleOpacity,
                  zIndex: 10,
                }}
              >
                Interactive Landing Page Demo
              </div>

              {/* Video container */}
              <div
                style={{
                  position: "absolute",
                  top: 60,
                  left: 60,
                  right: 60,
                  bottom: 60,
                  opacity: videoOpacity,
                  transform: `scale(${videoScale})`,
                  borderRadius: 16,
                  overflow: "hidden",
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                {getRemotionEnvironment().isRendering ? (
                  <OffthreadVideo
                    src={staticFile("recordings/homepage-demo-web.mp4")}
                    playbackRate={1}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: COLORS.bgSurface,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 20,
                    }}
                  >
                    <div style={{ fontSize: 48, color: COLORS.primary }}>🎬</div>
                    <div
                      style={{
                        fontSize: 24,
                        color: COLORS.textMuted,
                        fontFamily: "Inter, system-ui, sans-serif",
                      }}
                    >
                      Screen Recording
                    </div>
                    <div
                      style={{
                        fontSize: 16,
                        color: COLORS.textDim,
                        fontFamily: "Inter, system-ui, sans-serif",
                      }}
                    >
                      (Video plays during render)
                    </div>
                  </div>
                )}
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* ============================================================
          SCENE 8: CTA / Closing (2420-2510 frames / 80.7-83.7 seconds)
          Quick 3 second closing
          ============================================================ */}
      <Sequence from={2420} durationInFrames={90}>
        {(() => {
          const f = useCurrentFrame();
          const logoOpacity = interpolate(f, [0, 15], [0, 1], { extrapolateRight: "clamp" });
          const logoScale = interpolate(
            spring({ frame: f, fps, config: { damping: 15 } }),
            [0, 1],
            [0.8, 1]
          );
          const taglineOpacity = interpolate(f, [20, 35], [0, 1], { extrapolateRight: "clamp" });
          const ctaOpacity = interpolate(f, [40, 55], [0, 1], { extrapolateRight: "clamp" });
          const ctaY = interpolate(
            spring({ frame: Math.max(0, f - 40), fps, config: { damping: 15 } }),
            [0, 1],
            [20, 0]
          );
          const githubOpacity = interpolate(f, [55, 70], [0, 1], { extrapolateRight: "clamp" });

          return (
            <AbsoluteFill
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Logo */}
              <div
                style={{
                  opacity: logoOpacity,
                  transform: `scale(${logoScale})`,
                }}
              >
                <pre
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 16,
                    color: COLORS.primary,
                    lineHeight: 1.2,
                    margin: 0,
                    textAlign: "center",
                  }}
                >
{`  ██████╗ ██████╗ ██╗██╗   ██╗██╗  ██╗██╗████████╗
  ██╔══██╗██╔══██╗██║██║   ██║██║ ██╔╝██║╚══██╔══╝
  ██████╔╝██████╔╝██║██║   ██║█████╔╝ ██║   ██║
  ██╔═══╝ ██╔══██╗██║╚██╗ ██╔╝██╔═██╗ ██║   ██║
  ██║     ██║  ██║██║ ╚████╔╝ ██║  ██╗██║   ██║
  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝   ╚═╝`}
                </pre>
              </div>

              {/* Tagline */}
              <div
                style={{
                  marginTop: 30,
                  fontSize: 28,
                  color: COLORS.textMuted,
                  fontFamily: "Inter, system-ui, sans-serif",
                  opacity: taglineOpacity,
                }}
              >
                Zero to private in one command
              </div>

              {/* CTA Button */}
              <div
                style={{
                  marginTop: 50,
                  backgroundColor: COLORS.primary,
                  padding: "20px 48px",
                  borderRadius: 12,
                  fontSize: 26,
                  fontWeight: 600,
                  color: COLORS.bgMain,
                  fontFamily: "JetBrains Mono, monospace",
                  opacity: ctaOpacity,
                  transform: `translateY(${ctaY}px)`,
                }}
              >
                npx create-solana-privacy-app
              </div>

              {/* GitHub link */}
              <div
                style={{
                  marginTop: 25,
                  fontSize: 20,
                  color: COLORS.textDim,
                  fontFamily: "Inter, system-ui, sans-serif",
                  opacity: githubOpacity,
                }}
              >
                github.com/hemjay07/PrivKit
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>
    </AbsoluteFill>
  );
};
