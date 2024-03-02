import React from 'react'
import QuestWhiteLogo from "../../assets/images/QuestWhiteLogo.svg";
import Modal1 from "../../assets/images/HelpHubModal1.jpeg";
import Modal2 from "../../assets/images/HelpHubModal2.jpeg";
import Modal3 from "../../assets/images/HelpHubModal3.jpeg";
import QuestImage from "../../assets/images/HelphubQuest.png";


import HelpHubHomeEmoji1 from "../../assets/images/HelpHubHomeEmoji1.svg";
import HelpHubHomeEmoji2 from "../../assets/images/HelpHubHomeEmoji2.svg";
import HelpHubHomeEmoji3 from "../../assets/images/HelpHubHomeEmoji3.svg";
import HelpHubHomeEmoji4 from "../../assets/images/HelpHubHomeEmoji4.svg";
import HelpHubHomeEmoji5 from "../../assets/images/HelpHubHomeEmoji5.svg";


const HelpHubHome = () => {
  return (
    <div className={"helpHubMainInnerCont"}>

      <div className={"MainImgCont"}>
        <div className={"QuestWhiteLogoCont"}>
          <img src={QuestWhiteLogo} />
        </div>
        <div className={"helpHubImageCont"}>
          <div className={"helpHubImage"}>
            <img src={Modal1} />
          </div>
          <div className={"helpHubImage"}>
            <img src={Modal2} />
          </div>
          <div className={"helpHubImage"}>
            <img src={Modal3} />
          </div>
        </div>
      </div>

      <div style={{ width: "100%" }} className="q-helphub-InnerCont">
        <div className={"HelloText"}>Hello there</div>
        <div className={"HelloText"}>How can we help?</div>

        {/* sent message */}
        <div className="q-helhub-Send-Cont">
          <div>
            <div className="q-helphub-send-msg">Send us a message</div>
            <div className="q-helphub-send-desc">
              See how your customer service solution works
            </div>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.67461 2.95363C5.88428 2.77392 6.19993 2.7982 6.37964 3.00787L10.3796 7.67453C10.5401 7.86178 10.5401 8.13808 10.3796 8.32532L6.37964 12.992C6.19993 13.2017 5.88428 13.2259 5.67461 13.0462C5.46495 12.8665 5.44067 12.5509 5.62038 12.3412L9.34147 7.99993L5.62038 3.65866C5.44067 3.44899 5.46495 3.13334 5.67461 2.95363Z"
                fill="#B9B9B9"
              />
            </svg>
          </div>
        </div>

        {/* community */}
        <div className="q-helphub-quest-community-cont">
          <div className="q-helphub-quest-community-imageCont">
            <img src={QuestImage} />
          </div>
          <div className="q-helphub-quest-community-descCont">
            <div className="q-helphub-quest-community-desc">
              The Questlabs community
            </div>
            <div className="q-helphub-quest-community-full-desc">
              Be sure to check out the Quest labs community for support,
              plus tips & tricks from Quest users and much more coming
              soon
            </div>
          </div>
        </div>

        {/* search for help  */}
        <div className="q-helhub-search-community">
          <div className="q-helhub-search-community-inner">
            <div className="q-helphub-search-input-cont">
              <input
                className="q-helphub-search-input"
                placeholder="Search for help..."
              />
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g clip-path="url(#clip0_4762_1863)">
                    <circle
                      cx="7.66671"
                      cy="7.66659"
                      r="6.33333"
                      stroke="#B9B9B9"
                      stroke-width="1.5"
                    />
                    <path
                      d="M13.3334 13.3333L14.6667 14.6666"
                      stroke="#B9B9B9"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4762_1863">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>

            <div className="q-helphub-search-messege">
              <div className="q-helphub-search-messege-cont">
                <div className="q-helphub-search-messege-title">
                  How teammates get notifications
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.67461 2.95363C5.88428 2.77392 6.19993 2.7982 6.37964 3.00787L10.3796 7.67453C10.5401 7.86178 10.5401 8.13808 10.3796 8.32532L6.37964 12.992C6.19993 13.2017 5.88428 13.2259 5.67461 13.0462C5.46495 12.8665 5.44067 12.5509 5.62038 12.3412L9.34147 7.99993L5.62038 3.65866C5.44067 3.44899 5.46495 3.13334 5.67461 2.95363Z"
                      fill="#B9B9B9"
                    />
                  </svg>
                </div>
              </div>
              <div className="q-helphub-search-messege-cont">
                <div className="q-helphub-search-messege-title">
                  Reporting metrics & attributes
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.67461 2.95363C5.88428 2.77392 6.19993 2.7982 6.37964 3.00787L10.3796 7.67453C10.5401 7.86178 10.5401 8.13808 10.3796 8.32532L6.37964 12.992C6.19993 13.2017 5.88428 13.2259 5.67461 13.0462C5.46495 12.8665 5.44067 12.5509 5.62038 12.3412L9.34147 7.99993L5.62038 3.65866C5.44067 3.44899 5.46495 3.13334 5.67461 2.95363Z"
                      fill="#B9B9B9"
                    />
                  </svg>
                </div>
              </div>
              <div className="q-helphub-search-messege-cont">
                <div className="q-helphub-search-messege-title">
                  Install with Google tag manager
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.67461 2.95363C5.88428 2.77392 6.19993 2.7982 6.37964 3.00787L10.3796 7.67453C10.5401 7.86178 10.5401 8.13808 10.3796 8.32532L6.37964 12.992C6.19993 13.2017 5.88428 13.2259 5.67461 13.0462C5.46495 12.8665 5.44067 12.5509 5.62038 12.3412L9.34147 7.99993L5.62038 3.65866C5.44067 3.44899 5.46495 3.13334 5.67461 2.95363Z"
                      fill="#B9B9B9"
                    />
                  </svg>
                </div>
              </div>
              <div className="q-helphub-search-messege-cont">
                <div className="q-helphub-search-messege-title">
                  Getting started with news
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.67461 2.95363C5.88428 2.77392 6.19993 2.7982 6.37964 3.00787L10.3796 7.67453C10.5401 7.86178 10.5401 8.13808 10.3796 8.32532L6.37964 12.992C6.19993 13.2017 5.88428 13.2259 5.67461 13.0462C5.46495 12.8665 5.44067 12.5509 5.62038 12.3412L9.34147 7.99993L5.62038 3.65866C5.44067 3.44899 5.46495 3.13334 5.67461 2.95363Z"
                      fill="#B9B9B9"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* get  updates */}
        <div className="q-helphub-update-mainCont">
          <div className="q-helphub-search-updates">
            <div className="q-helphub-updates-innercont">

              <div className="q-helphub-quest-community-desc">
                Get Updates
              </div>
              <div className="q-helphub-updates-desc">
                <div className="q-helphub-updates-innerCont1">
                  <div>New feature release this weekend 🥰</div>
                  <div>
                    Lorem ipsum dolor sit amet consectetur. Lorem ipsum
                    dolor sit amet consectetur. Lorem ipsum dolor sit amet
                    consectetur. Lorem ipsum dolor sit amet consectetur.
                  </div>
                </div>

                <div className="q-helphub-updates-innerCont2">
                  <div>Beginning of the new launch!!!</div>
                  <div>
                    Lorem ipsum dolor sit amet consectetur. Lorem ipsum
                    dolor sit amet consectetur. Lorem ipsum dolor sit amet
                    consectetur. Lorem ipsum dolor sit amet consectetur.
                  </div>
                </div>
              </div>
            </div>
            <button className="q-helphub-updates-button">See all updates</button>
          </div>
        </div>


        {/* complete profile */}
        <div className="q-helphub-compProfile">

          {/* one */}
          <div className='q-helphub-compProfile-text-con'>

            {/* heading and aero cont */}
            <div className='q-helphub-compProfile-heading-cont'>
              <div className='q-helphub-compProfile-heading-text'>
                Complete your profile
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none">

                <path
                  fill-rule="evenodd" clip-rule="evenodd" d="M5.67461 2.95363C5.88428 2.77392 6.19993 2.7982 6.37964 3.00787L10.3796 7.67453C10.5401 7.86178 10.5401 8.13808 10.3796 8.32532L6.37964 12.992C6.19993 13.2017 5.88428 13.2259 5.67461 13.0462C5.46495 12.8665 5.44067 12.5509 5.62038 12.3412L9.34147 7.99993L5.62038 3.65866C5.44067 3.44899 5.46495 3.13334 5.67461 2.95363Z" fill="#B9B9B9" />
              </svg>
            </div>

            {/* para cont  */}
            <div className='q-helphub-compProfile-para-text'>
              Be sure to check out the Quest labs community for support, plus tips & tricks from Quest users
            </div>
          </div>

          {/* two  */}
          <div className='q-helphub-compProfile-progress-con'>
            {/* progress percentage */}
            <div className='q-helphub-compProfile-progress-per'>
              40% Completed
            </div>

            {/* progress bar container*/}
            <div className='q-helphub-compProfile-progress-bar-con'>
              {/* progress bar */}
              <div className='q-helphub-compProfile-progress-bar'>

              </div>
            </div>
          </div>
        </div>


        {/* review  */}

        <div className='q-helphub-review'>

          <div className='q-helphub-review-text-emoji-cont'>

            {/* text div  */}
            <div className='q-helphub-review-text-con'>
              <div className='q-helphub-review-text-head'>
                How satisfied are you?
              </div>

              <div className='q-helphub-review-text-para'>
                How would you rate this journey after using the product after so long?
              </div>
            </div>

            {/* emoji */}
            <div className='q-helphub-review-emoji-caption-con'>

              <div className='q-helphub-review-emoji-cont'>
                <img src={HelpHubHomeEmoji1} alt="" />
                <img src={HelpHubHomeEmoji2} alt="" />
                <img src={HelpHubHomeEmoji3} alt="" />
                <img src={HelpHubHomeEmoji4} alt="" />
                <img src={HelpHubHomeEmoji5} alt="" />
              </div>
              <div className='q-helphub-review-emoji-caption'>
                <div>
                  Not satisfied
                </div>
                <div>
                  Very satisfied
                </div>
              </div>

            </div>

          </div>


        </div>



      </div>
    </div>
  )
}

export default HelpHubHome