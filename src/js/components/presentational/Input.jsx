import React from "react";
import PropTypes from "prop-types";

const Input = ({ label, text, type, id, value, handleChange, handleKeyPress }) => (
  <>
    <label htmlFor={label}>{text}</label>
    <input
      type={type}
      className="form-control"
      id={id}
      value={value}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      required
    />
  </>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func
};

export default Input;
