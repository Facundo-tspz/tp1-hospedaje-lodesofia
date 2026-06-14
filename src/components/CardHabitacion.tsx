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
      className="block bg-white rounded-2xl shadow-md overflow-hidden min-w-[300px] md:min-w-0 flex-1 hover:shadow-xl transition-shadow duration-300"
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
    </Link>
  )
}

export default CardHabitacion
