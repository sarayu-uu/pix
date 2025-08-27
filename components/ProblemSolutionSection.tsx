"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Helper: split letters for heading reveal
function splitTextLetters(el: HTMLElement) {
  const original = el.innerHTML;
  const text = el.textContent || "";
  const letters = Array.from(text);
  el.innerHTML = letters
    .map((ch) => (ch === " " ? `<span class=\"lt\" style=\"display:inline-block;width:.35em\">&nbsp;</span>` : `<span class=\"lt\" style=\"display:inline-block;will-change:transform\">${ch}</span>`))
    .join("");
  const nodes = Array.from(el.querySelectorAll(".lt")) as HTMLElement[];
  return {
    letters: nodes,
    revert: () => {
      el.innerHTML = original;
    }
  };
}

export default function ProblemSolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // Diagram refs
  const line1Ref = useRef<SVGPathElement>(null);
  const line2Ref = useRef<SVGPathElement>(null);
  const dot1Ref = useRef<SVGCircleElement>(null);
  const dot2Ref = useRef<SVGCircleElement>(null);
  const sq1Ref = useRef<SVGRectElement>(null);
  const sq2Ref = useRef<SVGRectElement>(null);
  const sq3Ref = useRef<SVGRectElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sub1Ref = useRef<HTMLParagraphElement>(null);
  const sub2Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;

    if (!section || !left || !right) return;

    // Ensure columns stretch same height
    // Parent .section already min-height: 100vh; make row stretch
    const row = section.querySelector(".row") as HTMLDivElement | null;
    if (row) (row.style.alignItems = "stretch");

    // Left: Problems — cards slide in from blur to solid when in view
    const cards = Array.from(left.querySelectorAll(".problem-card")) as HTMLElement[];
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0, filter: "grayscale(100%) blur(6px)" },
      {
        y: 0,
        opacity: 1,
        filter: "grayscale(0%) blur(0px)",
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: left, start: "top 80%" }
      }
    );

    // Right: Solution — heading SplitText-like reveal, squares drop-in, lines draw, subtexts fade-in
    const h = headingRef.current;
    const sq1 = sq1Ref.current;
    const sq2 = sq2Ref.current;
    const sq3 = sq3Ref.current;
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    const d1 = dot1Ref.current;
    const d2 = dot2Ref.current;

    const tl = gsap.timeline({ scrollTrigger: { trigger: right, start: "top 70%" } });

    if (h) {
      const split = splitTextLetters(h);
      tl.fromTo(
        split.letters,
        { yPercent: 120, opacity: 0, rotateX: -40 },
        { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.02, ease: "power3.out" }
      )
    }

    // Squares drop-in like stacking bricks
    if (sq1 && sq2 && sq3) {
      tl.fromTo(
        sq1,
        { y: -120, opacity: 0, rotate: -10, transformOrigin: "50% 50%" },
        { y: 0, opacity: 1, rotate: 0, duration: 0.7, ease: "bounce.out" },
        ">-0.1"
      )
        .fromTo(
          sq2,
          { y: -140, opacity: 0, rotate: 8, transformOrigin: "50% 50%" },
          { y: 0, opacity: 1, rotate: 0, duration: 0.7, ease: "bounce.out" },
          ">-0.1"
        )
        .fromTo(
          sq3,
          { y: -160, opacity: 0, rotate: -6, transformOrigin: "50% 50%" },
          { y: 0, opacity: 1, rotate: 0, duration: 0.7, ease: "bounce.out" },
          ">-0.1"
        );
    }

    // Lines draw-in; dots travel along as accent
    function setupPath(path: SVGPathElement | null, dot: SVGCircleElement | null) {
      if (!path) return;
      const len = (path as any).getTotalLength ? (path as any).getTotalLength() : 600;
      path.setAttribute("stroke-dasharray", String(len));
      path.setAttribute("stroke-dashoffset", String(len));
      tl.to(path, { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" }, ">-0.2");
      if (dot) {
        tl.to(
          dot,
          {
            // motionPath plugin is registered globally; cast to any for TS
            motionPath: { path, align: path, autoRotate: false } as any,
            duration: 0.8,
            ease: "none"
          },
          "<"
        );
      }
    }

    setupPath(l1, d1);
    setupPath(l2, d2);

    // Subtext fades in
    if (sub1Ref.current) tl.fromTo(sub1Ref.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, ">+0.1");
    if (sub2Ref.current) tl.fromTo(sub2Ref.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, ">-0.2");

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="section" style={{ background: "#222", color: "var(--off-white)" }}>
      <div className="max">
        <div className="row" style={{ alignItems: "stretch", gap: 32 }}>
          {/* Left: Problems */}
          <div ref={leftRef} className="col" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="kicker" style={{ color: "var(--off-white)", textTransform: "uppercase", letterSpacing: 1 }}>Problems</div>

            <div className="problem-card card" style={{ background: "rgba(248,248,248,0.08)", borderColor: "rgba(248,248,248,0.25)" }}>
              <h3 style={{ margin: 0, color: "var(--off-white)" }}>Fundraising</h3>
              <p style={{ margin: "8px 0 0", color: "#bbb", fontSize: 14 }}>
                Investors don’t trust founders without a strong online presence.
              </p>
            </div>

            <div className="problem-card card" style={{ background: "rgba(248,248,248,0.08)", borderColor: "rgba(248,248,248,0.25)" }}>
              <h3 style={{ margin: 0, color: "var(--off-white)" }}>Networking</h3>
              <p style={{ margin: "8px 0 0", color: "#bbb", fontSize: 14 }}>
                Endless coffee chats can’t scale your reach or influence.
              </p>
            </div>

            <div className="problem-card card" style={{ background: "rgba(248,248,248,0.08)", borderColor: "rgba(248,248,248,0.25)" }}>
              <h3 style={{ margin: 0, color: "var(--off-white)" }}>Hiring</h3>
              <p style={{ margin: "8px 0 0", color: "#bbb", fontSize: 14 }}>
                Top talent won’t join leaders who look invisible online.
              </p>
            </div>

            <div className="problem-card card" style={{ background: "rgba(248,248,248,0.08)", borderColor: "rgba(248,248,248,0.25)" }}>
              <h3 style={{ margin: 0, color: "var(--off-white)" }}>Time</h3>
              <p style={{ margin: "8px 0 0", color: "#bbb", fontSize: 14 }}>
                Founders are too busy running the company to manage LinkedIn.
              </p>
            </div>
          </div>

          {/* Right: Solution */}
          <div ref={rightRef} className="col" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="kicker" style={{ color: "var(--off-white)" }}>Solution</div>
            <h2 ref={headingRef} className="big" style={{ marginTop: 0, marginBottom: 0 }}>Pixora’s 3x3 Framework</h2>

            {/* Building blocks diagram */}
            <svg viewBox="0 0 800 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", marginTop: 0 }}>
              {/* Squares */}
              <rect ref={sq1Ref} x="90" y="60" width="120" height="120" rx="12" fill="var(--purple)" />
              <rect ref={sq2Ref} x="340" y="60" width="120" height="120" rx="12" fill="var(--teal)" />
              <rect ref={sq3Ref} x="590" y="60" width="120" height="120" rx="12" fill="var(--orange)" />

              {/* Labels inside squares */}
              <text x="150" y="125" textAnchor="middle" dominantBaseline="middle" fill="var(--off-white)" fontSize="16" fontWeight="700">Posts / week</text>
              <text x="400" y="125" textAnchor="middle" dominantBaseline="middle" fill="var(--off-white)" fontSize="16" fontWeight="700">Months</text>
              <text x="650" y="125" textAnchor="middle" dominantBaseline="middle" fill="var(--off-white)" fontSize="16" fontWeight="700">Reach</text>

              {/* Connecting thin animated lines */}
              <path ref={line1Ref} d="M210 120 C 250 90, 300 90, 340 120" fill="none" stroke="var(--off-white)" strokeOpacity="0.8" strokeWidth="3" />
              <path ref={line2Ref} d="M460 120 C 500 90, 550 90, 590 120" fill="none" stroke="var(--off-white)" strokeOpacity="0.8" strokeWidth="3" />

              {/* Dots traveling along lines */}
              <circle ref={dot1Ref} cx="210" cy="120" r="4" fill="var(--off-white)" />
              <circle ref={dot2Ref} cx="460" cy="120" r="4" fill="var(--off-white)" />
            </svg>

            {/* Supporting copy */}
            <p ref={sub1Ref} className="lead" style={{ color: "var(--off-white)", marginTop: 0 }}>
              Consistency compounds. Three posts per week, over months, builds exponential reach and trust.
            </p>
            <p ref={sub2Ref} style={{ color: "#ddd", marginTop: 0, fontSize: 16, lineHeight: 1.5 }}>
              Pixora runs your LinkedIn on autopilot, so you raise faster, hire smarter, and build influence without losing focus on your startup.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
