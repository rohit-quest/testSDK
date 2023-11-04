import React, { FC } from "react";
import ReactDOM from "react-dom";
import cross from "../../assets/images/cross.png";
import "./creditCheck.css";
import { creditCheck } from "../../assets/images";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    headingText: React.ReactNode;
    descText: React.ReactNode;
    isCloseble: boolean;
    continueButton: boolean;
    buttonText: string;
    buttonFunction: () => void;
    color: string;
    backgroundColor: string
}

const CreditsPopupCheck: FC<PopupProps> = ({
    isOpen,
    onClose,
    headingText,
    descText,
    isCloseble,
    continueButton,
    buttonText,
    buttonFunction,
    color = 'black',
    backgroundColor = 'white'
}) => {

    const style = { backgroundColor, color }

    if (!isOpen) return (<></>);
    return ReactDOM.createPortal(
        <div className="q-credit-home" style={style}>
            <div className="popup-overlay" style={style}>
                <div className="q-creditp-main">
                    <div className="q-creditp-child" style={{ boxShadow: "rgba(0, 0, 0, 0.50) 0px 0px 6px 0px", ...style }}>
                        <img src={creditCheck} className="q-creditp-banner" />
                        {!!isCloseble && (
                            <img
                                src={cross}
                                alt=""
                                onClick={() => onClose()}
                                className="q-creditp-img"
                            />
                        )}
                        <p className="q-creditp-p1" style={style}>{headingText}</p>
                        <p className="q-creditp-p2" style={style}>{descText}</p>
                        {!!continueButton && (
                            <button
                                className="q-creditp-btn"
                                onClick={() => buttonFunction()}
                                style={style}
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

export default CreditsPopupCheck;