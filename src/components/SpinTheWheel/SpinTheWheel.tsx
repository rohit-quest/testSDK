import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../config";
import QuestContext from "../QuestWrapper";
import Pointer from "../../assets/images/pointer.svg";
import XP from "../../assets/images/xp.svg";
import './spinTheWheel.css';


interface SpinTheWheelProps {
  userId: string;
  token: string;
  questId: string;
  criteriaId: string;
  maxSpins?: number;
  rewards: string[];
  wheelColors: {
    primary: string;
    secondary: string;
  };
  isAccumulateXP?: boolean;
  wheelImage?: string;
  winningIndex?: number;
  onSpinComplete?: () => void;
  successCall?: () => void;
}

const SpinTheWheel: React.FC<SpinTheWheelProps> = ({
  maxSpins,
  rewards,
  wheelColors,
  wheelImage,
  winningIndex,
  userId,
  token,
  questId,
  criteriaId,
  onSpinComplete,
  successCall,
  isAccumulateXP = false
}) => {
  const { apiKey, apiSecret, entityId ,apiType} = useContext(QuestContext.Context);
  const [spinCount, setSpinCount] = useState<number>(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rewardImage, setRewardImage] = useState<string>(XP);
  const [rewardValue, setRewardValue] = useState<string>("");
  const [winningSegmentIndex, setWinningSegmentIndex] = useState<number | null>(
    null
  );
  let BACKEND_URL = apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL
  const [showCongratulations, setShowCongratulations] = useState(false);

  const handleSpinClick = async () => {
    if (wheelRef.current && !isSpinning && maxSpins && spinCount < maxSpins) {
      setIsSpinning(true);

      wheelRef.current.style.transition = "transform 0s";
      wheelRef.current.style.transform = `rotate(0deg)`;

      wheelRef.current.offsetHeight;

      wheelRef.current.style.transition = "transform 3s ease-out";
      wheelRef.current.style.transform = `rotate(2160deg)`;

      try {
        const apiResponse = await getRandomReward();

        const winningIndex = apiResponse.winningIndex;
        const reward = apiResponse.reward;

        const image =
          reward[0]?.metadata?.logo || reward[0]?.metadata?.imageURL || XP;
        setRewardImage(image);

        const val =
          reward[0]?.metadata?.gemsData || reward[0]?.metadata?.xp || "";
        setRewardValue(val);

        if (winningIndex == null || winningIndex == undefined) {
          console.error("API response issue - winningIndex is null");
          setIsSpinning(false);
          setRotationAngle(0);
          if (onSpinComplete) {
            onSpinComplete();
          }
          return;
        }

        const segmentAngle = 360 / rewards.length;
        const stopAngle = 360 * 4 + segmentAngle * (winningIndex + 1);

        setRotationAngle(stopAngle);

        wheelRef.current.style.transition = "transform 1s ease-out";
        wheelRef.current.style.transform = `rotate(${stopAngle}deg)`;

        setTimeout(() => {
          if (wheelRef.current) {
            wheelRef.current.style.transition = "";
            setIsSpinning(false);
            setSpinCount((prevSpinCount) => prevSpinCount + 1);
            setRotationAngle(0);
            setWinningSegmentIndex(winningIndex);

            setTimeout(() => {
              setShowCongratulations(true);
            }, 1000);
          }
        }, 1000);
      } catch (error) {
        console.error("API call failed", error);
        setIsSpinning(false);
        setRotationAngle(0);
      }
    }
  };

  const getRandomReward = async (): Promise<{
    winningIndex: number | null;
    reward: any;
  }> => {
    try {
      const headers = {
        apiKey: apiKey,
        apisecret: apiSecret,
        userId: userId,
        token: token,
      };

      const json = {
        criteriaId: criteriaId,
        isAccumulateXP: isAccumulateXP,
      };
      const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/verify?userId=${userId}`;

      const response = await axios.post(request, json, { headers: headers });

      if (response.data.success) {
        console.log(response);
        return {
          winningIndex: response.data.winningIndex,
          reward: response.data.reward,
        };
      } else {
        console.log(response);
        return { winningIndex: null, reward: "" };
      }
    } catch (error) {
      console.error("Error:", error);
      return { winningIndex: null, reward: "" };
    }
  };

  useEffect(() => {
    return () => {
      setIsSpinning(false);
      setRotationAngle(0);
    };
  }, []);

  // const mainContainerStyle: React.CSSProperties = {
  //   background: "white",
  //   position: "relative",
  //   borderRadius: "50%",
  //   overflow: "hidden",
  //   transition: "3s all",
  //   padding: "3px",
  //   backdropFilter: "none",
  //   width: "fit-content"
  // };

  // const containerStyle: React.CSSProperties = {
  //   height: "239.143px",
  //   width: "239.143px",
  //   background: "white",
  //   position: "relative",
  //   borderRadius: "50%",
  //   overflow: "hidden",
  //   transition: "3s all",
  //   cursor: "pointer",
  // };

  // const spinDivStyle: React.CSSProperties = {
  //   height: "50%",
  //   width: "50%",
  //   clipPath: "polygon(100% 0, 50% 100%, 0 0)",
  //   transform: "translateX(-50%) translateY(50%) rotate(180deg)",
  //   transformOrigin: "bottom",
  //   position: "absolute",
  //   left: "34%",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   fontSize: "8.254px",
  //   fontWeight: "700",
  //   textAlign: "center",
  //   lineHeight: "7.417px",
  //   color: "#090D0F",
  //   writingMode: "vertical-rl",
  // };

  // const centeredImgContainerStyle: React.CSSProperties = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  // };

  // const centeredImgStyle: React.CSSProperties = {
  //   width: "100%",
  //   height: "100%",
  //   objectFit: "fill",
  //   marginTop: "-0.2px",
  // };

  // const centeredImgDivStyle: React.CSSProperties = {
  //   boxShadow: "0 0 20.571px 0 rgba(9, 13, 15, 0.25)",
  //   width: "51.429px",
  //   height: "51.429px",
  //   borderRadius: "50%",
  //   background: "white",
  // };

  // const pointerStyle: React.CSSProperties = {
  //   position: "fixed",
  //   top: "-5%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  // };

  // const h5Style: React.CSSProperties = {
  //   color: "var(--Metal-Black, #090D0F)",
  //   textAlign: "center",
  //   fontVariantNumeric: "lining-nums tabular-nums",
  //   fontSize: "12px",
  //   fontStyle: "normal",
  //   fontWeight: 700,
  //   lineHeight: "normal",
  // };

  // const h2Style: React.CSSProperties = {
  //   color: "var(--Metal-Black, #090D0F)",
  //   fontSize: "17px",
  //   fontStyle: "normal",
  //   fontWeight: 700,
  //   lineHeight: "normal",
  //   marginBottom: "8px",
  // };

  // const amazingButtonStyle: React.CSSProperties = {
  //   display: "flex",
  //   padding: "8px 16px",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   gap: "10px",
  //   borderRadius: "8px",
  //   background: "var(--Metal-Black, #090D0F)",
  //   color: "white",

  //   fontSize: "12px",
  //   fontStyle: "normal",
  //   fontWeight: 600,
  //   lineHeight: "normal",
  // };

  // const successModal: React.CSSProperties = {
  //   textAlign: "center",
  //   position: "absolute",
  //   top: "52%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   zIndex: 2,
  //   display: "inline-flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   gap: "8px",
  // };

  const segmentCount = rewards.length;
  const segmentStyles: React.CSSProperties[] = Array.from(
    { length: segmentCount },
    (_, index) => {
      const rotation = (index * (360 / segmentCount)) % 360;
      const width =
        Math.abs(Math.sin((360 / segmentCount / 2) * (Math.PI / 180))) * 100 +
        "%";
      return {
        // ...spinDivStyle,
        background:
          index % 2 === 0 ? wheelColors.primary : wheelColors.secondary,
        transform: `rotate(${rotation}deg)`,
        width: width,
        
      };
    }
  );

  return (
    <div  className={'spinMainContainerStyle'}>
      <div
        style={{
          filter: showCongratulations ? "blur(8.571428298950195px)" : "none",
        }}
      >
        <div className={'spinContainerStyle'} onClick={handleSpinClick} ref={wheelRef}>
          {segmentStyles.map((style, index) => (
            <div
              key={index}
              style={{
              //  ...spinDivStyle,
                ...style,
                background:
                  (winningSegmentIndex !== null &&
                    rewards.length - 1 - winningSegmentIndex) === index
                    ? "#FFDD7CBF"
                    : style.background,
              }}
              className={`segment-${index + 1}`}
               id='spinDivStyle'
            >
              <p style={{ marginTop: "-40px", transform: `rotate(180deg)` }}>
                {rewards[rewards.length - index - 1]}
              </p>
            </div>
          ))}
        </div>
        <div  className={'spinCenteredImgContainerStyle'}>
          <div>
            <img src={Pointer} alt="Pointer" className={'spinPointerStyle'} />
          </div>
          <div  className={'spinCenteredImgDivStyle'}>
            <img src={wheelImage} alt="Mystic" className={'spinCenteredImgStyle'} />
          </div>
        </div>
      </div>

      {showCongratulations && (
        <div className={'spinSuccessModal'}>
          <h5 className={'spinH5Style'} >Congratulations</h5>

          <p  className={'spinH2Style'}>You have won:</p>
          <img
            src={rewardImage}
            alt="Reward"
            style={{ width: "60px", height: "60px", marginBottom: "0px" }}
          />
          {rewardValue && (
            <p style={{ textAlign: "center", marginLeft: "-6px" }}>
              +{rewardValue}
            </p>
          )}
          <div
            // style={amazingButtonStyle}
            className={'spinAmazingButtonStyle'}
            onClick={() => {
              setShowCongratulations(false);
              setWinningSegmentIndex(null);
              if (successCall) {
                successCall();
              }
            }}
          >
            <p>Amazing</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinTheWheel;
