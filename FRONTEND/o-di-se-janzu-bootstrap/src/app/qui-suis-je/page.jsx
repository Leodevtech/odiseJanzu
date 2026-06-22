'use client'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import { useState } from 'react'
import api from '@/api/axios.js'

export default function QuiSuisJePage() {
  

  return (
    <main style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#2d3748', backgroundColor: '#fff' }}>

  {/* navbar */}
    <Navbar />

    {/* Hero */}
    <section style={{ position: 'relative', height: '50vh', overflow: 'hidden' }}>
        <Image
          src="/assets/4K-sous-eau-2.jpg"
          alt="Fond sous-marin"
          fill
          style={{ objectFit: 'cover', objectPosition: '50% 40%' }}
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
          Laissez parler votre curiosité<br />contactez-moi
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
      <ContactForm />

      {/* Footer */}
      <Footer />
    </main>
  )  
}