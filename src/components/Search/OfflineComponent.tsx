import "./search.css";
import { questLogo } from '../../assets/images';
import { commandkeyIcon, searchIcon } from "./Svg.ts";
import { useContext, useEffect, useRef, useState } from "react";
// import { getResponse } from "./response";
// import QuestContext from "../QuestWrapper.tsx";
import QuestLabs from "../QuestLabs.tsx";

type data = { text: string, icon: string, link: string, resultType: "command" | "action" | undefined, description: string, longDescription?: string }[];

interface propType {
  data?: data;
  wholerScreen?: boolean;
  open?: boolean | "ON_CTRL_K_KEY";
  color?: string;
  backgroundColor?: string;
  inputColor?: string;
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
  onResultClick?: (link: string)=>void;
  iconColor?: string;
  offlineFormatData: data;
}

export default function Search(prop: propType): JSX.Element {
  const {
    wholerScreen = true,
    color = "#6E6E6E", backgroundColor = "white",
    defaultResult = [],
    defulatResultLength = 10,
    onSearch = (str: string) => { },
    questId = "",
    token = "",
    userId = "",
    onResultClick =(link:string) => window.open(link,"_blank"),
    offlineFormatData=[]
  } = prop;
  const inputElement = useRef<HTMLInputElement>(null);
  const [searchResults, setResults] = useState<data>(defaultResult);
  const [isOpen, setOpen] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState<number>(0);
  // const { apiKey, entityId } = useContext(QuestContext.Context);
  const [data, setData] = useState<data>([]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isOpen && searchResults.length > 0) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedResultIndex((prev) =>
          prev === null ? 0 : Math.min(prev + 1, searchResults.length - 1)
        );
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedResultIndex((prev) => (prev === null ? 0 : Math.max(prev - 1, 0)));
      } else if (event.key === 'Enter' && selectedResultIndex !== null) {
        onResultClick(searchResults[selectedResultIndex].link);
      }
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const isCtrlPressed = (event.ctrlKey || event.metaKey) && !event.altKey;
    if (isCtrlPressed && event.key === 'k') {
      event.preventDefault();
      setOpen(prev => !prev)
    } else if (event.key == "Escape") setOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      inputElement.current?.focus();
    }
  }, [isOpen])

  useEffect(() => {
    // getResponse({ apiKey, token, userId }, entityId, questId)
      // .then((response) => {
        setData(prop.offlineFormatData);
        setResults(prop.offlineFormatData?.slice(0,5))
      // })
    if (prop.open) setOpen(true)
    inputElement.current?.focus();
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [])


  const handleSearch = (str: string) => data?.
    length && setResults(str ? data
      .filter(({ text }) => text.toLocaleLowerCase().includes(str.toLocaleLowerCase()))
      .slice(0, defulatResultLength) : data)



  const jsx = (
    <div className='q_search_bar' style={{ color, backgroundColor }}>
      <div className='q_search_box'>
        <img className="q_search_bar_icon" src={searchIcon(prop.iconColor)} alt="" />
        <input type="text" placeholder={prop.placeholder} ref={inputElement} onKeyDown={handleKeyDown} style={{ backgroundColor, color: prop.inputColor }}
          onChange={e => { onSearch(e.target.value); handleSearch(e.target.value) }} className='q_sdk_input q_search_input' />
        <div className="q_search_command_key">
          <img src={commandkeyIcon(prop.iconColor)} alt="" />
        </div>
      </div>
      <div className="q_flex_box">
        <div className="q_search_results">
          {
            searchResults.map(({ icon, text, link, description }, i) => (
              <div key={i} className={"q_search_res_box " + (i === selectedResultIndex && "q_heilight_search")}
                onClick={() => { onResultClick(link) }}
                onMouseEnter={() => setSelectedResultIndex(i)}
                onMouseLeave={() => setSelectedResultIndex(0)}
              >
                <img src={(prop.icons?.length && prop.icons[i]) || icon || questLogo} className="q_search_result_icon" alt={''} />
                <div className="q_search_result_box">
                  <div style={{color}} className="q_search_result_head">{text}</div>
                  <div style={{color}} className="q_search_result_desc">{description || "Provide the required information"}</div>
                </div>
              </div>
            ))
          }
        </div>
       {prop.searchDetails && (<div className="q_search_result_details">
          <img src={searchResults[selectedResultIndex]?.icon || questLogo} alt="" />
          <div style={{color}} className="q_search_details_head">{searchResults[selectedResultIndex]?.text}</div>
          <div style={{color}} className="q_search_result_desc">{searchResults[selectedResultIndex]?.longDescription || searchResults[selectedResultIndex]?.description}</div>
          {prop.buttonText && <div className="q_search_result_button1">{prop.buttonText}</div>}
          <div className="q_search_result_button2">Learn more</div>
        </div>)}
      </div>
      <QuestLabs backgroundColor={backgroundColor} color={prop.iconColor}/>
    </div>
  )

  const sectionsJsx = (<div className="q_search_bar">
    <div className='q_search_box'>
      <img className="q_search_bar_icon" src={searchIcon(color)} alt="" />
      <input type="text" placeholder={prop.placeholder} ref={inputElement} onKeyDown={handleKeyDown} style={{ backgroundColor, color: prop.inputColor }}
        onChange={e => { onSearch(e.target.value); handleSearch(e.target.value) }} className='q_sdk_input q_search_input' />
      <div className="q_search_command_key">
        <img src={commandkeyIcon(prop.iconColor)} alt="" />
      </div>
    </div>
    <div className="q_flex_box">
      <div className="q_search_result_sections">
        <div className="q_search_result_section_name">Commands</div>
        <div className="">
          {
            searchResults.map(({ icon, text, link, resultType, description }, i) => resultType == "action" && (
              <div key={i} className={"q_search_res_box " + (i === selectedResultIndex && "q_heilight_search")}
                onClick={() => { window.open(link, "_blank") }}
                onMouseEnter={() => setSelectedResultIndex(i)}
                onMouseLeave={() => setSelectedResultIndex(0)}
              >
                <img className="q_search_result_icon" src={(prop.icons?.length && prop.icons[i]) || icon || questLogo} alt={''} />
                <div className="q_search_result_box">
                  <div style={{color}} className="q_search_result_head">{text}</div>
                  <div style={{color}} className="q_search_result_desc">{description}</div>
                </div>
              </div>
            ))
          }
        </div>
        <div className="q_search_result_section_name">Actions</div>
        <div className="">
          {
            searchResults.map(({ icon, text, link, resultType, description }, i) => resultType == "command" && (
              <div key={i} className={"q_search_res_box " + (i === selectedResultIndex && "q_heilight_search")}
                onClick={() => { window.open(link, "_blank") }}
                onMouseEnter={() => setSelectedResultIndex(i)}
                onMouseLeave={() => setSelectedResultIndex(0)}
              >
                <img src={(prop.icons?.length && prop.icons[i]) || icon || questLogo} alt={''} className="q_search_result_icon" />
                <div className="q_search_result_box">
                  <div style={{color}} className="q_search_result_head">{text}</div>
                  <div style={{color}} className="q_search_result_desc">{description}</div>
                </div>
                {/* <img src={enterIcon} className="q_search_enter_icon" alt="" /> */}
              </div>
            ))
          }
        </div>
      </div>
      {prop.searchDetails && (<div className="q_search_result_details">
          <img src={searchResults[selectedResultIndex]?.icon || questLogo} alt="" />
          <div className="q_search_details_head">{searchResults[selectedResultIndex]?.text}</div>
          <div className="q_search_result_desc">{searchResults[selectedResultIndex]?.longDescription || searchResults[selectedResultIndex]?.description}</div>
          {prop.buttonText && <div className="q_search_result_button1">{prop.buttonText}</div>}
          <div className="q_search_result_button2">Learn more</div>
        </div>)}
    </div>
    <QuestLabs backgroundColor={backgroundColor} color={prop.iconColor}/>
  </div>)

  const result = prop.sections ? sectionsJsx : jsx;

  if ((prop.open === "ON_CTRL_K_KEY" && isOpen)) {
    if (wholerScreen)
      return (<div className="q_search_bar_screen" onClick={(e) => {
        const target = e.target as Element;
        if (target.classList.contains("q_search_bar_screen")) setOpen(false);
      }}>{result}</div>)
    return result;
  } else if (prop.open !== true) {
    return (<></>)
  }
  else {
    if (wholerScreen)
      return (<div onClick={(e) => {
        const target = e.target as Element;
        if (target.classList.contains("q_search_bar_screen")) setOpen(false);
      }} className="q_search_bar_screen">{result}</div>)
    return result;
  }
}