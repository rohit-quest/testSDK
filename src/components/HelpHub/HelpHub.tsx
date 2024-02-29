// import React from "react";
import helpIcon from "../../assets/images/helphubMessge.svg";
import "./HelpHub.css";
import HelphubSvg from "./HelphubSvg";
import { useState } from "react";
import HelpHubHome from "./HelpHubHome";
const HelpHub = () => {
  const [selectedSection, setSelectedSection] = useState("Home");
  const [helpHub, setHelpHub] = useState(false)

  return (
    <div>
      <div className={"helphubIconUpperCont"}>
        <div className={"helhubIconCont"} onClick={() => setHelpHub((prev) => !prev)}>
          <img src={helpIcon} />
        </div>

        {helpHub &&
          <div className={"helpHubMainCont animated"}>
            <HelpHubHome />

            <div className="helphubBottomCont">
              <div className="helphubSvgCont">
                <div onClick={() => setSelectedSection("Home")}>
                  <HelphubSvg
                    type={"home"}
                    primaryColor={
                      selectedSection == "Home" ? "#9035FF" : "#B9B9B9"
                    }
                    secondaryColor={
                      selectedSection == "Home" ? "white" : "#B9B9B9"
                    }
                  />
                  <div
                    style={{
                      color: selectedSection == "Home" ? "#9035FF" : "#b9b9b9",
                      fontWeight: selectedSection == "Home" ? "600" : "400",
                    }}
                    className="helphubSvgTitle"
                  >
                    Home
                  </div>
                </div>
                <div onClick={() => setSelectedSection("Chat")}>
                  <HelphubSvg
                    type={"Chat"}
                    primaryColor={
                      selectedSection == "Chat" ? "#9035FF" : "#B9B9B9"
                    }
                    secondaryColor={
                      selectedSection == "Chat" ? "white" : "#B9B9B9"
                    }
                  />
                  <div
                    style={{
                      color: selectedSection == "Chat" ? "#9035FF" : "#b9b9b9",
                      fontWeight: selectedSection == "Chat" ? "600" : "400",
                    }}
                    className="helphubSvgTitle"
                  >
                    Chat
                  </div>
                </div>
                <div onClick={() => setSelectedSection("Help")}>
                  <HelphubSvg
                    type={"Help"}
                    primaryColor={
                      selectedSection == "Help" ? "#9035FF" : "#B9B9B9"
                    }
                    secondaryColor={
                      selectedSection == "Help" ? "white" : "#B9B9B9"
                    }
                  />
                  <div
                    style={{
                      color: selectedSection == "Help" ? "#9035FF" : "#b9b9b9",
                      fontWeight: selectedSection == "Help" ? "600" : "400",
                    }}
                    className="helphubSvgTitle"
                  >
                    Help
                  </div>
                </div>
                <div onClick={() => setSelectedSection("Updates")}>
                  <HelphubSvg
                    type={"Updates"}
                    primaryColor={
                      selectedSection == "Updates" ? "#9035FF" : "#B9B9B9"
                    }
                    secondaryColor={
                      selectedSection == "Updates" ? "white" : "#B9B9B9"
                    }
                  />
                  <div
                    style={{
                      color: selectedSection == "Updates" ? "#9035FF" : "#b9b9b9",
                      fontWeight: selectedSection == "Updates" ? "600" : "400",
                    }}
                    className="helphubSvgTitle"
                  >
                    Updates
                  </div>
                </div>
                <div onClick={() => setSelectedSection("Tasks")}>
                  <HelphubSvg
                    type={"Tasks"}
                    primaryColor={
                      selectedSection == "Tasks" ? "#9035FF" : "#B9B9B9"
                    }
                    secondaryColor={
                      selectedSection == "Tasks" ? "white" : "#B9B9B9"
                    }
                  />
                  <div
                    style={{
                      color: selectedSection == "Tasks" ? "#9035FF" : "#b9b9b9",
                      fontWeight: selectedSection == "Tasks" ? "600" : "400",
                    }}
                    className="helphubSvgTitle"
                  >
                    Tasks
                  </div>
                </div>
              </div>

              <div className="helphubFooterCont">
                <div className="helphubFooterText">Powered by Quest Labs</div>
                <div>
                  <HelphubSvg type="footerLogo" />
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default HelpHub;
