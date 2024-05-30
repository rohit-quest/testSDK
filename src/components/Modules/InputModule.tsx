import {
  CSSProperties,
  ChangeEventHandler,
  KeyboardEventHandler,
  ReactNode,
  RefObject,
  useContext,
  useState,
} from "react";
import { emailLogo, phoneLogo, calenderIcon } from "../../assets/assetsSVG";
import QuestContext from "../../components/QuestWrapper";

import "./css/InputModule.css";

const LogoType = {
  email: emailLogo,
  phone: phoneLogo,
  text: () => <></>,
  number: phoneLogo,
  date: calenderIcon,
};

export type logoType = keyof typeof LogoType;

interface PropType {
  placeholder?: string;
  type: keyof typeof LogoType;
  style?: {
    // CSSProperties | undefined;
    emailError?: CSSProperties | undefined;
    input?: CSSProperties;
  };
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  onKeyUp?: KeyboardEventHandler<HTMLInputElement> | undefined;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
  iconColor?: string;
  value?: string;
  logoPosition?: "left" | "right" | "both";
  ref?: RefObject<HTMLInputElement>;
  //   emailErrorStyle?:CSSProperties | undefined;
  //   emailtext?:string;
  children?: ReactNode;
  className?: string;
}

export const InputModule = ({
  placeholder,
  type,
  style,
  onChange,
  iconColor,
  value,
  onKeyUp,
  onKeyDown,
  ref,
  logoPosition = "right",
  children,
  className,
}: PropType) => {
  const { themeConfig } = useContext(QuestContext.Context);

  const [isValidEmail, setIsValidEmail] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [emailCheck,setEmailCheck]=useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setEmailCheck(e.target.value)
    if (type === "email") {
      setIsValidEmail(emailRegex.test(inputValue));
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <>
      {type === "date" ? (
        <div
          className={`${className} q_modular_input_cont`}
          style={{
            borderColor: themeConfig.borderColor,
            color: themeConfig.primaryColor,
            ...style?.input,
          }}
        >
          <label
            htmlFor="dateInput"
            className="q_modular_input_custom_datePicker_label"
          >
            <input
              type={type}
              name="dateInput"
              placeholder={placeholder}
              className="q_modular_input_main_cont q_modular_input_custom_datePicker"
              onChange={onChange}
              value={value}
            />
            {value ? (
              <div
                style={{
                  display: "inline",
                  marginTop: "2px",
                  color: style?.input?.color,
                  fontSize: style?.input?.fontSize,
                  fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif",
                }}
              >
                {value}
              </div>
            ) : (
              <div
                style={{
                  display: "inline",
                  color: "#8E8E8E",
                  marginTop: "2px",
                  fontSize: style?.input?.fontSize,
                  fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif",
                }}
              >
                {placeholder}
              </div>
            )}
          </label>
          {LogoType["date"](iconColor || "#B9B9B9")}
        </div>
      ) : (
        <div
          className={`${className} q_modular_input_cont`}
          style={style?.input}
        >
          {(logoPosition == "left" || logoPosition == "both") &&
            LogoType[type](iconColor || "#B9B9B9")}
          <input
            type={type}
            name="normalInput"
            placeholder={placeholder}
            className="q_modular_input_main_cont"
            onChange={handleInputChange}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            value={value}
            ref={ref}
            onWheel={(event) => {
              event.currentTarget.blur();
            }}
            style={{
              fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif",
              color: style?.input?.color || themeConfig.primaryColor,
            }}
          />
          {(logoPosition == "right" || logoPosition == "both") &&
            LogoType[type](iconColor || "#B9B9B9")}
        </div>
      )}
      {children || (type === "email" && !isValidEmail && emailCheck.length>0) && (
        <span style={style?.emailError} className="q-modular-input-error-message">
          {children || "Invalid Email"} 
        </span>
      )}
    </>
  );
};
