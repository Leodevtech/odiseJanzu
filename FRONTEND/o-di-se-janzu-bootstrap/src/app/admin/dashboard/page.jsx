"use client";

import { useState, useEffect } from "react";
import api, { setAccessToken } from "@/api/axios.js";

export default function DashboardPage() {
  const [messages, setMessages] = useState([]);

  const [totalPhotos, setTotalPhotos] = useState(0);

  const [loading, setLoading] = useState(true);

  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // récup un nouvel accessToken depuis le cookie refreshtoken
        const refreshRes = await api.post("/auth/refresh", null, {
          withCredentials: true,
        });
        setAccessToken(refreshRes.data.accessToken);

        const messagesRes = await api.get("/messages", {
          withCredentials: true,
        });
        setMessages(messagesRes.data);

        const photoRes = await api.get("/photos", { withCredentials: true });
        setTotalPhotos(photoRes.data.length);
      } catch (error) {
        console.error("Erreur chargement dashboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // marque message comme lu + maj affichage
  const handleMarkAsRead = async (id) => {
    try {
      await api.patch(`/messages/${id}/lu`, null, { withCredentials: true });
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, lu: 1 } : msg)),
      );
    } catch (error) {
      console.error("Erreur marquage message", error);
    }
  };

  // Supprime un message et le retire de l'affichage
  const handleDelete = async (id) => {
    try {
      await api.delete(`/messages/${id}`, { withCredentials: true });
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error("Erreur suppression message", error);
    }
  };

  // messages non lu (card stats)
  const totalNonLus = messages.filter((msg) => msg.lu === 0).length;
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
      {/*Titre bienvenue */}
      <h3 className="dashboard-title">Bienvenue Nathalie</h3>

      {/*3 Cards statistiques */}
      <div className="row g-3 mb-4">
        {/*Card total messages */}
        <div className="col-md-4">
          <div className="stat-card">
            <div ClassName="d-flex justify-content-between align-items-center">
              <span className="text-muted">Total Messages</span>
              {/*icone enveloppe bootstrap */}
              <span
                className="p-2 rounded-circle"
                style={{ backgroundColor: "#fff3cd" }}
              >
                <i
                  className="bi bi-enveloppe-fill"
                  style={{ color: "#f59e0b", fontSize: "1.2rem" }}
                />
              </span>
            </div>
            <h3 className="mt-2 mb-1">{messages.length}</h3>
            <small className="text-muted">
              {totalNonLus} non lu{totalNonLus > 1 ? "s" : ""}
            </small>
          </div>
        </div>

        {/* Card Total Photos */}
        <div className="col-md-4">
          <div className="stat-card">
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted">Total Photos</span>
              <span
                className="p-2 rounded-circle"
                style={{ backgroundColor: "#d1fae5" }}
              >
                <i
                  className="bi bi-images"
                  style={{ color: "#10b981", fontSize: "1.2rem" }}
                />
              </span>
            </div>
            <h3 className="mt-2 mb-1">{totalPhotos}</h3>
            <small className="text-success">↗ Galerie active</small>
          </div>
        </div>
        {/* Card Total Visites placeholder */}
        <div className="col-md-4">
          <div className="stat-card">
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted">Total Visites</span>
              <span
                className="p-2 rounded-circle"
                style={{ backgroundColor: "#ede9fe" }}
              >
                <i
                  className="bi bi-people-fill"
                  style={{ color: "#8b5cf6", fontSize: "1.2rem" }}
                />
              </span>
            </div>
            <h3 className="mt-2 mb-1">-</h3>
            <small className="text-muted">Bientôt disponible</small>
          </div>
        </div>
      </div>

      {/*Tableau messages reçus */}
      <div className="dashboard-card">
        <h5 className="mb-3">Messages Reçus</h5>
        {messages.length === 0 ? (
          <p className="text-muted">Aucun message pour le moment.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Messages</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg.id} className={msg.lu === 0 ? "fw-bold" : ""}>
                    <td>{msg.nom}</td>
                    <td>{msg.email}</td>
                    {/*tronque le message a 50caractères pour ne pas écraser le tableau */}
                    <td>
                      {msg.message.length > 50
                        ? msg.message.substring(0, 50) + "..."
                        : msg.message}
                    </td>
                    <td>
                      {new Date(msg.created_at).toLocaleDateString("fr-FR")}
                    </td>
                    <td>
                      <span
                        className={`badge ${msg.lu === 0 ? "bg-warning text-dark" : "bg-success"}`}
                      ></span>
                    </td>
                    <td className="d-flex gap-2">
                      {/*bouton voir ,ouvre la modale avec message complet */}
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setSelectedMessage(msg)}
                      >
                        Voir
                      </button>
                      {/* bouton marquer lu - visible uniquement si non lu */}
                      {msg.lu === 0 && (
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleMarkAsRead(msg.id)}
                        >
                          Marquer lu
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(msg.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modale récupèrer - React pure — remplace la modale Bootstrap qui bloquait l'écran */}
      {/*Modale affiche le message complet quand on clique sur voir */}
      {selectedMessage && (
        <div
          onClick={() => setSelectedMessage(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {/* stopPropagation empêche la fermeture au clic sur la modale */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "24px",
              width: "100%",
              maxWidth: "500px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Message de {selectedMessage.nom}</h5>
              {/* Bouton fermer — remet selectedMessage à null */}
              <button
                onClick={() => setSelectedMessage(null)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.4rem",
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <p>
              <strong>Email :</strong> {selectedMessage.email}
            </p>
            <p>
              <strong>Date :</strong>{" "}
              {new Date(selectedMessage.created_at).toLocaleDateString("fr-FR")}
            </p>
            <hr />
            {/* Message complet — pre-wrap conserve les sauts de ligne */}
            <p style={{ whiteSpace: "pre-wrap" }}>{selectedMessage.message}</p>

            {/* Footer */}
            <div className="d-flex gap-2 justify-content-end mt-3">
              {/* Marquer lu — visible uniquement si non lu */}
              {selectedMessage.lu === 0 && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    handleMarkAsRead(selectedMessage.id);
                    // Met à jour l'état local de la modale aussi
                    setSelectedMessage({ ...selectedMessage, lu: 1 });
                  }}
                >
                  Marquer comme lu
                </button>
              )}
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedMessage(null)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
