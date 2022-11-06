export const TextField = (props) => (
  <div
    className={`flex column mb-14 ${
      props.error ? "border-red" : "border-gray"
    }`}
  >
    <small className="mb-4 text-left">{`${props.label}:`}</small>
    <input
      onFocus={props.handleFocus}
      name={props.name}
      className={props.className}
      onChange={props.handleChange}
      value={props.value}
      placeholder={props.placeholder}
      label={props.label}
    />
    <small className="red-text text-left">{props.helperText}</small>
  </div>
);
