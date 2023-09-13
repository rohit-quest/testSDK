import React, { FC, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import config from '../../config';
import QuestContext from '../QuestWrapper';



interface Table {
    userId?: string;
    token?: string;
    questId?: string;
    headingBgColor?: string;
    headingTextColor?: string;
    horizontalBorder?: boolean;
    bodyBgColor?: string;
    bodyTextColor?: string;
    headingTooltip?: boolean;
    bodyTooltip?: boolean;
}

type User = {
    avatar: string;
    userAnswers: Record<string, any>;
    userName: string;
};
  
type UsersDataArray = { [key: string]: User };



const Table: FC<Table> = ({ userId, token, questId, headingBgColor, headingTextColor, horizontalBorder, bodyBgColor, bodyTextColor, headingTooltip, bodyTooltip }) => {
    const [questionData, setQuestionData] = useState<string[]>([])
    const [answerData, setAnswerData] = useState<UsersDataArray | any>({})
    const { apiKey, apiSecret, entityId } = useContext(QuestContext.Context);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [hoveredQuestion, setHoveredQuestion] = useState("")



    useEffect(() => {
        const headers = {
            apiKey: apiKey,
            apisecret: apiSecret,
            userId: userId,
            token: token,
        };
        axios(`${config.BACKEND_URL}api/entities/${entityId}/quests/${questId}/summary?userId=${userId}`, {headers})
        .then((res: any) => {
            let userAnswers = res?.data?.summary?.answers;
            // console.log(userAnswers)
            let questions = [];
            let answers : UsersDataArray = {};
            for (let i = 0; i < userAnswers.length; i++) {
                questions.push(userAnswers[i].question);
                let ans = userAnswers[i]?.answers
                for (let j = 0; j < ans?.length; j++) {
                    if ( answers[ans[j].userId] ) {
                        let user = answers[ans[j].userId]
                        // console.log(user.userAnswers)
                        user.userAnswers[`q${i}`] = ans[j].userAnswer
                    } else {
                        answers[ans[j].userId] = {
                            userName : ans[j].name,
                            avatar : ans[j].imageUrl,
                            userAnswers : {
                                [`q${i}`] : ans[j].userAnswer
                            }
                        }
                    }
                }
            }
            console.log(answers)
            setQuestionData([...questions])
            setAnswerData({...answers})
        })
    }, [])


    const handleMouseEnter = useCallback(
        (e: any, question: string) => {
            setTooltipPosition({...tooltipPosition, x: e.clientX, y: e.clientY })
            setHoveredQuestion(question)
        },
        [tooltipPosition]
    );
    
    const handleMouseLeave = useCallback(
    (e) => {
        setTooltipPosition({...tooltipPosition, x: e.clientX, y: e.clientY })
        setHoveredQuestion("")
    },
    [tooltipPosition]
    );

    // console.log(tooltipPosition)

    return (
        <div className='questLabs p-5 overflow-x-auto w-screen pt-20'>
            <table className='w-full text-sm text-left text-gray-500 border-collapse'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-300' style={{backgroundColor: headingBgColor, color: headingTextColor}}>
                    <tr>
                        <th scope="col" className={`px-2 py-2 ${horizontalBorder && "border-x-2"}`} style={{borderColor: bodyBgColor ? bodyBgColor : "white"}}>
                            Users
                        </th>
                        {
                            questionData.map((question: string, i: number) => (
                                <th scope="col" className={`px-2 py-2 min-w-[100px] hover:bg-gray-400 transition-all duration-300  ${horizontalBorder && "border-r-2"}`}  style={{borderColor: bodyBgColor ? bodyBgColor : "white"}} key={i} onMouseEnter={(e) => (!!headingTooltip && handleMouseEnter(e, question))}  onMouseLeave={handleMouseLeave}>
                                    {/* {`q${i+1}`} */}
                                    {question}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(answerData).map((datas, i: number) => (
                            <tr className='border-b-2 border-gray-300' style={{borderColor: headingBgColor, backgroundColor: bodyBgColor}}>
                                <th scope="row" className={`px-2 py-2 font-medium text-gray-700 flex items-center gap-2 min-w-[150px] border-gray-300 ${horizontalBorder && "border-x-2"}`}  style={{borderColor: headingBgColor ? headingBgColor : ""}}  onMouseEnter={(e) => (!!bodyTooltip && handleMouseEnter(e, answerData[datas].userName))} onMouseLeave={handleMouseLeave}>
                                    <img src={"https://pin.questprotocol.xyz/ipfs/" + answerData[datas].avatar} className='w-10 rounded-full' alt="" />
                                    <p className=''>{answerData[datas].userName}</p>
                                </th>
                                {
                                    questionData.map((question: string, i: number) => (
                                        !!answerData[datas].userAnswers[`q${i}`] ?
                                        <th className={`x-2 py-2 font-normal text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis min-w-[100px] max-w-[150px] border-gray-300 ${horizontalBorder && "border-r-2"}`}  style={{borderColor: headingBgColor ? headingBgColor : "", color: bodyTextColor}}  onMouseEnter={(e) => (!!bodyTooltip && handleMouseEnter(e, answerData[datas].userAnswers[`q${i}`]))} onMouseLeave={handleMouseLeave}>
                                            {answerData[datas].userAnswers[`q${i}`]}
                                        </th>
                                        :
                                        <th className={`x-2 py-2 font-normal text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis min-w-[100px] max-w-[150px] border-gray-300 ${horizontalBorder && "border-r-2"}`}  style={{borderColor: headingBgColor ? headingBgColor : "", color: bodyTextColor}}>
                                            
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            { !!hoveredQuestion &&
                <div className="absolute inline-block px-2 py-2 text-[10px] font-extralight text-white transition-all max-w-[200px] duration-300 bg-gray-600 rounded-md shadow-sm tooltip min-w-[100px] text-center" style={{left: tooltipPosition.x, top: tooltipPosition.y,}}>
                    {hoveredQuestion}
                </div>
            }
        </div>
    )
}


export default Table;