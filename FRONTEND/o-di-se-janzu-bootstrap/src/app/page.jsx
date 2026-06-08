"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import api from "@/api/axios.js";

export default function Home() {
  // états
  const [photos, setPhotos] = useState([]);
  const [avis, setAvis] = useState([]);
  const [currentAvis, setCurrentAvis] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [siteContent, setSiteContent] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null);

  // état du menu burger
  const [navOpen, setNavOpen] = useState(false);

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
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? photos.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === photos.length - 1 ? 0 : prev + 1));

  const prevAvis = () =>
    setCurrentAvis((prev) => (prev === 0 ? avis.length - 1 : prev - 1));

  const nextAvis = () =>
    setCurrentAvis((prev) => (prev === avis.length - 1 ? 0 : prev + 1));

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
            {[
              { label: "🏠", href: "/" },
              { label: "Qui suis-je ?", href: "/qui-suis-je" },
              { label: "Janzu", href: "/janzu" },
              { label: "Galerie Photo", href: "/galerie" },
              { label: "Contactez-moi", href: "/#contact" },
              { label: "Liens", href: "/#liens" },
            ].map((item) => (
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

      {/* Hero image plein écran avec logo */}

      <section
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      >
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

      {/* QUI SUIS JE ? */}
      <section className="container py-5">
        <div className="row align-items-center g-4">
          <div className="col-12 col-md-5">
            <img
              src="/assets/perso-3.jpg"
              alt="Qui suis-je"
              className="img-fluid rounded"
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
              Le Janzu est entré dans ma vie, sans que je le sache, en
              découvrant, par hasard, la vidéo d&apos;une séance sur un réseau
              social. Impressionnée et fortement attirée par ce que je voyais,
              je reservais, quelques semaines plus tard, ma première séance...
              Depuis, le Janzu ne m&apos;a pas quittée et poursuit son chemin
              dans ma vie, telle une rivière pacifique. Je m&apos;appelle
              Nathalie, je suis dotée d&apos;une grande sensibilité émotionnelle
              et relationnelle et depuis toujours, l&apos;eau m&apos;est
              familière.
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
      </section>

      {/* séparateur algues */}

      <div style={{ textAlign: "center", padding: "10px 0" }}>
        <Image
          src="/assets/banière v2.png"
          alt="séparateur décoratif"
          width={500}
          height={80}
          style={{ maxWidth: "100%", opacity: 0.85 }}
        />
      </div>

      {/* LE JANZU -  */}

      <section className="container py-5">
        <div className="row align-items-center g-4">
          <div className="col-12 col-md-5 order-md-2">
            <img
              src="/assets/perso-1.jpg"
              alt="Le Janzu"
              className="img-fluid rounded"
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
            Le Janzu est un soin aquatique qui se pratique en eau chaude et
            permet un relâchement profond de l&apos;esprit et du corps.
            L&apos;eau chaude - et le soutien qu&apos;elle offre - est idéale
            pour libérer la colonne vertébrale, enlever le poids sur les
            vertèbres et les articulations et relâcher les muscles. Le flux,
            induit par la mise en mouvement, contribue à calmer la respiration.
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
      </section>

      {/*Douceur du savoir - citation dynamique depuis le dash/param/ titre_section2 */}

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
          La douceur du savoir
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

      {/* Prestations — données dynamiques depuis site_content */}
      <section
        className="container py-5 text-center"
        style={{
          padding: "80px 40px",
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
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
            <div
              key={p.titre}
              className="col-6 col-md-3"
              style={{ flex: "0 0 220px", textAlign: "center" }}
            >
              {/* img classique — images statiques locales, pas besoin de l'optimisation Next.js Image */}
              <img
                src={p.img}
                alt={p.titre}
                style={{
                  borderRadius: "12px",
                  objectFit: "cover",
                  width: "100%",
                  height: "200px",
                }}
              />
              <p style={{ marginTop: "12px", fontWeight: 500 }}>{p.titre}</p>
              <p style={{ color: "#888", fontSize: "0.9rem", margin: "2px 0" }}>
                {p.duree}
              </p>
              <p style={{ color: "#2d3748", fontWeight: 600 }}>{p.prix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Séparateur algues */}
      <div style={{ textAlign: "center", padding: "10px 0" }}>
        <Image
          src="/assets/banière v2.png"
          alt="séparateur décoratif"
          width={500}
          height={80}
          style={{ maxWidth: "100%", opacity: 0.85 }}
        />
      </div>

      {/* Galerie carousel 5dernières photos upload */}

      <section
        id="galerie"
        className="container py-5"
        style={{ padding: "60px 40px", maxWidth: "800px", margin: "0 auto" }}
      >
        <h2
          style={{ fontSize: "1.8rem", fontWeight: 400, marginBottom: "24px" }}
        >
          Galerie photo
        </h2>

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
                  width: "360px",
                  height: "240px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  margin: "0 auto",
                }}
              >
                <img // construit url complet vers image sur serveur back
                  src={`${process.env.NEXT_PUBLIC_API_URL.replace("/api", "")}/${photos[currentSlide]?.filepath.replace(/^\//, "")}`}
                  alt={photos[currentSlide]?.alt || "photo galerie"}
                  fill
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
          <p style={{ color: "#aaa", fontStyle: "italic" }}>
            Aucune photo disponible.
          </p>
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
          <p style={{ color: "#aaa", fontStyle: "italic" }}>
            Aucun avis pour le moment.
          </p>
        )}
      </section>

      {/* Lieux de pratique - titre dynamiques via dashboard */}
      <section
        className="container py-5"
        style={{ padding: "60px 40px", maxWidth: "800px", margin: "0 auto" }}
      >
        <h2
          style={{ fontSize: "1.8rem", fontWeight: 400, marginBottom: "24px" }}
        >
          Mes lieux de pratiques
        </h2>
        <div
          className="row g-3"
          style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
        >
          {[
            siteContent?.titre_lieux1 || "Lieu 1",
            siteContent?.titre_lieux2 || "Lieu 2",
            siteContent?.titre_lieux3 || "Lieu 3",
            siteContent?.titre_lieux4 || "Lieu 4",
          ].map((titre, i) => (
            <div key={i} className="col-6 col-md-3">
              <div
                className="rounded d-flex align-items-center justify-content-center"
                style={{
                  height: "140px",
                  background: "#dce8f0",
                  color: "#555",
                  fontStyle: "italic",
                }}
              >
                {titre}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Séparateur algues */}
      <div style={{ textAlign: "center", padding: "10px 0" }}>
        <Image
          src="/assets/banière v2.png"
          alt="séparateur décoratif"
          width={500}
          height={80}
          style={{ maxWidth: "100%", opacity: 0.85 }}
        />
      </div>

      {/* contact form  /api/messages */}
      <section
        id="contact"
        style={{ padding: "60px 40px", maxWidth: "800px", margin: "0 auto" }}
      >
        <div
          style={{
            background: "#6b7fa3",
            borderRadius: "16px",
            padding: "40px",
            display: "flex",
            gap: "40px",
            color: "white",
            flexWrap: "wrap",
          }}
        >
          {/* Colonne infos de contact */}
          <div style={{ flex: "0 0 200px" }}>
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: 400,
                marginBottom: "20px",
              }}
            >
              Contact
            </h3>
            <p style={{ margin: "8px 0", fontSize: "0.9rem" }}>
              👤 Ô di Sé Janzu
            </p>
            <p style={{ margin: "8px 0", fontSize: "0.9rem" }}>
              📍 Adresse de l&apos;entreprise
              <br />
              64340 Boucau
            </p>
            <p style={{ margin: "8px 0", fontSize: "0.9rem" }}>
              📞 06.12.12.12.12
            </p>
            <p style={{ margin: "8px 0", fontSize: "0.9rem" }}>
              ✉️ lemail@test.com
            </p>
            <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
              <a
                href="#"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "1.2rem",
                }}
              >
                f
              </a>
              <a
                href="#"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "1.2rem",
                }}
              >
                ig
              </a>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: "240px" }}>
            {formStatus === "success" && (
              <div className="alert alert-success">
                Message envoyé avec succès !
              </div>
            )}
            {formStatus === "error" && (
              <div className="alert alert-danger">
                Une erreur est survenue, réessayez.
              </div>
            )}

            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <input
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Nom & Prénom"
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "none",
                  fontSize: "0.9rem",
                }}
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "none",
                  fontSize: "0.9rem",
                }}
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre message"
                rows={4}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "none",
                  fontSize: "0.9rem",
                  resize: "vertical",
                }}
              />
              <button
                onClick={handleSubmit}
                style={{
                  background: "#5b9bd5",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  alignSelf: "flex-end",
                }}
              >
                Envoyer ma demande
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Footer  */}
      <footer
        style={{
          background: "#5b6f8a",
          color: "white",
          textAlign: "center",
          padding: "24px 40px",
          fontSize: "0.85rem",
        }}
      >
        <p style={{ margin: "0 0 6px" }}> 2026 Ô di Sé Janzu par Nathalie</p>
        <p style={{ margin: 0, fontSize: "0.75rem", opacity: 0.7 }}>
          created with{" "}
          <Link
            href="/admin/login"
            style={{
              color: "#7ec8e3",
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            💙
          </Link>{" "}
          by leodevtech
        </p>
      </footer>
    </main>
  );
}
