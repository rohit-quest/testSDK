import React, { useContext, useEffect, useState } from 'react';
import QuestContext from '../QuestWrapper';
import axios from 'axios';
import config from '../../config';

interface FeedbackProps {
  heading?: string;
  subHeading?: string;
  inputFieldType?: object;
  userId?: string;
  token?: string;
  questId?: string;
  btnColor?: string;
  bgColor?: string;
  btnTextColor?: string;
  textColor?: string;
  font?: string;
  getAnswers?: Function;
  answer?: any;
  setAnswer?: any;
  short?: boolean;
  supportUrl?: string;
}

const Feedback: React.FC<FeedbackProps> = ({
  heading,
  subHeading,
  inputFieldType,
  userId,
  token,
  questId,
  btnColor,
  btnTextColor,
  textColor,
  font,
  getAnswers,
  bgColor,
  answer,
  setAnswer,
  short,
  supportUrl,
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
  const [shortFeedback, setShortFeedback] = useState<boolean>(false);
  const [likePopup, setLikePopup] = useState<boolean>(false);
  const [formdata, setFormdata] = useState<FormDataItem[]>([]);
  const { apiKey, apiSecret, entityId } = useContext(QuestContext.Context);
  const whiteStar = (
    <svg
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M41.7129 17.209C41.5677 16.7479 41.2879 16.3409 40.9095 16.0401C40.5311 15.7394 40.0714 15.5588 39.5894 15.5215L29.1375 14.6179C29.0743 14.6117 29.0139 14.5885 28.9629 14.5507C28.9118 14.513 28.8719 14.4621 28.8475 14.4035L24.7641 4.67223C24.5749 4.22831 24.2595 3.84977 23.857 3.5837C23.4544 3.31764 22.9825 3.17578 22.5 3.17578C22.0175 3.17578 21.5456 3.31764 21.143 3.5837C20.7405 3.84977 20.425 4.22831 20.2359 4.67223L16.1525 14.4035C16.1281 14.4621 16.0882 14.513 16.0371 14.5507C15.986 14.5885 15.9257 14.6117 15.8625 14.6179L5.41054 15.5215C4.92863 15.5588 4.4689 15.7394 4.09048 16.0401C3.71207 16.3409 3.43228 16.7479 3.2871 17.209C3.13335 17.6706 3.11992 18.1675 3.24851 18.6369C3.3771 19.1062 3.64195 19.5268 4.00956 19.8457L11.9391 26.7627C11.9876 26.8058 12.0237 26.8612 12.0435 26.923C12.0633 26.9849 12.0661 27.0509 12.0516 27.1142L9.66796 37.3992C9.55685 37.8727 9.58855 38.3685 9.75906 38.8241C9.92957 39.2796 10.2312 39.6744 10.626 39.9586C11.0146 40.2453 11.4802 40.4089 11.9628 40.4284C12.4453 40.4478 12.9226 40.3221 13.333 40.0675L22.3172 34.6183C22.37 34.5856 22.4309 34.5683 22.493 34.5683C22.5551 34.5683 22.6159 34.5856 22.6687 34.6183L31.6529 40.0675C32.0676 40.3214 32.5482 40.4468 33.034 40.4278C33.5198 40.4088 33.9892 40.2463 34.3827 39.9609C34.7763 39.6754 35.0765 39.2798 35.2455 38.8238C35.4144 38.3679 35.4445 37.8722 35.332 37.3992L32.9555 27.1107C32.941 27.0474 32.9438 26.9814 32.9636 26.9195C32.9833 26.8577 33.0194 26.8023 33.068 26.7591L40.9975 19.8422C41.3632 19.5228 41.6262 19.1023 41.7535 18.6338C41.8808 18.1652 41.8667 17.6695 41.7129 17.209ZM39.6035 18.2496L31.674 25.1666C31.3361 25.4606 31.0849 25.8412 30.9474 26.2674C30.8098 26.6936 30.7912 27.1493 30.8935 27.5853L33.2701 37.8738C33.2877 37.9429 33.2838 38.0158 33.259 38.0826C33.2342 38.1495 33.1896 38.2073 33.1312 38.2482C33.0784 38.2905 33.0134 38.3149 32.9457 38.3177C32.8781 38.3206 32.8113 38.3018 32.7551 38.264L23.7709 32.8148C23.3879 32.582 22.9482 32.4589 22.5 32.4589C22.0518 32.4589 21.6121 32.582 21.2291 32.8148L12.2449 38.264C12.1887 38.3018 12.1219 38.3206 12.0542 38.3177C11.9866 38.3149 11.9216 38.2905 11.8687 38.2482C11.8103 38.2073 11.7658 38.1495 11.741 38.0826C11.7162 38.0158 11.7123 37.9429 11.7299 37.8738L14.1064 27.5853C14.2088 27.1493 14.1901 26.6936 14.0526 26.2674C13.9151 25.8412 13.6638 25.4606 13.326 25.1666L5.39648 18.2496C5.34225 18.2035 5.3033 18.142 5.28478 18.0732C5.26626 18.0045 5.26904 17.9317 5.29277 17.8646C5.31052 17.7978 5.34901 17.7383 5.4027 17.6947C5.4564 17.6511 5.52253 17.6257 5.59159 17.622L16.0453 16.7185C16.4928 16.6804 16.9214 16.5205 17.2845 16.2562C17.6477 15.9919 17.9316 15.6332 18.1055 15.2191L22.1889 5.48786C22.2173 5.42746 22.2622 5.37639 22.3186 5.34062C22.3749 5.30485 22.4403 5.28585 22.507 5.28585C22.5738 5.28585 22.6391 5.30485 22.6955 5.34062C22.7518 5.37639 22.7968 5.42746 22.8252 5.48786L26.8945 15.2191C27.0678 15.6323 27.3507 15.9902 27.7125 16.2545C28.0743 16.5187 28.5014 16.6792 28.9476 16.7185L39.4014 17.622C39.4704 17.6257 39.5366 17.6511 39.5903 17.6947C39.6439 17.7383 39.6824 17.7978 39.7002 17.8646C39.7247 17.9311 39.7286 18.0034 39.7114 18.072C39.6941 18.1407 39.6565 18.2026 39.6035 18.2496Z"
        fill="black"
      />
    </svg>
  );
  const blackStar = (
    <svg
      width="41"
      height="39"
      viewBox="0 0 41 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M39.2207 18.106L31.293 25.0247L33.6678 35.3255C33.7934 35.864 33.7576 36.4276 33.5647 36.9458C33.3718 37.4641 33.0304 37.9139 32.5832 38.2392C32.136 38.5644 31.6029 38.7507 31.0504 38.7746C30.498 38.7985 29.9508 38.659 29.4772 38.3736L20.493 32.9244L11.5281 38.3736C11.0545 38.659 10.5073 38.7985 9.95484 38.7746C9.4024 38.7507 8.86925 38.5644 8.42207 38.2392C7.97488 37.9139 7.6335 37.4641 7.4406 36.9458C7.2477 36.4276 7.21184 35.864 7.33751 35.3255L9.7088 25.0353L1.77931 18.106C1.35991 17.7443 1.05664 17.2668 0.907529 16.7334C0.75842 16.2 0.77011 15.6345 0.941131 15.1077C1.11215 14.5809 1.43489 14.1164 1.86888 13.7723C2.30287 13.4282 2.82878 13.22 3.38067 13.1736L13.8326 12.2683L17.9125 2.53705C18.1256 2.02644 18.4849 1.59027 18.9454 1.28348C19.4058 0.97669 19.9467 0.812988 20.5 0.812988C21.0533 0.812988 21.5942 0.97669 22.0546 1.28348C22.5151 1.59027 22.8745 2.02644 23.0875 2.53705L27.1797 12.2683L37.6281 13.1736C38.18 13.22 38.7059 13.4282 39.1399 13.7723C39.5739 14.1164 39.8967 14.5809 40.0677 15.1077C40.2387 15.6345 40.2504 16.2 40.1013 16.7334C39.9522 17.2668 39.6489 17.7443 39.2295 18.106H39.2207Z"
        fill="black"
      />
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

  const handleRatingChange2 = (rating: number) => {
    setRating(rating);
    setLikePopup(true)
  };

  useEffect(() => {
    if (short) {
      setShortFeedback(true);
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
            question: criteria?.data?.metadata?.title,
            options: criteria?.data?.metadata?.options || [],
            criteriaId: criteria?.data?.criteriaId,
            required: !criteria?.data?.metadata?.isOptional,
            placeholder: criteria?.data?.metadata?.placeholder,
          };
        });
        criterias = Array.isArray(criterias) ? criterias : [];
        setFormdata([...criterias]);
        console.log('formdata', criterias);
        let ansArray: any = {};
        criterias.forEach((criteria: any) => {
          if (criteria.type === 'USER_INPUT_MULTI_CHOICE') {
            if (!answer[criteria.criteriaId]) {
              ansArray[criteria.criteriaId] = [];
            }
          } else {
            if (!answer[criteria.criteriaId]) {
              ansArray[criteria.criteriaId] = '';
            }
          }
        });

        setAnswer({ ...answer, ...ansArray });
        console.log('ans', { ...answer, ...ansArray });
      });
    }
  }, []);

  const handleUpdate = (e: any, id: string, j: string) => {
    if (e.target.checked === true && j === 'check') {
      let ans = answer[id] || [];
      ans.push(e.target.value);
      setAnswer({
        ...answer,
        [id]: ans,
      });
    } else if (
      e.target.checked === false &&
      typeof answer[id] === 'object' &&
      j === 'check'
    ) {
      let ans = answer[id];
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
    if (getAnswers) {
      const ansArr = formdata.map((ans: any) => ({
        question: ans?.question || '',
        answer: answer[ans?.criteriaId] || '',
      }));
      getAnswers(ansArr);
    }
  }

  function handleShort() {
    const ans = [
        comment,
        rating,
    ]
    if (getAnswers) {
        getAnswers(ans);
      }
  }   

  const normalInput = (question: string, criteriaId: string) => {
    return (
      <div className="questLabs" style={{ paddingTop: '2%' }} key={criteriaId}>
        <label
          className="pb-2 pt-2 block text-gray-600 font-semibold"
          htmlFor="normalInput"
          style={{
            fontWeight: '500',
            margin: '1%',
            fontFamily: font,
            color: textColor,
          }}
        >
          {question}
        </label>
        {!!inputFieldType &&
        (inputFieldType as Record<string, string>)[criteriaId] ===
          'textArea' ? (
          <textarea
            id="normalInput"
            placeholder="Write your message"
            style={{ height: '150px' }}
            className="max-w-md mx-auto p-6 rounded-lg bg-gray-100 w-full px-3 py-2 rounded-lg"
            onChange={(e) => handleUpdate(e, criteriaId, '')}
            value={answer[criteriaId]}
          />
        ) : (
          <input
            type="text"
            id="normalInput"
            style={{ height: '50px' }}
            name="normalInput"
            className="max-w-md mx-auto p-6 rounded-lg bg-gray-100 w-full px-3 py-2 rounded-lg"
            onChange={(e) => handleUpdate(e, criteriaId, '')}
            value={answer[criteriaId]}
            placeholder={`Enter your ${question}`}
          />
        )}
      </div>
    );
  };

  return (
    <div
      className="questLabs"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {!shortFeedback ? (
        <div
          style={{
            width: '534px',
            height: '700px',
            borderRadius: '10px',
            boxShadow: '0px 0px 6px 0px #00000073',
            padding: '3%',
            backgroundColor: bgColor,
          }}
          className="max-w-md mx-auto border rounded-lg shadow-lg"
        >
          <h2
            className="text-2xl font-bold text-center mb-1"
            style={{ fontFamily: font, color: textColor, fontSize: '28px' }}
          >
            {heading}
          </h2>
          <p
            className="text-gray-600 mb-2 text-center"
            style={{ fontFamily: font, color: textColor, fontSize: '18px' }}
          >
            {subHeading}
          </p>

          <form>
            {formdata.length > 0 &&
              formdata.map((data: any) => {
                if (data.type === 'USER_INPUT_TEXT') {
                  return normalInput(
                    data.question || '',
                    data.criteriaId || '',
                  );
                } else if (data.type === 'USER_INPUT_MULTI_CHOICE') {
                  return (
                    <div className="mb-4">
                      <label
                        style={{
                          fontWeight: '500',
                          fontFamily: font,
                          color: textColor,
                        }}
                        className="pb-2 block text-gray-600 font-semibold"
                      >
                        Rating Scale
                      </label>
                      <div style={{ padding: '2% 0% 2%' }} className="flex p-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            style={{
                              width: '40px',
                              height: '40px',
                              lineHeight: '40px',
                            }}
                            key={star}
                            type="button"
                            onClick={() =>
                              handleRatingChange(data.criteriaId, star)
                            }
                            className={`mr-2 text-2xl ${
                              star <= rating ? 'text-black' : 'text-gray-300'
                            }`}
                          >
                            {star <= rating ? blackStar : whiteStar}
                          </button>
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
              className="mt-5 continue-btn h-14 pl-4 pr-4 rounded-lg border px-3 bg-black text-white focus:ring focus:ring-blue-300 flex items-center justify-center"
            >
              Submit
            </div>
          </form>
        </div>
      ) : (
        <div
          style={{
            width: '625px',
            borderRadius: '10px',
            boxShadow: '0px 0px 6px 0px #00000073',
            padding: '1.5% 2%',
            fontFamily: font,
            color: textColor,
            backgroundColor: bgColor
          }}
          className="questLabs"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '20px', fontWeight: '600' , fontFamily: font, color: textColor,}}>
                Are these results helpful?
              </h4>
              <p style={{ fontSize: '18px', fontFamily: font, color: textColor, }}>
                Your feedback helps us improve search results
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor:'pointer' }}>
              <span onClick={() => setLikePopup(true)}>{like}</span>
              <span onClick={() => setLikePopup(true)}>{dislike}</span>
            </div>
          </div>
          <div style={{ marginTop: '5%' }} className="mb-4">
            <label
              style={{
                fontWeight: '500',
                fontFamily: font,
                color: textColor,
              }}
              className="pb-2 block text-gray-600 font-semibold"
            >
              Rating Scale
            </label>
            <div style={{ padding: '2% 0% 2%' }} className="flex p-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  style={{
                    width: '40px',
                    height: '40px',
                    lineHeight: '40px',
                  }}
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange2(star)}
                  className={`mr-2 text-2xl ${
                    star <= rating ? 'text-black' : 'text-gray-300'
                  }`}
                >
                  {star <= rating ? blackStar : whiteStar}
                </button>
              ))}
            </div>
          </div>
          {likePopup && (
            <div className='questLabs'>
              <div>
                <div style={{ marginTop: '1.5rem' }} className="flex items-center space-x-2">
                    <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {tick}
                    </div>
                    <p style={{ color: '#00A96D' }}>Thanks again for your feedback.</p>
                    </div>
                    <p style={{ margin: '5% 0% 1% 0%', fontSize: '18px', fontFamily: font, color: textColor, }} className="mt-4 block text-gray-600">Tell us more</p>
                    <input
                        style={{ height: '60px' }}
                        placeholder="Comments (optional)"
                        type="text"
                        className="w-full mx-auto p-6 border-2 border-black rounded-lg w-full px-3 py-2 rounded-lg"
                        value={comment}
                        maxLength={200}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div style={{ marginTop: '2%', fontSize: '16px', textAlign: 'right' }}>{comment.length}/200</div>
                    <div style={{ marginTop: '5%' }} className="mx-auto p-6 rounded-lg bg-gray-100 w-full px-3 py-3 rounded-lg">
                    We’re unable to respond directly to your feedback. If you have a customer support inquiry, please{' '}
                    <span onClick={()=> window.location.href = `${supportUrl}`} style={{ fontWeight: '600', textDecoration: 'underline' }}>
                        contact customer support.
                    </span>
                    </div>
                        <div style={{ marginTop: '1.5rem', width: "100%", display:"flex" , justifyContent:'end', cursor:'pointer'}}>
                            <button onClick={handleShort} style={{ fontSize: '18px', backgroundColor: 'white', color: 'black', border: '2px solid black', borderRadius: '50px', padding: '8px 24px', marginRight: '1rem' }}>Skip</button>
                            <button onClick={handleShort} style={{ fontSize: '18px', backgroundColor: btnColor ? btnColor : "black", color: 'white', borderRadius: '50px', padding: '8px 24px' }}>Submit</button>
                        </div>
                </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Feedback;
