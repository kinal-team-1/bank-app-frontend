import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SOPORTED_LANGUAGES } from "../../config";

export function RedirectToHome() {
  const navigate = useNavigate();
  // get locale from navigator

  useEffect(() => {
    const preferredLanguage = navigator.language.split("-").at(0) || "en";
    if (SOPORTED_LANGUAGES.includes(preferredLanguage)) {
      navigate(`/${preferredLanguage}`);
    } else navigate("/en");
  }, [navigate]);
  return null;
}
