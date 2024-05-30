import { CSSProperties, ReactNode } from "react";
import "./css/Search.css";
import defaultSearchIcon from "../Modules/assets/SearchIcon.svg";

interface Proptype {
  style?: CSSProperties;
  children?: ReactNode;
  key?: string | number;
  className?: string;
  id?: string;
}

export const Search = ({ style, children, className, id, key }: Proptype) => {
  return (
    <div
      className={`${className} q_search_module_cont`}
      style={{ ...style }}
      key={key}
      id={id}
    >
      {children}
    </div>
  );
};

export const SearchIcon = ({
  style,
  searchIcon,
}: {
  style?: CSSProperties;
  searchIcon?: string;
}) => {
  return (
    <img
      src={searchIcon || defaultSearchIcon}
      alt=""
      style={{
        ...style,
      }}
    />
  );
};
