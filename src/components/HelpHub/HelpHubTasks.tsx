import React from 'react'
import QuestWhiteLogo from "../../assets/images/QuestWhiteLogo.svg";
import Modal1 from "../../assets/images/HelpHubModal1.jpeg";
import Modal2 from "../../assets/images/HelpHubModal2.jpeg";
import Modal3 from "../../assets/images/HelpHubModal3.jpeg";
import QuestImage from "../../assets/images/HelphubQuest.png";


import CancelButton from "../../assets/images/CancelButton.svg";
import SearchIcons from "../../assets/images/SearchIcons.svg";
import TaskStatusDone from "../../assets/images/TaskStatusDone.svg";
import TaskStatusPending from "../../assets/images/TaskStatusPending.svg";
import HelpHubHomeEmoji5 from "../../assets/images/HelpHubHomeEmoji5.svg";


const HelpHubTasks = () => {
    return (
        <div className={"helpHubTaskCont"}>
            <div className='q-helphub-tasks-upper-cont '>
                <div className='q-helphub-tasks-upper-cont-text'>
                    <div>
                        <div className='q-helphub-tasks-upper-cont-text-head'>Tasks</div>
                        <div className='q-helphub-tasks-upper-cont-text-para'>
                            Welcome back, Please talk to us to understand
                        </div>
                    </div>
                    <div className='q-helphub-tasks-upper-cont-text-button'>
                        <img src={CancelButton} alt="" />
                    </div>
                </div>
            </div>

            <div className='q-helphub-tasks-lower-cont'>
                <div className='q-helphub-tasks-lower-cont-data'>
                    {/* search box  */}
                    <div className='q-helphub-tasks-search-cont'>
                        <input type="text" placeholder='Search for Tasks...' />
                        <img src={SearchIcons} alt="" />
                    </div>

                    {/* progress bar  */}
                    <div className='q-helphub-tasks-progress-cont'>
                        <div className='q-helphub-tasks-progress-per'>40%</div>
                        <div className='q-helphub-tasks-progress-bar'>
                            <div></div>
                        </div>
                    </div>

                    <div className='q-helphub-tasks-task-cont'>

                        {/* for one task */}
                        <div className='q-helphub-tasks-single-task'>
                            <div className='q-helphub-tasks-single-task-detail'>
                                <div className='q-helphub-tasks-single-task-step'>STEP 1</div>
                                <div className='q-helphub-tasks-single-task-head'>Complete your user profile</div>
                                <div className='q-helphub-tasks-single-task-para'>You can complete your user information details by sharing the details asked in the form</div>
                            </div>
                            <div className='q-helphub-tasks-single-task-status'>
                                <img src={TaskStatusDone} alt="" />
                            </div>
                        </div>

                        <div className='q-helphub-tasks-single-task'>
                            <div className='q-helphub-tasks-single-task-detail'>
                                <div className='q-helphub-tasks-single-task-step'>STEP 2</div>
                                <div className='q-helphub-tasks-single-task-head'>Share with your friends and family</div>
                                <div className='q-helphub-tasks-single-task-para'>You can complete your user information details by sharing the details asked in the form</div>
                            </div>
                            <div className='q-helphub-tasks-single-task-status'>
                                <img src={TaskStatusDone} alt="" />
                            </div>

                        </div>

                        <div className='q-helphub-tasks-single-task'>
                            <div className='q-helphub-tasks-single-task-detail'>
                                <div className='q-helphub-tasks-single-task-step'>STEP 3</div>
                                <div className='q-helphub-tasks-single-task-head'>Subscription plan</div>
                                <div className='q-helphub-tasks-single-task-para'>You can complete your user information details by sharing the details asked in the form</div>
                            </div>
                            <div className='q-helphub-tasks-single-task-status'>
                                <img src={TaskStatusPending} alt="" />
                            </div>

                        </div>

                        <div className='q-helphub-tasks-single-task'>
                            <div className='q-helphub-tasks-single-task-detail'>
                                <div className='q-helphub-tasks-single-task-step'>STEP 4</div>
                                <div className='q-helphub-tasks-single-task-head'>Payment details</div>
                                <div className='q-helphub-tasks-single-task-para'>You can complete your user information details by sharing the details asked in the form</div>
                            </div>
                            <div className='q-helphub-tasks-single-task-status'>
                                <img src={TaskStatusPending} alt="" />
                            </div>

                        </div>

                        <div className='q-helphub-tasks-single-task'>
                            <div className='q-helphub-tasks-single-task-detail'>
                                <div className='q-helphub-tasks-single-task-step'>STEP 5</div>
                                <div className='q-helphub-tasks-single-task-head'>Application submit & review</div>
                                <div className='q-helphub-tasks-single-task-para'>You can complete your user information details by sharing the details asked in the form</div>
                            </div>
                            <div className='q-helphub-tasks-single-task-status'>
                                <img src={TaskStatusPending} alt="" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HelpHubTasks