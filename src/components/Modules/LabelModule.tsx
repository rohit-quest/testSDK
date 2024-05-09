import { CSSProperties, useContext } from "react";
import "./css/LabelModule.css";
import QuestContext from "../../components/QuestWrapper";

interface Proptype {
  htmlFor?: string;
  style?: CSSProperties;
  children?: string;
  className?: string;
  id?: string;
}

export const LabelModule = ({
  htmlFor,
  style,
  children,
  className,
  id,
}: Proptype) => {
  return (
    <label
      htmlFor={htmlFor}
      style={{ ...style }}
      className={`q_modular_label ${className || ""}`}
      id={id}
    >
      {children}
    </label>
  );
};
