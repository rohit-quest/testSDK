import React, { ReactNode } from "react";
import "./css/Card.css";
import CardImageIcon from "./assets/CardImageSvg.svg";
import CardButtonSVG from "./assets/CardButton.svg";

interface CardPropType {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  selectedStyle?: React.CSSProperties;
  children?: ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  key?: number | string;
  isSelected?: boolean;
}

export function Card({
  className,
  id,
  style,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  key,
  isSelected = false,
  selectedStyle,
}: CardPropType) {

  return (
    <div
      className={`${className} sdk-module-card `}
      id={id}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      key={key}
      style={
        isSelected
          ? selectedStyle
          : {
              ...style,
            }
      }
    >
      {children}
    </div>
  );
}

export function CardImage({
  className,
  id,
  cardIcon,
  style,
  children,
  key,
}: {
  className?: string;
  id?: string;
  cardIcon?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
  key?: number | string;
}) {
  return (
    <div
      className={`${className} sdk-module-card-image-cont`}
      id={id}
      key={key}
      style={{
        ...style,
      }}
    >
      {children ? children : <img src={cardIcon || CardImageIcon} alt="" />}
    </div>
  );
}

export function CardBody({
  className,
  id,
  children,
  key,
  style,
}: {
  className?: string;
  id?: string;
  children?: ReactNode;
  key?: number | string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`${className} sdk-module-card-body`}
      id={id}
      style={{ ...style }}
      key={key}
    >
      {children}
    </div>
  );
}

export function CardBodyHeading({
  className,
  id,
  children,
  style,
  key,
}: {
  className?: string;
  id?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
  key?: number | string;
}) {
  return (
    <div
      className={`${className} sdk-module-card-body-heading`}
      id={id}
      style={{ ...style }}
      key={key}
    >
      {children}
    </div>
  );
}

export function CardBodyDescription({
  className,
  id,
  children,
  style,
  key,
}: {
  className?: string;
  id?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
  key?: number | string;
}) {
  return (
    <div
      style={{
        ...style,
      }}
      className={`${className} sdk-module-card-body-decription`}
      id={id}
      key={key}
    >
      {children}
    </div>
  );
}

export function CardButton({
  className,
  id,
  cardIcon,
  style,
  children,
  onClick,
  key,
}: {
  className?: string;
  id?: string;
  cardIcon?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  key?: number | string;
}) {
  return (
    <div
      className={`${className} sdk-module-card-button-cont`}
      id={id}
      style={{
        ...style,
      }}
      onClick={onClick}
      key={key}
    >
      {children ? children : <img src={cardIcon || CardButtonSVG} alt="" />}
    </div>
  );
}
