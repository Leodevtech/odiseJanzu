"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import api from "@/api/axios.js";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import AlgueSeparator from "@/components/AlgueSeparator";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { fadeUp, fadeIn, staggerContainer, staggerItem, slideFromLeft, slideFromRight } from "@/lib/animations";

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
          quality={90}
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
          <Image
            src="/assets/logo_bulle.jpg"
            alt="Logo"
            width={110}
            height={110}
            quality={90}
            style={{ borderRadius: "50%" }}
          />
        </div>
      </section>

      {/* ══════════════════════════════
          TITRE + INTRO sur fond blanc
      ══════════════════════════════ */}
      <motion.section
        style={{
          padding: "60px 40px",
          maxWidth: "700px",
          margin: "0 auto",
          textAlign: "center",
          backgroundColor: "#fff",
        }}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <h1 style={{ fontSize: "2.4rem", fontWeight: 400, marginBottom: "24px" }}>Le Janzu</h1>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 400,  }}><strong>Une Odyssée à la rencontre de soi, &quot;di sè&quot; en italien.</strong></h2>
        <p style={{ lineHeight: 1.9, color: "#555", fontSize: "1rem" }}>
           Janzu signifie &quot;rivière pacifique&quot;. Il s&apos;agit d&apos;un soin aquatique qui se pratique en eau chaude et permet
          un relâchement profond de l&apos;esprit et du corps. Chaque séance est unique, une parenthèse personnelle, un
          voyage aquatique hors du temps.
        </p>
      </motion.section>

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
          quality={90}
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
          <motion.div
            style={{
              position: "relative",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              overflow: "hidden",
            }}
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {/* Image bulle en fond */}
            <Image
              src="/assets/bulle_bg.png"
              alt="bulle"
              fill
              sizes="368px"
              quality={90}
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                opacity: 0.65,
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
                  L&apos;eau
                </h3>
                <p
                  style={{
                    color: "white",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  Une eau chaude à 30°C pour libérer la colonne, enlever le poids sur les vertèbres et les
                  articulations, relâcher les muscles
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bulle 2 — Origines — décalée à droite */}
          <motion.div
            style={{
              position: "relative",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              overflow: "hidden",
            }}
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {/* Image bulle en fond */}
            <Image
              src="/assets/bulle_bg.png"
              alt="bulle"
              fill
              sizes="368px"
              quality={90}
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                opacity: 0.7,
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
                  L&apos;espace
                </h3>
                <p
                  style={{
                    color: "white",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  Un bassin privatisé dédié à votre séance, un espace protégé pour favoriser un climat de confiance et
                  de sécurité
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bulle 3 — Tibet — décalée à gauche */}
          <motion.div
            style={{
              position: "relative",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              overflow: "hidden",
            }}
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {/* Image bulle en fond */}
            <Image
              src="/assets/bulle_bg.png"
              alt="bulle"
              fill
              sizes="368px"
              quality={90}
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                opacity: 0.7,
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
                  Le mouvement
                </h3>
                <p
                  style={{
                    color: "white",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  Une mise en mouvement progressive de tout votre corps, sans effort, pour un lâcher-prise physique,
                  mental, émotionnel
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DÉROULÉ D'UNE SÉANCE */}
      <section style={{ backgroundColor: "#fff", padding: "20px 0" }}>
        {/* Bloc 1 — texte gauche, image droite */}
        <motion.div
          className="container py-5"
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-7">
              <h2 style={{ fontSize: "2rem", fontWeight: 400, marginBottom: "20px" }}>Origines</h2>
              <p style={{ lineHeight: 1.9, color: "#555", fontSize: "0.95rem" }}>
                Le <strong>Janzu®</strong> tire son origine de pratiques ancestrales, notamment des séances aquatiques
                réalisées par les chamanes mexicains. Son fondateur, Juan Villatoro, dans les années 80, s&apos;en est
                inspiré, ainsi que de ses découvertes lors de voyages en Asie. En créant le <strong>Janzu®</strong>, qui
                signifie &apos;rivière pacifique&apos;, il a gardé le principe fondamental de la mise en mouvement du
                corps dans l&apos;eau.
              </p>
            </div>
            <div className="col-12 col-md-5">
              <Image
                src="/assets/bloc1-janzu.jpg"
                alt="Séance Janzu"
                width={600}
                height={760}
                quality={90}
                style={{ borderRadius: "16px", objectFit: "cover", width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Bloc 2 — image gauche, texte droite */}
        <motion.div
          className="container py-5"
          variants={slideFromRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-7 order-md-2">
              <h2 style={{ fontSize: "2rem", fontWeight: 400, marginBottom: "20px" }}>Principes et bienfaits</h2>
              <p style={{ lineHeight: 1.9, color: "#555", fontSize: "0.95rem" }}>
                <strong>Ne rien faire.</strong> Le corps est soutenu dans l&apos;eau chaude, délicatement mis en
                mouvement, en confiance et sans aucun effort à fournir, sauf celui de &quot;faire l&apos;algue&quot;
                pour se laisser aller à la douce résistance de l&apos;eau. <strong>Trois éléments fondamentaux.</strong>{" "}
                L&apos;eau chaude, le corps soutenu et les mouvements. <strong>Chaque séance est unique.</strong>{" "}
                L&apos;alternance des mouvements en surface et en immersion favorise le lâcher-prise et permet de
                développer, renforcer, améliorer l&apos;écoute de soi, &quot;di sé&quot; en italien, au niveau
                corporel, mental, émotionnel.
              </p>
            </div>
            <div className="col-12 col-md-5 order-md-1">
              <Image
                src="/assets/bloc2-janzu.jpg"
                alt="Séance Janzu immersion"
                width={600}
                height={760}
                quality={90}
                style={{ borderRadius: "16px", objectFit: "cover", width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Bloc 3 — texte gauche, image droite */}
        <motion.div
          className="container py-5"
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-7">
              <h2 style={{ fontSize: "2rem", fontWeight: 400, marginBottom: "20px" }}>Exploration personnelle</h2>
              <p style={{ lineHeight: 1.9, color: "#555", fontSize: "0.95rem" }}>
                <strong>Perdre le contrôle pour mieux se connecter à soi-même.</strong> Les gestes techniques de la
                praticienne <strong>Janzu®</strong> se font oublier pour ne garder que le ressenti des mouvements doux, fluides,
                progressifs... Et le contact de l&apos;eau sur le corps, <strong>telle une danse aquatique. </strong>Les
                bienfaits physiologiques permettent aussi au mental de relâcher le flux des pensées et
                d&apos;expérimenter <strong>un état profond de relaxation.</strong>
              </p>
            </div>
            <div className="col-12 col-md-5">
              <Image
                src="/assets/presta2.jpg"
                alt="Fin de séance"
                width={600}
                height={760}
                quality={90}
                style={{ borderRadius: "16px", objectFit: "cover", width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Bloc 4 — image gauche, texte droite */}
        <motion.div
          className="container py-5"
          variants={slideFromRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-7 order-md-2">
              <h2 style={{ fontSize: "2rem", fontWeight: 400, marginBottom: "20px" }}>Déroulé d&apos;une séance d&apos;une heure</h2>
              <p style={{ lineHeight: 1.9, color: "#555", fontSize: "0.95rem" }}>
                <strong>Accueil et préparation (10 -15 mn)</strong> Nous prenons le temps d&apos;échanger sur le déroulé
                de la séance, vos besoins et vos éventuelles contraintes de santé. Je vous équipe d&apos;une veste
                néoprène pour un confort maximum, de flotteurs aux jambes et d&apos;un pince-nez.{" "}
                <strong><br></br>Séance aquatique (30 - 40 mn)</strong> En flottaison, je vous soutiens et mets votre corps en
                mouvement, à la surface de l&apos;eau. Les mouvements en immersion ne sont pas systématiques. Si vous le
                souhaitez, ils sont amenés progressivement et permettent une expérience aquatique et intérieure
                approfondie.<strong><br></br> Retour à soi</strong> La séance se termine par le temps qui vous est nécessaire
                afin de &quot;revenir à vous&quot; en douceur et reprendre contact lentement avec la position debout.
              </p>
            </div>
            <div className="col-12 col-md-5 order-md-1">
              <Image
                src="/assets/bloc4-janzu.jpg"
                alt="Séance Janzu immersion"
                width={600}
                height={760}
                quality={90}
                style={{ borderRadius: "16px", objectFit: "cover", width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Bloc 5 — texte gauche, image droite */}
        <motion.div
          className="container py-5"
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-7">
              <h2 style={{ fontSize: "2rem", fontWeight: 400, marginBottom: "20px" }}>Pour qui ?</h2>
              <p style={{ lineHeight: 1.9, color: "#555", fontSize: "0.95rem" }}>
                Le <strong>Janzu®</strong> s&apos;adresse à toute personne, de 10 ans jusqu&apos;à plus de 90 ans... qui ressent le besoin
                ou l&apos;envie d&apos;une séance douce et naturelle d&apos;amélioration de la santé générale, au niveau
                physique, mental, émotionnel. Nous prenons le temps au préalable d&apos;échanger sur votre état de
                santé.
              </p>
              <p style={{ color: "#555", fontSize: "0.95rem", marginBottom: "8px" }}>
                <strong>Indications favorables</strong>
              </p>
              <ul style={{ lineHeight: 1.7, color: "#555", fontSize: "0.95rem", marginBottom: "20px" }}>
                <li>Grossesse</li>
                <li>Arthrite, arthrose</li>
                <li>Nervosité, anxiété</li>
                <li>Problèmes liés au sommeil</li>
              </ul>
              <p style={{ color: "#555", fontSize: "0.95rem", marginBottom: "8px" }}>
                <strong>Contre-indications principales</strong>
              </p>
              <ul style={{ lineHeight: 1.7, color: "#555", fontSize: "0.95rem" }}>
                <li>Insuffisance pulmonaire ou cardiaque</li>
                <li>Infection contagieuse ou plaie récente</li>
                <li>Certains troubles de l&apos;oreille interne</li>
              </ul>
            </div>
            <div className="col-12 col-md-5">
              <Image
                src="/assets/bloc5-janzu.jpg"
                alt="Fin de séance"
                width={600}
                height={760}
                quality={90}
                style={{ borderRadius: "16px", objectFit: "cover", width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/*
          FIN DE PAGE — Texte incitation + logo + formulaire + footer*/}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}>
        {/* Fond sous-marin qui reprend */}
        <Image
          src="/assets/fond_mer2.jpg"
          alt="Fond marin"
          fill
          quality={90}
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
          <motion.div
            style={{ padding: "60px 40px", textAlign: "center" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
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
                quality={90}
                style={{ borderRadius: "50%" }}
              />
            </div>
          </motion.div>

          {/* Formulaire contact */}
          <ContactForm />

          {/* Footer */}
          <Footer />
        </div>
      </section>
    </main>
  );
}
