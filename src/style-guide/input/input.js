import "./input.css";

export default function Input({ className, errorMessage, ...props }) {
  const classes = `custom-input${!!errorMessage?.length ? " error" : ""}${
    className ? className : ""
  }`;

  return (
    <span className="custom-input-container">
      <input className={classes} {...props} />
      {!!errorMessage?.length && (
        <p className="error-message">{errorMessage}</p>
      )}
    </span>
  );
}
