import "./search.css";
import { questLogo } from "../../assets/images";
import { commandkeyIcon, searchIcon } from "./Svg.ts";
import { CSSProperties, useContext, useEffect, useRef, useState } from "react";
// import { getResponse } from "./response";
import QuestContext from "../QuestWrapper.tsx";
import QuestLabs from "../QuestLabs.tsx";
import { Input } from "../Modules/Input.tsx";
import General from "../../general.ts";

// import config from "../../config.ts";

type data = {
  text: string;
  icon: string;
  link: string;
  resultType?: "command" | "action" | undefined;
  description: string;
  longDescription?: string;
}[];

type BrandTheme = {
  accentColor?: string;
  background?: string;
  borderRadius?: string;
  buttonColor?: string;
  contentColor?: string;
  fontFamily?: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  titleColor?: string;
};
interface QuestThemeData {
  accentColor: string;
  theme: string;
  borderRadius: string;
  buttonColor: string;
  images: string[];
}

interface propType {
  data?: data;
  wholerScreen?: boolean;
  open?: boolean | "ON_CTRL_K_KEY";
  defaultResult?: data;
  defulatResultLength?: number;
  onSearch?: (str: string) => void;
  token?: string;
  userId?: string;
  questId?: string;
  placeholder?: string;
  icons?: Array<string>;
  sections?: boolean;
  buttonText?: string;
  searchDetails?: boolean;
  width?: string;
  onResultClick?: (link: string) => void;
  iconColor?: string;
  offlineFormatData: data;
  styleConfig?: {
    Form?: CSSProperties;
    Heading?: CSSProperties;
    Description?: CSSProperties;
    Input?: CSSProperties;
    Label?: CSSProperties;
    Footer?: {
      FooterStyle?: CSSProperties;
      FooterText?: CSSProperties;
      FooterIcon?: CSSProperties;
    };
    listHover?: {
      background?: string;
      iconBackground?: string;
      Heading?: string;
      Description?: string;
    };
    Topbar?: CSSProperties;
    CommandButton?: CSSProperties;
  };
  showFooter?: boolean;
  BrandTheme?: BrandTheme;
  QuestThemeData?: QuestThemeData;
}

