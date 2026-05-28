"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import api from "@/api/axios.js";

export default function Home() {
  // états
  const [photos, setPhotos] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [siteContent, setSiteContent] = useState(null)
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
    };

    const fetchContent = async () => {
      try {
        const res = await api.get("/site-content");
        setSiteContent(res.data);
      } catch (e) {
        console.error("Erreur chargement contenu", e);
      }
    };

    fetchPhotos();
    fetchContent();
  }, []);

  //FOnctions carousel
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? photos.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === photos.length - 1 ? 0 : prev + 1));

  // Formulaire
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
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
        <div
          style={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(10px",
            borderRadius: "50%",
            width: "320px",
            height: "220px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "20px",
            border: "1px solid rgba(255,255,255,0.35)",
            boxShadow: "0 8px 32px rgba(0,60,100,0.2)",
          }}
        >
          <p
            style={{
              color: "white",
              fontSize: "1rem",
              margin: 0,
              lineHeight: 1.6,
              textShadow: "0 1px 6px rgba(0,0,0,0.5)",
            }}
          >
            {siteContent?.titre_section1 ||
              "Bienvenue sur Ô di Sé Janzu pour un voyage aquatique"}
          </p>
        </div>
      </section>

      {/* QUI SUIS JE 2 colonnes */}
      <section
        style={{
          padding: "80px 40px",
          maxWIdth: "1000px",
          margin: "0 auto",
          display: "flex",
          gap: "60px",
          alignItems: "center",
        }}
      >
        <div style={{ flex: "0 0 300px" }}>
          <Image
            src="/assets/perso-3.jpg"
            alt="Qui suis-je"
            width={300}
            height={380}
            style={{
              borderRadius: "16px",
              objectFit: "cover",
              width: "100%",
              height: "380px",
            }}
          />
        </div>
        {/* flex: 1 = prend tout l'espace restant */}
        <div style={{ flex: 1 }}>
          <h2
            style={{
              fontSize: "2.2rem",
              fontWeight: 400,
              marginBottom: "20px",
            }}
          >
            Qui suis-je ?
          </h2>
          <p style={{ lineHeight: 1.8, color: "#555", fontSize: "0.95rem" }}>
            Le Janzu est entré dans ma vie, sans que je le sache, en découvrant,
            par hasard, la vidéo d&apos;une séance sur un réseau social.
            Impressionnée et fortement attirée par ce que je voyais, je
            reservais, quelques semaines plus tard, ma première séance...
            Depuis, le Janzu ne m&apos;a pas quittée et poursuit son chemin dans ma
            vie, telle une rivière pacifique. Je m&apos;appelle Nathalie, je suis
            dotée d&apos;une grande sensibilité émotionnelle et relationnelle et
            depuis toujours, l&apos;eau m&apos;est familière.
          </p>
          {/* Link Next.js pour navigation — /qui-suis-je à créer plus tard */}
          <Link
            href="/qui-suis-je"
            style={{
              color: "#5b9bd5",
              fontSize: "0.875rem",
              fontStyle: "italic",
            }}
          >
            (En savoir plus...)
          </Link>
        </div>
      </section>

      {/* séparateur algues */}

      <div style={{ textAlign: "center", padding: "10px 0" }}>
        <Image
          src="/assets/banière V2.png"
          alt="séparateur décoratif"
          width={500}
          height={80}
          style={{ maxWidth: "100%", opacity: 0.85 }}
        />
      </div>

      {/* LE JANZU - 2colonne inversé */}

      <section
        style={{
          padding: "80px 40px",
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          gap: "60px",
          alignItems: "center",
          flexDirection: "row-reverse",
        }}
      >
        <div style={{ flex: "0 0 300px" }}>
          <Image
            src="/assets/perso-1.jpg"
            alt="Le Janzu"
            width={300}
            height={380}
            style={{
              borderRadius: "16px",
              objectFit: "cover",
              width: "100%",
              height: "380px",
            }}
          />
        </div>
        <div style={{ flex: 1, textAlign: "right" }}>
          <h2
            style={{
              fontSize: "2.2rem",
              fontWeight: 400,
              marginBottom: "20px",
            }}
          >
            Le Janzu
          </h2>
          <p style={{ lineHeight: 1.8, color: "#555", fontSize: "0.95rem" }}>
            Le Janzu est un soin aquatique qui se pratique en eau chaude et
            permet un relâchement profond de l&apos;esprit et du corps. L&apos;eau chaude
            - et le soutien qu&apos;elle offre - est idéale pour libérer la colonne
            vertébrale, enlever le poids sur les vertèbres et les articulations
            et relâcher les muscles. Le flux, induit par la mise en mouvement,
            contribue à calmer la respiration.
          </p>
          <Link href="/janzu" style={{ color: '#5b9bd5', fontSize: '0.875rem', fontStyle: 'italic' }}>
            (En savoir plus)
          </Link>
        </div>
      </section>

      {/*Douceur du savoir - citation dynamique depuis le dash/param/ titre_section2 */}

      <section style={{ background: '#f7fbfe', padding: '60px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.85rem', letterSpacing: '0.08em', color: '#888', marginBottom: '16px', textTransform: 'uppercase' }}>
          La douceur du savoir
        </p>
        <p style={{ maxWidth: '600px', margin: '0 auto', lineHeight: 1.9, color: '#555', fontStyle: 'italic', fontSize: '1rem' }}>
          {siteContent?.titre_section2 || 'Janzu signifie en Chinois « rivière pacifique » et le but d\'une séance est de vous apaiser...'}
        </p>
      </section>
    </main>
  );
}
