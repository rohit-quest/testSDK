
import { CSSProperties, MouseEventHandler } from "react";
import "./css/nextButton.css";



interface buttonType {
  text?: string;
  style?: CSSProperties | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  type?: "button" | "submit" | "reset" | undefined;
}


export const PrimaryButton = ({ text, style, onClick, type }:buttonType) => {
  return (
    <button type={type} className="q_next_button_main_cont" style={style} onClick={onClick}>
      {text}
    </button>
  );
};
