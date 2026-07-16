// Génère /sitemap.xml — liste des pages publiques à indexer par Google
export default function sitemap() {
  const baseUrl = 'https://www.odise-janzu.com'

  const routes = [
    { path: '/', priority: 1 },
    { path: '/qui-suis-je', priority: 0.8 },
    { path: '/janzu', priority: 0.8 },
    { path: '/galerie', priority: 0.6 },
    { path: '/lien-videos', priority: 0.5 },
    { path: '/mentions-legales', priority: 0.2 },
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    priority: route.priority,
  }))
}
