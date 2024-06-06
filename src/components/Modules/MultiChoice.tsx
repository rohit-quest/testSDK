import { CSSProperties, useContext, useState } from 'react';
import './css/multiChoice.css'
interface propType {
  options: string[] | [];
  checked?: string[];
  selectedStyle?: CSSProperties;
  style?: CSSProperties;
  onChange?: (e: { target: { value: string; checked: boolean; }; }) => void;
}

interface propTypeTwo {
  selectedStyle?: CSSProperties;
  options: string[] | [];
  checked?: string[];
  style?: CSSProperties;
  onChange?: (e: { target: { value: string; checked: boolean; }; }) => void;
}

const CheckBoxImg = ({ backgroundColor = "#6525B3", color = 'white' }) => (
  <svg height="18px" width="18px" viewBox="0 0 453 453" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"   fill="#000000">
    <g id="SVGRepo_bgCarrier" stroke-width="0" />
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
    <g id="SVGRepo_iconCarrier"> <g> <g> <g> <path fill={backgroundColor} d="M0,0v452.986h452.986V0H0z M156.669,361.354L56.019,209.495l27.222-13.59l71.356,92.905 l224.315-197.2l18.874,22.649L156.669,361.354z" /> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g>
  </svg>
)



export const MultiChoice = ({
  options,
  checked,
  selectedStyle = { color: "#6525B3" },
  style,
  onChange = () => { },
}: propType
) => {
  const onClick = (option: number) => {
    setCheckedState((prevState) => {
      if (prevState.includes(options[option])) {
        let ans = prevState.filter((item) => item !== options[option]);
        return ans;
      } else {
        let ans = [...prevState, options[option]];
        return ans;
      }
    }
    );
  }

  const [checkedState, setCheckedState] = useState(checked || []);

  console.log(selectedStyle)

  return (
    <div className="q_multi_choice_box">
      {options.map((option: string, id: number) => (
        <div style={{ ...style, borderColor: checkedState?.includes(option) && selectedStyle?.borderColor || style?.borderColor }} className="q_mult_choice_option" key={id} onClick={() => { onClick(id); onChange({ target: { value: option, checked: !checkedState.includes(option) } }) }}>
          {checkedState?.includes(option) ?
            (<CheckBoxImg backgroundColor={selectedStyle?.accentColor} />)
            : (<div className='q_check_box_off'></div>)}
          <p className='q_mult_choice_option_selected' style={checkedState?.includes(option) ? selectedStyle : style}>{option}</p>
        </div>
      ))}
    </div>
  );
};

export const MultiChoiceTwo = ({
  options,
  checked,
  style,
  selectedStyle,
  onChange = () => { }
}: propTypeTwo
) => {
  const onClick = (option: number) => {
    setCheckedState((prevState) => {
      if (prevState.includes(options[option])) {
        let ans = prevState.filter((item) => item !== options[option])
        return ans;
      } else {
        let ans = [...prevState, options[option]]
        return ans;
      }
    }
    );
  }

  const [checkedState, setCheckedState] = useState(checked || []);

  return (
    <div className="q_multi_choice_box_2">
      {options.map((option: string, id: number) => (
        <div style={{ ...checkedState?.includes(option) ? selectedStyle : style }}
          className={checkedState?.includes(option) ? "q_mult_choice_option_2_select" : "q_mult_choice_option_2"}
          key={id} onClick={() => { onClick(id); onChange({ target: { value: option, checked: !checkedState.includes(option) } }) }}>
          {option}
        </div>
      ))}
    </div>
  );
};

