import { CSSProperties, ChangeEventHandler } from "react";
import { emailLogo, phoneLogo, calenderIcon } from "../../assets/assetsSVG";
import './css/input.css'

const LogoType = {
  email: emailLogo,
  phone: phoneLogo,
  text: ()=> (<></>),
  number : phoneLogo,
  date: calenderIcon
}
export type logoType =  keyof typeof LogoType;
interface PropType {
  placeholder?: string;
  inputType?: string;
  type: keyof typeof LogoType;
  style?: CSSProperties | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  iconColor? : string ,
  value ? : string
}

export const Input = ({ placeholder, type, style , onChange, iconColor, value }: PropType) => {
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
        {value ? <div style={{display: "inline", marginTop: "2px"}} >{value}</div> : <div style={{display: "inline", color:"#8E8E8E", marginTop: "2px"}}>{placeholder}</div>}
      </label>
      {(LogoType["date"])(iconColor || '')}
    </div>
    :
    <div className="q_input_cont" style={style}>
      <input
        type={type}
        name="normalInput"
        placeholder={placeholder}
        className="q_input_main_cont"
        onChange={onChange}
        value={value}
        onWheel={event => { event.currentTarget.blur(); }}
      />
      {(LogoType[type])(iconColor || '')}
    </div>
  );
}
