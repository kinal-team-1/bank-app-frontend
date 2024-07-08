import { createBrowserRouter, Outlet, redirect } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import { LocaleProvider } from "./services/locale";
import { DarkModeProvider } from "./services/dark-mode";
import { SearchProvider } from "./services/search-bar";
import { NavbarMobileProvider } from "./services/navbar-mobile-service";
import { NotFound } from "./application/pages/NotFound";
import { Layout } from "./Layout";
import { Home } from "./application/pages/home/Home";
import { Services } from "./application/pages/services/Services";
import { Movements } from "./application/pages/movements/Movements";
import { SUPPORTED_LANGUAGES } from "./config";
import { ServiceForm } from "./application/pages/services/ServiceForm.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    loader: () => {
      const locale = navigator.language.split("-").at(0) || "en";
      console.log({ locale });
      if (SUPPORTED_LANGUAGES.includes(locale)) {
        return redirect(`/${locale}`);
      }

      return redirect("/en");
    },
    path: "/",
  },
  {
    path: "/:locale",
    element: (
      <QueryClientProvider client={queryClient}>
        <LocaleProvider>
          <DarkModeProvider>
            <SearchProvider>
              <NavbarMobileProvider>
                <App />
              </NavbarMobileProvider>
            </SearchProvider>
          </DarkModeProvider>
        </LocaleProvider>
      </QueryClientProvider>
    ),
    children: [
      {
        loader: () => {
          if (window.location.pathname === "/") return null;
          const locale = window.location.pathname.split("/")[1];
          console.log({ locale }, window.location.pathname);

          if (!SUPPORTED_LANGUAGES.includes(locale)) {
            return redirect("/not-found");
          }
          return null;
        },
        path: "",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "services",
            element: <Outlet />,
            children: [
              {
                path: "",
                element: <Services />,
              },
              {
                path: "create",
                element: <ServiceForm />,
              },
            ],
          },
          {
            path: "movements",
            element: <Movements />,
          },
          {
            path: "currencies",
            element: <div>Hola</div>,
          },
          // MUST BE LAST ALWAYS
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
  {
    path: "not-found",
    element: (
      <DarkModeProvider>
        <NotFound />
      </DarkModeProvider>
    ),
  },
]);

export { router };
