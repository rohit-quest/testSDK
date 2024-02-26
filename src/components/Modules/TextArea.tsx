import { CSSProperties, ChangeEventHandler, useContext } from 'react';
import './css/textArea.css'
import QuestContext from "../QuestWrapper";
interface TextAreaProps {
  value?: string;
  style?: CSSProperties | undefined;
  onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined;
  placeholder?:string
}

const TextArea = ({ value, onChange, style, placeholder }: TextAreaProps) => {
  const { themeConfig } = useContext(QuestContext.Context);
  return (
    <textarea
      className='q_input_textArea'
      value={value}
      onChange={onChange}
      style={{...style,fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif"}}
      placeholder={placeholder}
    />
  );
}

export default TextArea;
