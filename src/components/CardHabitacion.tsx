import { Link } from 'react-router-dom'

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
  const precioTotal = 15000 * habitacion.capacidad

  return (
    <Link
      to={`/habitacion/${habitacion.id}`}
      className="block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full"
    >
      <div className="relative">
        <img
          src={habitacion.imagen_url || '/placeholder.webp'}
          alt={habitacion.nombre}
          className="w-full h-36 md:h-40 object-cover"
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

      <div className="p-4 space-y-2">
        <h3 className="font-farley text-lg" style={{ color: '#034659' }}>
          {habitacion.nombre}
        </h3>

        <p className="font-fonseca text-sm text-gray-600 leading-relaxed line-clamp-2">
          {habitacion.descripcion}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {habitacion.servicios?.slice(0, 4).map((servicio) => (
            <span
              key={servicio}
              className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md"
            >
              {servicio}
            </span>
          ))}
          {habitacion.servicios && habitacion.servicios.length > 4 && (
            <span className="text-[11px] text-gray-400">+{habitacion.servicios.length - 4}</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <p className="font-fonseca text-xs text-gray-500">
            {habitacion.capacidad} {habitacion.capacidad === 1 ? 'persona' : 'pers.'}
          </p>
          <p className="font-farley text-base" style={{ color: '#D9831A' }}>
            ${precioTotal.toLocaleString('es-AR')}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default CardHabitacion
