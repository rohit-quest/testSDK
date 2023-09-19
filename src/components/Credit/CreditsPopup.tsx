import React, { FC } from "react";
import ReactDOM from "react-dom";
import creditBanner from "../../assets/images/creditBanner.png";
import cross from "../../assets/images/cross.png";
import "./credit.css";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    headingText: React.ReactNode;
    descText: React.ReactNode;
    isCloseble: boolean;
    continueButton: boolean;
    buttonText: string;
    buttonFunction: () => void;
}

const CreditsPopup: FC<PopupProps> = ({
    isOpen,
    onClose,
    headingText,
    descText,
    isCloseble,
    continueButton,
    buttonText,
    buttonFunction,
}) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="q-crd-home">
            <div className="popup-overlay">
                <div className="q-crdp-main">
                    <div className="q-crdp-child" style={{boxShadow: "rgba(0, 0, 0, 0.50) 0px 0px 6px 0px"}}>
                        <img src={creditBanner} className="q-crdp-banner" />
                        {!!isCloseble && (
                            <img
                                src={cross}
                                alt=""
                                onClick={() => onClose()}
                                className="q-crdp-img"
                            />
                        )}
                        <p className="q-crdp-p1">{headingText}</p>
                        <p className="q-crdp-p2">{descText}</p>
                        {!!continueButton && (
                            <button
                                className="q-crdp-btn"
                                onClick={() => buttonFunction()}
                            >
                                {buttonText}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("root")!
    );
};

export default CreditsPopup;
