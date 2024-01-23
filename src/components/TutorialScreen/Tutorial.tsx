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
  onClose = () => { },
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { apiKey, apiSecret, entityId } = useContext(QuestContext.Context);
  const [formdata, setFormdata] = useState<TutorialStep[]>([]);
  const [gradient, setGradient] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
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
    const request = `${config.BACKEND_URL}api/entities/${entityId}/quests/${questId}/verify?userId=${userId}`;

    setShowLoader(true);
    axios
      .post(request, json, { headers: headers })
      .then((response) => {
        if (response.data.success) {
          window.open(url, 'smallWindow', 'width=500,height=500');
          const filterData = formdata.map((item) => {
            if (!item.status && item.criteriaId == id) {
              item['status'] = true
              setCompletedSteps((prevSteps) => [...prevSteps, currentStep]);
            }
            return item
          })
          setTimeout(() => {
            setFormdata(filterData)
            toast.success('Task completed');
          }, 1000);
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


  const handleSkipStep = () => {
    setMin(true);
  };

  const handleHover = (index: number, isHovered: boolean) => {
    const updatedHoverStates = [...hoverStates];
    updatedHoverStates[index] = isHovered;
    setHoverStates(updatedHoverStates);
  };

  useEffect(() => {
    if (bgColor) {
      setGradient(
        bgColor?.includes('linear-gradient') ||
        bgColor?.includes('radial-gradient')
      );
    }
    if (entityId) {
      const headers = {
        apiKey: apiKey,
        apisecret: apiSecret,
        userId: userId,
        token: token,
      };
      const request = `${config.BACKEND_URL}api/entities/${entityId}/quests/${questId}?userId=${userId}`;

      axios.get(request, { headers: headers }).then((res) => {
        let response = res.data;
        let criterias = response?.eligibilityData?.map((criteria: any) => {
          return {
            type: criteria?.data?.criteriaType,
            title: criteria?.data?.metadata?.linkActionName,
            url: criteria?.data?.metadata?.linkActionUrl,
            criteriaId: criteria?.data?.criteriaId,
            subheading: criteria?.data?.description || "You can complete your user information details by sharing the details asked in the form"
          };
        });
        criterias = Array.isArray(criterias) ? criterias : [];
        setFormdata([...criterias]);
      });
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
      className="q-parent-container"
      style={{ display: !minimze ? 'flex' : 'none' }}
    >
      {showLoader && <Loader />}
      <ToastContainer />
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
