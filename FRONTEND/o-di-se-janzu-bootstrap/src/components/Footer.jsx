import Link from "next/link";

// Footer commun à toutes les pages du site
export default function Footer() {
  return (
    <footer
      style={{
        background: "#5b6f8a",
        color: "white",
        textAlign: "center",
        padding: "24px 40px",
        fontSize: "0.85rem",
      }}
    >
      <p style={{ margin: "0 0 6px" }}> Ô di Sé Janzu par Nathalie | 2026</p>
       <p style={{ margin: "0 0 6px" }}>
        <Link
          href="/mentions-legales"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#cfe3ee", textDecoration: "underline" }}
        >
          Mentions légales
        </Link>
      </p>
      <p style={{ margin: 0, fontSize: "0.75rem", opacity: 0.7, textDecoration: "underline" }}>
        
        <Link
          href="leodevtech.fr"
          target="_blank"
          style={{
            color: "#ffffff",
            textDecoration: "none",
            fontSize: "0.75rem",
          }}
        >
          created with
          💙
        by leodevtech
        </Link>
        
      </p>
    </footer>
  );
}