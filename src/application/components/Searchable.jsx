import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSearchService } from "../../services/search-bar";

/**
 * @typedef {Object} SearchableProps
 * @property {() => void} onHide
 * @property {() => void} onShow
 */

export function searchable(WrappedComponent) {
  /** @param {SearchableProps & any} props */
  // eslint-disable-next-line react/prop-types
  return function SearchableComponent({ onHide, onShow, ...props }) {
    const { currentSearch } = useSearchService();
    const searchableTextsRef = useRef(new Set([]));
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      const hasMatch =
        searchableTextsRef.current.size === 0 ||
        Array.from(searchableTextsRef.current).some((text) =>
          text.toLowerCase().includes(currentSearch.toLowerCase()),
        );

      setIsVisible(hasMatch);
    }, [currentSearch]);

    useEffect(() => {
      if (!isVisible) {
        onHide();
      } else onShow();
    }, [isVisible]);

    const HighlightTextWrapper = useCallback(
      ({ children }) => (
        <HighlightText
          currentSearch={currentSearch}
          searchableTextsRef={searchableTextsRef}
        >
          {children}
        </HighlightText>
      ),
      [currentSearch, searchableTextsRef.current],
    );

    if (!isVisible) return null;

    return (
      <WrappedComponent
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        HighlightText={HighlightTextWrapper}
      />
    );
  };
}

function HighlightText({ children, searchableTextsRef, currentSearch }) {
  const text = children.toString();
  const previousText = useRef(text);

  useEffect(() => {
    if (previousText.current !== text) {
      searchableTextsRef.current.delete(previousText.current);
    }

    searchableTextsRef.current.add(text);
    previousText.current = text;
  }, [text]); // remove old text and add new one

  if (!currentSearch) return children;

  const hasCurrentSearch = text
    .toLowerCase()
    .includes(currentSearch?.toLowerCase() ?? "");

  if (!hasCurrentSearch) return children;

  const parts = text.split(new RegExp(`(${currentSearch})`, "gi"));

  return (
    <>
      {parts.map((txt) => {
        const isMatch = txt.toLowerCase() === currentSearch.toLowerCase();

        if (!isMatch) return txt;

        const beforeText = txt.slice(
          0,
          txt.toLowerCase().indexOf(currentSearch.toLowerCase()),
        );
        // text highlighted
        const textHighlighted = txt.slice(
          txt.toLowerCase().indexOf(currentSearch.toLowerCase()),
          txt.toLowerCase().indexOf(currentSearch.toLowerCase()) +
            currentSearch.length,
        );
        // text after the highlighted text
        const afterText = txt.slice(
          txt.toLowerCase().indexOf(currentSearch.toLowerCase()) +
            currentSearch.length,
        );

        return (
          <>
            {beforeText}
            <span className="bg-primary-400">{textHighlighted}</span>
            {afterText}
          </>
        );
      })}
    </>
  );
}

HighlightText.propTypes = {
  children: PropTypes.node.isRequired,
  searchableTextsRef: PropTypes.shape({
    current: PropTypes.instanceOf(Set),
  }).isRequired,
  currentSearch: PropTypes.string.isRequired,
};
