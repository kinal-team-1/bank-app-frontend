import { createBrowserRouter, Outlet, redirect } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import { LocaleProvider } from "./services/locale";
import { DarkModeProvider } from "./services/dark-mode";
import { SearchProvider } from "./services/search-bar";
import { Services } from "./application/pages/services/Services";
import { ServicesAdmin } from "./application/pages/servicesAdmin/ServicesAdmin";
import { ServiceForm } from "./application/pages/servicesAdmin/ServiceForm";
import { FavoriteAccounts } from "./application/pages/favoriteAccounts/FavoriteAccounts";
import { Products } from "./application/pages/product/Product";
import { NavbarMobileProvider } from "./services/navbar-mobile-service";
import { NotFound } from "./application/pages/NotFound";
import { User } from "./application/pages/user/User";
import { Layout } from "./Layout";
import { Movements } from "./application/pages/movements/Movements";
import { SUPPORTED_LANGUAGES } from "./config";
import { Login } from "./application/pages/log-in/Login";
import { UserValidation } from "./UserValidaion";
import { validateToken } from "./application/actions/GET/validate-token";
// import { FavoriteAccountForm } from "./application/pages/favoriteAccounts/FavoriteAccountForm";
import { PrivateUserRoute } from "./application/PrivateUserRoute";
import { AuthProvider } from "./services/auth";
import { UserForm } from "./application/pages/user/UserForm";
import { ProductsAdmin } from "./application/pages/productAdmin/ProductAdmin";
import { ProductForm } from "./application/pages/productAdmin/ProductForm";
import { UserAdminForm } from "./application/pages/user/UserAdminForm";
import { UserAdmin } from "./application/pages/user/UserAdmin";
import { TransferenceForm } from "./application/pages/transference/TransferenceForm";
import { Accounts } from "./application/pages/accounts/Accounts";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <AuthProvider>
        <UserValidation />
      </AuthProvider>
    ),
    children: [
      {
        loader: async () => {
          const navigatorLocale = navigator.language.split("-").at(0) || "en";
          const isSupported = SUPPORTED_LANGUAGES.includes(navigatorLocale);
          const locale = isSupported ? navigatorLocale : "en";

          const token = localStorage.getItem("token");
          if (!token) return redirect(`${locale}/login`);
          const [user] = await validateToken(token);
          console.log({ user, token });
          if (!user) return redirect(`${locale}/login`);

          return redirect(`/${locale}`);
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
            path: "login",
            element: <Login />,
          },
          {
            path: "",
            element: <PrivateUserRoute />,
            children: [
              {
                loader: () => {
                  if (window.location.pathname === "/") return null;
                  const locale = window.location.pathname.split("/")[1];

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
                    element: <Accounts />,
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
                      // {
                      //   path: "create",
                      //   element: <FavoriteAccountForm />,
                      // },
                    ],
                  },
                  {
                    path: "user",
                    element: <Outlet />,
                    children: [
                      {
                        path: "",
                        element: <User />,
                      },
                      {
                        path: "create",
                        element: <UserForm />,
                      },
                    ],
                  },
                  {
                    path: "admin",
                    element: <Outlet />,
                    children: [
                      {
                        path: "",
                        element: <UserAdmin />,
                      },
                      {
                        path: "create",
                        element: <UserAdminForm />,
                      },
                    ],
                  },
                  {
                    path: "product",
                    element: <Products />,
                  },
                  {
                    path: "admin/product",
                    element: <Outlet />,
                    children: [
                      { path: "", element: <ProductsAdmin /> },
                      {
                        path: "create",
                        element: <ProductForm />,
                      },
                    ],
                  },

                  {
                    path: "transference",
                    element: <TransferenceForm />,
                  },
                  {
                    path: "services",
                    element: <Services />,
                  },
                  {
                    path: "admin/services",
                    element: <Outlet />,
                    children: [
                      { path: "", element: <ServicesAdmin /> },
                      {
                        path: "create",
                        element: <ServiceForm />,
                      },
                    ],
                  },
                  // MUST BE LAST ALWAYS
                  { path: "*", element: <NotFound /> },
                ],
              },
            ],
          },
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
