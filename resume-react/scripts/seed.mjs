import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Parse .env file
const envPath = resolve(__dirname, '..', '.env')
const envContent = readFileSync(envPath, 'utf-8')
const parsedEnv = {}
for (const line of envContent.split('\n')) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const eqIdx = trimmed.indexOf('=')
  if (eqIdx === -1) continue
  const key = trimmed.slice(0, eqIdx).trim()
  const value = trimmed.slice(eqIdx + 1).trim()
  parsedEnv[key] = value
}

const firebaseConfig = {
  apiKey: parsedEnv.VITE_FIREBASE_API_KEY,
  authDomain: parsedEnv.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: parsedEnv.VITE_FIREBASE_PROJECT_ID,
  storageBucket: parsedEnv.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: parsedEnv.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: parsedEnv.VITE_FIREBASE_APP_ID,
}

const adminEmail = parsedEnv.SEED_ADMIN_EMAIL
const adminPassword = parsedEnv.SEED_ADMIN_PASSWORD

if (!adminEmail || !adminPassword || adminEmail === 'your_admin_email@example.com') {
  console.error('❌ Add SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD to your .env file first.')
  process.exit(1)
}

const { initializeApp } = await import('firebase/app')
const { getFirestore, collection, addDoc, setDoc, doc, Timestamp } = await import('firebase/firestore')
const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth')

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

console.log('Authenticating...')
try {
  await signInWithEmailAndPassword(auth, adminEmail, adminPassword)
  console.log('Authenticated ✓')
} catch (err) {
  console.error('❌ Auth failed:', err.message)
  process.exit(1)
}

console.log('Seeding projects...')
const projects = [
  {
    title: 'Multi-Agentic AI System',
    description: 'Architected autonomous multi-agent system using LangChain and LangGraph for travel and retail automation. Implemented A2A coordination workflows, STM/LTM memory with PostgreSQL vector search, Mem0-based user profiling, and Deep Research Agent for real-time web data retrieval.',
    thumbnailUrl: '/assets/project_id1.png',
    technologies: ['LangChain', 'LangGraph', 'PostgreSQL', 'Vector DB', 'Mem0', 'Python'],
    github: 'https://github.com/hemanth-nagesh',
    demo: '',
    category: 'Agentic',
    featured: true,
    order: 0,
  },
  {
    title: 'DocuBot — Agentic RAG System',
    description: 'Built AI-powered document intelligence system using LLMs and Agentic RAG for intelligent Q&A across PDF, DOCX, and TXT files. Implemented multi-vector database retrieval with dynamic query routing, prompt engineering, and contextual templates for enterprise knowledge extraction.',
    thumbnailUrl: '/assets/project_id2.png',
    technologies: ['LLM', 'RAG', 'Vector DB', 'LangChain', 'NLP', 'Python'],
    github: 'https://github.com/hemanth-nagesh',
    demo: '',
    category: 'RAG',
    featured: false,
    order: 1,
  },
  {
    title: 'Web Accessibility AI Solution',
    description: 'Led a project utilizing Google Gemini AI to convert inaccessible images on websites into accessible formats, significantly improving web accessibility for visually impaired users. Demonstrated strong problem-solving skills and applied AI for social good.',
    thumbnailUrl: '/assets/project_id3.png',
    technologies: ['Google Gemini', 'Computer Vision', 'AI/ML', 'Python', 'WCAG'],
    github: 'https://github.com/hemanth-nagesh',
    demo: '',
    category: 'Accessibility',
    featured: false,
    order: 2,
  },
  {
    title: 'DocuBot Intelligent Chatbot',
    description: 'Designed an interactive chatbot enabling admins to upload relevant documents for customer interaction. Leveraged OpenAI for natural language understanding and built a user-friendly interface using Streamlit with backend semantic retrieval.',
    thumbnailUrl: '/assets/project_id4.png',
    technologies: ['OpenAI API', 'Streamlit', 'Python', 'NLP', 'RAG'],
    github: 'https://github.com/hemanth-nagesh',
    demo: '',
    category: 'RAG',
    featured: false,
    order: 3,
  },
  {
    title: 'LLM Fine-tuning Platform',
    description: 'Experienced in fine-tuning large language models for specific domain use cases, leveraging RNI containers for GPU-accelerated training and optimization. Successfully delivered domain-specific AI solutions with improved accuracy.',
    thumbnailUrl: '/assets/project_id5.png',
    technologies: ['PyTorch', 'Transformers', 'GPU Computing', 'NLP', 'Python'],
    github: 'https://github.com/hemanth-nagesh',
    demo: '',
    category: 'LLM Platform',
    featured: false,
    order: 4,
  },
]
for (const p of projects) {
  await addDoc(collection(db, 'projects'), p)
}
console.log('Projects seeded ✓')

