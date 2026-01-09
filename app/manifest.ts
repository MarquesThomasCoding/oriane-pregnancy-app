import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Oriane - Suivi de Grossesse',
    short_name: 'Oriane',
    description: 'Application de suivi de grossesse moderne et accessible',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/android-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: '/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  }
}