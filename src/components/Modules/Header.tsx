import React, { ReactNode } from "react";
import "./css/Header.css";

interface PropType {
  style?: React.CSSProperties;
  children?: ReactNode;
  className?: string;
  id?: string;
  key?: number | string;
}

const createUrl = (string = "") =>
  `data:image/svg+xml,${encodeURIComponent(string)}`;

export function Header({ style, children, className, id, key }: PropType) {
  return (
    <div
      className={`${className} sdk-module-header`}
      id={id}
      key={key}
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function HeaderTextContainer({
  children,
  style,
  className,
  id,
  key,
}: {
  style?: React.CSSProperties;
  children?: ReactNode;
  className?: string;
  id?: string;
  key?: number | string;
}) {
  return (
    <div
      className={`${className} sdk-module-header-text-cont`}
      id={id}
      key={key}
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function HeaderHeading({
  headingText,
  style,
  className,
  id,
  key,
}: {
  headingText: string;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
  key?: number | string;
}) {
  return (
    <div
      className={`${className} sdk-module-header-heading`}
      id={id}
      key={key}
      style={{ ...style }}
    >
      {headingText}
    </div>
  );
}

export function HeaderDesciption({
  descriptionText,
  style,
  className,
  id,
  key,
}: {
  descriptionText: string;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
  key?: number | string;
}) {
  return (
    <div
      style={{
        ...style,
      }}
      className={`${className} sdk-module-header-desc`}
      id={id}
      key={key}
    >
      {descriptionText}
    </div>
  );
}

interface HeaderCloseButtonPropType {
  iconColor?: string;
  onClose?: () => void;
  style?: React.CSSProperties;
  children?: ReactNode;
  className?: string;
  id?: string;
  key?: number | string;
}

export function HeaderCloseButton({
  iconColor,
  onClose,
  style,
  className,
  id,
  key,
  children,
}: HeaderCloseButtonPropType) {
  const cross = (color = "#AFAFAF", icon?: string) => (
    <img
      style={{
        ...style,
        background: "inherit",
        backgroundColor: "inherit",
      }}
      src={
        icon ||
        createUrl(`
          <svg
              width="16"
              height="16"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.4003 7.61363C24.2769 7.49003 24.1304 7.39196 23.9691 7.32505C23.8078 7.25815 23.6349 7.22371 23.4603 7.22371C23.2857 7.22371 23.1128 7.25815 22.9515 7.32505C22.7902 7.39196 22.6436 7.49003 22.5203 7.61363L16.0003 14.1203L9.4803 7.6003C9.35686 7.47686 9.21031 7.37894 9.04902 7.31213C8.88774 7.24532 8.71487 7.21094 8.5403 7.21094C8.36572 7.21094 8.19286 7.24532 8.03157 7.31213C7.87029 7.37894 7.72374 7.47686 7.6003 7.6003C7.47686 7.72374 7.37894 7.87029 7.31213 8.03157C7.24532 8.19286 7.21094 8.36572 7.21094 8.5403C7.21094 8.71487 7.24532 8.88774 7.31213 9.04902C7.37894 9.21031 7.47686 9.35686 7.6003 9.4803L14.1203 16.0003L7.6003 22.5203C7.47686 22.6437 7.37894 22.7903 7.31213 22.9516C7.24532 23.1129 7.21094 23.2857 7.21094 23.4603C7.21094 23.6349 7.24532 23.8077 7.31213 23.969C7.37894 24.1303 7.47686 24.2769 7.6003 24.4003C7.72374 24.5237 7.87029 24.6217 8.03157 24.6885C8.19286 24.7553 8.36572 24.7897 8.5403 24.7897C8.71487 24.7897 8.88774 24.7553 9.04902 24.6885C9.21031 24.6217 9.35686 24.5237 9.4803 24.4003L16.0003 17.8803L22.5203 24.4003C22.6437 24.5237 22.7903 24.6217 22.9516 24.6885C23.1129 24.7553 23.2857 24.7897 23.4603 24.7897C23.6349 24.7897 23.8077 24.7553 23.969 24.6885C24.1303 24.6217 24.2769 24.5237 24.4003 24.4003C24.5237 24.2769 24.6217 24.1303 24.6885 23.969C24.7553 23.8077 24.7897 23.6349 24.7897 23.4603C24.7897 23.2857 24.7553 23.1129 24.6885 22.9516C24.6217 22.7903 24.5237 22.6437 24.4003 22.5203L17.8803 16.0003L24.4003 9.4803C24.907 8.97363 24.907 8.1203 24.4003 7.61363Z"
                fill="${color}"
              />
            </svg>
          `)
      }
    />
  );

  return (
    <div
      className={`${className} sdk-module-close-btn`}
      id={id}
      key={key}
      style={{
        cursor: "pointer",
      }}
      onClick={() => onClose?.()}
    >
      {children ? children : cross(iconColor)}
    </div>
  );
}
