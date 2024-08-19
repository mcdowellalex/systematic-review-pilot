import { ButtonHTMLAttributes, ReactElement } from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leadingIcon?: ReactElement;
  // variant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  className?: string;
}

const Button = ({
  children,
  disabled = false,
  // variant="primary",
  className,
  leadingIcon,
  ...rest
}: ButtonProps) => {
  const classes = clsx(
    className,
    styles.button
    // variant=="primary" && styles.primary,
    // variant=="secondary" && styles.secondary,
    // variant=="tertiary" && styles.tertiary
  );
  return (
    <button disabled={disabled} type="button" className={classes} {...rest}>
      {leadingIcon && <div className={styles.leadingIcon}>{leadingIcon}</div>}
      {children}
    </button>
  );
};
export default Button;
