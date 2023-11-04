import React, { useState, useEffect } from 'react';
import GeneralFeedbackContent from './GenralFb';
import BugContent from './Bug';
import FeatureContent from './Feature';
import { useContext } from 'react';
import QuestContext from '../QuestWrapper';
import config from '../../config';
import axios from 'axios';
// import ContactContent from './Contact';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../Login/Loader';
import Cookies from "universal-cookie";
import { backButton } from "../../assets/assetsSVG";
import crossCircle from "../../assets/images/crossCircle.png"

const feedback = (
  <svg
    width="50"
    height="50"
    viewBox="0 0 62 62"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_126_347)">
      <circle cx="31" cy="31" r="29" fill="white" />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M33.6257 19.9167C33.6257 19.8393 33.5949 19.7651 33.5402 19.7104C33.4855 19.6557 33.4113 19.625 33.334 19.625H25.1673C24.3164 19.625 23.5004 19.963 22.8987 20.5647C22.297 21.1664 21.959 21.9824 21.959 22.8333V39.1667C21.959 40.0176 22.297 40.8336 22.8987 41.4353C23.5004 42.037 24.3164 42.375 25.1673 42.375H36.834C37.6849 42.375 38.5009 42.037 39.1026 41.4353C39.7043 40.8336 40.0423 40.0176 40.0423 39.1667V27.6715C40.0423 27.5941 40.0116 27.52 39.9569 27.4653C39.9022 27.4106 39.828 27.3798 39.7507 27.3798H34.5007C34.2686 27.3798 34.046 27.2876 33.8819 27.1236C33.7178 26.9595 33.6257 26.7369 33.6257 26.5048V19.9167ZM34.5007 31.2917C34.7327 31.2917 34.9553 31.3839 35.1194 31.5479C35.2835 31.712 35.3757 31.9346 35.3757 32.1667C35.3757 32.3987 35.2835 32.6213 35.1194 32.7854C34.9553 32.9495 34.7327 33.0417 34.5007 33.0417H27.5007C27.2686 33.0417 27.046 32.9495 26.8819 32.7854C26.7178 32.6213 26.6257 32.3987 26.6257 32.1667C26.6257 31.9346 26.7178 31.712 26.8819 31.5479C27.046 31.3839 27.2686 31.2917 27.5007 31.2917H34.5007ZM34.5007 35.9583C34.7327 35.9583 34.9553 36.0505 35.1194 36.2146C35.2835 36.3787 35.3757 36.6013 35.3757 36.8333C35.3757 37.0654 35.2835 37.288 35.1194 37.4521C34.9553 37.6161 34.7327 37.7083 34.5007 37.7083H27.5007C27.2686 37.7083 27.046 37.6161 26.8819 37.4521C26.7178 37.288 26.6257 37.0654 26.6257 36.8333C26.6257 36.6013 26.7178 36.3787 26.8819 36.2146C27.046 36.0505 27.2686 35.9583 27.5007 35.9583H34.5007Z"
      fill="#AFAFAF"
    />
    <path
      d="M35.375 20.2937C35.375 20.0791 35.6002 19.9426 35.767 20.0767C35.9082 20.1911 36.0353 20.3241 36.1438 20.4757L39.659 25.3722C39.7383 25.4842 39.652 25.6289 39.5143 25.6289H35.6667C35.5893 25.6289 35.5151 25.5982 35.4604 25.5435C35.4057 25.4888 35.375 25.4146 35.375 25.3372V20.2937Z"
      fill="#AFAFAF"
    />
    <defs>
      <filter
        id="filter0_d_126_347"
        x="0"
        y="0"
        width="62"
        height="62"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_126_347"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_126_347"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
