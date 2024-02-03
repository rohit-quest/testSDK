// import React from "react";
import helpIcon from "../../assets/images/helphubMessge.svg";
import "./HelpHub.css";
import QuestWhiteLogo from "../../assets/images/QuestWhiteLogo.svg";
import Modal1 from "../../assets/images/HelpHubModal1.jpeg";
import Modal2 from "../../assets/images/HelpHubModal2.jpeg";
import Modal3 from "../../assets/images/HelpHubModal3.jpeg";
const HelpHub = () => {
  return (
    <div>
      <div className={'helphubIconUpperCont'}>
        <div className={'helhubIconCont'}>
          <img src={helpIcon} />
        </div>

        <div className={'helpHubMainCont'}>
          <div className={'helpHubMainInnerCont'}>
            <div className={'MainImgCont'}>
              <div className={'QuestWhiteLogoCont'}>
                <img src={QuestWhiteLogo} />
              </div>
              <div className={'helpHubImageCont'}>
                <div className={'helpHubImage'}>
                  <img src={Modal1} />
                </div>
                <div className={'helpHubImage'}>
                  <img src={Modal2} />
                </div>
                <div className={'helpHubImage'}>
                  <img src={Modal3} />
                </div>
              </div>
            </div>

            <div>
              <div className={'HelloText'}>Hello there</div>
              <div className={'HelloText'}>How can we help?</div>
              <div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpHub;
