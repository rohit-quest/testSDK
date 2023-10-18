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
  onClose = () => {},
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
    setMin(true);
    // if (currentStep < formdata.length - 1) {
    //   setCurrentStep((prevStep) => prevStep + 1);
    // }
  };

  const handlePrev = () => {
    if (currentStep <= formdata.length - 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
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
              height: '80px',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              fontFamily: font,
              color: textColor,
            }}
            className="q-tut-div"
          >
            <div>
              <h2 className="q-tut-head">{heading}</h2>
              <p className="q-tut-subhead">{subheading}</p>
            </div>
            <div className="q-tut-bar-icons">
              <span onClick={() => setMin(true)}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.33334 28C9.33334 27.0717 9.70208 26.1815 10.3585 25.5251C11.0148 24.8687 11.9051 24.5 12.8333 24.5H43.1667C44.0949 24.5 44.9852 24.8687 45.6415 25.5251C46.2979 26.1815 46.6667 27.0717 46.6667 28C46.6667 28.9283 46.2979 29.8185 45.6415 30.4749C44.9852 31.1313 44.0949 31.5 43.1667 31.5H12.8333C11.9051 31.5 11.0148 31.1313 10.3585 30.4749C9.70208 29.8185 9.33334 28.9283 9.33334 28Z"
                    fill="#AFAFAF"
                  />
                </svg>
              </span>
              <span
                onClick={() => {
                  onClose();
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M42.7 13.3229C42.4841 13.1066 42.2277 12.935 41.9455 12.8179C41.6632 12.7008 41.3606 12.6405 41.055 12.6405C40.7494 12.6405 40.4468 12.7008 40.1645 12.8179C39.8823 12.935 39.6259 13.1066 39.41 13.3229L28 24.7095L16.59 13.2995C16.374 13.0835 16.1175 12.9122 15.8353 12.7952C15.553 12.6783 15.2505 12.6182 14.945 12.6182C14.6395 12.6182 14.337 12.6783 14.0547 12.7952C13.7725 12.9122 13.516 13.0835 13.3 13.2995C13.084 13.5156 12.9126 13.772 12.7957 14.0543C12.6788 14.3365 12.6186 14.639 12.6186 14.9445C12.6186 15.2501 12.6788 15.5526 12.7957 15.8348C12.9126 16.1171 13.084 16.3735 13.3 16.5895L24.71 27.9995L13.3 39.4095C13.084 39.6256 12.9126 39.882 12.7957 40.1643C12.6788 40.4465 12.6186 40.749 12.6186 41.0545C12.6186 41.36 12.6788 41.6626 12.7957 41.9448C12.9126 42.2271 13.084 42.4835 13.3 42.6995C13.516 42.9156 13.7725 43.0869 14.0547 43.2038C14.337 43.3207 14.6395 43.3809 14.945 43.3809C15.2505 43.3809 15.553 43.3207 15.8353 43.2038C16.1175 43.0869 16.374 42.9156 16.59 42.6995L28 31.2895L39.41 42.6995C39.626 42.9156 39.8825 43.0869 40.1647 43.2038C40.447 43.3207 40.7495 43.3809 41.055 43.3809C41.3605 43.3809 41.663 43.3207 41.9453 43.2038C42.2275 43.0869 42.484 42.9156 42.7 42.6995C42.916 42.4835 43.0874 42.2271 43.2043 41.9448C43.3212 41.6626 43.3814 41.36 43.3814 41.0545C43.3814 40.749 43.3212 40.4465 43.2043 40.1643C43.0874 39.882 42.916 39.6256 42.7 39.4095L31.29 27.9995L42.7 16.5895C43.5867 15.7029 43.5867 14.2095 42.7 13.3229Z"
                    fill="#AFAFAF"
                  />
                </svg>
              </span>
            </div>
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
            <div className="q-tut-cont">
              <div className="q-tut-progress">
                <div className="step-counter"></div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: progressBarWidth,
                      backgroundColor: '#333333',
                    }}
                  ></div>
                </div>
                {/* <div>
                  {completedSteps.length}/{formdata.length}
                </div> */}
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
                  <div
                    style={{
                      display: 'flex',
                      gap: '20px',
                      alignItems: 'center',
                    }}
                  >
                    {!completedSteps.includes(index) ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="44"
                          height="44"
                          rx="8"
                          stroke="#E2E2E2"
                          stroke-width="4"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M28.2667 43.2L47.0667 24.4L43.3333 20.6667L28.2667 35.7333L20.6667 28.1333L16.9333 31.8667L28.2667 43.2ZM13.3333 56C11.8667 56 10.6107 55.4773 9.56534 54.432C8.52 53.3867 7.99823 52.1316 8 50.6667V13.3333C8 11.8667 8.52267 10.6107 9.568 9.56534C10.6133 8.52 11.8684 7.99823 13.3333 8H50.6667C52.1333 8 53.3893 8.52267 54.4347 9.568C55.48 10.6133 56.0018 11.8684 56 13.3333V50.6667C56 52.1333 55.4773 53.3893 54.432 54.4347C53.3867 55.48 52.1316 56.0018 50.6667 56H13.3333Z"
                          fill="black"
                        />
                      </svg>
                    )}
                    <div
                      onClick={() => handleNextStep(step.criteriaId, step.url)}
                      onMouseEnter={() => handleHover(index, true)}
                      onMouseLeave={() => handleHover(index, false)}
                      className="q-tut-step"
                    >
                      <h3 className="q-tut-title">{step.title}</h3>
                      <div
                        className="q-tut-button"
                        style={{
                          display: hoverStates[index] ? 'flex' : 'none',
                        }}
                      >
                        {arrow}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ paddingBottom: '20px' }} className="q-tut-btn-cont">
              {/* <button
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
              </button> */}
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
