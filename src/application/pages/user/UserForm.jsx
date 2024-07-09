import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useMutationWithToast } from "../../hooks/use-mutation-with-toast";
import { postUser } from "../../actions/POST/post-user";
import { useLocaleService } from "../../../services/locale";

export function UserForm() {
  const { locale } = useLocaleService();
  const [form, setForm] = useState({
    email: "",
    username: "",
    name: "",
  });

  const mutation = useMutationWithToast(postUser, {
    invalidateQueries: ["users"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mutation.isIdle) return;

    await mutation.mutateAsync({ user: form, locale });
    setForm({ email: "", username: "", name: "" });
  };

  return (
    <div className="flex flex-col gap-10 py-5 px-5 h-full overflow-y-scroll">
      <h1 className="text-5xl w-full text-center">User Form</h1>
      <div className="flex justify-center">
        <form
          className="grid grid-cols-6 gap-4 w-full lg:w-[600px] items-start"
          onSubmit={handleSubmit}
        >
          <label className="col-span-full md:col-span-2 md:text-end text-silver-500 pt-2">
            Email
          </label>
          <div className="col-span-full md:col-span-4">
            <input
              autoFocus
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
            />
          </div>

          <label className="col-span-full md:col-span-2 md:text-end text-silver-500 pt-2">
            Username
          </label>
          <div className="col-span-full md:col-span-4">
            <input
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              type="text"
              className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
            />
          </div>

          <label className="col-span-full md:col-span-2 md:text-end text-silver-500 pt-2">
            Name
          </label>
          <div className="col-span-full md:col-span-4">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              type="text"
              className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
            />
          </div>

          <button
            type="submit"
            className={`${
              mutation.isIdle ? "bg-primary-400" : "bg-primary-300"
            } outline-none focus:outline-offset-2 focus:outline-primary-400 px-4 py-2 text-center col-span-full md:col-start-3 md:col-span-4 rounded text-white hover:bg-primary-300 flex gap-2 justify-center`}
          >
            {mutation.isIdle && "Submit"}
            {mutation.isPending && (
              <>
                <span className="animate-spin">Submitting ...</span>
                <span className="animate-spin size-[25px] border-4  border-b-neutral-900 border-t-slate-300 rounded-full" />
              </>
            )}
            {mutation.isSuccess && (
              <>
                <span>Success</span>
                <FontAwesomeIcon icon={faCheck} />
              </>
            )}
            {mutation.isError && <span>Oops! There was an error</span>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
