import PropTypes from "prop-types";

export function Switch({ checked, onChange, color, className = "" }) {
  return (
    <>
      <input
        checked={checked}
        onChange={onChange}
        className={`react-switch-checkbox ${className}`}
        id="react-switch-new"
        type="checkbox"
      />
      <label
        style={{ background: checked && color }}
        className="react-switch-label"
        htmlFor="react-switch-new"
      >
        <span className="react-switch-button" />
      </label>
    </>
  );
}

Switch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string,
};
