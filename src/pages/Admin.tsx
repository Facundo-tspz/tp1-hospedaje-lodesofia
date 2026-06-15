import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase/client'

type Tab = 'habitaciones' | 'galeria' | 'reservas'

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

interface GaleriaImagen {
  id: string
  imagen_url: string
  descripcion: string | null
}

interface Reserva {
  id: string
  nombre: string
  dni: string
  telefono: string
  habitacion_id: string
  cantidad_huespedes: number
  fecha_llegada: string
  estado: string
  motivo_cancelacion?: string
}

const Admin = () => {
  const [autenticado, setAutenticado] = useState(false)
  const [codigo, setCodigo] = useState('')
  const [error, setError] = useState('')
  const [tab, setTab] = useState<Tab>('habitaciones')

  useEffect(() => {
    const almacenado = sessionStorage.getItem('admin_autenticado')
    if (almacenado === 'true') setAutenticado(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const { data } = await supabase
      .from('config')
      .select('valor')
      .eq('clave', 'admin_code')
      .single()

    if (data && data.valor === codigo) {
      sessionStorage.setItem('admin_autenticado', 'true')
      setAutenticado(true)
    } else {
      setError('Código incorrecto')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_autenticado')
    window.location.href = '/'
  }

  if (!autenticado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-6"
        >
          <h1 className="text-2xl font-farley text-center" style={{ color: '#034659' }}>
            Acceso Administrador
          </h1>

          <div className="space-y-2">
            <label className="font-fonseca text-sm text-gray-600">Código de acceso</label>
            <input
              type="password"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg font-fonseca focus:outline-none focus:ring-2 focus:ring-[#D9831A]/50"
              placeholder="Ingrese el código"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-fonseca text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-farley text-white transition hover:brightness-110"
            style={{ backgroundColor: '#D9831A' }}
          >
            Ingresar
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-farley" style={{ color: '#034659' }}>
            Panel Administrador
          </h1>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="font-fonseca text-sm text-gray-500 hover:text-[#D9831A] transition"
            >
              Volver al inicio
            </Link>
            <button
              onClick={handleLogout}
              className="font-fonseca text-sm text-gray-500 hover:text-red-500 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8 border-b border-gray-200 pb-4">
          {(['habitaciones', 'galeria', 'reservas'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-fonseca text-sm uppercase tracking-wide px-4 py-2 rounded-lg transition ${
                tab === t
                  ? 'bg-[#D9831A] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t === 'habitaciones' ? 'Habitaciones' : t === 'galeria' ? 'Galería' : 'Reservas'}
            </button>
          ))}
        </div>

        {tab === 'habitaciones' && <AdminHabitaciones />}
        {tab === 'galeria' && <AdminGaleria />}
        {tab === 'reservas' && <AdminReservas />}
      </div>
    </div>
  )
}

const AdminHabitaciones = () => {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([])
  const [editando, setEditando] = useState<Habitacion | null>(null)
  const [mostrarForm, setMostrarForm] = useState(false)

  const serviciosDisponibles = [
    'WiFi',
    'TV',
    'Calefacción',
    'A/A',
    'A/A F&C',
    'Baño Priv.',
    'Amenities',
  ]

  const serviciosPorDefecto = ['WiFi', 'Baño Priv.', 'Amenities']
  const [archivo, setArchivo] = useState<File | null>(null)

  useEffect(() => {
    cargarHabitaciones()
  }, [])

  const cargarHabitaciones = async () => {
    const { data } = await supabase
      .from('habitaciones')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setHabitaciones(data)
  }

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    servicios: serviciosPorDefecto as string[],
    precio: '',
    capacidad: '',
    disponible: true,
  })

  const resetForm = () => {
    setForm({ nombre: '', descripcion: '', servicios: serviciosPorDefecto as string[], precio: '', capacidad: '', disponible: true })
    setArchivo(null)
    setEditando(null)
    setMostrarForm(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let imagen_url = editando?.imagen_url || ''

    if (archivo) {
      const fileName = `${Date.now()}-${archivo.name}`
      const { error: uploadError } = await supabase.storage
        .from('imagenes')
        .upload(`habitaciones/${fileName}`, archivo)

      if (!uploadError) {
        const { data: publicData } = supabase.storage
          .from('imagenes')
          .getPublicUrl(`habitaciones/${fileName}`)
        imagen_url = publicData.publicUrl
      }
    }

    const data = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      servicios: form.servicios,
      precio: parseFloat(form.precio),
      capacidad: parseInt(form.capacidad),
      disponible: form.disponible,
      imagen_url,
    }

    if (editando) {
      await supabase.from('habitaciones').update(data).eq('id', editando.id)
    } else {
      await supabase.from('habitaciones').insert(data)
    }

    resetForm()
    cargarHabitaciones()
  }

  const handleEditar = (hab: Habitacion) => {
    setEditando(hab)
    setForm({
      nombre: hab.nombre,
      descripcion: hab.descripcion,
      servicios: hab.servicios || [],
      precio: hab.precio.toString(),
      capacidad: hab.capacidad.toString(),
      disponible: hab.disponible,
    })
    setMostrarForm(true)
  }

  const handleEliminar = async (id: string) => {
    if (!confirm('¿Eliminar esta habitación?')) return
    await supabase.from('habitaciones').delete().eq('id', id)
    cargarHabitaciones()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-farley" style={{ color: '#034659' }}>
          Habitaciones
        </h2>
        <button
          onClick={() => { resetForm(); setMostrarForm(true) }}
          className="px-4 py-2 rounded-lg font-fonseca text-sm text-white bg-[#D9831A] hover:brightness-110 transition"
        >
          + Nueva habitación
        </button>
      </div>

      {mostrarForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md p-6 mb-8 space-y-4 relative"
        >
          <button
            type="button"
            onClick={resetForm}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-500 transition flex items-center justify-center text-lg"
          >
            ✕
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-fonseca text-sm text-gray-600">Nombre</label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-fonseca focus:outline-none focus:ring-2 focus:ring-[#D9831A]/50"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-fonseca text-sm text-gray-600">Precio por noche ($)</label>
              <input
                type="number"
                value={form.precio}
                onChange={(e) => setForm({ ...form, precio: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-fonseca focus:outline-none focus:ring-2 focus:ring-[#D9831A]/50"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-fonseca text-sm text-gray-600">Capacidad (personas)</label>
              <input
                type="number"
                value={form.capacidad}
                onChange={(e) => setForm({ ...form, capacidad: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-fonseca focus:outline-none focus:ring-2 focus:ring-[#D9831A]/50"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="font-fonseca text-sm text-gray-600">Servicios</label>
              <div className="flex flex-wrap gap-2">
                {serviciosDisponibles.map((s) => {
                  const seleccionado = form.servicios.includes(s)
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          servicios: seleccionado
                            ? form.servicios.filter((item) => item !== s)
                            : [...form.servicios, s],
                        })
                      }
                      className={`px-4 py-1.5 rounded-full text-sm font-fonseca border transition ${
                        seleccionado
                          ? 'bg-[#D9831A] text-white border-[#D9831A]'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-[#D9831A]'
                      }`}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="font-fonseca text-sm text-gray-600">Descripción</label>
              <textarea
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-fonseca focus:outline-none focus:ring-2 focus:ring-[#D9831A]/50"
                rows={3}
              />
            </div>

            <DashedUploadButton
              label="Imagen de la habitación"
              onFileSelect={(file) => setArchivo(file)}
              fileName={archivo?.name}
            />

            <div className="space-y-2 flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.disponible}
                  onChange={(e) => setForm({ ...form, disponible: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="font-fonseca text-sm text-gray-600">Disponible</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg font-fonseca text-sm text-white bg-green-600 hover:bg-green-700 transition"
            >
              {editando ? 'Guardar cambios' : 'Crear habitación'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 rounded-lg font-fonseca text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habitaciones.map((hab) => (
          <div key={hab.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
            {hab.imagen_url && (
              <img src={hab.imagen_url} alt={hab.nombre} className="w-full h-40 object-cover" />
            )}
            <div className="p-4 space-y-3">
              <h3 className="font-farley text-lg" style={{ color: '#034659' }}>
                {hab.nombre}
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    hab.disponible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {hab.disponible ? 'Disponible' : 'Ocupada'}
                </span>
                <span className="text-xs text-gray-500">
                  {hab.capacidad} pers. · ${hab.precio}/noche
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditar(hab)}
                  className="text-xs px-3 py-1 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(hab.id)}
                  className="text-xs px-3 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const AdminGaleria = () => {
  const [imagenes, setImagenes] = useState<GaleriaImagen[]>([])
  const [archivo, setArchivo] = useState<File | null>(null)
  const [descripcion, setDescripcion] = useState('')

  useEffect(() => {
    cargarGaleria()
  }, [])

  const cargarGaleria = async () => {
    const { data } = await supabase
      .from('galeria')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setImagenes(data)
  }

  const handleSubir = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!archivo) return

    const fileName = `${Date.now()}-${archivo.name}`
    const { error: uploadError } = await supabase.storage
      .from('imagenes')
      .upload(`galeria/${fileName}`, archivo)

    if (uploadError) {
      alert('Error al subir la imagen')
      return
    }

    const { data: publicData } = supabase.storage
      .from('imagenes')
      .getPublicUrl(`galeria/${fileName}`)

    await supabase.from('galeria').insert({
      imagen_url: publicData.publicUrl,
      descripcion: descripcion || null,
    })

    setArchivo(null)
    setDescripcion('')
    cargarGaleria()
  }

  const handleEliminar = async (id: string) => {
    if (!confirm('¿Eliminar esta imagen?')) return
    await supabase.from('galeria').delete().eq('id', id)
    cargarGaleria()
  }

  return (
    <div>
      <h2 className="text-2xl font-farley mb-6" style={{ color: '#034659' }}>
        Galería
      </h2>

      <form onSubmit={handleSubir} className="bg-white rounded-2xl shadow-md p-6 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DashedUploadButton
            label="Imagen para la galería"
            onFileSelect={(file) => setArchivo(file)}
            fileName={archivo?.name}
          />
          <div className="space-y-2">
            <label className="font-fonseca text-sm text-gray-600">Descripción (opcional)</label>
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg font-fonseca focus:outline-none focus:ring-2 focus:ring-[#D9831A]/50"
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg font-fonseca text-sm text-white bg-[#D9831A] hover:brightness-110 transition"
        >
          Subir imagen
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {imagenes.map((img) => (
          <div key={img.id} className="relative group rounded-xl overflow-hidden shadow-md">
            <img src={img.imagen_url} alt={img.descripcion || ''} className="w-full h-40 object-cover" />
            <button
              onClick={() => handleEliminar(img.id)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

const AdminReservas = () => {
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [filtro, setFiltro] = useState<string>('pendiente')
  const [habitaciones, setHabitaciones] = useState<Record<string, string>>({})

  useEffect(() => {
    cargarHabitaciones()
    cargarReservas()
  }, [])

  useEffect(() => {
    cargarReservas()
  }, [filtro])

  const cargarHabitaciones = async () => {
    const { data } = await supabase.from('habitaciones').select('id, nombre')
    if (data) {
      const mapa: Record<string, string> = {}
      data.forEach((h) => { mapa[h.id] = h.nombre })
      setHabitaciones(mapa)
    }
  }

  const cargarReservas = async () => {
    const query = supabase
      .from('reservas')
      .select('*')
      .order('created_at', { ascending: false })

    if (filtro !== 'todas') {
      query.eq('estado', filtro === 'ocupadas' ? 'confirmada' : filtro)
    }

    const { data } = await query
    if (data) setReservas(data)
  }

  const cambiarEstado = async (id: string, estado: string, habitacion_id?: string) => {
    if (estado === 'confirmada' && habitacion_id) {
      await supabase.from('habitaciones').update({ disponible: false }).eq('id', habitacion_id)
    }
    await supabase.from('reservas').update({ estado }).eq('id', id)
    cargarReservas()
  }

  const handleCancelar = async (id: string) => {
    const motivo = prompt('Motivo de cancelación:')
    if (!motivo || !motivo.trim()) return
    await supabase.from('reservas').update({ estado: 'rechazada', motivo_cancelacion: motivo.trim() }).eq('id', id)
    cargarReservas()
  }

  const handleEliminarReserva = async (id: string) => {
    if (!confirm('¿Eliminar esta reserva permanentemente?')) return
    const { error } = await supabase.from('reservas').delete().eq('id', id)
    if (error) {
      alert('Error al eliminar: ' + error.message)
      console.error(error)
      return
    }
    cargarReservas()
  }

  const handleMarcarDisponible = async (id: string, habitacion_id: string) => {
    await supabase.from('habitaciones').update({ disponible: true }).eq('id', habitacion_id)
    await supabase.from('reservas').update({ estado: 'rechazada', motivo_cancelacion: 'Estadía finalizada' }).eq('id', id)
    cargarReservas()
  }

  return (
    <div>
      <h2 className="text-2xl font-farley mb-6" style={{ color: '#034659' }}>
        Reservas
      </h2>

      <div className="flex gap-2 mb-6">
        {['pendiente', 'confirmada', 'ocupadas', 'rechazada', 'todas'].map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`font-fonseca text-xs px-3 py-1.5 rounded-full transition ${
              filtro === f
                ? 'bg-[#034659] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f === 'pendiente' ? 'Pendientes' : f === 'ocupadas' ? 'Ocupadas' : f === 'todas' ? 'Todas' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {reservas.map((res) => (
          <div key={res.id} className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="font-farley text-lg" style={{ color: '#034659' }}>
                  {res.nombre}
                </p>
                <p className="font-fonseca text-sm text-gray-600">
                  {habitaciones[res.habitacion_id] || 'Habitación'} · {res.cantidad_huespedes} {res.cantidad_huespedes === 1 ? 'huésped' : 'huéspedes'}
                </p>
                <p className="font-fonseca text-sm text-gray-500">
                  DNI: {res.dni} · Tel: {res.telefono}
                </p>
                <p className="font-fonseca text-sm text-gray-500">
                  Llegada: {res.fecha_llegada ? new Date(res.fecha_llegada).toLocaleDateString('es-AR') : 'Sin fecha'}
                </p>
                {res.estado === 'rechazada' && res.motivo_cancelacion && (
                  <p className="font-fonseca text-xs text-red-400 italic mt-1">
                    Motivo: {res.motivo_cancelacion}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    res.estado === 'pendiente'
                      ? 'bg-yellow-100 text-yellow-700'
                      : res.estado === 'confirmada'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {res.estado}
                </span>

                {res.estado === 'pendiente' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => cambiarEstado(res.id, 'confirmada', res.habitacion_id)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => cambiarEstado(res.id, 'rechazada')}
                      className="text-xs px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Rechazar
                    </button>
                  </div>
                )}

                {res.estado === 'confirmada' && filtro !== 'ocupadas' && (
                  <button
                    onClick={() => handleCancelar(res.id)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Cancelar
                  </button>
                )}

                {res.estado === 'confirmada' && filtro === 'ocupadas' && (
                  <button
                    onClick={() => handleMarcarDisponible(res.id, res.habitacion_id)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                  >
                    Marcar disponible
                  </button>
                )}

                {res.estado === 'rechazada' && (
                  <button
                    onClick={() => handleEliminarReserva(res.id)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {reservas.length === 0 && (
          <p className="font-fonseca text-gray-500 text-center py-8">
            No hay reservas {filtro !== 'todas' ? filtro : ''}.
          </p>
        )}
      </div>
    </div>
  )
}

const DashedUploadButton = ({
  label,
  onFileSelect,
  fileName,
}: {
  label: string
  onFileSelect: (file: File) => void
  fileName?: string
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="space-y-2">
      <label className="font-fonseca text-sm text-gray-600">{label}</label>
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#D9831A] hover:bg-orange-50 transition"
      >
        {fileName ? (
          <p className="font-fonseca text-sm text-gray-600">{fileName}</p>
        ) : (
          <>
            <span className="text-3xl text-gray-400">+</span>
            <p className="font-fonseca text-xs text-gray-400">Haga clic para seleccionar</p>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFileSelect(file)
        }}
        className="hidden"
      />
    </div>
  )
}

export default Admin
