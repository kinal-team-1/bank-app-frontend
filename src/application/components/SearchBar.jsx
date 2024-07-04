import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearchService } from "../../services/search-bar";

export function Searchbar() {
  const { setCurrentSearch } = useSearchService();

  return (
    <div className="w-[30ch] border rounded px-2 py-1 h-full flex gap-2 items-center">
      <input
        onChange={(e) => setCurrentSearch(e.target.value.trim())}
        type="text"
        placeholder="Search..."
        className="w-full h-full bg-[inherit] outline-none"
      />
      <FontAwesomeIcon icon={faSearch} />
    </div>
  );
}
