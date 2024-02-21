
import { CSSProperties, MouseEventHandler, ReactNode } from "react";
import "./css/nextButton.css";



interface buttonType {
  children?: ReactNode;
  style?: CSSProperties | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  className?: string;
}


export const PrimaryButton = ({ disabled, children, style, onClick, className }:buttonType) => {
  console.log(disabled)
  return (
    <button className={` ${className} q_next_button_main_cont`} style={style} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
