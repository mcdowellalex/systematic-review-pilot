import { TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.css";
import clsx from "clsx";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  classname?: string;
}

function TextArea({ classname, ...textareaProps }: TextAreaProps) {
  return (
    <textarea {...textareaProps} className={clsx(classname, styles.textarea)} />
  );
}

export { TextArea };
