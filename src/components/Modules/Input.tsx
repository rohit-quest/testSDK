import { CSSProperties, ChangeEventHandler, KeyboardEventHandler, RefObject } from "react";
import { emailLogo, phoneLogo, userLogo, calenderIcon } from "../../assets/assetsSVG";
import "./css/input.css";

const LogoType = {
  email: emailLogo,
  phone: phoneLogo,
  text: () => <></>,
  number: phoneLogo,
  date: calenderIcon
};
export type logoType = keyof typeof LogoType;
interface PropType {
  placeholder?: string;
  type: keyof typeof LogoType;
  style?: CSSProperties | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  onKeyUp?: KeyboardEventHandler<HTMLInputElement> | undefined;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
  iconColor?: string;
  value?: string;
  ref?: RefObject<HTMLInputElement>
}

export const Input = ({ placeholder, type, style, onChange, iconColor, value, onKeyUp, onKeyDown, ref }: PropType) => {
  return (
    (type === "date") ?
    <div className="q_input_cont" style={style}>
      <label htmlFor="dateInput" className="q_input_custom_datePicker_label">
        <input
          type={type}
          name="dateInput"
          placeholder={placeholder}
          className="q_input_main_cont q_input_custom_datePicker"
          onChange={onChange}
          value={value}
        />
        {value ? <div style={{display: "inline", marginTop: "2px", color: style?.color, fontSize: style?.fontSize}} >{value}</div> : <div style={{display: "inline", color: "#8E8E8E", marginTop: "2px", fontSize: style?.fontSize}}>{placeholder}</div>}
      </label>
      {(LogoType["date"])(iconColor || "#B9B9B9")}
    </div>
    :
    <div className="q_input_cont" style={style}>
      <input
        type={type}
        name="normalInput"
        placeholder={placeholder}
        className="q_input_main_cont"
        onChange={onChange}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        value={value}
        ref={ref}
        onWheel={event => { event.currentTarget.blur(); }}
        style={style}
      />
      {(LogoType[type])(iconColor || '#B9B9B9')}
    </div>
  );
};