const bug = (
  <svg
    width="50"
    height="50"
    viewBox="0 0 62 62"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_126_357)">
      <circle cx="31" cy="31" r="29" fill="white" />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M31 22C30.5597 22 30.1318 22.1453 29.7825 22.4133C29.4333 22.6813 29.1822 23.0571 29.0682 23.4824C28.9543 23.9076 28.9838 24.3586 29.1523 24.7653C29.3208 25.1721 29.6187 25.5119 30 25.732V27H27C23.8 27 23 29.667 23 31V38C23 38.667 23.4 40 25 40H26V36C26 35.7348 26.1054 35.4804 26.2929 35.2929C26.4804 35.1054 26.7348 35 27 35H35C35.2652 35 35.5196 35.1054 35.7071 35.2929C35.8946 35.4804 36 35.7348 36 36V40H37C38.6 40 39 38.667 39 38V31C39 27.8 36.333 27 35 27H32V25.732C32.3813 25.5119 32.6792 25.1721 32.8477 24.7653C33.0162 24.3586 33.0457 23.9076 32.9318 23.4824C32.8178 23.0571 32.5667 22.6813 32.2175 22.4133C31.8682 22.1453 31.4403 22 31 22ZM34 40V37H32V40H34ZM30 40V37H28V40H30ZM40 37V32C40.667 32 42 32.4 42 34V35C42 35.667 41.6 37 40 37ZM22 32V37C20.4 37 20 35.667 20 35V34C20 32.4 21.333 32 22 32ZM28 31C27.7348 31 27.4804 31.1054 27.2929 31.2929C27.1054 31.4804 27 31.7348 27 32C27 32.2652 27.1054 32.5196 27.2929 32.7071C27.4804 32.8946 27.7348 33 28 33H28.001C28.2662 33 28.5206 32.8946 28.7081 32.7071C28.8956 32.5196 29.001 32.2652 29.001 32C29.001 31.7348 28.8956 31.4804 28.7081 31.2929C28.5206 31.1054 28.2662 31 28.001 31H28ZM33 32C33 31.7348 33.1054 31.4804 33.2929 31.2929C33.4804 31.1054 33.7348 31 34 31H34.001C34.2662 31 34.5206 31.1054 34.7081 31.2929C34.8956 31.4804 35.001 31.7348 35.001 32C35.001 32.2652 34.8956 32.5196 34.7081 32.7071C34.5206 32.8946 34.2662 33 34.001 33H34C33.7348 33 33.4804 32.8946 33.2929 32.7071C33.1054 32.5196 33 32.2652 33 32Z"
      fill="#AFAFAF"
    />
    <defs>
      <filter
        id="filter0_d_126_357"
        x="0"
        y="0"
        width="62"
        height="62"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_126_357"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_126_357"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
const feature = (
  <svg
    width="50"
    height="50"
    viewBox="0 0 62 62"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_126_368)">
      <circle cx="31" cy="31" r="29" fill="white" />
    </g>
    <path
      d="M38 20L36.74 22.75L34 24L36.74 25.26L38 28L39.25 25.26L42 24L39.25 22.75M28 23L25.5 28.5L20 31L25.5 33.5L28 39L30.5 33.5L36 31L30.5 28.5M38 34L36.74 36.74L34 38L36.74 39.25L38 42L39.25 39.25L42 38L39.25 36.74"
      fill="#AFAFAF"
    />
    <defs>
      <filter
        id="filter0_d_126_368"
        x="0"
        y="0"
        width="62"
        height="62"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_126_368"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_126_368"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
