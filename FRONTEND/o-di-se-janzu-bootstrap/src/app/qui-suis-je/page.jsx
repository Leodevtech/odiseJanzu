'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import api from '@/api/axios.js'

export default function QuiSuisJePage() {
  // Form contact
  const [formData, setFormData] = useState({ nom: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState(null)
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/messages', formData)
      setFormStatus('success')
      setFormData({ nom: '', email: '', message: '' })
    } catch (err) {
      setFormStatus('error')
    }
  }

  return (
    <main style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#2d3748', backgroundColor: '#fff' }}>

  {/* navbar */}
    <nav style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
      display:'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px 40px', nackground: 'transparent'
    }}>
      <div style={{ display: 'flex', gap: '28px' }}>
        {[
          { label: '🏠', href: '/' },
          { label: 'Qui suis-je ?', href: '/qui-suis-je' },
          { label: 'Janzu', href: '/janzu' },
          { label: 'Galerie Photo', href: '/#galerie' },
          { label: 'Contactez-moi', href: '#contact' },
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

    {/* Hero */}
    <section style={{ position: 'relative', height: '50vh', overflow: 'hidden' }}>
        <Image
          src="/assets/4K-sous-eau.jpg"
          alt="Fond sous-marin"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
        {/* Overlay sombre */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,30,60,0.35)' }} />

        {/* Logo centré */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)', zIndex: 2
        }}>
          <img
            src="/assets/logo_bulle.jpg"
            alt="Logo Ô di Sé Janzu"
            width={110}
            height={110}
            style={{ borderRadius: '50%' }}
          />
        </div>
      </section>

        {/* Titre + texte intro même que accueil */}

        <section style={{ padding: '60px 40px', maxWidth: '700px', margin: '0auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 400, marginBottom: '24px' }}>Qui suis-je ?</h1>
          <p style={{ lineHeight: 1.9, color: '#555', fontSize: '1rem' }}>
            Le Janzu est entré dans ma vie, sans que je le sache, en découvrant, par hasard, la vidéo
            d&apos;une séance sur un réseau social. Impressionnée et fortement attirée par ce que je voyais,
            je réservais, quelques semaines plus tard, ma première séance... Depuis, le Janzu ne m&apos;a
            pas quittée et poursuit son chemin dans ma vie, telle une rivière pacifique.
          </p>
        </section>

        {/*Séparateur algue */}
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
        <img
          src="/assets/banière v2.png"
          alt="séparateur décoratif"
          width={500}
          height={80}
          style={{ maxWidth: '100%', opacity: 0.85 }}
        />
      </div>

      {/* Blocs 1 Texte gauche + image  droite  */}
      <section style={{
        padding: '60px 40px', maxWidth: '1000px', margin: '0 auto',
        display: 'flex', gap: '60px', alignItems: 'center'
      }}>
        <div style={{ flex: 1 }}>
          <p style={{ lineHeight: 1.9, color: '#555', fontSize: '0.95rem' }}>
            Je m&apos;appelle Nathalie, je suis dotée d&apos;une grande sensibilité émotionnelle et
            relationnelle et depuis toujours, l&apos;eau m&apos;est familière. Que ce soit à travers
            mes activités sportives ou lors de mes voyages, j&apos;ai besoin de l&apos;eau, élément
            qui me ressource, naturellement et profondément.
          </p>
        </div>
        <div style={{ flex: '0 0 300px' }}>
          <img
            src="/assets/perso-1.jpg"
            alt="Nathalie"
            style={{ borderRadius: '16px', objectFit: 'cover', width: '300px', height: '380px' }}
          />
        </div>
      </section>

      {/* Bloc 2 texte droite, image gauche */}
      <section style={{
        padding: '60px 40px', maxWidth: '1000px', margin: '0 auto',
        display: 'flex', gap: '60px', alignItems: 'center',
        flexDirection: 'row-reverse' // inverse la disposition
      }}>
        <div style={{ flex: 1, textAlign: 'right' }}>
          <p style={{ lineHeight: 1.9, color: '#555', fontSize: '0.95rem' }}>
            Professionnellement, slasheuse mais pas lâcheuse, mes activités sont multiples et souvent
            simultanées. Salariée ou indépendante, les mots clés qui caractérisent mon parcours sont :
            accompagner, soutenir, transmettre.
          </p>
        </div>
        <div style={{ flex: '0 0 300px' }}>
          <img
            src="/assets/perso-2.jpg"
            alt="Nathalie pratique"
            style={{ borderRadius: '16px', objectFit: 'cover', width: '300px', height: '380px' }}
          />
        </div>
      </section>

      {/* Bloc 3 - texte gauche, image droite */}
      <section style={{
        padding: '60px 40px', maxWidth: '1000px', margin: '0 auto',
        display: 'flex', gap: '60px', alignItems: 'center'
      }}>
        <div style={{ flex: 1 }}>
          <p style={{ lineHeight: 1.9, color: '#555', fontSize: '0.95rem' }}>
            Formatrice, conseillère, notamment dans le domaine de l&apos;insertion socio-professionnelle,
            enseignante, depuis une vingtaine d&apos;années, j&apos;interviens auprès de personnes,
            habituellement dans un environnement de salles de classe, de bureaux, d&apos;espaces
            associatifs. Aujourd&apos;hui, c&apos;est dans l&apos;eau que je soutiens et accompagne
            les personnes vers un lâcher-prise régénérant, le temps d&apos;une séance de soin aquatique.
          </p>
        </div>
        <div style={{ flex: '0 0 300px' }}>
          <img
            src="/assets/perso-3.jpg"
            alt="Nathalie séance"
            style={{ borderRadius: '16px', objectFit: 'cover', width: '300px', height: '380px' }}
          />
        </div>
      </section>

      {/* bloc 4  - texte droite, image gauche*/}
       <section style={{
        padding: '60px 40px', maxWidth: '1000px', margin: '0 auto',
        display: 'flex', gap: '60px', alignItems: 'center',
        flexDirection: 'row-reverse'
      }}>
        <div style={{ flex: 1, textAlign: 'right' }}>
          <p style={{ lineHeight: 1.9, color: '#555', fontSize: '0.95rem' }}>
            Ma rencontre avec le Janzu est une expérience incroyable ! Dès ma première séance,
            j&apos;en découvre les bienfaits et la puissance. C&apos;est un voyage aquatique inédit !
            Ressentant le besoin de partager cette expérience, je deviens praticienne certifiée,
            formée par l&apos;école française Ojanzu.
          </p>
        </div>
        <div style={{ flex: '0 0 300px' }}>
          <img
            src="/assets/perso-4.jpg"
            alt="Nathalie certifiée"
            style={{ borderRadius: '16px', objectFit: 'cover', width: '300px', height: '380px' }}
          />
        </div>
      </section>

      {/* Bloc 5 - texte gauche, image droite */}
      <section style={{
        padding: '60px 40px', maxWidth: '1000px', margin: '0 auto',
        display: 'flex', gap: '60px', alignItems: 'center'
      }}>
        <div style={{ flex: 1 }}>
          <p style={{ lineHeight: 1.9, color: '#555', fontSize: '0.95rem' }}>
            Tellement heureuse de contribuer à faire découvrir le soin Janzu et ses bienfaits,
            je propose des séances dans des bassins privatisés au Pays Basque et Sud Landes.
            En parallèle, je mets en place des partenariats, afin de permettre l&apos;accès à ce
            soin à des personnes âgées, faisant face à la maladie ou en situation de handicap
            et bénéficier de la douceur et de la &quot;magie de l&apos;eau&quot;.
          </p>
        </div>
        <div style={{ flex: '0 0 300px' }}>
          <img
            src="/assets/perso-5.jpg"
            alt="Nathalie partenariats"
            style={{ borderRadius: '16px', objectFit: 'cover', width: '300px', height: '380px' }}
          />
        </div>
      </section>

      {/*Séparateur algue */}
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
        <img
          src="/assets/banière v2.png"
          alt="séparateur décoratif"
          width={500}
          height={80}
          style={{ maxWidth: '100%', opacity: 0.85 }}
        />
      </div>
      {/* text + logo avant contact  */}
      <section style={{ padding: '60px 40px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-block',
          border: '1px solid #b0c8d8',
          borderRadius: '8px',
          padding: '20px 40px',
          marginBottom: '30px',
          colo: '#5b7a8a',
          fontSize: '1rem',
          fontStyle: 'italic',
          lineHeight: 1.7
        }}>
          Laissez parler votre curiosité<br />contactez moi
        </div>
        {/* logo bulle */}
        <div style={{ marginBottom: '40px' }}>
          <Image
            src="/assets/logo_bulle.jpg"
            alt="Logo Ô di Sé Janzu"
            width={100}
            height={100}
            style={{ borderRadius: '50%' }}
          />
        </div>
      </section>

      {/* form de contact  */}
      <section id="contact" style={{ padding: '0 40px 60px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          background: '#6b7fa3', borderRadius: '16px', padding: '40px',
          display: 'flex', gap: '40px', color: 'white', flexWrap: 'wrap'
        }}>

          {/* Colonne infos */}
          <div style={{ flex: '0 0 200px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 400, marginBottom: '20px' }}>Contact</h3>
            <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>👤 Ô di Sé Janzu</p>
            <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>📍 Adresse de l&apos;entreprise<br />64340 Boucau</p>
            <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>📞 06.12.12.12.12</p>
            <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>✉️ lemail@test.com</p>
            <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
              <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>f</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>ig</a>
            </div>
          </div>

           {/* Colonne formulaire */}
          <div style={{ flex: 1, minWidth: '240px' }}>
            {formStatus === 'success' && (
              <div className="alert alert-success">Message envoyé avec succès !</div>
            )}
            {formStatus === 'error' && (
              <div className="alert alert-danger">Une erreur est survenue, réessayez.</div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Nom & Prénom"
                style={{ padding: '8px 12px', borderRadius: '6px', border: 'none', fontSize: '0.9rem' }}
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
                style={{ padding: '8px 12px', borderRadius: '6px', border: 'none', fontSize: '0.9rem' }}
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre message"
                rows={4}
                style={{ padding: '8px 12px', borderRadius: '6px', border: 'none', fontSize: '0.9rem', resize: 'vertical' }}
              />
              <button
                onClick={handleSubmit}
                style={{
                  background: '#5b9bd5', color: 'white', border: 'none',
                  padding: '10px 20px', borderRadius: '6px', cursor: 'pointer',
                  fontSize: '0.9rem', alignSelf: 'flex-end'
                }}
              >
                Envoyer ma demande
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#5b6f8a', color: 'white', textAlign: 'center',
        padding: '24px 40px', fontSize: '0.85rem'
      }}>
        <p style={{ margin: '0 0 6px' }}>2026 Ô di Sé Janzu par Nathalie</p>
        <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>
          created with{' '}
          <Link href="/" style={{ color: '#7ec8e3', textDecoration: 'none', fontSize: '1rem' }}>
            💙
          </Link>
          {' '}by leodevtech
        </p>
      </footer>
    </main>
  )  
}