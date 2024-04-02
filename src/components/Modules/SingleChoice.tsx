import React, { ChangeEventHandler, CSSProperties, useContext } from "react";
import './css/singlechoice.css';
import Select, { StylesConfig } from "react-select";
import QuestContext from "../QuestWrapper";

type SelectedStyle = {
  accentColor?: string,
  borderColor?: string,
  color?: string
}

interface SingleChoiceProps {
  options: string[];
  checked: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  style?: CSSProperties;
  selectedStyle?: SelectedStyle;
  type?: "modal1" | "modal2" | "modal3";
}

const SingleChoice: React.FC<SingleChoiceProps> = ({
  options,
  checked,
  onChange,
  style,
  selectedStyle = {accentColor: "#6525B3"},
  type,
}) => {

  const { themeConfig } = useContext(QuestContext.Context);


  const containerStyle: CSSProperties = {
    ...style,
    flexDirection: type === 'modal2' ? 'column' : 'row',
    gap: type === 'modal2' ? '12px' : '8px'
  };

  console.log(containerStyle,themeConfig)
  const customStyles: StylesConfig<any, false, any> = {
    control: (base) => ({
      ...base,
      background: containerStyle?.background || containerStyle?.backgroundColor || "transparent",
      fontSize: containerStyle?.fontSize || "14px",
      border: `${containerStyle?.borderWidth || "1px"} solid ${containerStyle?.borderColor || themeConfig?.borderColor || "var(--neutral-grey-100, #ECECEC)"}`,
      borderRadius: "10px",
      color: containerStyle?.color || themeConfig?.primaryColor || "black",
      fontFamily: containerStyle?.fontFamily || themeConfig?.fontFamily || "'Figtree', sans-serif",
      ...containerStyle
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: isFocused ? "#ADD8E6" : (containerStyle?.background || containerStyle?.backgroundColor || "#f9fafb") as string,
      color: containerStyle?.color || "black",
      fontSize: containerStyle?.fontSize || "14px",
      fontFamily: containerStyle?.fontFamily || themeConfig?.fontFamily || "'Figtree', sans-serif",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: (containerStyle?.background || containerStyle?.backgroundColor || "#f9fafb") as string,
    }),

    singleValue: (provided) => ({
      ...provided,
      color: containerStyle?.color || themeConfig?.primaryColor || "black",
      fontSize: containerStyle?.fontSize || "14px",
      fontFamily: containerStyle?.fontFamily || themeConfig?.fontFamily || "'Figtree', sans-serif",
    }),
  };
  return (
    (type === "modal3") ?
    <div>
      <Select
        isSearchable={true} 
        name={"selectbox"} 
        options={options.map((opt: string) => {return {value: opt, label: opt}})} 
        onChange={onChange}
        styles={customStyles}
        value={!!checked ? {value: checked, label: checked} : ""}
      />
    </div>
    :
    <div className="q-singlechoice-input-cont" style={containerStyle}>
      {options.map((option: string, id: number) => {
        const labelContainerStyle: CSSProperties = {
          border: checked === option
          ? `1px solid ${selectedStyle?.borderColor || selectedStyle?.accentColor || '#6525B3'}`
          : `1px solid ${style?.borderColor || "#EFEFEF"}`,
          width: type === 'modal2' ? '100%' : 'fit-content',
          padding: type === 'modal2' ? '10px 16px' : '8px 16px',
          gap: type === 'modal2' ? '8px' : '4px',
        };

        return (
          <div className="q_singlehoice_label_cont" key={id} style={labelContainerStyle}>
            <input
              type="radio"
              value={option}
              checked={checked === option}
              onChange={onChange}
              className="q-singlechoice-input"
              style={{ accentColor: selectedStyle?.accentColor || "#6525B3"}}
              id={option}
            />
            <label style={{ color: checked === option ? (selectedStyle?.color || selectedStyle?.accentColor || "#6525B3") : (style?.color || '#939393') }} htmlFor={option}>{option}</label>
          </div>
        );
      })}
    </div>
  );
};

export default SingleChoice;
