import "./css/previousButton.css";
import { CSSProperties, MouseEventHandler } from "react";

interface buttonType {
  previousBtnText?: string;
  style?: CSSProperties | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const SecondaryButton = ({
  previousBtnText,
  style,
  onClick,
}: buttonType) => {
  return (
    <button className="q_prev_button_main_cont" style={style} onClick={onClick}>
      {previousBtnText ? previousBtnText : "Go Back"}
    </button>
  );
};
