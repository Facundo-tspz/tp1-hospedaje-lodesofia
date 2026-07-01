import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'
import CardHabitacion from './CardHabitacion'

interface Habitacion {
  id: string
  nombre: string
  descripcion: string
  servicios: string[]
  precio: number
  capacidad: number
  imagen_url: string
  disponible: boolean
}

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
    <div className="h-36 md:h-40 bg-gray-200" />
    <div className="p-4 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="flex gap-2 pt-2 border-t border-gray-100">
        <div className="h-4 bg-gray-200 rounded w-20" />
        <div className="h-4 bg-gray-200 rounded w-24" />
      </div>
    </div>
  </div>
)

const Habitaciones = () => {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const visibleCount = 3
  const maxIndex = Math.max(0, habitaciones.length - visibleCount)
  const isCarousel = habitaciones.length > visibleCount

  useEffect(() => {
    const fetchHabitaciones = async () => {
      const { data } = await supabase
        .from('habitaciones')
        .select('*')
        .order('created_at', { ascending: true })
      if (data) setHabitaciones(data)
      setLoading(false)
    }
    fetchHabitaciones()
  }, [])

  useEffect(() => {
    if (!isCarousel || paused) return
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [isCarousel, maxIndex, paused])

  const prev = () => {
    setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1))
  }

  const next = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-farley text-center mb-12" style={{ color: '#034659' }}>
        Conoce Nuestras Habitaciones
      </h2>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : habitaciones.length === 0 ? (
        <p className="text-center font-fonseca text-gray-500">
          No hay habitaciones disponibles por el momento.
        </p>
      ) : (
        <>
          {/* Mobile: static stacked list */}
          <div className="grid grid-cols-1 gap-6 md:hidden">
            {habitaciones.map((hab) => (
              <CardHabitacion key={hab.id} habitacion={hab} />
            ))}
          </div>

          {/* Desktop */}
          <div className="hidden md:block">
            {isCarousel ? (
              <div
                className="relative"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
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

                <div className="overflow-hidden rounded-2xl">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
                  >
                    {habitaciones.map((hab) => (
                      <div key={hab.id} className="flex-none w-1/3 px-2">
                        <CardHabitacion habitacion={hab} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center gap-2 mt-6">
                  {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === currentIndex
                          ? 'bg-[#D9831A] w-6'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {habitaciones.map((hab) => (
                  <CardHabitacion key={hab.id} habitacion={hab} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  )
}

export default Habitaciones
