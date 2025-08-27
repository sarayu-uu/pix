"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function HowWeDoItSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: currentSection,
            start: "top 75%",
          },
        }
      );

      // Steps animation
      gsap.fromTo(
        stepsRef.current,
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: currentSection,
            start: "top 60%",
          },
          onComplete: () => {
            // CTA button pulse after steps appear
            if (ctaButtonRef.current) {
              gsap.to(ctaButtonRef.current, {
                scale: 1.05,
                repeat: -1,
                yoyo: true,
                duration: 0.6,
                ease: "power1.inOut",
                delay: 0.5,
              });
            }
          },
        }
      );

      // Hover animation for icons
      stepsRef.current.forEach((step) => {
        if (step) {
          const icon = step.querySelector(".how-we-do-it-icon");
          if (icon) {
            gsap.to(icon, {
              scale: 1.1,
              duration: 0.3,
              ease: "power1.out",
              paused: true,
              onReverseComplete: () => {
                gsap.to(icon, { scale: 1, duration: 0.3, ease: "power1.out" });
              },
            }).revert(); // Revert on unmount
            step.addEventListener("mouseenter", () => gsap.to(icon, { scale: 1.1, duration: 0.3, ease: "power1.out" }));
            step.addEventListener("mouseleave", () => gsap.to(icon, { scale: 1, duration: 0.3, ease: "power1.out" }));
          }
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const steps = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-message-square"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
      title: "Deep Dive & Strategy",
      description: "We start with a comprehensive audit and strategy session to understand your unique goals and audience.",
      accent: "var(--purple)",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-layout"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      ),
      title: "Content Creation & Optimization",
      description: "Our team crafts compelling content, optimized for engagement and designed to resonate with your target market.",
      accent: "var(--teal)",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-zap"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      ),
      title: "Amplify & Engage",
      description: "We deploy and manage your content, actively engaging with your audience to maximize reach and impact.",
      accent: "var(--orange)",
    },
  ];

  return (
    <section className="section" ref={sectionRef} style={{ background: "#222", color: "var(--off-white)" }}>
      <div className="max" style={{ textAlign: "center" }}>
        <h2 ref={headingRef} className="big" style={{ margin: "0 0 40px 0", fontSize: 60, lineHeight: 1, color: "var(--off-white)" }}>
          How We Do It
        </h2>

        <div className="how-we-do-it-grid">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => {
                stepsRef.current[i] = el;
              }}
              className="how-we-do-it-step"
              style={{
                background: "rgba(248,248,248,0.1)", /* Adjusted card background for dark theme */
                padding: "30px",
                borderRadius: "16px",
                border: "1px solid rgba(248,248,248,0.2)", /* Adjusted border for dark theme */
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)", /* Adjusted shadow for dark theme */
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "15px",
                willChange: "transform, opacity",
              }}
            >
              <div
                className="how-we-do-it-icon"
                style={{ color: step.accent, transition: "transform 0.3s ease-out" }}
              >
                {step.icon}
              </div>
              <h3 style={{ margin: 0, fontSize: "24px", fontWeight: 700, color: "var(--off-white)" }}>
                {step.title}
              </h3>
              <p style={{ margin: 0, fontSize: "16px", color: "#ccc", lineHeight: 1.5 }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <a
          href="#contact"
          className="btn"
          ref={ctaButtonRef}
          style={{ marginTop: "60px", fontSize: "20px", padding: "16px 32px" }}
        >
          Book a Call
        </a>
      </div>
    </section>
  );
}
