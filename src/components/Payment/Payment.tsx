import axios from "axios";
import { FC, useEffect, useState, useContext } from "react";
import QuestContext from "../QuestWrapper";
import tick from "../../assets/images/tick.png";
import untick from "../../assets/images/untick.png";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import config from "../../config";
import PaymentGateway from "./PaymentGateway";

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
    const { apiKey, apiSecret, entityId } = useContext(QuestContext.Context);
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

    return (
        <div
            className="questLabs px-6 md:px-14 lg:px-14 py-10 "
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", width: `${modifyDesigns.width}` }}
        >
            {openPaymentPopup == false && (
                <div
                    className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    style={{
                        gridTemplateColumns: `repeat(${modifyDesigns.mainLayout},1fr)`,
                    }}
                >
                    {tiers.map((tier, index) => (
                        <div
                            className="w-full p-8 rounded-lg"
                            style={{
                                boxShadow:
                                    "rgba(0, 0, 0, 0.50) 0px 0px 6px 0px",
                                backgroundColor: `${modifyDesigns.bgColor}`,
                            }}
                            key={index}
                        >
                            <p
                                className="text-3xl text-center font-bold"
                                style={{ color: `${modifyDesigns.fontColor}` }}
                            >
                                {tier.creditsTierName
                                    .toLowerCase()
                                    .includes(" plan")
                                    ? tier.creditsTierName
                                    : tier.creditsTierName + " Plan"}
                            </p>
                            <p
                                className="text-center text-lg text-gray-700 mt-3"
                                style={{ color: `${modifyDesigns.fontColor}` }}
                            >
                                {desc[index]}
                            </p>
                            <div
                                className="flex items-end gap-1 mb-5 mt-6"
                                style={{ color: `${modifyDesigns.fontColor}` }}
                            >
                                <p className="text-4xl font-bold">
                                    ${tier.creditsAmount}
                                </p>
                                <p className="text-lg text-gray-600">
                                    {tier.recurringTimePeriod == "ONETIME"
                                        ? "/one-time"
                                        : tier.recurringTimePeriod == "MONTHLY"
                                        ? "/months"
                                        : "/years"}
                                </p>
                            </div>
                            <button
                                className="text-black border-2 border-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg w-full py-3 mt-7"
                                onClick={() => handleClick(index)}
                                style={{
                                    backgroundColor: `${modifyDesigns.buttonBgColor}`,
                                    color: `${modifyDesigns.btnTextColor}`,
                                }}
                            >
                                Continue
                            </button>
                            <div className="border-b-2 my-6 border-dashed border-gray-400"></div>
                            <p className="text-center text-base text-gray-400 pb-6">
                                FEATURES
                            </p>
                            <div className=" flex flex-col gap-3">
                                {!!paymentBanefits[index] &&
                                    !!paymentBanefits[index].included &&
                                    paymentBanefits[index].included.map(
                                        (banefits: string, i: number) => (
                                            <div
                                                className="flex gap-3 items-center"
                                                key={i}
                                                style={{
                                                    color: `${modifyDesigns.fontColor}`,
                                                }}
                                            >
                                                <img
                                                    src={tick}
                                                    className="w-5 h-5"
                                                />
                                                <p className="">{banefits}</p>
                                            </div>
                                        )
                                    )}
                                {!!paymentBanefits[index] &&
                                    !!paymentBanefits[index].notIncluded &&
                                    paymentBanefits[index].notIncluded.map(
                                        (banefits: string, i: number) => (
                                            <div
                                                className="flex gap-3 items-center"
                                                key={i}
                                            >
                                                <img
                                                    src={untick}
                                                    className="w-5 h-5"
                                                />
                                                <p className="text-gray-400">
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
