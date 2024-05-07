import React, { ReactNode } from "react";
import "./css/Question.css";

interface ComponentBodyPropType {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  key?: number | string;
}

export function Question({
  className,
  id,
  style,
  children,
  key,
}: ComponentBodyPropType) {
  return (
    <div
      className={`${className} sdk-module-question-cont`}
      id={id}
      key={key}
      style={{ ...style }}
    >
      {children}
    </div>
  );
}
