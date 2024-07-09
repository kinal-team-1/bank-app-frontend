import { Link } from "react-router-dom";
import { searchable } from "../../components/Searchable";
import { useLocaleService } from "../../../services/locale";

// HIGHER ORDER COMPONENT
export const UserCard = searchable(
  ({ HighlightText, email, username, name }) => {
    const { LL } = useLocaleService();

    return (
      <div className="border border-gray-200 rounded-md p-4 shadow-sm">
        <h2 className="text-lg font-semibold">
          <h3 className="text-primary-400">{LL?.PAGES?.USER?.EMAIL?.()}</h3>
          <HighlightText>{email}</HighlightText>
        </h2>
        <p className="text-gray-500">
          <h3 className="text-primary-400">{LL?.PAGES?.USER?.USERNAME?.()}</h3>
          <HighlightText>{username}</HighlightText>
        </p>
        <p className="text-gray-500">
          <h3 className="text-primary-400">{LL?.PAGES?.USER?.NAME?.()}</h3>
          <div className="flex gap-2">
            <span>
              <HighlightText>{name}</HighlightText>
            </span>
          </div>
        </p>
        <button type="button" className="bg-primary-400 w-full rounded py-2">
          Eliminar
        </button>
      </div>
    );
  },
);
