import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import config from '../../config';
import QuestContext from '../QuestWrapper';
import './TutorialScreen.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../Login/Loader';
import General from '../../general';
import { greenCheck, pendingIcon } from '../../assets/images';
import showToast from '../toast/toastService';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
let externalUserId = cookies.get("externalUserId");
let questUserId = cookies.get("questUserId");
let questUserToken = cookies.get("questUserToken");
interface TutorialStep {
  id: number;
  title: string;
  url: string;
  subheading?: string;
  criteriaId?: string;
  status?: boolean
}

interface TutorialProps {
  heading: string;
  subheading: string;
  userId?: string;
  token?: string;
  questId?: string;
  btnColor?: string;
  bgColor?: string;
  btnTextColor?: string;
  textColor?: string;
  font?: string;
  isOpen?: boolean;
  onClose?: Function;
  uniqueUserId?: string;
  uniqueEmailId?: string;
}

const Tutorial: React.FC<TutorialProps> = ({
  heading,
  subheading,
  userId,
  token,
  questId,
  btnColor,
  btnTextColor,
  bgColor,
  font,
  textColor,
  isOpen = true,
  uniqueUserId,
  uniqueEmailId,
  onClose = () => { },
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { apiKey, apiSecret, entityId,apiType } = useContext(QuestContext.Context);
  const [formdata, setFormdata] = useState<TutorialStep[]>([]);
  const [gradient, setGradient] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
let BACKEND_URL = apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL

  const [hoverStates, setHoverStates] = useState(
    Array(formdata.length).fill(true)
  );

  const handleNextStep = (id: any, url: string) => {
    const headers = {
      apiKey: apiKey,
      apisecret: apiSecret,
      userId: userId,
      token: token,
    };

    const json = {
      criteriaId: id,
    };
    const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/verify?userId=${userId}`;

    setShowLoader(true);
    axios
      .post(request, json, { headers: headers })
      .then((response) => {
        if (response.data.success) {
          window.open(url, 'smallWindow', 'width=500,height=500');
          const filterData = formdata.map((item) => {
            if (!item.status && item.id == id) {
              item['status'] = true
              setCompletedSteps((prevSteps) => [...prevSteps, currentStep]);
            }
            return item
          })
            setFormdata(filterData)
            showToast.success('Task completed'); 
        } else {
          showToast.error(response.data.error);
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
              subheading: criteria?.data?.metadata?.description||"this is the description",
              id: criteria?.data?.criteriaId,
              status: criteria?.completed,
            };
          });
          setFormdata(criterias);
        });

      }
    }
  }, []);

  useEffect(() => {
    const functions = new General("");
    functions.getKeys({userid: userId|| "",apikey: apiKey,entityId,token: token||""})
  }, []);

  const [minimze, setMin] = useState(false);

  if (!isOpen) return <></>;


  return (
    <div
      onClick={()=>{
        showToast.warn({duration: 44444444})
        showToast.error({duration: 44444444})
        showToast.success({duration: 44444444})
        showToast.primary({duration: 44444444})
    
    }}
      className="q-parent-container"
      style={{ display: !minimze ? 'flex' : 'none' }}
    >
      {showLoader && <Loader />}
      <div className="q-center">
        <div className="q-tutorial-cont">
          <div
            style={{
              height: "52px",
              borderTopLeftRadius: "14px",
              borderTopRightRadius: "14px",
              fontFamily: font,
              color: textColor,
            }}
            className="q-tut-div"
          >
            <div>
              <div className="q-tut-head">{heading}</div>
              <div className="q-tut-subhead">{subheading}</div>
            </div>
            <div className="q-tut-bar-icons">
              <span
                style={{ width: "20px", height: "20px", flexShrink: 0 }}
                onClick={() => {
                  onClose();
                }}
              >
              </span>
            </div>
          </div>
          <div
            style={{
              ...(gradient
                ? { backgroundImage: bgColor }
                : { backgroundColor: bgColor }),
              borderBottomLeftRadius: "14px",
              borderBottomRightRadius: "14px",
              paddingRight: "14px",
              paddingLeft: "14px",
            }}
          >
            <div className="q-tut-cont">
            </div>
            <div>
              {formdata.map((step, index) => (
                <div className="q_tutorial_box" key={index} onClick={()=>handleNextStep(step.id,step.url)}>
                  <div className='q_tutorial_progress'>
                    <img className='q_tutorial_progress_icon' style={{background: step.status?"#01ff0111":"#FBFBFB"}} src={step.status?greenCheck:pendingIcon} alt="" />
                    {index<(formdata.length-1) &&<div style={{background: step.status?"#73DCA7":"#EFEFEF"}} className="q_tutorial_progress_connector"></div>}
                  </div>
                  <div className="q_tutorial_box_content">
                    <div className="q_tut_step">STEP {index+1}</div>
                    <div className="q_tut_box_head">{step.title}</div>
                    <div className="q_tut_box_desc">{step.subheading}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
