"use client";

// Filet de sécurité ultime : si une erreur survient dans le layout racine
// lui-même (donc au-dessus de error.jsx, ex: AuthProvider), Next.js remplace
// TOUT le document par ce composant. Il doit donc fournir ses propres
// balises <html>/<body> puisque le layout racine ne s'affiche plus.
export default function GlobalError({ error, reset }) {
  return (
    <html lang="fr">
      <body>
        <main
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: "#2d3748",
            backgroundColor: "#fff",
            minHeight: "100vh",
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
              Une erreur inattendue est survenue. Vous pouvez réessayer, ou
              revenir un peu plus tard.
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
      </body>
    </html>
  );
}
