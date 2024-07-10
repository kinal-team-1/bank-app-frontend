import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useMutationWithToast } from "../../hooks/use-mutation-with-toast";
import { useAuthService } from "../../../services/auth";
import { putUser } from "../../actions/PUT/put-user";
import { useLocaleService } from "../../../services/locale";

export function UserMenu() {
  const { locale } = useLocaleService();
  const { user } = useAuthService();
  const [formData, setFormData] = useState({
    username: user.username,
    job_name: user.job_name,
    address: user.address,
    monthly_income: user.monthly_income,
  });

  const mutation = useMutationWithToast(putUser, {
    invalidateQueries: ["users"],
    onSuccess: () => {
      toast.success("Usuario actualizado correctamente");
     
    onError: (error) => {
      toast.error(`Error al actualizar usuario: ${error.message}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ user: formData, locale, userId: user._id });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!mutation.isSuccess && !mutation.isError) return;

    setTimeout(() => {
      mutation.reset();
    }, 3000);
  }, [mutation.isSuccess, mutation.isError]);

  return (
    <div className="flex justify-center items-center h-full p-3">
      <div className="w-full h-full rounded border-1-white flex flex-wrap">
        <div className="w-full md:w-1/3 flex flex-wrap">
          <div className="md:w-60 md:h-60 w-28 h-28 border-2 rounded-full m-5 flex items-center justify-center text-4xl md:text-8xl">
            {user.name.charAt(0)}
            {user.last_name.charAt(0)}
          </div>
          <div className="md:w-full">
            <button
              type="button"
              className="w-full border p-1"
              onClick={handleSubmit}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
        <div className="w-full h-full md:w-2/3 p-7">
          <h1 className="font-bold md:text-5xl text-3xl flex gap-3">
            {user.name} {user.last_name}
          </h1>
          <h4 className="italic md:text-lg text-primary-500 text-md p-1">
            {user.email}
          </h4>
          <h4 className="md:text-md text-xs p-1">DPI: {user.DPI}</h4>
          <h4 className="md:text-md text-xs p-1">cell: {user.phone_number}</h4>
          <form className="pt-5">
            <div className="mb-10">
              <label htmlFor="username" className="text-lg">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full bg-vulcan-950 rounded-xl border h-8 mt-1 mb-1 p-6"
              />
            </div>
            <div className="mb-10">
              <label htmlFor="job_name" className="text-lg">
                Job Name:
              </label>
              <input
                type="text"
                id="job_name"
                name="job_name"
                value={formData.job_name}
                onChange={handleInputChange}
                className="w-full bg-vulcan-950 rounded-xl border h-8 mt-1 mb-1 p-6"
              />
            </div>
            <div className="mb-10">
              <label htmlFor="address" className="text-lg">
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full bg-vulcan-950 rounded-xl border h-8 mt-1 mb-1 p-6"
              />
            </div>
            <div className="mb-10">
              <label htmlFor="monthly_income" className="text-lg">
                Monthly Income:
              </label>
              <input
                type="text"
                id="monthly_income"
                name="monthly_income"
                value={formData.monthly_income}
                onChange={handleInputChange}
                className="w-full bg-vulcan-950 rounded-xl border h-8 mt-1 mb-1 p-6"
              />
            </div>
          </form>
          {mutation.isSuccess && (
            <p className="text-green-500">Usuario actualizado correctamente</p>
          )}
          {mutation.isError && (
            <p className="text-red-500">Error al actualizar usuario</p>
          )}
        </div>
      </div>
    </div>
  );
}
