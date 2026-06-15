import { IoCall, IoMail, IoLocation } from 'react-icons/io5'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center">
              <img src="/icono.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-farley text-lg">Lo de Sofía</h3>
              <p className="font-fonseca text-xs text-gray-400">Hospedaje</p>
            </div>
          </div>
          <p className="font-fonseca text-sm text-gray-400">
            Tinogasta, Catamarca — Ruta del Adobe
          </p>
        </div>

        <div>
          <h4 className="font-fonseca text-sm uppercase tracking-wide mb-3">Contacto</h4>
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-sm text-gray-400">
              <IoCall className="text-[#D9831A] shrink-0" />
              +54 3837 456789
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-400">
              <IoMail className="text-[#D9831A] shrink-0" />
              lodesofia.hospedaje@gmail.com
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-400">
              <IoLocation className="text-[#D9831A] shrink-0" />
              Mariano Moreno 661, Tinogasta
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-fonseca text-sm uppercase tracking-wide mb-3">Sobre nosotros</h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            Un espacio cálido en el corazón de Tinogasta para descansar y desconectar.
            A pasos de la plaza principal y la Ruta del Adobe.
          </p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-600 mt-6 border-t border-gray-800 pt-4">
        &copy; {new Date().getFullYear()} Lo de Sofía Hospedaje — Todos los derechos reservados
      </div>
    </footer>
  )
}

export default Footer
