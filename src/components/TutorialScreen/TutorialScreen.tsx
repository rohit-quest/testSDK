import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import config from '../../config';
import QuestContext from '../QuestWrapper';
import './TutorialScreen.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../Login/Loader';

interface TutorialStep {
  id: number;
  title: string;
  url: string;
  subheading?: string;
  criteriaId?: string;
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
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { apiKey, apiSecret, entityId } = useContext(QuestContext.Context);
  const [formdata, setFormdata] = useState<TutorialStep[]>([]);
  const [gradient, setGradient] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const progressBarWidth = `${
    (completedSteps.length / formdata.length) * 100
  }%`;

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
          if (currentStep <= formdata.length - 1) {
            if (!completedSteps.includes(currentStep)) {
              setTimeout(() => {
                setCompletedSteps((prevSteps) => [...prevSteps, currentStep]);
                toast.success('Task completed');
              }, 1000);
            }
            if (currentStep !== formdata.length - 1) {
              setCurrentStep((prevStep) => prevStep + 1);
            }
          }
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

  const arrow = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: 'pointer' }}
    >
      <path
        d="M4.32373 23.7791H30.6973L18.5914 35.885L21.6178 38.9115L38.912 21.6174L21.6178 4.32324L18.5914 7.34971L30.6973 19.4556H4.32373V23.7791Z"
        fill="#141414"
      />
    </svg>
  );

  const handleSkipStep = () => {
    if (currentStep < formdata.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep <= formdata.length - 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
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
          };
        });
        criterias = Array.isArray(criterias) ? criterias : [];
        setFormdata([...criterias]);
      });
    }
  }, []);

  useEffect(() => {
    setCompletedSteps([]);
  }, [formdata]);

  return (
    <div className="q-parent-container">
      {showLoader && <Loader />}
      <ToastContainer />
      <div className="q-center">
        <div className="q-tutorial-cont">
          <div
            style={{
              height: '100px',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              fontFamily: font,
              color: textColor,
            }}
            className="q-tut-div"
          >
            <h2 className="q-tut-head">{heading}</h2>
            <p className="q-tut-subhead">{subheading}</p>
          </div>
          <div
            style={{
              ...(gradient
                ? { backgroundImage: bgColor }
                : { backgroundColor: bgColor }),
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
            }}
          >
            <div
              style={{
                width: '534px',
                padding: '2% 4%',
              }}
              className="q-tut-cont"
            >
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{ width: progressBarWidth, backgroundColor: 'black' }}
                ></div>
              </div>
              <div className="step-counter">
                <div>
                  {completedSteps.length}/{formdata.length}
                </div>
              </div>
            </div>
            <div>
              {formdata.map((step, index) => (
                <div
                  style={{
                    padding: '0% 4% 2% 4%',
                    fontFamily: font,
                    color: textColor,
                  }}
                  key={index}
                  className="q-tut-item-cont"
                >
                  <div style={{ display: 'flex' }}>
                    <label
                      style={{ paddingBottom: '2%' }}
                      className={`q-tut-label ${
                        completedSteps.includes(index)
                          ? 'completed'
                          : 'incomplete'
                      }`}
                    >
                      {completedSteps.includes(index) && '✓'}
                    </label>
                    <div className="q-tut-step">
                      <h3 className="q-tut-title">{step.title}</h3>
                      {index === currentStep && (
                        <div
                          onClick={() =>
                            handleNextStep(step.criteriaId, step.url)
                          }
                          className="q-tut-button"
                        >
                          {arrow}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ paddingBottom: '20px' }} className="q-tut-btn-cont">
              <button
                style={{
                  backgroundColor: btnColor,
                  fontFamily: font,
                  color: btnTextColor,
                }}
                className={`q-tut-btn ${currentStep === 0 ? 'disabled' : ''}`}
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                Previous
              </button>
              <button
                style={{
                  backgroundColor: btnColor,
                  fontFamily: font,
                  color: btnTextColor,
                }}
                className={`q-tut-btn ${currentStep === 0 ? 'disabled' : ''}`}
                onClick={handleSkipStep}
                disabled={currentStep === formdata.length - 1}
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
