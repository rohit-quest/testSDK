import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import General from "../../../general";
import "./css/Feedback.css";
import Modal from "../Modal";
import QuestLabsFooter from "../QuestLabsFooterModule";

import {
  Header,
  HeaderCloseButton,
  HeaderDesciption,
  HeaderHeading,
  HeaderTextContainer,
} from "../Header";

import {
  Card,
  CardBody,
  CardBodyDescription,
  CardBodyHeading,
  CardButton,
  CardImage,
} from "../Card";

import { ComponentBody } from "../ComponentBody";
import { Question } from "../Question";
import { InputModule } from "../InputModule";
import { OptionsContainer } from "../OptionsContainer";
import { Option } from "../Option";
import { ButtonModule } from "../ButtonModule";
import { LabelModule } from "../LabelModule";
import { TextAreaModule } from "../TextAreaModule";
import { InputRating } from "../InputRating";
import { InputImage } from "../InputImage";
import { Loader } from "../Loader";

const cross = (color = "#AFAFAF", onClick?: () => void) => (
  <div
    onClick={() => onClick?.()}
    style={{
      cursor: "pointer",
      padding: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "4px",
    }}
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.4003 7.61363C24.2769 7.49003 24.1304 7.39196 23.9691 7.32505C23.8078 7.25815 23.6349 7.22371 23.4603 7.22371C23.2857 7.22371 23.1128 7.25815 22.9515 7.32505C22.7902 7.39196 22.6436 7.49003 22.5203 7.61363L16.0003 14.1203L9.4803 7.6003C9.35686 7.47686 9.21031 7.37894 9.04902 7.31213C8.88774 7.24532 8.71487 7.21094 8.5403 7.21094C8.36572 7.21094 8.19286 7.24532 8.03157 7.31213C7.87029 7.37894 7.72374 7.47686 7.6003 7.6003C7.47686 7.72374 7.37894 7.87029 7.31213 8.03157C7.24532 8.19286 7.21094 8.36572 7.21094 8.5403C7.21094 8.71487 7.24532 8.88774 7.31213 9.04902C7.37894 9.21031 7.47686 9.35686 7.6003 9.4803L14.1203 16.0003L7.6003 22.5203C7.47686 22.6437 7.37894 22.7903 7.31213 22.9516C7.24532 23.1129 7.21094 23.2857 7.21094 23.4603C7.21094 23.6349 7.24532 23.8077 7.31213 23.969C7.37894 24.1303 7.47686 24.2769 7.6003 24.4003C7.72374 24.5237 7.87029 24.6217 8.03157 24.6885C8.19286 24.7553 8.36572 24.7897 8.5403 24.7897C8.71487 24.7897 8.88774 24.7553 9.04902 24.6885C9.21031 24.6217 9.35686 24.5237 9.4803 24.4003L16.0003 17.8803L22.5203 24.4003C22.6437 24.5237 22.7903 24.6217 22.9516 24.6885C23.1129 24.7553 23.2857 24.7897 23.4603 24.7897C23.6349 24.7897 23.8077 24.7553 23.969 24.6885C24.1303 24.6217 24.2769 24.5237 24.4003 24.4003C24.5237 24.2769 24.6217 24.1303 24.6885 23.969C24.7553 23.8077 24.7897 23.6349 24.7897 23.4603C24.7897 23.2857 24.7553 23.1129 24.6885 22.9516C24.6217 22.7903 24.5237 22.6437 24.4003 22.5203L17.8803 16.0003L24.4003 9.4803C24.907 8.97363 24.907 8.1203 24.4003 7.61363Z"
        fill={color}
      />
    </svg>
  </div>
);

type BrandTheme = {
  accentColor?: string;
  background?: string;
  borderRadius?: string;
  buttonColor?: string;
  contentColor?: string;
  fontFamily?: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  titleColor?: string;
};

interface QuestThemeData {
  accentColor: string;
  theme: string;
  borderRadius: string;
  buttonColor: string;
  images: string[];
}

type optionType =
  | "ContactUs"
  | "RequestFeature"
  | "ReportBug"
  | "GeneralFeedback";

