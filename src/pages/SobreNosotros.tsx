const SobreNosotros = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-farley mb-8" style={{ color: '#034659' }}>
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
            Lo de Sofía es un hospedaje familiar ubicado en el corazón de Tinogasta, Catamarca, a solo
            50 metros de la plaza principal. Nacimos con la idea de brindar una experiencia cálida, cómoda
            y accesible, para que cada huésped se sienta como en casa.
          </p>
          <p>
            Nos enorgullece ofrecer un espacio acogedor, con todas las comodidades necesarias para
            disfrutar y descansar, ya sea que vengas por turismo, trabajo o descanso. Nuestra ubicación
            privilegiada te permite recorrer los principales atractivos de Tinogasta a pie, desde la Ruta
            del Adobe hasta sus bodegas y paisajes naturales.
          </p>
        </div>
      </div>
    </section>
  )
}

export default SobreNosotros
