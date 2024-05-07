import React from "react";
import "./css/Options.css";
import OptionsIcon from "./assets/OptionsIcon.svg";
interface ComponentBodyPropType {
  className?: string;
  id?: string;
  key?: number | string;
  children?: any;
  optionIcon?: string;
  optionStyle?: React.CSSProperties;
  optionsTextStyle?: React.CSSProperties;
  onClick?: () => void;
}

export function Option({
  className,
  id,
  children,
  key,
  optionIcon,
  optionStyle,
  optionsTextStyle,
  onClick,
}: ComponentBodyPropType) {
  return (
    <div
      key={key}
      className={`${className} sdk-one-option`}
      id={id}
      style={{
        ...optionStyle,
      }}
      onClick={onClick}
    >
      <img src={optionIcon || OptionsIcon} alt="" />
      <p
        style={{
          ...optionsTextStyle,
        }}
      >
        {children}
      </p>
    </div>
  );
}
