import { InputHTMLAttributes } from "react";
import styles from "./TextBox.module.css";
import clsx from "clsx";

interface TextBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  classname?: string;
}

function TextBox({ classname, ...inputProps }: TextBoxProps) {
  return (
    <input
      type="text"
      {...inputProps}
      className={clsx(classname, styles.textbox)}
    />
  );
}

export { TextBox };
