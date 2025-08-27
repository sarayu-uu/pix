"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Observer } from "gsap/Observer";

// Register core plugins once per client session
if (typeof window !== "undefined" && !(gsap as any).__pluginsRegistered) {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, Observer);
  (gsap as any).__pluginsRegistered = true;
}

// Lightweight SplitText-like utility for words only (safe fallback)
export function splitTextWords(element: HTMLElement) {
  const originalHTML = element.innerHTML;
  const text = element.textContent || "";
  const words = text.trim().split(/\s+/);
  element.innerHTML = words
    .map((w, i) => `<span class=\"split-word\" style=\"display:inline-block;will-change:transform\">${w}${i < words.length - 1 ? "&nbsp;" : ""}</span>`) 
    .join("");
  const nodes = Array.from(element.querySelectorAll(".split-word")) as HTMLElement[];
  return {
    words: nodes,
    revert: () => {
      element.innerHTML = originalHTML;
    }
  };
}

export { gsap, ScrollTrigger, MotionPathPlugin, Observer };