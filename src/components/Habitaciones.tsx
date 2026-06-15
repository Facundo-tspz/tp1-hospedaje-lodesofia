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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {habitaciones.map((hab) => (
              <CardHabitacion key={hab.id} habitacion={hab} />
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {habitaciones.map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === 0 ? 'bg-[#D9831A]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default Habitaciones
