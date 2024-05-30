import { CSSProperties, ChangeEventHandler, useContext } from "react";
import "./css/TextAreaModule.css";
import QuestContext from "../../components/QuestWrapper";
interface TextAreaProps {
  value?: string;
  style?: CSSProperties | undefined;
  onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined;
  placeholder?: string;
  maxLength?: number;
  className?: string;
  id?: string;
  key?: string | number;
  rows?: number;
  cols?: number;
}

export const TextAreaModule = ({
  value,
  onChange,
  style,
  placeholder,
  maxLength,
  className,
  id,
  key,
  rows,
  cols
}: TextAreaProps) => {
  const { themeConfig } = useContext(QuestContext.Context);
  return (
    <textarea
      className={`${className} q_modular_input_textArea`}
      value={value}
      onChange={onChange}
      style={{
        ...style,
        fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif",
      }}
      placeholder={placeholder}
      maxLength={maxLength}
      key={key}
      id={id}
      rows={rows}
      cols={cols}
    />
  );
};
