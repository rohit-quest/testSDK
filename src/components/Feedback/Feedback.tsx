import React, { useContext, useEffect, useState } from 'react';
import QuestContext from '../QuestWrapper';
import axios from 'axios';
import config from '../../config';
import './Feedback.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../Login/Loader';

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
  const { apiKey, apiSecret, entityId } = useContext(QuestContext.Context);
  const [answer, setAnswer] = useState<any[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [session, setSession] = useState<string>('');
  const whiteStar = (
      <svg width="40" height="40" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_415_158)">
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
      <svg width="40" height="40" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_415_239)">
          <path d="M15.455 13.7626L3.4925 15.497L3.28063 15.5401C2.95989 15.6252 2.66749 15.794 2.4333 16.0291C2.19911 16.2642 2.03151 16.5573 1.94762 16.8783C1.86373 17.1994 1.86655 17.537 1.9558 17.8566C2.04506 18.1762 2.21753 18.4664 2.45563 18.6976L11.1219 27.1332L9.07813 39.0489L9.05375 39.2551C9.03412 39.5868 9.103 39.9178 9.25335 40.2142C9.40369 40.5105 9.6301 40.7616 9.90938 40.9417C10.1887 41.1218 10.5108 41.2244 10.8428 41.2391C11.1748 41.2537 11.5047 41.1799 11.7988 41.0251L22.4975 35.4001L33.1719 41.0251L33.3594 41.1114C33.6689 41.2333 34.0052 41.2706 34.3339 41.2196C34.6626 41.1687 34.9718 41.0312 35.2299 40.8212C35.4879 40.6113 35.6854 40.3365 35.8022 40.025C35.919 39.7136 35.9508 39.3767 35.8944 39.0489L33.8488 27.1332L42.5188 18.6957L42.665 18.5364C42.8739 18.279 43.0109 17.9709 43.062 17.6435C43.1131 17.316 43.0764 16.9808 42.9558 16.6721C42.8352 16.3634 42.6349 16.0922 42.3753 15.8861C42.1157 15.68 41.8062 15.5464 41.4781 15.4988L29.5156 13.7626L24.1681 2.9251C24.0134 2.6111 23.7738 2.34669 23.4766 2.16179C23.1794 1.9769 22.8363 1.87891 22.4863 1.87891C22.1362 1.87891 21.7931 1.9769 21.4959 2.16179C21.1987 2.34669 20.9591 2.6111 20.8044 2.9251L15.455 13.7626Z" fill="#F9C23C"/>
        </g>
        <defs>
          <clipPath id="clip0_415_239">
            <rect width="45" height="45" fill="white"/>
          </clipPath>
        </defs>
      </svg>

  );
  const like = (
    <svg
      width="53"
      height="53"
      viewBox="0 0 53 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="26.5" cy="26.5" r="25.75" stroke="black" strokeWidth="1.5" />
      <g clipPath="url(#clip0_12292_10080)">
        <path
          d="M28.2628 38.994C21.4464 38.994 21.3939 38.7113 20.5498 38.0756C20.102 37.7389 19.2572 37.5056 16.1713 37.3046C15.9474 37.29 15.7344 37.2041 15.5916 37.0309C15.5259 36.951 13.9839 34.7021 13.9839 31.1002C13.9839 27.5509 15.0876 25.9331 15.1348 25.8581C15.2021 25.7502 15.2958 25.6613 15.407 25.5996C15.5182 25.5379 15.6433 25.5056 15.7704 25.5056C18.3043 25.5056 21.8169 22.2712 24.1783 16.6252C24.5867 15.6487 24.671 15.0063 26.171 15.0063C27.0242 15.0063 27.9804 15.6172 28.4525 16.401C29.4212 18.0022 28.9292 21.4414 28.4743 23.2793C30.0212 23.2669 32.8213 23.2459 34.1537 23.2459C36.0069 23.2459 37.2335 24.351 37.2706 25.9665C37.283 26.4997 37.2129 27.1807 37.0588 27.5332C37.4668 27.9401 37.9929 28.5536 38.0158 29.3437C38.0443 30.3637 37.3764 31.1403 36.95 31.5858C37.0479 31.8825 37.2436 32.2758 37.2245 32.7461C37.1776 33.9026 36.2847 34.6477 35.7286 35.0366C35.7747 35.3531 35.8107 35.9501 35.7091 36.4117C35.3079 38.2541 32.606 38.994 28.2627 38.994L28.2628 38.994ZM16.5692 35.7836C19.2572 36.006 20.6941 36.3071 21.452 36.8775C22.0385 37.3193 21.9481 37.4944 28.2627 37.4944C30.1887 37.4944 33.9556 37.4141 34.2444 36.0919C34.3591 35.5631 33.8015 35.0434 33.7996 35.0393C33.6474 34.6635 33.8169 34.2225 34.1881 34.0601C34.1941 34.0571 35.6915 33.5209 35.7256 32.6839C35.7481 32.1488 35.3806 31.8274 35.3724 31.8139C35.1538 31.4749 35.2336 31.0099 35.5651 30.7789C35.5689 30.7759 36.539 30.1879 36.5154 29.3862C36.497 28.7494 35.6581 28.3013 35.6326 28.2863C35.4451 28.179 35.3086 27.9934 35.2659 27.7812C35.2239 27.5693 35.2711 27.3469 35.4027 27.1748C35.4027 27.1748 35.7841 26.5688 35.7702 26.0003C35.7429 24.7834 34.4341 24.7452 34.1532 24.7452C32.2614 24.7452 27.4025 24.7643 27.4025 24.7643C27.1404 24.7654 26.9135 24.6417 26.7725 24.432C26.6319 24.2224 26.6214 23.9622 26.7039 23.7237C27.4366 21.6135 27.8458 18.303 27.1663 17.172C26.966 16.8387 26.9203 16.5057 26.1703 16.5057C26.0664 16.5057 25.8189 16.5878 25.5609 17.2028C23.0548 23.199 19.3115 26.6674 16.2455 26.9802C15.9812 27.5832 15.4839 28.8327 15.4839 31.0999C15.4839 33.414 16.217 35.2043 16.5692 35.7836Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_12292_10080">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(14 15)"
          />
        </clipPath>
      </defs>
    </svg>
  );
  const dislike = (
    <svg
      width="53"
      height="53"
      viewBox="0 0 53 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_12292_10083)">
        <path
          d="M23.7369 15.0054C30.5533 15.0054 30.6062 15.2882 31.4503 15.9239C31.898 16.2606 32.7429 16.4942 35.8291 16.6952C36.0534 16.7099 36.266 16.7957 36.4089 16.969C36.4745 17.0489 38.0165 19.2977 38.0165 22.8992C38.0165 26.4486 36.9129 28.0667 36.8656 28.1421C36.7982 28.2499 36.7045 28.3387 36.5933 28.4003C36.4821 28.4619 36.3571 28.4942 36.23 28.4942C33.6961 28.4942 30.1835 31.7286 27.8218 37.375C27.4134 38.3515 27.3294 38.9934 25.829 38.9934C24.9759 38.9934 24.0196 38.3826 23.5468 37.5988C22.5785 35.9976 23.0701 32.5584 23.5254 30.7205C21.9785 30.7329 19.1784 30.7543 17.846 30.7543C15.9928 30.7543 14.7665 29.6492 14.7286 28.0333C14.7166 27.5 14.7864 26.8186 14.9409 26.4669C14.5333 26.06 14.0068 25.4461 13.9839 24.656C13.955 23.6364 14.6233 22.8597 15.0493 22.4139C14.9518 22.1172 14.756 21.7239 14.7748 21.2536C14.822 20.0971 15.7145 19.3516 16.271 18.9627C16.2252 18.6474 16.1892 18.05 16.2905 17.5887C16.6918 15.746 19.3936 15.0054 23.7369 15.0054V15.0054ZM35.4309 18.2166C32.7429 17.9942 31.306 17.693 30.5482 17.1223C29.9617 16.6809 30.0524 16.5058 23.737 16.5058C21.811 16.5058 18.0442 16.5861 17.7554 17.9079C17.6403 18.4367 18.1979 18.9568 18.2002 18.9606C18.3524 19.3367 18.1825 19.7773 17.8113 19.9397C17.8053 19.9427 16.3083 20.4793 16.2738 21.3163C16.2517 21.8514 16.6188 22.1728 16.6274 22.1859C16.8457 22.5249 16.7658 22.9903 16.4346 23.2209C16.4309 23.2239 15.4604 23.8119 15.4844 24.614C15.5028 25.2504 16.3417 25.6989 16.3672 25.7139C16.5547 25.8212 16.6912 26.0068 16.7335 26.2194C16.7759 26.4309 16.7283 26.6537 16.597 26.825C16.597 26.825 16.2156 27.4314 16.2291 27.9995C16.2569 29.2168 17.5656 29.255 17.8465 29.255C19.7384 29.255 24.5972 29.2352 24.5972 29.2352C24.8593 29.2344 25.0862 29.3582 25.2268 29.5678C25.3675 29.7774 25.3783 30.0381 25.2955 30.2762C24.5631 32.3863 24.154 35.6968 24.8335 36.8278C25.0333 37.1612 25.0795 37.4942 25.8295 37.4942C25.9333 37.4942 26.1808 37.4121 26.4388 36.797C28.9464 30.8015 32.6897 27.3328 35.7557 27.0201C36.0201 26.4171 36.5173 25.1676 36.5173 22.9C36.5166 20.5858 35.7835 18.796 35.4309 18.2166Z"
          fill="black"
        />
      </g>
      <circle cx="26.5" cy="26.5" r="25.75" stroke="black" strokeWidth="1.5" />
      <defs>
        <clipPath id="clip0_12292_10083">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(14 15)"
          />
        </clipPath>
      </defs>
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
      const request = `${config.BACKEND_URL}api/entities/${entityId}/quests/${questId}?userId=${userId}`;

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
      const request = `${config.BACKEND_URL}api/entities/${entityId}/quests/${questId}/verify-all?userId=${userId}`;
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
            toast.success('Thank you for your feedback');
            setThanksPopup(true);
            setTimeout(() => {
              onSubmit && onSubmit();
              window.location.reload();
            }, 3000);
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

  const normalInput = (question: string, criteriaId: string, placeholder?:string) => {
    return (
      <div className="questLabs" style={{ paddingTop: '16px' }} key={criteriaId}>
        <label
          className="q-h4"
          htmlFor="normalInput"
          style={{
            fontFamily: font,
            color: textColor,
          }}
        >
          {question}
        </label>
        <input
          type="text"
          id="normalInput"
          style={{ height: '50px' }}
          name="normalInput"
          className="q-input-box"
          onChange={(e) => handleUpdate(e, criteriaId, '')}
          placeholder={placeholder ? placeholder : `${(question).toLowerCase()}`}
        />
      </div>
    );
  };

  const normalInput2 = (question: string, criteriaId: string, placeholder?:string) => {
    return (
      <div className="questLabs" style={{ paddingTop: '16px' }} key={criteriaId}>
        <label
          className="q-h4"
          htmlFor="normalInput2"
          style={{
            fontFamily: font,
            color: textColor,
          }}
        >
          {question}
        </label>
        <textarea
          id="normalInput2"
          placeholder={placeholder ? placeholder : `${(question).toLowerCase()}`}
          style={{ height: '125px' }}
          className="q-input-box"
          onChange={(e) => handleUpdate(e, criteriaId, '')}
        />
      </div>
    );
  };

  const likePopupContent = (criteriaId: any, comment: any) => {
    return (
      <div className="questLabs">
        <div>
          <div className="like-dislike-cont">
            <div className="icon-inside-like-dislike">{tick}</div>
            <p className="p-2" style={{ color: '#00A96D' }}>
              Thanks again for your feedback.
            </p>
          </div>
          <p
            style={{
              margin: '5% 0% 1% 0%',
              fontSize: '18px',
              fontFamily: font,
              color: textColor,
            }}
          >
            Tell us more
          </p>
          <input
            style={{ height: '50px', border: '1px solid black', backgroundColor: 'white' }}
            placeholder="Comments"
            type="text"
            className="q-input-box"
            value={comment}
            maxLength={200}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="q-cmts">{comment.length}/200</div>
          <div className="q-feed-desc">
            We’re unable to respond directly to your feedback. If you have a
            customer support inquiry, please{' '}
            <span
              onClick={() => (window.location.href = `${supportUrl}`)}
              style={{
                fontWeight: '600',
                textDecoration: 'underline',
              }}
            >
              contact customer support.
            </span>
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

  return (
    <div className="q-parent-container">
      {showLoader && <Loader />}
      <ToastContainer />
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
                <div className="questLabs">
                  <h2
                    className="q-h1"
                    style={{
                      fontFamily: font,
                      color: textColor,
                      fontSize: '24px',
                    }}
                  >
                    {heading}
                  </h2>
                  <p
                    className="q-sub"
                    style={{
                      fontFamily: font,
                      color: textColor,
                      fontSize: '18px',
                    }}
                  >
                    {subHeading}
                  </p>
                  <form>
                    {formdata.map((data: any) => {
                      if (data.type === 'USER_INPUT_TEXT') {
                        return normalInput(
                          data.question || '',
                          data.criteriaId || '',
                          data.placeholder || undefined,
                        );
                      } else if (data.type === 'USER_INPUT_TEXTAREA') {
                        return normalInput2(
                          data.question || '',
                          data.criteriaId || '',
                          data.placeholder || undefined,
                        );
                      } else if (data.type === 'RATING') {
                        return (
                          <div style={{ paddingTop: '8px' }} className="mb-4">
                            <label
                              style={{
                                fontFamily: font,
                                color: textColor,
                              }}
                              className="q-h4"
                            >
                              { data.question || 'Rating Scale' }
                            </label>
                            <div
                              style={{
                                display: 'flex',
                                marginTop: '5px'
                              }}
                            >
                              {[1, 2, 3, 4, 5].map((star) => (
                                <div
                                  className="q-star-div"
                                  key={star}
                                  onClick={() =>
                                    handleRatingChange(data.criteriaId, star)
                                  }
                                >
                                  {star <= rating ? blackStar : whiteStar}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                    })}
                    <div
                      style={{
                        backgroundColor: btnColor,
                        color: btnTextColor,
                        fontFamily: font,
                      }}
                      onClick={returnAnswers}
                      className="q-btn-continue"
                    >
                      Submit
                    </div>
                  </form>
                </div>
              )}
              {thanksPopup && (
                <div className="like-dislike-cont">
                  <div className="icon-inside-like-dislike">{tick}</div>
                  <p className="p-2" style={{ color: '#00A96D' }}>
                    Thanks again for your feedback.
                  </p>
                </div>
              )}
            </>
          ) : formdata[0].type === 'LIKE_DISLIKE' ? (
            <div className="questLabs">
              {!likePopup && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h4
                      style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        fontFamily: font,
                        color: textColor,
                      }}
                    >
                      Are these results helpful?
                    </h4>
                    <p
                      style={{
                        fontSize: '16px',
                        fontFamily: font,
                        color: textColor,
                      }}
                    >
                      Your feedback helps us improve search results
                    </p>
                  </div>
                  <div className="like-dislike-cont">
                    <span onClick={() => setLikePopup(true)}>{like}</span>
                    <span onClick={() => setLikePopup(true)}>{dislike}</span>
                  </div>
                </div>
              )}
              {likePopup && likePopupContent(formdata[0].criteriaId, comment)}
            </div>
          ) : formdata[0].type === 'RATING' ? (
            <div className="questLabs">
              <div className="mb-4">
                <label
                  style={{
                    fontFamily: font,
                    color: textColor,
                  }}
                  className="q-h4"
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
          <div className="questLabs">
            <p className="q-center">Form data is empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
