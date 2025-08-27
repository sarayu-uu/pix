"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function WhyLinkedInSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card4InnerRef = useRef<HTMLDivElement>(null);

  const statNumberRef = useRef<HTMLSpanElement>(null);

  // Morphable icon paths (only used in Card 4)
  const magPathRef = useRef<SVGPathElement>(null);
  const handshakePathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Subtle parallax for diagonal grid background
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        backgroundPosition: "960px 640px", // Further increased values for a more profound parallax
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5 // Further increased scrub for a more prominent effect
        }
      });
    }

    // Animate all cards to drift in from left with a sleek effect
    const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current];
    gsap.fromTo(
      cards,
      { x: -100, opacity: 0 }, // All cards start at the same relative off-screen position
      {
        x: 0,
        opacity: 1,
        ease: "power2.out", // Sleek ease
        duration: 1.2, // Slower drift
        // Removed stagger to make them drift in a "block manner"
        scrollTrigger: { trigger: section, start: "top 75%" }
      }
    );

    // Counter once when visible (adjusted trigger to match card animation)
    if (card1Ref.current) {
      ScrollTrigger.create({
        trigger: section, // Trigger on the section, not individual card
        start: "top 75%",
        once: true,
        onEnter: () => {
          const numEl = statNumberRef.current;
          if (!numEl) return;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: 75,
            duration: 1.2,
            ease: "power1.out",
            onUpdate: () => {
              numEl.textContent = String(Math.round(obj.val));
            }
          });
        }
      });
    }

    // Icon morph (fallback to crossfade if MorphSVG unavailable) - kept as a hover effect
    const mag = magPathRef.current;
    const handshake = handshakePathRef.current;
    const hasMorph = (gsap as any).plugins && (gsap as any).plugins.MorphSVGPlugin;

    if (mag && handshake) {
      // On hover, morph to handshake; on leave, morph back (or crossfade fallback)
      const onEnter = () => {
          if (hasMorph) {
            gsap.to(mag, { duration: 0.6, ease: "power2.out", morphSVG: handshake });
          } else {
            gsap.to(handshake, { opacity: 1, duration: 0.4 });
            gsap.to(mag, { opacity: 0, duration: 0.4 }); // Removed "<"
          }
        };
        const onLeave = () => {
          const initialPath = mag.getAttribute("data-initial");
          if (hasMorph && initialPath) {
            gsap.to(mag, { duration: 0.6, ease: "power2.inOut", morphSVG: initialPath });
          } else {
            gsap.to(handshake, { opacity: 0, duration: 0.4 });
            gsap.to(mag, { opacity: 1, duration: 0.4 }); // Removed "<"
          }
        };

        // Store initial path for morphing back
        if (!mag.getAttribute("data-initial")) {
          mag.setAttribute("data-initial", mag.getAttribute("d") || "");
        }

      const c4 = card4Ref.current;
      if (c4) {
        c4.addEventListener("mouseenter", onEnter);
        c4.addEventListener("mouseleave", onLeave);
      }

      // Cleanup listeners
      return () => {
        if (c4) {
          c4.removeEventListener("mouseenter", onEnter);
          c4.removeEventListener("mouseleave", onLeave);
        }
      };
    }

    // Cleanup all ScrollTriggers created for this component on unmount
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#222", /* Changed background to match HeroSection */
        color: "var(--off-white)", /* Warm off-white for text */
        minHeight: "75vh", /* Reduced section height to 3/4th of viewport */
        maxHeight: "75vh", /* Reduced section height to 3/4th of viewport */
        paddingTop: "10px",
        paddingBottom: "10px",
        borderTop: "1px solid rgba(255,255,255,0.2)", /* Added top border */
        borderBottom: "1px solid rgba(255,255,255,0.2)", /* Added bottom border */
      }}
    >
      {/* Diagonal subtle blue grid background with parallax */}
      <div
        ref={bgRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(0,102,255,0.08) 0, rgba(0,102,255,0.08) 1px, transparent 1px, transparent 20px)",
          backgroundSize: "auto",
          backgroundPosition: "0px 0px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="max" style={{ position: "relative", zIndex: 1 }}>
        <h2
          ref={headingRef}
          className="big"
          style={{ marginTop: 0, marginBottom: 8, color: "var(--off-white)" }}
        >
          Why LinkedIn?
        </h2>

        <div
          className="grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(220px, 1fr))",
            gap: 16,
            marginTop: 24,
          }}
        >
          {/* Card 1: Stat counter */}
          <div
            ref={card1Ref}
            className="card"
            style={{
              background: "rgba(248,248,248,0.1)", /* Adjusted card background for dark theme */
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Simple icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4a6 6 0 1 1 0 12A6 6 0 0 1 10 4Zm7.5 15.1-4.3-4.3" stroke="var(--off-white)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div style={{ fontWeight: 700, color: "var(--off-white)" }}>VCs check LinkedIn</div>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span ref={statNumberRef} style={{ fontSize: 40, fontWeight: 800, color: "var(--off-white)", lineHeight: 1 }}>0</span>
              <span style={{ fontSize: 28, fontWeight: 800, color: "var(--off-white)" }}>%</span>
            </div>
            <p style={{ margin: 0, color: "#ccc" }}> of investors review your profile before a meeting. 
              <br />→ Turn first impressions into instant trust.</p>
          </div>

          {/* Card 2: Slide in from left */}
          <div
            ref={card2Ref}
            className="card"
            style={{
              background: "rgba(248,248,248,0.1)", /* Adjusted card background for dark theme */
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6h16M4 12h10M4 18h8" stroke="var(--off-white)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div style={{ fontWeight: 700, color: "var(--off-white)" }}>Attract top talent</div>
            </div>
            <p style={{ margin: 0, color: "#ccc" }}>The best candidates follow strong leaders. <br /> → Showcase vision and magnetize A-players.</p>
          </div>

          {/* Card 3: Zoom-in grow */}
          <div
            ref={card3Ref}
            className="card"
            style={{
              background: "rgba(248,248,248,0.1)", /* Adjusted card background for dark theme */
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17l6-6 4 4 7-7" stroke="var(--off-white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div style={{ fontWeight: 700, color: "var(--off-white)" }}>Raise funding with credibility</div>
            </div>
            <p style={{ margin: 0, color: "#ccc" }}>Consistency builds visibility, and visibility builds trust. <br />→ Become the founder investors believe in.</p>
          </div>

          {/* Card 4: Flip card + Morph icon */}
          <div
            ref={card4Ref}
            className="card" /* Keep card class for default styling */
            style={{
              perspective: 900,
              background: "rgba(248,248,248,0.1)", /* Adjusted card background for dark theme */
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              ref={card4InnerRef}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                transformStyle: "preserve-3d",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* Morph-capable SVG icon */}
                <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flex: "0 0 auto" }}>
                  {/* Magnifying glass path (initial) */}
                  <path
                    ref={magPathRef}
                    d="M28 12a16 16 0 1 1 0 32 16 16 0 0 1 0-32Zm18 30-10-10"
                    stroke="var(--off-white)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Handshake path (hidden unless morph/crossfade) */}
                  <path
                    ref={handshakePathRef}
                    d="M12 36l8 6c2 1.5 4.5 1.5 6.5 0l3.5-3.5 3.5 3.5c2 1.5 4.5 1.5 6.5 0l8-6M20 28l8 6 8-6"
                    stroke="var(--off-white)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    style={{ opacity: 0 }}
                  />
                </svg>
                <div style={{ fontWeight: 700, color: "var(--off-white)" }}>Close enterprise deals</div>
              </div>
              <p style={{ margin: 0, color: "#ccc" }}>
                Decision-makers buy from leaders they recognize. <br />→ Convert cold outreach into warm conversations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
