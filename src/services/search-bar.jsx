import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

/**
 * @typedef {Object} SearchContextType
 * @property {string} currentSearch
 * @property {React.Dispatch<string>} setCurrentSearch
 */

/**
 * @type {React.Context<{currentSearch: string, setCurrentSearch: *}>}
 */
const searchContext = createContext({
  currentSearch: "",
  setCurrentSearch: () => {},
});

export function SearchProvider({ children }) {
  const [currentSearch, setCurrentSearch] = useState("");

  const value = useMemo(
    () => ({ currentSearch, setCurrentSearch }),
    [currentSearch, setCurrentSearch],
  );

  return (
    <searchContext.Provider value={value}>{children}</searchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useSearchService() {
  return useContext(searchContext);
}
