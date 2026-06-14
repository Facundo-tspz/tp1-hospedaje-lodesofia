import { useState } from 'react'
import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Sobre nosotros', path: '/sobre-nosotros' },
  { label: 'Preguntas frecuentes', path: '/preguntas-frecuentes' },
  { label: 'Acerca del sistema', path: '/acerca-del-sistema' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 bg-white shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/icono.png" alt="Logo" className="h-10 w-10" />
          <div className="leading-tight">
            <p className="text-xl font-farley" style={{ color: '#034659' }}>
              Lo de Sofía
            </p>
            <p className="text-xs tracking-widest uppercase" style={{ color: '#D9831A' }}>
              Hospedaje
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="font-fonseca text-sm uppercase tracking-wide hover:opacity-70 transition"
            style={{ color: '#034659' }}
          >
            Inicio
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1 p-2 hover:opacity-70 transition"
            aria-label="Menú"
          >
            <span className="block w-6 h-0.5 bg-gray-700 rounded" />
            <span className="block w-6 h-0.5 bg-gray-700 rounded" />
            <span className="block w-6 h-0.5 bg-gray-700 rounded" />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md border-t border-gray-100">
          <ul className="max-w-7xl mx-auto px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="block font-fonseca text-sm uppercase tracking-wide py-2 hover:opacity-70 transition"
                  style={{ color: '#034659' }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar
