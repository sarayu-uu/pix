"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Simple parallax canvas background
export default function ParallaxCanvas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const circles: HTMLDivElement[] = [];
    for (let i = 0; i < 12; i++) {
      const c = document.createElement("div");
      c.style.position = "absolute";
      c.style.borderRadius = "50%";
      c.style.width = `${40 + Math.random() * 140}px`;
      c.style.height = c.style.width;
      c.style.left = `${Math.random() * 100}%`;
      c.style.top = `${Math.random() * 5000}px`;
      c.style.background = i % 3 === 0 ? "var(--purple)" : i % 3 === 1 ? "var(--teal)" : "var(--orange)";
      c.style.filter = "blur(4px)";
      c.style.opacity = "0.2";
      el.appendChild(c);
      circles.push(c);
    }

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      circles.forEach((c, idx) => {
        gsap.to(c, {
          y: () => (idx % 2 ? 200 : -200),
          ease: "none",
          scrollTrigger: {
            trigger: c,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    });

    return () => {
      circles.forEach((c) => c.remove());
      mm.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return <div ref={ref} className="canvas-bg" aria-hidden="true" />;
}