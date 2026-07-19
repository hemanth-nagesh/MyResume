import { Routes, Route } from 'react-router-dom'
import './styles/index.css'
import './admin/admin.css'
import PublicPortfolio from './components/PublicPortfolio'
import LoadingScreen from './components/LoadingScreen'
import ScrollProgress from './components/ScrollProgress'
import CursorGlow from './components/CursorGlow'
import AdminApp from './admin/AdminApp'

function App() {
  return (
    <>
      <LoadingScreen />
      <CursorGlow />
      <ScrollProgress />

      <Routes>
        <Route path="/*" element={<PublicPortfolio />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </>
  )
}

export default App
