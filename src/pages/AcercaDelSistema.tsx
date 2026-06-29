import { IoCodeSlash, IoServer, IoGlobe, IoLibrary, IoRocket, IoSchool, IoPerson } from 'react-icons/io5'
import SEO from '../components/SEO'

const AcercaDelSistema = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <SEO
        title="Acerca del sistema"
        description="Información técnica del sitio web de Lo de Sofía Hospedaje. Tecnologías utilizadas y datos del desarrollador."
        url="/acerca-del-sistema"
      />
      <h1 className="text-4xl font-farley mb-10 text-center" style={{ color: '#034659' }}>
        Acerca del sistema
      </h1>

      <div className="bg-white rounded-3xl shadow-md p-8 md:p-10 space-y-8">
        <p className="font-fonseca text-lg text-gray-700 leading-relaxed">
          Este sitio web fue desarrollado como trabajo práctico integrador para la materia
          Desarrollo Web II, con el objetivo de aplicar los conocimientos adquiridos en
          tecnologías modernas de desarrollo frontend y backend, creando una solución
          completa y funcional para un comercio real.
        </p>

        <div className="border-t border-gray-100 pt-6">
          <h2 className="font-farley text-2xl mb-6 flex items-center gap-3" style={{ color: '#034659' }}>
            <IoCodeSlash className="text-[#D9831A]" />
            Tecnologías utilizadas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: IoRocket, label: 'React 19', desc: 'Biblioteca de UI con TypeScript' },
              { icon: IoLibrary, label: 'Vite', desc: 'Build tool rápida para el frontend' },
              { icon: IoGlobe, label: 'React Router DOM 6', desc: 'Enrutamiento SPA del lado del cliente' },
              { icon: IoCodeSlash, label: 'Tailwind CSS 4', desc: 'Framework de estilos utilitarios' },
              { icon: IoServer, label: 'Supabase', desc: 'Base de datos PostgreSQL y Storage' },
            ].map((tech, i) => {
              const Icon = tech.icon
              return (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                  <span className="shrink-0 text-xl mt-0.5 text-[#D9831A]">
                    <Icon />
                  </span>
                  <div>
                    <p className="font-farley text-base" style={{ color: '#034659' }}>
                      {tech.label}
                    </p>
                    <p className="font-fonseca text-sm text-gray-500">{tech.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h2 className="font-farley text-2xl mb-6 flex items-center gap-3" style={{ color: '#034659' }}>
            <IoPerson className="text-[#D9831A]" />
            Desarrollador
          </h2>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-32 h-32 rounded-2xl bg-gray-100 flex items-center justify-center shrink-0">
              <IoPerson className="text-5xl text-gray-300" />
            </div>
            <div className="space-y-2">
              <p className="font-farley text-xl" style={{ color: '#034659' }}>
                Facundo Paez
              </p>
              <p className="font-fonseca text-gray-600">
                Estudiante de 3er año de la <strong>Tecnicatura Superior en Desarrollo de Software</strong>
              </p>
              <p className="font-fonseca text-gray-500 flex items-center gap-2">
                <IoSchool className="text-[#D9831A]" />
                Instituto de Estudios Superiores de Tinogasta (IEST)
              </p>
              <p className="font-fonseca text-gray-500">
                Desarrollo Web II — Prof. Barrionuevo A. Camila
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AcercaDelSistema
