import { useLocaleService } from "../../../services/locale";

export function UserMenu() {
  const { LL } = useLocaleService();

  return (
    <div className="flex justify-center items-center h-full p-3 ">
      <div className=" w-full h-full rounded border-1-white flex flex-wrap">
        <div className="bg-forest-green-600 w-full md:w-1/3 flex flex-wrap">
          <div className="md:w-60 md:h-60 w-28 h-28 border-2 rounded-full m-5 flex items-center justify-center text-4xl md:text-8xl">
            LC
          </div>
          <div className="bg-red-500 md:w-full ">
            <button type="button" className="w-full border p-1">
              Save changes
            </button>
          </div>
        </div>
        <div className=" w-full h-full md:w-2/3 p-7">
          <h1 className="font-bold md:text-5xl text-3xl">Brandon Castillo</h1>
          <h4 className="italic md:text-md text-xs">bcastillo@asdasd.com</h4>
          <form action="" className="pt-5">
            <div>
              <label htmlFor="" className="text-lg">Username:</label>
              <input
                type="text"
                className="w-full bg-vulcan-950 rounded-xl border h-8 mt-1 mb-1"
              />
            </div>
            <div>
              <label htmlFor="" className="text-lg">Job Name</label>
              <input
                type="text"
                className="w-full bg-vulcan-950 rounded-xl border h-8 mt-1 mb-1"
              />
            </div>
            <div>
              <label htmlFor="" className="text-lg">Address</label>
              <input
                type="text"
                className="w-full bg-vulcan-950 rounded-xl border h-8 mt-1 mb-1"
              />
            </div>
            <div>
              <label htmlFor="" className="text-lg">Montly income</label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
