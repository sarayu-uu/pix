"use client";
import { useEffect, useRef, CSSProperties } from "react";
import { gsap } from "@/lib/gsap";

// Accent colors
const ACCENT = {
  teal: "#3d8379",
  purple: "#7123ef",
  orange: "#e45d2d",
};

interface CustomCSSProperties extends CSSProperties {
  '--card-bg-color'?: string;
}

export default function ServicesPricingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate cards on scroll-in
    const cards = gsap.utils.toArray<HTMLElement>(section.querySelectorAll(".price-card"));
    const reveal = gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "power3.out",
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: { trigger: section, start: "top 75%" },
      }
    );

    // Hover interactions: scale, neon border pulse, tilt following mouse
    const glowTimelines = new WeakMap<Element, GSAPTimeline>();

    const handleEnter = (card: HTMLElement) => {
      const accent = card.getAttribute("data-accent") || ACCENT.teal;
      gsap.to(card, { scale: 1.05, duration: 0.25, ease: "power2.out" });
    };

    const handleLeave = (card: HTMLElement) => {
      gsap.to(card, { scale: 1, rotateX: 0, rotateY: 0, duration: 0.3, ease: "power2.out" });
    };

    const handleMove = (card: HTMLElement, e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width; // 0..1
      const relY = (e.clientY - rect.top) / rect.height; // 0..1
      const rotX = (0.5 - relY) * 10; // tilt up/down
      const rotY = (relX - 0.5) * 10; // tilt left/right
      gsap.to(card, { rotateX: rotX, rotateY: rotY, transformPerspective: 800, duration: 0.2, ease: "power2.out" });

    };

    // Attach events per card
    const cleanups: Array<() => void> = [];
    cards.forEach((cardEl) => {
      const card = cardEl as HTMLElement;
      const onEnter = () => handleEnter(card);
      const onLeave = () => handleLeave(card);
      const onMove = (e: Event) => handleMove(card, e as PointerEvent);

      card.addEventListener("pointerenter", onEnter);
      card.addEventListener("pointerleave", onLeave);
      card.addEventListener("pointermove", onMove);

      cleanups.push(() => {
        card.removeEventListener("pointerenter", onEnter);
        card.removeEventListener("pointerleave", onLeave);
        card.removeEventListener("pointermove", onMove);
      });
    });

    return () => {
      reveal.kill();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="pricing-section"
    >
      <div className="container">
        <header className="header">
          <h2 className="title">Our Plans</h2>
          <p className="subtitle">Pick your growth velocity</p>
        </header>

        <div className="grid">
          {/* Foundation */}
          <article className="price-card" data-accent={ACCENT.teal} style={{ borderColor: ACCENT.teal, "--card-bg-color": ACCENT.teal } as CustomCSSProperties}>
            <div className="card-inner">
              <h3 className="plan">Foundation</h3>
              <p className="tagline">For founders igniting their LinkedIn presence.</p>
              <ul className="bullets">
                <li>
                  <strong>3 posts per week</strong> → Text posts + curated visuals.
                </li>
                <li>Monthly performance report.</li>
                <li>Best for cold/dormant accounts ready to spark growth.</li>
              </ul>
              <div className="price"><span>₹83,000</span> / month</div>
            </div>
          </article>

          {/* Amplify */}
          <article className="price-card" data-accent={ACCENT.purple} style={{ borderColor: ACCENT.purple, "--card-bg-color": ACCENT.purple } as CustomCSSProperties}>
            <div className="card-inner">
              <h3 className="plan">Amplify</h3>
              <p className="tagline">For leaders ready to scale their reach.</p>
              <ul className="bullets">
                <li>
                  <strong>3 posts per week</strong> → Everything in Foundation.
                </li>
                <li>Custom carousels + video content.</li>
                <li>Ideal for inconsistent posters who want to level up.</li>
              </ul>
              <div className="price"><span>₹1,24,500</span> / month</div>

            </div>
          </article>

          {/* Influence */}
          <article className="price-card" data-accent={ACCENT.orange} style={{ borderColor: ACCENT.orange, "--card-bg-color": ACCENT.orange } as CustomCSSProperties}>
            <div className="card-inner">
              <h3 className="plan">Influence</h3>
              <p className="tagline">For serious players going all-in on LinkedIn.</p>
              <ul className="bullets">
                <li>
                  <strong>3 posts per week</strong> → Everything in Amplify.
                </li>
                <li>2 personal branding coaching calls every month.</li>
                <li>
                  Designed for founders aiming at maximum visibility, hiring, and funding traction.
                </li>
              </ul>
              <div className="price"><span>₹1,66,000</span> / month</div>

            </div>
          </article>
        </div>
      </div>

      <style jsx>{`
        .pricing-section {
          position: relative;
          padding: 80px 20px;
          background: #222;
          overflow: hidden;
          isolation: isolate;
        }
        .container {
          max-width: 1100px;
          margin: 0 auto;
        }
        .header { text-align: center; margin-bottom: 36px; }
        .title {
          margin: 0;
          font-family: Oswald, Anton, "Arial Black", system-ui, sans-serif;
          font-size: 40px;
          letter-spacing: 0.5px;
          color: var(--off-white);
        }
        .subtitle {
          margin-top: 6px;
          color: #cfcfcf;
          font-family: Inter, Montserrat, system-ui, sans-serif;
          font-size: 16px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .price-card {
          position: relative;
          border: 2px solid transparent; /* accent per card inline */
          border-radius: 14px;
          padding: 8px; /* space for inner white panel */
          
          perspective: 800px;
        }

        .card-inner {
          background: var(--card-bg-color); /* Use CSS variable for dynamic background */
          color: var(--off-white); /* ensure white text */
          border-radius: 10px;
          padding: 20px 18px 22px;
          min-height: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .plan {
          margin: 0;
          font-family: Inter, system-ui, sans-serif;
          font-size: 26px;
          line-height: 1.1;
          letter-spacing: 0.3px;
          color: var(--off-white);
        }
        .tagline {
          margin: 0;
          font-family: Inter, Montserrat, system-ui, sans-serif;
          color: var(--off-white);
          font-size: 15px;
        }
        .bullets {
          margin: 10px 0 6px;
          padding-left: 18px;
          display: grid;
          gap: 7px;
          color: var(--off-white);
          font-family: Inter, Montserrat, system-ui, sans-serif;
          font-size: 15px;
        }
        .bullets li {
          line-height: 1.4;
        }
        .price {
          margin-top: auto;
          font-family: Oswald, Anton, "Arial Black", system-ui, sans-serif;
          font-size: 16px;
          color: var(--off-white);
        }
        .price span {
          color: var(--off-white); /* price highlighted in white */
          font-weight: 700;
          font-size: 32px;
        }


        @media (max-width: 900px) {
          .grid { grid-template-columns: 1fr; }
          .title { font-size: 34px; }
        }
      `}</style>
    </section>
  );
}
