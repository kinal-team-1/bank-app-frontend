import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Layout } from "./Layout";
import { LocaleProvider } from "./services/locale";
import { Home } from "./application/home/Home";

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
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/services",
            element: <div>Hola</div>,
          },
          {
            path: "/movements",
            element: <div>Hola</div>,
          },
          {
            path: "/currencies",
            element: <div>Hola</div>,
          },
        ],
      },
    ],
  },
]);

export { router };
