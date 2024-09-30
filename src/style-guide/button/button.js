import "./button.css";

export default function Button({ children, className, ...props }) {
  return (
    <button className={`custom-btn ${className}`} {...props}>
      {children}
    </button>
  );
}
