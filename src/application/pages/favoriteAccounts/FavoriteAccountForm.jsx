import { useState } from "react";
import { useLocaleService } from "../../../services/locale";

export function FavoriteAccountForm() {
  const { LL } = useLocaleService();
  const [formData, setFormData] = useState({
    account: "",
    owner: "",
    alias: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario a través de una llamada a la API
    console.log(formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">
        {LL?.FORMS?.FAVORITE_ACCOUNT?.TITLE?.()}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            htmlFor="account"
            className="block text-sm font-medium text-gray-700 md:w-1/4"
          >
            {LL?.FORMS?.FAVORITE_ACCOUNT?.OWNER?.()}
          </label>
          <input
            type="text"
            id="account"
            name="account"
            value={formData.account}
            onChange={handleChange}
            className="mt-1 md:mt-0 md:ml-4 block w-full md:flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            htmlFor="owner"
            className="block text-sm font-medium text-gray-700 md:w-1/4"
          >
            Propietario
          </label>
          <input
            type="text"
            id="owner"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className="mt-1 md:mt-0 md:ml-4 block w-full md:flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            htmlFor="alias"
            className="block text-sm font-medium text-gray-700 md:w-1/4"
          >
            Alias
          </label>
          <input
            type="text"
            id="alias"
            name="alias"
            value={formData.alias}
            onChange={handleChange}
            className="mt-1 md:mt-0 md:ml-4 block w-full md:flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-primary-400 rounded text-white hover:bg-primary-300"
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  );
}
