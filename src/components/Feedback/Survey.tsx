import React, { useContext, useEffect, useState } from 'react'
import { crossIcon } from '../expansion/Svg';
import QuestContext from '../QuestWrapper';
import axios from 'axios';
import config from '../../config';
import { emailLogo } from "../../assets/assetsSVG"

import "./survey.css"
interface Props {
    heading?: string;
    subHeading?: string;
    userId?: string;
    token?: string;
    questId?: string;
    onSubmit?: () => void;
    oncancel?: Function;
    iconColor?: string;
    open?: boolean;
}



export default function Survey({
    heading = 'Submit Feedback',
    subHeading = 'Welcome back, Please complete your details',
    onSubmit = () => { },
    iconColor = '',
    open = true,
    questId,
    token,
    oncancel = () => { },
    userId = ''
}: Props) {

    const [isOpen, setOpen] = useState(true);
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [likePopup, setLikePopup] = useState<boolean>(false);
    const [thanksPopup, setThanksPopup] = useState<boolean>(false);
    const [formdata, setFormdata] = useState<FormDataItem[]>([]);
    const [gradient, setGradient] = useState<boolean>(false);
    const [answer, setAnswer] = useState<any>({});

    const { apiKey, apiSecret, entityId, apiType } = useContext(QuestContext.Context);
    let BACKEND_URL = apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL

    function isValidEmail(email: string) {
        if (!email) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(email);
    }
    const normalInput = (question: string, criteriaId: string, placeholder?: string) => {
        return (
            <div className="" key={criteriaId}>
                <label
                    className="q-fdov-levels"
                    htmlFor="normalInput"
                >
                    {question}
                </label>
                <div className="q-fdov-input">
                    {/* {userLogo()} */}
                    <input
                        className='q_sdk_input q_fw_input'
                        type="text"
                        id="normalInput"
                        name="normalInput"
                        onChange={(e) => handleUpdate(e, criteriaId, "")}
                        value={answer[criteriaId]}
                        placeholder={placeholder}
                    />
                </div>
            </div>
        );
    };
    const emailInput = (question: string, criteriaId: string, placeholder?: string) => {
        return (
            <div className="" key={criteriaId}>
                <label
                    className="q-fdov-levels"
                    htmlFor="normalInput"
                >
                    {question}
                </label>
                <div className="q-fdov-input">
                    <input
                        className='q_sdk_input q_fw_input'
                        type="email"
                        id="normalInput"
                        name="normalInput"
                        onChange={(e) => handleUpdate(e, criteriaId, "")}
                        value={answer[criteriaId]}
                        placeholder={placeholder}
                    />
                    emailLogo()
                </div>
                {
                    isValidEmail(answer[criteriaId]) &&
                    <div className='q-input-email-checks'>This is not a valid email</div>
                }
            </div>
        );
    };

    const normalInput2 = (question: string, criteriaId: string, placeholder?: string) => {
        return (
            <div className="" key={criteriaId}>
                <label
                    className="q-fdov-levels"
                >
                    {question}
                </label>
                <div className="q_feedback_input" style={{ alignItems: "flex-start" }}>
                    {/* {textAreaIcon()} */}
                    <textarea
                        className='q_fw_textarea'
                        id="normalInput2"
                        name="normalInput"
                        onChange={(e) => handleUpdate(e, criteriaId, "")}
                        value={answer[criteriaId]}
                        placeholder={placeholder}
                    />
                </div>
            </div>
        );
    };

    interface FormDataItem {
        type?: string;
        question?: string;
        options?: [string];
        criteriaId?: string;
        required?: boolean;
        placeholder?: string;
    }
    useEffect(() => { setOpen(open) }, [open])

    const handleUpdate = (e: any, id: string, j: string, k?: number) => {
        if (e.target.checked === true && j === 'check') {
            let ans = answer[id as unknown as number] || [];
            ans.push(e.target.value);
            setAnswer({
                ...answer,
                [id]: ans,
            });
        } else if (k) {
            setAnswer({
                ...answer,
                [id]: k,
            });
        } else if (
            e.target.checked === false &&
            typeof answer[id as unknown as number] === 'object' &&
            j === 'check'
        ) {
            let ans = answer[id as unknown as number];
            let mod_ans = ans.filter((an: string | number) => an !== e.target.value);
            setAnswer({
                ...answer,
                [id]: mod_ans,
            });
        } else {
            setAnswer({
                ...answer,
                [id]: e.target.value,
            });
        }
    };

    useEffect(() => {
        if (entityId) {
            const headers = {
                apiKey: apiKey,
                apisecret: apiSecret,
                userId: userId,
                token: token,
            };
            const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}?userId=${userId}`;

            axios.get(request, { headers: headers }).then((res) => {
                let response = res.data;
                let criterias = response?.eligibilityData?.map((criteria: any) => {
                    return {
                        type: criteria?.data?.criteriaType,
                        question: criteria?.data?.metadata?.title,
                        options: criteria?.data?.metadata?.options || [],
                        criteriaId: criteria?.data?.criteriaId,
                        required: !criteria?.data?.metadata?.isOptional,
                        placeholder: criteria?.data?.metadata?.placeholder,
                    };
                });
                criterias = Array.isArray(criterias) ? criterias : [];
                setFormdata([...criterias]);
            });
        }
    }, []);

    if (!isOpen) return <></>

    return (
        <div className='q_feedback_survey'>
            <div className="q_survey_heading" >
                <div className='q_survey_head'>
                    <div>
                        <div>{heading}</div>
                        <div className='q_feedback_desc'>{subHeading}</div>
                    </div>
                </div>
                <img src={crossIcon(iconColor)} onClick={() => setOpen(false)} className='q_survey_close_icon' alt="" />
            </div>

            <div className='q_survey_content'>
                {
                    
                }
            </div>

        </div>
    )
}
