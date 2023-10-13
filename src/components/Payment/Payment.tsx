import axios from "axios";
import { FC, useEffect, useState, useContext } from "react";
import QuestContext from "../QuestWrapper";
import tick from "../../assets/images/tick.png";
import untick from "../../assets/images/untick.png";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import config from "../../config";
import PaymentGateway from "./PaymentGateway";
import "./payment.css"

interface CreditButtonProps {
    userId?: string;
    token?: string;
    stripePublishableKey?: string;
    description?: string[];
    paymentBanefits?: any;
    bgColor?: string;
    fontColor?: string;
    mainLayout?: number;
    pymentGatewayLayout?: number;
    buttonBgColor?: string;
    btnTextColor?: string;
    inputBgColor?: string;
    width?: string;
}

const Payment: FC<CreditButtonProps> = ({
    userId,
    token,
    stripePublishableKey,
    description,
    paymentBanefits,
    bgColor,
    fontColor,
    mainLayout,
    pymentGatewayLayout,
    buttonBgColor,
    btnTextColor,
    inputBgColor,
    width
}) => {
    const [tiers, setTears] = useState<any[]>([]);
    const [desc, setDesc] = useState<string[]>(description || []);
    const { apiKey, apiSecret, entityId, featureFlags } = useContext(QuestContext.Context);
    const stripeTestPromise = loadStripe(stripePublishableKey);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [openPaymentPopup, setOpenPaymentPopup] = useState(false);
    const [modifyDesigns, setModifyDesigns] = useState({
        bgColor: bgColor || "",
        fontColor: fontColor || "",
        mainLayout: mainLayout || "",
        buttonBgColor: buttonBgColor || "",
        btnTextColor: btnTextColor || "",
        inputBgColor: inputBgColor || "",
        width: width || "",
    });

    useEffect(() => {
        if (entityId) {
            const headers = {
                apiKey: apiKey,
                apisecret: apiSecret,
                userId: userId,
                token: token, // Replace with your actual token
            };
            const request = `${config.BACKEND_URL}api/entities/${entityId}/credits-tiers?userId=${userId}`;
            axios.get(request, { headers: headers }).then((res) => {
                let response = res.data;
                if (response.success) {
                    setTears([...response.data]);
                }
            });
        }
    }, []);

    const handleClick = (index: number) => {
        setSelectedIndex(index);
        setOpenPaymentPopup(true);
    };

    if (featureFlags[config.FLAG_CONSTRAINTS.PaymentFlag]?.isEnabled == false) {
        return (<div></div>)
    }

    return (
        <div
            className="q-pynt-home q-pynt-main"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", width: `${modifyDesigns.width}` }}
        >
            {openPaymentPopup == false && (
                <div
                    className="q-pynt-main-div"
                    style={{
                        gridTemplateColumns: `repeat(${modifyDesigns.mainLayout},1fr)`,
                    }}
                >
                    {tiers.map((tier, index) => (
                        <div
                            className="q-pynt-main-div-tier"
                            style={{
                                boxShadow:
                                    "rgba(0, 0, 0, 0.50) 0px 0px 6px 0px",
                                backgroundColor: `${modifyDesigns.bgColor}`,
                            }}
                            key={index}
                        >
                            <p
                                className="q-pynt-main-div-p"
                                style={{ color: `${modifyDesigns.fontColor}` }}
                            >
                                {tier.creditsTierName
                                    .toLowerCase()
                                    .includes(" plan")
                                    ? tier.creditsTierName
                                    : tier.creditsTierName + " Plan"}
                            </p>
                            <p
                                className="q-pynt-main-div-p2"
                                style={{ color: `${modifyDesigns.fontColor}` }}
                            >
                                {desc[index]}
                            </p>
                            <div
                                className="q-pynt-main-div-div"
                                style={{ color: `${modifyDesigns.fontColor}` }}
                            >
                                <p className="q-pynt-main-div-div-p">
                                    ${tier.creditsAmount}
                                </p>
                                <p className="q-pynt-main-div-div-p2">
                                    {tier.recurringTimePeriod == "ONETIME"
                                        ? "/one-time"
                                        : tier.recurringTimePeriod == "MONTHLY"
                                        ? "/months"
                                        : "/years"}
                                </p>
                            </div>
                            <button
                                className="q-pynt-main-div-div-btn"
                                onClick={() => handleClick(index)}
                                style={{
                                    backgroundColor: modifyDesigns.buttonBgColor ,
                                    color: `${modifyDesigns.btnTextColor}`,
                                }}
                            >
                                Continue
                            </button>
                            <div className="q-pynt-main-div-div-ch"></div>
                            <p className="q-pynt-main-div-div-p3">
                                FEATURES
                            </p>
                            <div className=" q-pynt-main-div-div-chDiv">
                                {!!paymentBanefits[index] &&
                                    !!paymentBanefits[index].included &&
                                    paymentBanefits[index].included.map(
                                        (banefits: string, i: number) => (
                                            <div
                                                className="q-pynt-main-div-div-chDiv-ben"
                                                key={i}
                                                style={{
                                                    color: `${modifyDesigns.fontColor}`,
                                                }}
                                            >
                                                <img
                                                    src={tick}
                                                    style={{width: "1.25rem", height: "1.25rem"}}
                                                />
                                                <p>{banefits}</p>
                                            </div>
                                        )
                                    )}
                                {!!paymentBanefits[index] &&
                                    !!paymentBanefits[index].notIncluded &&
                                    paymentBanefits[index].notIncluded.map(
                                        (banefits: string, i: number) => (
                                            <div
                                                className="q-pynt-main-div-div-chDiv-ben2"
                                                key={i}
                                            >
                                                <img
                                                    src={untick}
                                                    style={{width: "1.25rem", height: "1.25rem"}}
                                                />
                                                <p style={{color: "#9CA3AF"}}>
                                                    {banefits}
                                                </p>
                                            </div>
                                        )
                                    )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {openPaymentPopup == true && (
                <div>
                    <Elements stripe={stripeTestPromise}>
                        <PaymentGateway
                            tier={tiers[selectedIndex]}
                            desc={desc[selectedIndex]}
                            paymentBanefits={paymentBanefits[selectedIndex]}
                            bgColor={bgColor}
                            fontColor={fontColor}   
                            buttonBgColor={buttonBgColor}
                            btnTextColor={btnTextColor}
                            inputBgColor={inputBgColor}
                            pymentGatewayLayout={pymentGatewayLayout}
                        />
                    </Elements>
                </div>
            )}
        </div>
    );
};

export default Payment;
