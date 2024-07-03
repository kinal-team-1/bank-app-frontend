/**
 * @typedef {Object} BankToastProps
 * @property {function} [closeToast]
 * @property {Object} [toastProps]
 * @property {number} statusCode
 * @property {string} title
 * @property {string[]?} message
 */

import PropTypes from "prop-types";
import { useState } from "react";

const colors = {
  success: "text-green-500",
  error: "text-red-500",
};

/**
 * @param {BankToastProps} props
 */
export function BankToast({
  toastProps,
  closeToast,
  statusCode,
  title,
  message,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpenState = () => {
    setIsOpen((prev) => !prev);
  };

  const { type } = toastProps;

  return (
    <>
      <div
        className={`flex justify-between items-center gap-2 font-bold ${colors[type]} w-full`}
      >
        <h1 className="text-xl line-clamp-1">{title}</h1>
        <div className="text-3xl w-[3ch] shrink-0">{statusCode}</div>
      </div>
      <div className={`flex flex-col ${colors[type]}`}>
        {!isOpen && (
          <>
            {message.slice(0, 2).map((msg) => (
              <span>{msg}</span>
            ))}
            {message.length > 2 && (
              <button type="button" onClick={toggleOpenState}>
                Show more
              </button>
            )}
          </>
        )}
        {isOpen && (
          <>
            {message.map((msg) => (
              <span>{msg}</span>
            ))}
            <button type="button" onClick={toggleOpenState}>
              Show less
            </button>
          </>
        )}
      </div>
    </>
  );
}

BankToast.propTypes = {
  statusCode: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
