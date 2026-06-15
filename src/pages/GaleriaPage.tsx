import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'

interface GaleriaImagen {
  id: string
  imagen_url: string
  descripcion: string | null
}

const SkeletonImage = () => (
  <div className="rounded-2xl overflow-hidden shadow-md h-64 bg-gray-200 animate-pulse" />
)

const GaleriaPage = () => {
  const [imagenes, setImagenes] = useState<GaleriaImagen[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    const fetchImagenes = async () => {
      const { data } = await supabase
        .from('galeria')
        .select('*')
        .order('created_at', { ascending: true })
      if (data) setImagenes(data)
      setLoading(false)
    }
    fetchImagenes()
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-farley mb-8" style={{ color: '#034659' }}>
        Galería
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonImage key={i} />
          ))}
        </div>
      ) : imagenes.length === 0 ? (
        <p className="font-fonseca text-gray-500">No hay imágenes en la galería aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {imagenes.map((img) => (
            <button
              key={img.id}
              onClick={() => setSelected(img.imagen_url)}
              className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] focus:outline-none"
            >
              <img
                src={img.imagen_url}
                alt={img.descripcion || 'Galería'}
                className="w-full h-64 object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-pointer"
        >
          <img
            src={selected}
            alt="Imagen"
            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </section>
  )
}

export default GaleriaPage
