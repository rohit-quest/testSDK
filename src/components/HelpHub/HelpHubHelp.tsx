import { useContext, useEffect, useState } from "react";
import CancelButton from "../../assets/images/CancelButton.svg";
import SearchIcons from "../../assets/images/SearchIcons.svg";
import OpenSectionButton from "../../assets/images/OpenSectionButton.svg";
import { HelpHubFaqTypes, QuestCriteriaWithStatusType } from "./HelpHub.type";
import QuestContext from "../QuestWrapper";
import config from "../../config";

const HelpHubTasks = (props: HelpHubFaqTypes) => {
  const { faqData, contentConfig, styleConfig } = props;
  const [faqIndex, setFaqIndex] = useState<number | undefined>(undefined);
  const [filterData, setFilterData] = useState<QuestCriteriaWithStatusType[]>(
    []
  );
  const [searchData, setSearchData] = useState<string | number>("");
  const { themeConfig } = useContext(QuestContext.Context);

  useEffect(() => {
    let data = faqData.filter((value: QuestCriteriaWithStatusType) => {
      return value?.question
        ?.toLowerCase()
        .includes(searchData?.toString().toLowerCase());
    });
    setFilterData(data);
  }, [faqData, searchData]);

  return (
    <div
      className={"helpHubHelpCont animatedDissolve"}
      style={{
        background: themeConfig?.backgroundColor,
        ...styleConfig?.Help?.Form,
      }}
    >
      <div className="q-helphub-help-upper-cont ">
        <div className="q-helphub-help-upper-cont-text">
          <div>
            <div
              className="q-helphub-help-upper-cont-text-head"
              style={{
                color: themeConfig?.primaryColor,
                ...styleConfig?.Help?.Topbar?.Heading,
              }}
            >
              {contentConfig?.heading || "Help Center"}
            </div>
            <div
              className="q-helphub-help-upper-cont-text-para"
              style={{
                color: themeConfig?.secondaryColor,
                ...styleConfig?.Help?.Topbar?.SubHeading,
              }}
            >
              {contentConfig?.subHeading ||
                "Welcome back, Please talk to us to understand"}
            </div>
          </div>
          <div className="q-helphub-help-upper-cont-text-button">
            <img src={CancelButton} alt="" />
          </div>
        </div>
      </div>

      <div className="q-helphub-help-lower-cont">
        <div className="q-helphub-help-lower-cont-data">
          {/* search box  */}
          <div
            className="q-helphub-help-search-cont"
            style={{ ...styleConfig?.Help?.Searchbox }}
          >
            <input
              type="text"
              placeholder="Search for FAQs..."
              onChange={(e) => setSearchData(e.target.value)}
            />
            <img src={SearchIcons} alt="" />
          </div>

          {/* for faqs  */}
          <div className="q-helphub-help-faqs-cont">
            <div className="q-helphub-help-total-faqs">
              <div
                style={{
                  color: themeConfig?.primaryColor,
                  ...styleConfig?.Help?.Form,
                }}
              >
                {faqData?.length} Helps
              </div>
            </div>

            <div className="q-helphub-help-total-faqs-cont">
              {filterData?.map(
                (value: QuestCriteriaWithStatusType, index: number) => {                  
                  return (value.type==="VIEW_ONLY_TEXT" &&
                    <div
                      // className={`q-helphub-help-single-faq-${
                      //   faqIndex === index ? "open" : "close"
                      // }`}
                      className="q-helphub-help-single-faq"
                      key={index}
                      onClick={() => {
                        index === faqIndex
                          ? setFaqIndex(undefined)
                          : setFaqIndex(index);
                      }}
                    >
                      <div
                        className="text"
                        onClick={() => {
                          index === faqIndex
                            ? setFaqIndex(undefined)
                            : setFaqIndex(index);
                        }}
                      >
                        <div
                          className="head"
                          style={{
                            color: themeConfig?.primaryColor,
                            ...styleConfig?.Help?.Card?.Heading,
                          }}
                        >
                          {value?.question}
                        </div>
                        <div className="but">
                          <img src={OpenSectionButton} alt="" />
                        </div>
                      </div>

                      <div
                        className={`${
                          faqIndex === index ? "ansOpen" : "ansClose"
                        }`}
                        style={{
                          color: themeConfig?.secondaryColor,
                          ...styleConfig?.Help?.Card?.SubHeading,
                        }}
                      >
                        {value?.answer}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpHubTasks;
