// import React from "react";
import helpIcon from "../../assets/images/helphubMessge.svg";
import "./HelpHub.css";
import HelphubSvg from "./HelphubSvg";
import { useState } from "react";
import HelpHubHome from "./HelpHubHome";
import HelpHubChat from "./HelpHubChat";
import HelpHubHelp from "./HelpHubHelp";
import HelpHubTasks from "./HelpHubTasks";
import HelpHubUpdates from "./HelpHubUpdates";

const HelpHub = () => {
  const [selectedSection, setSelectedSection] = useState("Home");
  const [helpHub, setHelpHub] = useState(false);

  return (
    <div>
      <div className={"helphubIconUpperCont"}>

        {/* help button  */}
        <div className={
          "helhubIconCont"} onClick={() => setHelpHub((prev) => !prev)}>
          <img src={helpIcon} />
        </div>

        {
          helpHub &&
          <div className={"helpHubMainCont animated"}>


            {
              selectedSection === 'Home' ? <HelpHubHome /> : ""
            }
            {
              selectedSection === 'Chat' ? <HelpHubChat /> : ""
            }
            {
              selectedSection === 'Help' ? <HelpHubHelp /> : ""
            }
            {
              selectedSection === 'Updates' ? <HelpHubUpdates /> : ""
            }
            {
              selectedSection === 'Tasks' ? <HelpHubTasks /> : ""
            }


            <div className="helphubBottomCont">

              {/* bottom navigation buttons  */}
              <div className="helphubSvgCont">

                {/* home  */}
                <div onClick={() => setSelectedSection("Home")}
                >
                  {/* Home icon  */}
                  <HelphubSvg
                    type={"home"}
                    primaryColor={
                      selectedSection == "Home" ? "#9035FF" : "#B9B9B9"
                    }
                    secondaryColor={
                      selectedSection == "Home" ? "white" : "#B9B9B9"
                    }
                  />
                  {/* Home text  */}
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

                {/* chat page */}
                <div onClick={() => setSelectedSection("Chat")}>
                  {/* Chat icon  */}
                  <HelphubSvg
                    type={"Chat"}
                    primaryColor={
                      selectedSection == "Chat" ? "#9035FF" : "#B9B9B9"
                    }
                    secondaryColor={
                      selectedSection == "Chat" ? "white" : "#B9B9B9"
                    }
                  />
                  {/* chat text  */}
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

                {/* help page  */}
                <div onClick={() => setSelectedSection("Help")}>
                  {/* help icon  */}
                  <HelphubSvg
                    type={"Help"}
                    primaryColor={
                      selectedSection == "Help" ? "#9035FF" : "#B9B9B9"
                    }
                    secondaryColor={
                      selectedSection == "Help" ? "white" : "#B9B9B9"
                    }
                  />
                  {/* chat text  */}
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

                {/* update page */}
                <div onClick={() => setSelectedSection("Updates")}>
                  {/* update icon */}
                  <HelphubSvg
                    type={"Updates"}
                    primaryColor={
                      selectedSection == "Updates" ? "#9035FF" : "#B9B9B9"
                    }
                    secondaryColor={
                      selectedSection == "Updates" ? "white" : "#B9B9B9"
                    }
                  />

                  {/* update text  */}
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

                {/* task page */}
                <div onClick={() => setSelectedSection("Tasks")}>
                  {/* task icon  */}
                  <HelphubSvg
                    type={"Tasks"}
                    primaryColor={
                      selectedSection == "Tasks" ? "#9035FF" : "#B9B9B9"
                    }
                    secondaryColor={
                      selectedSection == "Tasks" ? "white" : "#B9B9B9"
                    }
                  />
                  {/* ttask text  */}
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

              {/* Footer: powered by quest labs  */}
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
