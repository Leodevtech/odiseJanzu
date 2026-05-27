"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import api from "@/api/axios.js";

export default function Home() {
  // états
  const [photos, setPhotos] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null);

  // CHARGEMENT DES PHOTOS
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await api.get("/photos"); // route publique
        // slice(-5) = garde les 5dernières photos .reverse plus récente au plus vieux
        setPhotos(res.data.slice(-5).reverse());
      } catch (e) {
        console.error("Erreur chargement photos", e);
      }
      fetchPhotos();
    };
  }, []);

  //FOnctions carousel
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? photos.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === photos.length - 1 ? 0 : prev + 1));

  // Formulaire
  const handleChange = async (e) => {
    e.preventDefault(); // empeche le comportement du nav (rechargement de page)
    try {
      await api.post("/messages", formData);
      setFormStatus("success");
      setFormData({ nom: "", email: "", message: "" }); // reset les champs
    } catch (err) {
      setFormStatus("error");
    }
  };

  // Rendu jsx

  return (
    // Police cormorant garamond
    <main
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        color: "#2d3748",
        backgroundColor: "#fff",
      }}
    >
      {/*Navbar*/}

      <nav
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 40px",
          background: "transparent",
        }}
      >
        <div style={{ display: "flex", gap: "28px" }}>
          {[
            { label: "🏠", href: "/" },
            { label: "Qui suis-je ?", href: "/qui-suis-je" },
            { label: "Janzu", href: "/janzu" },
            { label: "Galerie Photo", href: "#galerie" },
            { label: "Contactez-moi", href: "#contact" },
            { label: "Liens", href: "#liens" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "0.9rem",
                letterSpacing: "0.03em",
                textShadow: "0 1px 4px rgba(0,0,0,0.4)",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.75")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero image plein écran avec logo */}

      <section
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      >
        <Image
          src="/assets/4K-sous-eau.jpg"
          alt="Fond sous-marin"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />

        {/* overlay sombre pour la lisibilité du texte sur image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,30,60,0.35",
          }}
        />

        {/* Logo */}
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        >
          <Image
            src="/assets/logo_bulle.jpg"
            alt="Logo Ô di Sé Janzu"
            width={130}
            height={130}
            style={{ borderRadius: "50%" }}
          />
        </div>

        {/* Bulle centré sur image hero */}
        <div style={{
          position: 'absolute', top: '55%',
        }}
      </section>
    </main>
  );
}
