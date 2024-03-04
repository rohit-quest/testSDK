import React, { useState, useEffect } from 'react';
import GeneralFeedbackContent from './GenralFb';
import BugContent from './Bug';
import FeatureContent from './Feature';
import { useContext } from 'react';
import QuestContext from '../QuestWrapper';
import config from '../../config';
import axios from 'axios';
import Loader from '../Login/Loader';
import Cookies from "universal-cookie";
import showToast from '../toast/toastService';
import QuestLabs from '../QuestLabs';
import { Input } from '../Modules/Input';
import Label from '../Modules/Label';
import TextArea from '../Modules/TextArea';
import Modal from '../Modules/Modal';
import TopBar from '../Modules/TopBar';

const feedback = (color: string = "#939393") => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.5" d="M2 6.66671C2 4.15255 2 2.89547 2.78105 2.11442C3.5621 1.33337 4.81918 1.33337 7.33333 1.33337H8.66667C11.1808 1.33337 12.4379 1.33337 13.219 2.11442C14 2.89547 14 4.15255 14 6.66671V9.33337C14 11.8475 14 13.1046 13.219 13.8857C12.4379 14.6667 11.1808 14.6667 8.66667 14.6667H7.33333C4.81918 14.6667 3.5621 14.6667 2.78105 13.8857C2 13.1046 2 11.8475 2 9.33337V6.66671Z" fill={color} />
    <path fillRule="evenodd" clipRule="evenodd" d="M4.83334 6.66663C4.83334 6.39048 5.0572 6.16663 5.33334 6.16663H10.6667C10.9428 6.16663 11.1667 6.39048 11.1667 6.66663C11.1667 6.94277 10.9428 7.16663 10.6667 7.16663H5.33334C5.0572 7.16663 4.83334 6.94277 4.83334 6.66663Z" fill={color} />
    <path fillRule="evenodd" clipRule="evenodd" d="M4.83334 9.33337C4.83334 9.05723 5.0572 8.83337 5.33334 8.83337H8.66668C8.94282 8.83337 9.16668 9.05723 9.16668 9.33337C9.16668 9.60952 8.94282 9.83337 8.66668 9.83337H5.33334C5.0572 9.83337 4.83334 9.60952 4.83334 9.33337Z" fill={color} />
  </svg>
);
const bug = (color: string = "#939393") => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M12.6667 7.95837V10C12.6667 12.4085 10.8422 14.3907 8.50001 14.6402V10C8.50001 9.7239 8.27615 9.50004 8.00001 9.50004C7.72387 9.50004 7.50001 9.7239 7.50001 10V14.6402C5.15779 14.3907 3.33334 12.4085 3.33334 10V7.95837C3.33334 6.84682 4.02423 5.89663 5.00001 5.51381C5.29689 5.39733 5.62015 5.33337 5.95834 5.33337H10.0417C10.3799 5.33337 10.7031 5.39733 11 5.51381C11.9758 5.89663 12.6667 6.84682 12.6667 7.95837Z" fill={color} />
    <path d="M12.6667 9.83337V8.83337H14.6667C14.9428 8.83337 15.1667 9.05723 15.1667 9.33337C15.1667 9.60951 14.9428 9.83337 14.6667 9.83337H12.6667Z" fill={color} />
    <path d="M11.6637 12.8909C11.8709 12.6286 12.0506 12.3436 12.1983 12.0402L13.8903 12.8863C14.1373 13.0098 14.2374 13.3101 14.1139 13.5571C13.9904 13.8041 13.69 13.9042 13.443 13.7807L11.6637 12.8909Z" fill={color} />
    <path d="M3.80173 12.0402C3.94946 12.3436 4.12912 12.6286 4.33634 12.8909L2.55697 13.7807C2.30999 13.9042 2.00965 13.8041 1.88614 13.5571C1.76263 13.3101 1.86273 13.0098 2.10971 12.8863L3.80173 12.0402Z" fill={color} />
    <path d="M3.33334 8.83337H1.33334C1.0572 8.83337 0.833344 9.05723 0.833344 9.33337C0.833344 9.60951 1.0572 9.83337 1.33334 9.83337H3.33334V8.83337Z" fill={color} />
    <path d="M11.569 5.82319L13.443 4.88604C13.69 4.76253 13.9904 4.86263 14.1139 5.10961C14.2374 5.35659 14.1373 5.65693 13.8903 5.78044L12.2797 6.58585C12.0958 6.28667 11.8536 6.02717 11.569 5.82319Z" fill={color} />
    <path d="M4.43103 5.82319C4.14637 6.02717 3.90419 6.28667 3.72032 6.58585L2.10971 5.78044C1.86273 5.65693 1.76263 5.35659 1.88614 5.10961C2.00965 4.86263 2.30999 4.76253 2.55697 4.88604L4.43103 5.82319Z" fill={color} />
    <path d="M11 5.51376V5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5V5.51376C5.29688 5.39729 5.62014 5.33333 5.95833 5.33333H10.0417C10.3799 5.33333 10.7031 5.39729 11 5.51376Z" fill={color} />
    <g opacity="0.5">
      <path d="M4.25068 1.05595C4.09751 1.28572 4.1596 1.59615 4.38936 1.74933L5.96243 2.79804C6.23013 2.5502 6.54312 2.35058 6.88758 2.21296L4.94406 0.91728C4.7143 0.764104 4.40386 0.826191 4.25068 1.05595Z" fill={color} />
      <path d="M10.0376 2.79808C9.7699 2.55024 9.45692 2.35061 9.11246 2.21299L11.056 0.91728C11.2858 0.764104 11.5962 0.826191 11.7494 1.05595C11.9026 1.28572 11.8405 1.59615 11.6107 1.74933L10.0376 2.79808Z" fill={color} />
    </g>
    <path fillRule="evenodd" clipRule="evenodd" d="M8 9.5C8.27614 9.5 8.5 9.72386 8.5 10V14.6667H7.5V10C7.5 9.72386 7.72386 9.5 8 9.5Z" fill={color} />
  </svg>
);
const feature = (color: string = "#939393") => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.5" d="M2.30965 13.6904C3.28596 14.6667 4.85731 14.6667 8.00001 14.6667C11.1427 14.6667 12.7141 14.6667 13.6904 13.6904C14.6667 12.7141 14.6667 11.1427 14.6667 8.00004C14.6667 4.85734 14.6667 3.286 13.6904 2.30968C12.7141 1.33337 11.1427 1.33337 8.00001 1.33337C4.85731 1.33337 3.28596 1.33337 2.30965 2.30968C1.33334 3.286 1.33334 4.85734 1.33334 8.00004C1.33334 11.1427 1.33334 12.7141 2.30965 13.6904Z" fill={color} />
    <path d="M11.3333 8.44437C11.3333 11.2888 8.96295 11.9999 7.77777 11.9999C6.74073 11.9999 4.66666 11.2888 4.66666 8.44437C4.66666 7.20719 5.37527 6.42176 5.97061 6.02642C6.2428 5.84568 6.58133 5.9612 6.59893 6.28746C6.63743 7.00132 7.1876 7.57473 7.61366 7.00066C8.00362 6.47524 8.19607 5.76174 8.19607 5.33326C8.19607 4.70207 8.83499 4.30098 9.33384 4.68769C10.3062 5.44146 11.3333 6.70382 11.3333 8.44437Z" fill={color} />
  </svg>
);
const cross = (color = "#AFAFAF", onClick?: () => void) => (
  <div onClick={() => onClick?.()} style={{
    cursor: "pointer", padding:'4px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius :'4px'
  }}>
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
const contact = (color: string = "#939393") => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.5" d="M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8.00004C1.33334 4.31814 4.31811 1.33337 8.00001 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z" fill={color} />
    <path d="M8 5.16663C7.58579 5.16663 7.25 5.50241 7.25 5.91663C7.25 6.19277 7.02614 6.41663 6.75 6.41663C6.47386 6.41663 6.25 6.19277 6.25 5.91663C6.25 4.95013 7.0335 4.16663 8 4.16663C8.9665 4.16663 9.75 4.95013 9.75 5.91663C9.75 6.39052 9.56098 6.82128 9.25531 7.13593C9.1938 7.19925 9.13512 7.25787 9.07915 7.3138L9.07915 7.3138C8.93526 7.45757 8.8092 7.58352 8.6986 7.72562C8.55258 7.91324 8.5 8.05113 8.5 8.16663V8.66663C8.5 8.94277 8.27614 9.16663 8 9.16663C7.72386 9.16663 7.5 8.94277 7.5 8.66663V8.16663C7.5 7.72983 7.70334 7.37625 7.90945 7.11143C8.06195 6.91549 8.25363 6.72419 8.40918 6.56894L8.40918 6.56894C8.45611 6.5221 8.49975 6.47855 8.53803 6.43914C8.66972 6.30358 8.75 6.11999 8.75 5.91663C8.75 5.50241 8.41421 5.16663 8 5.16663Z" fill={color} />
    <path d="M8 11.3333C8.36819 11.3333 8.66667 11.0348 8.66667 10.6666C8.66667 10.2984 8.36819 9.99996 8 9.99996C7.63181 9.99996 7.33333 10.2984 7.33333 10.6666C7.33333 11.0348 7.63181 11.3333 8 11.3333Z" fill={color} />
  </svg>

);

