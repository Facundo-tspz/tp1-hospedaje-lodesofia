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
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-farley text-center mb-12" style={{ color: '#034659' }}>
        Conoce Nuestras Habitaciones
      </h2>

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
    </section>
  )
}

export default Habitaciones
