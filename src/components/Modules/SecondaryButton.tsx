import "./css/previousButton.css";
import { CSSProperties, MouseEventHandler, ReactNode, useContext } from "react";
import QuestContext from "../QuestWrapper";
interface buttonType {
  children?: ReactNode;
  style?: CSSProperties | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  className?: string;
}

export const SecondaryButton = ({
  children,
  style,
  onClick,
  disabled,
  className
}: buttonType) => {
  const { themeConfig } = useContext(QuestContext.Context);
  return (
    <button className={`q_prev_button_main_cont ${className}`} style={{...style, fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif"}} onClick={onClick} disabled={disabled || false}>
      {children}
    </button>
  );
};
