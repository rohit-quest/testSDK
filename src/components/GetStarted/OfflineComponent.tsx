import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import './GetStarted.css';
import axios from 'axios';
import config from '../../config';
import QuestContext from '../QuestWrapper';
import { toast } from 'react-toastify';
import Loader from '../Login/Loader';
import Cookies from 'universal-cookie';
import { greenCheck, gsTick, helpCenter1, questLogo } from '../../assets/images';
import { arrowRight, downArroIcon, upArrow } from './Svgs';
type Props = {
  userId?: string;
  token?: string;
  questId?: string;
  cardBG?: string;
  cardHeadingColor?: string;
  cardDescColor?: string;
  completeAllStatus?: () => void;
  buttonBg?: string;
  buttonColor?: string;
  onLinkTrigger?: (url: string, index: number) => void;
  icons: Array<string>;
  uniqueUserId?: string;
  uniqueEmailId?: string;
  cardBorderColor?: string;
  heading?: string;
  description?: string;
  autoHide?: boolean;
  progressBar?: boolean;
  dropDown?: boolean;
  compltedBtnColor?: string;
  compltedBtnBgColor?: string;
  width?: string;
  showSteps?: boolean;
  arrowColor?: string;
  offlineFormatData: Array<TutorialStep>
  anouncement?: boolean;
  allowMultiClick?: boolean;
  setofflineFormatData?: Dispatch<SetStateAction<TutorialStep[]>>
};
interface TutorialStep {
  id: number;
  title: string;
  url: string;
  criteriaId?: string;
  description?: string;
  btn1?: string;
  btn2?: string;
  completed?: boolean;
  btn1Link: string;
  longDescription?: string;
  type?: string
}
function GetStarted({ userId, token, questId, cardBG, cardHeadingColor, cardDescColor, completeAllStatus, buttonBg, buttonColor, onLinkTrigger = (url:string,index:number)=>{window.location.href=url}, icons, uniqueUserId, cardBorderColor, heading, description, uniqueEmailId, autoHide, progressBar=false,dropDown=false,width="auto", compltedBtnColor="#008000",compltedBtnBgColor="#EBFFEB",offlineFormatData=[],showSteps=false,arrowColor,setofflineFormatData}: Props) {


  const { apiKey, apiSecret, entityId, featureFlags, apiType } = useContext(QuestContext.Context);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [allCriteriaCompleted, setAllCriteriaCompleted] = useState<boolean>(false);
  const [criteriaSubmit, setCriteriaSubmit] = useState<string[]>([])
  const [dropdowns,setDropdown] = useState<Array<boolean>>([]);
  const [stepsLeft,setSteps] = useState(0);
  let BACKEND_URL = apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL
  const cookies = new Cookies()
    const completedPercentage = (offlineFormatData.reduce((a,b)=>a+(b.completed?1:0),0))*100/offlineFormatData.length
  let externalUserId = cookies.get("externalUserId");
  let questUserId = cookies.get("questUserId");
  let questUserToken = cookies.get("questUserToken");
  const handleCriteriaClick = (id: any, url: string) => {
    const headers = {
      apiKey: apiKey,
      apisecret: apiSecret,
      userId: uniqueUserId? questUserId : userId,
      token: uniqueUserId? questUserToken : token,
    };

    const json = {
      criteriaId: id,
    };
    const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/verify?userId=${headers.userId}`;
    // setShowLoader(true);
    // axios
    //   .post(request, json, { headers: headers })
    //   .then((response) => {
    //     if (response.data.success) {
          offlineFormatData = offlineFormatData.map((e,i)=>{
            if(id==e.criteriaId){
              e.completed = true;
            }
            return e;
          });
          setofflineFormatData && setofflineFormatData(offlineFormatData);
          setCriteriaSubmit([...criteriaSubmit, id]);
          onLinkTrigger(url,id);
      //   } else {
      //     toast.error(response.data.error);
      //   }
      // })
      // .catch((error) => {
      //   console.error('Error:', error);
      // })
      // .finally(() => {
      //   setShowLoader(false);
      // });
  };

  useEffect(() => {
    if (entityId) {

      
      const headers = {
        apiKey: apiKey,
        apisecret: apiSecret,
        userId: userId,
        token: token,
      };

      const body = {
        externalUserId: !!uniqueUserId && uniqueUserId,
        entityId: entityId,
        email: uniqueEmailId
      }
      
      // if (!!externalUserId && !!questUserId && !!questUserToken && externalUserId == uniqueUserId) {
        // let header = {...headers, ...{userId: questUserId, token: questUserToken}}
        // fetchData(header)
      // } else if (!!uniqueUserId) {
        // axios.post(`${BACKEND_URL}api/users/external/login`, body, {headers})
        // .then((res) => {
          // let {userId, token} = res.data;
          let header = {...headers, ...{userId, token}}
          // fetchData(header)
          // const date = new Date();
          // date.setHours(date.getHours() + 12)
          // cookies.set("externalUserId", uniqueUserId, {path: "/", expires: date})
          // cookies.set("questUserId", userId, {path: "/", expires: date})
          // cookies.set("questUserToken", token, {path: "/", expires: date})
        // })
      // } else {
        // fetchData(headers)
      // }
      
      // function fetchData(header: any) {
      //   const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}?userId=${header.userId}`;
      //   // axios.get(request, { headers: header }).then((res) => {
      //     let criterias = offlineFormatData
      //   //     return {
      //   //         type: criteria?.data?.criteriaType,
      //   //         title: criteria?.data?.metadata?.linkActionName,
      //   //         url: criteria?.data?.metadata?.linkActionUrl,
      //   //         description: criteria?.data?.metadata?.description||"this is the description",
      //   //         btn1: criteria?.data?.metadata?.btn1,
      //   //         btn2: criteria?.data?.metadata?.btn2,
      //   //         btn1Link: criteria?.data?.metadata?.btn1Link,
      //   //         criteriaId: criteria?.data?.criteriaId,
      //   //         completed:   criteria?.completed,
      //   //         longDescription: criteria?.longDescription||"Be sure to check out the Quest labs community for support, plus tips & tricks from Quest users"
      //   //       };
      //   //   });
      //     const allCriteriasCompleted = offlineFormatData.every(
      //       (criteria: any) => criteria.completed === true
      //     );
      //     if (allCriteriasCompleted) {
      //       setAllCriteriaCompleted(true);
      //     }
      //     criterias = Array.isArray(criterias) ? criterias : [];
      //     if(!dropdowns.length)
      //       setDropdown(new Array(criterias.length).fill(false))
      //     let steps = criterias.length - (criterias?.filter((criteria: any) => criteria?.completed)?.length||0)
      //     setSteps(steps);
      //     setofflineFormatData([...criterias]);
      //   // });

      // }
    }
  }, [criteriaSubmit]);

  useEffect(() => {
    // if (allCriteriaCompleted) {
    //   const headers = {
    //     apiKey: apiKey,
    //     apisecret: apiSecret,
    //     userId: userId,
    //     token: token,
    //   };

    //   const body = {
    //     externalUserId: !!uniqueUserId && uniqueUserId,
    //     entityId: entityId,
    //     email: uniqueEmailId
    //   }
      
    //   if (!!externalUserId && !!questUserId && !!questUserToken && externalUserId == uniqueUserId) {
    //     let header = {...headers, ...{userId: questUserId, token: questUserToken}}
    //     fetchData(header)
    //   } else if (!!uniqueUserId) {
    //     axios.post(`${BACKEND_URL}api/users/external/login`, body, {headers})
    //     .then((res) => {
    //       let {userId, token} = res.data;
    //       let header = {...headers, ...{userId, token}}
    //       fetchData(header)
    //       const date = new Date();
    //       date.setHours(date.getHours() + 12)
    //       cookies.set("externalUserId", uniqueUserId, {path: "/", expires: date})
    //       cookies.set("questUserId", userId, {path: "/", expires: date})
    //       cookies.set("questUserToken", token, {path: "/", expires: date})
    //     })
    //   } else {
    //     fetchData(headers)
    //   }

    //   function fetchData(header: any) {
    //   const json = {
    //     userId: header.userId,
    //   };
    //   const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/claim?userId=${header.userId}`;
    //   setShowLoader(true);
    //   axios
    //     .post(request, json, { headers: header })
    //     .then((response) => {
    //       if (response.data.success) {
    //         const cookies = new Cookies();
    //         cookies.set("getStartedScreenComplete", true, { path: "/" });
    //         completeAllStatus && completeAllStatus()
    //         return;
    //       } else {
    //         toast.error(response.data.error);
    //       }
    //     })
    //     .catch((error) => {
    //       console.error('Error:', error);
    //     })
    //     .finally(() => {
    //       setShowLoader(false);
    //     });
    //   }
    // }
  }, [allCriteriaCompleted]);

  let btn2Color = buttonBg || "#252525";
  // 'radial-gradient(98.75% 3360.24% at 0% 100%, #6200EE 0%, #1F3EFE 100%)';
  let btnTextColor = buttonColor || '#FFFFFF';
  let textColor = cardHeadingColor || '#000';
  let subHeadingColor = '#8A8A8A';
  let descColor = cardDescColor || '#AFAFAF';
  let bg =
    cardBG || '#FFF';
  let borderColor = cardBorderColor || "var(--neutral-grey-200, #AFAFAF)"

  if (featureFlags[config.FLAG_CONSTRAINTS.GetStartedFlag]?.isEnabled == false) {
    return (<div></div>)
  }

  return (
    (<div style={{ padding: autoHide == true ? (!allCriteriaCompleted && offlineFormatData.length) ? '40px' : "0px" : "40px", boxSizing: "content-box",width: width }} className='get_started_box'>
      {showLoader && <Loader />}
      {(autoHide == true ? (!!offlineFormatData.length && !allCriteriaCompleted) : true) &&
        <div className="gs-heading-div">
          <div>
          <div style={{ color: textColor }} className="gs-heading">
            {heading || "Quickstart Guide"}
          </div>
          <div style={{ color: subHeadingColor }} className="gs-subheading">
            {description || "Get started with Quest and explore how Quest can take your customer engagement to the next level"}
          </div>
          </div>
        {showSteps && <div className='gs_steps'>{stepsLeft} steps left</div>}
        </div>
      }
      {(autoHide == true ? (!!offlineFormatData.length && !allCriteriaCompleted) : true) &&progressBar&&(<div className="q_gt_progress">
        <div className="q_progress_percentage">{Math.floor(completedPercentage)||0}% Completed</div>
        <div className='q_gt_progress_bar'>
          <div
            className="q_progress_bar_completed"
            style={{ width: `${completedPercentage}%` }}
          ></div>
          <div
            className="q_progress_bar_pending"
            style={{ width: `${100 - completedPercentage}%` }}
          ></div>
        </div>
      </div>)}
      <div style={{ marginTop: '30px' }} className="gs-cards-container">
        {(autoHide == true ? !allCriteriaCompleted : true) && offlineFormatData.map((e, i) =>
        dropDown?(
          <div key={i} style={{ background: bg, borderBottom:`1px solid ${borderColor}`,borderRadius: 0 }} className="gs-card-container" >
            <div className='gs_card_body' onClick={()=>setDropdown(prev=>prev.map((e,index)=> (i===index)?(!e):e )) }>
            <div className='gs_card_body_text'>
              <img className="gs-card-icon" width="24px" src={icons[i] || questLogo} alt='' />
              <div className="gs-card-text">
                <div style={{ color: textColor }} className="gs-card-head">
                  {e.title}
                </div>
                <div style={{ color: descColor }} className="gs-card-desc">
                  {e.description}
                </div>
              </div>
            </div>
            <div className="gs-card-btn-container">
              {(<div className='q_gt_dropdown' >
              {e.completed?(<img src={greenCheck} alt='' className='q_gt_arrow'/>):<img src={dropdowns[i]?upArrow(arrowColor):(e.completed?gsTick:downArroIcon(arrowColor))} alt="" className='q_gt_arrow'/>}
                </div>)}
            </div>
            </div>
            {dropdowns[i]&&(<div className='gs_card_dropdown'>
              {/* <img src={helpCenter1} alt="" className='gs_drop_img' /> */}
              <div className="gs_drop_desc">{e.longDescription}</div>
              <div className="gs_drop_btns">
              <div className="gs_start_btn" style={{background: buttonBg}} onClick={() => handleCriteriaClick(e.criteriaId, e.url)}>{e.btn2||"Start Now"}</div>
                <div className="gs_visit_btn" onClick={()=>window.location.href=e.btn1Link}>{e.btn1||"Visit WebSite"}</div>
              </div>
            </div>)}
          </div>
        ):
        (
          <div key={i}  className="gs-card-container"  onClick={() => handleCriteriaClick(e.criteriaId, e.url)}>
            <div className='gs_card_body' style={{background: cardBG}} onClick={()=>dropDown&&setDropdown(prev=>prev.map((e,index)=> (i===index)?(!e):e )) }>
            <div className='gs_card_body_text'>
              <img className="gs-card-icon" width="24px" src={icons[i] || questLogo} alt='' />
              <div className="gs-card-text">
                <div style={{ color: textColor }} className="gs-card-head">
                  {e.title}
                </div>
                <div style={{ color: descColor }} className="gs-card-desc">
                  {e.description}
                </div>
              </div>
            </div>
            <div className="gs-card-btn-container">
                <div onClick={() => handleCriteriaClick(e.criteriaId, e.url)}>
                {e.completed?(<img src={greenCheck} className='q_gt_arrow' alt='' />):(<img className='q_gt_arrow' src={arrowRight(arrowColor)} alt=''/>)}
                </div>
            </div>
            </div>
            {dropdowns[i]&&(<div className='gs_card_dropdown'>
              {/* <img src={helpCenter1} alt="" className='gs_drop_img' /> */}
              <div className="gs_drop_desc">{e.longDescription}</div>
              <div className="gs_drop_btns">
              <div className="gs_start_btn" style={{background: buttonBg}} onClick={() => handleCriteriaClick(e.criteriaId, e.url)}>{e.btn2||"Start Now"}</div>
                <div className="gs_visit_btn" onClick={()=>window.location.href=e.btn1Link}>{e.btn1||"Visit WebSite"}</div>
              </div>
            </div>)}
          </div>
        )
        )}
      </div>
    </div>)
  );
}

export default GetStarted;
