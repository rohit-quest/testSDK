import React, { useContext, useEffect, useRef, useState } from "react";
import QuestContext from "../QuestWrapper";
import axios from "axios";
import config from "../../config";
import "./Feedback.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "../Onboarding/onboarding.css";
import "../FeedbackOverview/FeedbackOverview.css";
import { textAreaIcon, crossLogoFeedback } from "../../assets/assetsSVG";
import showToast from "../toast/toastService";
import Rating from "../Rating/Rating";
import QuestLabs from "../QuestLabs";
import General from "../../general";
import Label from "../Modules/Label";
import { Input } from "../Modules/Input";
import TextArea from "../Modules/TextArea";
import { PrimaryButton } from "../Modules/PrimaryButton";
import { SecondaryButton } from "../Modules/SecondaryButton";
import TopBar from "../Modules/TopBar";
import { MultiChoiceTwo } from "../Modules/MultiChoice";
import Toast from "../toast2/Toast";
import Cookies from "universal-cookie";
import { Align } from "../Walkthrough/Walkthrough";

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
        fill="url(#paint0_linear_4046_146)"
      />
      <path
        d="M48.4167 79.0566C49.1837 78.9078 49.9463 78.7367 50.7033 78.5432C51.987 78.1844 53.2519 77.7617 54.4933 77.2766C55.7363 76.7955 56.9545 76.2526 58.1433 75.6499C59.3325 75.0449 60.4906 74.3807 61.6133 73.6599C62.7348 72.939 63.8195 72.1625 64.8633 71.3332C65.9091 70.5029 66.9125 69.6207 67.87 68.6899C68.8259 67.7614 69.7348 66.7858 70.5933 65.7666C71.4526 64.7465 72.2603 63.684 73.0133 62.5832C73.7662 61.4843 74.4638 60.3484 75.1033 59.1799C75.743 58.0097 76.3237 56.8082 76.8433 55.5799C77.3635 54.3514 77.8218 53.0976 78.2167 51.8232C78.5548 50.7075 78.8439 49.5776 79.0833 48.4366L55.3167 24.6732C53.3096 22.6573 50.9236 21.0581 48.2961 19.9677C45.6686 18.8774 42.8514 18.3174 40.0067 18.3199C37.1594 18.3168 34.3395 18.8765 31.7092 19.9668C29.0789 21.0572 26.6901 22.6566 24.68 24.6732C22.6649 26.6839 21.0661 29.0724 19.9753 31.7018C18.8845 34.3312 18.323 37.1499 18.323 39.9966C18.323 42.8433 18.8845 45.662 19.9753 48.2914C21.0661 50.9208 22.6649 53.3092 24.68 55.3199L48.4167 79.0566Z"
        fill="url(#paint1_linear_4046_146)"
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
  onCancel?: Function;
  itemsPerPage?: number;
  iconColor?: string;
  ratingType?: string;
  uniqueEmailId?: string;
  uniqueUserId?: string;
  sections?: {
    heading?: string;
    subHeading?: string;
    button1Text?: string;
    button2Text?: string;
    placeholder?: string;
    showWordCount?: boolean;
    showTopBar?: boolean;
  }[];
  styleConfig?: {
    Form?: React.CSSProperties;
    Heading?: React.CSSProperties;
    Description?: React.CSSProperties;
    Input?: React.CSSProperties;
    Label?: React.CSSProperties;
    TextArea?: React.CSSProperties;
    PrimaryButton?: React.CSSProperties;
    SecondaryButton?: React.CSSProperties;
    Modal?: React.CSSProperties;
    Footer?: React.CSSProperties;
    TopBar?: React.CSSProperties;
    Rating?: {
      RatingContainer?: React.CSSProperties;
      SingleRating?: React.CSSProperties;
      RatingText?: React.CSSProperties;
      Hover?: React.CSSProperties;
      LeftRatingText?: string;
      RightRatingText?: string;
    };
    EmailError?: {
      text?: string;
      errorStyle?: React.CSSProperties;
    };
    MultiChoice?: {
      style?: React.CSSProperties;
      selectedStyle?: React.CSSProperties;
    };
  };
  showFooter?: boolean;
  enableVariation?: boolean;
}

