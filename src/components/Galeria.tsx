import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase/client'

interface GaleriaImagen {
  id: string
  imagen_url: string
  descripcion: string | null
}

const Galeria = () => {
  const [imagenes, setImagenes] = useState<GaleriaImagen[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchImagenes = async () => {
      const { data } = await supabase
        .from('galeria')
        .select('*')
        .order('created_at', { ascending: true })
      if (data) setImagenes(data)
      setLoading(false)
    }
    fetchImagenes()
  }, [])

  useEffect(() => {
    if (imagenes.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imagenes.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [imagenes.length])

  const goTo = (index: number) => setCurrentIndex(index)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length)
  const next = () => setCurrentIndex((prev) => (prev + 1) % imagenes.length)

  return (
    <section className="py-16" style={{ backgroundColor: '#DDC2A5' }}>
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-[60%]">
          {loading ? (
            <div className="bg-white/60 rounded-2xl h-72 md:h-96 animate-pulse flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gray-200" />
            </div>
          ) : imagenes.length === 0 ? (
            <div className="bg-white/60 rounded-2xl h-72 flex items-center justify-center">
              <p className="font-fonseca text-gray-600">Galería próximamente</p>
            </div>
          ) : (
            <div className="relative bg-white/60 rounded-2xl overflow-hidden">
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/85 shadow-md flex items-center justify-center text-[#034659] hover:bg-white hover:scale-105 transition-all"
                aria-label="Anterior"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/85 shadow-md flex items-center justify-center text-[#034659] hover:bg-white hover:scale-105 transition-all"
                aria-label="Siguiente"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="w-full h-72 md:h-96 overflow-hidden">
                <img
                  src={imagenes[currentIndex].imagen_url}
                  alt={imagenes[currentIndex].descripcion || 'Galería'}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
              </div>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {imagenes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === currentIndex
                        ? 'bg-[#D9831A] w-6'
                        : 'bg-white/70 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-full md:w-[40%] flex flex-col items-center md:items-start justify-center text-center md:text-left">
          <p className="font-fonseca text-lg text-gray-700 mb-6 max-w-xs leading-relaxed">
            Conocé nuestros espacios a través de las imágenes
          </p>
          <Link
            to="/galeria"
            className="inline-flex items-center gap-2 font-farley text-lg px-8 py-3 rounded-full transition-all duration-300 hover:brightness-110"
            style={{
              backgroundColor: '#8B4513',
              color: '#FFFFFF',
            }}
          >
            Ver Galería →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Galeria
