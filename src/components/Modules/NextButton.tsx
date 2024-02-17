
import { CSSProperties, MouseEventHandler } from "react";
import "./css/nextButton.css";



interface buttonType {
  nextBtnText?: string;
  style?: CSSProperties | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}


export const PrimaryButton = ({ nextBtnText, style, onClick }:buttonType) => {
  return (
    <button className="q_next_button_main_cont" style={style} onClick={onClick}>
      {nextBtnText}
    </button>
  );
};
