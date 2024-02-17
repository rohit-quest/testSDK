import React, { ChangeEventHandler, CSSProperties } from "react";
import './css/singlechoice.css';

interface SingleChoiceProps {
  options: string[];
  isChecked: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  style?: CSSProperties;
  choiceColor?: string;
  type?: string;
}

const SingleChoice: React.FC<SingleChoiceProps> = ({
  options,
  isChecked,
  onChange,
  style,
  choiceColor = '#6525B3',
  type,
}) => {
  const containerStyle: CSSProperties = {
    ...style,
    flexDirection: type === 'modal3' ? 'column' : 'row',
  };

  return (
    <div className="q-singlechoice-input-cont" style={containerStyle}>
      {options.map((option: string, id: number) => {
        const labelContainerStyle: CSSProperties = {
          border: isChecked === option ? `1px solid ${choiceColor}` : '1px solid #EFEFEF',
          width: type === 'modal3' ? '100%' : 'fit-content',
          padding: type === 'modal3' ? '10px 16px' : '8px 16px',
          gap: type === 'modal3' ? '8px' : '4px',
        };

        return (
          <div className="q_singlehoice_label_cont" key={id} style={labelContainerStyle}>
            <input
              type="radio"
              value={option}
              checked={isChecked === option}
              onChange={onChange}
              className="q-singlechoice-input"
              style={{ accentColor: choiceColor }}
            />
            <label style={{ color: isChecked === option ? choiceColor : '#939393' }}>{option}</label>
          </div>
        );
      })}
    </div>
  );
};

export default SingleChoice;