interface feedbackCompProps {
  userId?: string;
  token?: string;
  questIds?: string[];
  answer?: any;
  setAnswer?: any;
  getAnswers?: any;
  btnTextColor?: string;
  contactUrl?: string;
  isOpen: boolean;
  onClose?: () => void;
  backgroundColor?: string;

  GeneralFeedback?: {
    heading?: string;
    description?: string;
    formHeading?: string;
    formDescription?: string;
    iconUrl?: string;
  };

  tickBg?: string;
  uniqueUserId?: string;
  uniqueEmailId?: string;
  descriptions?: Record<optionType, string>;
  backBtn?: boolean;
  iconColor?: string;
  showFooter?: boolean;

  SecondaryButtonText?: string;
  StarSize?: number;
  styleConfig?: {
    Form?: React.CSSProperties;
    Heading?: React.CSSProperties;
    Description?: React.CSSProperties;
    Input?: React.CSSProperties;
    Label?: React.CSSProperties;
    EmailError?: {
      text?: string;
      errorStyle?: React.CSSProperties;
    };
    TopBar?: React.CSSProperties;
    TextArea?: React.CSSProperties;
    PrimaryButton?: React.CSSProperties;
    SecondaryButton?: React.CSSProperties;
    Modal?: React.CSSProperties;
    Footer?: React.CSSProperties;
    listHeading?: React.CSSProperties;
    listDescription?: React.CSSProperties;
    Card?: React.CSSProperties;
    Star?: {
      Style?: React.CSSProperties;
      PrimaryColor?: string;
      SecondaryColor?: string;
      Size?: number;
    };
    listHover?: {
      background?: string;
      iconBackground?: string;
      iconColor?: string;
      Heading?: string;
      Description?: string;
      IconSize?: string;
      Icon?: React.CSSProperties;
    };
    ThanksPopup?: {
      Style?: React.CSSProperties;
      Heading?: React.CSSProperties;
      Description?: React.CSSProperties;
      ShowFooter?: boolean;
      Icon?: React.CSSProperties;
    };
  };
  enableVariation?: boolean;
  offlineFormData: FormDataItem[][];
  BrandTheme?: BrandTheme;
  QuestThemeData?: QuestThemeData;
}
interface FormDataItem {
  type?: string;
  question?: string;
  options?: [string];
  criteriaId?: string;
  required?: boolean;
  placeholder?: string;
}
interface FileProp {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  webkitRelativePath: string;
}
const FeedbackWorkflow: React.FC<feedbackCompProps> = ({
  contactUrl,
  isOpen,
  onClose,
  GeneralFeedback,
  SecondaryButtonText = "Go to home!",
  iconColor = "#939393",
  styleConfig = {},
  offlineFormData,
  showFooter = true,
  BrandTheme,
  QuestThemeData,
}) => {
  const [selectedOption, setSelectedOption] = useState<optionType | null>(null);
  const [selectedQuest, setSelectedQuest] = useState<string | null>(null);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);

  const themeConfig = {};
  const [cardHovered, setCardHovered] = useState([false, false, false, false]);
  const [answer, setAnswer] = useState<Record<string, string>>({});

  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [screenshot, setScreenshot] = useState<FileProp | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<FileProp | null>(null);

  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let target = e.target as Element;
    if (ref.current?.contains(target)) {
    } else {
      onClose && onClose();
    }
  };

  const ref = React.useRef<HTMLDivElement>(null);

  const thanks = (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipRule="url(#clip0_4046_146)">
        <path
          d="M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80Z"
          fill={
            styleConfig?.ThanksPopup?.Icon?.backgroundColor ||
            "url(#paint0_linear_4046_146)"
          }
        />
        <path
          d="M48.4167 79.0566C49.1837 78.9078 49.9463 78.7367 50.7033 78.5432C51.987 78.1844 53.2519 77.7617 54.4933 77.2766C55.7363 76.7955 56.9545 76.2526 58.1433 75.6499C59.3325 75.0449 60.4906 74.3807 61.6133 73.6599C62.7348 72.939 63.8195 72.1625 64.8633 71.3332C65.9091 70.5029 66.9125 69.6207 67.87 68.6899C68.8259 67.7614 69.7348 66.7858 70.5933 65.7666C71.4526 64.7465 72.2603 63.684 73.0133 62.5832C73.7662 61.4843 74.4638 60.3484 75.1033 59.1799C75.743 58.0097 76.3237 56.8082 76.8433 55.5799C77.3635 54.3514 77.8218 53.0976 78.2167 51.8232C78.5548 50.7075 78.8439 49.5776 79.0833 48.4366L55.3167 24.6732C53.3096 22.6573 50.9236 21.0581 48.2961 19.9677C45.6686 18.8774 42.8514 18.3174 40.0067 18.3199C37.1594 18.3168 34.3395 18.8765 31.7092 19.9668C29.0789 21.0572 26.6901 22.6566 24.68 24.6732C22.6649 26.6839 21.0661 29.0724 19.9753 31.7018C18.8845 34.3312 18.323 37.1499 18.323 39.9966C18.323 42.8433 18.8845 45.662 19.9753 48.2914C21.0661 50.9208 22.6649 53.3092 24.68 55.3199L48.4167 79.0566Z"
          fill={
            styleConfig?.ThanksPopup?.Icon?.backgroundColor ||
            "url(#paint0_linear_4046_146)"
          }
        />
        <path
          d="M40.0033 18.3232C45.5433 18.3232 51.0833 20.4398 55.3233 24.6765C57.3384 26.6872 58.9372 29.0756 60.028 31.705C61.1188 34.3344 61.6803 37.1532 61.6803 39.9998C61.6803 42.8465 61.1188 45.6653 60.028 48.2947C58.9372 50.9241 57.3384 53.3125 55.3233 55.3232C53.3126 57.3383 50.9242 58.937 48.2948 60.0279C45.6654 61.1187 42.8467 61.6802 40 61.6802C37.1533 61.6802 34.3346 61.1187 31.7052 60.0279C29.0758 58.937 26.6873 57.3383 24.6767 55.3232C22.6615 53.3125 21.0628 50.9241 19.972 48.2947C18.8811 45.6653 18.3196 42.8465 18.3196 39.9998C18.3196 37.1532 18.8811 34.3344 19.972 31.705C21.0628 29.0756 22.6615 26.6872 24.6767 24.6765C26.6867 22.6599 29.0756 21.0604 31.7059 19.9701C34.3361 18.8798 37.156 18.3201 40.0033 18.3232ZM49.87 33.3298C49.5544 33.3601 49.2539 33.4791 49.0033 33.6732L36.8233 42.8065L31.18 37.1665C29.9566 35.8932 27.5467 38.2998 28.8233 39.5232L35.49 46.1898C35.779 46.4631 36.1536 46.6281 36.5504 46.6566C36.9471 46.6852 37.3415 46.5756 37.6667 46.3465L51 36.3465C52.12 35.5298 51.43 33.3532 50.0433 33.3332C49.9867 33.3303 49.9299 33.3303 49.8733 33.3332L49.87 33.3298Z"
          fill="white"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_4046_146"
          x1="0.320001"
          y1="80"
          x2="87.5968"
          y2="71.0629"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#9035FF" />
          <stop offset="1" stop-color="#0065FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4046_146"
          x1="18.566"
          y1="79.0566"
          x2="84.8526"
          y2="72.2662"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#9035FF" />
          <stop offset="1" stop-color="#0065FF" />
        </linearGradient>
        <clipPath id="clip0_4046_146">
          <rect width="80" height="80" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  let GeneralFunctions = new General("mixpanel", "STAGING");
  useEffect(() => {
    GeneralFunctions.fireTrackingEvent(
      "quest_feedback_workflow_offline_loaded",
      "feedback_workflow_offline"
    );
  }, []);

  const handleOptionClick = (option: optionType) => {
    if (option === "ContactUs" && contactUrl) {
      window.open(contactUrl, "_blank");
    } else {
      setSelectedOption(option);
      // setSelectedQuest();
      setAnswer({});
    }
  };

  function returnAnswers(index: number) {
    GeneralFunctions.fireTrackingEvent(
      `quest_feedback_workflow_offline${selectedOption}_form_submitted`,
      `feedback_workflow_offline${selectedOption}_form`
    );
    if (Object.keys(answer).length !== 0) {
      const ansArr = offlineFormData[index]?.map((ans: any) => ({
        question: ans?.question || "",
        answer: [answer[ans?.criteriaId] || ""],
        criteriaId: ans?.criteriaId || "",
      }));

      showToast.success({ text: "Thank you for your feedback" });
      setSubmit(true);
      setTimeout(() => {
        setSubmit(false);
        setSelectedOption(null);
      }, 4000);
    }
  }

  const handleBackClick = () => {
    GeneralFunctions.fireTrackingEvent(
      `quest_feedback_workflow_offline_${selectedOption}_form_closed`,
      `feedback_workflow_${selectedOption}_form`
    );
    setSelectedOption(null);
  };

  const handleUpdate = (e: any, id: string, j: string, k?: number) => {
    setAnswer({
      ...answer,
      [id]: e.target.value || k,
    });
  };

  const handleThanks = () => {
    setSubmit(false);
    setSelectedOption(null);
  };

  const handleRemove = (id: string) => {
    setAnswer({
      ...answer,
      [id]: "",
    });
  };

  const handleScreenCapture = async (capture: any) => {
    setIsVisible(true);
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const time = hours + ":" + minutes + ":" + seconds;
    let fileName = "screenshot" + time + ".jpg"; // Ensure file name has proper format

    try {
      const response = await axios.get(capture, { responseType: "blob" });

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: "image/jpeg" });

      // Create a File object from the Blob
      const file = new File([blob], fileName, { type: "image/jpeg" });

      // If you need to update state with the new file object
      setScreenshot(file);
    } catch (error) {
      console.error("An error occurred while fetching the image:", error);
    }
  };
  const [rating, setRating] = useState(0);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose || (() => {})}
      style={{ padding: 0, background: "transparent", ...styleConfig.Modal }}
    >
      <div
        className="q_modal_overlay"
        onClick={(e) => closeModal(e)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: !isVisible ? "transparent" : "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: isVisible ? 1 : 0,
        }}
      >
        {!submit && (
          <div
            className="q_modal"
            ref={ref}
            id="modal_box"
            style={{
              padding: 0,
              background: "transparent",
              opacity: isVisible ? 1 : 0,
              ...styleConfig.Modal,
            }}
          >
            {showLoader && <Loader />}
            <div className="q-fw-div" id="disabledClick">
              {selectedOption && !submit ? (
                <div
                  style={{
                    background: "red",
                  }}
                >
                  <Header>
                    <HeaderTextContainer>
                      <HeaderHeading headingText="Head" />
                      <HeaderDesciption descriptionText="Desc" />
                    </HeaderTextContainer>
                    <HeaderCloseButton
                      onClose={() => {
                        setSelectedOption(null);
                      }}
                    />
                  </Header>

                  {selectedOption === "GeneralFeedback" && (
                    <ComponentBody questionData={offlineFormData[0]}>
                      {offlineFormData[0]?.map((criteria, index) => {
                        return (
                          <Question>
                            <LabelModule>{criteria.question}</LabelModule>

                            {((criteria?.type === "USER_INPUT_TEXT" ||
                              criteria?.type === "USER_INPUT_DATE" ||
                              criteria?.type === "USER_INPUT_EMAIL") && (
                              <InputModule
                                className=""
                                key={""}
                                type={
                                  criteria?.type === "USER_INPUT_TEXT"
                                    ? "text"
                                    : criteria?.type === "USER_INPUT_EMAIL"
                                    ? "email"
                                    : "text"
                                }
                                iconColor=""
                                logoPosition="right"
                                onChange={() => {}}
                                placeholder=""
                                style={{}}
                              />
                            )) ||
                              (criteria?.type ===
                                "USER_INPUT_SINGLE_CHOICE" && (
                                <OptionsContainer>
                                  {criteria?.options?.map((value, index) => {
                                    return (
                                      <Option
                                        // option={}
                                        onClick={() => {
                                          console.log(value);
                                        }}
                                      >
                                        {value}
                                      </Option>
                                    );
                                  })}
                                </OptionsContainer>
                              )) ||
                              (criteria?.type === "USER_INPUT_TEXTAREA" && (
                                <TextAreaModule
                                  style={{}}
                                  onChange={() => {}}
                                  value={""}
                                />
                              )) ||
                              (criteria?.type === "RATING" && (
                                <InputRating
                                  StarStyle={{}}
                                  ratingStyle="Numbers"
                                  setRating={setRating}
                                />
                              )) ||
                              (criteria?.type === "USER_INPUT_IMAGE" && (
                                <InputImage
                                  file={{
                                    lastModified: 51,
                                    name: "Name",
                                    size: 52,
                                    type: "",
                                    webkitRelativePath: "",
                                  }}
                                  onStartCapture={() => {
                                    console.log("Capt start");
                                  }}
                                  screenshot={{
                                    lastModified: 51,
                                    name: "Name",
                                    size: 52,
                                    type: "",
                                    webkitRelativePath: "",
                                  }}
                                  setFile={() => {}}
                                  setIsVisible={() => {}}
                                  setScreenshot={() => {}}
                                  isVisible={true}
                                  style={{
                                    width: "100%",
                                  }}
                                />
                              ))}
                          </Question>
                        );
                      })}
                      <ButtonModule type="button">Submit</ButtonModule>
                    </ComponentBody>
                  )}
                  {selectedOption === "ReportBug" && (
                    <ComponentBody questionData={offlineFormData[0]}>
                      {offlineFormData[1]?.map((criteria, index) => {
                        return (
                          <Question>
                            <LabelModule>{criteria.question}</LabelModule>

                            {((criteria?.type === "USER_INPUT_TEXT" ||
                              criteria?.type === "USER_INPUT_DATE" ||
                              criteria?.type === "USER_INPUT_EMAIL") && (
                              <InputModule
                                className=""
                                key={""}
                                type={
                                  criteria?.type === "USER_INPUT_TEXT"
                                    ? "text"
                                    : criteria?.type === "USER_INPUT_EMAIL"
                                    ? "email"
                                    : "text"
                                }
                                iconColor=""
                                logoPosition="right"
                                onChange={() => {}}
                                placeholder=""
                                style={{}}
                                //   value={""}
                              />
                            )) ||
                              (criteria?.type ===
                                "USER_INPUT_SINGLE_CHOICE" && (
                                <OptionsContainer>
                                  {criteria?.options?.map((value, index) => {
                                    return (
                                      <Option
                                        onClick={() => {
                                          console.log(value);
                                        }}
                                      >
                                        {value}
                                      </Option>
                                    );
                                  })}
                                </OptionsContainer>
                              )) ||
                              (criteria?.type === "USER_INPUT_TEXTAREA" && (
                                <TextAreaModule
                                  style={{}}
                                  onChange={() => {}}
                                  value={""}
                                />
                              )) ||
                              (criteria?.type === "RATING" && (
                                <InputRating
                                  StarStyle={{}}
                                  ratingStyle="Numbers"
                                  setRating={setRating}
                                />
                              )) ||
                              (criteria?.type === "USER_INPUT_IMAGE" && (
                                <InputImage
                                  file={{
                                    lastModified: 51,
                                    name: "Name",
                                    size: 52,
                                    type: "",
                                    webkitRelativePath: "",
                                  }}
                                  onStartCapture={() => {
                                    console.log("Capt start");
                                  }}
                                  screenshot={{
                                    lastModified: 51,
                                    name: "Name",
                                    size: 52,
                                    type: "",
                                    webkitRelativePath: "",
                                  }}
                                  setFile={() => {}}
                                  setIsVisible={() => {}}
                                  setScreenshot={() => {}}
                                  isVisible={true}
                                  style={{
                                    width: "100%",
                                  }}
                                />
                              ))}
                          </Question>
                        );
                      })}
                      <ButtonModule type="button">Submit</ButtonModule>
                    </ComponentBody>
                  )}
                  {selectedOption === "RequestFeature" && (
                    <ComponentBody questionData={offlineFormData[0]}>
                      {offlineFormData[2]?.map((criteria, index) => {
                        return (
                          <Question>
                            <LabelModule>{criteria.question}</LabelModule>

                            {((criteria?.type === "USER_INPUT_TEXT" ||
                              criteria?.type === "USER_INPUT_DATE" ||
                              criteria?.type === "USER_INPUT_EMAIL") && (
                              <InputModule
                                className=""
                                key={""}
                                type={
                                  criteria?.type === "USER_INPUT_TEXT"
                                    ? "text"
                                    : criteria?.type === "USER_INPUT_EMAIL"
                                    ? "email"
                                    : "text"
                                }
                                iconColor=""
                                logoPosition="right"
                                onChange={() => {}}
                                placeholder=""
                                style={{}}
                                //   value={""}
                              />
                            )) ||
                              (criteria?.type ===
                                "USER_INPUT_SINGLE_CHOICE" && (
                                <OptionsContainer>
                                  {criteria?.options?.map((value, index) => {
                                    return (
                                      <Option
                                        onClick={() => {
                                          console.log(value);
                                        }}
                                      >
                                        {value}
                                      </Option>
                                    );
                                  })}
                                </OptionsContainer>
                              )) ||
                              (criteria?.type === "USER_INPUT_TEXTAREA" && (
                                <TextAreaModule
                                  style={{}}
                                  onChange={() => {}}
                                  value={""}
                                />
                              )) ||
                              (criteria?.type === "RATING" && (
                                <InputRating
                                  StarStyle={{}}
                                  ratingStyle="Numbers"
                                  setRating={setRating}
                                />
                              )) ||
                              (criteria?.type === "USER_INPUT_IMAGE" && (
                                <InputImage
                                  file={{
                                    lastModified: 51,
                                    name: "Name",
                                    size: 52,
                                    type: "",
                                    webkitRelativePath: "",
                                  }}
                                  onStartCapture={() => {
                                    console.log("Capt start");
                                  }}
                                  screenshot={{
                                    lastModified: 51,
                                    name: "Name",
                                    size: 52,
                                    type: "",
                                    webkitRelativePath: "",
                                  }}
                                  setFile={() => {}}
                                  setIsVisible={() => {}}
                                  setScreenshot={() => {}}
                                  isVisible={true}
                                  style={{
                                    width: "100%",
                                  }}
                                />
                              ))}
                          </Question>
                        );
                      })}
                      <ButtonModule type="button">Submit</ButtonModule>
                    </ComponentBody>
                  )}
                  {selectedOption === "ContactUs" && <div></div>}
                  {showFooter && <QuestLabsFooter />}
                </div>
              ) : !submit ? (
                <div>
                  <Header className="" id="" key={""} style={{}}>
                    <HeaderTextContainer>
                      {/* <HeaderHeading
                        style={{}}
                        id=""
                        key={""}
                        headingText="Head"
                        className=""
                      />

                      <HeaderDesciption
                        className=""
                        id=""
                        key={""}
                        style={{}}
                        descriptionText="description"
                      /> */}
                    </HeaderTextContainer>

                    <HeaderCloseButton
                      onClose={() => {
                        console.log("close");
                      }}
                    />
                  </Header>

                  <div className="q-fw-content-box">
                    <Card
                      className="q-hover q-fw-cards"
                      onMouseEnter={() =>
                        setCardHovered([true, false, false, false])
                      }
                      onMouseLeave={() =>
                        setCardHovered([false, false, false, false])
                      }
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        border: "none",
                        height: "60px",

                        background: cardHovered[0]
                          ? styleConfig.listHover?.background || "#FBFBFB"
                          : "transparent",
                        borderRadius: "8px",
                        ...styleConfig?.Card,
                      }}
                      isSelected={false}
                      selectedStyle={{}}
                      onClick={() => {
                        handleOptionClick("GeneralFeedback");
                        console.log("card clicked");
                      }}
                    >
                      <CardImage
                        cardIcon={GeneralFeedback?.iconUrl}
                        style={{
                          height: "32px",
                          width: "32px",
                          boxSizing: "border-box",
                        }}
                      />

                      <CardBody>
                        <CardBodyHeading>General Feedback</CardBodyHeading>
                        <CardBodyDescription>
                          Give general feedback on this page
                        </CardBodyDescription>
                      </CardBody>
                    </Card>

                    <Card
                      className="q-hover q-fw-cards"
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        border: "none",
                        height: "60px",

                        background: cardHovered[1]
                          ? styleConfig.listHover?.background || "#FBFBFB"
                          : "transparent",
                        borderRadius: "8px",
                        ...styleConfig?.Card,
                      }}
                      isSelected={false}
                      selectedStyle={{}}
                      onClick={() => {
                        handleOptionClick("ReportBug");
                        console.log("card clicked");
                      }}
                      onMouseEnter={() =>
                        setCardHovered([false, true, false, false])
                      }
                      onMouseLeave={() =>
                        setCardHovered([false, false, false, false])
                      }
                    >
                      <CardImage
                        cardIcon={GeneralFeedback?.iconUrl}
                        style={{
                          height: "32px",
                          width: "32px",
                          boxSizing: "border-box",
                        }}
                      />

                      <CardBody>
                        <CardBodyHeading>Report a Bug</CardBodyHeading>
                        <CardBodyDescription>
                          Let us know what's broken
                        </CardBodyDescription>
                      </CardBody>
                    </Card>

                    <Card
                      className="q-hover q-fw-cards"
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        border: "none",
                        height: "60px",

                        background: cardHovered[2]
                          ? styleConfig.listHover?.background || "#FBFBFB"
                          : "transparent",
                        borderRadius: "8px",
                        ...styleConfig?.Card,
                      }}
                      isSelected={false}
                      selectedStyle={{}}
                      onClick={() => {
                        handleOptionClick("RequestFeature");
                        console.log("card clicked");
                      }}
                      onMouseEnter={() =>
                        setCardHovered([false, false, true, false])
                      }
                      onMouseLeave={() =>
                        setCardHovered([false, false, false, false])
                      }
                    >
                      <CardImage
                        cardIcon={GeneralFeedback?.iconUrl}
                        style={{
                          height: "32px",
                          width: "32px",
                          boxSizing: "border-box",
                        }}
                      />

                      <CardBody>
                        <CardBodyHeading>Request a Feature</CardBodyHeading>
                        <CardBodyDescription>
                          Tell us how we can improve
                        </CardBodyDescription>
                      </CardBody>
                    </Card>

                    <Card
                      className="q-hover q-fw-cards"
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        border: "none",
                        height: "60px",

                        background: cardHovered[3]
                          ? styleConfig.listHover?.background || "#FBFBFB"
                          : "transparent",
                        borderRadius: "8px",
                        ...styleConfig?.Card,
                      }}
                      isSelected={false}
                      selectedStyle={{}}
                      onClick={() => {
                        handleOptionClick("ContactUs");
                        console.log("card clicked");
                      }}
                      onMouseEnter={() =>
                        setCardHovered([false, false, false, true])
                      }
                      onMouseLeave={() =>
                        setCardHovered([false, false, false, false])
                      }
                    >
                      <CardImage
                        cardIcon={GeneralFeedback?.iconUrl}
                        style={{
                          height: "32px",
                          width: "32px",
                          boxSizing: "border-box",
                        }}
                      />

                      <CardBody>
                        <CardBodyHeading>Contact Us</CardBodyHeading>
                        <CardBodyDescription>
                          Tell us how we can help
                        </CardBodyDescription>
                      </CardBody>
                    </Card>
                  </div>
                  <div>{showFooter && <QuestLabsFooter />}</div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        )}

        {submit && (
          <div className="q-fw-div" id="disabledClick">
            <div className="q_submit_cross_icon" onClick={handleThanks}>
              {cross(iconColor, handleBackClick)}
            </div>
            <div className="q-fw-thanks">
              <div>
                <div className="q-svg-thanks">{thanks}</div>
                <div className="q_fw_submit_box">
                  <div className="q_feedback_text_submitted">
                    <div className="q_feedback_text_cont">
                      Feedback Submitted
                    </div>
                    <div className="q_fw_submit_desc">
                      Thanks for submitting your feedback with us. We appreciate
                      your review and will assure you to surely consider them
                    </div>
                  </div>
                  <div
                    className="q_fw_submit_back"
                    style={{ ...styleConfig?.SecondaryButton }}
                  >
                    {SecondaryButtonText}
                  </div>
                </div>
              </div>
            </div>
            {(styleConfig?.ThanksPopup?.ShowFooter || showFooter) && (
              <QuestLabsFooter />
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default FeedbackWorkflow;
