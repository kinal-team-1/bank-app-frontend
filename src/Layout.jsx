import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileInvoice,
  faHome,
  faMoneyBillWave,
  faMoon,
  faRetweet,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet } from "react-router-dom";
import { useRef, useState } from "react";
import { DropDown } from "./application/components/DropDown";
import { useLocale } from "./services/locale";

export function Layout() {
  return (
    <div className="h-dvh flex flex-col dark:bg-charade-950 bg-[#f8f8f8]">
      <Navbar />
      <section className="grow dark:text-silver-400 px-2">
        <Outlet />
      </section>
      <Bottom />
    </div>
  );
}

function Bottom() {
  const [selected, setSelected] = useState(faHome.iconName);
  const { LL } = useLocale();
  const icons = [
    {
      tooltip: LL?.BOTTOM_NAVBAR?.HOME(),
      icon: faHome,
      link: "/",
    },
    {
      tooltip: LL?.BOTTOM_NAVBAR?.SERVICES(),
      icon: faFileInvoice,
      link: "/services",
    },
    {
      tooltip: LL?.BOTTOM_NAVBAR?.MOVEMENTS(),
      icon: faRetweet,
      link: "/movements",
    },
    {
      tooltip: LL?.BOTTOM_NAVBAR?.CURRENCIES(),
      icon: faMoneyBillWave,
      link: "/currencies",
    },
  ];

  return (
    <div className="h-20 dark:bg-vulcan-950 flex dark:text-silver-400 justify-around items-center bg-white shadow-[0px_-1px_7px_0px_rgba(0,0,0,0.20)] dark:shadow-none">
      {icons.map((button) => {
        const isSelected = selected === button.icon.iconName;

        return (
          <Link
            onClick={() => {
              setSelected(button.icon.iconName);
            }}
            to={button.link}
            key={button.icon.iconName}
            className={`${isSelected ? "text-primary-500" : ""} text-2xl flex flex-col hover:text-primary-400`}
          >
            <FontAwesomeIcon icon={button.icon} />
            <span className="text-xs">{button.tooltip}</span>
          </Link>
        );
      })}
    </div>
  );
}

// buttons to change language and theme
function Navbar() {
  const htmlRef = useRef(null);

  if (!htmlRef.current) {
    htmlRef.current = document.querySelector("html");
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (prefersDarkMode) {
      htmlRef.current.classList.add("dark");
    }
  }
  const [isDark, setIsDark] = useState(
    htmlRef.current.classList.contains("dark"),
  );

  const { setLocale } = useLocale();

  return (
    <div className="py-2 flex justify-end gap-2 px-2 dark:text-silver-400">
      <button
        type="button"
        onClick={() => {
          htmlRef.current.classList.toggle("dark");
          setIsDark(!isDark);
        }}
        className="px-1 rounded border cursor-pointer hover:text-primary-400"
      >
        <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
      </button>
      <button
        type="button"
        className="rounded border cursor-pointer hovertext-primary-400"
      >
        <DropDown
          onChange={(lang) => {
            setLocale(lang);
          }}
          defaultOption="en"
          options={["en", "es"]}
        />
      </button>
      <button
        type="button"
        className="size-[25px] rounded-full border relative flex flex-col justify-center items-center"
      >
        <span className="text-xs">JO</span>
      </button>
    </div>
  );
}
