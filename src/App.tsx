import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Inicio from './pages/Inicio'
import Admin from './pages/Admin'
import SobreNosotros from './pages/SobreNosotros'
import PreguntasFrecuentes from './pages/PreguntasFrecuentes'
import AcercaDelSistema from './pages/AcercaDelSistema'
import GaleriaPage from './pages/GaleriaPage'
import HabitacionDetalle from './pages/HabitacionDetalle'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
          <Route path="/acerca-del-sistema" element={<AcercaDelSistema />} />
          <Route path="/galeria" element={<GaleriaPage />} />
          <Route path="/habitacion/:id" element={<HabitacionDetalle />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
