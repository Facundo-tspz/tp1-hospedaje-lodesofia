import { useState } from 'react'
import { supabase } from '../supabase/client'
import SEO from '../components/SEO'

interface FormData {
  nombre: string
  email: string
  telefono: string
  mensaje: string
}

const Contacto = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  })
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const { error: supabaseError } = await supabase.from('consultas').insert([
      {
        nombre: formData.nombre.trim(),
        email: formData.email.trim(),
        telefono: formData.telefono.trim(),
        mensaje: formData.mensaje.trim(),
      },
    ])

    if (supabaseError) {
      setError('Hubo un error al enviar el mensaje. Intentalo de nuevo.')
      return
    }

    setEnviado(true)
  }

  if (enviado) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">✉️</div>
          <h1 className="text-3xl font-farley mb-4" style={{ color: '#034659' }}>
            Mensaje enviado
          </h1>
          <p className="font-fonseca text-gray-600">
            Gracias por contactarnos, {formData.nombre}. Te responderemos a la brevedad.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <SEO
        title="Contacto"
        description="Comunicate con Lo de Sofía Hospedaje en Tinogasta. Teléfono, email, ubicación y formulario de contacto."
        url="/contacto"
      />
      <h1 className="text-4xl font-farley text-center mb-2" style={{ color: '#034659' }}>
        Contacto
      </h1>
      <p className="text-center font-fonseca text-gray-600 mb-12">
        Escribinos tu consulta y te responderemos a la brevedad
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-farley mb-6" style={{ color: '#034659' }}>
            Información de contacto
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-2xl" style={{ color: '#D9831A' }}>📍</span>
              <div>
                <p className="font-fonseca font-semibold" style={{ color: '#034659' }}>Ubicación</p>
                <p className="font-fonseca text-gray-600">Mariano Moreno 661, Tinogasta, Catamarca</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-2xl" style={{ color: '#D9831A' }}>📞</span>
              <div>
                <p className="font-fonseca font-semibold" style={{ color: '#034659' }}>Teléfono</p>
                <p className="font-fonseca text-gray-600">+54 3837 456789</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-2xl" style={{ color: '#D9831A' }}>✉️</span>
              <div>
                <p className="font-fonseca font-semibold" style={{ color: '#034659' }}>Email</p>
                <p className="font-fonseca text-gray-600">lodesofia.hospedaje@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-2xl" style={{ color: '#D9831A' }}>🕐</span>
              <div>
                <p className="font-fonseca font-semibold" style={{ color: '#034659' }}>Horarios de atención</p>
                <p className="font-fonseca text-gray-600">Lunes a domingo, 8:00 a 22:00</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-fonseca text-sm font-semibold mb-1" style={{ color: '#034659' }}>
                Nombre completo
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 font-fonseca focus:outline-none focus:ring-2 focus:ring-[#D9831A]/50"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="block font-fonseca text-sm font-semibold mb-1" style={{ color: '#034659' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 font-fonseca focus:outline-none focus:ring-2 focus:ring-[#D9831A]/50"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block font-fonseca text-sm font-semibold mb-1" style={{ color: '#034659' }}>
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 font-fonseca focus:outline-none focus:ring-2 focus:ring-[#D9831A]/50"
                placeholder="+54 3837 123456"
              />
            </div>

            <div>
              <label className="block font-fonseca text-sm font-semibold mb-1" style={{ color: '#034659' }}>
                Mensaje
              </label>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 font-fonseca focus:outline-none focus:ring-2 focus:ring-[#D9831A]/50 resize-none"
                placeholder="Escribí tu consulta aquí..."
              />
            </div>

            {error && (
              <p className="font-fonseca text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg border border-red-200">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full font-fonseca font-semibold text-white py-3 rounded-lg transition hover:opacity-90"
              style={{ backgroundColor: '#D9831A' }}
            >
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contacto
