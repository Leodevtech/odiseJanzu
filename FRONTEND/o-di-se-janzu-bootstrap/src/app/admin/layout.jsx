// Layout serveur — exclut tout /admin/* des moteurs de recherche (espace privé, pas de contenu public)
export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({ children }) {
  return children
}