console.log('Seeding skills...')
const skills = [
  { name: 'LangChain & LangGraph', value: 95, icon: '🧠', category: 'AI / LLM', order: 0 },
  { name: 'RAG Architectures', value: 92, icon: '🔍', category: 'AI / LLM', order: 1 },
  { name: 'OpenAI APIs', value: 90, icon: '⚡', category: 'AI / LLM', order: 2 },
  { name: 'Prompt Engineering', value: 90, icon: '✨', category: 'AI / LLM', order: 3 },
  { name: 'LLM Evaluation & LLMOps', value: 85, icon: '📊', category: 'AI / LLM', order: 4 },
  { name: 'Vector DBs & Embeddings', value: 88, icon: '🗃️', category: 'AI / LLM', order: 5 },
  { name: 'Semantic Search', value: 87, icon: '🔎', category: 'AI / LLM', order: 6 },
  { name: 'Python', value: 95, icon: '🐍', category: 'Backend', order: 7 },
  { name: 'Django & REST APIs', value: 82, icon: '🌐', category: 'Backend', order: 8 },
  { name: 'Microservices', value: 85, icon: '🔧', category: 'Backend', order: 9 },
  { name: 'PostgreSQL', value: 80, icon: '🐘', category: 'Backend', order: 10 },
  { name: 'Docker', value: 85, icon: '🐳', category: 'Backend', order: 11 },
  { name: 'Azure AI Foundry', value: 88, icon: '☁️', category: 'Cloud & DevOps', order: 12 },
  { name: 'AWS Bedrock', value: 80, icon: '🌩️', category: 'Cloud & DevOps', order: 13 },
  { name: 'GCP Vertex AI', value: 75, icon: '🔴', category: 'Cloud & DevOps', order: 14 },
  { name: 'Kubernetes & CI/CD', value: 82, icon: '⚙️', category: 'Cloud & DevOps', order: 15 },
  { name: 'React.js', value: 75, icon: '⚛️', category: 'Frontend', order: 16 },
  { name: 'Accessible UI (WCAG)', value: 80, icon: '♿', category: 'Frontend', order: 17 },
]
for (const s of skills) {
  await addDoc(collection(db, 'skills'), s)
}
console.log('Skills seeded ✓')

