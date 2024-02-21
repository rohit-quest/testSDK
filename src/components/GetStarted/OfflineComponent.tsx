import React, { CSSProperties, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import './GetStarted.css';
// import config from '../../config';
import QuestContext from '../QuestWrapper';
import Loader from '../Login/Loader';
import { greenCheck, gsTick, helpCenter1, questLogo } from '../../assets/images';
import { arrowRight, downArroIcon, upArrow } from './Svgs';
import QuestLabs from '../QuestLabs';
import { SecondaryButton } from '../Modules/SecondaryButton';
import { PrimaryButton } from '../Modules/PrimaryButton';


interface offlineData {
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
  onCompleteAllStatus?: () => void;
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
  arrowColor?: string;
  showLoadingIndicator?: boolean;
  allowMultiClick?: boolean;
  footerBackgroundColor?: string;
  questIconColor?: string;
  showFooter?: boolean;
  onLinkTrigger?: (url: string, index: number) => void;
  template?: 1 | 2;
  styleConfig?: {
    Heading?: CSSProperties,
    Description?: CSSProperties,
    PrimaryButton?: CSSProperties,
    SecondaryButton?: CSSProperties,
    Form?:CSSProperties
  } ;
  offlineData:offlineData[]
};



function OfflineGetStarted({
  cardBackground = 'white',
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
  footerBackgroundColor = '#FBFBFB',
  questIconColor = '#939393',
  showFooter = true,
  styleConfig,
  offlineData, 
  onLinkTrigger = (url:string,index:number)=>{window.location.href=url}
}: offlineGetStartedProps) {

  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [allCriteriaCompleted, setAllCriteriaCompleted] = useState<boolean>(false);
  // const [criteriaSubmit, setCriteriaSubmit] = useState<string[]>([])
  const { themeConfig } = useContext(
    QuestContext.Context
  );
  const [dropdowns, setDropdown] = useState<Array<boolean>>([]);
  const [data ,setData] =useState(offlineData)

  const completedPercentage = (data.reduce((a, b) => a + (b.completed ? 1 : 0), 0)) * 100 / data.length;


  const handleCriteriaClick = (criteriaId: string | undefined, url: string) => {
    const update = data.map((item,index)=>{
      if(item?.criteriaId == criteriaId){
        item.completed = true
        onLinkTrigger(url,index)
      }
      return item
    })
    setData(update)
  };



  return (
    <div
      style={{
        background: styleConfig?.Form?.backgroundColor || themeConfig?.backgroundColor, height: styleConfig?.Form?.height || "auto", fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif" , ...styleConfig?.Form
      }}
      className="get_started_box"
    >
      {showLoadingIndicator && showLoader && <Loader />}
      {(autoHide === true
        ? !!data.length && !allCriteriaCompleted
        : true) && (
        <div className="gs-heading-div">
          <div>
            <div style={{  color: styleConfig?.Heading?.color || themeConfig?.primaryColor, ...styleConfig?.Heading }} className="gs-heading">
              {headingText || "Quickstart Guide"}
            </div>
            <div style={{ color: styleConfig?.Description?.color || themeConfig?.secondaryColor, ...styleConfig?.Description }} className="gs-subheading">
              {descriptionText ||
                "Get started with Quest and explore how Quest can take your customer engagement to the next level"}
            </div>
          </div>
        </div>
      )}
      {(autoHide === true ? !!data.length && !allCriteriaCompleted : true) &&
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
          data.map((e, i) =>
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
                      style={{ color: styleConfig?.Heading?.color || themeConfig?.primaryColor }}
                      className="gs-card-head"
                    >
                      {e.title}
                    </div>
                    <div
                       style={{ color: styleConfig?.Description?.color || themeConfig?.secondaryColor }}
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
                    <div className="gs_drop_desc"  style={{ color: styleConfig?.Description?.color || themeConfig?.secondaryColor }}>{e.longDescription}</div>
                    <div className="gs_drop_btns">
                      <PrimaryButton className={'gs_start_btn'} children={"Start Now"} onClick={(event) =>{
                          event.stopPropagation()
                          !(!allowMultiClick && e.completed) &&
                          handleCriteriaClick(e.criteriaId, e.url)
                         }
                        }
                        disabled={(!allowMultiClick && e.completed)}
                        style={{
                          background: styleConfig?.PrimaryButton?.background || themeConfig?.buttonColor,
                          ...styleConfig?.PrimaryButton
                         }}
                        />
                      <SecondaryButton
                       style={{...styleConfig?.SecondaryButton}}
                       onClick={() => window.open(e.url)} 
                      className="gs_visit_btn" 
                      children={ e.btn1 || "Visit Website"} />
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
                      style={{ color: styleConfig?.Heading?.color || themeConfig?.primaryColor }}
                      className="gs-card-head"
                    >
                      {e.title}
                    </div>
                    <div
                      style={{ color: styleConfig?.Description?.color || themeConfig?.secondaryColor }}
                      className="gs-card-desc"
                    >
                      {e.description}
                    </div>
                  </div>
                  {/* <div className="gs-card-btn-container"> */}
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
              // </div>
            )
          )}
      </div>
      {(showFooter && (autoHide === true
        ? !!data.length && !allCriteriaCompleted
        : true)) &&
        <div>
          <QuestLabs backgroundColor={footerBackgroundColor} color={questIconColor} />
        </div>
      }
    </div>
  );
  
}

export default OfflineGetStarted;
