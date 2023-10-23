import React from "react";

const RadioInput = ({ name, radioOptions, formik }) => {
  return (
    <div className="form-check form-check-inline formControl">
      {radioOptions.map((item) => (
        <React.Fragment key={item.value}>
          <input
          className="form-check-input"
            type="radio"
            id={item.value}
            name={name}
            value={item.value}
            onChange={formik.handleChange}  
            checked={formik.values[name] === item.value}
          />
          <label className="form-check-label" htmlFor={item.value}>{item.label}</label>
        </React.Fragment>
      ))}
      {formik.errors[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default RadioInput;


