// Layout serveur — seul moyen d'exporter des metadata SEO ici car page.jsx est en "use client".
// Ne fait que déclarer le titre/description de la page et afficher son contenu, ne modifie rien d'existant.
export const metadata = {
  title: 'Qui suis-je ? – Nathalie, praticienne Janzu® certifiée',
  description:
    "Découvrez le parcours de Nathalie, praticienne certifiée Janzu® au Pays Basque.",
}

export default function QuiSuisJeLayout({ children }) {
  return children
}
