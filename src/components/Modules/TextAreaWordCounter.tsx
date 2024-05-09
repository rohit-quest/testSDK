import { CSSProperties, ReactNode } from "react";
import "./css/TextAreaWordCounter.css";

interface TextAreaProps {
  children?: ReactNode;
  style?: CSSProperties | undefined;
  className?: string;
  id?: string;
  key?: string | number;
}

const TextAreaWordCounter = ({
  children,
  style,
  className,
  key,
  id,
}: TextAreaProps) => {
  return (
    <p
      className={`${className} q_modular_textArea_word_counter`}
      style={{
        ...style,
      }}
      key={key}
      id={id}
    >
      {children}
    </p>
  );
};

export default TextAreaWordCounter;
