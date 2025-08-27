"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { splitTextWords } from "@/lib/gsap";

// Helper: wrap numbers (e.g., 2.1x, 18%, 22%) with spans for counter animation
function renderWithMetrics(text: string) {
  const parts: (string | JSX.Element)[] = [];
  const regex = /(\d+(?:\.\d+)?)(%|x)?/g; // captures number + optional suffix
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const [full, num, suffix] = match;
    const start = match.index;
    const end = start + full.length;

    if (start > lastIndex) parts.push(text.slice(lastIndex, start));

    const decimals = (num.includes(".")) ? (num.split(".")[1]?.length || 0) : 0;
    parts.push(
      <span
        key={`${start}-${end}`}
        className="metric"
        data-value={num}
        data-suffix={suffix || ""}
        data-decimals={decimals}
        style={{ display: "inline-block", minWidth: suffix ? undefined : 24 }}
      >
        {num}{suffix || ""}
      </span>
    );

    lastIndex = end;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}

export default function CaseStudiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const supportRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const ctx = gsap.context(() => {
      // SplitText-like word reveal for heading
      if (headingRef.current) {
        const split = splitTextWords(headingRef.current);
        gsap.fromTo(
          split.words,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: currentSection,
              start: "top 75%",
            },
            onComplete: () => split.revert(),
          }
        );
      }

      // Supporting line: fade up
      if (supportRef.current) {
        gsap.fromTo(
          supportRef.current,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: currentSection,
              start: "top 70%",
            },
          }
        );
      }

      // Case items: alternate horizontal slide + underline draw
      const items = gsap.utils.toArray<HTMLElement>(
        currentSection.querySelectorAll(".case-item")
      );

      items.forEach((item, i) => {
        const fromLeft = i % 2 === 0;
        const title = item.querySelector<HTMLElement>(".case-title");
        const underline = item.querySelector<HTMLElement>(".case-underline");
        const content = item.querySelector<HTMLElement>(".case-content");

        // Slide-in animation
        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(
              content,
              { x: fromLeft ? -60 : 60, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.75, ease: "power3.out" }
            );
            if (underline) {
              gsap.fromTo(
                underline,
                { scaleX: 0 },
                { scaleX: 1, duration: 0.7, ease: "power2.out", delay: 0.1 }
              );
            }
          },
          onLeaveBack: () => {
            // Reset for reverse scroll for a nice stacking effect
            gsap.set(content, { x: fromLeft ? -60 : 60, opacity: 0 }); /* Adjusted reset value */
            if (underline) gsap.set(underline, { scaleX: 0 });
          },
        });
      });

      // Metric counters (optional): animate any .metric spans
      const metricEls = gsap.utils.toArray<HTMLElement>(
        currentSection.querySelectorAll(".metric")
      );

      metricEls.forEach((el) => {
        const valueStr = el.getAttribute("data-value") || "";
        const suffix = el.getAttribute("data-suffix") || "";
        const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10) || 0;
        const target = parseFloat(valueStr);
        if (!isNaN(target)) {
          const obj = { n: 0 };
          ScrollTrigger.create({
            trigger: el.closest(".case-item") || el,
            start: "top 90%",
            onEnter: () => {
              gsap.to(obj, {
                n: target,
                duration: 1.2,
                ease: "power2.out",
                onUpdate: () => {
                  const current = obj.n.toFixed(decimals);
                  el.textContent = `${current}${suffix}`;
                },
              });
            },
            onLeaveBack: () => {
              obj.n = 0;
              el.textContent = `${(0).toFixed(decimals)}${suffix}`;
            },
          });
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const cases: { title: string; text: string; accent: string }[] = [
    {
      title: "Fintech Launch",
      text:
        "From stealth to scale—interactive metrics built investor confidence and accelerated fundraising momentum.",
      accent: "var(--teal)",
    },
    {
      title: "Enterprise SaaS",
      text:
        "Split-text storytelling powered clarity and urgency, driving a 2.1x increase in inbound demo requests and shortening sales cycles.",
      accent: "var(--purple)",
    },
    {
      title: "HealthTech",
      text:
        "Morphing iconography simplified complex product flows, leading to 18% faster adoption and smoother onboarding across teams.",
      accent: "var(--orange)",
    },
    {
      title: "Creator Tools",
      text:
        "Observer-powered gestures and microinteractions boosted signups by 22% while strengthening engagement with creators.",
      accent: "var(--blue)", // Assuming a blue variable exists or will be added
    },
  ];

  return (
    <section
      className="section"
      ref={sectionRef}
      style={{ background: "#1f1b16", color: "var(--off-white)" }}
    >
      <div className="max">
        <h1 ref={headingRef} className="big" style={{ margin: 0, color: "#d9d6d2" }}>
          Outcomes, not just outputs
        </h1>
        <p
          ref={supportRef}
          style={{ marginTop: 10, fontSize: 18, color: "#d9d6d2", maxWidth: 980 }}
        >
          Pixora transforms founder stories into measurable business outcomes—driving trust, traction, and growth.
        </p>

        <div className="case-studies-grid" style={{ marginTop: 24, display: "grid", gap: 16 }}> {/* Further reduced gap */}
          {cases.map((c, i) => {
            const fromLeft = i % 2 === 0;
            return (
              <div
                key={i}
                className={`case-item ${fromLeft ? "align-left" : "align-right"}`}
                style={{
                  willChange: "transform, opacity",
                  /* Removed initial opacity: 0 to ensure text is visible before animation */
                }}
              >
                <div className="case-content">
                  <h3
                    className="case-title"
                    data-accent={c.accent}
                    style={{
                      margin: 0,
                      fontSize: 24, /* Increased font size */
                      lineHeight: 1.2,
                      fontWeight: 700, /* font-bold */
                      color: "var(--off-white)", /* Changed to off-white */
                      display: "inline-block",
                    }}
                  >
                    {c.title}
                  </h3>
                  <div
                    className="case-underline"
                    style={{
                      height: 2,
                      width: 70, /* Adjusted underline width */
                      background: c.accent,
                      marginTop: 4, /* Reduced margin */
                      transform: "scaleX(0)",
                      transformOrigin: fromLeft ? "left" : "right",
                    }}
                  />
                  <p
                    className="case-description"
                    style={{
                      margin: "10px 0 0 0", /* Adjusted margin */
                      fontSize: 20, /* Increased font size */
                      color: "var(--off-white)", /* Changed to off-white */
                      lineHeight: 1.6, /* Comfortable line height */
                      maxWidth: 600, /* Adjusted max width */
                    }}
                  >
                    {renderWithMetrics(c.text)}
                  </p>
                </div>

                {/* Gradient divider */}
                {i < cases.length - 1 && (
                  <div
                    aria-hidden
                    style={{
                      height: 1,
                      background: "linear-gradient(90deg, var(--purple), var(--teal), var(--orange))",
                      margin: "16px 0", /* Further reduced margin for dividers */
                      opacity: 0.7,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
