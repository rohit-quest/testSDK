import React, { useContext, useEffect, useRef, useState } from 'react';
import QuestContext from '../QuestWrapper';
import axios from 'axios';
import config from '../../config';
import './Feedback.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../Login/Loader';
import "../Onboarding/onboarding.css"
import '../FeedbackOverview/FeedbackOverview.css'
import crossCircle from "../../assets/images/crossCircle.png"
import { userLogo, crossLogo, leftArrow, rightArrow, calenderIcon, textAreaIcon, phoneLogo, emailLogo, crossLogoFeedback } from "../../assets/assetsSVG"
import showToast from '../toast/toastService';
import Rating from '../Rating/Rating';
import General from '../../general';

interface FeedbackProps {
  heading?: string;
  subHeading?: string;
  userId?: string;
  token?: string;
  questId?: string;
  btnColor?: string;
  bgColor?: string;
  btnTextColor?: string;
  textColor?: string;
  font?: string;
  supportUrl?: string;
  onSubmit?: () => void;
  delay?: number;
  isInline?: boolean;
  crossLogoForInput?: boolean;
  onCancel?: Function ;
  uniqueEmailId?: string;
  uniqueUserId?: string
}

const Feedback: React.FC<FeedbackProps> = ({
  heading,
  subHeading,
  userId,
  token,
  questId,
  btnColor,
  btnTextColor,
  textColor,
  font,
  bgColor,
  supportUrl,
  onSubmit,
  delay = 1000,
  isInline = false,
  crossLogoForInput = false,
  onCancel = ()=>{},
  uniqueEmailId,
  uniqueUserId
}) => {
  interface FormDataItem {
    type?: string;
    question?: string;
    options?: [string];
    criteriaId?: string;
    required?: boolean;
    placeholder?: string;
  }
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [likePopup, setLikePopup] = useState<boolean>(false);
  const [thanksPopup, setThanksPopup] = useState<boolean>(false);
  const [formdata, setFormdata] = useState<FormDataItem[]>([]);
  const [gradient, setGradient] = useState<boolean>(false);
  const { apiKey, apiSecret, entityId ,apiType} = useContext(QuestContext.Context);
  const [answer, setAnswer] = useState<any>({});
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [session, setSession] = useState<string>('');
  const [isVisible, setIsVisible] = useState(true);
  let BACKEND_URL = apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL


  const dislike = (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M19.6348 27.6848C19.7557 27.7237 19.8879 27.7142 20.0002 27.6601C20.1231 27.6009 20.2044 27.4975 20.2336 27.385L20.63 25.8568C20.7686 25.3223 20.9705 24.8068 21.2304 24.3202C21.634 23.5646 22.2447 22.9835 22.8113 22.4953L24.0102 21.4621C24.196 21.302 24.2938 21.062 24.2727 20.817L23.5958 12.9898C23.5617 12.5944 23.2313 12.2918 22.8364 12.2918L18.9625 12.2918C16.3489 12.2918 14.1468 14.1104 13.7245 16.5525L13.1366 19.9523C13.0556 20.4202 13.4155 20.8467 13.8877 20.8467L18.2053 20.8467C19.0195 20.8467 19.638 21.5772 19.5065 22.3796L18.9543 25.75C18.8787 26.2117 18.9003 26.6841 19.0177 27.137C19.0774 27.3668 19.2587 27.564 19.514 27.646L19.6348 27.6848L19.4437 28.2799L19.6348 27.6848ZM20.5428 28.7862C20.1407 28.98 19.6773 29.0114 19.2525 28.8749L19.1317 28.8361L19.3229 28.2411L19.1317 28.8361C18.4842 28.6281 17.979 28.1108 17.8078 27.4508C17.6466 26.8295 17.617 26.1814 17.7208 25.5479L18.273 22.1775C18.2801 22.1343 18.2468 22.0967 18.2053 22.0967L13.8877 22.0967C12.6383 22.0967 11.6921 20.9697 11.9048 19.7393L12.4928 16.3395C13.0243 13.266 15.774 11.0418 18.9625 11.0418L22.8364 11.0418C23.8811 11.0418 24.7512 11.8416 24.8412 12.8821L25.518 20.7093C25.5738 21.3541 25.3165 21.9866 24.8262 22.4091L23.6273 23.4422C23.0812 23.9127 22.6216 24.3688 22.333 24.9091C22.1192 25.3094 21.9536 25.7326 21.8399 26.1706L21.4435 27.6989C21.3191 28.1783 20.9861 28.5726 20.5428 28.7862ZM27.5269 22.0961C27.1926 22.1105 26.9062 21.859 26.8773 21.5255L26.0677 12.1617C26.0156 11.5602 26.4894 11.0418 27.0944 11.0418C27.6643 11.0418 28.125 11.5041 28.125 12.0729L28.125 21.4717C28.125 21.8064 27.8613 22.0817 27.5269 22.0961Z" fill="#5E5E5E" />
      <rect x="-0.75" y="0.75" width="38.5" height="38.5" rx="19.25" transform="matrix(-1 8.74228e-08 8.74228e-08 1 38.5 6.55671e-08)" stroke="#AFAFAF" stroke-width="1.5" />
    </svg>
  );
  const like = (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="20" fill="#252525" />
      <path fillRule="evenodd" clipRule="evenodd" d="M20.3652 12.3152C20.2443 12.2763 20.1121 12.2858 19.9998 12.3399C19.8769 12.3991 19.7956 12.5025 19.7664 12.615L19.37 14.1432C19.2314 14.6777 19.0295 15.1932 18.7696 15.6798C18.366 16.4354 17.7553 17.0165 17.1887 17.5047L15.9898 18.5379C15.804 18.698 15.7062 18.938 15.7273 19.183L16.4042 27.0102C16.4383 27.4056 16.7687 27.7082 17.1636 27.7082H21.0375C23.6511 27.7082 25.8532 25.8896 26.2755 23.4475L26.8634 20.0477C26.9444 19.5798 26.5845 19.1533 26.1123 19.1533H21.7947C20.9805 19.1533 20.362 18.4228 20.4935 17.6204L21.0457 14.25C21.1213 13.7883 21.0997 13.3159 20.9823 12.863C20.9226 12.6332 20.7413 12.436 20.486 12.354L20.3652 12.3152L20.5563 11.7201L20.3652 12.3152ZM19.4572 11.2138C19.8593 11.02 20.3227 10.9886 20.7475 11.1251L20.8683 11.1639L20.6771 11.7589L20.8683 11.1639C21.5158 11.3719 22.021 11.8892 22.1922 12.5492C22.3534 13.1705 22.383 13.8186 22.2792 14.4521L21.727 17.8225C21.7199 17.8657 21.7532 17.9033 21.7947 17.9033L26.1123 17.9033C27.3617 17.9033 28.3079 19.0303 28.0952 20.2607L27.5072 23.6605C26.9757 26.734 24.226 28.9582 21.0375 28.9582H17.1636C16.1189 28.9582 15.2488 28.1584 15.1588 27.1179L14.482 19.2907C14.4262 18.6459 14.6835 18.0134 15.1738 17.5909L16.3727 16.5578C16.9188 16.0873 17.3784 15.6312 17.667 15.0909C17.8808 14.6906 18.0464 14.2674 18.1601 13.8294L18.5565 12.3011C18.6809 11.8217 19.0139 11.4274 19.4572 11.2138ZM12.4731 17.9039C12.8074 17.8895 13.0938 18.141 13.1227 18.4745L13.9323 27.8383C13.9844 28.4398 13.5106 28.9582 12.9056 28.9582C12.3357 28.9582 11.875 28.4959 11.875 27.9271L11.875 18.5283C11.875 18.1936 12.1387 17.9183 12.4731 17.9039Z" fill="white" />
    </svg>

  );
  const tick = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0C13.1016 0 14.1641 0.140625 15.1875 0.421875C16.2109 0.703125 17.1641 1.10938 18.0469 1.64062C18.9297 2.17188 19.7383 2.79688 20.4727 3.51562C21.207 4.23438 21.8359 5.04297 22.3594 5.94141C22.8828 6.83984 23.2852 7.79688 23.5664 8.8125C23.8477 9.82812 23.9922 10.8906 24 12C24 13.1016 23.8594 14.1641 23.5781 15.1875C23.2969 16.2109 22.8906 17.1641 22.3594 18.0469C21.8281 18.9297 21.2031 19.7383 20.4844 20.4727C19.7656 21.207 18.957 21.8359 18.0586 22.3594C17.1602 22.8828 16.2031 23.2852 15.1875 23.5664C14.1719 23.8477 13.1094 23.9922 12 24C10.8984 24 9.83594 23.8594 8.8125 23.5781C7.78906 23.2969 6.83594 22.8906 5.95312 22.3594C5.07031 21.8281 4.26172 21.2031 3.52734 20.4844C2.79297 19.7656 2.16406 18.957 1.64062 18.0586C1.11719 17.1602 0.714844 16.2031 0.433594 15.1875C0.152344 14.1719 0.0078125 13.1094 0 12C0 10.8984 0.140625 9.83594 0.421875 8.8125C0.703125 7.78906 1.10938 6.83594 1.64062 5.95312C2.17188 5.07031 2.79688 4.26172 3.51562 3.52734C4.23438 2.79297 5.04297 2.16406 5.94141 1.64062C6.83984 1.11719 7.79688 0.714844 8.8125 0.433594C9.82812 0.152344 10.8906 0.0078125 12 0ZM19.0664 8.02734L17.4727 6.43359L9.75 14.1562L6.52734 10.9336L4.93359 12.5273L9.75 17.3438L19.0664 8.02734Z"
        fill="#046A46"
      />
    </svg>
  );

  const handleRatingChange = (id: string, newRating: number) => {
    setRating(newRating);
    setAnswer({
      ...answer,
      [id]: newRating,
    });
  };

  const handleComments = (id: string, msg: string) => {
    if (msg.length > 0) {
      setAnswer({
        ...answer,
        [id]: msg,
      });
    } else {
      setAnswer({
        ...answer,
        [id]: 'none',
      });
    }
    returnAnswers();
  };

  const handleRatingChange2 = (rating: number) => {
    setRating(rating);
    setLikePopup(true);
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
      const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}?userId=${userId}`;

      axios.get(request, { headers: headers }).then((res) => {
        let response = res.data;
        setSession(response.session);
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
        setFormdata([...criterias]);
      });
    }
    if(entityId && uniqueUserId){
      const functions = new General('')
      functions.getExternalLogin({ apiType, uniqueUserId, entityId, userId, apiKey, apiSecret, token, uniqueEmailId })
    }
  }, []);

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

  const handleRemove = (id: string) => {
    setAnswer({
      ...answer,
      [id]: ""
    })
  }

  function returnAnswers() {
    const headers = {
      apiKey: apiKey,
      apisecret: apiSecret,
      userId: userId,
      token: token,
    };
    if (answer.length !== 0) {
      const ansArr = formdata.map((ans: any) => ({
        question: ans?.question || '',
        answer: [answer[ans?.criteriaId] || ''],
        criteriaId: ans?.criteriaId || '',
      }));
      const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/verify-all?userId=${userId}`;
      const requestData = {
        criterias: ansArr,
        userId,
        session,
      };
      setShowLoader(true);
      axios
        .post(request, requestData, { headers: headers })
        .then((response) => {
          if (response.data.success) {
            showToast.success('Thank you for your feedback');
            setThanksPopup(true);
              onSubmit && onSubmit();
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
    } else {
      toast.error('Please fill in all required fields.');
    }
  }

  const whiteStar = (
    <svg width="32" height="32" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_415_158)">
        <path d="M15.455 13.7626L3.4925 15.497L3.28063 15.5401C2.95989 15.6252 2.66749 15.794 2.4333 16.0291C2.19911 16.2642 2.03151 16.5573 1.94762 16.8783C1.86373 17.1994 1.86655 17.537 1.9558 17.8566C2.04506 18.1762 2.21753 18.4664 2.45563 18.6976L11.1219 27.1332L9.07813 39.0489L9.05375 39.2551C9.03412 39.5868 9.103 39.9178 9.25335 40.2142C9.40369 40.5105 9.6301 40.7616 9.90938 40.9417C10.1887 41.1218 10.5108 41.2244 10.8428 41.2391C11.1748 41.2537 11.5047 41.1799 11.7988 41.0251L22.4975 35.4001L33.1719 41.0251L33.3594 41.1114C33.6689 41.2333 34.0052 41.2706 34.3339 41.2196C34.6626 41.1687 34.9718 41.0312 35.2299 40.8212C35.4879 40.6113 35.6854 40.3365 35.8022 40.025C35.919 39.7136 35.9508 39.3767 35.8944 39.0489L33.8488 27.1332L42.5188 18.6957L42.665 18.5364C42.8739 18.279 43.0109 17.9709 43.062 17.6435C43.1131 17.316 43.0764 16.9808 42.9558 16.6721C42.8352 16.3634 42.6349 16.0922 42.3753 15.8861C42.1157 15.68 41.8062 15.5464 41.4781 15.4988L29.5156 13.7626L24.1681 2.9251C24.0134 2.6111 23.7738 2.34669 23.4766 2.16179C23.1794 1.9769 22.8363 1.87891 22.4863 1.87891C22.1362 1.87891 21.7931 1.9769 21.4959 2.16179C21.1987 2.34669 20.9591 2.6111 20.8044 2.9251L15.455 13.7626Z" fill="#E2E2E2"/>
      </g>
      <defs>
        <clipPath id="clip0_415_158">
          <rect width="45" height="45" fill="white"/>
        </clipPath>
      </defs>
    </svg>
);
const blackStar = (
    <svg width="32" height="32" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_415_239)">
        <path d="M15.455 13.7626L3.4925 15.497L3.28063 15.5401C2.95989 15.6252 2.66749 15.794 2.4333 16.0291C2.19911 16.2642 2.03151 16.5573 1.94762 16.8783C1.86373 17.1994 1.86655 17.537 1.9558 17.8566C2.04506 18.1762 2.21753 18.4664 2.45563 18.6976L11.1219 27.1332L9.07813 39.0489L9.05375 39.2551C9.03412 39.5868 9.103 39.9178 9.25335 40.2142C9.40369 40.5105 9.6301 40.7616 9.90938 40.9417C10.1887 41.1218 10.5108 41.2244 10.8428 41.2391C11.1748 41.2537 11.5047 41.1799 11.7988 41.0251L22.4975 35.4001L33.1719 41.0251L33.3594 41.1114C33.6689 41.2333 34.0052 41.2706 34.3339 41.2196C34.6626 41.1687 34.9718 41.0312 35.2299 40.8212C35.4879 40.6113 35.6854 40.3365 35.8022 40.025C35.919 39.7136 35.9508 39.3767 35.8944 39.0489L33.8488 27.1332L42.5188 18.6957L42.665 18.5364C42.8739 18.279 43.0109 17.9709 43.062 17.6435C43.1131 17.316 43.0764 16.9808 42.9558 16.6721C42.8352 16.3634 42.6349 16.0922 42.3753 15.8861C42.1157 15.68 41.8062 15.5464 41.4781 15.4988L29.5156 13.7626L24.1681 2.9251C24.0134 2.6111 23.7738 2.34669 23.4766 2.16179C23.1794 1.9769 22.8363 1.87891 22.4863 1.87891C22.1362 1.87891 21.7931 1.9769 21.4959 2.16179C21.1987 2.34669 20.9591 2.6111 20.8044 2.9251L15.455 13.7626Z" fill="#F9C23C"/>
      </g>
      <defs>
        <clipPath id="clip0_415_239">
          <rect width="45" height="45" fill="white"/>
        </clipPath>
      </defs>
    </svg>
);

