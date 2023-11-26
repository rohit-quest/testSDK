import "./search.css";
import { commandkeyIcon, searchIcon, arrow, enterIcon } from '../../assets/images';
import { useEffect, useRef, useState } from "react";
import { ChatIcon, LinkIcon } from "../HelpCenter/Svg";

type data = { text: string, icon: string, link: string }[];

interface propType {
  data?: data;
  wholerScreen?: boolean;
  open?: boolean;
  color?: string;
  backgroundColor?: string;
  inputColor?: string;
  defaultResult?: data;
  defulatResultLength?: number
}

export default function Search(prop: propType): JSX.Element {
  const { data, wholerScreen = true ,color="#6E6E6E",backgroundColor="white",defaultResult=[],defulatResultLength=10} = prop;
  const inputElement = useRef<HTMLInputElement>(null);
  const [searchResults, setResults] = useState<data>(defaultResult);
  const [isOpen, setOpen] = useState(true);
  const [selectedResultIndex, setSelectedResultIndex] = useState<number>(0);

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
    inputElement.current?.focus();
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [])


  const handleSearch = (str: string) => data?.
    length && setResults(str?data
      .filter(({ text }) => text.toLocaleLowerCase().includes(str.toLocaleLowerCase())).slice(0, defulatResultLength):[])


  const jsx = (
    <div className='q_search_bar' style={{color,backgroundColor}}>
      <div className='q_search_box'>
        <img className="q_search_bar_icon" src={searchIcon} alt="" />
        <input type="text" placeholder='' ref={inputElement} onKeyDown={handleKeyDown} style={{backgroundColor,color: prop.inputColor}}  
          onChange={e => handleSearch(e.target.value)} className='q_sdk_input q_search_input' />
        <div className="q_search_scut">
          <img src={commandkeyIcon} alt="" />
          <div className="q_key_k">K</div>
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
              <img src={icon} alt={''} />
              {/* {1&& (<ChatIcon/>) && 2 &&<LinkIcon/>} */}
              <div className="q_search_link" style={{color: i!==selectedResultIndex?color:"white"}}>{text}</div>
              <img src={enterIcon} className="q_search_enter_icon" alt="" />
            </div>
          ))
        }
      </div>
    </div>
  )

  if (!prop.open || !isOpen)
    return <></>
  if (wholerScreen)
    return (<div className="q_search_bar_screen">{jsx}</div>)
  return jsx;
}
