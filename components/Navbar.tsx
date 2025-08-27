"use client";

import React, { useState, useEffect } from "react";
import { gsap } from "@/lib/gsap";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (!el) return;
    // Prefer native smooth scroll (less bundle + better perf); fallback to jump
    if ('scrollBehavior' in document.documentElement.style) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: el.offsetTop, behavior: 'auto' });
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 4rem)",
        maxWidth: "800px",
        padding: "0.8rem 2rem",
        backdropFilter: `blur(10px) saturate(180%)`,
        backgroundColor: isHovered ? "rgba(248, 248, 248, 0.25)" : "rgba(248, 248, 248, 0.1)",
        backgroundImage: `none`,
        border: "1px solid rgba(248, 248, 248, 0.15)",
        borderRadius: "15px",
        zIndex: 1000,
        transition: "background-color 0.3s ease-in-out, border-color 0.3s ease-in-out",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ul style={{ display: "flex", justifyContent: "center", listStyle: "none", margin: 0, padding: 0 }}>
        <li style={{ margin: "0 1rem" }}>
          <a
            href="#hero"
            onClick={(e) => handleScroll(e, "hero")}
            style={{ color: "var(--off-white)", textDecoration: "none", fontSize: "1.1rem", fontWeight: 500 }}
          >
            Home
          </a>
        </li>
        <li style={{ margin: "0 1rem" }}>
          <a
            href="#about"
            onClick={(e) => handleScroll(e, "about")}
            style={{ color: "var(--off-white)", textDecoration: "none", fontSize: "1.1rem", fontWeight: 500 }}
          >
            Solution
          </a>
        </li>
        <li style={{ margin: "0 1rem" }}>
          <a
            href="#why"
            onClick={(e) => handleScroll(e, "why")}
            style={{ color: "var(--off-white)", textDecoration: "none", fontSize: "1.1rem", fontWeight: 500 }}
          >
            Why LinkedIn
          </a>
        </li>
        <li style={{ margin: "0 1rem" }}>
          <a
            href="#services"
            onClick={(e) => handleScroll(e, "services")}
            style={{ color: "var(--off-white)", textDecoration: "none", fontSize: "1.1rem", fontWeight: 500 }}
          >
            Plans
          </a>
        </li>
        <li style={{ margin: "0 1rem" }}>
          <a
            href="#case-studies"
            onClick={(e) => handleScroll(e, "case-studies")}
            style={{ color: "var(--off-white)", textDecoration: "none", fontSize: "1.1rem", fontWeight: 500 }}
          >
            Outcomes
          </a>
        </li>
        <li style={{ margin: "0 1rem" }}>
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, "contact")}
            style={{ color: "var(--off-white)", textDecoration: "none", fontSize: "1.1rem", fontWeight: 500 }}
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
