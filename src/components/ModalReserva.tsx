import { useState } from 'react'
import { supabase } from '../supabase/client'

interface Habitacion {
  id: string
  nombre: string
  capacidad: number
  precio: number
}

interface Props {
  habitacion: Habitacion
  onClose: () => void
  onSuccess: () => void
}

const ModalReserva = ({ habitacion, onClose, onSuccess }: Props) => {
  const [form, setForm] = useState({
    nombre: '',
    dni: '',
    telefono: '',
    cantidad_huespedes: 1,
    fecha_llegada: '',
  })
  const [enviando, setEnviando] = useState(false)
  const [exito, setExito] = useState(false)

  const excedeCapacidad = form.cantidad_huespedes > habitacion.capacidad || form.cantidad_huespedes < 1

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (excedeCapacidad) return
    setEnviando(true)

    const { error } = await supabase.from('reservas').insert({
      nombre: form.nombre,
      dni: form.dni,
      telefono: form.telefono,
      habitacion_id: habitacion.id,
      cantidad_huespedes: form.cantidad_huespedes,
      fecha_llegada: form.fecha_llegada || null,
      estado: 'pendiente',
    })

    setEnviando(false)

    if (error) {
      alert('Error al enviar la reserva. Intente de nuevo.')
      return
    }

    setExito(true)
    setTimeout(() => {
      onSuccess()
      onClose()
    }, 2000)
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-farley text-xl" style={{ color: '#034659' }}>
              Reservar
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-500 transition flex items-center justify-center text-lg"
            >
              ✕
            </button>
          </div>

          {exito ? (
            <div className="text-center py-8">
              <p className="font-fonseca text-lg text-green-600 mb-2">Reserva enviada con éxito</p>
              <p className="font-fonseca text-sm text-gray-500">Gracias por tu reserva</p>
            </div>
          ) : (
            <>
              <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-1">
                <p className="font-farley text-base" style={{ color: '#034659' }}>
                  {habitacion.nombre}
                </p>
                <p className="font-fonseca text-sm text-gray-500">
                  Capacidad: hasta {habitacion.capacidad} {habitacion.capacidad === 1 ? 'persona' : 'personas'}
                </p>
                <p className="font-farley text-base" style={{ color: '#D9831A' }}>
                  ${(15000 * habitacion.capacidad).toLocaleString('es-AR')}/noche
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="font-fonseca text-sm text-gray-600">Nombre completo</label>
                  <input
                    type="text"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-fonseca focus:outline-none focus:ring-2 focus:ring-[#D9831A]/50"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-fonseca text-sm text-gray-600">DNI</label>
                  <input
                    type="text"
                    value={form.dni}
                    onChange={(e) => setForm({ ...form, dni: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-fonseca focus:outline-none focus:ring-2 focus:ring-[#D9831A]/50"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-fonseca text-sm text-gray-600">Teléfono</label>
                  <input
                    type="tel"
                    value={form.telefono}
                    onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-fonseca focus:outline-none focus:ring-2 focus:ring-[#D9831A]/50"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-fonseca text-sm text-gray-600">Cantidad de huéspedes</label>
                  <input
                    type="number"
                    value={form.cantidad_huespedes || ''}
                    onChange={(e) => {
                      const val = e.target.value
                      setForm({ ...form, cantidad_huespedes: val === '' ? 0 : parseInt(val) || 0 })
                    }}
                    className={`w-full px-4 py-2.5 border rounded-lg font-fonseca focus:outline-none focus:ring-2 focus:ring-[#D9831A]/50 ${
                      excedeCapacidad ? 'border-red-400 bg-red-50' : 'border-gray-300'
                    }`}
                    required
                  />
                  {excedeCapacidad && (
                    <p className="font-fonseca text-xs text-red-500 mt-1">
                      {form.cantidad_huespedes < 1
                        ? 'Debe haber al menos 1 huésped'
                        : `Supera la capacidad máxima de ${habitacion.capacidad} ${habitacion.capacidad === 1 ? 'persona' : 'personas'}`
                      }
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="font-fonseca text-sm text-gray-600">Fecha de llegada</label>
                  <input
                    type="date"
                    value={form.fecha_llegada}
                    onChange={(e) => setForm({ ...form, fecha_llegada: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-fonseca focus:outline-none focus:ring-2 focus:ring-[#D9831A]/50"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={enviando || excedeCapacidad}
                  className="w-full py-3 rounded-xl font-farley text-lg text-white transition-all duration-300 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#D9831A' }}
                >
                  {enviando ? 'Enviando...' : 'Enviar reserva'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModalReserva
