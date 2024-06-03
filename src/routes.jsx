import { Outlet, createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Home } from "./application/home/Home";
import { LocaleProvider, useLocale } from "./services/locale";
import { detectLocale } from "./i18n/i18n-util";
import { loadLocaleAsync } from "./i18n/i18n-util.async";

function LoadLocale() {
  const { locale, setLocale } = useLocale();

  if (locale === null) {
    const l =
      localStorage.getItem("locale") ??
      detectLocale(() => [navigator.language]);

    loadLocaleAsync(l).then(() => {
      setLocale(l);
    });
  }

  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LocaleProvider>
        <App />
      </LocaleProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export { router };
