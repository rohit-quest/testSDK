import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../config";
import General from "../../general";
import QuestContext from "../QuestWrapper";
import Pointer from "../../assets/images/Pointer.svg";
import Mystic from "../../assets/images/mystic.svg";
import Beer from "../../assets/images/Gem Wrapper.svg";
import XP from "../../assets/images/xp.svg";

interface SpinTheWheelProps {
  userId?: string;
  token?: string;
  questId?: string;
  criteriaId: string;
  maxSpins?: number;
  rewards: string[];
  wheelColors: {
    primary: string;
    secondary: string;
  };
  wheelImage: string;
  winningIndex: number;
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
}) => {
  const { apiKey, apiSecret, entityId } = useContext(QuestContext.Context);
  const [spinCount, setSpinCount] = useState<number>(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rewardImage, setRewardImage] = useState<string>(XP);
  const [winningSegmentIndex, setWinningSegmentIndex] = useState<number | null>(
    null
  );
  const [showCongratulations, setShowCongratulations] = useState(false);

  const handleSpinClick = async () => {
    if (wheelRef.current && !isSpinning && maxSpins && spinCount < maxSpins) {
      setIsSpinning(true);

      // Starting the initial spin
      wheelRef.current.style.transition = "transform 0s"; // Setting transition to 0s to avoid immediate jump
      wheelRef.current.style.transform = `rotate(0deg)`;

      // Trigger reflow
      wheelRef.current.offsetHeight;

      // applying the smoother spin
      wheelRef.current.style.transition = "transform 3s ease-out";
      wheelRef.current.style.transform = `rotate(1440deg)`;

      try {
        //const apiResponse = await getRandomReward();

      //  const winningIndex = apiResponse.winningIndex;
      //  const reward = apiResponse.reward;
      const winningIndex = 2;
        

        const image =  XP ;
        setRewardImage(image)

        if (winningIndex == null || winningIndex == undefined) {
          console.error("API response issue - winningIndex is null");
          setIsSpinning(false);
          setRotationAngle(0);
          return;
        }

        console.log(winningIndex)
        console.log(rewards[winningIndex])

        const segmentAngle = 360 / rewards.length;
        const stopAngle = 360 * 2 + segmentAngle * (winningIndex + 1); // Rotate 2 full circles before stopping at right index received from backend
         
        console.log(stopAngle)
        setRotationAngle(stopAngle);

        wheelRef.current.style.transition = "transform 1s ease-out";
        wheelRef.current.style.transform = `rotate(${stopAngle}deg)`;

        // Clear the transition and reset angle after it finishes
        setTimeout(() => {
          if (wheelRef.current) {
            wheelRef.current.style.transition = "";
            setIsSpinning(false);
            setSpinCount((prevSpinCount) => prevSpinCount + 1);
            setRotationAngle(0); // Reset the rotation angle to avoid issues at next spin
            setWinningSegmentIndex(winningIndex);

            setTimeout(() => {
              setShowCongratulations(true);
            }, 1000);
          }
        }, 1000);
      } catch (error) {
        console.error("API call failed", error);
        setIsSpinning(false);
        setRotationAngle(0); // Reset the rotation angle to avoid issues at next spin
      }
    }
  };

    const getRandomReward = async (): Promise<{ winningIndex: number | null; reward: any; }> => {
      try {
        const headers = {
          apiKey: apiKey,
          apisecret: apiSecret,
          userId: userId,
          token: token,
        };

        const json = {
          criteriaId: criteriaId,
        };
        const request = `${config.BACKEND_URL}api/entities/${entityId}/quests/${questId}/verify?userId=${userId}`;

        const response = await axios.post(request, json, { headers: headers });

        if (response.data.success) {
          console.log(response);
          return {
            winningIndex: response.data.winningIndex,
            reward: response.data.reward,
          };
        } else {
          console.log(response);
          return { winningIndex: null, reward: '' };
        }
      } catch (error) {
        console.error("Error:", error);
        return { winningIndex: null, reward: '' };
      }
    };

//   const getRandomReward = (): Promise<{ winningIndex: number }> => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({ winningIndex: 4 });
//       }, 2000);
//     });
//   };

  useEffect(() => {
    return () => {
      setIsSpinning(false);
      setRotationAngle(0);
    };
  }, []);

  const mainContainerStyle: React.CSSProperties = {
    background: "white",
    position: "relative",
    borderRadius: "50%",
    overflow: "hidden",
    transition: "3s all",
    padding: "3px",
    backdropFilter: "none",
  };

  const containerStyle: React.CSSProperties = {
    height: "239.143px",
    width: "239.143px",
    background: "white",
    position: "relative",
    borderRadius: "50%",
    overflow: "hidden",
    transition: "3s all",
    cursor: "pointer",
  };

  const divStyle: React.CSSProperties = {
    height: "50%",
    width: "50%",
    clipPath: "polygon(100% 0, 50% 100%, 0 0)",
    transform: "translateX(-50%) translateY(50%) rotate(180deg)",
    transformOrigin: "bottom",
    position: "absolute",
    left: "34%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "8.254px",
    fontWeight: "700",
    textAlign: "center",
    lineHeight: "7.417px",
    color: "#090D0F",
    writingMode: "vertical-rl",
  };

  const centeredImgContainerStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const centeredImgStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "fill",
    marginTop: "-0.2px",
  };

  const pointerStyle: React.CSSProperties = {
    position: "fixed",
    top: "-5%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const h5Style: React.CSSProperties = {
    color: "var(--Metal-Black, #090D0F)",
    textAlign: "center",
    fontVariantNumeric: "lining-nums tabular-nums",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
  };

  const h2Style: React.CSSProperties = {
    color: "var(--Metal-Black, #090D0F)",
    fontSize: "17px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    marginBottom: "8px",
  };

  const amazingStyle: React.CSSProperties = {
    display: "flex",
    padding: "8px 16px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    borderRadius: "8px",
    background: "var(--Metal-Black, #090D0F)",
    color: "white",

    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",
  };

  const segmentCount = rewards.length;
  const segmentStyles: React.CSSProperties[] = Array.from(
    { length: segmentCount },
    (_, index) => {
      const rotation = (index * (360 / segmentCount)) % 360;
      const width =
        Math.abs(Math.sin((360 / segmentCount / 2) * (Math.PI / 180))) * 100 +
        "%";
      return {
        ...divStyle,
        background:
          index % 2 === 0 ? wheelColors.primary : wheelColors.secondary,
        transform: `rotate(${rotation}deg)`,
        width: width,
      };
    }
  );

  return (
    <div style={mainContainerStyle}>
      <div
        style={{
          filter: showCongratulations ? "blur(8.571428298950195px)" : "none",
        }}
      >
        <div style={containerStyle} onClick={handleSpinClick} ref={wheelRef}>
          {segmentStyles.map((style, index) => (
            <div
              key={index}
              style={{
                ...divStyle,
                ...style,
                background:
                  (winningSegmentIndex &&
                    rewards.length - 1 - winningSegmentIndex) === index
                    ? "#FFDD7CBF"
                    : style.background,
              }}
              className={`segment-${index + 1}`}
            >
              <p style={{ marginTop: "-40px", transform: `rotate(180deg)` }}>
                {rewards[rewards.length - index - 1]}
              </p>
            </div>
          ))}
        </div>

        <div style={centeredImgContainerStyle}>
          <div>
            <img src={Pointer} alt="Pointer" style={pointerStyle} />
          </div>
          <div
            style={{
              boxShadow: "0 0 20.571px 0 rgba(9, 13, 15, 0.25)",
              width: "51.429px",
              height: "51.429px",
              borderRadius: "50%",
              background: "white",
            }}
          >
            <img src={wheelImage} alt="Mystic" style={centeredImgStyle} />
          </div>
        </div>
      </div>

      {showCongratulations && (
        <div
          style={{
            textAlign: "center",
            position: "absolute",
            top: "52%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <h5 style={h5Style}>Congratulations</h5>

          <p style={h2Style}>You have won:</p>
          <img
            src={rewardImage}
            alt="Reward"
            style={{ width: "60px", height: "60px", marginBottom: "0px" }}
          />
          <p style={{textAlign: "center",marginLeft:'-6px'}}>+100</p>
          <div
            style={amazingStyle}
            onClick={() => {
              setShowCongratulations(false);
              setWinningSegmentIndex(null);
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
