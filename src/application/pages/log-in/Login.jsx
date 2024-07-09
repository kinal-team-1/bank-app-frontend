import { useEffect, useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import { useMutationWithToast } from "../../hooks/use-mutation-with-toast";
import { login } from "../../actions/POST/login";
import { useAuthService } from "../../../services/auth";

export function Login() {
  const { locale } = useParams();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useAuthService();
  const navigate = useNavigate();

  const mutation = useMutationWithToast(login, {
    invalidateQueries: ["user"],
  });

  useEffect(() => {
    if (!mutation.isSuccess && !mutation.isError) return;

    // wait 3 seconds before being able to submit again
    setTimeout(() => {
      mutation.reset();
    }, 3000);
  }, [mutation.isSuccess, mutation.isError]);

  useEffect(() => {
    if (mutation.isSuccess) {
      const [user, _, __, token] = mutation.data;
      setUser(user);
      localStorage.setItem("token", token);
      navigate(`/${locale}`);
    }
  }, [mutation.isSuccess]);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!mutation.isIdle) return;

    mutation.mutate({ user: form, locale });
  };

  return (
    <div className="dark:bg-vulcan-950 h-dvh flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="px-5 py-10 flex flex-col justify-between h-full w-full lg:w-[600px] dark:text-silver-400"
      >
        <div className="grid grid-cols-6 w-full items-start gap-4 md:gap-8">
          <div className="col-span-full md:col-start-2 md:col-span-5 flex justify-center">
            <img src="/logo-2.svg" alt="Logo Bankito" className="w-[150px]" />
            <img
              src="/letters-dark.svg"
              alt="Logo Bankito"
              className="w-[150px]"
            />
          </div>
          <label className="col-span-full md:col-span-1 md:text-end text-silver-500 pt-2">
            Email:
          </label>
          <div className="col-span-full md:col-span-5">
            <input
              className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <label className="col-span-full md:col-span-1 md:text-end text-silver-500 pt-2">
            Password:
          </label>
          <div className="col-span-full md:col-span-5">
            <input
              className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </div>
        <div className="grid grid-cols-6 w-full">
          <button
            className="bg-primary-400 outline-none focus:outline-offset-2 focus:outline-primary-400 px-4 py-2 text-center col-span-full md:col-start-2 md:col-span-5 rounded text-white hover:bg-primary-300 flex gap-2 justify-center"
            type="submit"
          >
            {mutation.isIdle && "Log in"}
            {mutation.isPending && (
              <>
                <span className="">Submitting ...</span>
                <span className="animate-spin size-[25px] border-4  border-b-neutral-900 border-t-slate-300 rounded-full" />
              </>
            )}
            {mutation.isSuccess && (
              <>
                <span>Success</span>
                <FontAwesomeIcon icon={faCheck} />
              </>
            )}
            {mutation.isError && (
              <span className="text-red-500">Ups! algo mal ha sucedido</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
