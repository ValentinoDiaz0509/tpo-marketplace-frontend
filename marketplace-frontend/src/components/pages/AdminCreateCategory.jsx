import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "../../redux/categorySlice";

const AdminCreateCategory = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryData = { name };
    dispatch(createCategory(categoryData));
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-[#222222] rounded-2xl shadow-lg mb-[3rem]">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Crear nueva categoría
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium mb-1">Nombre:</label>
          <input
            className="w-full border rounded-lg p-2"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#32CD32] text-white py-2 rounded-lg hover:bg-blue-700 transition mt-[20px]"
        >
          Crear categoría
        </button>
      </form>
    </div>
  );
};

export default AdminCreateCategory;
