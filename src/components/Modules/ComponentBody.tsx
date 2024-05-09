import React, { ReactNode } from "react";
import "./css/ComponentBody.css";

interface ComponentBodyPropType {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  key?: number | string;
  questionData?: any[];
}

export function ComponentBody({
  className,
  id,
  style,
  children,
  key,
}: ComponentBodyPropType) {

  return (
    <div
      className={`${className} sdk-module-component-body`}
      id={id}
      key={key}
      style={{ ...style }}
    >
      {children}
    </div>
  );
}
