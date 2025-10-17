import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { fetchData } from '../../utils/api';
import GameCard from '../common/GameCard'; // Reutilizamos el GameCard para la wishlist

const AjustesTab = ({ initialData }) => {
  const { logout } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "", // Inicia vacío por seguridad
  });
  const [feedback, setFeedback] = useState({ message: '', type: '' }); // Para notificaciones

  // Carga los datos iniciales en el formulario cuando el componente se monta
  useEffect(() => {
    if (initialData) {
      setForm(prevForm => ({ ...prevForm, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setFeedback({ message: '', type: '' });
    try {
      // No enviamos la contraseña si el campo está vacío
      const dataToUpdate = { ...form };
      if (!dataToUpdate.password) {
        delete dataToUpdate.password;
      }

      await fetchData("/api/v1/users/me", {
        method: "PUT",
        body: JSON.stringify(dataToUpdate),
      });

      setFeedback({ message: 'Perfil actualizado con éxito. Se cerrará la sesión para aplicar los cambios.', type: 'success' });
      setTimeout(() => logout(), 3000); // Cierra sesión después de 3 segundos
    } catch (err) {
      setFeedback({ message: err.message || 'Error al actualizar el perfil.', type: 'error' });
    }
  };

  return (
    <form onSubmit={handleUpdate} className="p-4 space-y-8">
      {feedback.message && (
        <div className={`p-4 rounded-lg text-center ${feedback.type === 'success' ? 'bg-lime-green/20 text-lime-green' : 'bg-red-500/20 text-red-400'}`}>
          {feedback.message}
        </div>
      )}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Información de la Cuenta</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400" htmlFor="email">Correo Electrónico</label>
            <input className="mt-1 block w-full bg-zinc-800 border-zinc-700 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm text-white" id="email" name="email" type="email" value={form.email} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400" htmlFor="firstName">Nombre</label>
              <input className="mt-1 block w-full bg-zinc-800 border-zinc-700 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm text-white" id="firstName" name="firstName" type="text" value={form.firstName} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400" htmlFor="lastName">Apellido</label>
              <input className="mt-1 block w-full bg-zinc-800 border-zinc-700 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm text-white" id="lastName" name="lastName" type="text" value={form.lastName} onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Cambiar Contraseña</h3>
        <div>
          <label className="block text-sm font-medium text-gray-400" htmlFor="password">Nueva Contraseña (dejar en blanco para no cambiar)</label>
          <input className="mt-1 block w-full bg-zinc-800 border-zinc-700 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm text-white" id="password" name="password" type="password" onChange={handleChange} />
        </div>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="bg-primary text-black font-bold py-2 px-6 rounded-lg hover:brightness-110 transition-all">Guardar Cambios</button>
      </div>
    </form>
  );
};


export default function Profile() {
  const { wishlist, loading: contextLoading } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('biblioteca');
  
  const [profileData, setProfileData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    fetchData("/api/v1/users/me")
      .then((data) => setProfileData(data))
      .catch(() => console.error("Error al cargar datos del usuario"))
      .finally(() => setLoadingProfile(false));
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-32 h-32 shrink-0" style={{ backgroundImage: `url(${profileData?.avatar || 'https://via.placeholder.com/128'})` }}></div>
        <div className="flex flex-col justify-center text-center sm:text-left">
          <p className="text-white text-2xl font-bold">{profileData?.firstName || 'Username'}</p>
          <p className="text-[#b7cb90] text-base">En una aventura épica.</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 py-6">
        <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#566831] p-3 items-start">
          <p className="text-white tracking-light text-2xl font-bold">...</p>
          <p className="text-[#b7cb90] text-sm">Juegos en la Biblioteca</p>
        </div>
        <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#566831] p-3 items-start">
          <p className="text-white tracking-light text-2xl font-bold">{wishlist?.length || 0}</p>
          <p className="text-[#b7cb90] text-sm">Juegos Deseados</p>
        </div>
      </div>
      
      <div className="border-b border-[#566831]">
        <nav className="flex gap-8">
          <button onClick={() => setActiveTab('biblioteca')} className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${activeTab === 'biblioteca' ? 'border-b-primary text-white' : 'border-b-transparent text-[#b7cb90]'}`}>
            <p className="text-sm font-bold">Biblioteca</p>
          </button>
          <button onClick={() => setActiveTab('deseados')} className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${activeTab === 'deseados' ? 'border-b-primary text-white' : 'border-b-transparent text-[#b7cb90]'}`}>
            <p className="text-sm font-bold">Lista de Deseados</p>
          </button>
          <button onClick={() => setActiveTab('ajustes')} className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${activeTab === 'ajustes' ? 'border-b-primary text-white' : 'border-b-transparent text-[#b7cb90]'}`}>
            <p className="text-sm font-bold">Ajustes</p>
          </button>
        </nav>
      </div>

      <div className="py-6">
        {activeTab === 'biblioteca' && 
            <p className="text-gray-400">Tu biblioteca de juegos aparecerá aquí próximamente.</p>}

        {activeTab === 'deseados' && (
          contextLoading ? <p>Cargando lista...</p> : 
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
            {wishlist.map(game => <GameCard key={game.id} game={game} />)}
          </div>
        )}

        {activeTab === 'ajustes' && 
            (loadingProfile ? <p>Cargando formulario...</p> : <AjustesTab initialData={profileData} />)}
      </div>
    </div>
  );
}
