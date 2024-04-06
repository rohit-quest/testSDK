import  { useContext, useEffect, useState } from 'react'
import CancelButton from "../../assets/images/CancelButton.svg";
import SearchIcons from "../../assets/images/SearchIcons.svg";
import OpenSectionButton from "../../assets/images/OpenSectionButton.svg";
import UnreadUpdateLogo from "../../assets/images/UnreadUpdateLogo.svg";
import ReadUpdateLogo from "../../assets/images/ReadUpdateLogo.svg";
import { HelpHubUpdatesTypes, QuestCriteriaWithStatusType } from './HelpHub.type';
import QuestContext from '../QuestWrapper';
import config from '../../config';
import { claimQuest } from './Helphub.service';

const HelpHubUpdates = (props: HelpHubUpdatesTypes) => {
    const {
        updateData,
        questId,
        userId,
        token,
        contentConfig,
        styleConfig,
        claimStatusUpdates=[],
        setClaimStatusUpdates,
        onlineComponent
    } = props
    const [filterData, setFilterData] = useState<QuestCriteriaWithStatusType[]>([]);
    // const [claimStatus, setClaimStatus] = useState<string[]>([]);
    const [searchData, setSearchData] = useState<string | number>("");
    const { apiKey, entityId, apiType, themeConfig } = useContext(QuestContext.Context);
    let BACKEND_URL = apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;

    useEffect(() => {
        let data = updateData.filter((value: QuestCriteriaWithStatusType) => {
            return value?.data?.metadata?.linkActionName?.toLowerCase().includes(searchData?.toString().toLowerCase())
        })
        setFilterData(data);
    }, [updateData, searchData])

    // useEffect(() => {
    //     // let arr = updateData.filter((ele: QuestCriteriaWithStatusType) => ele.completed === true).map((ele: QuestCriteriaWithStatusType) => ele.data.criteriaId)
    //     // if(onlineComponent){
    //     //     setClaimStatusUpdates(arr)
    //     // }
    // }, [updateData])

    const getTimeDifference = (date: string) => {
        let dateGap = (new Date().getTime() - new Date(date).getTime()) / 86400000
        return dateGap > 1 ? `${Math.floor(dateGap)} days ago` : "Yesterday"
    }

    const readUpdate = async(criteriaId: string, links?: string) => {
        window.open(links, '_blank');
        if(onlineComponent){
            let claimResponse = await claimQuest(BACKEND_URL, entityId, questId, userId, token, apiKey, criteriaId)
            if (claimResponse.success) {
                setClaimStatusUpdates([...claimStatusUpdates, criteriaId]);
            }
        }
        else{
            setClaimStatusUpdates([...claimStatusUpdates, criteriaId]);
        }
    }

    return (
        <div className={"helpHubUpdatesCont"} style={{background: themeConfig?.backgroundColor || "#fff", ...styleConfig?.Updates?.Form}}>
            <div className='q-helphub-updates-upper-cont '>
                <div className='q-helphub-updates-upper-cont-text'>
                    <div>
                        <div className='q-helphub-updates-upper-cont-text-head' style={{color: themeConfig?.primaryColor, ...styleConfig?.Updates?.Topbar?.Heading}}>{contentConfig?.heading || "Updates"}</div>
                        <div className='q-helphub-updates-upper-cont-text-para' style={{color: themeConfig?.secondaryColor, ...styleConfig?.Updates?.Topbar?.SubHeading}}>
                            {contentConfig?.subHeading || "Welcome back, Please talk to us to understand"}
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
                    <div className='q-helphub-updates-search-cont' style={{...styleConfig?.Updates?.Searchbox}}>
                        <input type="text" placeholder='Search for updates...' onChange={(e) => setSearchData(e.target.value)}/>
                        <img src={SearchIcons} alt="" />
                    </div>

                    <div className='q-helphub-updates-task-cont'>

                        {/* for one task */}
                        {/* unread update  */}
                        {
                            filterData.map((value: QuestCriteriaWithStatusType, index: number) => (
                                // claimStatus.includes(value?.data?.criteriaId) ?
                                claimStatusUpdates.includes(value?.data?.criteriaId) ?
                                <div
                                    className={`q-helphub-updates-single-update-read`}
                                    key={index}
                                    onClick={() => readUpdate(value?.data?.criteriaId, value?.data?.metadata?.linkActionUrl)}
                                >
                                    <div className='update-time'>
                                        <img src={ReadUpdateLogo} alt="" /> 
                                        <div style={{color: themeConfig?.secondaryColor, ...styleConfig?.Updates?.Card?.SubHeading}}>
                                            {
                                                getTimeDifference(value?.data?.createdAt)
                                            }
                                        </div>
                                    </div>

                                    <div className='update-question'>
                                        <div className='ques' style={{color: themeConfig?.primaryColor, ...styleConfig?.Updates?.Card?.Heading}}>
                                            {
                                                value?.data?.metadata?.linkActionName
                                            }
                                        </div>
                                        <div className='q-hh-btn'>
                                            <img src={OpenSectionButton} alt="" />
                                        </div>
                                    </div>

                                    <div className='update-message' style={{color: themeConfig?.secondaryColor, ...styleConfig?.Updates?.Card?.SubHeading}}>
                                        {
                                            value?.data?.metadata?.description
                                        }
                                    </div>
                                </div>
                                :
                                <div
                                    className={`q-helphub-updates-single-update-unread`}
                                    key={index}
                                    onClick={() => readUpdate(value?.data?.criteriaId, value?.data?.metadata?.linkActionUrl)}
                                >
                                    <div className='update-time'>
                                        <div className='q-helphub-updates-unread'>
                                            <span className='q-helphub-updates-unread-span1'></span>
                                            <span className='q-helphub-updates-unread-span2'></span>
                                        </div>
                                        <div style={{color: themeConfig?.secondaryColor, ...styleConfig?.Updates?.Card?.SubHeading}}>
                                            {
                                                getTimeDifference(value?.data?.createdAt)
                                            }
                                        </div>
                                    </div>

                                    <div className='update-question'>
                                        <div className='ques'>
                                            {
                                                value?.data?.metadata?.linkActionName
                                            }
                                        </div>
                                        <div className='q-hh-btn'>
                                            <img src={OpenSectionButton} alt="" />
                                        </div>
                                    </div>

                                    <div className='update-message' style={{color: themeConfig?.secondaryColor, ...styleConfig?.Updates?.Card?.SubHeading}}>
                                        {
                                            value?.data?.metadata?.description
                                        }
                                    </div>
                                </div>
                            ))
                        }

                    </div>

                </div>
            </div>

        </div>
    )
}

export default HelpHubUpdates