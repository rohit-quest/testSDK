
import { CSSProperties, MouseEventHandler } from "react";
import "./css/nextButton.css";



interface buttonType {
  text?: string;
  style?: CSSProperties | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}


export const PrimaryButton = ({ text, style, onClick }:buttonType) => {
  return (
    <button className="q_next_button_main_cont" style={style} onClick={onClick}>
      {text}
    </button>
  );
};
