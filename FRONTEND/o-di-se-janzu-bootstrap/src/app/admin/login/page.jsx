"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import api from "@/api/axios.js";
import Image from "next/image"; // composant next.js opti pour les images

export default function LoginPage() {
  //permet de naviguer vers une autre page sans recharger le nav
  const router = useRouter();
  const { login } = useAuth(); // récupère la fonction login depuis le contexte auth

  // useState créé une variable réactive + fonction mis a jour (valeur, setValeur)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // true pendant la requete api

  //fonction user soumet le form
  const handleSubmit = async (e) => {
    // bloque le comportement default du form(empeche le rechargement de page)
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // POST /api/auth/login envoi username + pass

      const response = await api.post(
        "/auth/login",
        { username, password },
        { withCredentials: true },
      );

      //reponse du backend en {token}
      const { accessToken } = response.data;

      // le jwt est en 3parties : header.payload.signature
      // on prends payload, on décode depuis la base64 avec atob()
      // on parse en json pour lire les données
      // {id, username, role, iat, exp}
      const payload = JSON.parse(atob(accessToken.split(".")[1]));

      // vérif admin
      if (payload.role !== "ADMIN") {
        setError("Accès refusé : vous n'êtes pas admin.");
        setLoading(false);
        return;
      }
      login(accessToken);
      router.push("/admin/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Erreur serveur";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundImage: "url(/assets/bg-login.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="card p-4 shadow"
        style={{ width: "420px", borderRadius: "16px" }}
      >
        {/*Logo centré haut */}
        <div className="text-center mb-3">
          <Image
            src="/assets/logo_bulle.jpg"
            alt="ô di sé Janzu"
            width={90}
            height={90}
            style={{ borderRadius: "50%" }}
          />
        </div>

        <h4 className="text-center mb-1">Connexion au Compte</h4>
        <p
          className="text-center text-muted mb-4"
          style={{ fontSize: "0.85rem" }}
        >
          Veuillez entrer vos identifiants pour continuer
        </p>
        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        {/* onSubmit appelle handlesubmit a la valid du form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Identifiant</label>
            <input
              type="text"
              className="form-control"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // maj du state a chaque frappe
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* grise le bouton pendant la req pour éviter les double click */}
          <button
            type="submit"
            className="btn btn-primary w-100 mt-2"
            disabled={loading}
          >
            {/* opérateur ternaire si loading est true affiche le spinner sinon affiche 'connexion' */}
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                />
                Connexion...
              </>
            ) : (
              "Connexion"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
