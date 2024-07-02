import { createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import { Layout } from "./Layout";
import { LocaleProvider } from "./services/locale";
import { Home } from "./application/home/Home";
import { DarkModeProvider } from "./services/dark-mode";
import { SearchProvider } from "./services/search-bar";
import { Movements } from "./application/movements/Movements";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/:locale",
    element: (
      <QueryClientProvider client={queryClient}>
        <LocaleProvider>
          <DarkModeProvider>
            <SearchProvider>
              <App />
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
            element: <div>Hola</div>,
          },
          {
            path: "movements",
            element: <Movements />,
          },
          {
            path: "currencies",
            element: <div>Hola</div>,
          },
        ],
      },
    ],
  },
]);

export { router };