type optionType = 'Contact us' | 'Request a Feature' | 'Report a Bug' | 'General Feedback'

interface feedbackCompProps {
  // userId: string;
  // token: string;
  // questIds: string[];
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
  tickBg?: string;
  ratingStyle?: "Star" | "Numbers" | "Smiles";
  // uniqueUserId?: string;
  // uniqueEmailId?: string;
  descriptions?: Record<optionType, string>;
  backBtn?: boolean;
  iconColor?: string;
  styleConfig?: {
    Form?: React.CSSProperties,
    Heading?: React.CSSProperties,
    Description?: React.CSSProperties,
    Input?: React.CSSProperties,
    Label?: React.CSSProperties,
    TextArea?: React.CSSProperties,
    PrimaryButton?: React.CSSProperties,
    SecondaryButton?: React.CSSProperties,
    Modal?: React.CSSProperties,
    Footer?: React.CSSProperties,
    listHeading?:React.CSSProperties,
    listDescription?:React.CSSProperties,
    listHover?: {
      background?: string,
      iconBackground?: string,
      iconColor?: string
    }
  };
  showFooter?:boolean
  offlineFormData: FormDataItem[][];
}
interface FormDataItem {
  type?: string;
  question?: string;
  options?: [string];
  criteriaId?: string;
  required?: boolean;
  placeholder?: string;
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
  // uniqueUserId,
  // uniqueEmailId,
  descriptions = { "General Feedback": "Welcome back, Please complete your details", "Report a Bug": "Describe your issue", "Contact us": "Invite other admins and moderators", "Request a Feature": "How can we make it better" },
  iconColor = "#939393",
  styleConfig = {},
  offlineFormData,
  showFooter = true
  
}) => {
  const [selectedOption, setSelectedOption] = useState<optionType | null>(null);
  const [selectedQuest, setSelectedQuest] = useState<string | null>(null);
  // const [offlineFormData, setFormdata] = useState<{ [key: number]: [FormDataItem] }>({});
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const { apiKey, apiSecret, entityId, featureFlags, apiType,themeConfig } = useContext(QuestContext.Context);
  const [cardHovered, setCardHovered] = useState([false, false, false, false]);
  const [answer, setAnswer] = useState<Record<string, string>>({});
  let BACKEND_URL = apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL

  const thanks = (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipRule="url(#clip0_4046_146)">
        <path d="M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80Z" fill="url(#paint0_linear_4046_146)" />
        <path d="M48.4167 79.0566C49.1837 78.9078 49.9463 78.7367 50.7033 78.5432C51.987 78.1844 53.2519 77.7617 54.4933 77.2766C55.7363 76.7955 56.9545 76.2526 58.1433 75.6499C59.3325 75.0449 60.4906 74.3807 61.6133 73.6599C62.7348 72.939 63.8195 72.1625 64.8633 71.3332C65.9091 70.5029 66.9125 69.6207 67.87 68.6899C68.8259 67.7614 69.7348 66.7858 70.5933 65.7666C71.4526 64.7465 72.2603 63.684 73.0133 62.5832C73.7662 61.4843 74.4638 60.3484 75.1033 59.1799C75.743 58.0097 76.3237 56.8082 76.8433 55.5799C77.3635 54.3514 77.8218 53.0976 78.2167 51.8232C78.5548 50.7075 78.8439 49.5776 79.0833 48.4366L55.3167 24.6732C53.3096 22.6573 50.9236 21.0581 48.2961 19.9677C45.6686 18.8774 42.8514 18.3174 40.0067 18.3199C37.1594 18.3168 34.3395 18.8765 31.7092 19.9668C29.0789 21.0572 26.6901 22.6566 24.68 24.6732C22.6649 26.6839 21.0661 29.0724 19.9753 31.7018C18.8845 34.3312 18.323 37.1499 18.323 39.9966C18.323 42.8433 18.8845 45.662 19.9753 48.2914C21.0661 50.9208 22.6649 53.3092 24.68 55.3199L48.4167 79.0566Z" fill="url(#paint1_linear_4046_146)" />
        <path d="M40.0033 18.3232C45.5433 18.3232 51.0833 20.4398 55.3233 24.6765C57.3384 26.6872 58.9372 29.0756 60.028 31.705C61.1188 34.3344 61.6803 37.1532 61.6803 39.9998C61.6803 42.8465 61.1188 45.6653 60.028 48.2947C58.9372 50.9241 57.3384 53.3125 55.3233 55.3232C53.3126 57.3383 50.9242 58.937 48.2948 60.0279C45.6654 61.1187 42.8467 61.6802 40 61.6802C37.1533 61.6802 34.3346 61.1187 31.7052 60.0279C29.0758 58.937 26.6873 57.3383 24.6767 55.3232C22.6615 53.3125 21.0628 50.9241 19.972 48.2947C18.8811 45.6653 18.3196 42.8465 18.3196 39.9998C18.3196 37.1532 18.8811 34.3344 19.972 31.705C21.0628 29.0756 22.6615 26.6872 24.6767 24.6765C26.6867 22.6599 29.0756 21.0604 31.7059 19.9701C34.3361 18.8798 37.156 18.3201 40.0033 18.3232ZM49.87 33.3298C49.5544 33.3601 49.2539 33.4791 49.0033 33.6732L36.8233 42.8065L31.18 37.1665C29.9566 35.8932 27.5467 38.2998 28.8233 39.5232L35.49 46.1898C35.779 46.4631 36.1536 46.6281 36.5504 46.6566C36.9471 46.6852 37.3415 46.5756 37.6667 46.3465L51 36.3465C52.12 35.5298 51.43 33.3532 50.0433 33.3332C49.9867 33.3303 49.9299 33.3303 49.8733 33.3332L49.87 33.3298Z" fill="white" />
      </g>
      <defs>
        <linearGradient id="paint0_linear_4046_146" x1="0.320001" y1="80" x2="87.5968" y2="71.0629" gradientUnits="userSpaceOnUse">
          <stop stop-color="#9035FF" />
          <stop offset="1" stop-color="#0065FF" />
        </linearGradient>
        <linearGradient id="paint1_linear_4046_146" x1="18.566" y1="79.0566" x2="84.8526" y2="72.2662" gradientUnits="userSpaceOnUse">
          <stop stop-color="#9035FF" />
          <stop offset="1" stop-color="#0065FF" />
        </linearGradient>
        <clipPath id="clip0_4046_146">
          <rect width="80" height="80" fill="white" />
        </clipPath>
      </defs>
    </svg>

  );

  const handleOptionClick = (option: optionType) => {
    let cookies = new Cookies();
    let externalUserId = cookies.get("externalUserId");
    let questUserId = cookies.get("questUserId");
    let questUserToken = cookies.get("questUserToken");
    let personalUserId = JSON.parse(localStorage.getItem("persana-user") || "{}");
    // if (!!externalUserId && !!questUserId && !!questUserToken && externalUserId == uniqueUserId) {
    //   let header = {
    //     apiKey: apiKey,
    //     apisecret: apiSecret,
    //     userId: questUserId,
    //     token: questUserToken,
    //   }
    //   axios.post(`${BACKEND_URL}api/entities/${entityId}/users/${userId}/metrics/feedback-${quest}?userId=${userId}&questId=${quest}`, { count: 1 }, { headers: header })
    // } else if (uniqueUserId) {
    //   const body = {
    //     externalUserId: !!uniqueUserId && uniqueUserId,
    //     entityId: entityId,
    //     email: uniqueEmailId
    //   }

    //   const headers = {
    //     apiKey: apiKey,
    //     apisecret: apiSecret,
    //     userId: userId,
    //     token: token,
    //   };

    //   axios.post(`${BACKEND_URL}api/users/external/login`, body, { headers })
    //     .then((res) => {
    //       let { userId, token } = res.data;
    //       let header = { ...headers, ...{ userId, token } }
    //       let cookies = new Cookies();
    //       const date = new Date();
    //       date.setHours(date.getHours() + 12)
    //       cookies.set("externalUserId", uniqueUserId, { path: "/", expires: date })
    //       cookies.set("questUserId", userId, { path: "/", expires: date })
    //       cookies.set("questUserToken", token, { path: "/", expires: date })
    //       axios.post(`${BACKEND_URL}api/entities/${entityId}/users/${userId}/metrics/feedback-${quest}?userId=${userId}&questId=${quest}`, { count: 1 }, { headers: header })
    //     })
    // }

    if (option === 'Contact us' && contactUrl) {
      window.open(contactUrl, "_blank");
    } else {
      setSelectedOption(option);
      // setSelectedQuest();
      setAnswer({});
    }
  };
  function returnAnswers(index: number) {

    // const headers = {
    //   apiKey: apiKey,
    //   apisecret: apiSecret,
    //   userId: userId,
    //   token: token,
    // };
    // let cookies = new Cookies();
    // let externalUserId = cookies.get("externalUserId");
    // let questUserId = cookies.get("questUserId");
    // let questUserToken = cookies.get("questUserToken");
    if (Object.keys(answer).length !== 0) {
      const ansArr = offlineFormData[index].map((ans: any) => ({
        question: ans?.question || '',
        answer: [answer[ans?.criteriaId] || ''],
        criteriaId: ans?.criteriaId || '',
      }));
      // if (!!externalUserId && !!questUserId && !!questUserToken && externalUserId == uniqueUserId) {
      //   let header = {
      //     apiKey: apiKey,
      //     apisecret: apiSecret,
      //     userId: questUserId,
      //     token: questUserToken,
      //   }
      //   setResult(header, header.userId)
      // } else {
      //   setResult(headers, userId)
      // }

      // function setResult(headers: object, userId: string) {
      //   const request = `${BACKEND_URL}api/entities/${entityId}/quests/${selectedQuest}/verify-all?userId=${userId}`;
      //   const requestData = {
      //     criterias: ansArr,
      //   };
      //   setShowLoader(true);
      //   axios
      //     .post(request, requestData, { headers: headers })
      //     .then((response) => {
      //       if (response.data.success) {
      showToast.success({ text: 'Thank you for your feedback' });
      setSubmit(true);
      setTimeout(() => {
        setSubmit(false)
        setSelectedOption(null)
      }, 4000);
      //           axios.post(`${BACKEND_URL}api/entities/${entityId}/users/${userId}/metrics/feedback-${selectedQuest}-com?userId=${userId}&questId=${selectedQuest}`, { count: 1 }, { headers: headers })
      //         } else {
      //           showToast.error({ text: response.data.error });
      //         }
      //       })
      //       .catch((error) => {
      //         console.error('Error:', error);
      //       })
      //       .finally(() => {
      //         setShowLoader(false);
      //       });
      //   }
      // } else {
      //   showToast.error('Please fill in all required fields.');
      // }

    }
  }

  const handleBackClick = () => {
    setSelectedOption(null);
  };
  // function isDefaultQuestId(questId: string): boolean {
  //   const defaultIdPattern =
  //     /^q-[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  //   return !defaultIdPattern.test(questId);
  // }

  useEffect(() => {
    // const headers = {
    //   apiKey: apiKey,
    //   apisecret: apiSecret,
    //   userId: userId,
    //   token: token,
    // };
    let request;
    {
      // questIds.map((id, index) => {
      //   const isDefault = isDefaultQuestId(id);
      //   if (isDefault) {
      //     request = `${BACKEND_URL}api/entities/${entityId}/default-quest/?userId=${userId}&defaultId=${id}`;
      //     axios.post(request, {}, { headers: headers }).then((res) => {
      //       let response = res.data.data;
      //       let criterias = response?.eligibilityData?.map((criteria: any) => {
      //         return {
      //           type: criteria?.data?.criteriaType,
      //           question: criteria?.data?.metadata?.title,
      //           options: criteria?.data?.metadata?.options || [],
      //           criteriaId: criteria?.data?.criteriaId,
      //           required: !criteria?.data?.metadata?.isOptional,
      //           placeholder: criteria?.data?.metadata?.placeholder,
      //         };
      //       });
      //       criterias = Array.isArray(criterias) ? criterias : [];
      //       setFormdata((prevFormdata) => {
      //         const updatedFormdata = { ...prevFormdata };
      //         updatedFormdata[index] = criterias;
      //         return updatedFormdata;
      //       });
      //     });
      //   } else {
      //     request = `${BACKEND_URL}api/entities/${entityId}/quests/${id}?userId=${userId}`;
      //     axios.get(request, { headers: headers }).then((res) => {
      //       let response = res.data;
      //       let criterias = response?.eligibilityData?.map((criteria: any) => {
      //         return {
      //           type: criteria?.data?.criteriaType,
      //           question: criteria?.data?.metadata?.title,
      //           options: criteria?.data?.metadata?.options || [],
      //           criteriaId: criteria?.data?.criteriaId,
      //           required: !criteria?.data?.metadata?.isOptional,
      //           placeholder: criteria?.data?.metadata?.placeholder,
      //         };
      //       });
      //       criterias = Array.isArray(criterias) ? criterias : [];
      //       setFormdata((prevFormdata) => {
      //         const updatedFormdata = { ...prevFormdata };
      //         updatedFormdata[index] = criterias;
      //         return updatedFormdata;
      //       });
      //     });
      //   }
      // });
    }
  }, []);

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
      [id]: ""
    })
  }
  function isValidEmail(email: string) {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
  }
  const normalInput = (question: string, criteriaId: string, placeholder?: string) => {
    return (
      <div className="" key={criteriaId}>
        <Label htmlFor={'normalInput'}
          children={question}
          style={styleConfig.Label}
        />
        <Input
          type='text'
          style={styleConfig.Input}
          placeholder={placeholder}
          value={answer[criteriaId]}
          onChange={(e) => handleUpdate(e, criteriaId, "")}
        />
      </div>
    );
  };
  const emailInput = (question: string, criteriaId: string, placeholder?: string) => {
    return (
      <div className="" key={criteriaId}>
        <Label htmlFor={'normalInput'}
          children={question}
          style={styleConfig.Label}
        />
        <Input
          type='email'
          style={styleConfig.Input}
          placeholder={placeholder}
          value={answer[criteriaId]}
          onChange={(e) => handleUpdate(e, criteriaId, "")}
        />
        {
          isValidEmail(answer[criteriaId]) &&
          <div className='q-input-email-checks'>This is not a valid email</div>
        }
      </div>
    );
  };

  const normalInput2 = (question: string, criteriaId: string, placeholder?: string) => {
    return (
      <div className="" key={criteriaId}>
        <Label htmlFor={'normalInput'}
          children={question}
          style={styleConfig.Label}
        />
        <TextArea
          onChange={(e) => handleUpdate(e, criteriaId, "")}
          value={answer[criteriaId]}
          placeholder={placeholder}
        />
      </div>
    );
  };

  if (featureFlags[config.FLAG_CONSTRAINTS.FeedbackWorkflowFlag]?.isEnabled == false) {
    return (<div></div>)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose || (() => { })} style={{ padding: 0, background: 'transparent', ...styleConfig.Modal }}>
      {showLoader && <Loader />}
      <div className="q-fw-div" 
      style={{
        background: styleConfig?.Form?.backgroundColor || themeConfig?.backgroundColor, height: styleConfig?.Form?.height || "auto", fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif" , ...styleConfig?.Form
      }}
       id='disabledClick'>
        {selectedOption && !submit ? (
          <div>
            <TopBar 
            style={{
              headingStyle: {  color: styleConfig?.Heading?.color || themeConfig?.primaryColor, ...styleConfig?.Heading },
              descriptionStyle: { color: styleConfig?.Description?.color || themeConfig?.secondaryColor, ...styleConfig?.Description } ,
            }}
              description={descriptions[selectedOption]}
              heading={selectedOption}
              iconColor={iconColor}
              onClose={handleBackClick}
            />
            <div style={{ padding: '20px' }}>
              {selectedOption === 'General Feedback' && (
                <GeneralFeedbackContent
                  starColor={starColor}
                  handleSubmit={() => returnAnswers(0)}
                  handleUpdate={handleUpdate}
                  formdata={offlineFormData[0] }
                  normalInput={normalInput}
                  emailInput={emailInput}
                  normalInput2={normalInput2}
                  starBorderColor={starBorderColor}
                  answer={answer}
                  handleRemove={handleRemove}
                  ratingStyle={ratingStyle}
                  iconColor={iconColor}
                  buttonStyle={styleConfig.PrimaryButton}
                />
              )}
              {selectedOption === 'Report a Bug' && (
                <BugContent
                  handleSubmit={() => returnAnswers(1)}
                  handleUpdate={handleUpdate}
                  formdata={offlineFormData[1]}
                  answer={answer}
                  normalInput={normalInput}
                  normalInput2={normalInput2}
                  emailInput={emailInput}
                  handleRemove={handleRemove}
                />
              )}
              {selectedOption === 'Request a Feature' && (
                <FeatureContent
                  handleSubmit={() => returnAnswers(2)}
                  handleUpdate={handleUpdate}
                  formdata={offlineFormData[2]}
                  normalInput={normalInput}
                  normalInput2={normalInput2}
                  emailInput={emailInput}
                  answer={answer}
                  handleRemove={handleRemove}
                />
              )}
              {selectedOption === 'Contact us' && (
                <div></div>
              )}
            </div>
            {showFooter &&  <QuestLabs style={styleConfig?.Footer} /> }
          </div>
        ) : submit ? (
          <div>
            <div
              className='q_submit_cross_icon'
              onClick={handleThanks}
            >
              {cross(iconColor, handleBackClick)}
            </div>
            <div className="q-fw-thanks">
              <div>
                <div  className='q-svg-thanks'>
                {thanks}
                </div>
                <div className='q_fw_submit_box'>
                  <div className='q_feedback_text_submitted'>
                  <div className='q_feedback_text_cont' style={{ color: styleConfig?.Heading?.color || themeConfig?.primaryColor }}>
                    Feedback Submitted
                  </div>
                  <div className='q_fw_submit_desc'
                   style={{ color: styleConfig?.Description?.color || themeConfig?.secondaryColor }}
                  >Thanks for submitting your feedback with us. We appreciate your review and will assure you to surely consider them</div>
                  </div>
                  <div className='q_fw_submit_back'>Go to home!</div>
                </div>
              </div>
            </div>
            {showFooter &&  <QuestLabs style={styleConfig?.Footer} /> }
          </div>
        ) : (
          <div>
            <div className='q-fw-crossBtn'>
              <div onClick={() => onClose?.()}>{cross(iconColor)}</div>
            </div>
            <div className='q-fw-content-box'>
              {(
                <div
                  onClick={() => handleOptionClick('General Feedback',)}
                  className="q-hover q-fw-cards"
                  onMouseEnter={() => setCardHovered([true, false, false, false])}
                  onMouseLeave={() => setCardHovered([false, false, false, false])}
                  style={{ background: cardHovered[0] ? styleConfig.listHover?.background || '#FBFBFB' : 'transparent', borderRadius: '8px' }}
                >
                 <div className='q_feedback_icon'
                    style={{ background: cardHovered[0] ? styleConfig.listHover?.iconBackground || '#F4EBFF' : '#FBFBFB' }}
                  >{feedback(cardHovered[0] ? styleConfig.listHover?.iconColor || '#9035FF' : iconColor)}</div>
                  <div>
                    <div className='q-fw-tab-heading'
                     style={{ color: styleConfig.listHeading?.color || styleConfig?.Heading?.color || themeConfig?.primaryColor ,
                      ...styleConfig?.listHeading
                      }}
                    >
                      General Feedback
                    </div>
                    <div className='q-fw-tab-description'
                      style={{ color:styleConfig?.listDescription?.color || styleConfig?.Description?.color || themeConfig?.secondaryColor ,
                        ...styleConfig?.listDescription
                      }}
                    >
                      Give general feedback on this page
                    </div>
                  </div>
                </div>
              )}
              {(
                <div
                  onClick={() => handleOptionClick('Report a Bug',)}
                  className="q-hover q-fw-cards"
                  onMouseEnter={() => setCardHovered([false, true, false, false])}
                  onMouseLeave={() => setCardHovered([false, false, false, false])}
                  style={{ background: cardHovered[1] ? styleConfig.listHover?.background || '#FBFBFB' : 'transparent', borderRadius: '8px' }}
                >
                 <div className='q_feedback_icon'
                    style={{ background: cardHovered[1] ? styleConfig.listHover?.iconBackground || '#F4EBFF' : '#FBFBFB' }}
                  >{bug(cardHovered[1] ? styleConfig.listHover?.iconColor || '#9035FF' : iconColor)}</div>
                  <div>
                    <div>
                      <div className='q-fw-tab-heading'
                      style={{ color: styleConfig.listHeading?.color || styleConfig?.Heading?.color || themeConfig?.primaryColor ,
                        ...styleConfig?.listHeading
                        }}
                      >
                        Report a Bug
                      </div>
                    </div>
                    <div>
                      <div className='q-fw-tab-description'
                        style={{ color:styleConfig?.listDescription?.color || styleConfig?.Description?.color || themeConfig?.secondaryColor ,
                          ...styleConfig?.listDescription
                        }}
                      >
                        Let us know what's broken
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {(
                <div
                  onClick={() => handleOptionClick('Request a Feature',)}
                  className="q-hover q-fw-cards"
                  onMouseEnter={() => setCardHovered([false, false, true, false])}
                  onMouseLeave={() => setCardHovered([false, false, false, false])}
                  style={{ background: cardHovered[2] ? styleConfig.listHover?.background || '#FBFBFB' : 'transparent', borderRadius: '8px' }}
                >
                <div className='q_feedback_icon'
                    style={{ background: cardHovered[2] ? styleConfig.listHover?.iconBackground || '#F4EBFF' : '#FBFBFB' }}
                  >{feature(cardHovered[2] ? styleConfig.listHover?.iconColor || '#9035FF' : iconColor)}</div>
                  <div>
                    <div>
                      <div className='q-fw-tab-heading'
                       style={{ color: styleConfig.listHeading?.color || styleConfig?.Heading?.color || themeConfig?.primaryColor ,
                        ...styleConfig?.listHeading
                        }}
                      >
                        Request a Feature
                      </div>
                    </div>
                    <div>
                      <div className='q-fw-tab-description'
                        style={{ color:styleConfig?.listDescription?.color || styleConfig?.Description?.color || themeConfig?.secondaryColor ,
                          ...styleConfig?.listDescription
                        }}
                      >
                        Tell us how we can improve
                      </div>
                    </div>
                  </div>
                </div>
              )}
              { (
                <div
                  onClick={() => handleOptionClick('Contact us',)}
                  className="q-hover q-fw-cards"
                  onMouseEnter={() => setCardHovered([false, false, false, true])}
                  onMouseLeave={() => setCardHovered([false, false, false, false])}
                  style={{ background: cardHovered[3] ? styleConfig.listHover?.background || '#FBFBFB' : 'transparent', borderRadius: '8px' }}
                >
                  <div className='q_feedback_icon'
                    style={{ background: cardHovered[3] ? styleConfig.listHover?.iconBackground || '#F4EBFF' : '#FBFBFB' }}
                  >{contact(cardHovered[3] ? styleConfig.listHover?.iconColor || '#9035FF' : iconColor)}</div>
                  <div>
                    <div>
                      <div className='q-fw-tab-heading'
                      style={{ color: styleConfig.listHeading?.color || styleConfig?.Heading?.color || themeConfig?.primaryColor ,
                        ...styleConfig?.listHeading
                        }}
                      >
                        Contact us
                      </div>
                    </div>
                    <div>
                      <div className='q-fw-tab-description'
                       style={{ color:styleConfig?.listDescription?.color || styleConfig?.Description?.color || themeConfig?.secondaryColor ,
                        ...styleConfig?.listDescription
                      }}
                      >Tell us how we can help</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
            {showFooter &&
            <QuestLabs style={styleConfig.Footer} />
            }  
            
            
            </div>
          </div>
        )}

      </div></Modal>
  );
};

export default FeedbackWorkflow;
