import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Page mentions légales — informations légales obligatoires (France)
// Domaine actuel : odise-janzu.vercel.app — à mettre à jour lors du passage en .com
export default function MentionsLegalesPage() {
  return (
    <main
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        color: "#2d3748",
        backgroundColor: "#fff",
      }}
    >
      <Navbar />

      {/* Espace pour la navbar en position absolute */}
      <div style={{ height: "100px" }} />

      <section
        style={{
          padding: "40px 40px 80px",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{ fontSize: "2.2rem", fontWeight: 400, marginBottom: "40px" }}
        >
          Mentions légales
        </h1>

        <div style={{ lineHeight: 1.8, color: "#444", fontSize: "0.95rem" }}>
          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: 600,
              marginTop: "32px",
              marginBottom: "12px",
              color: "#2d3748",
            }}
          >
            Éditeur du site
          </h2>
          <p>
            Le présent site est édité par Nathalie ANNE, praticienne aquatique
            exerçant sous le statut d&apos;auto-entrepreneur (micro-entreprise).
          </p>
          <p>
            <strong>Nom commercial :</strong> Ô di Sé Janzu
            <br />
            <strong>SIRET :</strong> 832 327 738 00015
            <br />
            <strong>Adresse :</strong> 64340 Boucau, France
            <br />
            <strong>Téléphone :</strong> 06 78 95 71 28
            <br />
            <strong>Email :</strong> nathalieanne.loc@gmail.com
          </p>

          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: 600,
              marginTop: "32px",
              marginBottom: "12px",
              color: "#2d3748",
            }}
          >
            Hébergement
          </h2>
          <p>
            <strong>Hébergement du site (frontend &amp; backend) :</strong>
            <br />
            Vercel Inc.
            <br />
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
            <br />
            Site web :{" "}
            <a
              href="https://vercel.com"
              style={{ color: "#5b9bd5" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              vercel.com
            </a>
          </p>
          <p>
            <strong>Hébergement de la base de données :</strong>
            <br />
            AlwaysData SAS
            <br />
            91 rue du Faubourg Saint-Honoré, 75008 Paris, France
            <br />
            Site web :{" "}
            <a
              href="https://www.alwaysdata.com"
              style={{ color: "#5b9bd5" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              alwaysdata.com
            </a>
          </p>

          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: 600,
              marginTop: "32px",
              marginBottom: "12px",
              color: "#2d3748",
            }}
          >
            Propriété intellectuelle
          </h2>
          <p>
            L&apos;ensemble des contenus présents sur ce site (textes, images,
            logo, mise en page) est la propriété de Nathalie (Ô di Sé Janzu),
            sauf mention contraire. Toute reproduction, totale ou partielle, est
            interdite sans autorisation préalable.
          </p>

          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: 600,
              marginTop: "32px",
              marginBottom: "12px",
              color: "#2d3748",
            }}
          >
            Données personnelles
          </h2>
          <p>
            Les informations collectées via le formulaire de contact (nom,
            email, message) sont utilisées exclusivement pour répondre à votre
            demande. Elles ne sont ni cédées, ni vendues à des tiers.
          </p>
          <p>
            Conformément au Règlement Général sur la Protection des Données
            (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification
            et de suppression de vos données. Pour exercer ce droit,
            contactez-nous à l&apos;adresse :{" "}
            <a
              href="mailto:nathalieanne.loc@gmail.com"
              style={{ color: "#5b9bd5" }}
            >
              nathalieanne.loc@gmail.com
            </a>
            .
          </p>

          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: 600,
              marginTop: "32px",
              marginBottom: "12px",
              color: "#2d3748",
            }}
          >
            Cookies
          </h2>
          <p>
            Ce site n&apos;utilise pas de cookies de tracking publicitaire. Un
            cookie technique est utilisé uniquement pour assurer le
            fonctionnement de l&apos;espace d&apos;administration (connexion
            sécurisée), sans collecte de données à des fins commerciales.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
