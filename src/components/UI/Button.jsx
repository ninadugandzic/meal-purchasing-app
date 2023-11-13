import "./Button.css";

export default function Button({ children, textOnly, className, ...props }) {
  let cssClasses = "text-button";
  cssClasses += " " + className;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
