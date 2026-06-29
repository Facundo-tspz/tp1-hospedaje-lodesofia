import { useState } from 'react'
import { IoTimeOutline, IoDocumentTextOutline, IoCardOutline, IoCarOutline, IoPawOutline, IoWifiOutline, IoLocationOutline, IoWaterOutline, IoRestaurantOutline, IoCameraOutline, IoCalendarOutline, IoPeopleOutline } from 'react-icons/io5'
import SEO from '../components/SEO'

const faqs = [
  {
    icon: IoTimeOutline,
    pregunta: '¿Cuál es el horario de check-in y check-out?',
    respuesta: 'El horario de ingreso es a partir de las 10:00 h y la salida debe realizarse antes de las 10:30 h del día siguiente. Si necesitás un horario especial, consultanos y haremos lo posible por acomodarnos.',
  },
  {
    icon: IoDocumentTextOutline,
    pregunta: '¿Cómo puedo hacer una reserva?',
    respuesta: 'Podés reservar directamente desde nuestra web. Ingresá a la habitación que te interese, completá el formulario con tus datos (nombre, DNI, teléfono, cantidad de huéspedes y fecha de llegada) y enviá la solicitud. El dueño recibirá tu reserva y la confirmará a la brevedad.',
  },
  {
    icon: IoCardOutline,
    pregunta: '¿Qué medios de pago aceptan?',
    respuesta: 'Aceptamos todos los medios de pago: efectivo, transferencia bancaria, Mercado Pago y tarjetas de crédito y débito. El pago se realiza en persona al momento de llegar al hospedaje.',
  },
  {
    icon: IoCarOutline,
    pregunta: '¿El hospedaje cuenta con estacionamiento?',
    respuesta: 'Sí, disponemos de una cochera cubierta incluida sin costo adicional en todas las reservas.',
  },
  {
    icon: IoPawOutline,
    pregunta: '¿Aceptan mascotas?',
    respuesta: 'Sí, aceptamos mascotas pequeñas y medianas. Te pedimos que nos informes al momento de reservar para coordinar los detalles.',
  },
  {
    icon: IoWifiOutline,
    pregunta: '¿Hay WiFi?',
    respuesta: 'Sí, contamos con WiFi gratuito de alta velocidad disponible en todas las instalaciones del hospedaje.',
  },
  {
    icon: IoLocationOutline,
    pregunta: '¿Dónde están ubicados?',
    respuesta: 'Estamos en Mariano Moreno 661, Tinogasta, Catamarca, a solo 50 metros de la plaza principal. Una ubicación céntrica y privilegiada para recorrer la ciudad a pie.',
  },
  {
    icon: IoWaterOutline,
    pregunta: '¿Las habitaciones tienen baño privado?',
    respuesta: 'Todas nuestras habitaciones disponen de baño privado completo, incluyendo ducha con agua caliente y amenities básicos.',
  },
  {
    icon: IoRestaurantOutline,
    pregunta: '¿Hay cocina o comedor compartido?',
    respuesta: 'Sí, ponemos a disposición de los huéspedes una cocina y desayunador compartido, completamente equipado para que puedas preparar tus comidas con comodidad.',
  },
  {
    icon: IoCameraOutline,
    pregunta: '¿Qué lugares turísticos están cerca?',
    respuesta: 'Tinogasta es conocida como la "Ruta del Adobe". Podés recorrer la plaza principal, las bodegas artesanales, la iglesia Nuestra Señora del Rosario, el Museo Arqueológico, y los paisajes naturales del valle preandino. Todo a poca distancia del hospedaje.',
  },
  {
    icon: IoCalendarOutline,
    pregunta: '¿Cuál es la política de cancelación?',
    respuesta: 'Aceptamos cancelaciones sin cargo hasta 48 h antes de la fecha de llegada. Pasado ese plazo, te pedimos que nos contactes directamente para evaluar cada caso.',
  },
  {
    icon: IoPeopleOutline,
    pregunta: '¿Hay límite de huéspedes por habitación?',
    respuesta: 'Cada habitación tiene una capacidad máxima indicada en su descripción. No se permiten exceder ese límite para garantizar la comodidad de todos los huéspedes.',
  },
]

const PreguntasFrecuentes = () => {
  const [abierto, setAbierto] = useState<number | null>(null)

  const toggle = (i: number) => setAbierto(abierto === i ? null : i)

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <SEO
        title="Preguntas frecuentes"
        description="Respondemos las dudas más comunes sobre Lo de Sofía Hospedaje en Tinogasta: horarios, reservas, pagos, estacionamiento y más."
        url="/preguntas-frecuentes"
      />
      <h1 className="text-4xl font-farley mb-10 text-center" style={{ color: '#034659' }}>
        Preguntas frecuentes
      </h1>

      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const Icon = faq.icon
          const estaAbierto = abierto === i

          return (
            <div key={i} className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center gap-4 p-5 text-left bg-white hover:bg-gray-50 transition"
              >
                <span className="shrink-0 text-xl" style={{ color: '#D9831A' }}>
                  <Icon />
                </span>
                <span className="font-farley text-lg flex-1" style={{ color: '#034659' }}>
                  {faq.pregunta}
                </span>
                <span
                  className={`shrink-0 text-gray-400 text-lg transition-transform duration-300 ${
                    estaAbierto ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  estaAbierto ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 pb-5 pt-0 bg-gray-50 font-fonseca text-gray-700 leading-relaxed">
                  {faq.respuesta}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default PreguntasFrecuentes
