import "./search.css";
import { enterIcon, questLogo } from '../../assets/images';
import { commandkeyIcon, searchIcon } from "./Svg.ts";
import { useContext, useEffect, useRef, useState } from "react";
import { getResponse } from "./response";
import QuestContext from "../QuestWrapper.tsx";
import QuestLabs from "../QuestLabs.tsx";

type data = { text: string, icon: string, link: string, resultType: "command" | "action" | undefined }[];

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
    userId = ""
  } = prop;
  const inputElement = useRef<HTMLInputElement>(null);
  const [searchResults, setResults] = useState<data>(defaultResult);
  const [isOpen, setOpen] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState<number>(0);
  const { apiKey, entityId } = useContext(QuestContext.Context);
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
        window.open(searchResults[selectedResultIndex].link, '_blank');
      }
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const isCtrlPressed = (event.ctrlKey || event.metaKey) && !event.altKey;
    if (isCtrlPressed && event.key === 'k') {
      event.preventDefault();
      setOpen(prev => !prev)
    }
  };

  useEffect(() => {
    if (isOpen) {
      inputElement.current?.focus();
    }
  }, [isOpen])

  useEffect(() => {
    getResponse({ apiKey, token, userId }, entityId, questId)
      .then((response) => {
        setData(response);
        setResults(response)
      })

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
        <img className="q_search_bar_icon" src={searchIcon()} alt="" />
        <input type="text" placeholder={prop.placeholder} ref={inputElement} onKeyDown={handleKeyDown} style={{ backgroundColor, color: prop.inputColor }}
          onChange={e => { onSearch(e.target.value); handleSearch(e.target.value) }} className='q_sdk_input q_search_input' />
        <div className="q_search_command_key">
          <img src={commandkeyIcon()} alt="" />
        </div>
      </div>

      <div className="q_search_results">
        {
          searchResults.map(({ icon, text, link }, i) => (
            <div key={i} className={"q_search_res_box " + (i === selectedResultIndex && "q_heilight_search")}
              onClick={() => { window.open(link, "_blank") }}
              onMouseEnter={() => setSelectedResultIndex(i)}
              onMouseLeave={() => setSelectedResultIndex(0)}
            >
              <img src={(prop.icons?.length && prop.icons[i]) || icon} alt={''} />
              <div className="q_search_link" style={{ color: i !== selectedResultIndex ? color : "white" }}>{text}</div>
              <img src={enterIcon} className="q_search_enter_icon" alt="" />
            </div>
          ))
        }
      </div>
    </div>
  )

  const sectionsJsx = (<div className="q_search_bar">
    <div className='q_search_box'>
      <img className="q_search_bar_icon" src={searchIcon()} alt="" />
      <input type="text" placeholder={prop.placeholder} ref={inputElement} onKeyDown={handleKeyDown} style={{ backgroundColor, color: prop.inputColor }}
        onChange={e => { onSearch(e.target.value); handleSearch(e.target.value) }} className='q_sdk_input q_search_input' />
      <div className="q_search_command_key">
        <img src={commandkeyIcon()} alt="" />
      </div>
    </div>
    <div className="q_search_result_sections">
      <div className="q_search_result_section_name">Commands</div>
      <div className="q_search_results">
        {
          searchResults.map(({ icon, text, link, resultType }, i) => resultType=="action"&&(
            <div key={i} className={"q_search_res_box " + (i === selectedResultIndex && "q_heilight_search")}
              onClick={() => { window.open(link, "_blank") }}
              onMouseEnter={() => setSelectedResultIndex(i)}
              onMouseLeave={() => setSelectedResultIndex(0)}
            >
              <img className="q_search_result_icon" src={(prop.icons?.length && prop.icons[i]) || icon || questLogo} alt={''} />
              <div className="q_search_link" style={{ color: i !== selectedResultIndex ? color : "white" }}>{text}</div>
              <img src={enterIcon} className="q_search_enter_icon" alt="" />
            </div>
          ))
        }
      </div>
      <div className="q_search_result_section_name">Actions</div>
      <div className="q_search_results">
        {
          searchResults.map(({ icon, text, link,resultType }, i) => resultType=="command"&&(
            <div key={i} className={"q_search_res_box " + (i === selectedResultIndex && "q_heilight_search")}
              onClick={() => { window.open(link, "_blank") }}
              onMouseEnter={() => setSelectedResultIndex(i)}
              onMouseLeave={() => setSelectedResultIndex(0)}
            >
              <img src={(prop.icons?.length && prop.icons[i]) || icon || questLogo} alt={''} className="q_search_result_icon"/>
              <div className="q_search_link" style={{ color: i !== selectedResultIndex ? color : "white" }}>{text}</div>
              <img src={enterIcon} className="q_search_enter_icon" alt="" />
            </div>
          ))
        }
      </div>
    </div>
    <QuestLabs/>
  </div>)


  if ((prop.open === "ON_CTRL_K_KEY" && isOpen)) {
    if (wholerScreen)
      return (<div className="q_search_bar_screen">{sectionsJsx}</div>)
    return sectionsJsx;
  } else if (prop.open !== true) {
    return (<></>)
  }
  else {
    if (wholerScreen)
      return (<div className="q_search_bar_screen">{sectionsJsx}</div>)
    return sectionsJsx;
  }
}
