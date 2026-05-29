'use client'

import { useState, useEffect } from 'react'
import api, { setAccessToken } from '@/api/axios.js'

export default function AvisPage() {
  const [avis, setAvis] = useState([]) // liste de tous les avis actifs+masqués
  const [loading, setLoading] = useState(true)

  const [nom, setNom] = useState('')
  const [contenu, setContenu] = useState('')

  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  // - Chargement récupère tout les avis 
  useEffect(() => {
    const fetchData = async () => {
      try {
          // renouvelle l'access token dpeuis le refreshToken
        const refreshRes = await api.post('/auth/refresh', null, { withCredentials: true })
        setAccessToken(refreshRes.data.accessToken)

          // Route admin -retourne tous les avis 
          const res = await api.get('/avis', { withCredentials: true})
          setAvis(res.data)
      } catch (err) {
        console.error('Erreur chargement avis', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // -Ajouter un avis-
  const handleAdd = async (e) => {
    e.preventDefault()
    setSuccess('')
    setError('')
    try {
      await api.post('/avis', { nom, contenu }, { withCredentials: true })
      setSuccess('Avis ajouté avec succès !')
      //Reset kes champs
      setNom('')
      setContenu('')
      // Recharge la liste pour afficher le nouvel avis
      const res = await api.get('/avis', { withCredentials: true})
      setAvis(res.data)
    } catch (err) {
      setError('Erreur lors de l\'ajout')
    }
  }

  // TOGGLE ACTIF
  const handleToggle = async (id, actifActuel) => {
    try {
      await api.patch(`/avis/${id}/actif`, { actif: actifActuel === 1 ? 0 : 1 }, { withCredentials: true})
      // met à jour l'état sans refaire appel API
      setAvis((prev) =>
        prev.map((a) => (a.id === id ? { ...a, actif: actifActuel === 1 ? 0 : 1 } : a))
      )
    } catch (err) {
      console.error('Erreur toggle avis', err)
    }
  }

  // Supprimer un avis
  const handleDelete = async (id) => {
    try {
      await api.delete(`/avis/${id}`, { withCredentials: true })
      // retire l'avis de l'état local sans refaire un appel API
      setAvis ((prev) => prev.filter((a) => a.id !== id))
    } catch (err) {
      console.error('Erreur suppression avis', err)
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" role="status" />
      </div>
    )
  }

  return (
    <div>
      <h3 className="dashboard-title">Gestion des Avis</h3>

      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Form ajout avis */}
      <div className="dashboard-card mb-4">
        <h5 className="mb-3">Ajouter un avis</h5>
        <div className="mb-3">
          <label className="form-label">Nom du client</label>
          <input
            type="text"
            className="form-control"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Prénom Nom"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contenu de l&apos;avis</label>
          <textarea
            className="form-control"
            rows={4}
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            placeholder="Texte de l&apos;avis client..."
          />
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" onClick={handleAdd}>
            <i className="bi bi-plus-lg me-2"/>
              Ajouter l&apos;avis
          </button>
        </div>
      </div>

      {/* liste des avis */}
      <div className="dashboard-card">
        <h5 className="mb-3">Avis publiés</h5>

        {avis.length === 0 ? (
          <p className="text-muted">Aucun avis pour le moment.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Nom</th>
                  <th>Contenu</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {avis.map((a) => (
                  <tr key={a.id}>
                    <td>{a.nom}</td>
                    {/* Tronque le contenu à 60 caractères pour ne pas écraser le tableau */}
                    <td>{a.contenu.length > 60 ? a.contenu.substring(0, 60) + '...' : a.contenu}</td>
                    <td>
                      {/* vert=visible  gris=masqué */}
                      <span className={`badge ${a.actif === 1 ? 'bg-success' : 'bg-secondary'}`}>
                        {a.actif === 1 ? 'Visible' : 'Masqué'}
                      </span>
                    </td>
                    <td className="d-flex gap-2">
                      {/* Toggle — change le texte et la couleur selon l'état actuel */}
                      <button
                        className={`btn btn-sm ${a.actif === 1 ? 'btn-outline-warning' : 'btn-outline-success'}`}
                        onClick={() => handleToggle(a.id, a.actif)}
                      >
                        {a.actif === 1 ? 'Masquer' : 'Afficher'}
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(a.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}