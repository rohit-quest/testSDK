import React, { useState } from 'react'
import QuestWhiteLogo from "../../assets/images/QuestWhiteLogo.svg";
import Modal1 from "../../assets/images/HelpHubModal1.jpeg";
import Modal2 from "../../assets/images/HelpHubModal2.jpeg";
import Modal3 from "../../assets/images/HelpHubModal3.jpeg";
import QuestImage from "../../assets/images/HelphubQuest.png";


import CancelButton from "../../assets/images/CancelButton.svg";
import SearchIcons from "../../assets/images/SearchIcons.svg";
import TaskStatusDone from "../../assets/images/TaskStatusDone.svg";
import TaskStatusPending from "../../assets/images/TaskStatusPending.svg";
import OpenSectionButton from "../../assets/images/OpenSectionButton.svg";
import HelpHubHomeEmoji5 from "../../assets/images/HelpHubHomeEmoji5.svg";
import UnreadUpdateLogo from "../../assets/images/UnreadUpdateLogo.svg";
import ReadUpdateLogo from "../../assets/images/ReadUpdateLogo.svg";


const HelpHubUpdates = () => {

    const [updatesArr, setUpdatesArr] = useState([
        {
            read: true,
            time: "Yesterday",
            updateTitle: "Complete your user profile",
            updateDesc: "You can complete your user information details by sharing the details asked in the form"
        },
        {
            read: false,
            time: "Yesterday",
            updateTitle: "Complete your user profile",
            updateDesc: "You can complete your user information details by sharing the details asked in the form"
        },
        {
            read: true,
            time: "Yesterday",
            updateTitle: "Complete your user profile",
            updateDesc: "You can complete your user information details by sharing the details asked in the form"
        },
        {
            read: true,
            time: "Yesterday",
            updateTitle: "Complete your user profile",
            updateDesc: "You can complete your user information details by sharing the details asked in the form"
        },
        {
            read: false,
            time: "Yesterday",
            updateTitle: "Complete your user profile",
            updateDesc: "You can complete your user information details by sharing the details asked in the form"
        },
    ]);

    return (
        <div className={"helpHubUpdatesCont"}>
            <div className='q-helphub-updates-upper-cont '>
                <div className='q-helphub-updates-upper-cont-text'>
                    <div>
                        <div className='q-helphub-updates-upper-cont-text-head'>Updates</div>
                        <div className='q-helphub-updates-upper-cont-text-para'>
                            Welcome back, Please talk to us to understand
                        </div>
                    </div>
                    <div className='q-helphub-updates-upper-cont-text-button'>
                        <img src={CancelButton} alt="" />
                    </div>
                </div>
            </div>

            <div className='q-helphub-updates-lower-cont'>
                <div className='q-helphub-updates-lower-cont-data'>
                    {/* search box  */}
                    <div className='q-helphub-updates-search-cont'>
                        <input type="text" placeholder='Search for FAQs...' />
                        <img src={SearchIcons} alt="" />
                    </div>

                    <div className='q-helphub-updates-task-cont'>

                        {/* for one task */}
                        {/* unread update  */}
                        {
                            updatesArr.map((value, index) => {
                                return <div
                                    className={`q-helphub-updates-single-update-${value.read ? "read" : "unread"}`}
                                    key={index}
                                >
                                    <div className='update-time'>
                                        {
                                            value.read ? <img src={ReadUpdateLogo} alt="" /> : <img src={UnreadUpdateLogo} alt="" />
                                        }
                                        <div>
                                            {
                                                value.time
                                            }
                                        </div>
                                    </div>

                                    <div className='update-question'>
                                        <div className='ques'>
                                            {
                                                value.updateTitle
                                            }
                                        </div>
                                        <div className='btn'>
                                            <img src={OpenSectionButton} alt="" />
                                        </div>
                                    </div>

                                    <div className='update-message'>
                                        {
                                            value.updateDesc
                                        }
                                    </div>
                                </div>
                            })
                        }

                    </div>

                </div>
            </div>

        </div>
    )
}

export default HelpHubUpdates