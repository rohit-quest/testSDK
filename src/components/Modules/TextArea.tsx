import { CSSProperties, ChangeEventHandler } from 'react';
import './css/textArea.css'

interface TextAreaProps {
  value?: string;
  style?: CSSProperties | undefined;
  onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined;
  placeholder?:string
}

const TextArea = ({ value, onChange, style,placeholder }: TextAreaProps) => {
  return (
    <textarea
      className='q_input_textArea'
      value={value}
      onChange={onChange}
      style={style}
      placeholder={placeholder}
    />
  );
}

export default TextArea;
