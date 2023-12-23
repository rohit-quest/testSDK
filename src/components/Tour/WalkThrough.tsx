import { useState, useEffect, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import QuestContext from "../QuestWrapper.tsx";
import { getResponse, walkResponeType } from './response';
import { closeRounded, helpCenter1 } from '../../assets/images/index.ts';
import "./walkThrough.css";

interface propType {
    onFinish: Function,
    token: string;
    userId: string;
    questId: string;
    isOpen?: boolean
    onClose?: Function;
    color?: string;
    backgroundColor?: string;
    btnColor?: string;
    btnBackGroundColor?: string;
}

type positionType = "left" | "top" | "right" | "bottom";


const WalkThrough = ({
    onFinish,
    isOpen = true,
    questId = "", token = "", userId = "",
    onClose, backgroundColor, btnBackGroundColor, btnColor, color
}: propType) => {
    const [currentStep, setCurrentStep] = useState(0);
    const { apiKey, entityId } = useContext(QuestContext.Context);
    const [position, setPosition] = useState({ top: 350, left: 376 });
    const componentRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<walkResponeType>([]);
    const [isClose, setClose] = useState(false);
    const setStepPosition = (targetElement: Element, position: positionType) => {
        if (targetElement) {
            const targetRect = targetElement.getBoundingClientRect();
            const currentElement = componentRef.current?.getBoundingClientRect();
            if (!targetElement || !currentElement) return position;
            let top = 0;
            let left = 0;

            switch (position) {
                case 'top':
                    top = targetRect.top + window.scrollY - (currentElement?.height) - 20;
                    left = targetRect.left + window.scrollX - (targetRect.width / 2);
                    break;
                case 'bottom':
                    top = targetRect.bottom + window.scrollY + 20;
                    left = targetRect.left + window.scrollX - (targetRect.width / 2);
                    break;
                case 'left':
                    top = targetRect.top + window.scrollY + (targetRect.height / 2) - 50;
                    left = targetRect.left + window.scrollX + targetRect.width + 20;
                    break;
                case 'right':
                    top = targetRect.top + window.scrollY + (targetRect.height / 2) - 50;
                    left = targetRect.right + window.scrollX - (currentElement?.width) - (targetRect.width) - 20;
                    break;
                default:
                    break;
            }

            setPosition({ top, left });
        }
    };

    useEffect(() => {
        getResponse({ apiKey, token, userId }, entityId, questId)
            .then((response) => {
                if (response?.length) {
                    setData(() => response);
                }
            })
    }, [])

    useEffect(() => {
        if (!data.length) return;
        const targetElement = document.querySelector(data[currentStep].selector || "");
        if (targetElement)
            setStepPosition(targetElement || "", data[currentStep].position);
    }, [currentStep, data])

    const tooltipPosition = (position: positionType) => {
        if (!position) return {};

        let styles = {};

        switch (position) {
            case 'top':
                styles = {
                    bottom: '-12px',
                    left: '50px',
                    clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
                };
                break;
            case 'bottom':
                styles = {
                    top: '-12px',
                    left: '50px',
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                };

                break;
            case 'left':
                styles = {
                    top: '50px',
                    left: '-12px',
                    clipPath: 'polygon(52% 46%, 100% 0, 100% 100%)',
                };
                break;
            case 'right':
                styles = {
                    top: '50px',
                    right: '-36px',
                    clipPath: 'polygon(66% 48%, 0 0, 0 100%)',
                };
                break;
            default:
                styles = {
                    top: '-12px',
                    left: '50%',
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                };
                break;
        }

        return styles;

    };

    useEffect(() => {
        setClose(!isOpen)
    }, [isOpen])

    if (isClose || !data.length) return <></>
    return ReactDOM.createPortal(<div>
        {<div className="q_walk_trhough" ref={componentRef} style={{
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
            backgroundColor, color
        }}>
            <div className='q_walk_tooltip' style={tooltipPosition(data[currentStep]?.position)}></div>
            <div className='q_walk_close'>
                <img src={closeRounded} alt="" className="q_walk_close_img"
                    onClick={() => onClose ? onClose() : setClose(true)} />
            </div>
            <div className="q_walk_head">{data[currentStep]?.text}</div>
            {/* <img src={helpCenter1} className='q_walk_img' alt="" /> */}
            <div className="q_walk_desc">{data[currentStep]?.description}</div>
            <div className="q_walk_foot">
                <div className="q_walk_count">{currentStep + 1}/{data?.length}</div>
                <div className="q_walk_next"
                    style={{ color: btnColor, background: btnBackGroundColor }}
                    onClick={() => {
                        if ((data.length - 1) > currentStep) setCurrentStep(c => c + 1)
                        else onFinish ? onFinish() : setClose(true)
                    }}>{(data.length - 1) > currentStep ? "Next" : "Finish"}</div>
            </div>
        </div>
        }
    </div>, document.body);
};

export default WalkThrough;
