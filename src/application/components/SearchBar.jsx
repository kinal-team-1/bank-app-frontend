import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useSearchService } from "../../services/search-bar";

export function Searchbar({ autoFocus = false }) {
  const { setCurrentSearch } = useSearchService();

  return (
    <div className="w-[25ch] border rounded px-2 py-1 h-full flex gap-2 items-center">
      <input
        /* eslint-disable-next-line jsx-a11y/no-autofocus */
        autoFocus={autoFocus}
        onChange={(e) => setCurrentSearch(e.target.value.trim())}
        type="text"
        placeholder="Search..."
        className="w-full h-full bg-[inherit] outline-none"
      />
      <FontAwesomeIcon icon={faSearch} />
    </div>
  );
}

Searchbar.defaultProps = {
  autoFocus: false,
};

Searchbar.propTypes = {
  autoFocus: PropTypes.bool,
};
