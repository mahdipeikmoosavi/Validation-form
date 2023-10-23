const SelectComponent = ({ selectedOption, name, formik }) => {
  return (
    <div className="formControl">
      <select {...formik.getFieldProps(name)} name={name}>
        {selectedOption.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {formik.errors[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default SelectComponent;
