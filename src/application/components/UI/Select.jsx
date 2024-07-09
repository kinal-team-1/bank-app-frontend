import Select from "react-select";
import PropTypes from "prop-types";
import { useDarkModeService } from "../../../services/dark-mode";

export function UISelect({ options, ...props }) {
  const { isDark } = useDarkModeService();

  return (
    <Select
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      styles={{
        control: (base, state) => ({
          ...base,
          backgroundColor: isDark ? "#3B3F51" : "#e5e7eb", // Updated to match the darker input background
          color: isDark ? "#e3e2e2" : "black",
          borderColor: "#e3e2e2",
          boxShadow: "none", // Focus ring color with offset
          borderRadius: "0.375rem",
          paddingBlock: "0.375rem",
          outline: state.isFocused ? "2px solid #FA863D" : "none", // Adding outline for better focus visibility
          outlineOffset: "2px", // Adding offset to the outline
          "&:hover": {
            boxShadow: "none",
          },
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused
            ? isDark
              ? "#262832"
              : "#f8f8f8"
            : isDark
              ? "#3B3F51"
              : "#e5e7eb", // Highlight option on hover
          color: state.isSelected ? "#FA863D" : isDark ? "#e3e2e2" : "black", // Change text color when selected
        }),
        singleValue: (base) => ({
          ...base,
          color: isDark ? "#e3e2e2" : "black",
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: isDark ? "#3B3F51" : "#e5e7eb",
        }),
        dropdownIndicator: (base) => ({
          ...base,
          color: isDark ? "#e3e2e2" : "#6B7280", // Dropdown arrow color
          "&:hover": {
            color: "#FA863D", // Hover color for dropdown arrow
          },
        }),
        indicatorSeparator: (base) => ({
          ...base,
          backgroundColor: isDark ? "#3B3F51" : "#e5e7eb",
        }),
        input: (base) => ({
          ...base,
          color: isDark ? "#e3e2e2" : "black",
        }),
      }}
      className="min-w-[20ch] text-silver-200 w-full"
      options={options}
    />
  );
}

UISelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