const back = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 7L11 16L20 25"
      stroke="#AFAFAF"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const cross = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24.4003 7.61363C24.2769 7.49003 24.1304 7.39196 23.9691 7.32505C23.8078 7.25815 23.6349 7.22371 23.4603 7.22371C23.2857 7.22371 23.1128 7.25815 22.9515 7.32505C22.7902 7.39196 22.6436 7.49003 22.5203 7.61363L16.0003 14.1203L9.4803 7.6003C9.35686 7.47686 9.21031 7.37894 9.04902 7.31213C8.88774 7.24532 8.71487 7.21094 8.5403 7.21094C8.36572 7.21094 8.19286 7.24532 8.03157 7.31213C7.87029 7.37894 7.72374 7.47686 7.6003 7.6003C7.47686 7.72374 7.37894 7.87029 7.31213 8.03157C7.24532 8.19286 7.21094 8.36572 7.21094 8.5403C7.21094 8.71487 7.24532 8.88774 7.31213 9.04902C7.37894 9.21031 7.47686 9.35686 7.6003 9.4803L14.1203 16.0003L7.6003 22.5203C7.47686 22.6437 7.37894 22.7903 7.31213 22.9516C7.24532 23.1129 7.21094 23.2857 7.21094 23.4603C7.21094 23.6349 7.24532 23.8077 7.31213 23.969C7.37894 24.1303 7.47686 24.2769 7.6003 24.4003C7.72374 24.5237 7.87029 24.6217 8.03157 24.6885C8.19286 24.7553 8.36572 24.7897 8.5403 24.7897C8.71487 24.7897 8.88774 24.7553 9.04902 24.6885C9.21031 24.6217 9.35686 24.5237 9.4803 24.4003L16.0003 17.8803L22.5203 24.4003C22.6437 24.5237 22.7903 24.6217 22.9516 24.6885C23.1129 24.7553 23.2857 24.7897 23.4603 24.7897C23.6349 24.7897 23.8077 24.7553 23.969 24.6885C24.1303 24.6217 24.2769 24.5237 24.4003 24.4003C24.5237 24.2769 24.6217 24.1303 24.6885 23.969C24.7553 23.8077 24.7897 23.6349 24.7897 23.4603C24.7897 23.2857 24.7553 23.1129 24.6885 22.9516C24.6217 22.7903 24.5237 22.6437 24.4003 22.5203L17.8803 16.0003L24.4003 9.4803C24.907 8.97363 24.907 8.1203 24.4003 7.61363Z"
      fill="#AFAFAF"
    />
  </svg>
);
const contact = (
  <svg
    width="50"
    height="50"
    viewBox="0 0 62 62"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_127_429)">
      <circle cx="31" cy="31" r="29" fill="white" />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M33.6257 19.9167C33.6257 19.8393 33.5949 19.7651 33.5402 19.7104C33.4855 19.6557 33.4113 19.625 33.334 19.625H25.1673C24.3164 19.625 23.5004 19.963 22.8987 20.5647C22.297 21.1664 21.959 21.9824 21.959 22.8333V39.1667C21.959 40.0176 22.297 40.8336 22.8987 41.4353C23.5004 42.037 24.3164 42.375 25.1673 42.375H36.834C37.6849 42.375 38.5009 42.037 39.1026 41.4353C39.7043 40.8336 40.0423 40.0176 40.0423 39.1667V27.6715C40.0423 27.5941 40.0116 27.52 39.9569 27.4653C39.9022 27.4106 39.828 27.3798 39.7507 27.3798H34.5007C34.2686 27.3798 34.046 27.2876 33.8819 27.1236C33.7178 26.9595 33.6257 26.7369 33.6257 26.5048V19.9167ZM34.5007 31.2917C34.7327 31.2917 34.9553 31.3839 35.1194 31.5479C35.2835 31.712 35.3757 31.9346 35.3757 32.1667C35.3757 32.3987 35.2835 32.6213 35.1194 32.7854C34.9553 32.9495 34.7327 33.0417 34.5007 33.0417H27.5007C27.2686 33.0417 27.046 32.9495 26.8819 32.7854C26.7178 32.6213 26.6257 32.3987 26.6257 32.1667C26.6257 31.9346 26.7178 31.712 26.8819 31.5479C27.046 31.3839 27.2686 31.2917 27.5007 31.2917H34.5007ZM34.5007 35.9583C34.7327 35.9583 34.9553 36.0505 35.1194 36.2146C35.2835 36.3787 35.3757 36.6013 35.3757 36.8333C35.3757 37.0654 35.2835 37.288 35.1194 37.4521C34.9553 37.6161 34.7327 37.7083 34.5007 37.7083H27.5007C27.2686 37.7083 27.046 37.6161 26.8819 37.4521C26.7178 37.288 26.6257 37.0654 26.6257 36.8333C26.6257 36.6013 26.7178 36.3787 26.8819 36.2146C27.046 36.0505 27.2686 35.9583 27.5007 35.9583H34.5007Z"
      fill="#AFAFAF"
    />
    <path
      d="M35.375 20.2937C35.375 20.0791 35.6002 19.9426 35.767 20.0767C35.9082 20.1911 36.0353 20.3241 36.1438 20.4757L39.659 25.3722C39.7383 25.4842 39.652 25.6289 39.5143 25.6289H35.6667C35.5893 25.6289 35.5151 25.5982 35.4604 25.5435C35.4057 25.4888 35.375 25.4146 35.375 25.3372V20.2937Z"
      fill="#AFAFAF"
    />
    <defs>
      <filter
        id="filter0_d_127_429"
        x="0"
        y="0"
        width="62"
        height="62"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_127_429"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_127_429"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

