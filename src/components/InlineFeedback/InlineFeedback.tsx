import { CSSProperties, useContext, useEffect, useRef, useState } from "react";
import "./style.css";
import Numbering from "./Numbering";
import { FeedBackComponentProps, FeedbackProps } from "./types";
import Emoji from "./Emoji";
import Star from "./Star";
import Like from "./Like";
import QuestWrapper from "../QuestWrapper";
import config from "../../config";
import axios from "axios";
import Loader from "../Login/Loader";
import { toast } from "react-toastify";
import Success from "./Success";
import { cross } from "../../assets/assetsSVG";

const componentMapping: {
  [key in string]: (props: FeedBackComponentProps) => JSX.Element;
} = {
  numbering: Numbering,
  like: Like,
  emoji: Emoji,
  star: Star,
};

export default function InlineFeedback({
  userId,
  token,
  questId: campaignId,
  heading = "Found it helpful",
  description = "Your feedback help us improve search results!",
  type = "numbering",
  count = 5,
  styleConfig,
  onChange,
  onRequestClose,
  initialState
}: FeedbackProps) {
  const [questData, setQuestData] = useState<any | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const { themeConfig, entityId, apiType, apiKey, apiSecret } = useContext(
    QuestWrapper.Context
  );
  const data = useRef<object>();

  const Component: (props: FeedBackComponentProps) => JSX.Element =
    componentMapping[type];

  let BACKEND_URL =
    apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;

  const themeConfigStyle = {
    "--backgroundColor": themeConfig.backgroundColor,
    "--borderColor": themeConfig.borderColor,
    "--buttonColor": themeConfig.buttonColor,
    "--fontFamily": themeConfig.fontFamily,
    "--primaryColor": themeConfig.primaryColor,
    "--secondaryColor": themeConfig.secondaryColor,
  } as CSSProperties;

  useEffect(() => {
    const headers = {
      apiKey: apiKey,
      apisecret: apiSecret,
      userId: userId,
      token: token,
    };
    async function fetchData() {
      try {
        const request = `${BACKEND_URL}api/v2/entities/${entityId}/campaigns/${campaignId}`;
        const response = await axios.get(request, { headers });
        if (response.status != 200) throw new Error("Invalid quest request");
        setQuestData(response.data);
      } catch (error) {
        setQuestData(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleRatingClick = async (data: any) => {
    try {
      // setLoading(true)
      const headers = {
        apiKey: apiKey,
        apisecret: apiSecret,
        userId,
        token,
      };

      const request = `${BACKEND_URL}api/v2/entities/${entityId}/campaigns/${campaignId}/verify`;
      const actionId = questData?.data?.actions?.[0].actionId;
      const answer =
        type == "like"
          ? data?.like
            ? "like"
            : "dislike"
          : `${data.rate}`;
      const jsonData = {actions: [{ actionId, answers: [answer] }], campaignVariationId: questData?.data.campaignVariationId};
      const response = await axios.post(request, jsonData, { headers });

      if (response.data?.success) {
        setShowSuccess(true);
      }
    } catch (error) {
      toast.error("Something went wrong, try again");
    } finally {
      // setLoading(false)
    }
  };

  const onDataChange = (updatedData: object) => {
    data.current = updatedData;
    handleRatingClick(updatedData);
    onChange?.(updatedData);
  };

  return (
    questData && (
      <div
        className={`feedbackContainer`}
        data-type={type.toString()}
        style={{ ...styleConfig?.Form, ...themeConfigStyle }}
      >
        {showSuccess ? (
          <Success closeFeedback={() => setShowSuccess(false)} />
        ) : (
          <>
            <div className={`feedbackHeader`}>
              <div className="inline-text-cont" style={{background:'transparent'}}>
                <div
                  style={{
                    color: styleConfig?.Heading?.color || "#2c2c2c",
                    ...styleConfig?.Heading,
                  }}
                  className="inline-head"
                >
                  {heading}
                </div>
                <div style={{ ...styleConfig?.Description }} className="inline-desc">{description}</div>
              </div>
              <div onClick={onRequestClose} className="inline-cross-btn">
                {cross(styleConfig?.closeIconColor)}
              </div>
            </div>

            <section className={`feedbackSection`}>
              <Component
                onChange={onDataChange}
                count={count}
                style={{ ...styleConfig?.ActionContainer }}
                buttonStyle={{ ...styleConfig?.ActionButton }}
                selectedButtonStyle={{ ...styleConfig?.ActionSelectedButton }}
                iconStyle={styleConfig?.IconStyle}
                selectedIconStyle={styleConfig?.SelectedIconStyle}
                initialState={initialState}
              />
              <div className={`feedbackMessage`}>
                <span>Not satisfied</span>
                <span>Very satisfied</span>
              </div>
            </section>
          </>
        )}
        <div className={`feedbackWatermark`} style={{ ...styleConfig?.Footer }}>
          <p>Powered by Quest Labs</p>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 0V4L8 8V4H4V6.64083C4 7.39167 4.60833 8 5.35917 8H8L4 12C1.79083 12 0 10.2092 0 8V0H12Z"
              fill="#B9B9B9"
            />
            <path d="M12 8L8 8L8 12H12V8Z" fill="#B9B9B9" />
          </svg>
        </div>
        {isLoading ? <Loader /> : null}
      </div>
    )
  );
}
