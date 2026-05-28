"use client";

import { useState, useEffect } from "react";
import api, { setAccessToken } from "@/api/axios.js";

export default function ParametresPage() {
  // champ de la table site_content avec son propre state

  const [titreSection1, setTitreSection1] = useState("");
  const [titreSection2, setTitreSection2] = useState("");
  const [titreLieux1, setTitreLieux1] = useState("");
  const [titreLieux2, setTitreLieux2] = useState("");
  const [titreLieux3, setTitreLieux3] = useState("");
  const [titreLieux4, setTitreLieux4] = useState("");

  const [prestation1Titre, setPrestation1Titre] = useState("");
  const [prestation1Duree, setPrestation1Duree] = useState("");
  const [prestation1Prix, setPrestation1Prix] = useState("");

  const [prestation2Titre, setPrestation2Titre] = useState("");
  const [prestation2Duree, setPrestation2Duree] = useState("");
  const [prestation2Prix, setPrestation2Prix] = useState("");

  const [prestation3Titre, setPrestation3Titre] = useState("");
  const [prestation3Duree, setPrestation3Duree] = useState("");
  const [prestation3Prix, setPrestation3Prix] = useState("");

  const [prestation4Titre, setPrestation4Titre] = useState("");
  const [prestation4Duree, setPrestation4Duree] = useState("");
  const [prestation4Prix, setPrestation4Prix] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // renouvelle l'access token depui le cookie refreshToken
        const refreshRes = await api.post("/auth/refresh", null, {
          withCredentials: true,
        });
        setAccessToken(refreshRes.data.accessToken);

        // Récupère le contenu actuel du site depuis la DB - route publique
        const res = await api.get("/site-content");
        const content = res.data;

        //Pré-remplit les champs
        setTitreSection1(content.titre_section1 || "");
        setTitreSection2(content.titre_section2 || "");

        setTitreLieux1(content.titre_lieux1 || "");
        setTitreLieux2(content.titre_lieux2 || "");
        setTitreLieux3(content.titre_lieux3 || "");
        setTitreLieux4(content.titre_lieux4 || "");

        setPrestation1Titre(content.prestation1_titre || "");
        setPrestation1Duree(content.prestation1_duree || "");
        setPrestation1Prix(content.prestation1_prix || "");

        setPrestation2Titre(content.prestation2_titre || "");
        setPrestation2Duree(content.prestation2_duree || "");
        setPrestation2Prix(content.prestation2_prix || "");

        setPrestation3Titre(content.prestation3_titre || "");
        setPrestation3Duree(content.prestation3_duree || "");
        setPrestation3Prix(content.prestation3_prix || "");

        setPrestation4Titre(content.prestation4_titre || "");
        setPrestation4Duree(content.prestation4_duree || "");
        setPrestation4Prix(content.prestation4_prix || "");
      } catch (error) {
        console.error("Erreur chargement paramètres", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Soumet les modifications vers le back en une seul requete avec PUT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess("");
    setError("");

    try {
      // PUT /api/site-content envoie tous les champs modifiables sur le site web (possibilités d'ajout plus tard)
      await api.put(
        "/site-content",
        {
          titre_section1: titreSection1,
          titre_section2: titreSection2,

          titre_lieux1: titreLieux1,
          titre_lieux2: titreLieux2,
          titre_lieux3: titreLieux3,
          titre_lieux4: titreLieux4,

          prestation1_titre: prestation1Titre,
          prestation1_duree: prestation1Duree,
          prestation1_prix: prestation1Prix,
          prestation2_titre: prestation2Titre,
          prestation2_duree: prestation2Duree,
          prestation2_prix: prestation2Prix,
          prestation3_titre: prestation3Titre,
          prestation3_duree: prestation3Duree,
          prestation3_prix: prestation3Prix,
          prestation4_titre: prestation4Titre,
          prestation4_duree: prestation4Duree,
          prestation4_prix: prestation4Prix,
        },
        { withCredentials: true },
      );

      setSuccess("Contenu mis à jour avec succès !");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div>
      <h3 className="dashboard-title">Paramètres du site</h3>
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/*- Section textes principaux -*/}
        <div className="dashboard-card mb-4">
          <h5 className="mb-3">Textes principaux</h5>
          <div className="row g-3">
            {/* Titre H1 - affiché sur la page d'accueil */}
            <div className="col-md-6">
              <div
                className="card p-3 border-0"
                style={{ backgroundColor: "#f8f9fa", borderRadius: "10px" }}
              >
                <label className="form-label fw-semibold">Titre h1 :</label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={titreSection1}
                  onChange={(e) => setTitreSection1(e.target.value)}
                  placeholder="Bienvenue sur Ô di Sé Janzu..."
                />
                <small className="text-muted mt-1">
                  Message de bienvenue sur page accueil
                </small>
              </div>
            </div>

            {/* Lieux de pratique */}
            <div
              className="card shadow-sm border-0 p-4 mb-4"
              style={{ borderRadius: "12px" }}
            >
              <h5 className="mb-3">Lieux de pratique</h5>
              <div className="row g-3">
                {[
                  {
                    label: "Lieu 1",
                    value: titreLieux1,
                    setter: setTitreLieux1,
                  },
                  {
                    label: "Lieu 2",
                    value: titreLieux2,
                    setter: setTitreLieux2,
                  },
                  {
                    label: "Lieu 3",
                    value: titreLieux3,
                    setter: setTitreLieux3,
                  },
                  {
                    label: "Lieu 4",
                    value: titreLieux4,
                    setter: setTitreLieux4,
                  },
                ].map((lieux) => (
                  <div className="col-md-6" key={lieux.label}>
                    <label className="form-label">{lieux.label} :</label>
                    <input
                      type="text"
                      className="form-control"
                      value={lieux.value}
                      onChange={(e) => lieux.setter(e.target.value)}
                      placeholder={`Nom du ${lieux.label.toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Prestatioons x4 x3 champs */}

            <div
              className="card shadow-sm border-0 p-4 mb-4"
              style={{ borderRadius: "12px" }}
            >
              <h5 className="mb-3">Prestations</h5>
              <div className="row g-3">
                {[
                  {
                    label: "Prestation 1",
                    titre: prestation1Titre,
                    duree: prestation1Duree,
                    prix: prestation1Prix,
                    setTitre: setPrestation1Titre,
                    setDuree: setPrestation1Duree,
                    setPrix: setPrestation1Prix,
                  },
                  {
                    label: "Prestation 2",
                    titre: prestation2Titre,
                    duree: prestation2Duree,
                    prix: prestation2Prix,
                    setTitre: setPrestation2Titre,
                    setDuree: setPrestation2Duree,
                    setPrix: setPrestation2Prix,
                  },
                  {
                    label: "Prestation 3",
                    titre: prestation3Titre,
                    duree: prestation3Duree,
                    prix: prestation3Prix,
                    setTitre: setPrestation3Titre,
                    setDuree: setPrestation3Duree,
                    setPrix: setPrestation3Prix,
                  },
                  {
                    label: "Prestation 4",
                    titre: prestation4Titre,
                    duree: prestation4Duree,
                    prix: prestation4Prix,
                    setTitre: setPrestation4Titre,
                    setDuree: setPrestation4Duree,
                    setPrix: setPrestation4Prix,
                  },
                ].map((p) => (
                  <div className="col-md-6" key={p.label}>
                    <div
                      className="card p-3 border-0"
                      style={{
                        backgroundColor: "#f8f9fa",
                        borderRadius: "10px",
                      }}
                    >
                      <h6 className="mb-2">{p.label}</h6>

                      <div className="mb-2">
                        <label className="form-label">Titre</label>
                        <input
                          type="text"
                          className="form-control from-control-sm"
                          value={p.titre}
                          onChange={(e) => p.setTitre(e.target.value)}
                        />
                      </div>

                      <div className="mb-2">
                        <label className="form-label">Durée</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={p.duree}
                          onChange={(e) => p.setDuree(e.target.value)}
                        />
                      </div>

                      <div className="mb-2">
                        <label className="form-label">Prix</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={p.prix}
                          onChange={(e) => p.setPrix(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bouton sauvegarde */}
            

            {/*Pensée du jour */}
            <div className="col-md-6">
              <div
                className="card p-3 border-0"
                style={{ backgroundColor: "#f8f9fa", borderRadius: "10px" }}
              >
                <label className="form-label fw-semibold">
                  Pensée du jour :
                </label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={titreSection2}
                  onChange={(e) => setTitreSection2(e.target.value)}
                  placeholder="Une pensée inspirante..."
                />
                <small className="text-muted mt-1">
                  Text affiché dans la section secondaire
                </small>
              </div>
            </div>
          </div>
        </div>

        {/*Section lieux de pratique*/}
        <div
          className="card shadow-sm border-0 p-4 mb-4"
          style={{ borderRadius: "12px" }}
        >
          <h5 className="mb-3">Lieux de pratique</h5>
          <div className="row g-3">
            {[
              { label: "Lieu 1", value: titreLieux1, setter: setTitreLieux1 },
              { label: "Lieu 2", value: titreLieux2, setter: setTitreLieux2 },
              { label: "Lieu 3", value: titreLieux3, setter: setTitreLieux3 },
              { label: "Lieu 4", value: titreLieux4, setter: setTitreLieux4 },
            ].map((lieux) => (
              <div className="col-md-6" key={lieux.label}>
                <label className="form-label">{lieux.label} :</label>
                <input
                  type="text"
                  className="form-control"
                  value={lieux.value}
                  onChange={(e) => lieux.setter(e.target.value)}
                  placeholder={`Nom du ${lieux.label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bouton sauvegarder */}
        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-primary px-4"
            disabled={saving}
          >
            {saving ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                />
                Sauvegarde...
              </>
            ) : (
              <>
                <i className="bi bi-check-lg me-2" />
                Sauvegarder les modifications
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
