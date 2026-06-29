import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabase/client'
import ModalReserva from '../components/ModalReserva'
import SEO from '../components/SEO'

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

const HabitacionDetalle = () => {
  const { id } = useParams<{ id: string }>()
  const [habitacion, setHabitacion] = useState<Habitacion | null>(null)
  const [loading, setLoading] = useState(true)
  const [mostrarModal, setMostrarModal] = useState(false)

  useEffect(() => {
    const fetchHabitacion = async () => {
      if (!id) return
      const { data } = await supabase
        .from('habitaciones')
        .select('*')
        .eq('id', id)
        .single()
      if (data) setHabitacion(data)
      setLoading(false)
    }
    fetchHabitacion()
  }, [id])

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-12 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-32 mb-6" />
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="h-72 md:h-96 bg-gray-200" />
          <div className="p-6 md:p-8 space-y-6">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 bg-gray-200 rounded-full w-20" />
              <div className="h-8 bg-gray-200 rounded-full w-24" />
              <div className="h-8 bg-gray-200 rounded-full w-16" />
            </div>
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <div className="space-y-1">
                <div className="h-4 bg-gray-200 rounded w-40" />
                <div className="h-3 bg-gray-200 rounded w-32" />
              </div>
              <div className="h-6 bg-gray-200 rounded w-28" />
            </div>
            <div className="h-12 bg-gray-200 rounded-xl w-full" />
          </div>
        </div>
      </section>
    )
  }

  if (!habitacion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-fonseca text-gray-500">Habitación no encontrada.</p>
      </div>
    )
  }

  const precioTotal = 15000 * habitacion.capacidad

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <SEO
        title={habitacion?.nombre || 'Habitación'}
        description={`${habitacion?.descripcion?.slice(0, 120) || 'Detalle de habitación'} — $${(15000 * (habitacion?.capacidad || 1)).toLocaleString()} por noche.`}
        image={habitacion?.imagen_url || undefined}
        url={`/habitacion/${habitacion?.id || ''}`}
      />
      <Link
        to="/"
        className="inline-flex items-center gap-2 font-fonseca text-sm text-gray-500 hover:text-[#D9831A] transition mb-6"
      >
        ❮ Volver al inicio
      </Link>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={habitacion.imagen_url || '/placeholder.webp'}
            alt={habitacion.nombre}
            className="w-full h-72 md:h-96 object-cover"
          />
          <span
            className={`absolute bottom-4 left-4 text-sm font-semibold px-4 py-1.5 rounded-full ${
              habitacion.disponible
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {habitacion.disponible ? 'Disponible' : 'Ocupada'}
          </span>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <h1 className="text-3xl md:text-4xl font-farley" style={{ color: '#034659' }}>
            {habitacion.nombre}
          </h1>

          <p className="font-fonseca text-base text-gray-700 leading-relaxed">
            {habitacion.descripcion}
          </p>

          <div className="flex flex-wrap gap-2">
            {habitacion.servicios?.map((servicio) => (
              <span
                key={servicio}
                className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg"
              >
                {servicio}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="font-fonseca text-gray-500">
              <p>Capacidad: hasta {habitacion.capacidad} {habitacion.capacidad === 1 ? 'persona' : 'personas'}</p>
              <p className="text-sm">$15,000 por persona / noche</p>
            </div>
            <p className="font-farley text-2xl" style={{ color: '#D9831A' }}>
              ${precioTotal.toLocaleString('es-AR')}/noche
            </p>
          </div>

          {habitacion.disponible ? (
            <button
              onClick={() => setMostrarModal(true)}
              className="w-full py-3 rounded-xl font-farley text-lg text-white transition-all duration-300 hover:brightness-110"
              style={{ backgroundColor: '#D9831A' }}
            >
              Reservar
            </button>
          ) : (
            <p className="w-full py-3 rounded-xl font-fonseca text-base text-gray-400 bg-gray-100 text-center">
              No disponible
            </p>
          )}
        </div>
      </div>

      {mostrarModal && (
        <ModalReserva
          habitacion={habitacion}
          onClose={() => setMostrarModal(false)}
          onSuccess={() => setMostrarModal(false)}
        />
      )}
    </section>
  )
}

export default HabitacionDetalle
