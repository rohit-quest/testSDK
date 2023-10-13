import React, { ReactNode, useEffect, useRef } from 'react';
import './Popup.css';

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const PopupComponent: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
    const popupRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (isOpen && popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onClose]);

    return (
        <div className={`popup ${isOpen ? 'open' : ''}`}>
            <div className="popup-content" ref={popupRef}>
                <button className="close-button" onClick={onClose}>
                    X
                </button>
                {children}
            </div>
        </div>
    );
};

export default PopupComponent;
