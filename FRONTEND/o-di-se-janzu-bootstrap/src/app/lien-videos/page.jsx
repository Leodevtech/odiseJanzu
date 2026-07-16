"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

// Liens de réseaux sociaux — repris de ContactForm.jsx pour rester cohérent
const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61579396826909",
    icon: "bi-facebook",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/odisejanzu/",
    icon: "bi-instagram",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@%C3%94diS%C3%A9Janzu-Voyageaquatique",
    icon: "bi-youtube",
  },
  {
    label: "Janzu.fr",
    href: "https://www.janzu.fr/",
    icon: "bi-droplet-fill",
  },
];

export default function LiensVideosPage() {
  return (
    <main style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#2d3748", backgroundColor: "#fff" }}>
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section style={{ position: "relative", height: "50vh", overflow: "hidden" }}>
        <Image
          src="/assets/4K-sous-eau-2.jpg"
          alt="Fond sous-marin"
          fill
          quality={90}
          style={{ objectFit: "cover", objectPosition: "50% 40%" }}
          priority
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,30,60,0.35)" }} />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
        >
          <Image
            src="/assets/logo_bulle.jpg"
            alt="Logo Ô di Sé Janzu"
            width={110}
            height={110}
            quality={90}
            style={{ borderRadius: "50%" }}
          />
        </div>
      </section>

      {/* TITRE + INTRO */}
      <motion.section
        style={{ padding: "60px 40px 20px", maxWidth: "700px", margin: "0 auto", textAlign: "center" }}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <h1 style={{ fontSize: "2.4rem", fontWeight: 400, marginBottom: "24px" }}>Liens &amp; Vidéos</h1>
        <p style={{ lineHeight: 1.9, color: "#555", fontSize: "1rem" }}>
          Retrouvez toutes les actualités du Janzu et suivez les prochaines séances sur les réseaux sociaux.
        </p>
      </motion.section>

      {/* LIENS RÉSEAUX SOCIAUX */}
      <motion.section
        style={{ padding: "20px 40px 80px", maxWidth: "700px", margin: "0 auto" }}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {SOCIAL_LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={staggerItem}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "20px 24px",
                borderRadius: "12px",
                background: "#f4f8fb",
                color: "#2d3748",
                textDecoration: "none",
                fontSize: "1.1rem",
                border: "1px solid #e0e8ee",
                transition: "background 0.2s",
              }}
            >
              <i className={`bi ${link.icon}`} style={{ fontSize: "1.6rem", color: "#5b6f8a" }} />
              {link.label}
            </motion.a>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
