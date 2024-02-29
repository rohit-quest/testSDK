import "./css/previousButton.css";
import { CSSProperties, MouseEventHandler, ReactNode } from "react";

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
  return (
    <button className={`q_prev_button_main_cont ${className}`} style={style} onClick={onClick} disabled={disabled || false}>
      {children}
    </button>
  );
};
