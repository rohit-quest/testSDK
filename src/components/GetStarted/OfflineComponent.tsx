import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import './GetStarted.css';
import config from '../../config';
import QuestContext from '../QuestWrapper';;
import Loader from '../Login/Loader';
import { greenCheck, gsTick, helpCenter1, questLogo } from '../../assets/images';
import { arrowRight, downArroIcon, upArrow } from './Svgs';
import QuestLabs from '../QuestLabs';

interface formData {
  id: number;
  title: string;
  url: string;
  criteriaId?: string;
  description?: string;
  btn1?: string;
  btn2?: string;
  completed?: boolean;
  btn1Link: string;
  longDescription?: string;
  imageUrl?: string;
}

type offlineGetStartedProps = {
  cardBackground?: string;
  cardHeadingColor?: string;
  mainBackground?: string;
  cardDescriptionColor?: string;
  onCompleteAllStatus?: () => void;
  buttonBackground?: string;
  iconUrls: Array<string>;
  uniqueUserId?: string;
  uniqueEmailId?: string;
  cardBorderColor?: string;
  headingText?: string;
  descriptionText?: string;
  autoHide?: boolean;
  showProgressBar?: boolean;
  completedButtonColor?: string;
  completedButtonBackgroundColor?: string;
  cardWidth?: string;
  arrowColor?: string;
  showLoadingIndicator?: boolean;
  allowMultiClick?: boolean;
  footerBackgroundColor?: string;
  questIconColor?: string;
  showFooter?: boolean;
  template?: 1 | 2
  offlineData:formData[]
};



