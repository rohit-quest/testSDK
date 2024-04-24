import "./search.css";
import { questLogo } from "../../assets/images";
import { commandkeyIcon, searchIcon } from "./Svg.ts";
import { CSSProperties, useContext, useEffect, useRef, useState } from "react";
import { getResponse } from "./response";
import QuestContext from "../QuestWrapper.tsx";
import QuestLabs from "../QuestLabs.tsx";
import config from "../../config.ts";
import General from "../../general.ts";
import axios from "axios";


type data = {
  text: string;
  icon: string;
  link: string;
  resultType: "command" | "action" | undefined;
  description: string;
  longDescription?: string;
}[];

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
  uniqueUserId?: string;
  uniqueEmailId?: string;
  styleConfig?: {
    Form?: CSSProperties;
    Heading?: CSSProperties;
    Description?: CSSProperties;
    Input?: CSSProperties;
    Label?: CSSProperties;
    Footer?: CSSProperties;
    Icon?: CSSProperties;
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
}

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
}
interface QuestThemeData {
  accentColor: string;
  theme: string;
  borderRadius: string;
  buttonColor: string;
  images: string[]

}

export default function Search(prop: propType): JSX.Element {
  const {
    wholerScreen = true,
    defaultResult = [],
    defulatResultLength = 10,
    onSearch = (str: string) => { },
    questId = "",
    token = "",
    userId = "",
    onResultClick = (link: string) => window.open(link, "_blank"),
    uniqueUserId,
    uniqueEmailId,
    styleConfig,
    showFooter = true,
    iconColor,
  } = prop;
  const inputElement = useRef<HTMLInputElement>(null);
  const [searchResults, setResults] = useState<data>(defaultResult);
  const [isOpen, setOpen] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState<number>(0);
  const { apiKey, entityId, apiType, apiSecret, themeConfig } = useContext(
    QuestContext.Context
  );

  const [questThemeData, setQuestThemeData] = useState<QuestThemeData>({
    accentColor: "",
    theme: "",
    borderRadius: "",
    buttonColor: "",
    images: []
})
const [BrandTheme, setBrandTheme] = useState<BrandTheme>({
    accentColor: "",
    background: "",
    borderRadius: "",
    buttonColor: "",
    contentColor: "",
    fontFamily: "",
    logo: "",
    primaryColor: "",
    secondaryColor: "",
    tertiaryColor: "",
    titleColor: ""
})

  let GeneralFunctions = new General('mixpanel', apiType);

  const [data, setData] = useState<data>([]);
  let BACKEND_URL =
    apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;

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

  useEffect(() => {
    GeneralFunctions.fireTrackingEvent("quest_spotlight_search_loaded", "spotlight_search");

    if (entityId && uniqueUserId) {
      const functions = new General("");
      functions.getExternalLogin({
        apiType,
        uniqueUserId,
        entityId,
        userId,
        apiKey,
        apiSecret,
        token,
        uniqueEmailId,
      });
    }
  }, []);

  const handleKeyPress = (event: KeyboardEvent) => {
    const isCtrlPressed = (event.ctrlKey || event.metaKey) && !event.altKey;
    if (isCtrlPressed && event.key === "k") {
      GeneralFunctions.fireTrackingEvent("quest_spotlight_search_ctrl_k_pressed", "spotlight_search");
      event.preventDefault();
      setOpen((prev) => !prev);
    } else if (event.key == "Escape") setOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      inputElement.current?.focus();
    }
  }, [isOpen]);

  const getTheme = async (theme: string) => {
    try {
        const request = `${BACKEND_URL}api/entities/${entityId}?userId=${userId}`;
        const response = await axios.get(request, { headers: { apiKey, userId, token } })
        setBrandTheme(response.data.data.theme.BrandTheme[theme])
    } catch (error) {
        GeneralFunctions.captureSentryException(error);
    }
}

  useEffect(() => {
    getResponse({ apiKey, token, userId }, entityId, questId, BACKEND_URL).then(
      (response) => {
        setQuestThemeData(response.questThemeData)
        setData([...response.formatData].splice(0, defulatResultLength));
        setResults([...response.formatData].splice(0, defulatResultLength));
        if(response.questThemeData?.theme){
          // getTheme(response.questThemeData?.theme) disabled for now
        }
      }
    );
    if (prop.open === true) setOpen(true);
    inputElement.current?.focus();
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleSearch = (str: string) => {
    if (!data.length) return;
    const filtered = data.filter((e) =>
      e.text.toLocaleLowerCase().includes(str.toLocaleLowerCase())
    );
    setResults(filtered);
  };

  const jsx = (
    <div
      className="q_search_bar"
      style={{
        background:
          styleConfig?.Form?.backgroundColor || BrandTheme?.background || themeConfig?.backgroundColor,
        height: styleConfig?.Form?.height || "auto",
        borderRadius: styleConfig?.Form?.borderRadius || BrandTheme?.borderRadius || questThemeData?.borderRadius,
        fontFamily: BrandTheme?.fontFamily || themeConfig.fontFamily || "'Figtree', sans-serif",
        ...styleConfig?.Form,
      }}
    >
      <div className="q_search_box" style={{...styleConfig?.Topbar}}>
        <img
          className="q_search_bar_icon"
          src={searchIcon(prop.iconColor)}
          alt=""
        />

        <div className="q_searchBox_input_cont">
          <div
            className="q_input_cont"
            style={{
              borderColor: styleConfig?.Input?.borderColor || themeConfig?.borderColor,
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
                fontFamily: BrandTheme?.fontFamily || themeConfig.fontFamily || "'Figtree', sans-serif",
                color: styleConfig?.Input?.color ||  BrandTheme?.primaryColor || themeConfig.primaryColor,
                ...styleConfig?.Input
              }}
              className="q_input_main_cont"
            />

          </div>
        </div>
        <div className="q_search_command_key" style={{...styleConfig?.CommandButton}}>
          <img src={commandkeyIcon(styleConfig?.CommandButton?.color || iconColor)} alt="" />
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
              onClick={() => {
                GeneralFunctions.fireTrackingEvent("quest_spotlight_search_link_clicked", "spotlight_search");
                onResultClick(link);
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
                        styleConfig?.Heading?.color ||
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
                color: BrandTheme?.primaryColor || themeConfig.primaryColor,
                ...styleConfig?.Heading,
              }}
              className="q_search_details_head"
            >
              {searchResults[selectedResultIndex]?.text}
            </div>
            <div
              style={{
                color: BrandTheme?.secondaryColor || themeConfig.secondaryColor,
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
      {showFooter &&  <QuestLabs style={{ background: styleConfig?.Footer?.backgroundColor || styleConfig?.Form?.backgroundColor || BrandTheme?.background || styleConfig?.Form?.background || themeConfig?.backgroundColor, ...styleConfig?.Footer }} />
}
    </div>
  );

  const sectionsJsx = (
    <div className="q_search_bar">
      <div className="q_search_box" style={{...styleConfig?.Topbar}}>
        <img
          className="q_search_bar_icon"
          src={searchIcon(BrandTheme?.secondaryColor || themeConfig.secondaryColor)}
          alt=""
        />
        <div className="q_searchBox_input_cont">
          <div
            className="q_input_cont"
            style={{
              borderColor: styleConfig?.Input?.borderColor || themeConfig?.borderColor,
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
                fontFamily: BrandTheme?.fontFamily || themeConfig.fontFamily || "'Figtree', sans-serif",
                color: styleConfig?.Input?.color || BrandTheme?.primaryColor || themeConfig.primaryColor,
                ...styleConfig?.Input
              }}
              className="q_input_main_cont"
            />

          </div>
        </div>
        <div className="q_search_command_key" style={{...styleConfig?.CommandButton}}>
          <img src={commandkeyIcon(styleConfig?.CommandButton?.color || iconColor)} alt="" />
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
                        style={{
                          color:
                            i === selectedResultIndex
                              ? styleConfig?.listHover?.Heading ||
                              BrandTheme?.primaryColor ||
                              styleConfig?.Heading?.color ||
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
                              BrandTheme?.secondaryColor ||
                              styleConfig?.Description?.color ||
                              themeConfig?.secondaryColor
                              : styleConfig?.Description?.color ||
                              BrandTheme?.secondaryColor ||
                              themeConfig?.secondaryColor,
                          ...styleConfig?.Description,
                        }}
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
                              BrandTheme?.primaryColor ||
                              styleConfig?.Heading?.color ||
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
                              BrandTheme?.secondaryColor ||
                              styleConfig?.Description?.color ||
                              themeConfig?.secondaryColor
                              : styleConfig?.Description?.color ||
                              BrandTheme?.secondaryColor ||
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
      {showFooter &&  <QuestLabs style={{ background: styleConfig?.Footer?.backgroundColor || styleConfig?.Form?.backgroundColor || BrandTheme?.background || styleConfig?.Form?.background || themeConfig?.backgroundColor, ...styleConfig?.Footer }} />
}
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