interface QuestThemeData {
  accentColor: string;
  theme: string;
  borderRadius: string;
  buttonColor: string;
  images: string[];
}

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

const Survey: React.FC<FeedbackProps> = ({
  heading = "Feedback",
  subHeading = "Please share your feedback",
  userId,
  token,
  questId,
  textColor,
  font,
  bgColor,
  supportUrl,
  onSubmit,
  ratingType = "number",
  onCancel = () => {},
  itemsPerPage = 5,
  iconColor = "#939393",
  uniqueEmailId,
  uniqueUserId,
  showFooter = true,
  styleConfig = {},
  isInline = false,
  sections,
  enableVariation = false,
}) => {
  interface FormDataItem {
    type?: string;
    question?: string;
    options?: [string];
    criteriaId?: any;
    required?: boolean;
    placeholder?: string;
  }

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [likePopup, setLikePopup] = useState<boolean>(false);
  const [thanksPopup, setThanksPopup] = useState<boolean>(false);
  const [formdata, setFormdata] = useState<FormDataItem[]>([]);
  const [gradient, setGradient] = useState<boolean>(false);
  const { apiKey, apiSecret, entityId, apiType, themeConfig } = useContext(
    QuestContext.Context
  );
  const [answer, setAnswer] = useState<any>({});
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [session, setSession] = useState<string>("");
  const [isVisible, setIsVisible] = useState(true);
  const [page, setPage] = useState(0);
  const [data, setData] = useState<FormDataItem[]>([]);
  const [questThemeData, setQuestThemeData] = useState<QuestThemeData>({
    accentColor: "",
    theme: "",
    borderRadius: "",
    buttonColor: "",
    images: [],
  });

  const [BrandTheme, setBrandTheme] = useState<BrandTheme>({
    accentColor: "",
    background: "",
    borderRadius: "",
    buttonColor: "",
    contentColor: "",
    fontFamily: "",
    logo: "",
    primaryColor: "",
    secondaryColor: "",
    tertiaryColor: "",
    titleColor: "",
  });

  const cookies = new Cookies();
  let BACKEND_URL =
    apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;

  let GeneralFunctions = new General("mixpanel", apiType);

  const cross = (color = "#AFAFAF") => (
    <div
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

  const handleRatingChange = (id: string, newRating: number) => {
    setRating(newRating);
    setAnswer({
      ...answer,
      [id]: newRating,
    });
  };

  const getTheme = async (theme: string) => {
    try {
      const request = `${BACKEND_URL}api/entities/${entityId}?userId=${userId}`;
      const response = await axios.get(request, {
        headers: { apiKey, userId, token },
      });
      setBrandTheme(response.data.data.theme.BrandTheme[theme]);
    } catch (error) {
      GeneralFunctions.captureSentryException(error);
    }
  };

  useEffect(() => {
    GeneralFunctions.fireTrackingEvent("quest_survey_loaded", "survey");
    if (bgColor) {
      setGradient(
        bgColor?.includes("linear-gradient") ||
          bgColor?.includes("radial-gradient")
      );
    }
    if (entityId) {
      const headers = {
        apiKey: apiKey,
        apisecret: apiSecret,
        userId: userId,
        token: token,
      };
      const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}?userId=${userId}&getVariation=${enableVariation}`;

      axios
        .get(request, { headers: headers })
        .then((res) => {
          let response = res.data;
          if (response.data.uiProps?.questThemeData) {
            setQuestThemeData(response?.data?.uiProps?.questThemeData);
            if (response.data.uiProps?.questThemeData.theme) {
              // getTheme(response.data.uiProps.questThemeData.theme) disabled for now
            }
          }
          setSession(response.session);
          let criterias = response?.eligibilityData?.map((criteria: any) => {
            return {
              type: criteria?.data?.criteriaType,
              question: criteria?.data?.metadata?.title,
              options: criteria?.data?.metadata?.options || [],
              criteriaId: criteria?.data?.criteriaId,
              required: criteria?.data?.metadata?.isRequired,
              placeholder: criteria?.data?.metadata?.placeholder,
            };
          });
          criterias = Array.isArray(criterias) ? criterias : [];
          setFormdata([...criterias]);
          setData([...criterias]);
        })
        .catch((error) => {
          console.error("Error:", error);
          GeneralFunctions.captureSentryException(error);
        });
    }

    if (entityId && uniqueUserId) {
      const functions = new General("");
      functions.getExternalLogin({
        apiType,
        uniqueUserId,
        entityId,
        userId,
        apiKey,
        apiSecret,
        token,
        uniqueEmailId,
      });
    }
  }, []);

  const [check,setCheck]=useState(false);
  
  const handleUpdate = (
    e: any,
    id: string,
    j: string,
    type?: string,
    k?: number
  ) => {
    setCheck(prev=>!prev);
    if (type === "check") {
      if (answer[id]?.length > 0) {
        if (answer[id]?.includes(e.target.value)) {
          answer[id] = answer[id].filter((value: any) => {
            if (value != e.target.value) {
              return true;
            }
          });
        } else {
          answer[id] = [e.target.value, ...answer[id]];
        }
      } else {
        answer[id] = [e.target.value];
      }

      // if (arr.includes(e.target.value)) {
      //   console.log("value is already");
      //   arr=arr.filter((value: any) => {
      //     if (value != e.target.value) {
      //       // console.log("un")
      //       return true;
      //     }
      //   });
      //   console.log(arr)
      //   answer[id] = [...arr];
      // } else {
      //   arr.push(e.target.value);
      //   answer[id] = [...arr];
      // }
    } else if (answer[id] === j) {
      setAnswer({
        ...answer,
        [id]: undefined,
      });
    } else {
      if (j) {
        setAnswer({
          ...answer,
          [id]: j,
        });
      } else {

        setAnswer({
          ...answer,
          [id]: e.target.value,
        });
        setCheck(prev=>!prev);

      }
    }

    // if (e.target.checked === true && j === "check") {
    //   let ans = answer[id as unknown as number] || [];
    //   ans.push(e.target.value);
    //   setAnswer({
    //     ...answer,
    //     [id]: ans,
    //   });
    // } else if (k) {
    //   setAnswer({
    //     ...answer,
    //     [id]: k,
    //   });
    // } else if (
    //   e.target.checked === false &&
    //   typeof answer[id as unknown as number] === "object" &&
    //   j === "check"
    // ) {
    //   let ans = answer[id as unknown as number];
    //   let mod_ans = ans.filter((an: string | number) => an !== e.target.value);
    //   setAnswer({
    //     ...answer,
    //     [id]: mod_ans,
    //   });
    // } else {
    //   setAnswer({
    //     ...answer,
    //     [id]: e.target.value,
    //   });
    // }
  };

  function returnAnswers() {
    GeneralFunctions.fireTrackingEvent("quest_survey_form_submitted", "survey");
    let callApi = false;

    for (let i = 0; i < formdata.length; i++) {
      if (!formdata[i].required) {
      } else if (
        (formdata[i].required && answer[formdata[i]?.criteriaId]?.length > 0) ||
        (formdata[i].required && answer[formdata[i]?.criteriaId] > 0)
      ) {
        callApi = true;
      } else {
        callApi = false;
        return Toast.error({ text: "Please fill some of the details" });
      }
    }

    let questUserId = cookies.get("questUserId");
    let questUserToken = cookies.get("questUserToken");
    let externalUserId = cookies.get("externalUserId");

    let headers = {
      apikey: apiKey,
      apisecret: apiSecret,
      userId:
        !!externalUserId &&
        !!questUserId &&
        !!questUserToken &&
        externalUserId == uniqueUserId
          ? questUserId
          : userId,
      token:
        !!externalUserId &&
        !!questUserId &&
        !!questUserToken &&
        externalUserId == uniqueUserId
          ? questUserToken
          : token,
    };
    // const arr = Object.values(answer);
    // if (!answer || !arr?.length || arr.length < FormData?.length){
    //     return showToast.error("Please fill some of the details");
    // }

    // for (let e of arr){
    //   if (!e || (Array.isArray(e) && !e.length)){
    //     return showToast.error("Please fill Some of the details");
    //   }
    // }
    // if (arr.length < data?.length) {
    //   showToast.error("Please fill Some of the details");
    //   return
    // };

    if (callApi) {
      const ansArr = formdata.map((ans: any) => ({
        question: ans?.question || "",
        answer: [answer[ans?.criteriaId] || ""],
        criteriaId: ans?.criteriaId || "",
      }));
      const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/verify-all?userId=${headers.userId}&getVariation=${enableVariation}`;
      const requestData = {
        criterias: ansArr,
        userId: headers.userId,
        session,
      };
      setShowLoader(true);
      axios
        .post(request, requestData, { headers: headers })
        .then((response) => {
          if (response.data.success) {
            setThanksPopup(true);
            onSubmit && onSubmit();
          } else {
            toast.error(response.data.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          GeneralFunctions.captureSentryException(error);
        })
        .finally(() => {
          setShowLoader(false);
        });
    } else {
      toast.error("Please fill in all required fields.");
    }
  }

  const normalInput = (
    question: string,
    criteriaId: string,
    type: "number" | "text",
    required: boolean,
    placeholder?: string
  ) => {
    return (
      <div className="" key={criteriaId}>
        <Label
          htmlFor="normalInput"
          children={`${question}${required === true ? "*" : ""}`}
          style={{
            color:
              styleConfig?.Label?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.Label,
          }}
        />
        <Input
          type={type}
          style={{
            borderColor:
              styleConfig?.Input?.borderColor || themeConfig?.borderColor,
            color:
              styleConfig?.Input?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.Input,
          }}
          onChange={(e) => handleUpdate(e, criteriaId, "")}
          value={answer[criteriaId]}
          placeholder={placeholder}
        />
      </div>
    );
  };
  const emailInput = (
    question: string,
    criteriaId: string,
    required: boolean,
    placeholder?: string
  ) => {
    return (
      <div className="" key={criteriaId}>
        <Label
          htmlFor="normalInput"
          children={`${question}${required === true ? "*" : ""}`}
          style={{
            color:
              styleConfig?.Label?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.Label,
          }}
        />
        <Input
          type="email"
          style={{
            borderColor:
              styleConfig?.Input?.borderColor || themeConfig?.borderColor,
            color:
              styleConfig?.Input?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.Input,
          }}
          onChange={(e) => handleUpdate(e, criteriaId, "")}
          value={answer[criteriaId]}
          placeholder={placeholder}
          emailtext={
            styleConfig?.EmailError?.text == undefined
              ? "This is not a valid email"
              : styleConfig?.EmailError?.text
          }
          emailErrorStyle={styleConfig?.EmailError?.errorStyle}
        />
      </div>
    );
  };

  const normalInput2 = (
    question: string,
    criteriaId: string,
    required: boolean,
    placeholder?: string
  ) => {
    return (
      <div className="" key={criteriaId}>
        <Label
          htmlFor="normalInput"
          children={`${question}${required === true ? "*" : ""}`}
          style={{
            color:
              styleConfig?.Label?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.Label,
          }}
        />
        <TextArea
          style={{
            borderColor:
              styleConfig?.TextArea?.borderColor || themeConfig?.borderColor,
            color:
              styleConfig?.TextArea?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.TextArea,
          }}
          onChange={(e) => handleUpdate(e, criteriaId, "")}
          value={answer[criteriaId]}
          placeholder={(sections && sections[page].placeholder) || placeholder}
          maxLength={sections && sections[page].showWordCount ? 120 : undefined}
        />
        {sections && sections[page].showWordCount && (
          <p
            style={{
              color: "var(--Neutral-White-500, #B9B9B9)",
              fontFamily: "Figtree",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "16px",
            }}
          >
            {answer[criteriaId]?.length || 0}/120 characters
          </p>
        )}
      </div>
    );
  };

  const singleChoiceOne = (
    options: string[],
    question: string,
    required: boolean,
    criteriaId: string
  ) => {
    // options = ["sdas", "sdas", "dasd"]
    return (
      <div key={criteriaId}>
        <Label
          className="q-onb-singleChoiceOne-lebel"
          children={`${question}${required === true ? "*" : ""}`}
          style={{
            color:
              styleConfig?.Label?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.Label,
          }}
        />

        <div className="q-onb-singleChoiceOne-optDiv">
          {options.map((option: string, id: number) => (
            <div
              className="q_onb_singlehoiceOne_lebel"
              key={id}
              onClick={(e) => handleUpdate(e, criteriaId, option, "radio")}
              style={{
                border:
                  answer[criteriaId] == option
                    ? "1px solid var(--Primary-Grape-300, #bf8aff)"
                    : "1px solid var(--Neutral-White-300, #ececec)",
              }}
            >
              <input
                id={`sct${criteriaId + id}`}
                type="radio"
                value={option}
                checked={answer[criteriaId] == option}
                name={`default-radio${criteriaId}`}
                className="q-onb-singleChoiceOne-inp"
              />
              <label
                // htmlFor={`sct${criteriaId + id}`}
                className="q-onb-singleChoiceOne-lebel3"
                style={{ cursor: "pointer" }}
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleThanks = () => {
    setThanksPopup(false);
    // setSelectedOption(null);
  };

  const multiChoiceTwo = (
    options: string[] | [],
    question: string,
    required: boolean,
    criteriaId: string,
    index?: number
  ) => {
    return (
      <div key={criteriaId}>
        {/* {
          (customComponentPositions == index + 1) &&
          <div style={{ paddingBottom: "12px" }}>
            {customComponents}
          </div>
        } */}
        <Label
          htmlFor="textAreaInput"
          style={{
            color:
              styleConfig?.Label?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.Label,
          }}
        >
          {`${question}${required === true ? "*" : ""}`}
        </Label>
        <MultiChoiceTwo
          options={options}
          checked={!!answer[criteriaId] && answer[criteriaId]}
          onChange={(e) => {
            handleUpdate(e, criteriaId, "", "check");
          }}
          style={{
            borderColor:
              styleConfig?.MultiChoice?.style?.borderColor ||
              themeConfig?.borderColor,
            color:
              styleConfig?.MultiChoice?.style?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.MultiChoice?.style,
          }}
          selectedStyle={{
            color:
              styleConfig?.MultiChoice?.selectedStyle?.color ||
              questThemeData?.accentColor ||
              BrandTheme?.accentColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.MultiChoice?.selectedStyle,
          }}
        />
      </div>
    );
  };

  const dateInput = (
    question: string,
    required: boolean,
    criteriaId: string,
    placeholder: string,
    index?: number
  ) => {
    return (
      <div key={criteriaId}>
        {/* {
          (customComponentPositions == index + 1) &&
          <div style={{ paddingBottom: "12px" }}>
            {customComponents}
          </div>
        } */}
        <Label
          htmlFor="dateInput"
          style={{
            color:
              styleConfig?.Label?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.Label,
          }}
        >
          {`${question} ${!!required ? "*" : ""}`}
        </Label>
        <Input
          type={"date"}
          placeholder={placeholder}
          value={answer[criteriaId]}
          onChange={(e) => handleUpdate(e, criteriaId, "")}
          style={{
            borderColor:
              styleConfig?.Input?.borderColor || themeConfig?.borderColor,
            color:
              styleConfig?.Input?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.Input,
          }}
        />
      </div>
    );
  };

  const [goToNextSection, setGoToNextSection] = useState(false);

  useEffect(() => {
    if (formdata?.length > 0) {
      for (let i = 0; i < itemsPerPage; i++) {
        let questionNo = page * itemsPerPage + i;
        if (
          formdata[questionNo]?.type === "RATING" &&
          formdata[questionNo]?.required &&
          answer[formdata[questionNo]?.criteriaId] > 0
        ) {
          setGoToNextSection(true);
        } else if (!formdata[questionNo]?.required) {
          setGoToNextSection(true);
        } else if (
          formdata[questionNo]?.required &&
          answer[formdata[questionNo]?.criteriaId]?.length > 0
        ) {
          setGoToNextSection(true);
        } else {
          setGoToNextSection(false);
          break;
        }
      }
    }
  }, [answer, formdata, data, page, answer,check]);

  const handleNext = () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (page < totalPages - 1) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div
      style={{
        background:
          styleConfig?.Form?.backgroundColor ||
          BrandTheme?.background ||
          themeConfig?.backgroundColor,
        borderRadius:
          styleConfig?.Form?.borderRadius ||
          questThemeData?.borderRadius ||
          BrandTheme?.borderRadius,
        height: styleConfig?.Form?.height || "auto",
        fontFamily:
          BrandTheme?.fontFamily ||
          themeConfig.fontFamily ||
          "'Figtree', sans-serif",
        ...styleConfig?.Form,
      }}
      className="q-feedback-cont"
    >
      {formdata.length > 0 && (
        <>
          {!thanksPopup && (
            <div>
              <TopBar
                heading={(sections && sections[page]?.heading) || heading || ""}
                description={
                  (sections && sections[page]?.subHeading) || subHeading || ""
                }
                style={{
                  headingStyle: {
                    color:
                      styleConfig?.Heading?.color || BrandTheme?.primaryColor,
                    ...styleConfig?.Heading,
                  },
                  descriptionStyle: {
                    color:
                      styleConfig?.Description?.color ||
                      BrandTheme?.secondaryColor,
                    ...styleConfig?.Description,
                  },
                  iconStyle: { display: "none" },
                  topbarStyle: {
                    display:
                      sections && sections[page]?.showTopBar == false
                        ? "none"
                        : "block",
                    ...styleConfig?.TopBar,
                  },
                }}
              />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  data.length / itemsPerPage <= page + 1
                    ? returnAnswers()
                    : handleNext();
                }}
                style={{
                  padding: "20px",
                  boxSizing: "content-box",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {formdata
                  .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                  .map((data: any) => {
                    if (data.type === "USER_INPUT_TEXT") {
                      return normalInput(
                        data.question || "",
                        data.criteriaId || "",
                        "text",
                        data.required || false,
                        data.placeholder || sections?.[page]?.placeholder || ""
                      );
                    } else if (data.type === "USER_INPUT_EMAIL") {
                      return emailInput(
                        data.question || "",
                        data.criteriaId || "",
                        data.required || false,
                        data.placeholder || sections?.[page]?.placeholder || ""
                      );
                    } else if (data.type === "USER_INPUT_SINGLE_CHOICE") {
                      return singleChoiceOne(
                        data.options || [],
                        data?.question || "",
                        data?.required || false,
                        data.criteriaId || ""
                      );
                    } else if (data.type === "USER_INPUT_TEXTAREA") {
                      return normalInput2(
                        data.question || "",
                        data.criteriaId || "",
                        data.required || false,
                        data.placeholder || sections?.[page]?.placeholder || ""
                      );
                    } else if (data.type === "RATING") {
                      return (
                        <div className="mb-4">
                          <Label
                            className="q-fd-lebels"
                            style={{
                              color:
                                styleConfig?.Label?.color ||
                                BrandTheme?.primaryColor ||
                                themeConfig?.primaryColor,
                              ...styleConfig?.Label,
                            }}
                          >
                            {`${
                              data.question ? data.question : "Rating Scale"
                            }${data.required === true ? "*" : ""} `}
                          </Label>
                          <div
                            style={{
                              display: "flex",
                              marginTop: "6px",
                            }}
                          >
                            <Rating
                              count={5}
                              getCurrentRating={(item) =>
                                handleRatingChange(data.criteriaId, item)
                              }
                              //  defaultRating={Number(answer[0])}
                              RatingStyle={styleConfig?.Rating}
                              type={ratingType}
                            />
                          </div>
                        </div>
                      );
                    } else if (data.type === "USER_INPUT_MULTI_CHOICE") {
                      return multiChoiceTwo(
                        data.options || [],
                        data.question || "",
                        data.required || false,
                        data.criteriaId || ""
                      );
                    } else if (data.type === "USER_INPUT_DATE") {
                      return dateInput(
                        data.question || "",
                        data.required || false,
                        data.criteriaId || "",
                        data.placeholder || "Choose Date"
                      );
                    } else if (data.type === "USER_INPUT_PHONE") {
                      return normalInput(
                        data.question || "",
                        data.criteriaId || "",
                        "number",
                        data.required || false,
                        data.placeholder || undefined
                      );
                    }
                  })}
                <div className="q_feedback_buttons">
                  <SecondaryButton
                    children={
                      sections && sections[page]?.button1Text
                        ? sections[page].button1Text
                        : 0 == page
                        ? "Cancel"
                        : "Previous"
                    }
                    onClick={(e) => {
                      GeneralFunctions.fireTrackingEvent(
                        "quest_survey_secondary_button_clicked",
                        "survey"
                      );
                      e.preventDefault();
                      e.stopPropagation();
                      if (page === 0) {
                        onCancel();
                      } else {
                        setPage(page - 1);
                      }
                    }}
                    style={styleConfig?.SecondaryButton}
                  />
                  <PrimaryButton
                    style={{
                      border:
                        styleConfig?.PrimaryButton?.border ||
                        "1.5px solid #afafaf",
                      background:
                        styleConfig?.PrimaryButton?.background ||
                        questThemeData?.buttonColor ||
                        BrandTheme?.buttonColor ||
                        themeConfig?.buttonColor,
                      ...styleConfig?.PrimaryButton,
                    }}
                    onClick={() => {
                      GeneralFunctions.fireTrackingEvent(
                        "quest_survey_primary_button_clicked",
                        "survey"
                      );
                    }}
                    children={
                      sections && sections[page]?.button2Text
                        ? sections[page].button2Text
                        : data.length / itemsPerPage <= page + 1
                        ? "Submit"
                        : "Next"
                    }
                    type="submit"
                    disabled={!goToNextSection}
                  />
                </div>
              </form>
              {showFooter && (
                <QuestLabs
                  style={{
                    background:
                      styleConfig?.Footer?.backgroundColor ||
                      styleConfig?.Form?.backgroundColor ||
                      BrandTheme?.background ||
                      styleConfig?.Form?.background ||
                      themeConfig?.backgroundColor,
                    ...styleConfig?.Footer,
                  }}
                />
              )}
            </div>
          )}
          {thanksPopup && (
            <div>
              <div className="q_submit_cross_icon" onClick={handleThanks}>
                {cross(iconColor)}
              </div>
              <div className="q-fw-thanks">
                <div>
                  <div className="q-svg-thanks">{thanks}</div>
                  <div className="q_fw_submit_box">
                    <div className="q_feedback_text_submitted">
                      <div
                        className="q_feedback_text_cont"
                        style={{
                          color:
                            styleConfig?.Heading?.color ||
                            BrandTheme?.primaryColor ||
                            themeConfig?.primaryColor,
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
                        }}
                      >
                        Thanks for submitting your feedback with us. We
                        appreciate your review and will assure you to surely
                        consider them
                      </div>
                    </div>
                    <div
                      onClick={() => setThanksPopup(false)}
                      className="q_fw_submit_back"
                      style={{
                        ...styleConfig?.SecondaryButton,
                        color:
                          styleConfig?.SecondaryButton?.color ||
                          BrandTheme?.secondaryColor ||
                          themeConfig?.secondaryColor,
                      }}
                    >
                      Go to home!
                    </div>
                  </div>
                </div>
              </div>
              {showFooter && (
                <QuestLabs
                  style={{
                    background:
                      styleConfig?.Footer?.backgroundColor ||
                      styleConfig?.Form?.backgroundColor ||
                      BrandTheme?.background ||
                      styleConfig?.Form?.background ||
                      themeConfig?.backgroundColor,
                    ...styleConfig?.Footer,
                  }}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Survey;