function OfflineGetStarted({
  cardBackground = 'grey',
  cardHeadingColor = '#2C2C2C',
  cardDescriptionColor = '#939393',
  buttonBackground,
  iconUrls,
  cardBorderColor = '#EFEFEF',
  headingText,
  descriptionText,
  autoHide,
  showProgressBar = false,
  template = 1,
  arrowColor,
  showLoadingIndicator = true,
  allowMultiClick = false,
  mainBackground = 'white',
  footerBackgroundColor = '#FBFBFB',
  questIconColor = '#939393',
  showFooter = true,
  offlineData, 
}: offlineGetStartedProps) {

  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [allCriteriaCompleted, setAllCriteriaCompleted] = useState<boolean>(false);
  const [criteriaSubmit, setCriteriaSubmit] = useState<string[]>([])
  const [dropdowns, setDropdown] = useState<Array<boolean>>([]);
  

  const completedPercentage = (offlineData.reduce((a, b) => a + (b.completed ? 1 : 0), 0)) * 100 / offlineData.length;

  const onLinkTrigger = (url: any, id: any) => {
    window.location.href = url;
  }

  const handleCriteriaClick = (criteriaId: string | undefined, url: string) => {
    onLinkTrigger(url,criteriaId)
  };


  return (
    <div
      style={{
        background: mainBackground
      }}
      className="get_started_box"
    >
      {showLoadingIndicator && showLoader && <Loader />}
      {(autoHide === true
        ? !!offlineData.length && !allCriteriaCompleted
        : true) && (
        <div className="gs-heading-div">
          <div>
            <div style={{ color: cardHeadingColor }} className="gs-heading">
              {headingText || "Quickstart Guide"}
            </div>
            <div style={{ color: cardDescriptionColor }} className="gs-subheading">
              {descriptionText ||
                "Get started with Quest and explore how Quest can take your customer engagement to the next level"}
            </div>
          </div>
        </div>
      )}
      {(autoHide === true ? !!offlineData.length && !allCriteriaCompleted : true) &&
        showProgressBar && (
          <div className="q_gt_progress">
            <div className="q_progress_percentage">
              {Math.floor(completedPercentage) || 0}% Completed
            </div>
            <div className="q_gt_progress_bar">
              <div
                className="q_progress_bar_completed"
                style={{ width: `${completedPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
      <div className="gs-cards-container" style={{ padding: showProgressBar ? '0px 20px 20px 20px' : '20px', gap: template == 2 ? '0px' : '16px' }}>
        {(autoHide === true ? !allCriteriaCompleted : true) &&
          offlineData.map((e, i) =>
            template == 2 ? (
              <div
                key={i}
                style={{
                  background: cardBackground,
                  borderBottom: `1px solid ${cardBorderColor}`,
                }}
                onClick={() =>
                  setDropdown((prev) =>
                    prev.map((e, index) => (i === index ? !e : e))
                  )
                }
                className="gs-single-card-dropDown"
              >
                <div
                  className="gs_card_body_dropDown"
                >
                  <div className="gs_card_body_image">
                    <img
                      className="gs-card-icon"
                      src={e.imageUrl || iconUrls[i] || questLogo}
                      alt=""
                    />
                  </div>
                  <div className="gs-card-text">
                    <div
                      style={{ color: cardHeadingColor }}
                      className="gs-card-head"
                    >
                      {e.title}
                    </div>
                    <div
                      style={{ color: cardDescriptionColor }}
                      className="gs-card-desc"
                    >
                      {e.description}
                    </div>
                  </div>
                  <div>
                    {
                      <div className="q_gt_dropdown">
                        {e.completed ? (
                          <img src={greenCheck} alt="" className="q_gt_arrow-completed" />
                        ) : (
                          <img
                            src={
                              dropdowns[i]
                                ? upArrow(arrowColor)
                                : e.completed
                                  ? gsTick
                                  : downArroIcon(arrowColor)
                            }
                            alt=""
                            className="q_gt_arrow"
                          />
                        )}
                      </div>
                    }
                  </div>
                </div>
                {dropdowns[i] && (
                  <div className="gs_card_dropdown">
                    <div className="gs_drop_desc">{e.longDescription}</div>
                    <div className="gs_drop_btns">
                      <div
                        className="gs_start_btn"
                        style={{ background: buttonBackground }}
                        onClick={() =>
                          !(!allowMultiClick && e.completed) &&
                          handleCriteriaClick(e.criteriaId, e.url)
                        }
                      >
                        {e.btn2 || "Start Now"}
                      </div>
                      <div
                        className="gs_visit_btn"
                        onClick={() => window.open(e.url)}
                      >
                        {e.btn1 || "Visit WebSite"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                key={i}
                className="gs-single-card"
                onClick={() =>{
                  !(!allowMultiClick && e.completed) &&
                  handleCriteriaClick(e.criteriaId, e.url)
                  console.log(e.completed,allowMultiClick)
                  }
                }
              >
                <div
                  className="gs_card_body"
                  style={{ background: cardBackground }}
                >
                  <div className="gs_card_body_image">
                    <img
                      className="gs-card-icon"
                      width="24px"
                      src={iconUrls[i] || questLogo}
                      alt=""
                    />
                  </div>
                  <div className="gs-card-text">
                    <div
                      style={{ color: cardHeadingColor }}
                      className="gs-card-head"
                    >
                      {e.title}
                    </div>
                    <div
                      style={{ color: cardDescriptionColor }}
                      className="gs-card-desc"
                    >
                      {e.description}
                    </div>
                  </div>
                  <div className="gs-card-btn-container">
                    <div
                      className="gs-card-img-button"
                    >
                      {e.completed ? (
                        <img src={greenCheck} className="q_gt_arrow-completed" alt="" />
                      ) : (
                        <img
                          className="q_gt_arrow"
                          src={arrowRight(arrowColor)}
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
      {(showFooter && (autoHide === true
        ? !!offlineData.length && !allCriteriaCompleted
        : true)) &&
        <div>
          <QuestLabs backgroundColor={footerBackgroundColor} color={questIconColor} />
        </div>
      }
    </div>
  );
}

export default OfflineGetStarted;
