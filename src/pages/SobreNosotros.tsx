import { IoHome, IoMap, IoHeart } from 'react-icons/io5'
import SEO from '../components/SEO'

const SobreNosotros = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <SEO
        title="Sobre nosotros"
        description="Conocé más sobre Lo de Sofía Hospedaje en Tinogasta, Catamarca. Un espacio cómodo y acogedor en la Ruta del Adobe."
        url="/sobre-nosotros"
      />
      <h1 className="text-4xl font-farley mb-8 text-center" style={{ color: '#034659' }}>
        Sobre nosotros
      </h1>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="shrink-0">
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl shadow-lg hover:shadow-2xl hover:brightness-110 transition-all duration-300 overflow-hidden bg-white p-4 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Lo de Sofía"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="font-fonseca text-lg text-gray-700 leading-relaxed text-justify space-y-6">
          <p>
            <span className="inline-flex items-center gap-2 text-[#D9831A] font-semibold">
              <IoHome /> Lo de Sofía
            </span>{' '}
            es un hospedaje familiar ubicado en el corazón de Tinogasta, Catamarca, a solo
            50 metros de la plaza principal. Nacimos con la idea de brindar una experiencia cálida, cómoda
            y accesible, para que cada huésped se sienta como en casa.
          </p>
          <p>
            <span className="inline-flex items-center gap-2 text-[#D9831A] font-semibold">
              <IoMap /> Ubicación privilegiada
            </span>{' '}
            Nos enorgullece ofrecer un espacio acogedor, con todas las comodidades necesarias para
            disfrutar y descansar, ya sea que vengas por turismo, trabajo o descanso. Nuestra ubicación
            privilegiada te permite recorrer los principales atractivos de Tinogasta a pie, desde la Ruta
            del Adobe hasta sus bodegas y paisajes naturales.
          </p>
          <p>
            <span className="inline-flex items-center gap-2 text-[#D9831A] font-semibold">
              <IoHeart /> Te esperamos
            </span>{' '}
            En Lo de Sofía cada detalle está pensado para que tu estadía sea inolvidable.
            Te recibimos con los brazos abiertos para que vivas una experiencia única en la
            Ruta del Adobe.
          </p>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row items-center gap-4 justify-center">
        <div className="w-12 h-12 rounded-lg bg-white shadow-sm border border-gray-200 p-1.5 flex items-center justify-center">
          <img src="/logo-alterno.png" alt="Logo alterno" className="w-full h-full object-contain" />
        </div>
        <p className="font-farley text-lg text-center sm:text-left" style={{ color: '#034659' }}>
          Lo de Sofía Hospedaje — Tinogasta, Catamarca
        </p>
      </div>
    </section>
  )
}

export default SobreNosotros
