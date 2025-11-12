# GSAP Effects Used in Pixora Project

This document outlines the GSAP animation effects implemented across various components in the Pixora project, including a brief description and the relevant code snippet for each.

---

## HeroSection.tsx

### 1. Letter Reveal for Tagline
**Description**: Individual letters of the main heading animate from a lower, faded, and rotated state to their original position, creating a staggered reveal effect.
```typescript
    const split = splitTextLetters(title);
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      split.letters,
      { yPercent: 120, opacity: 0, rotateX: -60 },
      { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.03 }
    );
```

### 2. Subtext Fade-up
**Description**: The subtext animates from slightly below its final position and faded out, then moves up and fades in.
```typescript
    tl.fromTo(
      sub,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "<+0.2"
    );
```

### 3. CTA Pulse
**Description**: The Call-to-Action button continuously scales slightly and adds a subtle box shadow, then reverses the animation (`yoyo: true`) and repeats indefinitely.
```typescript
    const pulse = gsap.to(cta, {
      scale: 1.05,
      boxShadow: "0 0 0px rgba(0,0,0,0), 0 0 24px rgba(228,93,45,0.5)",
      duration: 0.6,
      yoyo: true,
      repeat: -1,
      repeatDelay: 1.4,
      ease: "power2.inOut"
    });
```

### 4. Magnetic Hover
**Description**: The CTA button subtly follows the mouse cursor within a defined offset when the mouse moves over the section, and resets to its original position when the mouse leaves.
```typescript
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
```

---

## ProblemSolutionSection.tsx

### 1. Problem Cards Slide-in
**Description**: Problem cards animate from a lower position, faded out, grayscale, and blurred, then slide up, fade in, become full color, and sharpen as they scroll into view.
```typescript
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
```

### 2. Solution Heading Letter Reveal
**Description**: Individual letters of the solution heading animate from a lower position, faded out, and rotated, then animate to their final state in a staggered reveal.
```typescript
    if (h) {
      const split = splitTextLetters(h);
      tl.fromTo(
        split.letters,
        { yPercent: 120, opacity: 0, rotateX: -40 },
        { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.02, ease: "power3.out" }
      )
    }
```

### 3. Squares Drop-in
**Description**: Three square elements drop in from above, faded out, and slightly rotated, then settle into their positions with a bounce effect, appearing like stacking bricks.
```typescript
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
```

### 4. Lines Draw-in & Dots Travel
**Description**: SVG paths draw themselves by animating the `strokeDashoffset` property, and small dots travel along these paths using the `MotionPathPlugin`.
```typescript
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
```

### 5. Subtext Fade-in
**Description**: Two subtext paragraphs animate from slightly below their final position and faded out, then move up and fade in.
```typescript
    if (sub1Ref.current) tl.fromTo(sub1Ref.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, ">+0.1");
    if (sub2Ref.current) tl.fromTo(sub2Ref.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, ">-0.2");
```

---

## ServicesPricingSection.tsx

### 1. Pricing Cards Reveal
**Description**: The pricing cards animate from a lower position and faded out, then slide up and fade in with a stagger effect as they scroll into view.
```typescript
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
```

### 2. Hover Interactions (Scale, Tilt)
**Description**: When hovered, cards slightly scale up and tilt based on mouse position, and revert to their original state on mouse leave.
```typescript
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
```

---

## HowWeDoItSection.tsx

### 1. Heading Animation
**Description**: The main heading animates from a lower position and faded out, then slides up and fades in as it scrolls into view.
```typescript
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
```

### 2. Steps Animation
**Description**: The individual "how-we-do-it" steps animate from a lower position, faded out, and scaled down, then slide up, fade in, and scale to their original size with a stagger effect as they scroll into view.
```typescript
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
```

### 3. CTA Button Pulse (onComplete)
**Description**: After the steps animation completes, the CTA button continuously pulses by scaling it slightly, repeating indefinitely.
```typescript
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
```

### 4. Icon Hover Animation
**Description**: When a step is hovered, its icon scales up slightly, and scales back down on mouse leave.
```typescript
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
```

