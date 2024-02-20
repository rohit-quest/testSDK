import "./css/previousButton.css";
import { CSSProperties, MouseEventHandler } from "react";

interface buttonType {
  text?: string;
  style?: CSSProperties | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const SecondaryButton = ({
  text,
  style,
  onClick,
}: buttonType) => {
  return (
    <button className="q_prev_button_main_cont" style={style} onClick={onClick}>
      {text ? text : "Go Back"}
    </button>
  );
};
