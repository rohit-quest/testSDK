import React, { useContext, useEffect, useState } from 'react';
import './GetStarted.css';
import axios from 'axios';
import config from '../../config';
import QuestContext from '../QuestWrapper';
import { toast } from 'react-toastify';
import Loader from '../Login/Loader';
import Cookies from 'universal-cookie';
import { downArroIcon, helpCenter1, questLogo } from '../../assets/images';
type Props = {
  userId: string;
  token: string;
  questId: string;
  cardBG?: string;
  cardHeadingColor?: string;
  cardDescColor?: string;
  completeAllStatus?: () => void;
  buttonBg?: string;
  buttonColor?: string;
  onLinkTrigger?: (url: string, index: number) => void;
  icons: Array<string>;
  uniqueUserId: string;
  uniqueEmailId?: string;
  cardBorderColor?: string;
  heading?: string;
  description?: string;
  autoHide?: boolean;
  progressBar?: boolean;
  dropDown?: boolean;
  width?: string
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
}
function GetStarted({ userId, token, questId, cardBG, cardHeadingColor, cardDescColor, completeAllStatus, buttonBg, buttonColor, onLinkTrigger = (url:string,index:number)=>{window.location.href=url}, icons, uniqueUserId, cardBorderColor, heading, description, uniqueEmailId, autoHide, progressBar=true,dropDown=true,width="auto" }: Props) {
  const svg1 = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.1199 14.9399L19.4399 15.5899C19.5999 15.9099 20.0099 16.2099 20.3499 16.2699L20.7799 16.3399C22.0899 16.5599 22.3899 17.5199 21.4599 18.4599L21.0599 18.8599C20.7899 19.1299 20.6499 19.6499 20.7299 20.0299L20.7799 20.2699C21.1399 21.8499 20.2999 22.4599 18.9299 21.6299L18.6399 21.4499C18.2899 21.2399 17.7099 21.2399 17.3599 21.4499L17.0699 21.6299C15.6899 22.4599 14.8599 21.8499 15.2199 20.2699L15.2699 20.0299C15.3499 19.6599 15.2099 19.1299 14.9399 18.8599L14.5399 18.4599C13.6099 17.5099 13.9099 16.5599 15.2199 16.3399L15.6499 16.2699C15.9999 16.2099 16.3999 15.9099 16.5599 15.5899L16.8799 14.9399C17.4999 13.6899 18.4999 13.6899 19.1199 14.9399Z"
        fill="url(#paint0_linear_15948_436)"
      />
      <path
        d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.19C2 19.83 4.17 22 7.81 22H13.09C13.44 22 13.69 21.64 13.65 21.29C13.61 20.91 13.63 20.46 13.75 19.94C13.77 19.87 13.75 19.79 13.69 19.73L13.47 19.51C12.62 18.65 12.31 17.61 12.61 16.66C12.92 15.72 13.78 15.06 14.97 14.86L15.27 14.81L15.54 14.27C16.09 13.15 16.99 12.5 18 12.5C19.01 12.5 19.91 13.15 20.46 14.27L20.61 14.58C20.68 14.73 20.82 14.83 20.98 14.86C21.07 14.88 21.16 14.9 21.25 14.92C21.6 15.01 22 14.73 22 14.36V7.81C22 4.17 19.83 2 16.19 2ZM16.26 8.96L13.95 11.94C13.66 12.31 13.25 12.55 12.78 12.6C12.32 12.66 11.85 12.53 11.49 12.24L9.66 10.82C9.59 10.76 9.51 10.76 9.47 10.77C9.43 10.77 9.36 10.79 9.3 10.87L6.92 13.96C6.77 14.15 6.55 14.25 6.32 14.25C6.16 14.25 6 14.2 5.86 14.09C5.53 13.84 5.47 13.37 5.72 13.04L8.1 9.95C8.39 9.58 8.8 9.34 9.27 9.28C9.74 9.22 10.2 9.35 10.57 9.64L12.4 11.08C12.47 11.14 12.54 11.13 12.59 11.13C12.63 11.13 12.7 11.11 12.76 11.03L15.07 8.05C15.32 7.72 15.79 7.66 16.12 7.92C16.46 8.17 16.51 8.64 16.26 8.96Z"
        fill="url(#paint1_linear_15948_436)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_15948_436"
          x1="17.9999"
          y1="14.0024"
          x2="17.9999"
          y2="22.0009"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.210806" stopColor="#FFAB7C" />
          <stop offset="1" stopColor="#FFE57D" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_15948_436"
          x1="12"
          y1="2"
          x2="12"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.210806" stopColor="#FFAB7C" />
          <stop offset="1" stopColor="#FFE57D" />
        </linearGradient>
      </defs>
    </svg>
  );
  const svg2 = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.1 7.87C21.68 7.23 22 6.4 22 5.53C22 3.58 20.42 2 18.47 2C17.6 2 16.78 2.32 16.14 2.9C14.85 2.3 13.46 2 12 2C10.57 2 9.15 2.31 7.87 2.9C7.23 2.32 6.4 2 5.53 2C3.58 2 2 3.58 2 5.53C2 6.4 2.32 7.23 2.9 7.87C2.31 9.15 2 10.57 2 12C2 13.46 2.3 14.85 2.9 16.14C2.32 16.78 2 17.6 2 18.47C2 20.42 3.58 22 5.53 22C6.4 22 7.23 21.68 7.87 21.1C9.15 21.69 10.57 22 12 22C13.46 22 14.85 21.7 16.14 21.1C16.78 21.68 17.6 22 18.47 22C20.42 22 22 20.42 22 18.47C22 17.6 21.68 16.78 21.1 16.14C21.7 14.85 22 13.46 22 12C22 10.57 21.69 9.15 21.1 7.87ZM19.68 15.17C19.57 15.13 19.46 15.09 19.35 15.06C19.18 15.02 19 14.99 18.83 14.97C18.71 14.96 18.59 14.95 18.47 14.95C16.53 14.95 14.95 16.53 14.95 18.47C14.95 18.59 14.96 18.71 14.97 18.83C14.99 19 15.02 19.18 15.06 19.35C15.09 19.46 15.13 19.57 15.17 19.68C15.17 19.71 15.18 19.74 15.2 19.77C15.21 19.8 15.22 19.83 15.23 19.86C13.22 20.7 10.82 20.71 8.77 19.86C8.78 19.83 8.79 19.8 8.8 19.77C8.82 19.74 8.83 19.71 8.83 19.68C8.87 19.57 8.91 19.46 8.94 19.35C8.98 19.18 9.01 19 9.03 18.83C9.04 18.71 9.05 18.59 9.05 18.47C9.05 16.53 7.47 14.95 5.53 14.95C5.41 14.95 5.29 14.96 5.17 14.97C5 14.99 4.82 15.02 4.65 15.06C4.54 15.09 4.43 15.13 4.32 15.17C4.29 15.17 4.26 15.18 4.23 15.2C4.2 15.21 4.17 15.22 4.14 15.23C3.71 14.22 3.5 13.13 3.5 12C3.5 10.89 3.72 9.78 4.14 8.77C4.15 8.77 4.17 8.78 4.18 8.78C4.06 8.73 3.93 8.67 3.82 8.61C3.66 8.52 3.5 8.42 3.35 8.3C3.65 8.53 3.97 8.71 4.32 8.83C4.44 8.88 4.57 8.92 4.69 8.95C4.77 8.97 4.84 8.98 4.91 8.99C5 9.01 5.08 9.02 5.17 9.03C5.29 9.04 5.41 9.05 5.53 9.05C7.47 9.05 9.05 7.47 9.05 5.53C9.05 5.41 9.04 5.29 9.03 5.17C9.02 5.08 9.01 5 8.99 4.91C8.98 4.84 8.97 4.77 8.95 4.69C8.92 4.57 8.88 4.44 8.83 4.32C8.71 3.97 8.53 3.65 8.3 3.35C8.42 3.5 8.52 3.66 8.61 3.82C8.67 3.93 8.73 4.06 8.78 4.18C8.78 4.17 8.77 4.15 8.77 4.14C10.81 3.29 13.22 3.3 15.23 4.14C15.22 4.17 15.21 4.2 15.2 4.23C15.18 4.26 15.17 4.29 15.17 4.32C15.13 4.43 15.09 4.54 15.06 4.65C15.02 4.82 14.99 5 14.97 5.17C14.96 5.29 14.95 5.41 14.95 5.53C14.95 7.47 16.53 9.05 18.47 9.05C18.59 9.05 18.71 9.04 18.83 9.03C19 9.01 19.18 8.98 19.35 8.94C19.46 8.91 19.57 8.87 19.68 8.83C19.71 8.83 19.74 8.82 19.77 8.8C19.8 8.79 19.83 8.78 19.86 8.77C20.28 9.78 20.5 10.89 20.5 12C20.5 13.13 20.29 14.22 19.86 15.23C19.83 15.22 19.8 15.21 19.77 15.2C19.74 15.18 19.71 15.17 19.68 15.17Z"
        fill="url(#paint0_linear_15550_24697)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_15550_24697"
          x1="12"
          y1="2"
          x2="12"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE57D" />
          <stop offset="1" stopColor="#79E9FF" />
        </linearGradient>
      </defs>
    </svg>
  );
  const svg3 = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
        fill="url(#paint0_linear_15948_110)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_15948_110"
          x1="12"
          y1="-0.0738636"
          x2="12"
          y2="18.6648"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF426F" />
          <stop offset="1" stopColor="#FFC3A2" />
        </linearGradient>
      </defs>
    </svg>
  );
  const svg4 = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM9.85 16.45C9.85 17.58 8.93 18.5 7.8 18.5C6.67 18.5 5.75 17.58 5.75 16.45C5.75 15.58 6.29 14.85 7.05 14.55V10.26C6.21 9.95 5.6 9.15 5.6 8.2C5.6 6.99 6.59 6 7.8 6C9.01 6 10 6.99 10 8.2C10 9.15 9.39 9.95 8.55 10.26V14.55C9.31 14.85 9.85 15.59 9.85 16.45ZM16.75 18.5C15.62 18.5 14.7 17.58 14.7 16.45C14.7 15.58 15.24 14.85 16 14.55V8.75C16 8.61 15.89 8.5 15.75 8.5H14.62L14.83 8.67C15.15 8.94 15.19 9.41 14.93 9.73C14.78 9.91 14.56 10 14.35 10C14.18 10 14.01 9.94 13.87 9.83L12.07 8.33C11.9 8.18 11.8 7.97 11.8 7.75C11.8 7.53 11.9 7.32 12.07 7.17L13.87 5.67C14.19 5.41 14.66 5.45 14.93 5.77C15.2 6.09 15.15 6.56 14.83 6.83L14.62 7H15.75C16.71 7 17.5 7.79 17.5 8.75V14.55C18.26 14.85 18.8 15.59 18.8 16.45C18.8 17.58 17.88 18.5 16.75 18.5Z"
        fill="url(#paint0_linear_15550_24717)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_15550_24717"
          x1="11.995"
          y1="2"
          x2="11.995"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#79E9FF" />
          <stop offset="1" stopColor="#FF7B9A" />
        </linearGradient>
      </defs>
    </svg>
  );
  const check = (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.6673 3.5L5.25065 9.91667L2.33398 7"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const svgArr = [svg1, svg2, svg3, svg4];

  const [formdata, setFormdata] = useState<TutorialStep[]>([]);
  const { apiKey, apiSecret, entityId, featureFlags, apiType } = useContext(QuestContext.Context);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [allCriteriaCompleted, setAllCriteriaCompleted] = useState<boolean>(false);
  const [criteriaSubmit, setCriteriaSubmit] = useState<string[]>([])
  const [dropdowns,setDropdown] = useState<Array<boolean>>([]);
  let BACKEND_URL = apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL
  const cookies = new Cookies()
    const completedPercentage = (formdata.reduce((a,b)=>a+(b.completed?1:0),0))*100/formdata.length
  let externalUserId = cookies.get("externalUserId");
  let questUserId = cookies.get("questUserId");
  let questUserToken = cookies.get("questUserToken");

  const handleCriteriaClick = (id: any, url: string) => {
    const headers = {
      apiKey: apiKey,
      apisecret: apiSecret,
      userId: questUserId,
      token: questUserToken,
    };

    const json = {
      criteriaId: id,
    };
    const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/verify?userId=${questUserId}`;
    setShowLoader(true);
    axios
      .post(request, json, { headers: headers })
      .then((response) => {
        if (response.data.success) {
          setCriteriaSubmit([...criteriaSubmit, id]);
          // window.open(url);
          // window.location.href = url;
          onLinkTrigger(url,id);
          // if (newWindow) {
          //   newWindow.focus();
          //   // window.location.reload();
          // } else {
          //   toast.error('Popup was blocked');
          // }
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setShowLoader(false);
      });
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
      
      if (!!externalUserId && !!questUserId && !!questUserToken && externalUserId == uniqueUserId) {
        let header = {...headers, ...{userId: questUserId, token: questUserToken}}
        fetchData(header)
      } else if (!!uniqueUserId) {
        axios.post(`${BACKEND_URL}api/users/external/login`, body, {headers})
        .then((res) => {
          let {userId, token} = res.data;
          let header = {...headers, ...{userId, token}}
          fetchData(header)
          const date = new Date();
          date.setHours(date.getHours() + 12)
          cookies.set("externalUserId", uniqueUserId, {path: "/", expires: date})
          cookies.set("questUserId", userId, {path: "/", expires: date})
          cookies.set("questUserToken", token, {path: "/", expires: date})
        })
      } else {
        fetchData(headers)
      }
      
      function fetchData(header: any) {
        const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}?userId=${header.userId}`;
  
        axios.get(request, { headers: header }).then((res) => {
          let response = res.data;
          let criterias = response?.eligibilityData?.map((criteria: any) => {
            return {
              type: criteria?.data?.criteriaType,
              title: criteria?.data?.metadata?.linkActionName,
              url: criteria?.data?.metadata?.linkActionUrl,
              description: criteria?.data?.metadata?.description||"this is the description",
              btn1: criteria?.data?.metadata?.btn1,
              btn2: criteria?.data?.metadata?.btn2,
              btn1Link: criteria?.data?.metadata?.btn1Link,
              criteriaId: criteria?.data?.criteriaId,
              completed: criteria?.completed,
              longDescription: criteria?.longDescription||"Be sure to check out the Quest labs community for support, plus tips & tricks from Quest users"
            };
          });
          const allCriteriasCompleted = criterias.every(
            (criteria: any) => criteria.completed === true
          );
          if (allCriteriasCompleted) {
            setAllCriteriaCompleted(true);
          }
          criterias = Array.isArray(criterias) ? criterias : [];
          setDropdown(new Array(criterias.length).fill(false))
          setFormdata([...criterias]);
        });

      }
    }
  }, [criteriaSubmit]);

  useEffect(() => {
    if (allCriteriaCompleted) {
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
      
      if (!!externalUserId && !!questUserId && !!questUserToken && externalUserId == uniqueUserId) {
        let header = {...headers, ...{userId: questUserId, token: questUserToken}}
        fetchData(header)
      } else if (!!uniqueUserId) {
        axios.post(`${BACKEND_URL}api/users/external/login`, body, {headers})
        .then((res) => {
          let {userId, token} = res.data;
          let header = {...headers, ...{userId, token}}
          fetchData(header)
          const date = new Date();
          date.setHours(date.getHours() + 12)
          cookies.set("externalUserId", uniqueUserId, {path: "/", expires: date})
          cookies.set("questUserId", userId, {path: "/", expires: date})
          cookies.set("questUserToken", token, {path: "/", expires: date})
        })
      } else {
        fetchData(headers)
      }

      function fetchData(header: any) {
      const json = {
        userId: header.userId,
      };
      const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/claim?userId=${header.userId}`;
      setShowLoader(true);
      axios
        .post(request, json, { headers: header })
        .then((response) => {
          if (response.data.success) {
            const cookies = new Cookies();
            cookies.set("getStartedScreenComplete", true, { path: "/" });
            completeAllStatus && completeAllStatus()
            return;
          } else {
            toast.error(response.data.error);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        })
        .finally(() => {
          setShowLoader(false);
        });
      }
    }
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
    <div style={{ padding: autoHide == true ? (!allCriteriaCompleted && formdata.length) ? '40px' : "0px" : "40px", boxSizing: "content-box",width: width }} className='get_started_box'>
      {showLoader && <Loader />}
      {(autoHide == true ? (!!formdata.length && !allCriteriaCompleted) : true) &&
        <div className="gs-heading-div">
          <div style={{ color: textColor }} className="gs-heading">
            {heading || "Quickstart Guide"}
          </div>
          <div style={{ color: subHeadingColor }} className="gs-subheading">
            {description || "Get started with Quest and explore how Quest can take your customer engagement to the next level"}
          </div>
        </div>
      }
      {progressBar&&(<div className="q_gt_progress">
        <div className="q_progress_percentage">{completedPercentage}% Completed</div>
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
        {(autoHide == true ? !allCriteriaCompleted : true) && formdata.map((e, i) =>
        (
          <div key={i} style={{ background: bg, borderColor }} className="gs-card-container">
            <div className='gs_card_body'>
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
              <div className="gs-card-btn1">
                <a href={e.btn1Link} target='_blank' style={{ color: descColor }}>
                  {e.btn1}
                </a>
              </div>
              {
                dropDown ? (<div className='q_gt_dropdown' onClick={()=>setDropdown(prev=>prev.map((e,index)=> (i===index)?(!e):e )) }>
                  <img src={downArroIcon} alt="" />
                </div>) : (<div
                  onClick={() => handleCriteriaClick(e.criteriaId, e.url)}
                  style={{ background: btn2Color, color: btnTextColor }}
                  className="gs-card-btn2"
                >
                  {e.completed ? check : !!e.btn2 ? e.btn2 : "Let's go!"}
                </div>)
              }
            </div>
            </div>
            {dropdowns[i]&&(<div className='gs_card_dropdown'>
              <img src={helpCenter1} alt="" className='gs_drop_img' />
              <div className="gs_drop_desc">{e.longDescription}</div>
              <div className="gs_drop_btns">
                <div className="gs_start_btn" onClick={() => handleCriteriaClick(e.criteriaId, e.url)}>Start Now</div>
                <div className="gs_visit_btn">Visit WebSite</div>
              </div>
            </div>)}
          </div>
        )
        )}
      </div>
    </div>
  );
}

export default GetStarted;
