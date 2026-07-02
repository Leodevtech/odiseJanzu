"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import api from "@/api/axios.js";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import AlgueSeparator from "@/components/AlgueSeparator";
import Footer from "@/components/Footer";

export default function JanzuPage() {
  return (
    <main
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        color: "#2d3748",
      }}
    >
      {/* NAVBAR*/}
      <Navbar />

      {/* HERO — image sous-marin avec logo */}
      <section style={{ position: "relative", height: "50vh", overflow: "hidden" }}>
        <Image
          src="/assets/4K-sous-eau-2.jpg"
          alt="Fond sous-marin"
          fill
          style={{ objectFit: "cover", objectPosition: "50% 40%" }}
          priority
        />
        {/* Overlay sombre*/}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,30,60,0.3)",
          }}
        />
        {/* Logo centré*/}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
        >
          <Image src="/assets/logo_bulle.jpg" alt="Logo" width={110} height={110} style={{ borderRadius: "50%" }} />
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
        <h1 style={{ fontSize: "2.4rem", fontWeight: 400, marginBottom: "24px" }}>Le Janzu</h1>
        <p style={{ lineHeight: 1.9, color: "#555", fontSize: "1rem" }}>
          Janzu signifie en Chinois « rivière pacifique » et le but d&apos;une séance est de vous apaiser, de relaxer
          votre corps grâce à la portance de l&apos;eau et aux mouvements fluides initiés par le thérapeute. Le Janzu
          est dit-la « thérapie de la renaissance » et repose sur les vertus thérapeutiques de l&apos;élément. Il
          s&apos;apparente à une danse où la personne se laisse bercer comme une algue à la surface de l&apos;eau, par
          des mouvements doux, souples et au rythme de son souffle.
        </p>
      </section>

      {/* Séparateur algues */}
      <AlgueSeparator />

      {/* ══════════════════════════════
          SECTION BULLES — fond sous-marin avec bulles jpg
          3 bulles avec texte superposé en glassmorphism
          position: relative sur le fond pour pouvoir positionner les bulles
      ══════════════════════════════ */}
      <section
        style={{
          position: "relative",
          minHeight: "clamp(500px, 70vh, 800px)",
          overflow: "hidden",
        }}
      >
        {/* Image de fond sous-marin */}
        <Image
          src="/assets/fond_mer2.jpg"
          alt="Fond marin"
          fill
          style={{ objectFit: "cover", objectPosition: "50% 40%" }}
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
            style={{
              position: "relative",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            {/* Image bulle en fond */}
            <Image
              src="/assets/bulle_bg.png"
              alt="bulle"
              fill
              style={{
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
                  Le Janzu est un soin aquatique qui se pratique en eau chaude et permet un relâchement profond de
                  l&apos;esprit et du corps. L&apos;eau chaude est idéale pour libérer la colonne vertébrale et relâcher
                  les muscles.
                </p>
              </div>
            </div>
          </div>

          {/* Bulle 2 — Origines — décalée à droite */}
          <div
            style={{
              position: "relative",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            {/* Image bulle en fond */}
            <Image
              src="/assets/bulle_bg.png"
              alt="bulle"
              fill
              style={{
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
                  Le Janzu tire son origine de multiples pratiques, dont celles des chamanes mexicains. Son fondateur,
                  Juan Villatoro, dans les années 80, a créé le Janzu, qui signifie « rivière pacifique ».
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
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            {/* Image bulle en fond */}
            <Image
              src="/assets/bulle_bg.png"
              alt="bulle"
              fill
              style={{
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
                  De nombreux esprits bénéfiques sont liés à l&apos;eau et habitent lacs, rivières et autres plans
                  d&apos;eau. Les habitants leur contèrent des propriétés extraordinaires.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DÉROULÉ D'UNE SÉANCE */}
      <section style={{ backgroundColor: "#fff", padding: "20px 0" }}>
        {/* Bloc 1 — texte gauche, image droite */}
        <div className="container py-5">
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-7">
              <h2 style={{ fontSize: "2rem", fontWeight: 400, marginBottom: "20px" }}>Déroulé d&apos;une séance</h2>
              <p style={{ lineHeight: 1.9, color: "#555", fontSize: "0.95rem" }}>
                Tout d&apos;abord je vous accueille et nous prenons le temps d&apos;échanger sur le déroulé de la séance
                et vos besoins et éventuelles contraintes de santé. Je vous équipe de flotteurs aux jambes, d&apos;un
                pince-nez et d&apos;une veste néoprène pour un confort maximum.
              </p>
            </div>
            <div className="col-12 col-md-5">
              <Image
                src="/assets/perso-1.jpg"
                alt="Séance Janzu"
                width={300}
                height={380}
                style={{ borderRadius: "16px", objectFit: "cover", width: "100%", height: "380px" }}
              />
            </div>
          </div>
        </div>

        {/* Bloc 2 — image gauche, texte droite */}
        <div className="container py-5">
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-5 order-md-1">
              <Image
                src="/assets/perso-3.jpg"
                alt="Séance Janzu immersion"
                width={300}
                height={380}
                style={{ borderRadius: "16px", objectFit: "cover", width: "100%", height: "380px" }}
              />
            </div>
            <div className="col-12 col-md-7 order-md-2 text-md-end">
              <p style={{ lineHeight: 1.9, color: "#555", fontSize: "0.95rem" }}>
                En flottaison, je vous soutiens et mets votre corps en mouvement, à la surface de l&apos;eau, puis
                également en immersion. Les mouvements sont doux, fluides, pour favoriser la détente et le lâcher-prise
                du corps et du mental.
              </p>
            </div>
          </div>
        </div>

        {/* Bloc 3 — texte gauche, image droite */}
        <div className="container py-5">
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-7">
              <p style={{ lineHeight: 1.9, color: "#555", fontSize: "0.95rem" }}>
                Les mouvements en immersion ne sont pas systématiques, ils sont amenés progressivement, si vous le
                souhaitez et permettent une expérience aquatique et intérieure complète. La séance se termine par le
                temps qui vous est nécessaire afin de « revenir à vous » en douceur et reprendre contact lentement avec
                la position debout.
              </p>
            </div>
            <div className="col-12 col-md-5">
              <Image
                src="/assets/perso-5.jpg"
                alt="Fin de séance"
                width={300}
                height={380}
                style={{ borderRadius: "16px", objectFit: "cover", width: "100%", height: "380px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/*
          FIN DE PAGE — Texte incitation + logo + formulaire + footer*/}
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

          <ContactForm />

          {/* Footer */}
          <Footer />
        </div>
      </section>
    </main>
  );
}
