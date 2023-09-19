import React, { FC } from "react";
import ReactDOM from "react-dom";
import cross from "../../assets/images/cross.png";
import "./creditCheck.css";
import {creditCHeck} from "../../assets/images";

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
    color ='black',
    backgroundColor='white'
}) => {

    const style = {backgroundColor,color}

    if (!isOpen) return (<></>);
    return ReactDOM.createPortal(
        <div className="q-credit-home" >
            <div className="popup-overlay">
                <div className="q-creditp-main">
                    <div className="q-creditp-child" style={{boxShadow: "rgba(0, 0, 0, 0.50) 0px 0px 6px 0px"}}>
                        <img src={creditCHeck} className="q-creditp-banner" />
                        {!!isCloseble && (
                            <img
                                src={cross}
                                alt=""
                                onClick={() => onClose()}
                                className="q-creditp-img"
                            />
                        )}
                        <p className="q-creditp-p1">{headingText}</p>
                        <p className="q-creditp-p2">{descText}</p>
                        {!!continueButton && (
                            <button
                                style={style}
                                className="q-creditp-btn"
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

export default CreditsPopupCheck;