"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Small helper for consistent brick styling
function brickStyle(colorFrom: string, colorTo: string): React.CSSProperties {
  return {
    width: 40,
    height: 40,
    borderRadius: 8,
    background: `linear-gradient(145deg, ${colorFrom}, ${colorTo})`,
    boxShadow: "0 6px 0 rgba(0,0,0,0.35), 0 0 0 2px rgba(255,255,255,0.08)"
  };
}

export default function SolutionHeading() {
  const sectionRef = useRef<HTMLElement>(null);
  const playfieldRef = useRef<HTMLDivElement>(null);
  const purpleRef = useRef<HTMLDivElement>(null);
  const tealRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);
  const glowSweepRef = useRef<HTMLDivElement>(null);
  const lineClearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pf = playfieldRef.current;
    const purple = purpleRef.current;
    const teal = tealRef.current;
    const orange = orangeRef.current;
    const glow = glowSweepRef.current;
    const line = lineClearRef.current;

    if (!section || !pf || !purple || !teal || !orange) return;

    // Positions for blocks (absolute inside playfield)
    // Stack order: purple left, teal middle, orange right
    gsap.set([purple, teal, orange], { y: -220, opacity: 0, rotate: -12 });
    gsap.set(purple, { x: 0 });
    gsap.set(teal, { x: 150, rotate: 10 });
    gsap.set(orange, { x: 300, rotate: -8 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top 72%" },
      defaults: { ease: "power3.out" }
    });

    // Drop purple
    tl.to(purple, { opacity: 1, duration: 0.1 })
      .to(purple, { y: 100, rotate: 0, duration: 0.9, ease: "bounce.out" })
      // Drop teal
      .to(teal, { opacity: 1, duration: 0.1 }, ">-0.5")
      .to(teal, { y: 100, rotate: 0, duration: 0.9, ease: "bounce.out" }, "<")
      // Drop orange
      .to(orange, { opacity: 1, duration: 0.1 }, ">-0.5")
      .to(orange, { y: 100, rotate: 0, duration: 0.9, ease: "bounce.out" }, "<")
      // Glow sweep once across blocks
      .add(() => {
        if (!glow) return;
        gsap.fromTo(
          glow,
          { x: -80, opacity: 0 },
          { x: 420, opacity: 1, duration: 0.8, ease: "power2.inOut", onComplete: () => gsap.to(glow, { opacity: 0, duration: 0.2 }) }
        );
      })
      // Optional line clear flash
      .add(() => {
        if (!line) return;
        gsap.fromTo(line, { opacity: 0 }, { opacity: 1, duration: 0.08, yoyo: true, repeat: 3 });
      }, ">-0.3");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="section" style={{ background: "#222", color: "var(--off-white)", paddingTop: 64, paddingBottom: 64 }}>
      <div className="max" style={{ position: "relative" }}>
        {/* Top-right label */}
        <div style={{ position: "absolute", right: 0, top: -8, fontSize: 12, letterSpacing: 2, color: "#bbb", zIndex: 2 }}>
          SOLUTION
        </div>

        {/* Background grid (subtle tetris playfield) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            maskImage: "linear-gradient(#000, #000, transparent)",
            opacity: 0.3,
            pointerEvents: "none",
            zIndex: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 32px), repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 32px)"
          }}
        />

        {/* Heading */}
        <h2 className="big" style={{ margin: 0, position: "relative", zIndex: 2 }}>Pixora’s 3x3 Framework</h2>

        {/* Playfield for stacking blocks */}
        <div ref={playfieldRef} style={{ position: "relative", height: 180, marginTop: 12, zIndex: 1 }}>
          {/* Glow sweep overlay */}
          <div
            ref={glowSweepRef}
            style={{
              position: "absolute",
              top: 20,
              left: 0,
              width: 80,
              height: 140,
              background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 100%)",
              filter: "blur(2px)",
              opacity: 0,
              pointerEvents: "none"
            }}
          />

          {/* Line clear flash */}
          <div
            ref={lineClearRef}
            style={{
              position: "absolute",
              left: 0,
              top: 120,
              width: 420,
              height: 4,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
              filter: "drop-shadow(0 0 6px rgba(255,255,255,0.8))",
              opacity: 0,
              pointerEvents: "none"
            }}
          />

          {/* Purple block (Posts / week) */}
          <div ref={purpleRef} style={{ position: "absolute", bottom: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 40px)", gap: 6 }}>
              <div style={brickStyle("#7a35f3", "#6120e6")} />
              <div style={brickStyle("#7a35f3", "#6120e6")} />
              <div style={brickStyle("#7a35f3", "#6120e6")} />
              <div style={brickStyle("#7a35f3", "#6120e6")} />
            </div>
            <div style={{ marginTop: 8, textAlign: "center", fontWeight: 700, color: "var(--off-white)" }}>Posts / week</div>
          </div>

          {/* Teal block (Months) */}
          <div ref={tealRef} style={{ position: "absolute", bottom: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 40px)", gap: 6 }}>
              <div style={brickStyle("#449c8f", "#3d8379")} />
              <div style={brickStyle("#449c8f", "#3d8379")} />
              <div style={brickStyle("#449c8f", "#3d8379")} />
              <div style={brickStyle("#449c8f", "#3d8379")} />
            </div>
            <div style={{ marginTop: 8, textAlign: "center", fontWeight: 700, color: "var(--off-white)" }}>Months</div>
          </div>

          {/* Orange block (Reach) */}
          <div ref={orangeRef} style={{ position: "absolute", bottom: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 40px)", gap: 6 }}>
              <div style={brickStyle("#ef774e", "#e45d2d")} />
              <div style={brickStyle("#ef774e", "#e45d2d")} />
              <div style={brickStyle("#ef774e", "#e45d2d")} />
              <div style={brickStyle("#ef774e", "#e45d2d")} />
            </div>
            <div style={{ marginTop: 8, textAlign: "center", fontWeight: 700, color: "var(--off-white)" }}>Reach</div>
          </div>
        </div>
      </div>
    </section>
  );
}