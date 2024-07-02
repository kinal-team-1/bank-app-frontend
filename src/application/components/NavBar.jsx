import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faFileInvoice,
  faHome,
  faMoneyBillWave,
  faRetweet,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDarkModeService } from "../../services/dark-mode";
import { useLocaleService } from "../../services/locale.jsx";

export function Navbar() {
  const { isDark } = useDarkModeService();
  const { LL, locale } = useLocaleService();

  const routes = [
    {
      name: LL?.BOTTOM_NAVBAR?.HOME(),
      icon: faHome,
      link: `/${locale}`,
    },
    {
      name: LL?.BOTTOM_NAVBAR?.SERVICES(),
      icon: faFileInvoice,
      link: `/${locale}/services`,
    },
    {
      name: LL?.BOTTOM_NAVBAR?.MOVEMENTS(),
      icon: faRetweet,
      link: `/${locale}/movements`,
    },
    {
      name: LL?.BOTTOM_NAVBAR?.CURRENCIES(),
      icon: faMoneyBillWave,
      link: `/${locale}/currencies`,
    },
  ];

  return (
    <div className="lg:w-[250px] dark:text-silver-400 border-r border-r-silver-400 px-3 py-5 flex flex-col justify-between">
      <div className="flex flex-col gap-5 h-full">
        <div className="flex gap-2 justify-center">
          <img src="/public/logo-2.svg" className="h-[70px]" alt="" />
          <img
            src={`/public/letters-${isDark ? "dark" : "light"}.svg`}
            className="h-[70px]"
            alt=""
          />
        </div>
        <div>
          {routes.map((route) => (
            <Link
              to={route.link}
              key={route.name}
              className="px-3 py-2 flex gap-2 items-center border rounded hover:bg-vulcan-900"
            >
              <FontAwesomeIcon icon={route.icon} />
              <span>{route.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <button className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faArrowRightToBracket} />
        <span>Log out</span>
      </button>
    </div>
  );
}
