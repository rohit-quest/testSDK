import React, { useState, useEffect, useContext } from 'react';
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
  offlineFormData: TutorialStep[]
}

const OfflineComponent: React.FC<TutorialProps> = ({
  heading,
  subheading,
  btnColor,
  btnTextColor,
  bgColor,
  font,
  textColor,
  isOpen = true,
  onClose = () => { },
  offlineFormData
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formdata, setFormdata] = useState<TutorialStep[]>(offlineFormData);
  const [gradient, setGradient] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [hoverStates, setHoverStates] = useState(
    Array(formdata.length).fill(true)
  );

  const handleNextStep = (id: any, url: string) => {
    // const headers = {
    //   apiKey: apiKey,
    //   apisecret: apiSecret,
    //   userId: userId,
    //   token: token,
    // };

    // const json = {
    //   criteriaId: id,
    // };
    // const request = `${config.BACKEND_URL}api/entities/${entityId}/quests/${questId}/verify?userId=${userId}`;

    setShowLoader(true);
    // axios
    //   .post(request, json, { headers: headers })
    //   .then((response) => {
    //     if (response.data.success) {
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
      setShowLoader(false)
    }, 1000);
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M8.35859 7.47455C8.11451 7.23047 7.71878 7.23047 7.4747 7.47455C7.23063 7.71863 7.23063 8.11436 7.4747 8.35843L9.11611 9.99983L7.47472 11.6412C7.23064 11.8853 7.23064 12.281 7.47472 12.5251C7.7188 12.7692 8.11453 12.7692 8.35861 12.5251L9.99999 10.8837L11.6414 12.5251C11.8854 12.7692 12.2812 12.7692 12.5252 12.5251C12.7693 12.281 12.7693 11.8853 12.5252 11.6412L10.8839 9.99983L12.5253 8.35845C12.7693 8.11437 12.7693 7.71864 12.5253 7.47457C12.2812 7.23049 11.8855 7.23049 11.6414 7.47457L9.99999 9.11595L8.35859 7.47455Z"
                    fill="#8E8E8E"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10 1.0415C5.05245 1.0415 1.04167 5.05229 1.04167 9.99984C1.04167 14.9474 5.05245 18.9582 10 18.9582C14.9476 18.9582 18.9583 14.9474 18.9583 9.99984C18.9583 5.05229 14.9476 1.0415 10 1.0415ZM2.29167 9.99984C2.29167 5.74264 5.74281 2.2915 10 2.2915C14.2572 2.2915 17.7083 5.74264 17.7083 9.99984C17.7083 14.257 14.2572 17.7082 10 17.7082C5.74281 17.7082 2.29167 14.257 2.29167 9.99984Z"
                    fill="#8E8E8E"
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
              borderBottomLeftRadius: "14px",
              borderBottomRightRadius: "14px",
              paddingRight: "14px",
              paddingLeft: "14px",
            }}
          >
            <div className="q-tut-cont">
              <div className="q-tut-progress">
                <div className="progress-bar-container">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${(completedSteps.length / offlineFormData.length) * 100}%`,
                      backgroundColor: "#333333",
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div>
              {offlineFormData.map((step, index) => (
                <div
                  style={{
                    padding: '0% 4% 2% 4%',
                    boxSizing: "content-box",
                    fontFamily: font,
                    color: textColor,
                  }}
                  key={index}
                  className="q-tut-item-cont"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      alignSelf: "stretch",
                    }}
                  >
                    <div style={{ height: '24px' }}>
                      {!step.status ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M3.33333 2.5H16.6667C17.1269 2.5 17.5 2.8731 17.5 3.33333V16.6667C17.5 17.1269 17.1269 17.5 16.6667 17.5H3.33333C2.8731 17.5 2.5 17.1269 2.5 16.6667V3.33333C2.5 2.8731 2.8731 2.5 3.33333 2.5ZM4.16667 4.16667V15.8333H15.8333V4.16667H4.16667Z"
                            fill="#AFAFAF"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M3.33333 2.5H16.6667C17.1269 2.5 17.5 2.8731 17.5 3.33333V16.6667C17.5 17.1269 17.1269 17.5 16.6667 17.5H3.33333C2.8731 17.5 2.5 17.1269 2.5 16.6667V3.33333C2.5 2.8731 2.8731 2.5 3.33333 2.5ZM9.16883 13.3333L15.0614 7.44077L13.8829 6.26227L9.16883 10.9763L6.81184 8.61925L5.63333 9.79783L9.16883 13.3333Z"
                            fill="black"
                          />
                        </svg>
                      )}
                    </div>
                    <div
                      onClick={() => handleNextStep(step.criteriaId, step.url)}
                      onMouseEnter={() => handleHover(index, true)}
                      onMouseLeave={() => handleHover(index, false)}
                      className="q-tut-step"
                    >
                      <div
                        className={`${!step.status
                          ? "q-tut-title-completed"
                          : "q-tut-title-notcompleted"
                          }`}
                        style={{
                          marginTop: "-3px",
                        }}
                      >
                        <div className="q-tut-title">{step.title}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: btnColor, color: btnTextColor }} onClick={handleSkipStep} className="q-tut-btn-cont">
              Skip
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineComponent;
