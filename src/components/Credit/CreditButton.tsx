import React, { FC } from "react";
import "./credit.css";

interface CreditButtonProps {
    remainingCount: React.ReactNode;
    addButton: boolean;
    fontSize: string;
    buttonFunction: () => void;
    btnText: string;
}

const CreditButton: FC<CreditButtonProps> = ({
    remainingCount,
    fontSize,
    addButton,
    btnText,
    buttonFunction,
}) => {
    return (
        <div className="q-crd-home">
            <div className="q-crdb-div" style={{boxShadow: "rgba(0, 0, 0, 0.50) 0px 0px 6px 0px"}}>
                <div className="q-crdb-p" style={{ fontSize: `${fontSize}` }}>
                    Remaining credits :{" "}
                    <div style={{ color: "black", display: "inline" }}>{remainingCount}</div>
                </div>
                {!!addButton && (
                    <button
                        onClick={() => buttonFunction()}
                        className="q-crdb-btn"
                    >
                        {btnText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default CreditButton;
