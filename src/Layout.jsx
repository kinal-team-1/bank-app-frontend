import { Outlet, useParams } from "react-router-dom";
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
        <main className="grow">
          <Outlet />
        </main>
      </section>
    </div>
  );
}
