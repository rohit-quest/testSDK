import CancelButton from "../../assets/images/CancelButton.svg";
import SearchIcons from "../../assets/images/SearchIcons.svg";
import TaskStatusDone from "../../assets/images/TaskStatusDone.svg";
import TaskStatusPending from "../../assets/images/TaskStatusPending.svg";
import { HelpHubTasksTypes, QuestCriteriaWithStatusType } from "./HelpHub.type";
import QuestContext from '../QuestWrapper';
import { useContext, useEffect, useState } from "react";
import config from "../../config";
import { claimQuest } from "./Helphub.service";



const HelpHubTasks = (props: HelpHubTasksTypes) => {
    const {
        tasksData,
        questId,
        userId,
        token,
        contentConfig,
        styleConfig
    } = props

    const [filterData, setFilterData] = useState<QuestCriteriaWithStatusType[]>([]);
    const [claimStatus, setClaimStatus] = useState<string[]>([]);
    const [searchData, setSearchData] = useState<string | number>("");
    const { apiKey, entityId, apiType, themeConfig } = useContext(QuestContext.Context);
    let BACKEND_URL = apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL

    useEffect(() => {
        let data = tasksData.filter((value: QuestCriteriaWithStatusType) => {
            return value?.data?.metadata?.linkActionName?.toLowerCase().includes(searchData?.toString().toLowerCase())
        })
        setFilterData(data);
    }, [tasksData, searchData])

    useEffect(() => {
        let arr = tasksData.filter((ele: QuestCriteriaWithStatusType) => ele.completed === true).map((ele: QuestCriteriaWithStatusType) => ele.data.criteriaId)
        setClaimStatus(arr)
    }, [tasksData])


    const readUpdate = async(criteriaId: string, links?: string) => {
        window.open(links, '_blank');
        let claimResponse = await claimQuest(BACKEND_URL, entityId, questId, userId, token, apiKey, criteriaId)
        if (claimResponse.success) {
            setClaimStatus([...claimStatus, criteriaId]);
        }
    }


    return (
        <div className={"helpHubTaskCont"} style={{background: themeConfig?.backgroundColor || "#fff", ...styleConfig?.Tasks?.Form}}>
            <div className='q-helphub-tasks-upper-cont '>
                <div className='q-helphub-tasks-upper-cont-text'>
                    <div>
                        <div className='q-helphub-tasks-upper-cont-text-head' style={{color: themeConfig?.primaryColor, ...styleConfig?.Tasks?.Topbar?.Heading}}>{contentConfig?.heading || "Tasks"}</div>
                        <div className='q-helphub-tasks-upper-cont-text-para' style={{color: themeConfig?.secondaryColor, ...styleConfig?.Tasks?.Topbar?.Heading}}>
                            {contentConfig?.subHeading || "Welcome back, Please talk to us to understand"}
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
                    <div className='q-helphub-tasks-search-cont' style={{...styleConfig?.Tasks?.Searchbox}}>
                        <input type="text" placeholder='Search for Tasks...' onChange={(e) => setSearchData(e.target.value)} />
                        <img src={SearchIcons} alt="" />
                    </div>

                    {/* progress bar  */}
                    <div className='q-helphub-tasks-progress-cont'>
                        <div className='q-helphub-tasks-progress-per'>{Math.ceil(100 * (claimStatus?.length / tasksData?.length)) || 0}%</div>
                        <div className='q-helphub-tasks-progress-bar'>
                            <div style={{ width: `${100 * (claimStatus?.length / tasksData?.length)}%` }}></div>
                        </div>
                    </div>

                    <div className='q-helphub-tasks-task-cont'>
                        {
                            filterData?.map((ele: QuestCriteriaWithStatusType, index: number) => (
                                <div className='q-helphub-tasks-single-task' onClick={() => readUpdate(ele?.data?.criteriaId, ele?.data?.metadata?.linkActionUrl)}>
                                    <div className='q-helphub-tasks-single-task-detail'>
                                        <div className='q-helphub-tasks-single-task-step' style={{color: themeConfig?.secondaryColor, ...styleConfig?.Tasks?.Card?.SubHeading}}>STEP {index + 1}</div>
                                        <div className='q-helphub-tasks-single-task-head' style={{color: themeConfig?.primaryColor, ...styleConfig?.Tasks?.Card?.Heading}}>{ele?.data?.metadata?.linkActionName}</div>
                                        <div className='q-helphub-tasks-single-task-para' style={{color: themeConfig?.secondaryColor, ...styleConfig?.Tasks?.Card?.SubHeading}}>{ele?.data?.metadata?.description}</div>
                                    </div>
                                    <div className='q-helphub-tasks-single-task-status'>
                                        <img style={{ padding: claimStatus?.includes(ele?.data?.criteriaId) ? "5px 4px" : "" }} src={claimStatus?.includes(ele?.data?.criteriaId) ? TaskStatusDone : TaskStatusPending} alt="" />
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

export default HelpHubTasks