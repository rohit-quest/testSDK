import { useState, useEffect, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
// import QuestContext from "../QuestWrapper.tsx";
import { getResponse, walkResponeType } from './response';
import { closeRounded, helpCenter1 } from '../../assets/images/index.ts';
import "./walkThrough.css";
import QuestLabs from '../QuestLabs.tsx';
import config from '../../config.ts';

const createUrl = (string="") => `data:image/svg+xml,${encodeURIComponent(string)}`
const crossIcon = (color: string="#0065FF") => createUrl(`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.50537 11.4955L8.0007 8.00022L11.496 11.4955M11.496 4.50488L8.00004 8.00022L4.50537 4.50488" stroke="#939393" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`)
interface propType {
    onFinish?: Function,
    isOpen?: boolean
    onClose?: Function;
    color?: string;
    backgroundColor?: string;
    btnColor?: string;
    btnBackGroundColor?: string;
    actions?: Record<number, Function>;
    autoScroll?: boolean;
    image?: boolean;
    disableScrollSelector?: string;
    animation?: boolean;
    tooltip?: boolean;
    iconColor?: string;
    offlineFormData: walkResponeType;
}

type positionType = "left" | "top" | "right" | "bottom" | "right-top" | "right-bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

const TourOfflineComponent = ({
    onFinish,
    isOpen = true,
    onClose, backgroundColor, btnBackGroundColor, btnColor, color, actions,
    offlineFormData,
    autoScroll = false,
    image = false,
    disableScrollSelector,
    animation,
    tooltip,
    iconColor="#939393"
}: propType) => {
    const [currentStep, setCurrentStep] = useState(0);
    // const { apiKey, entityId ,apiType} = useContext(QuestContext.Context);
    const [position, setPosition] = useState({ top: 350, left: 376 });
    const componentRef = useRef<HTMLDivElement>(null);
    // const [data, setData] = useState<walkResponeType>([]);
    const [isClose, setClose] = useState(false);
    // let BACKEND_URL = apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL

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
                    left = targetRect.left + window.scrollX + (targetRect.width / 2) - (currentElement.width / 2);
                    break;
                case 'bottom':
                    top = targetRect.bottom + window.scrollY + 20;
                    left = targetRect.left + window.scrollX + (targetRect.width / 2) - (currentElement.width / 2);
                    break;
                case 'left':
                    top = targetRect.top + window.scrollY + (targetRect.height / 2) - (currentElement.height / 2);
                    left = targetRect.left + window.scrollX + targetRect.width + 20;
                    break;
                case 'right':
                    top = targetRect.top + window.scrollY + (targetRect.height / 2) - currentElement.height / 2;
                    left = targetRect.right + window.scrollX - (currentElement?.width) - (targetRect.width) - 20;
                    break;
                case "right-top":
                    top = targetRect.top + window.scrollY + (targetRect.height / 2) - currentElement.height / 2 - 50;
                    left = targetRect.right + window.scrollX - (currentElement?.width) - (targetRect.width) - 20;
                    break;
                case 'right-bottom':
                    top = targetRect.bottom + window.scrollY - (currentElement?.height) + 50;
                    left = targetRect.right + window.scrollX - (currentElement?.width) - (targetRect.width) - 20;
                    break;
                case 'top-left':
                    top = targetRect.top + window.scrollY - (currentElement?.height) - 20;
                    left = targetRect.right + window.scrollX - (targetRect.width / 2) - currentElement.width;
                    break;
                case 'top-right':
                    top = targetRect.top + window.scrollY - (currentElement?.height) - 20;
                    left = targetRect.right + window.scrollX - (targetRect.width / 2.5) - 20;
                    break;
                case 'bottom-left':
                    top = targetRect.bottom + window.scrollY + 20;
                    left = targetRect.right + window.scrollX - (targetRect.width / 2.5) - 20;
                    break;
                case 'bottom-right':
                    top = targetRect.bottom + window.scrollY + 20;
                    left = targetRect.left + window.scrollX - (targetRect.width / 2) + (currentElement.width / 2);
                    break;
                default:
                    break;
            }

            setPosition({ top, left });
        }
    };

    useEffect(() => {
        if (actions && actions[0]) actions[0]();
        // setData(offlineFormData)
    }, [])

    useEffect(() => {
        if (!offlineFormData.length) return;
        if (!!actions && !!actions[currentStep]) {
            let action = actions[currentStep + 1]
            if (typeof action == "function")
                action();
        }
        try {
            const targetElement = document.querySelector(offlineFormData[currentStep].selector || "");
            if (targetElement) {
                setStepPosition(targetElement || "", offlineFormData[currentStep].position);
                const targetRect = targetElement.getBoundingClientRect();
                animation && targetElement.classList.add("q_walk_highlighted")
                if (autoScroll) {
                    const top = offlineFormData[currentStep].position == "top"?300:100;
                    window.scrollTo({
                        top: window.scrollY + targetRect.top - top,
                        behavior: 'smooth',
                      });
                    const overflowElement = document.querySelector(disableScrollSelector || "") as HTMLElement;
                    if (overflowElement) {
                        overflowElement.style.overflowY = 'hidden'
                    } else
                        document.body.style.overflowY = 'hidden';
                }
            }
        } catch (error) {
            console.log(error)
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [currentStep, offlineFormData])

    const tooltipPosition = (position: positionType) => {
        if (!position) return {};

        const currentElement = componentRef.current?.getBoundingClientRect();
        if (!currentElement) return;
        let styles = {};

        switch (position) {
            case 'top':
                styles = {
                    bottom: '-12px',
                    left: currentElement?.width / 2,
                    clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
                };
                break;
            case 'bottom':
                styles = {
                    top: '-12px',
                    left: currentElement?.width / 2,
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                };

                break;
            case 'left':
                styles = {
                    top: currentElement?.height / 2 - 5,
                    left: '-12px',
                    clipPath: 'polygon(52% 46%, 100% 0, 100% 100%)',
                };
                break;
            case 'right':
                styles = {
                    top: (currentElement?.height / 2) -5,
                    right: '-36px',
                    clipPath: 'polygon(66% 48%, 0 0, 0 100%)',
                };
                break;
            case 'right-top':
                styles = {
                    top: '50px',
                    right: '-36px',
                    clipPath: 'polygon(66% 48%, 0 0, 0 100%)',
                };
                break;
            case 'right-bottom':
                styles = {
                    top: '50px',
                    right: '-36px',
                    clipPath: 'polygon(66% 48%, 0 0, 0 100%)',
                };
                break;
            case 'bottom-left':
                styles = {
                    top: '-12px',
                    left: currentElement?.width / 6,
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                };
                break;
            case 'bottom-right':
                styles = {
                    top: '-12px',
                    left: currentElement?.width / 6,
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                };
                break;
            case 'top-right':
                styles = {
                    bottom: '-12px',
                    left: currentElement?.width / 6,
                    clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
                };
                break;
            case 'top-left':
                styles = {
                    bottom: '-12px',
                    left: currentElement?.width / 1.15,
                    clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
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

    if (isClose || !offlineFormData.length) return <></>
    return ReactDOM.createPortal(<div>
        {<div className="q_walk_trhough" ref={componentRef} style={{
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
            backgroundColor, color
        }}>
            <div className='q_walk_tooltip' style={tooltipPosition(offlineFormData[currentStep]?.position)}></div>
            {image && offlineFormData[currentStep]?.icon && <img src={offlineFormData[currentStep]?.icon} alt="" />}
            <div className='q_walk_top'>
                <div className="q_walk_count">{currentStep + 1}/{offlineFormData?.length}</div>
                <div className='q_walk_close'>
                </div>
                <img src={crossIcon(iconColor)} alt="" className="q_walk_close_img"
                    onClick={() => {
                        document.body.style.overflow = '';
                        onClose ? onClose() : setClose(true)
                    }} />
            </div>
            <div className="q_walk_head" style={{color}}>{offlineFormData[currentStep]?.text}</div>
            {/* <img src={helpCenter1} className='q_walk_img' alt="" /> */}
            <div className="q_walk_desc" style={{color}}>{offlineFormData[currentStep]?.description}</div>
            <div className="q_walk_foot">
                <div className="q_walk_btns">
                    {currentStep > 0 && (<div className="q_walk_back" onClick={() => {
                        if (0 < currentStep) setCurrentStep(c => c - 1)
                    }}>Back</div>)}
                    <div className="q_walk_next"
                        style={{ color: btnColor, background: btnBackGroundColor }}
                        onClick={() => {
                            if ((offlineFormData.length - 1) > currentStep) setCurrentStep(c => c + 1)
                            else {
                                document.body.style.overflow = '';
                                onFinish ? onFinish() : setClose(true)
                            }
                        }}>{(offlineFormData.length - 1) > currentStep ? "Continue" : "Finish"}</div>
                </div>
            </div>
            <QuestLabs color={iconColor} />
        </div>
        }
    </div>, document.body);
};

export default TourOfflineComponent;
