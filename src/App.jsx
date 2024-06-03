import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { localStorageDetector } from "typesafe-i18n/detectors";
import TypesafeI18n from "./i18n/i18n-react";
import { detectLocale } from "./i18n/i18n-util";
// import { useLocale } from "./services/locale";
import { loadLocaleAsync } from "./i18n/i18n-util.async";
import { Home } from "./application/home/Home";
import { loadLocale } from "./i18n/i18n-util.sync";

const detectedLocale = detectLocale(localStorageDetector);

export function App() {
  return (
    <TypesafeI18n>
      <Outlet />
    </TypesafeI18n>
  );
}