---

## WhyLinkedInSection.tsx

### 1. Diagonal Grid Background Parallax
**Description**: A subtle parallax effect on a diagonal grid background. The `backgroundPosition` property is animated as the user scrolls, giving the impression of depth.
```typescript
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        backgroundPosition: "960px 640px",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });
    }
```

### 2. Cards Drift-in
**Description**: Four cards animate from an off-screen left position and faded out, then drift in to their final positions as they scroll into view.
```typescript
    const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current];
    gsap.fromTo(
      cards,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 1.2,
        scrollTrigger: { trigger: section, start: "top 75%" }
      }
    );
```

### 3. Stat Counter
**Description**: A numerical counter animates from 0 to 75, updating the `textContent` of a span element, when the first card scrolls into view.
```typescript
      ScrollTrigger.create({
        trigger: section,
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
```

### 4. Icon Morph (or Crossfade)
**Description**: An SVG icon (magnifying glass to handshake) morphs on hover using `MorphSVGPlugin` (if available). If not, it falls back to a crossfade effect between two SVG paths.
```typescript
    const mag = magPathRef.current;
    const handshake = handshakePathRef.current;
    const hasMorph = (gsap as any).plugins && (gsap as any).plugins.MorphSVGPlugin;

    if (mag && handshake) {
      const onEnter = () => {
          if (hasMorph) {
            gsap.to(mag, { duration: 0.6, ease: "power2.out", morphSVG: handshake });
          } else {
            gsap.to(handshake, { opacity: 1, duration: 0.4 });
            gsap.to(mag, { opacity: 0, duration: 0.4 });
          }
        };
        const onLeave = () => {
          const initialPath = mag.getAttribute("data-initial");
          if (hasMorph && initialPath) {
            gsap.to(mag, { duration: 0.6, ease: "power2.inOut", morphSVG: initialPath });
          } else {
            gsap.to(handshake, { opacity: 0, duration: 0.4 });
            gsap.to(mag, { opacity: 1, duration: 0.4 });
          }
        };

        if (!mag.getAttribute("data-initial")) {
          mag.setAttribute("data-initial", mag.getAttribute("d") || "");
        }

      const c4 = card4Ref.current;
      if (c4) {
        c4.addEventListener("mouseenter", onEnter);
        c4.addEventListener("mouseleave", onLeave);
      }
    }
```

---

## CaseStudiesSection.tsx

### 1. Heading Word Reveal
**Description**: Individual words of the main heading animate from slightly below their final position and faded out, then slide up and fade in with a stagger effect as they scroll into view.
```typescript
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
```

### 2. Supporting Line Fade Up
**Description**: A supporting paragraph animates from slightly below its final position and faded out, then slides up and fades in as it scrolls into view.
```typescript
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
```

### 3. Case Items Slide-in & Underline Draw
**Description**: Case study content slides in horizontally (alternating from left/right), and an underline element draws itself by animating its `scaleX` property.
```typescript
      items.forEach((item, i) => {
        const fromLeft = i % 2 === 0;
        const title = item.querySelector<HTMLElement>(".case-title");
        const underline = item.querySelector<HTMLElement>(".case-underline");
        const content = item.querySelector<HTMLElement>(".case-content");

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
            gsap.set(content, { x: fromLeft ? -60 : 60, opacity: 0 });
            if (underline) gsap.set(underline, { scaleX: 0 });
          },
        });
      });
```

### 4. Metric Counters
**Description**: Numerical metrics within the case study descriptions animate from 0 to their target value when their respective case item scrolls into view.
```typescript
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
```

---

## CallToActionSection.tsx

### 1. Heading Fade-up
**Description**: The main heading animates from a lower position and faded out, then slides up and fades in.
```typescript
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 80%" }
    });

    tl.fromTo(el.querySelector("h2"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
```

### 2. Button Scale-in
**Description**: The CTA button animates from a scaled-down, faded state, then scales up and fades in with a "back" ease, creating a bouncy entrance.
```typescript
      .fromTo(el.querySelector("a"), { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, "<+0.1");
