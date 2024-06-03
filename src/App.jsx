import { Outlet } from "react-router-dom";
import TypesafeI18n from "../i18n/i18n-react";
import { useLocale } from "./services/locale";

export function App() {
  const { locale } = useLocale();

  return (
    <TypesafeI18n
      // @ts-ignore
      locale={locale}
    >
      <Outlet />
    </TypesafeI18n>
  );
}
