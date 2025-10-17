import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#182634] text-[#90adcb] py-8 px-10 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-bold text-white">Uade Games</h3>
          <p className="text-sm">© 2024 Uade Games. Todos los derechos reservados.</p>
        </div>
        <div className="flex gap-8">
          <Link className="hover:text-white transition-colors" to="/about">Sobre nosotros</Link>
          <Link className="hover:text-white transition-colors" to="/contact">Contacto</Link>
          <Link className="hover:text-white transition-colors" to="/faq">FAQ</Link>
        </div>
      </div>
    </footer>
  );
}
