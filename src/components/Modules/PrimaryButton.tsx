
import { CSSProperties, MouseEventHandler, ReactNode, useContext } from "react";
import "./css/nextButton.css";
import QuestContext from "../QuestWrapper";

interface buttonType {
  children?: ReactNode;
  style?: CSSProperties | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  className?: string;
}


export const PrimaryButton = ({ disabled, children, style, onClick, className }:buttonType) => {
  const { themeConfig } = useContext(QuestContext.Context);

  return (
    <button className={` ${className} q_next_button_main_cont`} style={{background: themeConfig.buttonColor,...style}} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
