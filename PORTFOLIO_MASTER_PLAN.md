# Hemanth Nagesh — Portfolio Master Implementation Plan

> **Purpose**: A living technical document capturing the full roadmap for this portfolio.
> Any developer or AI agent reading this should be able to implement any phase
> independently without needing additional context.
>
> **Last Updated**: July 2026  
> **Stack**: React 18 + TypeScript + Vite 7 + framer-motion + Firebase (Phase 2+)  
> **Deployed on**: Netlify  
> **Portfolio Owner**: Hemanth Nagesh E — Software Engineer, GenAI & Backend Systems

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Repository Structure](#2-repository-structure)
3. [Current Tech Stack](#3-current-tech-stack)
4. [Design System Reference](#4-design-system-reference)
5. [Phase 1 — Visual UX Overhaul (COMPLETE)](#5-phase-1--visual-ux-overhaul-complete)
6. [Phase 2 — Firebase Backend + Admin Portal (NEXT)](#6-phase-2--firebase-backend--admin-portal-next)
7. [Phase 3 — Future Enhancements](#7-phase-3--future-enhancements)
8. [Deployment Guide](#8-deployment-guide)
9. [Environment Variables Reference](#9-environment-variables-reference)
10. [Owner Info & Data Reference](#10-owner-info--data-reference)

---

## 1. Project Overview

### What This Is
A personal online portfolio and resume site for **Hemanth Nagesh E**, a Software Engineer
specializing in Generative AI, LLM backends, agentic systems, and RAG pipelines at TCS.

### Goals
1. **Public Portfolio**: A stunning dark-themed single-page portfolio with smooth animations showcasing skills, projects, experience, and certifications.
2. **Admin Portal**: A private dashboard (hidden route `/admin`) so Hemanth can manage all content live — add/edit projects, skills, upload resume PDF — without touching code.
3. **Real-Time Sync**: Content changes in admin appear on the public portfolio instantly via Firebase Firestore real-time listeners.
4. **Auto-Updating Data**: Age and experience years auto-calculate from hardcoded start dates so the portfolio is always accurate.

### Live URLs
- **Production**: Netlify (auto-deploys from main branch via `netlify.toml` in repo root)
- **Local Dev**: `http://localhost:5173` (Vite default)
- **Admin (Phase 2)**: `{domain}/admin`

---

## 2. Repository Structure

```
MyResume/
├── netlify.toml                    # Netlify deploy config (SPA redirect rules)
├── PORTFOLIO_MASTER_PLAN.md        # THIS FILE
├── new_context.txt                 # Hemanth's raw resume text (reference)
└── resume-react/                   # THE APP — all work happens here
    ├── index.html                  # HTML shell — Inter + JetBrains Mono + Bootstrap Icons CDN
    ├── package.json                # Dependencies
    ├── tsconfig.json
    ├── vite.config.ts
    ├── public/
    │   └── assets/
    │       ├── profile-img.jpg     # Profile photo
    │       ├── hero-bg.jpg         # Hero background (fallback)
    │       ├── project_id1.png     # Project thumbnails 1-5
    │       ├── project_id2.png
    │       ├── project_id3.png
    │       ├── project_id4.png
    │       ├── project_id5.png
    │       └── E_Hemanth_Nagesh_2023.pdf   # Downloadable resume PDF
    └── src/
        ├── main.tsx                # React entry point
        ├── App.tsx                 # Root — wires all sections + shell
        ├── styles/
        │   └── index.css           # ENTIRE design system (dark theme, all components)
        ├── utils/
        │   └── dateUtils.ts        # Auto-calculation: age, experience tenure
        └── components/
            ├── Navbar.tsx          # Sidebar nav (dark glass, scroll-spy, mobile toggle)
            ├── Hero.tsx            # Hero (photo, typewriter, auto-stats, badge)
            ├── About.tsx           # About (profile, auto-age, info chips)
            ├── Skills.tsx          # Tab filter + icon skill cards
            ├── Certifications.tsx  # Azure cert + publications
            ├── Projects.tsx        # Grid (filter, 3D tilt, modal with full details)
            ├── Resume.tsx          # Expandable accordion timeline (auto-tenure)
            ├── Contact.tsx         # Contact form — web3forms (DO NOT CHANGE API KEY)
            ├── Footer.tsx          # Footer + social links
            ├── LoadingScreen.tsx   # 2s animated intro
            ├── ScrollProgress.tsx  # Top progress bar
            ├── BackToTop.tsx       # Floating button
            └── CursorGlow.tsx      # Mouse glow (desktop only)
```

---

## 3. Current Tech Stack

### Frontend (Phase 1 — Active)
| Tech | Version | Purpose |
|---|---|---|
| React | 18.2 | UI framework |
| TypeScript | 5.2 | Type safety |
| Vite | 7.x | Dev server + bundler |
| framer-motion | 11.x | AnimatePresence, motion.div for tab/modal transitions |
| Bootstrap Icons | 1.11.3 | CDN in index.html — `bi bi-*` class icons |
| Inter (Google Fonts) | latest | Primary font |
| JetBrains Mono (Google Fonts) | latest | Monospace/code accent font |
| web3forms | API | Contact form submission (access key hardcoded in Contact.tsx) |

### To Add in Phase 2
| Tech | Version | Purpose |
|---|---|---|
| firebase | 10.x | Auth + Firestore + Storage |
| react-router-dom | 6.x | `/` vs `/admin` routing |
| @hello-pangea/dnd | 4.x | Drag-and-drop project/skill reordering in admin |

---

## 4. Design System Reference

All styles live in `src/styles/index.css`. No Tailwind — pure CSS custom properties.

### Color Tokens
```css
:root {
  --bg:             #080810;   /* Page background */
  --bg-2:           #0d0d1a;   /* Secondary bg (certs section, footer) */
  --surface:        #11111f;   /* Card background */
  --surface-2:      #1a1a2e;   /* Elevated card / hover state */
  --surface-3:      #22223a;   /* Deepest surface */
  --border:         rgba(99, 102, 241, 0.18);
  --border-subtle:  rgba(255, 255, 255, 0.06);
  --accent:         #6366f1;   /* Indigo — primary */
  --accent-2:       #8b5cf6;   /* Violet — gradient end */
  --accent-glow:    rgba(99, 102, 241, 0.3);
  --gradient:       linear-gradient(135deg, #6366f1, #8b5cf6);
  --text:           #e2e8f0;
  --text-muted:     #94a3b8;
  --text-dim:       #4a5568;
  --success:        #10b981;   /* "Open to Work" green */
  --nav-width:      270px;
  --radius:         12px;
  --radius-lg:      20px;
  --radius-xl:      28px;
  --shadow:         0 4px 24px rgba(0,0,0,0.5);
  --shadow-glow:    0 0 30px rgba(99, 102, 241, 0.25);
  --transition:     0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Layout
- Fixed left sidebar: `270px` wide on desktop (`--nav-width`)
- `main-content`: `margin-left: var(--nav-width)` on desktop, `0` below 1200px
- Section max-width: `1160px`, centered with `margin: 0 auto`
- Responsive breakpoints: `1200px` (nav collapse), `992px` (2-col → 1-col), `768px`, `480px`

### Scroll Reveal Pattern
Elements with class `reveal` start invisible. Global `IntersectionObserver` in `App.tsx` adds `visible` when they enter viewport.
Delay variants: `.reveal-delay-1` (0.1s) through `.reveal-delay-4` (0.4s).

---

## 5. Phase 1 — Visual UX Overhaul (COMPLETE)

**Status**: ✅ DONE — `npm run build` passes with 0 TypeScript errors (301KB bundle)

### Auto-Calculation Utilities (`src/utils/dateUtils.ts`)

Three exported functions — these are the ONLY auto-updating fields in Phase 1:

```typescript
// DOB = Sep 6 2000 — returns current age integer
calculateAge(): number

// Total experience from BOTSIO internship (Mar 2023 = earliest role)
// Returns { years, months, label } where label = "3+ yrs" or "2.5+ yrs"
calculateTotalExperience(): { years: number; months: number; label: string }

// TCS-specific tenure from Dec 2023
// Returns { years, months, label } where label = "1y 7m"
calculateTCSTenure(): { years: number; months: number; label: string }
```

Used in:
- `About.tsx` → Age chip: `${calculateAge()} years`
- `Hero.tsx` → Stats counter: experience years from `calculateTotalExperience()`
- `Resume.tsx` → TCS period: `Dec 2023 – Present · ${calculateTCSTenure().label}`

### Hero Section
- Profile photo: `/assets/profile-img.jpg` — circular with `conic-gradient` rotating glow ring
- "Open to Work" badge: green pulsing dot (`pulse-green` keyframe)
- Typewriter: cycles through 4 roles, 95ms/char typing, 45ms/char deleting, 2.2s pause
- Stats row: animated counter hook (`useCounter`) — experience years, 5 projects, "Azure Certified"
- Background: CSS dot-grid (`linear-gradient` 48px×48px) + radial gradient blobs
- Scroll indicator: bouncing chevron at bottom

### Skills Section
- 18 skills across 4 categories (see data below)
- Tab filter with `AnimatePresence mode="popLayout"` for smooth card transitions
- Each card: emoji icon + name + animated progress bar + % + category label
- Skill bars fill on `IntersectionObserver` entry

**Skill Data (Phase 2 will move this to Firestore):**
```
AI/LLM (7):   LangChain & LangGraph 95%, RAG Architectures 92%,
              OpenAI APIs 90%, Prompt Engineering 90%,
              LLM Evaluation & LLMOps 85%, Vector DBs 88%, Semantic Search 87%
Backend (5):  Python 95%, Django & REST APIs 82%, Microservices 85%,
              PostgreSQL 80%, Docker 85%
Cloud (4):    Azure AI Foundry 88%, AWS Bedrock 80%,
              GCP Vertex AI 75%, Kubernetes & CI/CD 82%
Frontend (2): React.js 75%, Accessible UI WCAG 80%
```

### Projects Section
- 5 projects — hardcoded in `Projects.tsx` (Phase 2 moves to Firestore)
- Filter: `All | Agentic | RAG | Accessibility | LLM Platform`
- 3D tilt: `onMouseMove` → `perspective(800px) rotateX rotateY` per card
- Modal: `AnimatePresence` with backdrop blur, shows thumbnail + full description + tech stack + GitHub/demo links
- Project #1 has `featured: true` → "⭐ Featured" badge

**Project Data Shape:**
```typescript
interface Project {
  id: number
  title: string
  description: string
  thumbnail: string        // /assets/project_idN.png
  technologies: string[]
  github?: string
  demo?: string
  category: string         // "Agentic" | "RAG" | "Accessibility" | "LLM Platform"
  featured?: boolean
}
```

### Resume Section
- Accordion timeline — click header toggles body via CSS `max-height` transition
- `expandedEdu` + `expandedExp` state, both default to 0 (first entry open)
- TCS period line includes auto-tenure from `calculateTCSTenure()`

### New Shell Components
| Component | Behavior |
|---|---|
| `LoadingScreen.tsx` | Fixed overlay, framer-motion fades out after 2s. "HN" logo + progress bar |
| `ScrollProgress.tsx` | `scrollY / (scrollHeight - innerHeight) * 100` → width% of fixed top bar |
| `BackToTop.tsx` | Visible after `scrollY > 320`, smooth scroll to top |
| `CursorGlow.tsx` | Radial gradient follows `mousemove`, hidden on touch devices |

---

## 6. Phase 2 — Firebase Backend + Admin Portal (NEXT)

**Status**: 🔴 NOT STARTED

**Goal**: Real-time Firebase backend + hidden admin portal at `/admin` for live content management.

---

### 6.1 Firebase Project Setup

**Step-by-step:**
1. Go to https://console.firebase.google.com → Create project: `hemanth-portfolio`
2. **Firestore**: Create database → Start in Production mode → `us-central1`
3. **Authentication**: Enable Email/Password provider → Add User with Hemanth's email + strong password (do NOT commit credentials)
4. **Storage**: Enable default bucket
5. **Web App**: Register app → Copy `firebaseConfig` object

**Free tier (Spark plan) — no credit card needed:**
- Firestore: 50K reads/day, 20K writes/day, 1 GB
- Auth: 10K/month
- Storage: 5 GB total, 1 GB/day download

**Install dependencies:**
```bash
cd resume-react
npm install firebase react-router-dom @hello-pangea/dnd
```

---

### 6.2 Firebase Config

**Create `src/lib/firebase.ts`:**
```typescript
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const db      = getFirestore(app)
export const auth    = getAuth(app)
export const storage = getStorage(app)
```

**Create `resume-react/.env.local`** (gitignored — never commit):
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Add same vars to Netlify: Site Settings → Environment Variables.

---

### 6.3 Firestore Data Schema

```
Firestore Root
├── /profile (document: "main")
│   ├── name:         "Hemanth Nagesh E"
│   ├── title:        "Software Engineer – Generative AI & Backend Systems"
│   ├── bio:          "Proficient in Python, LangChain..."
│   ├── email:        "hemanthnagesh082@gmail.com"
│   ├── phone:        "+91 9980 14 4503"
│   ├── location:     "Bangalore, India"
│   ├── photoUrl:     "https://firebasestorage.../profile-img.jpg"
│   └── socialLinks:  { github, linkedin, twitter, instagram }
│
├── /resumeConfig (document: "main")
│   └── pdfUrl:  "https://firebasestorage.../resume.pdf"
│
├── /projects (collection) — each doc:
│   ├── id, title, description, thumbnailUrl, technologies[], github, demo
│   ├── category ("Agentic"|"RAG"|"Accessibility"|"LLM Platform"|"Other")
│   ├── featured (boolean)
│   └── order (number — for manual sorting)
│
├── /skills (collection) — each doc:
│   ├── name, icon (emoji), value (0-100), category, order
│
├── /experience (collection) — each doc:
│   ├── title, company, startDate (Timestamp), endDate (Timestamp|null)
│   ├── description (string[] — bullet points), order
│
├── /education (collection) — each doc:
│   ├── degree, institution, startYear, endYear, description, order
│
├── /certifications (collection) — each doc:
│   ├── title, issuer, date, icon, type ("certification"|"publication"), link
│
└── /messages (collection) — contact form submissions:
    ├── name, email, subject, message
    ├── timestamp (serverTimestamp()), read (boolean)
```

---

### 6.4 Firestore & Storage Security Rules

**Firestore rules** (paste in Firebase Console → Firestore → Rules):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public reads for portfolio content
    match /profile/{doc}        { allow read: if true; allow write: if request.auth != null; }
    match /projects/{doc}       { allow read: if true; allow write: if request.auth != null; }
    match /skills/{doc}         { allow read: if true; allow write: if request.auth != null; }
    match /experience/{doc}     { allow read: if true; allow write: if request.auth != null; }
    match /education/{doc}      { allow read: if true; allow write: if request.auth != null; }
    match /certifications/{doc} { allow read: if true; allow write: if request.auth != null; }
    match /resumeConfig/{doc}   { allow read: if true; allow write: if request.auth != null; }
    // Private — only admin can read messages
    match /messages/{doc}       { allow read, write: if request.auth != null; }
  }
}
```

**Storage rules** (Firebase Console → Storage → Rules):
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

### 6.5 React Router Setup

**Update `src/main.tsx`:**
```tsx
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
```

**Update `src/App.tsx`** — split into public portfolio + admin route:
```tsx
import { Routes, Route } from 'react-router-dom'
import AdminApp from './admin/AdminApp'

// Extract current portfolio JSX into PublicPortfolio component or inline
function App() {
  return (
    <Routes>
      <Route path="/*"       element={<PublicPortfolio />} />
      <Route path="/admin/*" element={<AdminApp />} />
    </Routes>
  )
}
```

---

### 6.6 Custom Hooks for Real-Time Data

**Create `src/hooks/usePortfolioData.ts`:**
```typescript
import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query, doc } from 'firebase/firestore'
import { db } from '../lib/firebase'

// Generic real-time collection listener — sorted by `order` field
export function useCollection<T>(collName: string, orderField = 'order') {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const q = query(collection(db, collName), orderBy(orderField))
    const unsub = onSnapshot(q, (snap) => {
      setData(snap.docs.map((d) => ({ id: d.id, ...d.data() } as T)))
      setLoading(false)
    })
    return () => unsub()
  }, [collName, orderField])
  return { data, loading }
}

// Profile singleton doc
export function useProfile() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'profile', 'main'), (snap) => {
      setProfile(snap.data()); setLoading(false)
    })
    return () => unsub()
  }, [])
  return { profile, loading }
}

// Resume PDF URL — falls back to static asset if Firestore not set
export function useResumeUrl() {
  const [url, setUrl] = useState('/assets/E_Hemanth_Nagesh_2023.pdf')
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'resumeConfig', 'main'), (snap) => {
      if (snap.exists() && snap.data()?.pdfUrl) setUrl(snap.data().pdfUrl)
    })
    return () => unsub()
  }, [])
  return url
}
```

**After hooks exist, update these public components:**
- `Skills.tsx`: Replace hardcoded `skills[]` with `useCollection<Skill>('skills')`
- `Projects.tsx`: Replace `PROJECTS[]` with `useCollection<Project>('projects')`
- `Resume.tsx`: Replace arrays with `useCollection<Experience>('experience')` + `useCollection<Education>('education')`
- `About.tsx`: Replace `link.href = '/assets/...'` with `href={useResumeUrl()}`
- `Certifications.tsx`: `useCollection('certifications')`

---

### 6.7 Admin File Structure

```
src/admin/
├── AdminApp.tsx               # Auth guard — login or dashboard
├── AdminLogin.tsx             # Email + password login form
├── AdminLayout.tsx            # Header nav + content area wrapper
├── admin.css                  # Admin-specific styles (dark, functional)
├── pages/
│   ├── Dashboard.tsx          # Overview: counts, last-modified
│   ├── ProjectsPage.tsx       # CRUD + drag-drop reorder
│   ├── SkillsPage.tsx         # CRUD + drag-drop reorder
│   ├── ResumePage.tsx         # 3 tabs: Experience | Education | PDF Upload
│   ├── ProfilePage.tsx        # Edit bio, photo, social links
│   ├── CertsPage.tsx          # Edit certifications + publications
│   └── MessagesPage.tsx       # Read-only contact form messages
├── components/
│   ├── ProjectForm.tsx        # Add/edit project (used in modal)
│   ├── SkillForm.tsx          # Add/edit skill
│   ├── ExperienceForm.tsx     # Add/edit experience entry
│   ├── EducationForm.tsx      # Add/edit education entry
│   └── FileUpload.tsx         # Reusable Firebase Storage uploader
└── hooks/
    └── useAuth.ts             # onAuthStateChanged wrapper
```

---

### 6.8 Authentication

**`src/admin/hooks/useAuth.ts`:**
```typescript
import { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../../lib/firebase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    return onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false) })
  }, [])
  return { user, loading }
}
```

**`src/admin/AdminApp.tsx`:**
```tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import AdminLogin from './AdminLogin'
import AdminLayout from './AdminLayout'

export default function AdminApp() {
  const { user, loading } = useAuth()
  if (loading) return <div className="admin-loading">Loading...</div>
  return (
    <Routes>
      <Route path="login" element={user ? <Navigate to="/admin" replace /> : <AdminLogin />} />
      <Route path="/*"    element={user ? <AdminLayout /> : <Navigate to="/admin/login" replace />} />
    </Routes>
  )
}
```

**`src/admin/AdminLogin.tsx`:**
```tsx
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/firebase'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch {
      setError('Invalid credentials.')
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">HN</div>
        <h1>Admin Portal</h1>
        {error && <p className="admin-error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
        </form>
      </div>
    </div>
  )
}
```

**IMPORTANT**: Create the admin user manually in Firebase Console → Authentication → Add User.
Use Hemanth's real email + a strong password. Never hardcode credentials.

---

### 6.9 Admin Layout

**`src/admin/AdminLayout.tsx`:**
```tsx
import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import Dashboard from './pages/Dashboard'
import ProjectsPage from './pages/ProjectsPage'
import SkillsPage from './pages/SkillsPage'
import ResumePage from './pages/ResumePage'
import ProfilePage from './pages/ProfilePage'
import CertsPage from './pages/CertsPage'
import MessagesPage from './pages/MessagesPage'

const navItems = [
  { path: '', label: 'Dashboard', icon: 'bi-speedometer2' },
  { path: 'projects', label: 'Projects', icon: 'bi-folder2-open' },
  { path: 'skills', label: 'Skills', icon: 'bi-lightning-charge' },
  { path: 'resume', label: 'Resume', icon: 'bi-file-earmark-text' },
  { path: 'profile', label: 'Profile', icon: 'bi-person-circle' },
  { path: 'certs', label: 'Certifications', icon: 'bi-patch-check' },
  { path: 'messages', label: 'Messages', icon: 'bi-chat-dots' },
]

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">Admin Portal</div>
        <nav>
          {navItems.map(item => (
            <NavLink key={item.path} to={`/admin/${item.path}`} end={item.path === ''}>
              <i className={`bi ${item.icon}`} /> {item.label}
            </NavLink>
          ))}
        </nav>
        <button onClick={() => signOut(auth)} className="admin-logout">
          <i className="bi bi-box-arrow-left" /> Logout
        </button>
      </aside>
      <main className="admin-main">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="projects/*" element={<ProjectsPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="certs" element={<CertsPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  )
}
```

---

### 6.10 CRUD Operations Reference

#### Projects CRUD (`ProjectsPage.tsx`)
```typescript
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../lib/firebase'

// Add
await addDoc(collection(db, 'projects'), { ...projectData, order: projects.length })

// Update
await updateDoc(doc(db, 'projects', id), { ...updatedFields })

// Delete (with confirm dialog first)
await deleteDoc(doc(db, 'projects', id))

// Reorder (on drag-drop)
const batch = writeBatch(db)
reorderedItems.forEach((item, index) => {
  batch.update(doc(db, 'projects', item.id), { order: index })
})
await batch.commit()
```

**ProjectForm fields:**
| Field | Input Type | Validation |
|---|---|---|
| title | text | required |
| description | textarea | required |
| category | select (Agentic/RAG/Accessibility/LLM Platform/Other) | required |
| technologies | text (comma-separated → split to array on save) | required |
| github | url | optional |
| demo | url | optional |
| featured | checkbox | optional |
| thumbnail | file input → FileUpload component | optional |

#### Skills CRUD (`SkillsPage.tsx`)
**SkillForm fields:**
| Field | Input Type | Notes |
|---|---|---|
| name | text | required |
| icon | text | emoji input, e.g. "🧠" |
| category | select (AI / LLM / Backend / Cloud & DevOps / Frontend) | required |
| value | range 0–100 | shows % label |

#### Resume CRUD (`ResumePage.tsx`)
Three tabs:

**Experience tab — ExperienceForm fields:**
```
title:       text (required)
company:     text (required)
startDate:   date picker → Firestore Timestamp
endDate:     date picker OR "Present" toggle → null in Firestore
description: dynamic list — [ bullet text input, + Add Bullet, × remove ]
```

**Education tab — EducationForm fields:**
```
degree:      text (required)
institution: text (required)
startYear:   number input
endYear:     number input
description: textarea
```

**PDF Upload tab:**
```
Show current PDF URL as clickable link
File input: accept=".pdf", max 10MB
On select: validate size → upload to Storage path "resume/latest.pdf"
On complete: getDownloadURL() → updateDoc(doc(db,'resumeConfig','main'), { pdfUrl: url })
Public About.tsx reads this via useResumeUrl() hook → download always serves latest
```

---

### 6.11 File Upload Component

**`src/admin/components/FileUpload.tsx`:**
```typescript
interface FileUploadProps {
  storagePath: string              // e.g. "projects/abc123/thumbnail.jpg"
  accept: string                   // "image/*" or ".pdf"
  maxSizeMB?: number               // default: 5
  onUploadComplete: (url: string) => void
  currentUrl?: string              // shows preview if image
}
```

Implementation flow:
```typescript
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../../lib/firebase'

// 1. User picks file
// 2. Validate: file.size > maxSizeMB * 1024 * 1024 → show error, return
// 3. const storageRef = ref(storage, storagePath)
// 4. const task = uploadBytesResumable(storageRef, file)
// 5. task.on('state_changed',
//      (snap) => setProgress(snap.bytesTransferred / snap.totalBytes * 100),
//      (err) => setError(err.message),
//      async () => {
//        const url = await getDownloadURL(storageRef)
//        onUploadComplete(url)
//      })
// 6. Show progress bar while uploading
```

---

### 6.12 Messages Page

**`src/admin/pages/MessagesPage.tsx`:**
```typescript
// Query all messages, newest first
const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'))

// Mark as read
await updateDoc(doc(db, 'messages', id), { read: true })

// Delete
await deleteDoc(doc(db, 'messages', id))
```

**ALSO**: Update `Contact.tsx` to save messages to Firestore IN ADDITION to web3forms:
```typescript
// Inside handleSubmit, after successful web3forms response (result.success === true):
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'

await addDoc(collection(db, 'messages'), {
  ...formData,
  timestamp: serverTimestamp(),
  read: false,
})
```

---

### 6.13 Data Seed Script (One-Time Migration)

After Firebase is set up, run this script once to populate Firestore with current hardcoded data
so the public site continues to work while admin portal is built.

**Create `resume-react/scripts/seed.mjs`:**
```javascript
// node scripts/seed.mjs
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore'

const firebaseConfig = { /* paste config */ }
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Copy projects array from Projects.tsx
const projects = [ /* ... */ ]
for (const [i, p] of projects.entries()) {
  await addDoc(collection(db, 'projects'), {
    ...p, thumbnailUrl: p.thumbnail, order: i
  })
}

// Copy skills from Skills.tsx
// Copy experience/education from Resume.tsx
// Copy certifications from Certifications.tsx

// Set profile singleton
await setDoc(doc(db, 'profile', 'main'), {
  name: 'Hemanth Nagesh E',
  title: 'Software Engineer – Generative AI & Backend Systems',
  email: 'hemanthnagesh082@gmail.com',
  phone: '+91 9980 14 4503',
  location: 'Bangalore, India',
  photoUrl: '', // update after uploading photo to Storage
  socialLinks: {
    github: 'https://github.com/hemanth-nagesh',
    linkedin: 'https://www.linkedin.com/in/e-hemanth-nagesh-1b12731b7',
    twitter: 'https://x.com/Nageshehemanth',
    instagram: 'https://www.instagram.com/__hemanth__beast_/'
  }
})

// Set resume config
await setDoc(doc(db, 'resumeConfig', 'main'), {
  pdfUrl: '' // update after uploading PDF to Storage
})

console.log('Seed complete!')
```

---

### 6.14 Phase 2 Execution Checklist (For Agent)

```
SETUP
- [ ] Create Firebase project (Firestore + Auth Email/Password + Storage)
- [ ] Create admin user in Firebase Console → Authentication → Add User
- [ ] npm install firebase react-router-dom @hello-pangea/dnd
- [ ] Create src/lib/firebase.ts with env var imports
- [ ] Create .env.local with all VITE_FIREBASE_* vars
- [ ] Set Firestore security rules (see 6.4)
- [ ] Set Storage security rules (see 6.4)

ROUTING
- [ ] Update src/main.tsx → wrap in BrowserRouter
- [ ] Update src/App.tsx → Routes with /* (public) and /admin/* (admin)
- [ ] Verify netlify.toml has SPA redirect rule (already present)

DATA LAYER
- [ ] Create src/hooks/usePortfolioData.ts (useCollection, useProfile, useResumeUrl)
- [ ] Run seed script → populate Firestore with current hardcoded data
- [ ] Update Skills.tsx → useCollection('skills')
- [ ] Update Projects.tsx → useCollection('projects')
- [ ] Update Resume.tsx → useCollection('experience') + useCollection('education')
- [ ] Update About.tsx → useResumeUrl() for download href
- [ ] Update Certifications.tsx → useCollection('certifications')
- [ ] Update Contact.tsx → also save to Firestore /messages

ADMIN PORTAL
- [ ] src/admin/hooks/useAuth.ts
- [ ] src/admin/AdminApp.tsx (auth guard + routes)
- [ ] src/admin/AdminLogin.tsx
- [ ] src/admin/AdminLayout.tsx (sidebar nav + nested routes)
- [ ] src/admin/admin.css (dark, functional styles)
- [ ] src/admin/components/FileUpload.tsx (Storage uploader with progress)
- [ ] src/admin/pages/Dashboard.tsx (counts + last-modified stats)
- [ ] src/admin/pages/ProjectsPage.tsx + ProjectForm.tsx + drag-drop reorder
- [ ] src/admin/pages/SkillsPage.tsx + SkillForm.tsx + drag-drop reorder
- [ ] src/admin/pages/ResumePage.tsx (3 tabs: Experience/Education/PDF Upload)
- [ ] src/admin/pages/ProfilePage.tsx (bio, photo upload, social links)
- [ ] src/admin/pages/CertsPage.tsx (certs + publications CRUD)
- [ ] src/admin/pages/MessagesPage.tsx (read, mark-read, delete)

VERIFICATION
- [ ] npm run build → 0 TypeScript errors
- [ ] Test login at /admin/login
- [ ] Test logout
- [ ] Test add project → appears on public /projects instantly
- [ ] Test edit skill → updates public /skills
- [ ] Test PDF upload → About.tsx download serves new file
- [ ] Test contact form → message appears in /admin/messages
- [ ] Deploy to Netlify with env vars set
```

---

## 7. Phase 3 — Future Enhancements

### 7.1 AI Portfolio Chatbot (High Priority — On-Brand)
A floating chat widget on the public portfolio — visitors ask questions about Hemanth.

- **Tech**: Firebase Functions (Node.js) → proxies to OpenAI GPT-4o mini or Google Gemini Flash
- **Why Functions**: API key stays server-side, not exposed to browser
- **Context at query time**: Load profile, skills, projects, experience from Firestore
- **UI**: Floating chat bubble bottom-right (`position: fixed`), slides up on click
- **Sample queries**: "What LLM frameworks does Hemanth know?", "What companies has he worked at?", "Summarize his top project"
- **Install**: `firebase init functions` → Node.js → deploy `onCall` function

### 7.2 Visitor Analytics (Admin Dashboard)
- Track: page views, section scroll depth, resume downloads, project modal opens, contact form submits
- **Tech**: Custom event tracking writing to Firestore `/analytics` collection
- **Display**: Charts in Admin Dashboard page (use `recharts` library)
- **Privacy**: No PII, only aggregate interaction counts

### 7.3 Blog / Articles Section
- New public section + admin CRUD
- **Storage**: Firestore `/posts` — `{ title, excerpt, content (Markdown), publishedAt, tags[], coverImageUrl, draft (boolean) }`
- **Rendering**: `react-markdown` package (npm install react-markdown)
- **Admin**: Markdown editor in admin (use `@uiw/react-md-editor`)
- **Public**: Cards linking to `/blog/{slug}` — needs react-router route

### 7.4 GitHub Stats Widget
- Embed live GitHub stats
- **Tech**: GitHub REST API (public, no auth for basic data) or SVG from github-readme-stats
- **Data**: Public repo count, most used languages, contribution graph
- **Placement**: Sub-section in About or standalone "Open Source" section

### 7.5 Interactive Terminal Easter Egg
- Hidden terminal activates on keystroke (e.g. press `~` key in hero)
- Fake terminal UI, visitor types commands:
  ```
  hemanth --skills       → shows skill list
  hemanth --experience   → shows work history
  hemanth --contact      → shows contact info
  hemanth --help         → shows available commands
  ```

---

## 8. Deployment Guide

### Netlify (Current Method)
```
Build command:     cd resume-react && npm run build
Publish directory: resume-react/dist
Node version:      18+ (set in Netlify)
```

**Ensure `netlify.toml` at repo root contains:**
```toml
[build]
  base    = "resume-react"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from   = "/*"
  to     = "/index.html"
  status = 200
```
The redirect rule is critical for SPA — without it, direct navigation to `/admin` returns 404.

### Local Dev Commands
```bash
cd "Coding & Staff/online resume/MyResume/resume-react"
npm install              # first time or after pulling
npm run dev              # dev server at :5173
npm run build            # prod build + TypeScript check (no errors = ready to deploy)
npm run preview          # serve prod build locally
```

---

## 9. Environment Variables Reference

| Variable | Required In | Source |
|---|---|---|
| `VITE_FIREBASE_API_KEY` | Phase 2+ | Firebase Console → Project Settings → Web App |
| `VITE_FIREBASE_AUTH_DOMAIN` | Phase 2+ | Same |
| `VITE_FIREBASE_PROJECT_ID` | Phase 2+ | Same |
| `VITE_FIREBASE_STORAGE_BUCKET` | Phase 2+ | Same |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Phase 2+ | Same |
| `VITE_FIREBASE_APP_ID` | Phase 2+ | Same |

**Note on `VITE_` prefix**: These values are bundled into client JS and are visible in browser.
This is normal and expected — Firebase security is enforced through Firestore/Storage Rules,
not through key secrecy. All `VITE_FIREBASE_*` values are safe to use client-side.

Add to **Netlify**: Site Settings → Environment Variables → add each key.

---

## 10. Owner Info & Data Reference

Source of truth for all hardcoded portfolio data.

### Personal
```
Name:       Hemanth Nagesh E
DOB:        2000-09-06  (Sep 6, 2000)
Location:   Bangalore, Karnataka, India — 560001
Email:      hemanthnagesh082@gmail.com
Phone:      +91 9980 14 4503
```

### Critical Dates (used in dateUtils.ts)
```
DOB:              2000-09-06   → calculateAge()
Internship start: 2023-03-01   → calculateTotalExperience() (BOTSIO Chatbot LLP)
Internship end:   2023-05-31   → 3 months total at BOTSIO
TCS start:        2023-12-01   → calculateTCSTenure() — "Present" (no end date)
```

### Social Links
```
GitHub:    https://github.com/hemanth-nagesh
LinkedIn:  https://www.linkedin.com/in/e-hemanth-nagesh-1b12731b7
Twitter/X: https://x.com/Nageshehemanth
Instagram: https://www.instagram.com/__hemanth__beast_/
```

### Certifications
```
Azure AI Engineer Associate (AI-102)
  Issuer: Microsoft
  Date: 2024
  Type: certification
```

### Publications
```
"AI-Powered Information Retrieval Systems"
  Publisher: Peer-reviewed academic journal
  Date: 2023
  Topics: Semantic search, RAG techniques, accessible AI interface design
  Type: publication
```

### Contact Form
Uses **web3forms**. Access key: `9c7a9d4a-b9b7-4aa3-b323-309e13bc997b`
Found in `Contact.tsx` → `handleSubmit` → fetch to `https://api.web3forms.com/submit`.
**DO NOT change or remove this integration.** In Phase 2, Firestore saving is added on top.

### Project Categories (used in filter bar)
```
"Agentic"       → Multi-agent, LangGraph, A2A coordination
"RAG"           → Document intelligence, vector retrieval, knowledge bases
"Accessibility" → WCAG, AI for disability, Gemini vision
"LLM Platform"  → Fine-tuning, evaluation, LLMOps infrastructure
```

### Resume PDF Location
```
Public asset: /public/assets/E_Hemanth_Nagesh_2023.pdf
About.tsx href: '/assets/E_Hemanth_Nagesh_2023.pdf'
Phase 2: replaced by Firebase Storage URL via useResumeUrl() hook
```

---

*End of Master Plan*

*Agent instruction: Read this document fully before implementing any phase.
Check Phase 1 "COMPLETE" section for current state. Begin Phase 2 with section 6.1.
All data constants in Section 10 are the source of truth for seeding Firestore.*
