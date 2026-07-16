import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './global.css'
import { AuthProvider } from '@/context/AuthContext'
import BootstrapClient from '@/components/BootstrapClient'

// Données structurées JSON-LD — aide Google à comprendre qu'il s'agit d'un
// établissement local (nom, adresse, téléphone, réseaux sociaux)
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: 'Ô di Sé Janzu',
  description: "Séances de Janzu®, thérapie de la renaissance en eau chaude, par Nathalie à Boucau et dans le Sud des Landes.",
  url: 'https://www.odise-janzu.com',
  telephone: '+33678957128',
  email: 'nathalieanne.loc@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Boucau',
    postalCode: '64340',
    addressCountry: 'FR',
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61579396826909',
    'https://www.instagram.com/odisejanzu/',
    'https://www.youtube.com/@%C3%94diS%C3%A9Janzu-Voyageaquatique',
  ],
}

// metadataBase sert de racine pour générer les URLs absolues (Open Graph, canonical, etc.)
export const metadata = {
  metadataBase: new URL('https://www.odise-janzu.com'),
  title: {
    default: 'Ô di Sé Janzu – Soin aquatique à Boucau, Pays Basque',
    template: '%s | Ô di Sé Janzu',
  },
  description:
    "Séances de Janzu®, thérapie de la renaissance en eau chaude, par Nathalie à Boucau et dans le Sud des Landes.",
  openGraph: {
    title: 'Ô di Sé Janzu – Soin aquatique à Boucau, Pays Basque',
    description:
      "Séances de Janzu®, thérapie de la renaissance en eau chaude, par Nathalie à Boucau et dans le Sud des Landes.",
    url: 'https://www.odise-janzu.com',
    siteName: 'Ô di Sé Janzu',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {/* Données structurées — établissement local pour Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <AuthProvider>
          {children}
        </AuthProvider>
        <BootstrapClient />
      </body>
    </html>
  )
}
