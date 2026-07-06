"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import api from "@/api/axios.js";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import AlgueSeparator from "@/components/AlgueSeparator";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { fadeUp, fadeIn, staggerContainer, staggerItem, slideFromLeft, slideFromRight } from "@/lib/animations.js";

export default function Home() {
  // états
  const [photos, setPhotos] = useState([]);
  const [avis, setAvis] = useState([]);
  const [currentAvis, setCurrentAvis] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [siteContent, setSiteContent] = useState(null);

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
    const fetchAvis = async () => {
      try {
        const res = await api.get("/avis/public");
        setAvis(res.data);
      } catch (e) {
        console.error("Erreur chargement avis", e);
      }
    };

    fetchPhotos();
    fetchContent();
    fetchAvis();
  }, []);

  //Fonctions carousel
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? photos.length - 1 : prev - 1));

  const nextSlide = () => setCurrentSlide((prev) => (prev === photos.length - 1 ? 0 : prev + 1));

  const prevAvis = () => setCurrentAvis((prev) => (prev === 0 ? avis.length - 1 : prev - 1));

  const nextAvis = () => setCurrentAvis((prev) => (prev === avis.length - 1 ? 0 : prev + 1));

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

      <Navbar />

      {/* Hero image plein écran avec logo */}

      {/* Hero image plein écran avec logo */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <Image
          src="/assets/4K-sous-eau-2.jpg"
          alt="Fond sous-marin"
          fill
          unoptimized
          style={{ objectFit: "cover", objectPosition: "50% 40%" }}
          priority
        />

        {/* overlay sombre pour la lisibilité du texte sur image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,30,60,0.20)",
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
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        </div>

        {/* Rectangle glassmorphism */}
        {/* Rectangle glassmorphism premium */}
        <div
          style={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
            backdropFilter: "blur(16px) brightness(1.1)",
            WebkitBackdropFilter: "blur(16px) brightness(1.1)",
            borderRadius: "16px",
            width: "min(520px, 82%)",
            padding: "32px 48px",
            border: "1px solid rgba(255,255,255,0.3)",
            borderTop: "1px solid rgba(255,255,255,0.5)",
            borderLeft: "1px solid rgba(255,255,255,0.5)",
            boxShadow: "0 8px 32px rgba(0,20,60,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "white",
              fontSize: "1.1rem",
              margin: 0,
              lineHeight: 1.9,
              fontStyle: "italic",
              letterSpacing: "0.03em",
              textShadow: "0 1px 8px rgba(0,0,0,0.6)",
            }}
          >
            {siteContent?.titre_section1 || "Bienvenue sur Ô di Sé Janzu pour un voyage aquatique"}
          </p>
        </div>
      </section>

      {/* QUI SUIS JE ? */}
      <motion.section
        className="container py-5"
        variants={slideFromLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="row align-items-center g-4">
          <div className="col-12 col-md-5">
            <Image
              src="/assets/perso-3.jpg"
              alt="Qui suis-je"
              className="img-fluid rounded"
              width={600}
              height={380}
              style={{ objectFit: "cover", width: "100%", height: "380px" }}
            />
          </div>
          <div className="col-12 col-md-7">
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
              Le Janzu est entré dans ma vie, sans que je le sache, en découvrant, par hasard, la vidéo d&apos;une
              séance sur un réseau social. Impressionnée et fortement attirée par ce que je voyais, je reservais,
              quelques semaines plus tard, ma première séance... Depuis, le Janzu ne m&apos;a pas quittée et poursuit
              son chemin dans ma vie, telle une rivière pacifique. Je m&apos;appelle Nathalie, je suis dotée d&apos;une
              grande sensibilité émotionnelle et relationnelle et depuis toujours, l&apos;eau m&apos;est familière.
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
        </div>
      </motion.section>

      {/* séparateur algues */}

      <AlgueSeparator />

      {/* LE JANZU -  */}

      <motion.section
        className="container py-5"
        variants={slideFromRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="row align-items-center g-4">
          <div className="col-12 col-md-5 order-md-2">
            <Image
              src="/assets/perso-1.jpg"
              alt="Le Janzu"
              className="img-fluid rounded"
              width={600}
              height={380}
              style={{ objectFit: "cover", width: "100%", height: "380px" }}
            />
          </div>
          <div className="col-12 col-md-7 order-md-1 text-md-end">
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
              Le Janzu est un soin aquatique qui se pratique en eau chaude et permet un relâchement profond de
              l&apos;esprit et du corps. L&apos;eau chaude - et le soutien qu&apos;elle offre - est idéale pour libérer
              la colonne vertébrale, enlever le poids sur les vertèbres et les articulations et relâcher les muscles. Le
              flux, induit par la mise en mouvement, contribue à calmer la respiration.
            </p>
            <Link
              href="/janzu"
              style={{
                color: "#5b9bd5",
                fontSize: "0.875rem",
                fontStyle: "italic",
              }}
            >
              (En savoir plus)
            </Link>
          </div>
        </div>
      </motion.section>

      {/*La magie de l'eau - citation dynamique depuis le dash/param/ titre_section2 */}

      <section
        className="py-5 text-center"
        style={{
          background: "#f7fbfe",
          padding: "60px 40px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "0.85rem",
            letterSpacing: "0.08em",
            color: "#888",
            marginBottom: "16px",
            textTransform: "uppercase",
          }}
        >
          La magie de l&apos;eau
        </p>
        <p
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.9,
            color: "#555",
            fontStyle: "italic",
            fontSize: "1rem",
          }}
        >
          {siteContent?.titre_section2 ||
            "Janzu signifie en Chinois « rivière pacifique » et le but d'une séance est de vous apaiser..."}
        </p>
      </section>

      {/* Séparateur algue */}
      <AlgueSeparator />

      {/* Prestations — données dynamiques depuis site_content */}
      <motion.section
        id="prestation"
        className="container py-5 text-center"
        style={{
          padding: "80px 40px",
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
        }}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.div
          className="row g-4 justify-content-center"
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            {
              titre: siteContent?.prestation1_titre || "Prestation 1",
              duree: siteContent?.prestation1_duree || "0.45h",
              prix: siteContent?.prestation1_prix || "100€",
              img: "/assets/perso-1.jpg",
            },
            {
              titre: siteContent?.prestation2_titre || "Prestation 2",
              duree: siteContent?.prestation2_duree || "1h",
              prix: siteContent?.prestation2_prix || "100€",
              img: "/assets/perso-3.jpg",
            },
            {
              titre: siteContent?.prestation3_titre || "Prestation 3",
              duree: siteContent?.prestation3_duree || "2h",
              prix: siteContent?.prestation3_prix || "200€",
              img: "/assets/perso-2.jpg",
            },
            {
              titre: siteContent?.prestation4_titre || "Prestation 4",
              duree: siteContent?.prestation4_duree || "2h",
              prix: siteContent?.prestation4_prix || "200€",
              img: "/assets/perso-4.jpg",
            },
          ].map((p) => (
            <motion.div
             key={p.titre} 
             className="col-6 col-md-3" 
             style={{ flex: "0 0 220px", textAlign: "center" }}
             variants={staggerItem}
             >
              {/* img classique — images statiques locales, pas besoin de l'optimisation Next.js Image */}
              <Image
                src={p.img}
                alt={p.titre}
                width={220}
                height={200}
                style={{
                  borderRadius: "12px",
                  objectFit: "cover",
                  width: "100%",
                  height: "200px",
                }}
              />
              <p style={{ marginTop: "12px", fontWeight: 500 }}>{p.titre}</p>
              <p style={{ color: "#888", fontSize: "0.9rem", margin: "2px 0" }}>{p.duree}</p>
              <p style={{ color: "#2d3748", fontWeight: 600 }}>{p.prix}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/*Avis CLIENT - placeholder carousel avec img plus tard */}
      <section
        className="container py5 text-center"
        style={{
          padding: "60px 40px",
          maxWidth: "700px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: 400,
            letterSpacing: "0.1em",
            marginBottom: "30px",
            textTransform: "uppercase",
          }}
        >
          Avis Client
        </h2>

        {avis.length > 0 ? (
          <div>
            {/* Flèches + carte avis centrale */}
            <div
              className="d-flex align-items-center justify-content-center gap-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                justifyContent: "center",
              }}
            >
              <button
                onClick={prevAvis}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#5b9bd5",
                }}
              >
                ←
              </button>

              {/* Carte avis */}
              <div
                className="flex-grow-1 rounded p-4"
                style={{
                  flex: 1,
                  background: "#f7fbfe",
                  borderRadius: "12px",
                  padding: "30px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                {/* Contenu de l'avis */}
                <p
                  style={{
                    fontStyle: "italic",
                    lineHeight: 1.8,
                    color: "#555",
                    fontSize: "1rem",
                    marginBottom: "16px",
                  }}
                >
                  &ldquo;{avis[currentAvis]?.contenu}&rdquo;
                </p>
                {/* Nom du client */}
                <p
                  style={{
                    fontWeight: 600,
                    color: "#2d3748",
                    fontSize: "0.9rem",
                  }}
                >
                  — {avis[currentAvis]?.nom}
                </p>
              </div>

              <button
                onClick={nextAvis}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#5b9bd5",
                }}
              >
                →
              </button>
            </div>
            {/* Dots de navigation — un point par avis */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                marginTop: "16px",
              }}
            >
              {avis.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentAvis(i)}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    background: i === currentAvis ? "#5b9bd5" : "#ccc",
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <p style={{ color: "#aaa", fontStyle: "italic" }}>Aucun avis pour le moment.</p>
        )}
      </section>

      {/* Lieux de pratique - titre dynamiques via dashboard */}
      <section className="container py-5" style={{ padding: "60px 40px", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 400, marginBottom: "24px" }}>Mes lieux de pratiques</h2>
        <div className="row g-3">
          {[
            siteContent?.titre_lieux1 || "Lieu 1",
            siteContent?.titre_lieux2 || "Lieu 2",
            siteContent?.titre_lieux3 || "Lieu 3",
            siteContent?.titre_lieux4 || "Lieu 4",
          ].map((titre, i) => (
            <div key={i} className="col-6">
              <div
                className="rounded d-flex align-items-center justify-content-center"
                style={{
                  height: "140px",
                  background: "#dce8f0",
                  color: "#555",
                  fontStyle: "italic",
                  textAlign: "center",
                  padding: "12px",
                }}
              >
                {titre}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Séparateur algues */}
      <AlgueSeparator />

      {/* Galerie carousel 5dernières photos upload */}

      <section
        id="galerie"
        className="container py-5"
        style={{ padding: "60px 40px", maxWidth: "800px", margin: "0 auto" }}
      >
        <h2 style={{ fontSize: "1.8rem", fontWeight: 400, marginBottom: "24px" }}>Galerie photo</h2>

        {/* affiche le carousel seulment si photo, sinon un message vide */}
        {photos.length > 0 ? (
          <div>
            <div
              className="d-flex align-items-center justify-content-center gap-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                justifyContent: "center",
              }}
            >
              <button
                onClick={prevSlide}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#5b9bd5",
                }}
              >
                ←
              </button>

              <div
                className="overflow-hidden rounded"
                style={{
                  position: "relative",
                  width: "360px",
                  height: "240px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  margin: "0 auto",
                }}
              >
                <Image // construit url complet vers image sur serveur back
                  src={`${process.env.NEXT_PUBLIC_API_URL.replace("/api", "")}/${photos[currentSlide]?.filepath.replace(/^\//, "")}`}
                  alt={photos[currentSlide]?.alt || "photo galerie"}
                  fill
                  unoptimized
                  style={{ objectFit: "cover" }}
                />
              </div>
              <button
                onClick={nextSlide}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#5b9bd5",
                }}
              >
                →
              </button>
            </div>

            {/* dots de nav */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                marginTop: "16px",
              }}
            >
              {/* _ signifique ignorer la valeur pour avoir juste l'index i */}
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)} // clic sur dot = aller directe a ce slide
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    // actif = bleue, inatcfi = gris
                    background: i === currentSlide ? "#5b9bd5" : "#ccc",
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <p style={{ color: "#aaa", fontStyle: "italic" }}>Aucune photo disponible.</p>
        )}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link
            href="/galerie"
            style={{
              color: "#5b9bd5",
              fontSize: "0.875rem",
              fontStyle: "italic",
            }}
          >
            (En découvrir plus...)
          </Link>
        </div>
      </section>

      {/* Séparateur algues */}
      <AlgueSeparator />

      {/* contact form  /api/messages */}
      <ContactForm />
      {/* Footer  */}
      <Footer />
    </main>
  );
}