export default function SearchOffline(prop: propType): JSX.Element {
  const {
    wholerScreen = true,
    defaultResult = [],
    defulatResultLength = 10,
    onSearch = (str: string) => { },
    questId = "",
    token = "",
    userId = "",
    onResultClick = (link: string) => window.open(link, "_blank"),
    styleConfig,
    showFooter = true,
    iconColor,
    offlineFormatData = [],
    BrandTheme,
    QuestThemeData,
  } = prop;
  const inputElement = useRef<HTMLInputElement>(null);
  const [searchResults, setResults] = useState<data>(defaultResult);
  const [isOpen, setOpen] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState<number>(0);
  const { themeConfig, apiType } = useContext(QuestContext.Context);
  const [data, setData] = useState<data>([]);

  let GeneralFunctions = new General("mixpanel", apiType);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isOpen && searchResults.length > 0) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedResultIndex((prev) =>
          prev === null ? 0 : Math.min(prev + 1, searchResults.length - 1)
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedResultIndex((prev) =>
          prev === null ? 0 : Math.max(prev - 1, 0)
        );
      } else if (event.key === "Enter" && selectedResultIndex !== null) {
        onResultClick(searchResults[selectedResultIndex].link);
      }
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const isCtrlPressed = (event.ctrlKey || event.metaKey) && !event.altKey;
    if (isCtrlPressed && event.key === "k") {
      GeneralFunctions.fireTrackingEvent(
        "quest_spotlight_search_offline_ctrl_k_pressed",
        "spotlight_search_offline"
      );
      event.preventDefault();
      setOpen((prev) => !prev);
    } else if (event.key == "Escape") setOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      inputElement.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    // getResponse({ apiKey, token, userId }, entityId, questId,BACKEND_URL)
    // .then((response) => {
    setData([...offlineFormatData].splice(0, defulatResultLength));
    setResults([...offlineFormatData].splice(0, defulatResultLength));
    // })
    if (prop.open === true) setOpen(true);
    inputElement.current?.focus();
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [offlineFormatData]);

  const handleSearch = (str: string) => {
    if (!data.length) return;
    const filtered = data.filter((e) =>
      e.text.toLocaleLowerCase().includes(str.toLocaleLowerCase())
    );
    setResults(filtered);
  };

  useEffect(() => {
    GeneralFunctions.fireTrackingEvent(
      "quest_spotlight_search_offline_loaded",
      "spotlight_search_offline"
    );
  }, []);

  const jsx = (
    <div
      className="q_search_bar"
      style={{
        background:
          styleConfig?.Form?.backgroundColor ||
          BrandTheme?.background ||
          themeConfig?.backgroundColor,
        height: styleConfig?.Form?.height || "auto",
        fontFamily:
          themeConfig.fontFamily ||
          BrandTheme?.fontFamily ||
          "'Figtree', sans-serif",
        borderRadius:
          styleConfig?.Form?.borderRadius ||
          QuestThemeData?.borderRadius ||
          BrandTheme?.borderRadius,
        ...styleConfig?.Form,
      }}
    >
      <div className="q_search_box" style={{ ...styleConfig?.Topbar }}>
        <img
          className="q_search_bar_icon"
          src={searchIcon(prop.iconColor)}
          alt=""
        />

        <div className="q_searchBox_input_cont">
          <div
            className="q_input_cont"
            style={{
              borderColor:
                styleConfig?.Input?.borderColor || themeConfig?.borderColor,
              padding: "0px",
            }}
          >
            <input
              type="text"
              placeholder={prop.placeholder}
              ref={inputElement}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                onSearch(e.target.value);
                handleSearch(e.target.value);
              }}
              style={{
                color:
                  styleConfig?.Input?.color ||
                  BrandTheme?.primaryColor ||
                  themeConfig.primaryColor,
                ...styleConfig?.Input,
              }}
              className="q_input_main_cont"
            />
          </div>
        </div>
        <div
          className="q_search_command_key"
          style={{ ...styleConfig?.CommandButton }}
        >
          <img
            src={commandkeyIcon(styleConfig?.CommandButton?.color || iconColor)}
            alt=""
          />
        </div>
      </div>
      <div className="q_flex_box">
        <div className="q_search_results">
          {searchResults.map(({ icon, text, link, description }, i) => (
            <div
              key={i}
              className={
                "q_search_res_box " +
                (i === selectedResultIndex && "q_heilight_search")
              }
              style={{
                background:
                  i === selectedResultIndex
                    ? styleConfig?.listHover?.background
                    : "transparent",
              }}
              onClick={() => {
                GeneralFunctions.fireTrackingEvent(
                  "quest_spotlight_search_offline_link_clicked",
                  "spotlight_search_offline"
                );
                onResultClick(link);
              }}
              onMouseEnter={() => setSelectedResultIndex(i)}
              onMouseLeave={() => setSelectedResultIndex(0)}
            >
              <div
                className="q-search-img-cont"
                style={{
                  background:
                    i === selectedResultIndex
                      ? styleConfig?.listHover?.iconBackground
                      : "#f4ebff",
                }}
              >
                <img
                  src={
                    (prop.icons?.length && prop.icons[i]) || icon || questLogo
                  }
                  className="q_search_result_icon"
                  alt={""}
                />
              </div>

              <div className="q_search_result_box">
                <div
                  style={{
                    color:
                      i === selectedResultIndex
                        ? styleConfig?.listHover?.Heading ||
                        BrandTheme?.primaryColor ||
                        themeConfig?.primaryColor ||
                        styleConfig?.Heading?.color
                        : styleConfig?.Heading?.color ||
                        BrandTheme?.primaryColor ||
                        themeConfig?.primaryColor,
                    ...styleConfig?.Heading,
                  }}
                  className="q_search_result_head"
                >
                  {text}
                </div>
                <div
                  style={{
                    color:
                      i === selectedResultIndex
                        ? styleConfig?.listHover?.Description ||
                        styleConfig?.Description?.color ||
                        BrandTheme?.secondaryColor ||
                        themeConfig?.secondaryColor
                        : styleConfig?.Description?.color ||
                        BrandTheme?.secondaryColor ||
                        themeConfig?.secondaryColor,
                    ...styleConfig?.Description,
                  }}
                  className="q_search_result_desc"
                >
                  {description || "Provide the required information"}
                </div>
              </div>
            </div>
          ))}
        </div>
        {prop.searchDetails && (
          <div className="q_search_result_details">
            <img
              src={searchResults[selectedResultIndex]?.icon || questLogo}
              alt=""
            />
            <div
              style={{
                color:
                  styleConfig?.Heading?.color ||
                  BrandTheme?.primaryColor ||
                  themeConfig.primaryColor,
                ...styleConfig?.Heading,
              }}
              className="q_search_details_head"
            >
              {searchResults[selectedResultIndex]?.text}
            </div>
            <div
              style={{
                color:
                  styleConfig?.Description?.color ||
                  BrandTheme?.secondaryColor ||
                  themeConfig.secondaryColor,
                ...styleConfig?.Description,
              }}
              className="q_search_result_desc"
            >
              {searchResults[selectedResultIndex]?.longDescription ||
                searchResults[selectedResultIndex]?.description}
            </div>
            {prop.buttonText && (
              <div className="q_search_result_button1">{prop.buttonText}</div>
            )}
            <div className="q_search_result_button2">Learn more</div>
          </div>
        )}
      </div>
      {showFooter && (
        <QuestLabs
          style={{
            ...{
              background: styleConfig?.Footer?.FooterStyle?.backgroundColor ||
                styleConfig?.Form?.backgroundColor ||
                styleConfig?.Form?.background ||
                BrandTheme?.background ||
                themeConfig?.backgroundColor,
            },
            ...styleConfig?.Footer?.FooterStyle,

          }}
          textStyle={styleConfig?.Footer?.FooterText}
          iconStyle={styleConfig?.Footer?.FooterIcon}
        />
      )}
    </div>
  );

  const sectionsJsx = (
    <div className="q_search_bar">
      <div className="q_search_box" style={{ ...styleConfig?.Topbar }}>
        <img
          className="q_search_bar_icon"
          src={searchIcon(themeConfig.secondaryColor)}
          alt=""
        />
        <div className="q_searchBox_input_cont">
          <div
            className="q_input_cont"
            style={{
              borderColor:
                styleConfig?.Input?.borderColor || themeConfig?.borderColor,
              padding: "0px",
            }}
          >
            <input
              type="text"
              placeholder={prop.placeholder}
              ref={inputElement}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                onSearch(e.target.value);
                handleSearch(e.target.value);
              }}
              style={{
                color:
                  styleConfig?.Input?.color ||
                  BrandTheme?.primaryColor ||
                  themeConfig.primaryColor,
                ...styleConfig?.Input,
              }}
              className="q_input_main_cont"
            />
          </div>
        </div>
        <div
          className="q_search_command_key"
          style={{ ...styleConfig?.CommandButton }}
        >
          <img
            src={commandkeyIcon(styleConfig?.CommandButton?.color || iconColor)}
            alt=""
          />
        </div>
      </div>
      <div className="q_flex_box">
        <div className="q_search_result_sections">
          <div className="q_search_result_section_name">Commands</div>
          <div className="">
            {searchResults.map(
              ({ icon, text, link, resultType, description }, i) =>
                resultType == "action" && (
                  <div
                    key={i}
                    className={
                      "q_search_res_box " +
                      (i === selectedResultIndex && "q_heilight_search")
                    }
                    onClick={() => {
                      window.open(link, "_blank");
                    }}
                    style={{
                      background:
                        i === selectedResultIndex
                          ? styleConfig?.listHover?.background
                          : "transparent",
                    }}
                    onMouseEnter={() => setSelectedResultIndex(i)}
                    onMouseLeave={() => setSelectedResultIndex(0)}
                  >
                    <img
                      className="q_search_result_icon"
                      src={
                        (prop.icons?.length && prop.icons[i]) ||
                        icon ||
                        questLogo
                      }
                      alt={""}
                    />
                    <div className="q_search_result_box">
                      <div
                        // style={{ color: themeConfig.primaryColor, ...styleConfig?.Heading }}

                        style={{
                          color:
                            i === selectedResultIndex
                              ? styleConfig?.listHover?.Heading ||
                              styleConfig?.Heading?.color ||
                              BrandTheme?.primaryColor ||
                              themeConfig?.primaryColor
                              : styleConfig?.Heading?.color ||
                              BrandTheme?.primaryColor ||
                              themeConfig?.primaryColor,
                          ...styleConfig?.Heading,
                        }}
                        className="q_search_result_head"
                      >
                        {text}
                      </div>
                      <div
                        style={{
                          color:
                            i === selectedResultIndex
                              ? styleConfig?.listHover?.Description ||
                              styleConfig?.Description?.color ||
                              BrandTheme?.secondaryColor ||
                              themeConfig?.secondaryColor
                              : styleConfig?.Description?.color ||
                              BrandTheme?.secondaryColor ||
                              themeConfig?.secondaryColor,
                          ...styleConfig?.Description,
                        }}
                        // style={{ color: themeConfig.secondaryColor, ...styleConfig?.Description }}
                        className="q_search_result_desc"
                      >
                        {description}
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
          <div className="q_search_result_section_name">Actions</div>
          <div className="">
            {searchResults.map(
              ({ icon, text, link, resultType, description }, i) =>
                resultType == "command" && (
                  <div
                    key={i}
                    className={
                      "q_search_res_box " +
                      (i === selectedResultIndex && "q_heilight_search")
                    }
                    onClick={() => {
                      window.open(link, "_blank");
                    }}
                    onMouseEnter={() => setSelectedResultIndex(i)}
                    onMouseLeave={() => setSelectedResultIndex(0)}
                    style={{
                      background:
                        i === selectedResultIndex
                          ? styleConfig?.listHover?.background
                          : "transparent",
                    }}
                  >
                    <img
                      src={
                        (prop.icons?.length && prop.icons[i]) ||
                        icon ||
                        questLogo
                      }
                      alt={""}
                      className="q_search_result_icon"
                    />
                    <div className="q_search_result_box">
                      <div
                        style={{
                          color:
                            i === selectedResultIndex
                              ? styleConfig?.listHover?.Heading ||
                              styleConfig?.Heading?.color ||
                              BrandTheme?.primaryColor ||
                              themeConfig?.primaryColor
                              : styleConfig?.Heading?.color ||
                              BrandTheme?.primaryColor ||
                              themeConfig?.primaryColor,
                          ...styleConfig?.Heading,
                        }}
                        className="q_search_result_head"
                      >
                        {text}
                      </div>
                      <div
                        style={{
                          color:
                            i === selectedResultIndex
                              ? styleConfig?.listHover?.Description ||
                              styleConfig?.Description?.color ||
                              BrandTheme?.secondaryColor ||
                              themeConfig?.secondaryColor
                              : styleConfig?.Description?.color ||
                              themeConfig?.secondaryColor,
                          ...styleConfig?.Description,
                        }}
                        className="q_search_result_desc"
                      >
                        {description}
                      </div>
                    </div>
                    {/* <img src={enterIcon} className="q_search_enter_icon" alt="" /> */}
                  </div>
                )
            )}
          </div>
        </div>
        {prop.searchDetails && (
          <div className="q_search_result_details">
            <img
              src={searchResults[selectedResultIndex]?.icon || questLogo}
              alt=""
            />
            <div className="q_search_details_head">
              {searchResults[selectedResultIndex]?.text}
            </div>
            <div className="q_search_result_desc">
              {searchResults[selectedResultIndex]?.longDescription ||
                searchResults[selectedResultIndex]?.description}
            </div>
            {prop.buttonText && (
              <div className="q_search_result_button1">{prop.buttonText}</div>
            )}
            <div className="q_search_result_button2">Learn more</div>
          </div>
        )}
      </div>
      {showFooter && (
        <QuestLabs
          style={{
            ...{
              background: styleConfig?.Footer?.FooterStyle?.backgroundColor ||
                styleConfig?.Form?.backgroundColor ||
                styleConfig?.Form?.background ||
                BrandTheme?.background ||
                themeConfig?.backgroundColor,
            },
            ...styleConfig?.Footer?.FooterStyle,

          }}
          textStyle={styleConfig?.Footer?.FooterText}
          iconStyle={styleConfig?.Footer?.FooterIcon}
        />
      )}
    </div>
  );

  const result = prop.sections ? sectionsJsx : jsx;

  if (prop.open === "ON_CTRL_K_KEY" && isOpen) {
    if (wholerScreen)
      return (
        <div
          className="q_search_bar_screen"
          onClick={(e) => {
            const target = e.target as Element;
            if (target.classList.contains("q_search_bar_screen"))
              setOpen(false);
          }}
        >
          {result}
        </div>
      );
    return result;
  } else if (prop.open !== true) {
    return <></>;
  } else {
    if (wholerScreen)
      return (
        <div
          onClick={(e) => {
            const target = e.target as Element;
            if (target.classList.contains("q_search_bar_screen"))
              setOpen(false);
          }}
          className="q_search_bar_screen"
        >
          {result}
        </div>
      );
    return result;
  }
}
