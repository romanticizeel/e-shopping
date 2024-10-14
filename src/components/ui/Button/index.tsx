import styles from "./Button.module.scss";

type PropsTypes = {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "outline-secondary";
  className?: string;
};

const Button = (props: PropsTypes) => {
  const { type, onClick, children, variant = "secondary", className } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
