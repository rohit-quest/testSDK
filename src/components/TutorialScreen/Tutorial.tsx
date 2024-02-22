import axios from 'axios';
import React, { useState, useEffect, useContext, CSSProperties } from 'react';
import config from '../../config';
import QuestContext from '../QuestWrapper';
import './TutorialScreen.css';
import 'react-toastify/dist/ReactToastify.css';
import General from '../../general';
import { greenCheck, pendingIcon } from '../../assets/images';
import showToast from '../toast/toastService';
import Cookies from 'universal-cookie';
import QuestLabs from '../QuestLabs';
import TopBar from '../Modules/TopBar';

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
  bgColor?: string;
  btnTextColor?: string;
  textColor?: string;
  font?: string;
  isOpen?: boolean;
  uniqueUserId?: string;
  uniqueEmailId?: string;
  iconColor?: string;
  onLinkTrigger?: (link: string) => void;
  styleConfig?: {
    Form?: CSSProperties,
    Heading?: CSSProperties,
    Description?: CSSProperties,
    topBar?: CSSProperties,
    Footer?: CSSProperties
}
 footerBackgroundColor?:string
}

const TutorialScreen: React.FC<TutorialProps> = ({
  heading,
  subheading,
  userId,
  token,
  questId,
  isOpen = true,
  uniqueUserId,
  uniqueEmailId,
  iconColor='#939393',
  onLinkTrigger = link =>{window.open(link, 'smallWindow', 'width=500,height=500');},
  styleConfig,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { apiKey, apiSecret, entityId, apiType, themeConfig } = useContext(QuestContext.Context);
  const [formdata, setFormdata] = useState<TutorialStep[]>([]);
  const [gradient, setGradient] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [hoverStates, setHoverStates] = useState(
    Array(formdata.length).fill(true)
  );

  let BACKEND_URL = apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL

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
          onLinkTrigger(url);
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

  const handleStepLoad = (index: number, height: number) => {
    const connector = document.querySelector(`#q_tutorial_progress_connector_${index}`) as HTMLElement;
    const nextContent = document.querySelector(`#q_tutorial_box_content_${index + 1}`) as HTMLElement;
    //  console.log(height,nextContent.offsetHeight ,'187')
    if (connector && nextContent) {
      let connectorHeight = (height - 32) / 2 + (nextContent.offsetHeight - 32) / 2 + 24;
  
      connector.style.height = `${connectorHeight}px`;
  
      if (index === formdata.length - 1) {
        connector.style.display = 'none';
      }
    }
  };
  

  if (!isOpen) return <></>;
console.log(styleConfig)

return (
  <div className="q-tutorial-cont"
  style={{
    background: styleConfig?.Form?.backgroundColor || themeConfig?.backgroundColor, height: styleConfig?.Form?.height || "auto", fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif" , ...styleConfig?.Form
  }}
  >
    <TopBar 
      heading={heading}
      iconColor={iconColor}
      onClose={() => {}}
      description={subheading}
      style={{
        headingStyle: { color: styleConfig?.Heading?.color || themeConfig?.primaryColor, ...styleConfig?.Heading },
        descriptionStyle: { color: styleConfig?.Description?.color || themeConfig?.secondaryColor, ...styleConfig?.Description },
      }}
    />
    <div className='q-tut-card-cont'>
      <div>
        {formdata.map((step, index) => (
          <div
            className="q_tutorial_box"
            id={`q_tutorial_box_${index}`}
            key={index}
            onClick={() => handleNextStep(step.id, step.url)}
          >
            <div className="q_tutorial_progress">
              <div className='q_tutorial_progress_img_cont' 
              style={{
                background: step.status ? '#01ff0111' : '#FBFBFB',
              }}
              >
              <img
                className="q_tutorial_progress_icon"
                style={{
                  width: step.status ? '8px' : '16px',
                  height: step.status ? '8px' : '16px',
                }}
                src={step.status ? greenCheck : pendingIcon}
                alt=""
              />
              </div>
             
              {index < formdata.length - 1 && (
                <div
                  id={`q_tutorial_progress_connector_${index}`}
                  style={{ background: step.status ? '#73DCA7' : '#EFEFEF' }}
                  className="q_tutorial_progress_connector"
                ></div>
              )}
            </div>
            <div
              id={`q_tutorial_box_content_${index}`}
              className="q_tutorial_box_content"
              ref={(ref) => ref && handleStepLoad(index, ref.offsetHeight)}
            >
              <div className="q_tut_step" style={{ color: styleConfig?.Description?.color || themeConfig?.secondaryColor }}>STEP {index + 1}</div>
              <div className="q_tut_box_head" style={{ color: styleConfig?.Heading?.color || themeConfig?.primaryColor }}>{step.title}</div>
              <div className="q_tut_box_desc" style={{ color: styleConfig?.Description?.color || themeConfig?.secondaryColor }}>{step.subheading}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <QuestLabs style={styleConfig?.Footer} />
  </div>
);

};

export default TutorialScreen;
