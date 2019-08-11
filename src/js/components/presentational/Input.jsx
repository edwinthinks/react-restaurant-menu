import React from "react";
import PropTypes from "prop-types";

const Input = ({ label, text, type, id, value, handleChange, handleKeyPress }) => (
  <>
    <div className="mb-4">
      <label htmlFor={label} className="block text-gray-700 text-sm font-bold mb-2">
        {text}
      </label>
      <input type={type}
        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        required
      />
    </div>
  </>
);

Input.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func
};

export default Input;
