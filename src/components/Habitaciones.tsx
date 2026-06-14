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

const Habitaciones = () => {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)

  useEffect(() => {
    const fetchHabitaciones = async () => {
      const { data } = await supabase
        .from('habitaciones')
        .select('*')
        .order('created_at', { ascending: true })
      if (data) setHabitaciones(data)
    }
    fetchHabitaciones()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(window.innerWidth >= 768 ? 3 : 1)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, habitaciones.length - cardsPerView)

  useEffect(() => {
    if (habitaciones.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [habitaciones.length, maxIndex])

  if (habitaciones.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-farley text-center mb-12" style={{ color: '#034659' }}>
          Conoce Nuestras Habitaciones
        </h2>
        <p className="text-center font-fonseca text-gray-500">
          No hay habitaciones disponibles por el momento.
        </p>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-farley text-center mb-12" style={{ color: '#034659' }}>
        Conoce Nuestras Habitaciones
      </h2>

      <div className="relative">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
          disabled={currentIndex === 0}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center text-gray-600 hover:text-[#D9831A] hover:shadow-xl transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed text-2xl"
        >
          ❮
        </button>

        <button
          onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))}
          disabled={currentIndex >= maxIndex}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center text-gray-600 hover:text-[#D9831A] hover:shadow-xl transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed text-2xl"
        >
          ❯
        </button>

        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(calc(-${currentIndex * (100 / cardsPerView)}% - ${currentIndex * 24}px))`,
            }}
          >
            {habitaciones.map((hab) => (
              <div
                key={hab.id}
                className="min-w-[calc(100%-0px)] md:min-w-[calc(33.333%-16px)] shrink-0"
              >
                <CardHabitacion habitacion={hab} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {habitaciones.length > cardsPerView && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'bg-[#D9831A] scale-110'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Habitaciones
