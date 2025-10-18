// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  // Obtenemos el año actual dinámicamente
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#182634] text-[#90adcb] py-8 px-10 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-bold text-white">Uade Games</h3>
          {/* Usamos la variable para el año */}
          <p className="text-sm">© {currentYear} Uade Games. Todos los derechos reservados.</p>
        </div>
        <div className="flex gap-8">
          {/* Cambiamos 'to' a '#' para que los links no hagan nada por ahora */}
          <Link className="hover:text-white transition-colors" to="#">Sobre nosotros</Link>
          <Link className="hover:text-white transition-colors" to="#">Contacto</Link>
          <Link className="hover:text-white transition-colors" to="#">FAQ</Link>
        </div>
      </div>
    </footer>
  );
}
