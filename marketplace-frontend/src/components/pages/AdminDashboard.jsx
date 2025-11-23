export default function AdminDashboard() {
  return (
    // Padding adaptable: p-4 (móvil) a md:p-12 (escritorio), centrado.
    <div className="p-4 sm:p-8 md:p-12 mx-auto text-center">
      <h1 className="text-4xl font-extrabold my-8 text-white">
        Bienvenido al panel de administración.
      </h1>
      <p className="text-xl text-gray-400">
        Usa la barra de navegación superior para gestionar usuarios, juegos, categorías y revisar pedidos.
      </p>
    </div>
  );
}
