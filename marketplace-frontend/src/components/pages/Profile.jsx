import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../../redux/profileSlice";

export default function Profile() {
    const dispatch = useDispatch();
    const { userData, loading } = useSelector((state) => state.profile);
    const [form, setForm] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
    });

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    useEffect(() => {
        if (userData) {
            setForm({
                email: userData.email || "",
                firstName: userData.firstName || "",
                lastName: userData.lastName || "",
                password: "", // Nunca cargar el password
            });
        }
    }, [userData]);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleUpdate = async (e) => {
        e.preventDefault();
        dispatch(updateUserProfile(form));
        setForm((prev) => ({ ...prev, password: "" }));
    };

    if (loading) {
        return <div className="text-center mt-8 text-white">Cargando perfil...</div>;
    }

    return (
        <div className="max-w-sm sm:max-w-lg mx-auto mt-8 p-6 bg-[#222222] rounded-2xl shadow-lg mb-8 text-white">
            <h3 className="text-3xl font-bold leading-tight text-center pb-2">
                Mi Perfil
            </h3>

            <form onSubmit={handleUpdate} className="space-y-4 pt-4">
                
                {/* Email (Solo lectura, ya que es la clave) */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 pb-2">
                        Correo Electrónico
                    </label>
                    <input
                        name="email"
                        className="w-full rounded-lg text-gray-400 bg-gray-700 h-12 p-3 cursor-not-allowed"
                        type="email"
                        value={form.email}
                        readOnly
                    />
                </div>
                
                {/* Nombre */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 pb-2">Nombre</label>
                    <input
                        name="firstName"
                        className="w-full rounded-lg text-black bg-white h-12 p-3"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                {/* Apellido */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 pb-2">Apellido</label>
                    <input
                        name="lastName"
                        className="w-full rounded-lg text-black bg-white h-12 p-3"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Contraseña (Para actualizar) */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 pb-2">Nueva Contraseña (Opcional)</label>
                    <input
                        name="password"
                        className="w-full rounded-lg text-black bg-white h-12 p-3"
                        placeholder="Solo si desea cambiarla"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                </div>
                
                <div className="w-full pt-6">
                    <button
                        type="submit"
                        className="flex w-full items-center justify-center rounded-lg h-12 px-5 bg-[#32CD32] text-[#121212] text-base font-bold transition-colors disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Guardando..." : "Guardar Cambios"}
                    </button>
                </div>
            </form>
        </div>
    );
}