interface feedbackCompProps {
  userId: string;
  token: string;
  questIds: string[];
  answer?: any;
  setAnswer?: any;
  getAnswers?: any;
  btnColor?: string;
  btnTextColor?: string;
  textColor?: string;
  font?: string;
  contactUrl?: string;
  isOpen: boolean;
  onClose?: Function;
  backgroundColor?: string;
  zIndex?:number;
  topbarColor?: string;
  starColor?: string;
  starBorderColor?: string;
  tickBg?: string;
  ratingStyle?: "Star" | "Numbers" | "Smiles";
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
  userId,
  token,
  questIds,
  btnColor,
  btnTextColor,
  textColor,
  font,
  contactUrl,
  isOpen,
  onClose,
  backgroundColor,
  zIndex,
  topbarColor,
  starColor,
  starBorderColor,
  tickBg,
  ratingStyle
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedQuest, setSelectedQuest] = useState<string | null>(null);
  const [formdata, setFormdata] = useState<{ [key: number]: [FormDataItem] }>(
    {}
  );
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const { apiKey, apiSecret, entityId, featureFlags } = useContext(QuestContext.Context);
  const [answer, setAnswer] = useState<any[]>([]);

  const thanks = (
  <svg
    width="250"
    height="250"
    viewBox="0 0 413 396"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M199.73 62.9998L230.32 30.5996"
      stroke="#1B2537"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M379.666 190.801L410.255 158.4"
      stroke="#545454"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M305.893 379.803L336.482 347.402"
      stroke="#FACC15"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M7.19727 174.601L37.7867 142.201"
      stroke="#FACC15"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M88.1699 349.201L118.759 316.801"
      stroke="#545454"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <ellipse
      cx="149.35"
      cy="7.20004"
      rx="7.19751"
      ry="7.20004"
      fill="#2873FF"
    />
    <ellipse
      cx="116.957"
      cy="73.7977"
      rx="7.19751"
      ry="7.20004"
      fill="#EEEEEE"
    />
    <ellipse cx="61.178" cy="210.6" rx="7.19751" ry="7.20004" fill="#EEEEEE" />
    <ellipse cx="7.19751" cy="300.6" rx="7.19751" ry="7.20004" fill="#2873FF" />
    <ellipse cx="167.344" cy="388.8" rx="7.19751" ry="7.20004" fill="#EEEEEE" />
    <ellipse
      cx="278.903"
      cy="316.803"
      rx="8.99689"
      ry="9.00005"
      fill="#FACC15"
    />
    <ellipse
      cx="363.475"
      cy="271.799"
      rx="8.99689"
      ry="9.00005"
      fill="#EEEEEE"
    />
    <ellipse
      cx="329.284"
      cy="68.3985"
      rx="8.99689"
      ry="9.00005"
      fill="#2873FF"
    />
    <ellipse
      cx="318.49"
      cy="151.199"
      rx="5.39813"
      ry="5.40003"
      fill="#EEEEEE"
    />
    <ellipse
      cx="23.3923"
      cy="75.6012"
      rx="5.39813"
      ry="5.40003"
      fill="#FACC15"
    />
    <ellipse
      cx="205.129"
      cy="199.803"
      rx="89.9689"
      ry="90.0005"
      fill={tickBg || "#141414"}
    />
    <path
      d="M237.29 179.33L196.355 220.278L175.887 199.805"
      stroke={textColor || "white"}
      strokeWidth="5.67982"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

  const handleOptionClick = (option: string, quest: string) => {
    let cookies = new Cookies();
    let externalUserId = cookies.get("externalUserId");
    let questUserId = cookies.get("questUserId");
    let questUserToken = cookies.get("questUserToken");
    let personalUserId = JSON.parse(localStorage.getItem("persana-user") || "{}");
    if (!!externalUserId && !!questUserId && !!questUserToken && externalUserId == personalUserId._id) {
      let header = {
        apiKey: apiKey,
        apisecret: apiSecret,
        userId: questUserId,
        token: questUserToken,
      }
      axios.post(`${config.BACKEND_URL}api/entities/${entityId}/users/${userId}/metrics/feedback-${quest}?userId=${userId}&questId=${quest}`, {count: 1}, {headers: header})
    } else if (personalUserId._id) {
      const body = {
        externalUserId: !!personalUserId && personalUserId._id,
        entityId: entityId,
      }

      const headers = {
        apiKey: apiKey,
        apisecret: apiSecret,
        userId: userId,
        token: token,
      };

      axios.post(`${config.BACKEND_URL}api/users/external/login`, body, {headers})
        .then((res) => {
          let {userId, token} = res.data;
          let header = {...headers, ...{userId, token}}
          let cookies = new Cookies();
          const date = new Date();
          date.setHours(date.getHours() + 12)
          cookies.set("externalUserId", personalUserId._id, {path: "/", expires: date})
          cookies.set("questUserId", userId, {path: "/", expires: date})
          cookies.set("questUserToken", token, {path: "/", expires: date})
          axios.post(`${config.BACKEND_URL}api/entities/${entityId}/users/${userId}/metrics/feedback-${quest}?userId=${userId}&questId=${quest}`, {count: 1}, {headers: header})
      })
    }
    
    if (option === 'Contact us' && contactUrl) {
      window.open(contactUrl, "_blank");
    } else {
      setSelectedOption(option);
      setSelectedQuest(quest);
      setAnswer([]);
    }
  };

  function returnAnswers(index:number) {
    const headers = {
      apiKey: apiKey,
      apisecret: apiSecret,
      userId: userId,
      token: token,
    };
    let cookies = new Cookies();
    let externalUserId = cookies.get("externalUserId");
    let questUserId = cookies.get("questUserId");
    let questUserToken = cookies.get("questUserToken");
    let personalUserId = JSON.parse(localStorage.getItem("persana-user") || "{}");
    if (answer.length !== 0) {
      const ansArr = formdata[index].map((ans: any) => ({
        question: ans?.question || '',
        answer: [answer[ans?.criteriaId] || ''],
        criteriaId: ans?.criteriaId || '',
      }));
      if (!!externalUserId && !!questUserId && !!questUserToken && externalUserId == personalUserId._id) {
        let header = {
          apiKey: apiKey,
          apisecret: apiSecret,
          userId: questUserId,
          token: questUserToken,
        }
        setResult(header, userId)
      } else {
        setResult(headers, userId)
      }

      function setResult(headers: object, userId: string) {
        const request = `${config.BACKEND_URL}api/entities/${entityId}/quests/${selectedQuest}/verify-all?userId=${userId}`;
          const requestData = {
            criterias: ansArr,
          };
          setShowLoader(true);
          axios
            .post(request, requestData, { headers: headers })
            .then((response) => {
              if (response.data.success) {
                toast.success('Thank you for your feedback');
                setSubmit(true);
                setTimeout(() => {
                  setSubmit(false)
                  setSelectedOption(null)
                }, 4000);
                axios.post(`${config.BACKEND_URL}api/entities/${entityId}/users/${userId}/metrics/feedback-${selectedQuest}-com?userId=${userId}&questId=${selectedQuest}`, {count: 1}, {headers: headers})
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
    } else {
      toast.error('Please fill in all required fields.');
    }
      
  }


  const handleBackClick = () => {
    setSelectedOption(null);
  };
  function isDefaultQuestId(questId: string): boolean {
    const defaultIdPattern =
      /^q-[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return !defaultIdPattern.test(questId);
  }

  useEffect(() => {
    const headers = {
      apiKey: apiKey,
      apisecret: apiSecret,
      userId: userId,
      token: token,
    };
    let request;
    {
      questIds.map((id, index) => {
        const isDefault = isDefaultQuestId(id);
        if (isDefault) {
          request = `${config.BACKEND_URL}api/entities/${entityId}/default-quest/?userId=${userId}&defaultId=${id}`;
          axios.post(request, {}, { headers: headers }).then((res) => {
            let response = res.data.data;
            let criterias = response?.eligibilityData?.map((criteria: any) => {
              return {
                type: criteria?.data?.criteriaType,
                question: criteria?.data?.metadata?.title,
                options: criteria?.data?.metadata?.options || [],
                criteriaId: criteria?.data?.criteriaId,
                required: !criteria?.data?.metadata?.isOptional,
                placeholder: criteria?.data?.metadata?.placeholder,
              };
            });
            criterias = Array.isArray(criterias) ? criterias : [];
            setFormdata((prevFormdata) => {
              const updatedFormdata = { ...prevFormdata };
              updatedFormdata[index] = criterias;
              return updatedFormdata;
            });
          });
        } else {
          request = `${config.BACKEND_URL}api/entities/${entityId}/quests/${id}?userId=${userId}`;
          axios.get(request, { headers: headers }).then((res) => {
            let response = res.data;
            let criterias = response?.eligibilityData?.map((criteria: any) => {
              return {
                type: criteria?.data?.criteriaType,
                question: criteria?.data?.metadata?.title,
                options: criteria?.data?.metadata?.options || [],
                criteriaId: criteria?.data?.criteriaId,
                required: !criteria?.data?.metadata?.isOptional,
                placeholder: criteria?.data?.metadata?.placeholder,
              };
            });
            criterias = Array.isArray(criterias) ? criterias : [];
            setFormdata((prevFormdata) => {
              const updatedFormdata = { ...prevFormdata };
              updatedFormdata[index] = criterias;
              return updatedFormdata;
            });
          });
        }
      });
    }
  }, [questIds]);

  const handleUpdate = (e: any, id: string, j: string, k?: number) => {
    if (e.target.checked === true && j === 'check') {
      let ans = answer[id as unknown as number] || [];
      ans.push(e.target.value);
      setAnswer({
        ...answer,
        [id]: ans,
      });
    } else if (k) {
      setAnswer({
        ...answer,
        [id]: k,
      });
    } else if (
      e.target.checked === false &&
      typeof answer[id as unknown as number] === 'object' &&
      j === 'check'
    ) {
      let ans = answer[id as unknown as number];
      let mod_ans = ans.filter((an: string | number) => an !== e.target.value);
      setAnswer({
        ...answer,
        [id]: mod_ans,
      });
    } else {
      setAnswer({
        ...answer,
        [id]: e.target.value,
      });
    }
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

  if (featureFlags[config.FLAG_CONSTRAINTS.FeedbackWorkflowFlag]?.isEnabled == false) {
    return (<div></div>)
  }

  return (
    <div style={{position:"fixed", display: isOpen == true ? "flex" : "none", zIndex, width:"100vw", backgroundColor: "rgba(128,144,160,.7)"}} className="q-parent-container">
      {showLoader && <Loader />}
      <ToastContainer />
      <div className="q-fw-div" style={{backgroundColor}}>
        {selectedOption && !submit ? (
          <div>
            <div className="q-fw-heading" style={{backgroundColor: topbarColor}}>
              <div>
                {backButton(handleBackClick)}
                <p>{selectedOption}</p>
              </div>
              <img src={crossCircle} onClick={handleBackClick} alt="" />
            </div>
            <div style={{ padding: '20px 28px' }}>
              {selectedOption === 'General Feedback' && (
                <GeneralFeedbackContent
                  starColor={starColor}
                  handleSubmit={() => returnAnswers(0)}
                  handleUpdate={handleUpdate}
                  formdata={formdata[0]}
                  font={font}
                  textColor={textColor}
                  btnColor={btnColor}
                  btnTextColor={btnTextColor}
                  starBorderColor={starBorderColor}
                  answer={answer}
                  handleRemove={handleRemove}
                  ratingStyle={ratingStyle}
                />
              )}
              {selectedOption === 'Report a Bug' && (
                <BugContent
                  handleSubmit={() => returnAnswers(1)}
                  handleUpdate={handleUpdate}
                  formdata={formdata[1]}
                  font={font}
                  textColor={textColor}
                  btnColor={btnColor}
                  btnTextColor={btnTextColor}
                  answer={answer}
                  handleRemove={handleRemove}
                />
              )}
              {selectedOption === 'Request a Feature' && (
                <FeatureContent
                  handleSubmit={() => returnAnswers(2)}
                  handleUpdate={handleUpdate}
                  formdata={formdata[2]}
                  font={font}
                  textColor={textColor}
                  btnColor={btnColor}
                  answer={answer}
                  btnTextColor={btnTextColor}
                  handleRemove={handleRemove}
                />
              )}
              {selectedOption === 'Contact us' && (
                <div></div>
                // <ContactContent
                //   handleSubmit={() => returnAnswers(3)}
                //   handleUpdate={handleUpdate}
                //   formdata={formdata[3]}
                //   font={font}
                //   textColor={textColor}
                //   btnColor={btnColor}
                //   btnTextColor={btnTextColor}
                // />
              )}
            </div>
          </div>
        ) : submit ? (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                margin: '3%',
                cursor: 'pointer',
              }}
              onClick={handleThanks}
            >
              {cross}
            </div>
            <div className="q-fw-thanks">
              <div>
                {thanks}
                <div>
                  <p style={{ fontSize: '30px', fontWeight: 'bold' }}>
                    Thank you !
                  </p>
                  <p>We really appreciate your feedback.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className='q-fw-crossBtn'>
            <div onClick={() => onClose?.(false)}>{cross}</div>
            </div>
          <div
            style={{
              marginTop: '25px',
            }}
          >
            {questIds[0] && (
              <div
                onClick={() => handleOptionClick('General Feedback', questIds[0])}
                className="q-hover q-fw-cards"
              >
                {feedback}
                <div style={{ marginLeft: '8px' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: '600' }}>
                    General Feedback
                  </h4>
                  <p style={{ color: '#6B7280' }}>
                    Give general feedback on this page
                  </p>
                </div>
              </div>
            )}
            {questIds[1] && (
              <div
                onClick={() => handleOptionClick('Report a Bug', questIds[1])}
                className="q-hover q-fw-cards"
              >
                {bug}
                <div style={{ marginLeft: '10px' }}>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: '600' }}>
                      Report a Bug
                    </h4>
                  </div>
                  <div>
                    <p style={{ color: '#6B7280' }}>
                      Let us know what's broken
                    </p>
                  </div>
                </div>
              </div>
            )}
            {questIds[2] && (
              <div
                onClick={() => handleOptionClick('Request a Feature', questIds[2])}
                className="q-hover q-fw-cards"
              >
                <div>{feature}</div>
                <div style={{ marginLeft: '10px' }}>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: '600' }}>
                      Request a Feature
                    </h4>
                  </div>
                  <div>
                    <p style={{ color: '#6B7280' }}>
                      Tell us how we can improve
                    </p>
                  </div>
                </div>
              </div>
            )}
            {questIds[3] && (
              <div
                onClick={() => handleOptionClick('Contact us', questIds[3])}
                className="q-hover q-fw-cards"
              >
                <div>{contact}</div>
                <div style={{ marginLeft: '10px' }}>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: '600' }}>
                      Contact us
                    </h4>
                  </div>
                  <div>
                    <p style={{ color: '#6B7280' }}>Tell us how we can help</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            <p
            onClick={() => window.open('https://questlabs.ai', "_blank")}
              className="fd-powered-by"
              style={{
                color: textColor,
                marginTop: '10px'
              }}
            >
              Powered by Quest Labs
            </p>
          </div>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default FeedbackWorkflow;
