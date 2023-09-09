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
        <div className="flex flex-col lg:flex-row lg:justify-evenly gap-5" style={!!modifyDesigns.pymentGatewayLayout ? modifyDesigns.pymentGatewayLayout == 2 ? {flexDirection: "row"} : {flexDirection: "column"} : {}}>
            <div
                className="px-6 md:px-12 lg:px-12 py-7 md:py-14 lg:py-14 rounded-lg sm:w-full md:w-full lg:w-2/5 text-gray-600"
                style={{
                    boxShadow: "rgba(0, 0, 0, 0.50) 0px 0px 6px 0px",
                    backgroundColor: `${modifyDesigns.bgColor}`,
                    width: `${modifyDesigns.pymentGatewayLayout == 1 ? "100%" : ""}`,
                    padding: `${modifyDesigns.pymentGatewayLayout == 1 ? "28px 24px" : ""}`
                }}
            >
                <p className="text-2xl pb-10 font-bold" style={{ color: `${modifyDesigns.fontColor}` }}>Payment</p>
                <div className="mb-5">
                    <p className="mb-3" style={{ color: `${modifyDesigns.fontColor}` }}>Card holder name</p>
                    <input
                        type="text"
                        className="bg-gray-100 border-none outline-none text-sm rounded hover:ring-blue-500 hover:ring-1 w-full p-3"
                        placeholder="Card holder name"
                        style={{
                            backgroundColor: `${modifyDesigns.inputBgColor}`,
                        }}
                    />
                </div>
                <div className="mb-5">
                    <p style={{ color: `${modifyDesigns.fontColor}` }}>Card Number</p>
                    <div
                        className="bg-gray-100 border-none outline-none text-sm rounded hover:ring-blue-500 hover:ring-1 w-full p-3"
                        style={{
                            backgroundColor: `${modifyDesigns.inputBgColor}`,
                        }}
                    >
                        <CardNumberElement options={CARD_OPTIONS} />
                    </div>
                </div>
                <div className="mb-5 grid grid-cols-2 gap-5">
                    <div>
                        <p style={{ color: `${modifyDesigns.fontColor}` }}>Expiration Date</p>
                        <div
                            className="bg-gray-100 border-none outline-none text-sm rounded hover:ring-blue-500 hover:ring-1 w-full p-3"
                            style={{
                                backgroundColor: `${modifyDesigns.inputBgColor}`,
                            }}
                        >
                            <CardExpiryElement options={CARD_OPTIONS} />
                        </div>
                    </div>
                    <div>
                        <p style={{ color: `${modifyDesigns.fontColor}` }}>CVV</p>
                        <div
                            className="bg-gray-100 border-none outline-none text-sm rounded hover:ring-blue-500 hover:ring-1 w-full p-3"
                            style={{
                                backgroundColor: `${modifyDesigns.inputBgColor}`,
                            }}
                        >
                            <CardCvcElement options={CARD_OPTIONS} />
                        </div>
                    </div>
                </div>
                <div className="mb-10 grid grid-cols-2 gap-5">
                    <div>
                        <p style={{ color: `${modifyDesigns.fontColor}` }}>Country</p>
                        <input
                            type="text"
                            className="bg-gray-100 border-none outline-none text-sm rounded hover:ring-blue-500 hover:ring-1 w-full p-3"
                            placeholder="Country"
                            style={{
                                backgroundColor: `${modifyDesigns.inputBgColor}`,
                            }}
                        />
                    </div>
                    <div>
                        <p style={{ color: `${modifyDesigns.fontColor}` }}>Zip</p>
                        <input
                            type="number"
                            className="bg-gray-100 border-none outline-none text-sm rounded hover:ring-blue-500 hover:ring-1 w-full p-3"
                            placeholder="Zip"
                            style={{
                                backgroundColor: `${modifyDesigns.inputBgColor}`,
                            }}
                        />
                    </div>
                </div>
                <button
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 w-full"
                    style={{
                        backgroundColor: `${modifyDesigns.buttonBgColor}`,
                        color: `${modifyDesigns.btnTextColor}`,
                    }}
                >
                    Pay now
                </button>
            </div>
            <div
                className="sm:w-full md:w-full lg:w-1/3"
                style={{ 
                    backgroundColor: `${modifyDesigns.bgColor}`,
                    width: `${modifyDesigns.pymentGatewayLayout == 1 ? "100%" : ""}`
                }}
            >
                <div
                    className="w-full px-6 md:px-12 lg:px-12 py-7 md:py-14 lg:py-14 rounded-lg"
                    style={{ 
                        boxShadow: "rgba(0, 0, 0, 0.50) 0px 0px 6px 0px",
                        padding: `${modifyDesigns.pymentGatewayLayout == 1 ? "28px 24px" : ""}`
                    }}
                >
                    <p
                        className="text-3xl text-left font-bold"
                        style={{ color: `${modifyDesigns.fontColor}` }}
                    >
                        {!!paymentTier?.creditsTierName &&
                        paymentTier.creditsTierName
                            .toLowerCase()
                            .includes(" plan")
                            ? paymentTier.creditsTierName
                            : paymentTier.creditsTierName + " Plan"}
                    </p>
                    <p
                        className="text-left text-lg text-gray-700 mt-3"
                        style={{ color: `${modifyDesigns.fontColor}` }}
                    >
                        {description}
                    </p>
                    <div className="flex items-end gap-1 mb-5 mt-6">
                        <p
                            className="text-4xl font-bold"
                            style={{ color: `${modifyDesigns.fontColor}` }}
                        >
                            ${paymentTier.creditsAmount}
                        </p>
                        <p
                            className="text-lg text-gray-600"
                            style={{ color: `${modifyDesigns.fontColor}` }}
                        >
                            {paymentTier.recurringTimePeriod == "ONETIME"
                                ? "/one-time"
                                : paymentTier.recurringTimePeriod == "MONTHLY"
                                ? "/months"
                                : "/years"}
                        </p>
                    </div>
                    <div className="border-b-2 my-6 border-dashed border-gray-400"></div>
                    <p className="text-center text-base text-gray-400 pb-6">
                        FEATURES
                    </p>
                    <div className=" flex flex-col gap-3">
                        {!!banefits &&
                            !!banefits.included &&
                            banefits.included.map(
                                (banefits: string, i: number) => (
                                    <div
                                        className="flex gap-3 items-center"
                                        key={i}
                                        style={{
                                            color: `${modifyDesigns.fontColor}`,
                                        }}
                                    >
                                        <img src={tick} className="w-5 h-5" />
                                        <p className="">{banefits}</p>
                                    </div>
                                )
                            )}
                        {!!banefits &&
                            !!banefits.notIncluded &&
                            banefits.notIncluded.map(
                                (banefits: string, i: number) => (
                                    <div
                                        className="flex gap-3 items-center"
                                        key={i}
                                    >
                                        <img src={untick} className="w-5 h-5" />
                                        <p className="text-gray-400">
                                            {banefits}
                                        </p>
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
