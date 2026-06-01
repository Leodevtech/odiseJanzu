"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import api from "@/api/axios.js";

export default function JanzuPage() {
  const [formData, setFormData] = useState({ nom: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/messages", formData);
      setFormStatus("success");
      setFormData({ nom: "", email: "", message: "" });
    } catch (err) {
      setFormStatus("error");
    }
  };

  return (
    <main
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        color: "#2d3748",
      }}
    >
      {/* ══════════════════════════════
          NAVBAR
      ══════════════════════════════ */}
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
            { label: "Galerie Photo", href: "/#galerie" },
            { label: "Contactez-moi", href: "#contact" },
            { label: "Liens", href: "/#liens" },
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
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.75")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ══════════════════════════════
          HERO — image sous-marin avec logo
      ══════════════════════════════ */}
      <section
        style={{ position: "relative", height: "50vh", overflow: "hidden" }}
      >
        <Image
          src="/assets/4K-sous-eau.jpg"
          alt="Fond sous-marin"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,30,60,0.3)",
          }}
        />
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
            alt="Logo"
            width={110}
            height={110}
            style={{ borderRadius: "50%" }}
          />
        </div>
      </section>

      {/* ══════════════════════════════
          TITRE + INTRO sur fond blanc
      ══════════════════════════════ */}
      <section
        style={{
          padding: "60px 40px",
          maxWidth: "700px",
          margin: "0 auto",
          textAlign: "center",
          backgroundColor: "#fff",
        }}
      >
        <h1
          style={{ fontSize: "2.4rem", fontWeight: 400, marginBottom: "24px" }}
        >
          Le Janzu
        </h1>
        <p style={{ lineHeight: 1.9, color: "#555", fontSize: "1rem" }}>
          Janzu signifie en Chinois « rivière pacifique » et le but d&apos;une
          séance est de vous apaiser, de relaxer votre corps grâce à la portance
          de l&apos;eau et aux mouvements fluides initiés par le thérapeute. Le
          Janzu est dit-la « thérapie de la renaissance » et repose sur les
          vertus thérapeutiques de l&apos;élément. Il s&apos;apparente à une
          danse où la personne se laisse bercer comme une algue à la surface de
          l&apos;eau, par des mouvements doux, souples et au rythme de son
          souffle.
        </p>
      </section>

      {/* Séparateur algues */}
      <div
        style={{
          textAlign: "center",
          padding: "10px 0",
          backgroundColor: "#fff",
        }}
      >
        <Image
          src="/assets/banière v2.png"
          alt="séparateur décoratif"
          width={500}
          height={80}
          style={{ maxWidth: "100%", opacity: 0.85 }}
        />
      </div>

      {/* ══════════════════════════════
          SECTION BULLES — fond sous-marin avec bulles jpg
          3 bulles avec texte superposé en glassmorphism
          position: relative sur le fond pour pouvoir positionner les bulles
      ══════════════════════════════ */}
      <section
        style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
      >
        {/* Image de fond sous-marin */}
        <Image
          src="/assets/fond_mer.jpg"
          alt="Fond marin"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        {/* Overlay léger pour améliorer la lisibilité */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,40,80,0.15)",
          }}
        />

        {/* Conteneur des bulles — centré avec padding */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "80px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "60px",
          }}
        >
          {/* Bulle 1 — Principe — centrée */}
          <div
            style={{ position: "relative", width: "380px", height: "380px" }}
          >
            {/* Image bulle en fond */}
            <img
              src="/assets/bulle_bg.jpg"
              alt="bulle"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
                opacity: 0.85,
              }}
            />
            {/* Texte superposé sur la bulle — position absolute centré */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px",
                textAlign: "center",
              }}
            >
              <div>
                <h3
                  style={{
                    color: "white",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    marginBottom: "12px",
                    textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  Principe
                </h3>
                <p
                  style={{
                    color: "white",
                    fontSize: "0.82rem",
                    lineHeight: 1.7,
                    textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  Le Janzu est un soin aquatique qui se pratique en eau chaude
                  et permet un relâchement profond de l&apos;esprit et du corps.
                  L&apos;eau chaude est idéale pour libérer la colonne
                  vertébrale et relâcher les muscles.
                </p>
              </div>
            </div>
          </div>

          {/* Bulle 2 — Origines — décalée à droite */}
          <div
            style={{
              position: "relative",
              width: "360px",
              height: "360px",
              alignSelf: "flex-end",
              marginRight: "10%",
            }}
          >
            <img
              src="/assets/bulle_bg.jpg"
              alt="bulle"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
                opacity: 0.85,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px",
                textAlign: "center",
              }}
            >
              <div>
                <h3
                  style={{
                    color: "white",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    marginBottom: "12px",
                    textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  Origines
                </h3>
                <p
                  style={{
                    color: "white",
                    fontSize: "0.82rem",
                    lineHeight: 1.7,
                    textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  Le Janzu tire son origine de multiples pratiques, dont celles
                  des chamanes mexicains. Son fondateur, Juan Villatoro, dans
                  les années 80, a créé le Janzu, qui signifie « rivière
                  pacifique ».
                </p>
              </div>
            </div>
          </div>

          {/* Bulle 3 — Tibet — décalée à gauche */}
          <div
            style={{
              position: "relative",
              width: "320px",
              height: "320px",
              alignSelf: "flex-start",
              marginLeft: "10%",
            }}
          >
            <img
              src="/assets/bulle_bg.jpg"
              alt="bulle"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
                opacity: 0.85,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "36px",
                textAlign: "center",
              }}
            >
              <div>
                <h3
                  style={{
                    color: "white",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    marginBottom: "12px",
                    textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  Au Tibet
                </h3>
                <p
                  style={{
                    color: "white",
                    fontSize: "0.82rem",
                    lineHeight: 1.7,
                    textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  De nombreux esprits bénéfiques sont liés à l&apos;eau et
                  habitent lacs, rivières et autres plans d&apos;eau. Les
                  habitants leur contèrent des propriétés extraordinaires.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          DÉROULÉ D'UNE SÉANCE — fond blanc, bloc texte + image alternés
          Même style que qui-suis-je
      ══════════════════════════════ */}
      <section style={{ backgroundColor: "#fff", padding: "20px 0" }}>
        {/* Bloc 1 — texte gauche, image droite */}
        <div
          style={{
            padding: "60px 40px",
            maxWidth: "1000px",
            margin: "0 auto",
            display: "flex",
            gap: "60px",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: 400,
                marginBottom: "20px",
              }}
            >
              Déroulé d&apos;une séance
            </h2>
            <p style={{ lineHeight: 1.9, color: "#555", fontSize: "0.95rem" }}>
              Tout d&apos;abord je vous accueille et nous prenons le temps
              d&apos;échanger sur le déroulé de la séance et vos besoins et
              éventuelles contraintes de santé. Je vous équipe de flotteurs aux
              jambes, d&apos;un pince-nez et d&apos;une veste néoprène pour un
              confort maximum.
            </p>
          </div>
          <div style={{ flex: "0 0 300px" }}>
            <img
              src="/assets/perso-1.jpg"
              alt="Séance Janzu"
              style={{
                borderRadius: "16px",
                objectFit: "cover",
                width: "300px",
                height: "380px",
              }}
            />
          </div>
        </div>

        {/* Bloc 2 — image gauche, texte droite */}
        <div
          style={{
            padding: "60px 40px",
            maxWidth: "1000px",
            margin: "0 auto",
            display: "flex",
            gap: "60px",
            alignItems: "center",
            flexDirection: "row-reverse",
          }}
        >
          <div style={{ flex: 1, textAlign: "right" }}>
            <p style={{ lineHeight: 1.9, color: "#555", fontSize: "0.95rem" }}>
              En flottaison, je vous soutiens et mets votre corps en mouvement,
              à la surface de l&apos;eau, puis également en immersion. Les
              mouvements sont doux, fluides, pour favoriser la détente et le
              lâcher-prise du corps et du mental.
            </p>
          </div>
          <div style={{ flex: "0 0 300px" }}>
            <img
              src="/assets/perso-3.jpg"
              alt="Séance Janzu immersion"
              style={{
                borderRadius: "16px",
                objectFit: "cover",
                width: "300px",
                height: "380px",
              }}
            />
          </div>
        </div>

        {/* Bloc 3 — texte gauche, image droite */}
        <div
          style={{
            padding: "60px 40px",
            maxWidth: "1000px",
            margin: "0 auto",
            display: "flex",
            gap: "60px",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <p style={{ lineHeight: 1.9, color: "#555", fontSize: "0.95rem" }}>
              Les mouvements en immersion ne sont pas systématiques, ils sont
              amenés progressivement, si vous le souhaitez et permettent une
              expérience aquatique et intérieure complète. La séance se termine
              par le temps qui vous est nécessaire afin de « revenir à vous » en
              douceur et reprendre contact lentement avec la position debout.
            </p>
          </div>
          <div style={{ flex: "0 0 300px" }}>
            <img
              src="/assets/perso-5.jpg"
              alt="Fin de séance"
              style={{
                borderRadius: "16px",
                objectFit: "cover",
                width: "300px",
                height: "380px",
              }}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FIN DE PAGE — fond sous-marin qui continue
          Texte incitation + logo + formulaire + footer
      ══════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        {/* Fond sous-marin qui reprend */}
        <Image
          src="/assets/fond_mer.jpg"
          alt="Fond marin"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,40,80,0.25)",
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          {/* Texte incitation contact */}
          <div style={{ padding: "60px 40px", textAlign: "center" }}>
            <div
              style={{
                display: "inline-block",
                border: "1px solid rgba(255,255,255,0.6)",
                borderRadius: "8px",
                padding: "20px 40px",
                marginBottom: "30px",
                color: "white",
                fontSize: "1rem",
                fontStyle: "italic",
                lineHeight: 1.7,
                backdropFilter: "blur(4px)",
                background: "rgba(255,255,255,0.1)",
              }}
            >
              Laissez parler votre curiosité
              <br />
              en me contactant
            </div>

            {/* Logo bulle */}
            <div style={{ marginBottom: "40px" }}>
              <Image
                src="/assets/logo_bulle.jpg"
                alt="Logo Ô di Sé Janzu"
                width={100}
                height={100}
                style={{ borderRadius: "50%" }}
              />
            </div>
          </div>

          {/* Formulaire contact */}
          <div
            id="contact"
            style={{
              padding: "0 40px 60px",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                background: "rgba(107, 127, 163, 0.85)",
                backdropFilter: "blur(8px)",
                borderRadius: "16px",
                padding: "40px",
                display: "flex",
                gap: "40px",
                color: "white",
                flexWrap: "wrap",
              }}
            >
              {/* Infos contact */}
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
                <div
                  style={{ marginTop: "16px", display: "flex", gap: "10px" }}
                >
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

              {/* Formulaire */}
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
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
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
          </div>

          {/* Footer */}
          <footer
            style={{
              color: "white",
              textAlign: "center",
              padding: "24px 40px",
              fontSize: "0.85rem",
              borderTop: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <p style={{ margin: "0 0 6px" }}>2026 Ô di Sé Janzu par Nathalie</p>
            <p style={{ margin: 0, fontSize: "0.75rem", opacity: 0.7 }}>
              created with {/* Lien discret vers le login admin */}
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
        </div>
      </section>
    </main>
  );
}
