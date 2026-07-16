// Génère /robots.txt — indique à Google d'explorer tout le site sauf l'espace admin
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin',
    },
    sitemap: 'https://www.odise-janzu.com/sitemap.xml',
  }
}
