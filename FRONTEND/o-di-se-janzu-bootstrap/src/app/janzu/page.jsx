'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import api from '@/api/axios.js'

export default function JanzuPage() {

  // form de contact
  const [ formData, setFormData] = useState({ nom: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState(null)

  const handleChange = (e) => 
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/messages', formData)
      setFormStatus('success')
      setFormData({ nom: '', email: '', message: ''})
    } catch (err) {
      setFormStatus('error')
    }
  }

  return ()
}