import { useLocale } from "../../services/locale";

export function Home() {
  const { LL } = useLocale();

  return (
    <div className="h-dvh flex flex-col">
      <Navbar />
      <section className="grow flex justify-center items-center">
        <span className="text-7xl">{LL?.TITLE()}</span>
      </section>
    </div>
  );
}

function Navbar() {
  const { LL, setLocale, locale } = useLocale();

  return (
    <nav className="w-full bg-black text-white px-5 py-3 flex justify-between">
      <span className="text-3xl text-white">{LL?.HI?.({ name: "Joao" })}</span>
      <button
        onClick={() => {
          setLocale(locale === "en" ? "es" : "en");
        }}
        type="button"
        className="bg-white text-black rounded px-3 py-2"
      >
        Toggle Language
      </button>
    </nav>
  );
}
