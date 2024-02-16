import { CSSProperties, ChangeEventHandler } from "react";
import { emailLogo, phoneLogo, userLogo } from "../../assets/assetsSVG";
import './css/input.css'

const LogoType = {
  email: emailLogo,
  phone: phoneLogo,
  text: ()=> (<></>),
  number : phoneLogo
}
export type logoType =  keyof typeof LogoType;
interface InputType {
  placeholder?: string;
  inputType?: string;
  type: keyof typeof LogoType;
  style?: CSSProperties | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  iconColor? : string ,
  value ? : string
}

export const NormalInput = ({ placeholder, inputType, type, style ,onChange, iconColor,value }: InputType) => {
  return (
    <div className="q_input_cont" style={style}>
      <input
        type={inputType}
        name="normalInput"
        placeholder={placeholder}
        className="q_input_main_cont"
        onChange ={onChange}
        value={value}
      />
      {(LogoType[type])(iconColor || '')}
    </div>
  );
}