console.log('Seeding experience...')
const experience = [
  {
    title: 'Software Engineer – Generative AI & Agentic Systems',
    company: 'Tata Consultancy Services (TCS)',
    startDate: Timestamp.fromDate(new Date('2023-12-01')),
    endDate: null,
    description: [
      'Designed and deployed a production-grade multi-agent LLM backend using LangGraph and LangChain, reducing system execution time by 70% through parallel tool-calling, fault-tolerant retry logic, and circuit breakers across distributed microservices.',
      'Built a vector-indexed agent routing registry that eliminated 30% of workflow faults by replacing hardcoded dispatch logic with semantic capability matching — directly improving service quality in a globally distributed Agile team.',
      'Engineered a CI/CD-triggered RAG ingestion pipeline integrating document chunking, embedding generation, and vector database indexing — automating document processing with zero manual intervention.',
      'Collaborated with TCS Accessibility Research Team to develop and ship a WCAG-compliant voice agent, applying prompt engineering and NLP techniques to create accessible AI interfaces for users with disabilities.',
      'Implemented a Human-in-the-Loop (HITL) checkpoint system and an autonomous browser automation agent, both shipped through structured code review cycles and quality gates aligned with responsible AI and security best practices.',
    ],
    order: 0,
  },
  {
    title: 'Software Engineer Intern – LLM Applications',
    company: 'BOTSIO Chatbot LLP',
    startDate: Timestamp.fromDate(new Date('2023-03-01')),
    endDate: Timestamp.fromDate(new Date('2023-05-31')),
    description: [
      'Implemented backend semantic retrieval pipelines — embedding generation, vector indexing, and similarity search — to ground production chatbot responses in verified knowledge sources.',
      'Debugged and resolved latency and correctness issues in deployed AI microservices integrated with PostgreSQL; contributed prompt engineering improvements adopted across subsequent model releases.',
    ],
    order: 1,
  },
]
for (const exp of experience) {
  await addDoc(collection(db, 'experience'), exp)
}
console.log('Experience seeded ✓')

console.log('Seeding education...')
const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'PES College of Engineering, Mandya',
    startYear: 2021,
    endYear: 2023,
    description: 'Graduated with a strong foundation in advanced computing, software development, and AI. Focused on machine learning, data science, and distributed systems.',
    order: 0,
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Ramaiah Institute of Business Studies, Bangalore',
    startYear: 2018,
    endYear: 2021,
    description: 'Built a solid foundation in computer science fundamentals, programming, and software engineering principles. Developed strong analytical and problem-solving skills.',
    order: 1,
  },
]
for (const edu of education) {
  await addDoc(collection(db, 'education'), edu)
}
console.log('Education seeded ✓')

console.log('Seeding certifications...')
const certs = [
  {
    title: 'Microsoft Azure AI Engineer Associate',
    subtitle: 'AI-102 Certification',
    issuer: 'Microsoft',
    date: 'Issued 2024',
    icon: '🏅',
    type: 'certification',
    link: '#',
    order: 0,
  },
  {
    title: 'AI-Powered Information Retrieval Systems',
    subtitle: 'Peer-reviewed research on semantic search, RAG techniques, and accessible AI interface design.',
    issuer: 'Academic Journal',
    date: 'Published 2023',
    icon: '📄',
    type: 'publication',
    link: '#',
    order: 1,
  },
]
for (const cert of certs) {
  await addDoc(collection(db, 'certifications'), cert)
}
console.log('Certifications seeded ✓')

console.log('Setting profile...')
await setDoc(doc(db, 'profile', 'main'), {
  name: 'Hemanth Nagesh E',
  title: 'Software Engineer – Generative AI & Backend Systems',
  bio: 'Proficient in Python, LangChain, LangGraph, RAG architectures, prompt engineering, and vector databases — with hands-on experience integrating OpenAI APIs, Azure AI Foundry, and AWS Bedrock. Azure AI Engineer Certified.',
  email: 'hemanthnagesh082@gmail.com',
  phone: '+91 9980 14 4503',
  location: 'Bangalore, India',
  photoUrl: '',
  socialLinks: {
    github: 'https://github.com/hemanth-nagesh',
    linkedin: 'https://www.linkedin.com/in/e-hemanth-nagesh-1b12731b7',
    twitter: 'https://x.com/Nageshehemanth',
    instagram: 'https://www.instagram.com/__hemanth__beast_/',
  },
})
console.log('Profile set ✓')

console.log('Setting resume config...')
await setDoc(doc(db, 'resumeConfig', 'main'), {
  pdfUrl: '',
})
console.log('Resume config set ✓')

console.log('\n✅ Seed complete! All data pushed to Firestore.')
