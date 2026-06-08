"use client";

import { useState, useEffect, useRef } from "react";
import api, { setAccessToken } from "@/api/axios.js";
import Image from "next/image";

export default function GaleriePage() {
  const [photos, setPhotos] = useState([]); //photos en db
  const [alt, setAlt] = useState(""); // champ alt
  const [description, setDescription] = useState("");
  const [fichier, setFichier] = useState(null); // fichier slélectionné
  const [preview, setPreview] = useState(null); // aperçu avant upload
  const [loading, setLoading] = useState(true); // chargement initial
  const [uploading, setUploading] = useState(false); //upload en cours
  const [selectedPhoto, setSelectedPhoto] = useState(null); //lightbox pour voirs les photos
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const inputRef = useRef(null); // ref a l'input file caché

  useEffect(() => {
    const fetchData = async () => {
      try {
        //renouvelle laccessToken depuis le cookie refreshtoken
        const refreshRes = await api.post("/auth/refresh", null, {
          withCredentials: true,
        });
        setAccessToken(refreshRes.data.accessToken);

        // charge les photos existantes
        const res = await api.get("/photos", { withCredentials: true });
        setPhotos(res.data);
      } catch (error) {
        console.error("Erreur chargement galerie", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // construit l'url complet vers l'image du serveurbackend
  const getImageUrl = (filepath) =>
    `${process.env.NEXT_PUBLIC_API_URL.replace("/api", "")}/${filepath?.replace(/^\//, "")}`;

  // quand l'admin sélectionne un fichier
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFichier(file);
    // url.createObjectURL crée une url temp pour afficher aperçu sans upload
    setPreview(URL.createObjectURL(file));
  };

  // Gère le drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setFichier(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDragOver = (e) => e.preventDefault();

  // soumet le form d'upload

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!fichier) return setError("Veuillez sélectionner une image");

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      //renouvelle le token avant upload pour eviter l'erreur token présent a l'upload
      const refreshRes = await api.post("/auth/refresh", null, {
        withCredentials: true,
      });
      setAccessToken(refreshRes.data.accessToken);

      // formdata est pour envoyer un fichier via axios
      const formData = new FormData();
      formData.append("photo", fichier);
      formData.append("alt", alt);
      formData.append("description", description);

      const res = await api.post("/photos", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Photo uploadée avec succès !");

      // reload la liste apres upload
      const photoRes = await api.get("/photos", { withCredentials: true });
      setPhotos(photoRes.data);

      // Réinitialise le form
      setFichier(null);
      setPreview(null);
      setAlt("");
      setDescription("");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur upload");
    } finally {
      setUploading(false);
    }
  };

  // Supprime une photo après confirm
  const handleDelete = async (id) => {
    if (!confirm("Supprimer cette photo ?")) return;
    try {
      await api.delete(`/photos/${id}`, { withCredentials: true });
      //retire la photo  supprimé du state sans recharger toute la liste
      setPhotos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError("Erreur suppression");
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
      <h3 className="dashboard-title">Galerie Photos</h3>

      {/* Form d'upload */}
      <div className="dashboard-card">
        <h5 className="mb-3">Ajouter une photo</h5>

        {error && <div className="alert alert-danger py-2">{error}</div>}
        {success && <div className="alert alert-success py-2">{success}</div>}

        <form onSubmit={handleUpload}>
          <div className="photo-grid">
            {/* Champs texte */}
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">Titre (alt) :</label>
                <input
                  type="text"
                  className="form-control"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  placeholder="Description courte de l'image"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description de la photo :</label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description longue"
                />
              </div>
            </div>

            {/*zone drag & drop */}
            <div className="col-md-8">
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => inputRef.current.click()}
                className="d-flex flex-column align-items-center justify-content-center rounded"
                style={{
                  border: "2px dashed #a78bfa",
                  minHeight: "160px",
                  cursor: "pointer",
                  backgroundColor: "#faf5ff",
                  transition: "background 0.2s",
                }}
              >
                {/*Aperçu de l'image sélectionnée 
                  J'ai utilisé la balise <img> native pour l'aperçu avant upload
                   car l'image vient d'une URL temporaire blob: générée par URL.createObjectURL()
                   Le composant <Image> de Next.js est prévu pour optimiser des images distantes ou statiques
                    pas des URLs blob temporaires. J'ai fait ce choix conscient pour éviter une configuration 
                    supplémentaire dans next.config.mjs sur un élément purement fonctionnel côté admin
                  
                  */}
                {preview ? (
                  <img
                    src={preview}
                    alt="aperçu"
                    style={{ maxHeight: "140px", borderRadius: "8px" }}
                  />
                ) : (
                  <>
                    <i
                      className="bi bi-cloud-arrow-up"
                      style={{ fontSize: "2rem", color: "#a78bfa" }}
                    />
                    <p className="mb-1 mt-2">Drag & Drop file here</p>
                    <small className="text-muted">or</small>
                    <button
                      type="button"
                      className="btn btn-sm mt-2"
                      style={{ backgroundColor: "#a78bfa", color: "white" }}
                    >
                      <i className="bi bi-paperclip me-1" /> Choose File
                    </button>
                    <small className="text-muted mt-2">
                      Formats acceptés : JPG, PNG, WEBP
                    </small>
                  </>
                )}
              </div>
              {/* Input file caché déclenche par le clic sur drag & drop */}
              <input
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/webp"
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={uploading || !fichier}
            >
              {uploading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  />
                  Upload en cours...
                </>
              ) : (
                "Uploader la photo"
              )}
            </button>
          </div>
        </form>
      </div>
      {/* LIGHTBOX — s'affiche par dessus tout quand une photo est sélectionnée */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {/* Bouton fermer */}
          <button
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "none",
              border: "none",
              color: "white",
              fontSize: "2rem",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ✕
          </button>

          {/* Image agrandie — stopPropagation empêche la fermeture au clic sur l'image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "90vw", maxHeight: "85vh" }}
          >
            <img
              src={getImageUrl(selectedPhoto.filepath)}
              alt={selectedPhoto.alt || "photo"}
              style={{
                maxWidth: "90vw",
                maxHeight: "85vh",
                objectFit: "contain",
                borderRadius: "8px",
                display: "block",
              }}
            />
            {/* Légende */}
            {selectedPhoto.alt && (
              <p
                style={{
                  color: "rgba(255,255,255,0.8)",
                  textAlign: "center",
                  marginTop: "12px",
                  fontStyle: "italic",
                  fontSize: "0.9rem",
                }}
              >
                {selectedPhoto.alt}
              </p>
            )}
          </div>

          {/* Flèche gauche — photo précédente */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const idx = photos.findIndex((p) => p.id === selectedPhoto.id);
              setSelectedPhoto(photos[idx === 0 ? photos.length - 1 : idx - 1]);
            }}
            style={{
              position: "absolute",
              left: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: "white",
              fontSize: "2rem",
              cursor: "pointer",
            }}
          >
            ←
          </button>

          {/* Flèche droite — photo suivante */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const idx = photos.findIndex((p) => p.id === selectedPhoto.id);
              setSelectedPhoto(photos[idx === photos.length - 1 ? 0 : idx + 1]);
            }}
            style={{
              position: "absolute",
              right: "60px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: "white",
              fontSize: "2rem",
              cursor: "pointer",
            }}
          >
            →
          </button>
        </div>
      )}
      {/*Grille des photos */}
      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-item">
            <div
              className="rounded overflow-hidden"
              style={{
                aspectRatio: "1",
                position: "relative",
                cursor: "pointer",
              }}
              // clic ouvre la lightbox
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${photo.filepath}`}
                alt={photo.alt || "Photo galerie"}
                fill
                unoptimized
                style={{ objectFit: "cover" }}
              />
            </div>
            <button
              className="photo-delete-btn"
              onClick={() => handleDelete(photo.id)}
            >
              <i className="bi bi-trash" />
            </button>
            {photo.description && (
              <small className="text-muted d-block mt-1 text-truncate">
                {photo.description}
              </small>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
