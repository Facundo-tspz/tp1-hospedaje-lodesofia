import { useState } from 'react'

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

interface Props {
  habitacion: Habitacion
}

const CardHabitacion = ({ habitacion }: Props) => {
  const [modalOpen, setModalOpen] = useState(false)
  const precioTotal = 15000 * habitacion.capacidad

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className="bg-white rounded-2xl shadow-md overflow-hidden min-w-[300px] md:min-w-0 flex-1 cursor-pointer hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative">
          <img
            src={habitacion.imagen_url || '/placeholder.webp'}
            alt={habitacion.nombre}
            className="w-full h-48 object-cover"
          />
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${
              habitacion.disponible
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {habitacion.disponible ? 'Disponible' : 'Ocupada'}
          </span>
        </div>

        <div className="p-5 space-y-3">
          <h3 className="font-farley text-xl" style={{ color: '#034659' }}>
            {habitacion.nombre}
          </h3>

          <p className="font-fonseca text-sm text-gray-600 leading-relaxed line-clamp-2">
            {habitacion.descripcion}
          </p>

          <div className="flex flex-wrap gap-2">
            {habitacion.servicios?.map((servicio) => (
              <span
                key={servicio}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md"
              >
                {servicio}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <p className="font-fonseca text-sm text-gray-500">
              Hasta {habitacion.capacidad} {habitacion.capacidad === 1 ? 'persona' : 'personas'}
            </p>
            <p className="font-farley text-lg" style={{ color: '#D9831A' }}>
              ${precioTotal.toLocaleString('es-AR')}/noche
            </p>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl cursor-default"
          >
            <div className="relative">
              <img
                src={habitacion.imagen_url || '/placeholder.webp'}
                alt={habitacion.nombre}
                className="w-full h-64 md:h-80 object-cover rounded-t-3xl"
              />
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-600 hover:text-red-500 transition text-xl"
              >
                ✕
              </button>
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
              <h2 className="text-3xl font-farley" style={{ color: '#034659' }}>
                {habitacion.nombre}
              </h2>

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

              <button
                className="w-full py-3 rounded-xl font-farley text-lg text-white transition-all duration-300 hover:brightness-110"
                style={{ backgroundColor: '#D9831A' }}
              >
                Reservar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CardHabitacion
