import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { FC, useState } from "react";
import tick from "../../assets/images/tick.png";
import untick from "../../assets/images/untick.png";
import "./payment.css";

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "gray",
            fontWeight: 400,
            fontFamily: "Hanken Grotesk, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "black" },
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "gray",
        },
    },
};

interface PaymentGateway {
    tier?: {};
    desc?: string;
    paymentBanefits?: string;
    bgColor?: string;
    fontColor?: string;
    buttonBgColor?: string;
    btnTextColor?: string;
    inputBgColor?: string;
    pymentGatewayLayout?: number;
}

const PaymentGateway: FC<PaymentGateway> = ({
    tier,
    desc,
    paymentBanefits,
    bgColor,
    fontColor,
    buttonBgColor,
    btnTextColor,
    inputBgColor,
    pymentGatewayLayout,
}) => {
    const [paymentTier, setPaymentTier] = useState<any>(tier || {});
    const [description, setDescription] = useState<string>(desc || "");
    const [banefits, setBanefits] = useState(paymentBanefits || []);
    const [modifyDesigns, setModifyDesigns] = useState({
        bgColor: bgColor || "",
        fontColor: fontColor || "",
        buttonBgColor: buttonBgColor || "",
        btnTextColor: btnTextColor || "",
        inputBgColor: inputBgColor || "",
        pymentGatewayLayout: pymentGatewayLayout || "",
    });



    return (
        <div className="q-pyntg-main" style={!!modifyDesigns.pymentGatewayLayout ? modifyDesigns.pymentGatewayLayout == 2 ? { flexDirection: "row" } : { flexDirection: "column" } : {}}>
            <div
                className="q-pyntg-ch"
                style={{
                    boxShadow: "rgba(0, 0, 0, 0.50) 0px 0px 6px 0px",
                    backgroundColor: `${modifyDesigns.bgColor}`,
                    width: `${modifyDesigns.pymentGatewayLayout == 1 ? "100%" : ""}`,
                    padding: `${modifyDesigns.pymentGatewayLayout == 1 ? "28px 24px" : ""}`,
                    boxSizing: "content-box"
                }}
            >
                <div className="q-pyntg-ch-div" style={{ color: `${modifyDesigns.fontColor}` }}>Payment</div>
                <div style={{ marginBottom: "1.25rem" }}>
                    <div style={{ color: `${modifyDesigns.fontColor}`, marginBottom: ".75rem" }}>Card holder name</div>
                    <input
                        type="text"
                        className="q-pyntg-ch-div-inp"
                        placeholder="Card holder name"
                        style={{
                            backgroundColor: `${modifyDesigns.inputBgColor}`,
                        }}
                    />
                </div>
                <div style={{ marginBottom: "1.25rem" }}>
                    <div style={{ color: `${modifyDesigns.fontColor}` }}>Card Number</div>
                    <div
                        className="q-pyntg-ch-div-inp"
                        style={{
                            backgroundColor: `${modifyDesigns.inputBgColor}`,
                        }}
                    >
                        <CardNumberElement options={CARD_OPTIONS} />
                    </div>
                </div>
                <div className="q-pyntg-ch-div2">
                    <div>
                        <div style={{ color: `${modifyDesigns.fontColor}` }}>Expiration Date</div>
                        <div
                            className="q-pyntg-ch-div-inp"
                            style={{
                                backgroundColor: `${modifyDesigns.inputBgColor}`,
                            }}
                        >
                            <CardExpiryElement options={CARD_OPTIONS} />
                        </div>
                    </div>
                    <div>
                        <div style={{ color: `${modifyDesigns.fontColor}` }}>CVV</div>
                        <div
                            className="q-pyntg-ch-div-inp"
                            style={{
                                backgroundColor: `${modifyDesigns.inputBgColor}`,
                            }}
                        >
                            <CardCvcElement options={CARD_OPTIONS} />
                        </div>
                    </div>
                </div>
                <div className="q-pyntg-ch-div3">
                    <div>
                        <div style={{ color: `${modifyDesigns.fontColor}` }}>Country</div>
                        <input
                            type="text"
                            className="q-pyntg-ch-div-inp"
                            placeholder="Country"
                            style={{
                                backgroundColor: `${modifyDesigns.inputBgColor}`,
                            }}
                        />
                    </div>
                    <div>
                        <div style={{ color: `${modifyDesigns.fontColor}` }}>Zip</div>
                        <input
                            type="number"
                            className="q-pyntg-ch-div-inp"
                            placeholder="Zip"
                            style={{
                                backgroundColor: `${modifyDesigns.inputBgColor}`,
                            }}
                        />
                    </div>
                </div>
                <button
                    className="q-pyntg-ch-div-btn"
                    style={{
                        backgroundColor: `${modifyDesigns.buttonBgColor}`,
                        color: `${modifyDesigns.btnTextColor}`,
                    }}
                >
                    Pay now
                </button>
            </div>
            <div
                className="q-pyntg-rg"
                style={{
                    backgroundColor: `${modifyDesigns.bgColor}`,
                    width: `${modifyDesigns.pymentGatewayLayout == 1 ? "100%" : ""}`
                }}
            >
                <div
                    className="q-pyntg-rg-div"
                    style={{
                        boxShadow: "rgba(0, 0, 0, 0.50) 0px 0px 6px 0px",
                        padding: `${modifyDesigns.pymentGatewayLayout == 1 ? "28px 24px" : ""}`,
                        boxSizing: "content-box"
                    }}
                >
                    <div
                        className="q-pyntg-rg-div-p"
                        style={{ color: `${modifyDesigns.fontColor}` }}
                    >
                        {!!paymentTier?.creditsTierName &&
                            paymentTier.creditsTierName
                                .toLowerCase()
                                .includes(" plan")
                            ? paymentTier.creditsTierName
                            : paymentTier.creditsTierName + " Plan"}
                    </div>
                    <div
                        className="q-pyntg-rg-div-p2"
                        style={{ color: `${modifyDesigns.fontColor}` }}
                    >
                        {description}
                    </div>
                    <div className="q-pyntg-rg-div-p3">
                        <div
                            className="q-pyntg-rg-div-p3-p"
                            style={{ color: `${modifyDesigns.fontColor}` }}
                        >
                            ${paymentTier.creditsAmount}
                        </div>
                        <div
                            className="q-pyntg-rg-div-p4"
                            style={{ color: `${modifyDesigns.fontColor}` }}
                        >
                            {paymentTier.recurringTimePeriod == "ONETIME"
                                ? "/one-time"
                                : paymentTier.recurringTimePeriod == "MONTHLY"
                                    ? "/months"
                                    : "/years"}
                        </div>
                    </div>
                    <div className="q-pyntg-rg-div-br"></div>
                    <div className="q-pyntg-rg-div-fea">
                        FEATURES
                    </div>
                    <div className=" q-pyntg-rg-div2">
                        {!!banefits &&
                            !!banefits.included &&
                            banefits.included.map(
                                (banefits: string, i: number) => (
                                    <div
                                        className="q-pyntg-rg-div2-ben"
                                        key={i}
                                        style={{
                                            color: `${modifyDesigns.fontColor}`,
                                        }}
                                    >
                                        <img src={tick} className="q-pyntg-rg-div2-img" />
                                        <div >{banefits}</div>
                                    </div>
                                )
                            )}
                        {!!banefits &&
                            !!banefits.notIncluded &&
                            banefits.notIncluded.map(
                                (banefits: string, i: number) => (
                                    <div
                                        className="q-pyntg-rg-div2-ben2"
                                        key={i}
                                    >
                                        <img src={untick} className="q-pyntg-rg-div2-img" />
                                        <div color="#9CA3AF">
                                            {banefits}
                                        </div>
                                    </div>
                                )
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentGateway;
