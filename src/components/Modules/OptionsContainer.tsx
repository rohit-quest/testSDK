import React, { ReactNode } from "react";
import "./css/Options.css";

interface ComponentBodyPropType {
  className?: string;
  id?: string;
  children?: ReactNode;
  key?: number | string;
  style?: React.CSSProperties;
}

export function OptionsContainer({
  className,
  id,
  key,
  style,
  children,
}: ComponentBodyPropType) {
  return (
    <div
      className={`${className} sdk-module-options-cont`}
      id={id}
      key={key}
      style={{ ...style }}
    >
      {children}
    </div>
  );
}
