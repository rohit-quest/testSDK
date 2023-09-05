import React, {useState, useEffect, JSX} from 'react';
import {createRoot} from 'react-dom/client';
import streak from "./assets/images/streak.png";
import xButton from "./assets/images/xButton.png";

interface ToastProps {
    message: string;
    duration?: number;
}

const ToastService: React.FC<ToastProps> = ({message="", duration = 3000}: { message: JSX, duration: number }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [duration]);

    const closeToast = () => setIsVisible(false);


    const toastClassNames = [
        'fixed',
        'top-4',
        'right-[4%]',
        'transition-transform',
        'duration-500',
        'ease-in-out',
        'hover:translate-x-0',
        'cursor-pointer',
    ];

    if (!isVisible) {
        toastClassNames.push('transform', 'translate-x-[100%]');
    } else {
        toastClassNames.push('transform', 'translate-x-0');
    }

    return (
        <div className={toastClassNames.join(' ')} onClick={closeToast}>
            {message || (<div
                className="w-[270px] flex gap-2 items-center justify-center h-[43px] bg-white rounded-[10px] shadow-[0px_0px_7px_#00000059]">
                <div className="text-black text-xs font-medium leading-[18px]">
                    You maintained a streak for 25 days
                </div>
                <img src={streak} className="w-[15px] h-[15px]" alt=""/>
                <img
                    src={xButton}
                    className="w-[20px] h-[20px] cursor-pointer"
                    alt=""
                    onClick={(e) => e.stopPropagation()}
                />
            </div>)}
        </div>
    );
};

export const showToast = (message: JSX, duration?: number): void => {
    const toastRoot = document.getElementById('root');
    const toastElement = document.createElement('div');
    toastRoot?.appendChild(toastElement);

    const root = createRoot(toastElement);

    root.render(<ToastService message={message} duration={duration}/>);

    setTimeout(() => {
        toastRoot?.removeChild(toastElement);
    }, duration);
};