function isValidEmail(email: string) {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !emailRegex.test(email);
}

  const normalInput = (question: string, criteriaId: string, placeholder?:string) => {
    return (
      <div className="" key={criteriaId}>
        <label
          className="q-fdov-levels"
          htmlFor="normalInput"
          style={{
            fontFamily: font,
            color: textColor,
          }}
        >
          {question}
        </label>
        <div className="q-fdov-input">
            {/* {userLogo()} */}
            <input
              className='q_sdk_input q_fw_input'
              type="text"
              id="normalInput"
              name="normalInput"
              onChange={(e) => handleUpdate(e, criteriaId, "")}
              value={answer[criteriaId]}
              placeholder={placeholder}
            />
            {crossLogoForInput && crossLogo(criteriaId, handleRemove)}
        </div>
      </div>
    );
  };
  const emailInput = (question: string, criteriaId: string, placeholder?:string) => {
    return (
      <div className="" key={criteriaId}>
        <label
          className="q-fdov-levels"
          htmlFor="normalInput"
          style={{
            fontFamily: font,
            color: textColor,
          }}
        >
          {question}
        </label>
        <div className="q-fdov-input">
            <input
              className='q_sdk_input q_fw_input'
              type="email"
              id="normalInput"
              name="normalInput"
              onChange={(e) => handleUpdate(e, criteriaId, "")}
              value={answer[criteriaId]}
              placeholder={placeholder}
            />
            {crossLogoForInput ? crossLogo(criteriaId, handleRemove): emailLogo()}
        </div>
        {
          isValidEmail(answer[criteriaId]) &&
          <div className='q-input-email-checks'>This is not a valid email</div>
        }
      </div>
    );
  };

  const normalInput2 = (question: string, criteriaId: string, placeholder?:string) => {
    return (
      <div className="" key={criteriaId}>
        <label
          className="q-fdov-levels"
        >
          {question}
        </label>
        <div className="q_feedback_input" style={{alignItems: "flex-start"}}>
            {/* {textAreaIcon()} */}
            <textarea
            className='q_fw_textarea'
              id="normalInput2"
              name="normalInput"
              onChange={(e) => handleUpdate(e, criteriaId, "")}
              value={answer[criteriaId]}
              placeholder={placeholder}
            />
            {crossLogoForInput && crossLogo(criteriaId, handleRemove)}
        </div>
      </div>
    );
  };

  const likePopupContent = (criteriaId: any, comment: any) => {
    return (
      <div className="">
        <div>
          <div className="like-dislike-cont">
            <div className="icon-inside-like-dislike">{tick}</div>
            <div className="p-2" style={{ color: '#00A96D' }}>
              Thanks again for your feedback.
            </div>
          </div>
          <div
            style={{
              margin: '5% 0% 1% 0%',
              fontSize: '18px',
              fontFamily: font,
              color: textColor,
            }}
          >
            Tell us more
          </div>
          <div className="q-fd-input">
            {textAreaIcon()}
            <input
              placeholder="Comments"
              type="text"
              className="q_sdk_input"
              value={comment}
              maxLength={200}
              onChange={(e) => setComment(e.target.value)}
            />
            {crossLogoFeedback(setComment)}
          </div>
          <div className="q-cmts">{comment.length}/200</div>
          <div className="q-feed-desc">
            We’re unable to respond directly to your feedback. If you have a
            customer support inquiry, please{' '}
            <div
              onClick={() => (window.location.href = `${supportUrl}`)}
              style={{
                fontWeight: '600',
                textDecoration: 'underline',
                display: "inline"
              }}
            >
              contact customer support.
            </div>
          </div>
          <div className="q-feed-btns-div">
            <button
              onClick={() => handleComments(criteriaId, comment)}
              className="q-btn-feed"
            >
              Skip
            </button>
            <button
              onClick={() => handleComments(criteriaId, comment)}
              className="q-btn-feed"
              style={{
                backgroundColor: btnColor ? btnColor : '#333333',
                color: btnTextColor ? btnTextColor : 'white',
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };

const singleChoiceOne = (
    options: string[],
    question: string,
    required: boolean,
    criteriaId: string,
) => {
    return (
        <div key={criteriaId}>
            <div
                className="q-onb-singleChoiceOne-lebel"
            >
                {question} {required && "*"}
            </div>
            <div className="q-onb-singleChoiceOne-optDiv">
                {options.map((option: string, id: number) => (
                    <div className="q_onb_singlehoiceOne_lebel" key={id}>
                        <input
                            id={`sct${criteriaId + id}`}
                            type="radio"
                            value={option}
                            checked={answer[criteriaId] == option}
                            onChange={(e) =>
                                handleUpdate(e, criteriaId, "radio")
                            }
                            name={`default-radio${criteriaId}`}
                            className="q-onb-singleChoiceOne-inp"
                        />
                        <label
                            htmlFor={`sct${criteriaId + id}`}
                            className="q-onb-singleChoiceOne-lebel3"
                        >
                            {option}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

  return (
      <div
        style={{
          ...(gradient
            ? { backgroundImage: bgColor }
            : { backgroundColor: bgColor }),
        }}
        className="q-feedback-cont"
      >
        {formdata.length > 0 ? (
          formdata[0].type !== 'LIKE_DISLIKE' &&
            formdata[0].type !== 'RATING' ? (
            <>
              {!thanksPopup && (
                <div>
                  <div className="q-fd-topbar">
                    <div>
                      <div
                        className="q-fd-heading"
                        style={{
                          fontFamily: font,
                          color: textColor,
                          fontSize: '24px',
                        }}
                      >
                        {heading}
                      </div>
                      <div
                        className="q-fd-sub"
                        style={{
                          fontFamily: font,
                          color: textColor,
                        }}
                      >
                        {subHeading}
                      </div>
                    </div>
                  </div>
                  <form style={{ padding: "20px", boxSizing: "content-box", display: "flex", flexDirection: "column", gap: "12px" }}>
                    {formdata.map((data: any) => {
                      if (data.type === 'USER_INPUT_TEXT') {
                        return normalInput(
                          data.question || '',
                          data.criteriaId || '',
                          data.placeholder || undefined,
                        );
                      } else if (data.type === 'USER_INPUT_EMAIL') {
                        return emailInput(
                          data.question || '',
                          data.criteriaId || '',
                          data.placeholder || undefined,
                        );
                      } else if (data.type === 'USER_INPUT_SINGLE_CHOICE') {
                        return singleChoiceOne(
                          data.options || [],
                          data?.question || "",
                          data?.required || false,
                          data.criteriaId || "",
                      )
                      } else if (data.type === 'USER_INPUT_TEXTAREA') {
                        return normalInput2(
                          data.question || '',
                          data.criteriaId || '',
                          data.placeholder || undefined,
                        );
                      } else if (data.type === 'RATING') {
                        return (
                          <div className="mb-4">
                            <label
                              className='q-fd-lebels'
                            >
                              {data.question || 'Rating Scale'}
                            </label>
                            <div
                              style={{
                                display: 'flex',
                                marginTop: '5px',
                              }}
                            >
                              {/* {[1, 2, 3, 4, 5].map((star) => (
                                <div
                                  className="q-star-div"
                                  key={star}
                                  onClick={() =>
                                    handleRatingChange(data.criteriaId, star)
                                  }
                                >
                                  {star <= rating ? blackStar : whiteStar}
                                </div>
                              ))} */}
                              <Rating 
                               count={5}
                               getCurrentRating={(item) =>
                                handleRatingChange(data.criteriaId, item)
                               }
                              //  defaultRating={Number(answer[0])}
                               type={'number'}
                              />
                            </div>
                          </div>
                        );
                      }
                    })}
                      <div className='q_feedback_buttons'>
                        <div onClick={()=>onCancel()}
                          className="q-fdov-btn-cancel"
                        >
                          Cancel
                        </div>
                        <div
                          style={{
                            backgroundColor: btnColor,
                            color: btnTextColor,
                            fontFamily: font,
                          }}
                          onClick={returnAnswers}
                          className="q-fdov-btn-continue"
                        >
                          Submit
                        </div>
                      </div>
                  </form>
                </div>
              )}
              {thanksPopup && (
                <div className="like-dislike-cont">
                  <div className="icon-inside-like-dislike">{tick}</div>
                  <div className="p-2" style={{ color: '#00A96D' }}>
                    Thanks again for your feedback.
                  </div>
                </div>
              )}
            </>
          ) : formdata[0].type === 'LIKE_DISLIKE' ? (
            <div className="">
              {!likePopup && (
                <div
                  className='q-fd-like-dislike'
                >
                  <div className='q-fd-like-dislike-txt'>
                    <div>
                      Are these results helpful?
                    </div>
                    <div>
                      Your feedback helps us improve search results
                    </div>
                  </div>
                  <div className="like-dislike-cont">
                    <div style={{ display: "inline" }} onClick={() => setLikePopup(true)}>{dislike}</div>
                    <div style={{ display: "inline" }} onClick={() => setLikePopup(true)}>{like}</div>
                  </div>
                </div>
              )}
              {likePopup && likePopupContent(formdata[0].criteriaId, comment)}
            </div>
          ) : formdata[0].type === 'RATING' ? (
            <div className="">
              <div className="mb-4">
                <label
                  className='q-fd-lebels'
                >
                  Rating Scale
                </label>
                <div style={{ display: 'flex', padding: '2% 0% 2%' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      className="q-star-div"
                      key={star}
                      onClick={() => handleRatingChange2(star)}
                    >
                      {star <= rating ? blackStar : whiteStar}
                    </div>
                  ))}
                </div>
              </div>
              {likePopup && likePopupContent(formdata[0].criteriaId, comment)}
            </div>
          ) : null
        ) : (
          <div className="">
            <div className="q-center">Form data is empty</div>
          </div>
        )}
      </div>
  );
};

export default Feedback;
