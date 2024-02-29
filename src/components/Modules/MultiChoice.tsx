import { CSSProperties, useState } from 'react';
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
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z" fill={backgroundColor} />
      <path d="M16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill={color} />
    </svg>
)


export const MultiChoice = ({
  options,
  checked,
  selectedStyle = {color: "#6525B3"},
  style,
  onChange=()=>{},
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

  return (
    <div className="q_multi_choice_box">
      {options.map((option: string, id: number) => (
        <div style={style} className="q_mult_choice_option" key={id} onClick={() => {onClick(id); onChange({target: {value: option, checked: !checkedState.includes(option)}})}}>
          {checkedState?.includes(option) ?
            (<CheckBoxImg backgroundColor={selectedStyle?.accentColor}/>)
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
  onChange=()=>{}
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
        <div style={checkedState?.includes(option) ? selectedStyle : style}
          className={checkedState?.includes(option) ? "q_mult_choice_option_2_select" : "q_mult_choice_option_2"}
          key={id} onClick={() => {onClick(id); onChange({target: {value: option, checked: !checkedState.includes(option)}})}}>
          {option}
        </div>
      ))}
    </div>
  );
};

