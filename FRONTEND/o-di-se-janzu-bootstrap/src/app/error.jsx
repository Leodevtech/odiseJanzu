"use client";

// Error boundary Next.js (App Router) — capte les erreurs React non gérées
// qui surviennent dans une page ou en dessous, et affiche un message au lieu
// d'une page blanche. Le layout racine (Navbar, Footer, etc.) reste affiché
// puisque cette erreur ne remplace que le contenu de la page.
export default function Error({ error, reset }) {
  return (
    <main
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        color: "#2d3748",
        backgroundColor: "#fff",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "60px 40px",
      }}
    >
      <div style={{ maxWidth: "480px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 400, marginBottom: "20px" }}>
          Un instant, l&apos;eau se calme...
        </h1>
        <p style={{ lineHeight: 1.8, color: "#555", fontSize: "1rem", marginBottom: "30px" }}>
          Une erreur inattendue est survenue lors du chargement de cette page.
          Vous pouvez réessayer, ou revenir un peu plus tard.
        </p>
        <button
          onClick={() => reset()}
          style={{
            background: "#5b9bd5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px 28px",
            fontSize: "1rem",
            fontFamily: "inherit",
            cursor: "pointer",
          }}
        >
          Réessayer
        </button>
      </div>
    </main>
  );
}
