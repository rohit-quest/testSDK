import React, { useState, useEffect, JSX, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import streak from "../../assets/images/streak.png";
import xButton from "../../assets/images/xButton.png";
import './toastService.css'
import { alertLogo, errorCross, primaryAlert, primaryCross, questionLogo, successCross, toastTic, warnCross } from '../../assets/images';

interface ToastProps {
    message: ReactNode,
    duration?: number,
    remove: () => void
}

const ToastService: React.FC<ToastProps> = ({
    message = <></>,
    duration = 30000,
    remove
}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [duration]);

    const closeToast = () => {
        setIsVisible(false);
        remove()
    }

    const containerStyle = {
        transform: isVisible ? "translateX(0)" : "translateX(100%)"
    };
    const contentStyle = {
        transform: isVisible ? "translateX(0)" : "translateX(-100%)"
    }

    return (
        <div className={'q-toast'} onClick={closeToast}>
            <div className="q-toast-msg" style={containerStyle}>
                {message || (
                    <div className="q-toast-msg-div" style={contentStyle}>
                        You maintained a streak for 25 days
                        <img src={streak} className="q-toast-img" alt="" />

                    </div>
                )}
                <img
                    src={xButton}
                    className="q-toast-x"
                    alt=""
                    onClick={(e) => {
                        e.stopPropagation()
                        closeToast()
                    }}
                />
            </div>
        </div>
    );
};


let toastCounter = 0;
const toastRoot = document.getElementById('root');

export const showToast = (message: ReactNode, duration?: number): void => {
    const toastElement = document.createElement('div');
    toastElement.className = 'q-toast';
    toastRoot?.appendChild(toastElement);
    const root = createRoot(toastElement);
    const remove = () => {
        toastRoot?.removeChild(toastElement);
        toastCounter--;
    };

    toastCounter++;
    const topPosition = `${toastCounter * (43 + 10)}px`;
    toastElement.style.top = topPosition;

    root.render(<ToastService remove={remove} message={message} duration={duration} />);

    if (duration !== undefined) {
        setTimeout(() => {
            remove();
        }, duration);
    }
};


export const General = (message: ReactNode, duration = 2000, className: "q_toast_success" | "q_toast_error" | "q_toast_warn" | "q_toast_primary"): HTMLDivElement => {
    const toastElement = document.createElement('div');
    toastElement.className = 'q-toast ' + className;
    toastRoot?.appendChild(toastElement);
    const root = createRoot(toastElement);

    const remove = () => {
        toastRoot?.removeChild(toastElement);
        toastCounter--;
    };

    toastCounter++;
    const topPosition = `${toastCounter * (83)}px`;
    toastElement.style.top = topPosition;

    root.render(message);

    if (duration !== undefined) {
        setTimeout(() => {
            remove();
        }, duration);
    }

    return toastElement;
}

const remove = (div: HTMLDivElement) => {
    toastRoot?.removeChild(div);
    toastCounter--;
}

showToast.success = ({ text = 'This is an success message', duration = 2000 }) => {

    const div = General(
        <>
            <img src={toastTic} alt='' />
            <div>{text}</div>
            <img src={successCross} alt='' onClick={() => { remove(div) }} />
        </>
        , duration, "q_toast_success"
    )
}

showToast.warn = ({ text = 'This is an warning message', duration = 2000 }) => {

    const div = General(
        <>
            <img src={questionLogo} alt='' />
            <div>{text}</div>
            <img src={warnCross} alt='' onClick={() => { remove(div) }} />
        </>
        , duration, "q_toast_warn"
    )
}

showToast.primary = ({ text = 'This is an primary message', duration = 2000 }) => {

    const div = General(
        <>
            <img src={primaryAlert} alt='' />
            <div>{text}</div>
            <img src={primaryCross} alt='' onClick={() => { remove(div) }} />
        </>
        , duration, "q_toast_primary"
    )
}

showToast.error = ({ text = 'This is an error message', duration = 2000 }) => {

    const div = General(
        <>
            <img src={alertLogo } alt='' />
            <div>{text}</div>
            <img src={errorCross} alt='' onClick={() => { remove(div) }} />
        </>
        , duration, "q_toast_error"
    )
}

export default showToast