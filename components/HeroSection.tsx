"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Helper: split an element's text into letter spans (revert on cleanup)
function splitTextLetters(el: HTMLElement) {
  const original = el.innerHTML;
  const text = el.textContent || "";
  const letters = Array.from(text);
  el.innerHTML = letters
    .map((ch) => {
      if (ch === " ") return `<span class=\"lt\" style=\"display:inline-block;width:.35em\">&nbsp;</span>`;
      return `<span class=\"lt\" style=\"display:inline-block;will-change:transform\">${ch}</span>`;
    })
    .join("");
  const nodes = Array.from(el.querySelectorAll(".lt")) as HTMLElement[];
  return {
    letters: nodes,
    revert: () => {
      el.innerHTML = original;
    }
  };
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const sub = subRef.current;
    const cta = ctaRef.current;

    if (!section || !title || !sub || !cta) return;

    // 1) Letter reveal for tagline
    const split = splitTextLetters(title);
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      split.letters,
      { yPercent: 120, opacity: 0, rotateX: -60 },
      { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.03 }
    );

    // 2) Subtext fade-up
    tl.fromTo(
      sub,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "<+0.2"
    );

    // 3) CTA pulse (every ~2s)
    const pulse = gsap.to(cta, {
      scale: 1.05,
      boxShadow: "0 0 0px rgba(0,0,0,0), 0 0 24px rgba(228,93,45,0.5)",
      duration: 0.6,
      yoyo: true,
      repeat: -1,
      repeatDelay: 1.4,
      ease: "power2.inOut"
    });

    // 4) Magnetic hover
    const maxOffset = 14; // px
    const handleMove = (e: MouseEvent) => {
      const rect = cta.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = gsap.utils.clamp(-maxOffset, maxOffset, (e.clientX - cx) * 0.15);
      const dy = gsap.utils.clamp(-maxOffset, maxOffset, (e.clientY - cy) * 0.15);
      gsap.to(cta, { x: dx, y: dy, duration: 0.25, ease: "power3.out" });
    };
    const resetMagnet = () => gsap.to(cta, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
    section.addEventListener("mousemove", handleMove);
    section.addEventListener("mouseleave", resetMagnet);

    return () => {
      split.revert();
      tl.kill();
      pulse.kill();
      section.removeEventListener("mousemove", handleMove);
      section.removeEventListener("mouseleave", resetMagnet);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section"
      style={{
        background: "#222",
        color: "var(--off-white)"
      }}
    >
      {/* Content */}
      <div className="max" style={{ textAlign: "center", position: "relative" }}>
        <span className="badge" style={{ background: "#008080", color: "var(--off-white)" }}>Autopilot • Growth • Influence</span>
        <h1 ref={titleRef} className="big" style={{ marginTop: 12 }}>
          Your LinkedIn Presence. On Autopilot.
        </h1>
        <p ref={subRef} className="lead" style={{ maxWidth: 760, margin: "10px auto 0" }}>
          Turn your profile into a growth engine for fundraising, hiring, and influence.
        </p>
        <div style={{ marginTop: 28 }}>
          <a
            ref={ctaRef}
            className="btn"
            href="#get-started"
            style={{ background: "#e45d2d", borderColor: "#222", color: "var(--off-white)" }}
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
