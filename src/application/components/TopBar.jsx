import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useDarkModeService } from "../../services/dark-mode";
import { DropDown } from "./DropDown";
import { Searchbar } from "./SearchBar.jsx";

export function TobBar() {
  return (
    <div className="py-5 px-3 grid grid-cols-3 justify-items-center items-center">
      <h1 className="justify-self-start text-2xl">Overview</h1>
      <div className="justify-self-center h-full">
        <Searchbar />
      </div>
      <div className="justify-self-end">
        <TopBarButtons />
      </div>
    </div>
  );
}

function TopBarButtons() {
  const { locale } = useParams();
  const { isDark, setIsDark } = useDarkModeService();
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  return (
    <div className="flex gap-2">
      <DropDown
        onChange={(lang, options) => {
          const lastRoute = currentPath.split("/").pop();

          if (options.includes(lastRoute)) {
            const pathRoutes = currentPath.split("/");
            pathRoutes.pop();
            pathRoutes.push(lang);
            navigate(pathRoutes.join("/"));
            return;
          }

          const regex = new RegExp(`/(${options.join("|")})/`, "g");
          navigate(currentPath.replace(regex, `/${lang}/`));
        }}
        defaultOption={locale}
        options={["en", "es"]}
      />
      <button
        type="button"
        onClick={() => {
          setIsDark(!isDark);
        }}
        className="px-2 py-1 size-[calc(100px/3)] rounded border cursor-pointer hover:text-primary-400"
      >
        <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
      </button>
      <button
        type="button"
        className="rounded border px-2 py-1 size-[calc(100px/3)] cursor-pointer hover:text-primary-400"
      >
        <span className="text-sm">LC</span>
      </button>
    </div>
  );
}
