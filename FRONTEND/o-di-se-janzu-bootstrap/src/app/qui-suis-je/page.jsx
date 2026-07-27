"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import AlgueSeparator from "@/components/AlgueSeparator";
import Footer from "@/components/Footer";
import { useState } from "react";
import api from "@/api/axios.js";
import { motion } from "framer-motion";
import { fadeUp, slideFromLeft, slideFromRight } from "@/lib/animations";

export default function QuiSuisJePage() {
  return (
    <main style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#2d3748", backgroundColor: "#fff" }}>
      {/* navbar */}
      <Navbar />

      {/* Hero */}
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

      {/* Titre + texte intro même que accueil */}
      <motion.section
        style={{ padding: "60px 40px", maxWidth: "700px", margin: "0 auto", textAlign: "center" }}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <h1 style={{ fontSize: "2.4rem", fontWeight: 400, marginBottom: "24px" }}>Qui suis-je ?</h1>
        <p style={{ lineHeight: 1.9, color: "#555", fontSize: "1rem" }}>
          Le Janzu est entré dans ma vie en découvrant la vidéo d&apos;une séance. Impressionnée et
          fortement attirée par ce que je voyais, je réservais, quelque temps plus tard, ma première séance... Depuis,
          le Janzu ne m&apos;a pas quittée et poursuit son chemin dans ma vie, telle une rivière sereine et pacifique.
        </p>
      </motion.section>

      {/*Séparateur algue */}
      <AlgueSeparator />

      {/* Bloc 1 — texte gauche, image droite */}
      <motion.section
        className="container py-5"
        variants={slideFromRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="row align-items-center g-4">
          <div className="col-12 col-md-7">
            <h2 style={{ fontSize: "2rem", fontWeight: 400, marginBottom: "20px" }}>L&apos;accompagnement</h2>
            <p style={{ lineHeight: 1.9, color: "#555", fontSize: "0.95rem" }}>
              Je m&apos;appelle Nathalie, je suis dotée d&apos;une grande sensibilité émotionnelle et relationnelle.
              Professionnellement, mes activités sont multiples et souvent simultanées, en tant que salariée ou
              indépendante. Les mots clés qui caractérisent mon parcours sont : enseigner, transmettre, accompagner.
              Cela fait plus de 20 ans que j&apos;accompagne les personnes dans leurs apprentissages et leurs projets,
              dans une démarche aidante et bienveillante.
            </p>
          </div>
          <div className="col-12 col-md-5">
            <Image
              src="/assets/meNath.jpg"
              alt="Nathalie"
              width={600}
              height={760}
              quality={90}
              style={{ borderRadius: "16px", objectFit: "cover", width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </motion.section>

      {/* Bloc 2 — image gauche, texte droite */}
      <motion.section
        className="container py-5"
        variants={slideFromLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="row align-items-center g-4">
          <div className="col-12 col-md-7 order-md-2 text-md-end">
            <h2 style={{ fontSize: "2rem", fontWeight: 400, marginBottom: "20px" }}>L&apos;eau</h2>
            <p style={{ lineHeight: 1.9, color: "#555", fontSize: "0.95rem" }}>
              Depuis toujours, l&apos;eau m&apos;est familière... et nécessaire ! Que ce soit à travers mes activités
              sportives ou lors de mes voyages, j&apos;ai besoin de l&apos;eau, élément qui me ressource, naturellement
              et profondément. Ma rencontre avec le Janzu a été une expérience inoubliable ! Dès ma première séance,
              j&apos;en découvre les bienfaits et la puissance. C&apos;est un voyage aquatique inédit et je ressens
              rapidement l&apos;envie de partager cette expérience. Me formant auprès de l&apos;école française Ojanzu,
              c&apos;est avec joie que je deviens praticienne certifiée Janzu®.
            </p>
          </div>
          <div className="col-12 col-md-5 order-md-1">
            <Image
              src="/assets/bg-bloc2-qsj.jpg"
              alt="Nathalie pratique"
              width={600}
              height={760}
              quality={90}
              style={{ borderRadius: "16px", objectFit: "cover", width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </motion.section>

      {/* Bloc 3 — texte gauche, image droite */}
      <motion.section
        className="container py-5"
        variants={slideFromRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="row align-items-center g-4">
          <div className="col-12 col-md-7">
            <h2 style={{ fontSize: "2rem", fontWeight: 400, marginBottom: "20px" }}>Les valeurs humaines</h2>
            <p style={{ lineHeight: 1.9, color: "#555", fontSize: "0.95rem" }}>
              Aujourd&apos;hui, c&apos;est dans l&apos;eau que je soutiens et accompagne les personnes vers un
              lâcher-prise régénérant, une reconnexion à soi, le temps d&apos;une séance aquatique. Très heureuse de
              contribuer à faire découvrir le soin Janzu et ses bienfaits, je propose des séances dans des bassins
              privatisés au Pays Basque et Sud des Landes. En parallèle, je mets en place des partenariats
              medico-sociaux, afin de permettre au plus grand nombre d&apos;accéder à ce soin et de bénéficier de la
              douceur et de la &quot;magie de l&apos;eau&quot;.
              <br />
              N&apos;hésitez pas à me contacter.
              <br />
              À bientôt dans l&apos;eau !
            </p>
          </div>
          <div className="col-12 col-md-5">
            <Image
              src="/assets/perso-3.jpg"
              alt="Nathalie séance"
              width={600}
              height={760}
              quality={90}
              style={{ borderRadius: "16px", objectFit: "cover", width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </motion.section>

      {/*Séparateur algue */}
      <AlgueSeparator />

      {/* text + logo avant contact  */}
      <motion.section
        style={{ padding: "60px 40px", textAlign: "center" }}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div
          style={{
            display: "inline-block",
            border: "1px solid #b0c8d8",
            borderRadius: "8px",
            padding: "20px 40px",
            marginBottom: "30px",
            color: "#5b7a8a",
            fontSize: "1rem",
            fontStyle: "italic",
            lineHeight: 1.7,
          }}
        >
          Laissez parler votre curiosité
          <br />
          contactez-moi
        </div>
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
      </motion.section>

      {/* form de contact  */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </main>
  );
}
