const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-farley text-lg mb-2">Lo de Sofía</h3>
          <p className="font-fonseca text-sm text-gray-400">
            Hospedaje en Tinogasta, Catamarca
          </p>
        </div>
        <div>
          <h4 className="font-fonseca text-sm uppercase tracking-wide mb-2">Contacto</h4>
          <p className="text-sm text-gray-400">Teléfono: (pendiente)</p>
          <p className="text-sm text-gray-400">Email: (pendiente)</p>
          <p className="text-sm text-gray-400">Ubicación: Tinogasta, Catamarca</p>
        </div>
        <div>
          <h4 className="font-fonseca text-sm uppercase tracking-wide mb-2">Sobre nosotros</h4>
          <p className="text-sm text-gray-400">
            Un espacio cálido en la Ruta del Adobe para descansar y desconectar.
          </p>
        </div>
      </div>
      <div className="text-center text-xs text-gray-600 mt-6 border-t border-gray-800 pt-4">
        &copy; {new Date().getFullYear()} Lo de Sofía Hospedaje
      </div>
    </footer>
  )
}

export default Footer
