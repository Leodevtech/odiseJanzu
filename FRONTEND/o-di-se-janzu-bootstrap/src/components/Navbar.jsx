"use client";

import Link from "next/link";
import { useState } from "react";

// Liens de navigation communs à toutes les pages
const NAV_LINKS = [
  { label: "🏠", href: "/" },
  { label: "Qui suis-je ?", href: "/qui-suis-je" },
  { label: "Janzu", href: "/janzu" },
  { label: "Galerie Photo", href: "/galerie" },
  { label: "Contactez-moi", href: "/#contact" },
  { label: "Liens", href: "/#liens" },
];

// Navbar commune à toutes les pages — gère son propre état de menu burger
export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav
      className="navbar navbar-expand-md"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        background: "transparent",
        padding: "12px 24px",
      }}
    >
      <Link className="navbar-brand" href="/">
        <img
          src="/assets/logo_bulle.jpg"
          alt="Logo"
          width={40}
          height={40}
          style={{ borderRadius: "50%" }}
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setNavOpen(!navOpen)}
        style={{
          border: "1px solid rgba(255,255,255,0.5)",
          padding: "4px 8px",
        }}
      >
        <span style={{ color: "white", fontSize: "1.4rem" }}>☰</span>
      </button>
      <div className={`collapse navbar-collapse ${navOpen ? "show" : ""}`}>
        <ul className="navbar-nav mx-auto gap-md-3">
          {NAV_LINKS.map((item) => (
            <li className="nav-item" key={item.label}>
              <a
                href={item.href}
                className="nav-link"
                onClick={() => setNavOpen(false)}
                style={{
                  color: "white",
                  fontSize: "0.9rem",
                  textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}