import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query, doc } from 'firebase/firestore'
import { db } from '../lib/firebase'

export interface Project {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  technologies: string[]
  github: string
  demo: string
  category: string
  featured: boolean
  order: number
}

export interface Skill {
  id: string
  name: string
  icon: string
  value: number
  category: string
  order: number
}

export interface Experience {
  id: string
  title: string
  company: string
  startDate: { seconds: number }
  endDate: { seconds: number } | null
  description: string[]
  order: number
}

export interface Education {
  id: string
  degree: string
  institution: string
  startYear: number
  endYear: number
  description: string
  order: number
}

export interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  icon: string
  type: 'certification' | 'publication'
  link: string
  subtitle: string
  order: number
}

export interface ProfileData {
  name: string
  title: string
  bio: string
  email: string
  phone: string
  location: string
  photoUrl: string
  socialLinks: {
    github: string
    linkedin: string
    twitter: string
    instagram: string
  }
}

export function useCollection<T>(collName: string, orderField = 'order') {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const q = query(collection(db, collName), orderBy(orderField))
      const unsub = onSnapshot(q, (snap) => {
        setData(snap.docs.map((d) => ({ id: d.id, ...d.data() } as T)))
        setLoading(false)
      }, () => {
        setLoading(false)
      })
      return () => unsub()
    } catch {
      setLoading(false)
      return () => {}
    }
  }, [collName, orderField])

  return { data, loading }
}

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const unsub = onSnapshot(doc(db, 'profile', 'main'), (snap) => {
        if (snap.exists()) {
          setProfile(snap.data() as ProfileData)
        }
        setLoading(false)
      }, () => {
        setLoading(false)
      })
      return () => unsub()
    } catch {
      setLoading(false)
      return () => {}
    }
  }, [])

  return { profile, loading }
}

export function useResumeUrl() {
  const [url, setUrl] = useState('/assets/E_Hemanth_Nagesh_2023.pdf')

  useEffect(() => {
    try {
      const unsub = onSnapshot(doc(db, 'resumeConfig', 'main'), (snap) => {
        if (snap.exists() && snap.data()?.pdfUrl) {
          setUrl(snap.data().pdfUrl)
        }
      })
      return () => unsub()
    } catch {
      return () => {}
    }
  }, [])

  return url
}
