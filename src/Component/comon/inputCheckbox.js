import React from "react";

const CheckBox = ({ name, checkOptions, formik }) => {
  return (
    <div className="formControl">
      {checkOptions.map((item) => (
        <React.Fragment key={item.value}>
          <input
            type="checkbox"
            id={item.value}
            name={name}
            value={item.value}
            onChange={formik.handleChange}
            checked={formik.values[name].includes(item.value)}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </React.Fragment>
      ))}
      {formik.errors[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default CheckBox;
