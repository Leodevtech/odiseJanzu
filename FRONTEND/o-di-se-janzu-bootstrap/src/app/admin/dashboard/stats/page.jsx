'use client'

import { useState, useEffect } from 'react'
import api, { setAccessToken } from '@/api/axios.js'

export default function StatsPage() {

  const [totalMessages, setTotalMessages] = useState(0)
  const [totalPhotos, setTotalPhotos] = useState(0)
  const [messagesNonLus, setMessagesNonLus] = useState(0) 
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Renouvelle l'accessToken depuis le cookie refreshToken
        const refreshRes = await api.post('/auth/refresh', null, { withCredentials: true })
        setAccessToken(refreshRes.data.accessToken)

        // Récupère les messages et les photos
        const [messageRes, photoRes] = await Promise.all([
          api.get('/messages', { withCredentials: true }),
          api.get('/photos', { withCredentials: true })
        ])

        setTotalMessages(messageRes.data.length)
        setMessagesNonLus(messageRes.data.filter((m) => m.lu === 0).length)
        setTotalPhotos(photoRes.data.length)
      } catch (error) {
        console.error('Erreur chargement stats', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

if (loading) {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <div className="spinner-border text-primary" role="status" />
    </div>
  )
}

return (
  <div>
    <h3 className="dashboard-title">Statistiques</h3>

    { /* Cards stats */}
    <div className="row g-3 mb-4">

      {/* Total Messages*/}
      <div className="col-md-4">
        <div className="stat-card">
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted">Total Messages</span>
            <span className="p-2 rounded-circle" style={{ backgroundColor: '#fff3cd' }}>
              <i className="bi bi-envelope-fill" style={{ color: '#f59e0b', fontSize: '1.2rem' }} />
            </span>
          </div>
          <h3 className="mt-2 mb-1">{totalMessages}</h3>
          <small className="text-warning">
            {messagesNonLus} non lu{messagesNonLus > 1 ? 's' : ''}
          </small>
        </div>
      </div>

      { /* Total Photos*/}
      <div className="col-md-4">
        <div className="stat-card">
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted">Total Photos</span>
            <span className="p-2 rounded-circle" style={{ backgroundColor: '#d1fae5' }}>
              <i className="bi bi-images" style={{ color: '#10b981', fontSize: '1.2rem' }} />
            </span>
          </div>
          <h3 className="mt-2 mb-1">{totalPhotos}</h3>
          <small className="text-success">↗ Galerie active</small>
        </div>
      </div>

      {/* Total Visites placeholder en attendant outils de tracking */}
      <div className="col-md-4">
        <div className="stat-card">
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted">Total Visites</span>
            <span className="p-2 rounded-circle" style={{ backgroundColor: '#ede9fe' }}>
              <i className="bi bi-people-fill" style={{ color: '#8b5cf6', fontSize: '1.2rem' }} />
            </span>
          </div>
          <h3 className="mt-2 mb-1">-</h3>
          <small className="text-muted">Bientôt disponible</small>
        </div>
      </div>
    </div>

    {/* Détail messages*/}
    <div className="dashboard-card">
      <h5 className="mb-3">Détail des messages</h5>
      <div className="row g-2">
        <div className="col-6">
          <div className="p-3 rounded" style={{ backgroundColor: '#f0fdf4' }}>
            <div className="text-muted mb-1">Messages lus</div>
            <h4 className="text-success">{totalMessages - messagesNonLus}</h4>
          </div>
        </div>
        <div className="col-6">
          <div className="p-3 rounded" style={{ backgroundColor: '#fffbeb' }}>
            <div className="text-muted mb-1">Messages non lus</div>
            <h4 className="text-warning">{messagesNonLus}</h4>
          </div>
        </div>
      </div>
    </div>

    
  </div>
)

}