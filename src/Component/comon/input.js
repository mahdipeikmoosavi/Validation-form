import React from "react";

const Input = ({ label, type = "text", name, formik }) => {
  return (
    <div className="formControl">
      <div className="coolinput">

      <label for="input" class="text" htmlFor={name}>{label}</label>
      <input
      className="input"
        id={name}
        type={type}
        {...formik.getFieldProps(name)}
        name={name}
        placeholder="Write here..."
      />
      {formik.errors[name] && <div className="error">{formik.errors[name]}</div>}
    </div>
    </div>

  );
};

export default Input;

