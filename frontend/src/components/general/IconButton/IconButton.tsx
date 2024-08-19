import { ButtonHTMLAttributes } from "react";
import styles from "./IconButton.module.css";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  icon: string;
  size?: "small" | "medium" | "large";
  className?: string;
  iconStyles?: string;
}

const IconButton = ({
  icon,
  disabled = false,
  size = "medium",
  className,
  iconStyles,
  ...rest
}: ButtonProps) => {
  const classes = clsx(className, styles.button);
  const iconClasses = clsx(
    styles.icon,
    size === "small" ? styles.small : "",
    size === "medium" ? styles.medium : "",
    size === "large" ? styles.large : "",
    iconStyles
  );
  return (
    <button disabled={disabled} type="button" className={classes} {...rest}>
      <span className={styles.span}>
        <img src={icon} className={iconClasses} />
      </span>
    </button>
  );
};
export default IconButton;
