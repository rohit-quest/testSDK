import { CSSProperties, MouseEventHandler, ReactNode, useContext } from "react";
// import "./css/nextButton.css";
import "./css/Loader.css";
import QuestContext from "../../components/QuestWrapper";

interface buttonType {
  className?: string;
  id?: string;
  loaderSize?: string | number;
  loaderThickness?: string | number;
  loaderColor?: string;
}

export const Loader = ({
  className,
  id,
  loaderSize,
  loaderColor,
  loaderThickness,
}: buttonType) => {
  const { themeConfig } = useContext(QuestContext.Context);
  console.log(loaderColor);

  return (
    <div className={`${className} sdk-module-loader-spinner-box`} id={`${id}`}>
      <div
        className="sdk-module-loader-three-quarter-spinner"
        style={{
          height: loaderSize,
          width: loaderSize,
          border: `${loaderThickness || "3px"} solid ${loaderColor || "black"}`,
          borderTop: `${loaderThickness || "3px"} solid transparent`,
          borderRadius: "50%",
        }}
      ></div>
    </div>
  );
};
