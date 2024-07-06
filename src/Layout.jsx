import { Outlet, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocaleService } from "./services/locale";
import { Navbar } from "./application/components/NavBar";
import { TobBar } from "./application/components/TopBar";

export function Layout() {
  const { locale } = useParams();
  const { locale: currentLocale, setLocale } = useLocaleService();

  if (locale !== currentLocale) {
    console.log("setting locale", locale);
    setLocale(locale);
  }

  return (
    <div className="h-dvh flex dark:bg-charade-950 bg-[#f8f8f8]">
      <Navbar />
      <section className="grow dark:text-silver-400 px-2 flex flex-col">
        <TobBar />
        <main className="grow overflow-hidden relative">
          <Outlet />
          <button
            type="submit"
            className="absolute text-primary-400 bottom-0 right-0 me-10 mb-10 size-[40px] rounded-full border flex justify-center items-center"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </main>
      </section>
    </div>
  );
}
