import React, {useState, useEffect, JSX} from 'react';
import {createRoot} from 'react-dom/client';
import streak from "../../assets/images/streak.png";
import xButton from "../../assets/images/xButton.png";
import './toastService.css'

interface ToastProps {
    message: string,
    duration?: number,
    remove: () => void
}

const ToastService: React.FC<ToastProps> = ({
                                                message = "",
                                                duration = 3000,
                                                remove
                                            }: { message: JSX, duration: number,remove: ()=>{} }) => {
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
    const contentStyle ={
        transform: isVisible ? "translateX(0)" : "translateX(-100%)"
    }

    return (
        <div className={'q-toast'} onClick={closeToast}>
            <div className="q-toast-msg" style={containerStyle}>
                {message || (
                    <div className="q-toast-msg-div" style={contentStyle}>
                        You maintained a streak for 25 days
                        <img src={streak} className="q-toast-img" alt=""/>

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


export const showToast = (message: JSX, duration?: number): void => {
    const toastRoot = document.getElementById('root');
    const toastElement = document.createElement('div');
    toastRoot?.appendChild(toastElement);

    const root = createRoot(toastElement);

    const remove=()=> {
        toastRoot?.removeChild(toastElement);
    }

    root.render(<ToastService remove={remove} message={message} duration={duration}/>);

    setTimeout(() => {
        remove()
    }, duration);
};

export default showToast