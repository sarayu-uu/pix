"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function CallToActionSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 80%" }
    });

    tl.fromTo(el.querySelector("h2"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
      .fromTo(el.querySelector("a"), { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, "<+0.1");

    return () => { tl.kill(); };
  }, []);

  return (
    <section className="section contrast" style={{ color: "var(--off-white)" }}>
      <div className="max" style={{ textAlign: "center" }}>
        <h2 className="big">Ready to add gravity to your story?</h2>
        <p className="lead">Let's choreograph a narrative your audience can't ignore.</p>
        <div style={{ marginTop: 20 }}>
          <a href="#" className="btn">Start the Project</a>
        </div>
      </div>
    </section>
  );
}
