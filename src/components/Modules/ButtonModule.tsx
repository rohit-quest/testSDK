import { CSSProperties, LegacyRef, MouseEventHandler, MutableRefObject, ReactNode } from "react";
import "./css/Button.css";
import { Loader } from "./Loader";

interface buttonType {
  children?: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  loadingText?: string;
  loaderPosition?: "right" | "left";
  loaderThickness?: string | number;
  ref?:MutableRefObject<undefined> | LegacyRef<HTMLButtonElement> | undefined
}

export const ButtonModule = ({
  disabled,
  children,
  isLoading,
  style,
  onClick,
  className,
  type,
  id,
  loadingText,
  loaderPosition = "left",
  loaderThickness,
  ref
}: buttonType) => {

  return (
    <>
      <button
        className={`${className} sdk-module-button-main-cont`}
        id={id}
        type={type}
        style={{
          fontFamily: style?.fontFamily || "'Figtree', sans-serif",
          ...style,
        }}
        onClick={onClick}
        disabled={isLoading ? isLoading : disabled}
        ref={ref}
      >
        {isLoading && loaderPosition === "left" && (
          <>
            <Loader
              loaderColor={style?.color || "white"}
              loaderSize={style?.fontSize || "14px"}
              loaderThickness={loaderThickness || "3px"}
            />{" "}
            &nbsp; {loadingText || "Wait"}{" "}
          </>
        )}

        {!isLoading && <>{children || "Button"}</>}

        {isLoading && loaderPosition === "right" && (
          <>
            {loadingText || "Wait"} &nbsp;{" "}
            <Loader
              loaderColor={style?.color || "white"}
              loaderSize={style?.fontSize || "14px"}
              loaderThickness={loaderThickness || "3px"}
            />{" "}
          </>
        )}
      </button>
    </>
  );
};
