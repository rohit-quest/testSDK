import React, { useState, useEffect, useRef } from "react";
import GeneralFeedbackContent from "./GenralFb";
import BugContent from "./Bug";
import FeatureContent from "./Feature";
import { useContext } from "react";
import QuestContext from "../QuestWrapper";
import config from "../../config";
import axios from "axios";
import Loader from "../Login/Loader";
import showToast from "../toast/toastService";
import QuestLabs from "../QuestLabs";
import { Input } from "../Modules/Input";
import Label from "../Modules/Label";
import TextArea from "../Modules/TextArea";
import TopBar from "../Modules/TopBar";
import General from "../../general";
import { ScreenCapture } from "react-screen-capture";
import Modal from "../Modules/Modal";
import { bug, contact, cross, feature, feedback, thanksPopUpTick } from "./SVG";

// const feedback = (color: string = "#939393", Size: string = "16px") => (
//   <svg
//     width={Size}
//     height={Size}
//     viewBox="0 0 16 16"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       opacity="0.5"
//       d="M2 6.66671C2 4.15255 2 2.89547 2.78105 2.11442C3.5621 1.33337 4.81918 1.33337 7.33333 1.33337H8.66667C11.1808 1.33337 12.4379 1.33337 13.219 2.11442C14 2.89547 14 4.15255 14 6.66671V9.33337C14 11.8475 14 13.1046 13.219 13.8857C12.4379 14.6667 11.1808 14.6667 8.66667 14.6667H7.33333C4.81918 14.6667 3.5621 14.6667 2.78105 13.8857C2 13.1046 2 11.8475 2 9.33337V6.66671Z"
//       fill={color}
//     />
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M4.83334 6.66663C4.83334 6.39048 5.0572 6.16663 5.33334 6.16663H10.6667C10.9428 6.16663 11.1667 6.39048 11.1667 6.66663C11.1667 6.94277 10.9428 7.16663 10.6667 7.16663H5.33334C5.0572 7.16663 4.83334 6.94277 4.83334 6.66663Z"
//       fill={color}
//     />
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M4.83334 9.33337C4.83334 9.05723 5.0572 8.83337 5.33334 8.83337H8.66668C8.94282 8.83337 9.16668 9.05723 9.16668 9.33337C9.16668 9.60952 8.94282 9.83337 8.66668 9.83337H5.33334C5.0572 9.83337 4.83334 9.60952 4.83334 9.33337Z"
//       fill={color}
//     />
//   </svg>
// );
// const bug = (color: string = "#939393", Size: string = "16px") => (
//   <svg
//     width={Size}
//     height={Size}
//     viewBox="0 0 16 16"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       opacity="0.5"
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M12.6667 7.95837V10C12.6667 12.4085 10.8422 14.3907 8.50001 14.6402V10C8.50001 9.7239 8.27615 9.50004 8.00001 9.50004C7.72387 9.50004 7.50001 9.7239 7.50001 10V14.6402C5.15779 14.3907 3.33334 12.4085 3.33334 10V7.95837C3.33334 6.84682 4.02423 5.89663 5.00001 5.51381C5.29689 5.39733 5.62015 5.33337 5.95834 5.33337H10.0417C10.3799 5.33337 10.7031 5.39733 11 5.51381C11.9758 5.89663 12.6667 6.84682 12.6667 7.95837Z"
//       fill={color}
//     />
//     <path
//       d="M12.6667 9.83337V8.83337H14.6667C14.9428 8.83337 15.1667 9.05723 15.1667 9.33337C15.1667 9.60951 14.9428 9.83337 14.6667 9.83337H12.6667Z"
//       fill={color}
//     />
//     <path
//       d="M11.6637 12.8909C11.8709 12.6286 12.0506 12.3436 12.1983 12.0402L13.8903 12.8863C14.1373 13.0098 14.2374 13.3101 14.1139 13.5571C13.9904 13.8041 13.69 13.9042 13.443 13.7807L11.6637 12.8909Z"
//       fill={color}
//     />
//     <path
//       d="M3.80173 12.0402C3.94946 12.3436 4.12912 12.6286 4.33634 12.8909L2.55697 13.7807C2.30999 13.9042 2.00965 13.8041 1.88614 13.5571C1.76263 13.3101 1.86273 13.0098 2.10971 12.8863L3.80173 12.0402Z"
//       fill={color}
//     />
//     <path
//       d="M3.33334 8.83337H1.33334C1.0572 8.83337 0.833344 9.05723 0.833344 9.33337C0.833344 9.60951 1.0572 9.83337 1.33334 9.83337H3.33334V8.83337Z"
//       fill={color}
//     />
//     <path
//       d="M11.569 5.82319L13.443 4.88604C13.69 4.76253 13.9904 4.86263 14.1139 5.10961C14.2374 5.35659 14.1373 5.65693 13.8903 5.78044L12.2797 6.58585C12.0958 6.28667 11.8536 6.02717 11.569 5.82319Z"
//       fill={color}
//     />
//     <path
//       d="M4.43103 5.82319C4.14637 6.02717 3.90419 6.28667 3.72032 6.58585L2.10971 5.78044C1.86273 5.65693 1.76263 5.35659 1.88614 5.10961C2.00965 4.86263 2.30999 4.76253 2.55697 4.88604L4.43103 5.82319Z"
//       fill={color}
//     />
//     <path
//       d="M11 5.51376V5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5V5.51376C5.29688 5.39729 5.62014 5.33333 5.95833 5.33333H10.0417C10.3799 5.33333 10.7031 5.39729 11 5.51376Z"
//       fill={color}
//     />
//     <g opacity="0.5">
//       <path
//         d="M4.25068 1.05595C4.09751 1.28572 4.1596 1.59615 4.38936 1.74933L5.96243 2.79804C6.23013 2.5502 6.54312 2.35058 6.88758 2.21296L4.94406 0.91728C4.7143 0.764104 4.40386 0.826191 4.25068 1.05595Z"
//         fill={color}
//       />
//       <path
//         d="M10.0376 2.79808C9.7699 2.55024 9.45692 2.35061 9.11246 2.21299L11.056 0.91728C11.2858 0.764104 11.5962 0.826191 11.7494 1.05595C11.9026 1.28572 11.8405 1.59615 11.6107 1.74933L10.0376 2.79808Z"
//         fill={color}
//       />
//     </g>
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M8 9.5C8.27614 9.5 8.5 9.72386 8.5 10V14.6667H7.5V10C7.5 9.72386 7.72386 9.5 8 9.5Z"
//       fill={color}
//     />
//   </svg>
// );
// const feature = (color: string = "#939393", Size = "16") => (
//   <svg
//     width={Size}
//     height={Size}
//     viewBox="0 0 16 16"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       opacity="0.5"
//       d="M2.30965 13.6904C3.28596 14.6667 4.85731 14.6667 8.00001 14.6667C11.1427 14.6667 12.7141 14.6667 13.6904 13.6904C14.6667 12.7141 14.6667 11.1427 14.6667 8.00004C14.6667 4.85734 14.6667 3.286 13.6904 2.30968C12.7141 1.33337 11.1427 1.33337 8.00001 1.33337C4.85731 1.33337 3.28596 1.33337 2.30965 2.30968C1.33334 3.286 1.33334 4.85734 1.33334 8.00004C1.33334 11.1427 1.33334 12.7141 2.30965 13.6904Z"
//       fill={color}
//     />
//     <path
//       d="M11.3333 8.44437C11.3333 11.2888 8.96295 11.9999 7.77777 11.9999C6.74073 11.9999 4.66666 11.2888 4.66666 8.44437C4.66666 7.20719 5.37527 6.42176 5.97061 6.02642C6.2428 5.84568 6.58133 5.9612 6.59893 6.28746C6.63743 7.00132 7.1876 7.57473 7.61366 7.00066C8.00362 6.47524 8.19607 5.76174 8.19607 5.33326C8.19607 4.70207 8.83499 4.30098 9.33384 4.68769C10.3062 5.44146 11.3333 6.70382 11.3333 8.44437Z"
//       fill={color}
//     />
//   </svg>
// );
// const cross = (color = "#AFAFAF", onClick?: () => void) => (
//   <div
//     onClick={() => onClick?.()}
//     style={{
//       cursor: "pointer",
//       padding: "4px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       borderRadius: "4px",
//     }}
//   >
//     <svg
//       width="16"
//       height="16"
//       viewBox="0 0 32 32"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M24.4003 7.61363C24.2769 7.49003 24.1304 7.39196 23.9691 7.32505C23.8078 7.25815 23.6349 7.22371 23.4603 7.22371C23.2857 7.22371 23.1128 7.25815 22.9515 7.32505C22.7902 7.39196 22.6436 7.49003 22.5203 7.61363L16.0003 14.1203L9.4803 7.6003C9.35686 7.47686 9.21031 7.37894 9.04902 7.31213C8.88774 7.24532 8.71487 7.21094 8.5403 7.21094C8.36572 7.21094 8.19286 7.24532 8.03157 7.31213C7.87029 7.37894 7.72374 7.47686 7.6003 7.6003C7.47686 7.72374 7.37894 7.87029 7.31213 8.03157C7.24532 8.19286 7.21094 8.36572 7.21094 8.5403C7.21094 8.71487 7.24532 8.88774 7.31213 9.04902C7.37894 9.21031 7.47686 9.35686 7.6003 9.4803L14.1203 16.0003L7.6003 22.5203C7.47686 22.6437 7.37894 22.7903 7.31213 22.9516C7.24532 23.1129 7.21094 23.2857 7.21094 23.4603C7.21094 23.6349 7.24532 23.8077 7.31213 23.969C7.37894 24.1303 7.47686 24.2769 7.6003 24.4003C7.72374 24.5237 7.87029 24.6217 8.03157 24.6885C8.19286 24.7553 8.36572 24.7897 8.5403 24.7897C8.71487 24.7897 8.88774 24.7553 9.04902 24.6885C9.21031 24.6217 9.35686 24.5237 9.4803 24.4003L16.0003 17.8803L22.5203 24.4003C22.6437 24.5237 22.7903 24.6217 22.9516 24.6885C23.1129 24.7553 23.2857 24.7897 23.4603 24.7897C23.6349 24.7897 23.8077 24.7553 23.969 24.6885C24.1303 24.6217 24.2769 24.5237 24.4003 24.4003C24.5237 24.2769 24.6217 24.1303 24.6885 23.969C24.7553 23.8077 24.7897 23.6349 24.7897 23.4603C24.7897 23.2857 24.7553 23.1129 24.6885 22.9516C24.6217 22.7903 24.5237 22.6437 24.4003 22.5203L17.8803 16.0003L24.4003 9.4803C24.907 8.97363 24.907 8.1203 24.4003 7.61363Z"
//         fill={color}
//       />
//     </svg>
//   </div>
// );
// const contact = (color: string = "#939393", Size: string = "16px") => (
//   <svg
//     width={Size}
//     height={Size}
//     viewBox="0 0 16 16"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       opacity="0.5"
//       d="M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00004C1.33334 4.31814 4.31811 1.33337 8.00001 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z"
//       fill={color}
//     />
//     <path
//       d="M8 5.16663C7.58579 5.16663 7.25 5.50241 7.25 5.91663C7.25 6.19277 7.02614 6.41663 6.75 6.41663C6.47386 6.41663 6.25 6.19277 6.25 5.91663C6.25 4.95013 7.0335 4.16663 8 4.16663C8.9665 4.16663 9.75 4.95013 9.75 5.91663C9.75 6.39052 9.56098 6.82128 9.25531 7.13593C9.1938 7.19925 9.13512 7.25787 9.07915 7.3138L9.07915 7.3138C8.93526 7.45757 8.8092 7.58352 8.6986 7.72562C8.55258 7.91324 8.5 8.05113 8.5 8.16663V8.66663C8.5 8.94277 8.27614 9.16663 8 9.16663C7.72386 9.16663 7.5 8.94277 7.5 8.66663V8.16663C7.5 7.72983 7.70334 7.37625 7.90945 7.11143C8.06195 6.91549 8.25363 6.72419 8.40918 6.56894L8.40918 6.56894C8.45611 6.5221 8.49975 6.47855 8.53803 6.43914C8.66972 6.30358 8.75 6.11999 8.75 5.91663C8.75 5.50241 8.41421 5.16663 8 5.16663Z"
//       fill={color}
//     />
//     <path
//       d="M8 11.3333C8.36819 11.3333 8.66667 11.0348 8.66667 10.6666C8.66667 10.2984 8.36819 9.99996 8 9.99996C7.63181 9.99996 7.33333 10.2984 7.33333 10.6666C7.33333 11.0348 7.63181 11.3333 8 11.3333Z"
//       fill={color}
//     />
//   </svg>
// );

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
  starColor?: string;
  starBorderColor?: string;
  GeneralFeedback?: {
    heading?: string;
    description?: string;
    formHeading?: string;
    formDescription?: string;
    iconUrl?: string;
  };
  ReportBug?: {
    heading?: string;
    description?: string;
    formHeading?: string;
    formDescription?: string;
    iconUrl?: string;
  };
  RequestFeature?: {
    heading?: string;
    description?: string;
    formHeading?: string;
    formDescription?: string;
    iconUrl?: string;
  };
  ContactUs?: {
    heading?: string;
    description?: string;
    iconUrl?: string;
  };
  tickBg?: string;
  ratingStyle?: "Star" | "Numbers" | "Smiles";
  uniqueUserId?: string;
  uniqueEmailId?: string;
  descriptions?: Record<optionType, string>;
  backBtn?: boolean;
  iconColor?: string;
  showFooter?: boolean;
  PrimaryButtonText?: string;
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
    Footer?: {
      FooterStyle?: React.CSSProperties;
      FooterText?: React.CSSProperties;
      FooterIcon?: React.CSSProperties;
    };
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
  // userId,
  // token,
  // questIds,
  contactUrl,
  isOpen,
  onClose,
  starColor,
  starBorderColor,
  ratingStyle,
  GeneralFeedback,
  ReportBug,
  ContactUs,
  RequestFeature,
  SecondaryButtonText = "Go to home!",
  PrimaryButtonText = "Submit",
  iconColor = "#939393",
  styleConfig = {},
  offlineFormData,
  showFooter = true,
  BrandTheme,
  QuestThemeData,
}) => {
  const [selectedOption, setSelectedOption] = useState<optionType | null>(null);

  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const { apiKey, apiSecret, entityId, featureFlags, apiType, themeConfig } =
    useContext(QuestContext.Context);
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
  const uploadFileToBackend: any = async (file: any) => { };

  const ref = React.useRef<HTMLDivElement>(null);

  let GeneralFunctions = new General("mixpanel", apiType);
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

  const normalInput = (
    question: string,
    criteriaId: string,
    placeholder?: string,
    required?: boolean
  ) => {
    return (
      <div className="" key={criteriaId}>
        <Label
          htmlFor={"normalInput"}
          children={`${question}${required === true ? "*" : ""}`}
          style={{
            color:
              styleConfig?.Label?.color ||
              styleConfig?.Heading?.color ||
              BrandTheme?.primaryColor ||
              themeConfig.primaryColor,
            ...styleConfig.Label,
          }}
        />
        <Input
          type="text"
          style={{
            color:
              styleConfig?.Input?.color ||
              styleConfig?.Heading?.color ||
              BrandTheme?.primaryColor ||
              themeConfig.primaryColor,
            ...styleConfig.Input,
          }}
          placeholder={placeholder}
          value={answer[criteriaId]}
          onChange={(e) => handleUpdate(e, criteriaId, "")}
          required={required}
        />
      </div>
    );
  };
  const emailInput = (
    question: string,
    criteriaId: string,
    placeholder?: string,
    required?: boolean
  ) => {
    return (
      <div className="" key={criteriaId}>
        <Label
          htmlFor={"normalInput"}
          children={`${question}${required === true ? "*" : ""}`}
          style={{
            color:
              styleConfig?.Label?.color ||
              styleConfig?.Heading?.color ||
              BrandTheme?.primaryColor ||
              themeConfig.primaryColor,
            ...styleConfig.Label,
          }}
        />
        <Input
          type="email"
          style={{
            color:
              styleConfig?.Input?.color ||
              styleConfig?.Heading?.color ||
              BrandTheme?.primaryColor ||
              themeConfig.primaryColor,
            ...styleConfig.Input,
          }}
          placeholder={placeholder}
          value={answer[criteriaId]}
          onChange={(e) => handleUpdate(e, criteriaId, "")}
          emailtext={
            styleConfig?.EmailError?.text == undefined
              ? "This is not a valid email"
              : styleConfig?.EmailError?.text
          }
          emailErrorStyle={styleConfig?.EmailError?.errorStyle}
          required={required}
        />

        {/* {isValidEmail(answer[criteriaId]) && (
          <div className="q-input-email-checks">This is not a valid email</div>
        )} */}
      </div>
    );
  };

  const normalInput2 = (
    question: string,
    criteriaId: string,
    placeholder?: string,
    required?: boolean
  ) => {
    return (
      <div className="" key={criteriaId}>
        <Label
          htmlFor={"normalInput"}
          children={`${question}${required === true ? "*" : ""}`}
          style={{
            color:
              styleConfig?.Label?.color ||
              styleConfig?.Heading?.color ||
              BrandTheme?.primaryColor ||
              themeConfig.primaryColor,
            ...styleConfig.Label,
          }}
        />
        <TextArea
          onChange={(e) => handleUpdate(e, criteriaId, "")}
          value={answer[criteriaId]}
          placeholder={placeholder}
          style={{
            borderColor: themeConfig.borderColor,
            color:
              styleConfig?.TextArea?.color ||
              styleConfig?.Heading?.color ||
              BrandTheme?.primaryColor ||
              themeConfig.primaryColor,
            ...styleConfig.TextArea,
          }}
          required={required}
        />
      </div>
    );
  };

  if (
    featureFlags[config.FLAG_CONSTRAINTS.FeedbackWorkflowFlag]?.isEnabled ==
    false
  ) {
    return <div></div>;
  }

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose || (() => { })}
      style={{ padding: 0, background: "transparent", ...styleConfig.Modal }}
    >
      <ScreenCapture onEndCapture={handleScreenCapture}>
        {({ onStartCapture }: any) => (
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
            {showLoader && <Loader />}

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
                  borderRadius:
                    styleConfig?.Form?.borderRadius ||
                    QuestThemeData?.borderRadius ||
                    BrandTheme?.borderRadius,
                }}
              >
                <div
                  className="q-fw-div"
                  style={{
                    background:
                      styleConfig?.Form?.backgroundColor ||
                      BrandTheme?.background ||
                      themeConfig?.backgroundColor,
                    height: styleConfig?.Form?.height || "auto",
                    borderRadius:
                      styleConfig?.Form?.borderRadius ||
                      QuestThemeData?.borderRadius ||
                      BrandTheme?.borderRadius,
                    fontFamily:
                      BrandTheme?.fontFamily ||
                      themeConfig.fontFamily ||
                      "'Figtree', sans-serif",
                    ...styleConfig?.Form,
                  }}
                  id="disabledClick"
                >
                  {selectedOption && !submit ? (
                    <div>
                      <TopBar
                        style={{
                          topbarStyle: styleConfig?.TopBar,
                          headingStyle: {
                            color:
                              styleConfig?.Heading?.color ||
                              BrandTheme?.titleColor ||
                              BrandTheme?.primaryColor ||
                              themeConfig?.primaryColor,
                            ...styleConfig?.Heading,
                          },
                          descriptionStyle: {
                            color:
                              styleConfig?.Description?.color ||
                              BrandTheme?.secondaryColor ||
                              themeConfig?.secondaryColor,
                            ...styleConfig?.Description,
                          },
                        }}
                        description={
                          selectedOption == "ContactUs"
                            ? ContactUs?.description ||
                            "Invite other admins and moderators"
                            : selectedOption == "RequestFeature"
                              ? RequestFeature?.formDescription ||
                              "How can we make it better"
                              : selectedOption == "ReportBug"
                                ? ReportBug?.formDescription ||
                                "Describe your issue"
                                : GeneralFeedback?.formDescription ||
                                "Give general feedback on this page"
                        }
                        heading={
                          selectedOption == "ContactUs"
                            ? ContactUs?.heading || "Contact us"
                            : selectedOption == "RequestFeature"
                              ? RequestFeature?.formHeading || "Request a Feature"
                              : selectedOption == "ReportBug"
                                ? ReportBug?.formHeading || "Report a Bug"
                                : GeneralFeedback?.formHeading || "General Feedback"
                        }
                        iconColor={iconColor}
                        onClose={handleBackClick}
                      />
                      <div style={{ padding: "20px" }}>
                        {selectedOption === "GeneralFeedback" && (
                          <GeneralFeedbackContent
                            starColor={starColor}
                            handleSubmit={() => returnAnswers(0)}
                            handleUpdate={handleUpdate}
                            formdata={offlineFormData[0]}
                            normalInput={normalInput}
                            emailInput={emailInput}
                            normalInput2={normalInput2}
                            starBorderColor={starBorderColor}
                            answer={answer}
                            handleRemove={handleRemove}
                            ratingStyle={ratingStyle}
                            iconColor={iconColor}
                            buttonStyle={{
                              background:
                                styleConfig.PrimaryButton?.background ||
                                QuestThemeData?.buttonColor ||
                                BrandTheme?.buttonColor ||
                                themeConfig.buttonColor,
                              ...styleConfig.PrimaryButton,
                            }}
                            PrimaryButtonText={PrimaryButtonText}
                            StarStyle={styleConfig?.Star}
                            labelStyle={{
                              ...styleConfig?.Label,
                              color:
                                styleConfig?.Label?.color ||
                                styleConfig?.Heading?.color ||
                                BrandTheme?.primaryColor ||
                                themeConfig.primaryColor,
                            }}
                            isVisible={isVisible}
                            setIsVisible={setIsVisible}
                            screenshot={screenshot}
                            setScreenshot={setScreenshot}
                            onStartCapture={onStartCapture}
                            uploadFileToBackend={uploadFileToBackend}
                            inputRef={inputRef}
                            file={file}
                            setFile={setFile}
                          />
                        )}
                        {selectedOption === "ReportBug" && (
                          <BugContent
                            handleSubmit={() => returnAnswers(1)}
                            handleUpdate={handleUpdate}
                            formdata={offlineFormData[1]}
                            answer={answer}
                            normalInput={normalInput}
                            normalInput2={normalInput2}
                            emailInput={emailInput}
                            handleRemove={handleRemove}
                            PrimaryButtonText={PrimaryButtonText}
                            buttonStyle={{
                              background:
                                styleConfig.PrimaryButton?.background ||
                                QuestThemeData?.buttonColor ||
                                BrandTheme?.buttonColor ||
                                themeConfig.buttonColor,
                              ...styleConfig.PrimaryButton,
                            }}
                          />
                        )}
                        {selectedOption === "RequestFeature" && (
                          <FeatureContent
                            handleSubmit={() => returnAnswers(2)}
                            handleUpdate={handleUpdate}
                            formdata={offlineFormData[2]}
                            normalInput={normalInput}
                            normalInput2={normalInput2}
                            emailInput={emailInput}
                            answer={answer}
                            handleRemove={handleRemove}
                            PrimaryButtonText={PrimaryButtonText}
                            buttonStyle={{
                              background:
                                styleConfig.PrimaryButton?.background ||
                                QuestThemeData?.buttonColor ||
                                BrandTheme?.buttonColor ||
                                themeConfig.buttonColor,
                              ...styleConfig.PrimaryButton,
                            }}
                          />
                        )}
                        {selectedOption === "ContactUs" && <div></div>}
                      </div>
                      {showFooter && (
                        <QuestLabs
                          style={{
                            ...{
                              background: styleConfig?.Footer?.FooterStyle?.backgroundColor ||
                                styleConfig?.Form?.backgroundColor ||
                                styleConfig?.Form?.background ||
                                BrandTheme?.background ||
                                themeConfig?.backgroundColor,
                            },
                            ...styleConfig?.Footer?.FooterStyle,

                          }}
                          textStyle={styleConfig?.Footer?.FooterText}
                          iconStyle={styleConfig?.Footer?.FooterIcon}
                        />
                      )}
                    </div>
                  ) : !submit ? (
                    <div>
                      <div className="q-fw-crossBtn">
                        <div onClick={() => onClose?.()}>
                          {cross(iconColor)}
                        </div>
                      </div>
                      <div className="q-fw-content-box">
                        <div
                          onClick={() => {
                            GeneralFunctions.fireTrackingEvent(
                              "quest_feedback_workflow_general_feedback_clicked",
                              "feedback_workflow_general_feedback"
                            );
                            handleOptionClick("GeneralFeedback");
                          }}
                          className="q-hover q-fw-cards"
                          onMouseEnter={() =>
                            setCardHovered([true, false, false, false])
                          }
                          onMouseLeave={() =>
                            setCardHovered([false, false, false, false])
                          }
                          style={{
                            background: cardHovered[0]
                              ? styleConfig.listHover?.background || "#FBFBFB"
                              : "transparent",
                            borderRadius: "8px",
                            ...styleConfig?.Card,
                          }}
                        >
                          <div
                            className="q_feedback_icon"
                            style={{
                              background: cardHovered[0]
                                ? styleConfig.listHover?.iconBackground ||
                                "#F4EBFF"
                                : "#FBFBFB",
                              ...styleConfig?.listHover?.Icon,
                            }}
                          >
                            {GeneralFeedback?.iconUrl ? (
                              <img
                                className="q_feedback_icon_imgurl"
                                src={GeneralFeedback?.iconUrl}
                              />
                            ) : (
                              feedback(
                                cardHovered[0]
                                  ? styleConfig.listHover?.iconColor ||
                                  "#9035FF"
                                  : iconColor,
                                styleConfig.listHover?.IconSize
                              )
                            )}
                          </div>
                          <div>
                            <div
                              className="q-fw-tab-heading"
                              style={{
                                color: cardHovered[0]
                                  ? styleConfig?.listHover?.Heading ||
                                  styleConfig.listHeading?.color ||
                                  styleConfig?.Heading?.color ||
                                  BrandTheme?.primaryColor ||
                                  themeConfig?.primaryColor
                                  : styleConfig.listHeading?.color ||
                                  styleConfig?.Heading?.color ||
                                  BrandTheme?.primaryColor ||
                                  themeConfig?.primaryColor,
                                ...styleConfig?.listHeading,
                              }}
                            >
                              {GeneralFeedback?.heading || "General Feedback"}
                            </div>
                            <div
                              className="q-fw-tab-description"
                              style={{
                                color: cardHovered[0]
                                  ? styleConfig?.listHover?.Description ||
                                  styleConfig?.listDescription?.color ||
                                  styleConfig?.Description?.color ||
                                  BrandTheme?.secondaryColor ||
                                  themeConfig?.secondaryColor
                                  : styleConfig?.listDescription?.color ||
                                  styleConfig?.Description?.color ||
                                  BrandTheme?.secondaryColor ||
                                  themeConfig?.secondaryColor,
                                ...styleConfig?.listDescription,
                              }}
                            >
                              {GeneralFeedback?.description ||
                                "Give general feedback on this page"}
                            </div>
                          </div>
                        </div>

                        <div
                          onClick={() => {
                            GeneralFunctions.fireTrackingEvent(
                              "quest_feedback_workflow_report_bug_clicked",
                              "feedback_workflow_report_bug"
                            );
                            handleOptionClick("ReportBug");
                          }}
                          className="q-hover q-fw-cards"
                          onMouseEnter={() =>
                            setCardHovered([false, true, false, false])
                          }
                          onMouseLeave={() =>
                            setCardHovered([false, false, false, false])
                          }
                          style={{
                            background: cardHovered[1]
                              ? styleConfig.listHover?.background || "#FBFBFB"
                              : "transparent",
                            borderRadius: "8px",
                            ...styleConfig?.Card,
                          }}
                        >
                          <div
                            className="q_feedback_icon"
                            style={{
                              background: cardHovered[1]
                                ? styleConfig.listHover?.iconBackground ||
                                "#F4EBFF"
                                : "#FBFBFB",
                              ...styleConfig?.listHover?.Icon,
                            }}
                          >
                            {ReportBug?.iconUrl ? (
                              <img
                                className="q_feedback_icon_imgurl"
                                src={ReportBug?.iconUrl}
                              />
                            ) : (
                              bug(
                                cardHovered[1]
                                  ? styleConfig.listHover?.iconColor ||
                                  styleConfig?.listHover?.Icon?.color ||
                                  "#9035FF"
                                  : iconColor,
                                styleConfig.listHover?.IconSize
                              )
                            )}
                          </div>
                          <div>
                            <div>
                              <div
                                className="q-fw-tab-heading"
                                style={{
                                  color: cardHovered[1]
                                    ? styleConfig?.listHover?.Heading ||
                                    styleConfig.listHeading?.color ||
                                    styleConfig?.Heading?.color ||
                                    BrandTheme?.primaryColor ||
                                    themeConfig?.primaryColor
                                    : styleConfig.listHeading?.color ||
                                    styleConfig?.Heading?.color ||
                                    BrandTheme?.primaryColor ||
                                    themeConfig?.primaryColor,
                                  ...styleConfig?.listHeading,
                                }}
                              >
                                {ReportBug?.heading || "Report a Bug"}
                              </div>
                            </div>
                            <div>
                              <div
                                className="q-fw-tab-description"
                                style={{
                                  color: cardHovered[1]
                                    ? styleConfig?.listHover?.Description ||
                                    styleConfig?.listDescription?.color ||
                                    styleConfig?.Description?.color ||
                                    BrandTheme?.secondaryColor ||
                                    themeConfig?.secondaryColor
                                    : styleConfig?.listDescription?.color ||
                                    styleConfig?.Description?.color ||
                                    BrandTheme?.secondaryColor ||
                                    themeConfig?.secondaryColor,
                                  ...styleConfig?.listDescription,
                                }}
                              >
                                {ReportBug?.description ||
                                  "Let us know what's broken"}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          onClick={() => {
                            GeneralFunctions.fireTrackingEvent(
                              "quest_feedback_workflow_request_feature_clicked",
                              "feedback_workflow_request_feature"
                            );
                            handleOptionClick("RequestFeature");
                          }}
                          className="q-hover q-fw-cards"
                          onMouseEnter={() =>
                            setCardHovered([false, false, true, false])
                          }
                          onMouseLeave={() =>
                            setCardHovered([false, false, false, false])
                          }
                          style={{
                            background: cardHovered[2]
                              ? styleConfig.listHover?.background || "#FBFBFB"
                              : "transparent",
                            borderRadius: "8px",
                            ...styleConfig?.Card,
                          }}
                        >
                          <div
                            className="q_feedback_icon"
                            style={{
                              background: cardHovered[2]
                                ? styleConfig.listHover?.iconBackground ||
                                "#F4EBFF"
                                : "#FBFBFB",
                              ...styleConfig?.listHover?.Icon,
                            }}
                          >
                            {RequestFeature?.iconUrl ? (
                              <img
                                className="q_feedback_icon_imgurl"
                                src={RequestFeature?.iconUrl}
                              />
                            ) : (
                              feature(
                                cardHovered[2]
                                  ? styleConfig.listHover?.iconColor ||
                                  "#9035FF"
                                  : iconColor,
                                styleConfig.listHover?.IconSize
                              )
                            )}
                          </div>
                          <div>
                            <div>
                              <div
                                className="q-fw-tab-heading"
                                style={{
                                  color: cardHovered[2]
                                    ? styleConfig?.listHover?.Heading ||
                                    styleConfig.listHeading?.color ||
                                    styleConfig?.Heading?.color ||
                                    themeConfig?.primaryColor ||
                                    themeConfig?.primaryColor
                                    : styleConfig.listHeading?.color ||
                                    styleConfig?.Heading?.color ||
                                    themeConfig?.primaryColor ||
                                    themeConfig?.primaryColor,
                                  ...styleConfig?.listHeading,
                                }}
                              >
                                {RequestFeature?.heading || "Request a Feature"}
                              </div>
                            </div>
                            <div>
                              <div
                                className="q-fw-tab-description"
                                style={{
                                  color: cardHovered[2]
                                    ? styleConfig?.listHover?.Description ||
                                    styleConfig?.listDescription?.color ||
                                    styleConfig?.Description?.color ||
                                    BrandTheme?.secondaryColor ||
                                    themeConfig?.secondaryColor
                                    : styleConfig?.listDescription?.color ||
                                    styleConfig?.Description?.color ||
                                    BrandTheme?.secondaryColor ||
                                    themeConfig?.secondaryColor,
                                  ...styleConfig?.listDescription,
                                }}
                              >
                                {RequestFeature?.description ||
                                  "Tell us how we can improve"}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          onClick={() => {
                            GeneralFunctions.fireTrackingEvent(
                              "quest_feedback_workflow_contactus_clicked",
                              "feedback_workflow_contactus"
                            );
                            handleOptionClick("ContactUs");
                          }}
                          className="q-hover q-fw-cards"
                          onMouseEnter={() =>
                            setCardHovered([false, false, false, true])
                          }
                          onMouseLeave={() =>
                            setCardHovered([false, false, false, false])
                          }
                          style={{
                            background: cardHovered[3]
                              ? styleConfig.listHover?.background || "#FBFBFB"
                              : "transparent",
                            borderRadius: "8px",
                            ...styleConfig?.Card,
                          }}
                        >
                          <div
                            className="q_feedback_icon"
                            style={{
                              background: cardHovered[3]
                                ? styleConfig.listHover?.iconBackground ||
                                "#F4EBFF"
                                : "#FBFBFB",
                              ...styleConfig?.listHover?.Icon,
                            }}
                          >
                            {ContactUs?.iconUrl ? (
                              <img
                                className="q_feedback_icon_imgurl"
                                src={ContactUs?.iconUrl}
                              />
                            ) : (
                              contact(
                                cardHovered[3]
                                  ? styleConfig.listHover?.iconColor ||
                                  "#9035FF"
                                  : iconColor,
                                styleConfig.listHover?.IconSize
                              )
                            )}
                          </div>
                          <div>
                            <div>
                              <div
                                className="q-fw-tab-heading"
                                style={{
                                  color: cardHovered[3]
                                    ? styleConfig?.listHover?.Heading ||
                                    styleConfig.listHeading?.color ||
                                    styleConfig?.Heading?.color ||
                                    BrandTheme?.primaryColor ||
                                    themeConfig?.primaryColor
                                    : styleConfig.listHeading?.color ||
                                    styleConfig?.Heading?.color ||
                                    BrandTheme?.primaryColor ||
                                    themeConfig?.primaryColor,
                                  ...styleConfig?.listHeading,
                                }}
                              >
                                {ContactUs?.heading || "Contact us"}
                              </div>
                            </div>
                            <div>
                              <div
                                style={{
                                  color: cardHovered[3]
                                    ? styleConfig?.listHover?.Description ||
                                    styleConfig?.listDescription?.color ||
                                    styleConfig?.Description?.color ||
                                    BrandTheme?.secondaryColor ||
                                    themeConfig?.secondaryColor
                                    : styleConfig?.listDescription?.color ||
                                    styleConfig?.Description?.color ||
                                    BrandTheme?.secondaryColor ||
                                    themeConfig?.secondaryColor,
                                  ...styleConfig?.listDescription,
                                }}
                                className="q-fw-tab-description"
                              >
                                {ContactUs?.description ||
                                  "Tell us how we can help"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        {showFooter && (
                          <QuestLabs
                            style={{
                              ...{
                                background: styleConfig?.Footer?.FooterStyle?.backgroundColor ||
                                  styleConfig?.Form?.backgroundColor ||
                                  styleConfig?.Form?.background ||
                                  BrandTheme?.background ||
                                  themeConfig?.backgroundColor,
                              },
                              ...styleConfig?.Footer?.FooterStyle,

                            }}
                            textStyle={styleConfig?.Footer?.FooterText}
                            iconStyle={styleConfig?.Footer?.FooterIcon}
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )}

            {submit && (
              <div
                className="q-fw-div"
                style={{
                  background:
                    styleConfig?.ThanksPopup?.Style?.background ||
                    styleConfig?.Form?.backgroundColor ||
                    BrandTheme?.background ||
                    themeConfig?.backgroundColor,
                  height:
                    styleConfig?.ThanksPopup?.Style?.height ||
                    styleConfig?.Form?.height ||
                    "auto",
                  fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif",
                  borderRadius:
                    styleConfig?.Form?.borderRadius ||
                    QuestThemeData?.borderRadius ||
                    BrandTheme?.borderRadius,
                  ...styleConfig?.ThanksPopup?.Style,
                }}
                id="disabledClick"
              >
                <div className="q_submit_cross_icon" onClick={handleThanks}>
                  {cross(iconColor, handleBackClick)}
                </div>
                <div className="q-fw-thanks">
                  <div>
                    <div className="q-svg-thanks">{thanksPopUpTick()}</div>
                    <div className="q_fw_submit_box">
                      <div className="q_feedback_text_submitted">
                        <div
                          className="q_feedback_text_cont"
                          style={{
                            color:
                              styleConfig?.Heading?.color ||
                              BrandTheme?.primaryColor ||
                              themeConfig?.primaryColor,
                            ...styleConfig?.ThanksPopup?.Heading,
                          }}
                        >
                          Feedback Submitted
                        </div>
                        <div
                          className="q_fw_submit_desc"
                          style={{
                            color:
                              styleConfig?.Description?.color ||
                              BrandTheme?.secondaryColor ||
                              themeConfig?.secondaryColor,
                            ...styleConfig?.ThanksPopup?.Description,
                          }}
                        >
                          Thanks for submitting your feedback with us. We
                          appreciate your review and will assure you to surely
                          consider them
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
                  <QuestLabs
                    style={{
                      ...{
                        background: styleConfig?.Footer?.FooterStyle?.backgroundColor ||
                          styleConfig?.Form?.backgroundColor ||
                          styleConfig?.Form?.background ||
                          BrandTheme?.background ||
                          themeConfig?.backgroundColor,
                      },
                      ...styleConfig?.Footer?.FooterStyle,

                    }}
                    textStyle={styleConfig?.Footer?.FooterText}
                    iconStyle={styleConfig?.Footer?.FooterIcon}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </ScreenCapture>
    </Modal>
  );
};

export default FeedbackWorkflow;
