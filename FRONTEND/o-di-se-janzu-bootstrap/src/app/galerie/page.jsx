'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import api from '@/api/axios.js'

export default function GaleriePage() {

  const [photos, setPhotos] = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  // Charge toutes les photos au montage de la page
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await api.get('/photos')
        setPhotos(res.data)
      } catch (e) {
        console.error('Erreur chargement photos', e)
      }
    }
    fetchPhotos()
  }, [])

  // Construit l'URL complète vers l'image sur le serveur backend
  const getImageUrl = (filepath) =>
    `${process.env.NEXT_PUBLIC_API_URL.replace('/api', '')}/${filepath?.replace(/^\//, '')}`


  return (
    <main style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#2d3748', backgroundColor: '#fff' }}>


      {/* NAVBAR */}
      <nav style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px 40px', background: 'transparent'
      }}>
        <div style={{ display: 'flex', gap: '28px' }}>
          {[
            { label: '🏠', href: '/' },
            { label: 'Qui suis-je ?', href: '/qui-suis-je' },
            { label: 'Janzu', href: '/janzu' },
            { label: 'Galerie Photo', href: '/galerie' },
            { label: 'Contactez-moi', href: '/#contact' },
            { label: 'Liens', href: '/#liens' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                color: 'white', textDecoration: 'none', fontSize: '0.9rem',
                letterSpacing: '0.03em', textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={e => e.target.style.opacity = '0.75'}
              onMouseLeave={e => e.target.style.opacity = '1'}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>


      {/* HERO */}
      <section style={{ position: 'relative', height: '50vh', overflow: 'hidden' }}>
        <Image
          src="/assets/4K-sous-eau-2.jpg"
          alt="Fond sous-marin"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,30,60,0.3)' }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)', zIndex: 2
        }}>
          <Image
            src="/assets/logo_bulle.jpg"
            alt="Logo"
            width={110}
            height={110}
            style={{ borderRadius: '50%' }}
          />
        </div>
      </section>


      {/* TITRE */}
      <section style={{ padding: '40px 40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 400 }}>Galerie Photo</h1>
      </section>


      {/* MOSAÏQUE*/}
      <section style={{ padding: '0 40px 60px', maxWidth: '1200px', margin: '0 auto' }}>
        {photos.length === 0 ? (
          <p style={{ color: '#aaa', fontStyle: 'italic' }}>Aucune photo disponible.</p>
        ) : (
          <div style={{
            columns: '3 300px', // 3 colonnes, minimum 300px chacune
            gap: '12px'
          }}>
            {photos.map((photo, i) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                style={{
                  breakInside: 'avoid',
                  marginBottom: '12px',
                  cursor: 'pointer',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  position: 'relative',
                  // Hauteurs alternées pour l'effet mosaïque
                  height: i % 3 === 0 ? '280px' : i % 3 === 1 ? '200px' : '240px'
                }}
              >
                <img
                  src={getImageUrl(photo.filepath)}
                  alt={photo.alt || 'photo galerie'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    display: 'block'
                  }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                {/* Overlay titre au hover */}
                {photo.alt && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.5))',
                    color: 'white', padding: '20px 12px 10px',
                    fontSize: '0.85rem', fontStyle: 'italic',
                    opacity: 0, transition: 'opacity 0.3s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                  >
                    {photo.alt}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>


      {/* LIGHTBOX — overlay plein écran au clic sur une photo
          zIndex 1000 = au-dessus de tout
          clic sur le fond sombre = ferme la lightbox */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px'
          }}
        >
          {/* Bouton fermer */}
          <button
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: 'absolute', top: '20px', right: '20px',
              background: 'none', border: 'none', color: 'white',
              fontSize: '2rem', cursor: 'pointer', lineHeight: 1
            }}
          >
            ✕
          </button>

          {/* Image agrandie  */}
          <div
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '85vh' }}
          >
            <img
              src={getImageUrl(selectedPhoto.filepath)}
              alt={selectedPhoto.alt || 'photo'}
              style={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: '8px',
                display: 'block'
              }}
            />
            {/* Légende */}
            {selectedPhoto.alt && (
              <p style={{
                color: 'rgba(255,255,255,0.8)', textAlign: 'center',
                marginTop: '12px', fontStyle: 'italic', fontSize: '0.9rem'
              }}>
                {selectedPhoto.alt}
              </p>
            )}
          </div>

          {/* Flèche gauche — photo précédente */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              const idx = photos.findIndex(p => p.id === selectedPhoto.id)
              // Si première photo on boucle à la dernière
              setSelectedPhoto(photos[idx === 0 ? photos.length - 1 : idx - 1])
            }}
            style={{
              position: 'absolute', left: '20px', top: '50%',
              transform: 'translateY(-50%)',
              background: 'none', border: 'none', color: 'white',
              fontSize: '2rem', cursor: 'pointer'
            }}
          >
            ←
          </button>

          {/* Flèche droite — photo suivante */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              const idx = photos.findIndex(p => p.id === selectedPhoto.id)
              // Si dernière photo on boucle à la première
              setSelectedPhoto(photos[idx === photos.length - 1 ? 0 : idx + 1])
            }}
            style={{
              position: 'absolute', right: '60px', top: '50%',
              transform: 'translateY(-50%)',
              background: 'none', border: 'none', color: 'white',
              fontSize: '2rem', cursor: 'pointer'
            }}
          >
            →
          </button>
        </div>
      )}


      {/* FOOTER */}
      <footer style={{
        background: '#5b6f8a', color: 'white', textAlign: 'center',
        padding: '24px 40px', fontSize: '0.85rem'
      }}>
        <p style={{ margin: '0 0 6px' }}>2026 Ô di Sé Janzu par Nathalie</p>
        <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>
          created with{' '}
          <Link href="/admin/login" style={{ color: '#7ec8e3', textDecoration: 'none', fontSize: '1rem' }}>
            💙
          </Link>
          {' '}by leodevtech
        </p>
      </footer>

    </main>
  )
}