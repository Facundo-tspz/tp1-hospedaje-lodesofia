import Hero from '../components/Hero'
import Habitaciones from '../components/Habitaciones'
import Galeria from '../components/Galeria'
import SEO from '../components/SEO'

const Inicio = () => {
  return (
    <>
      <SEO
        title="Inicio"
        description="Lo de Sofía Hospedaje en Tinogasta, Catamarca. Habitaciones cómodas y servicios de calidad en la Ruta del Adobe. Reserve su estadía."
        url="/"
      />
      <Hero />
      <Habitaciones />
      <Galeria />
    </>
  )
}

export default Inicio
