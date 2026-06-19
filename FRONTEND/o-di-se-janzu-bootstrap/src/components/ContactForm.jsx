"use client";

import Link from "next/link";
import { useState } from "react";
import api from "@/api/axios.js";

// Formulaire de contact commun à toutes les pages — gère son propre state
// Style glassmorphism (fonctionne aussi bien sur fond uni que sur image)
export default function ContactForm() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: "",
    rgpd: false,
  });
  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.rgpd) {
      setFormStatus("rgpd");
      return;
    }
    try {
      await api.post("/messages", formData);
      setFormStatus("success");
      setFormData({ nom: "", email: "", message: "", rgpd: false });
    } catch (err) {
      setFormStatus("error");
    }
  };

  return (
    <section
      id="contact"
      style={{ padding: "0 40px 60px", maxWidth: "800px", margin: "0 auto" }}
    >
      <div
        style={{
          background: "#5b6f8a",
          backdropFilter: "blur(8px)",
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
              facebook
            </a>
            <a
              href="#"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1.2rem",
              }}
            >
              instagram
            </a>
          </div>
        </div>

        {/* Colonne formulaire */}
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
          {formStatus === "rgpd" && (
            <div className="alert alert-warning">
              Merci de cocher la case de consentement avant d&apos;envoyer.
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
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
              }}
            >
              <input
                type="checkbox"
                name="rgpd"
                id="rgpd-consent"
                checked={formData.rgpd}
                onChange={handleChange}
                style={{ marginTop: "4px" }}
              />
              <label
                htmlFor="rgpd-consent"
                style={{
                  fontSize: "0.8rem",
                  lineHeight: 1.4,
                  color: "white",
                }}
              >
                J&apos;accepte que mes données soient collectées et
                utilisées uniquement pour répondre à ma demande. Voir notre{" "}
                <Link
                  href="/mentions-legales"
                  style={{ color: "#7ec8e3", textDecoration: "underline" }}
                >
                  politique de confidentialité
                </Link>
                .
              </label>
            </div>
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
  );
}