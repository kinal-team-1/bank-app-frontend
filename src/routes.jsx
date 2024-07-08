import { createBrowserRouter, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import { Layout } from "./Layout";
import { LocaleProvider } from "./services/locale";
import { Home } from "./application/pages/home/Home";
import { DarkModeProvider } from "./services/dark-mode";
import { SearchProvider } from "./services/search-bar";
import { Movements } from "./application/pages/movements/Movements";
import { Services } from "./application/pages/services/Services";
import { FavoriteAccounts } from "./application/pages/favoriteAccounts/FavoriteAccounts";
import { NavbarMobileProvider } from "./services/navbar-mobile-service";
import { NotFound } from "./application/pages/NotFound";
import { RedirectToHome } from "./application/pages/RedirectToHome";
import { FavoriteAccountForm } from "./application/pages/favoriteAccounts/FavoriteAccountForm";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RedirectToHome />,
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
        path: "",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "services",
            element: <Services />,
          },
          {
            path: "movements",
            element: <Movements />,
          },
          {
            path: "currencies",
            element: <div>Hola</div>,
          },
          {
            path: "favorite-accounts",
            element: <Outlet />,
            children: [
              {
                path: "",
                element: <FavoriteAccounts />,
              },
              {
                path: "create",
                element: <FavoriteAccountForm />,
              },
            ],
          },
          // MUST BE LAST ALWAYS
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
  // MUST BE LAST ALWAYS
  {
    path: "*",
    element: (
      <DarkModeProvider>
        <NotFound />
      </DarkModeProvider>
    ),
  },
]);

export { router };
