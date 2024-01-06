import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {FC, FormEvent, useContext, useMemo, useState} from "react";
import tick from "../../assets/images/tick.png";
import untick from "../../assets/images/untick.png";
import "./payment.css";
import { toast } from "react-toastify";
import axios from "axios";
import config from "../../config";
import QuestContext from "../QuestWrapper";

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

interface IAddress {
  country: string;
  postal_code: string;
  city: string;
  state: string;
}

interface ICardData {
  email: string;
  name: string;
  address: IAddress;
  cardNumber: boolean;
  expiration: boolean;
  cvv: boolean;
}

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
  userId?: string;
  token?: string;
  forEntityId: string;
}

const defaultCardData: ICardData = {
  name: "",
  email: "",
  address: {
    city: "",
    country: "",
    postal_code: "",
    state: "",
  },
  cardNumber: false,
  cvv: false,
  expiration: false,
};

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
  userId,
  token,
  forEntityId,
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
  const [cardData, setCardData] = useState<ICardData>(defaultCardData);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const { apiKey, apiSecret, entityId, featureFlags } = useContext(
    QuestContext.Context
  );
  const stripe = useStripe();
  const stripeElements = useElements();

  const delay = (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const confirmPayment = async (
    clientSecret: string,
    token: string
  ): Promise<boolean> => {
    if (!stripe) {
      throw new Error("Stripe initialization failed");
    }
    const response = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: {
          token,
        },
      },
    });

    if (response.error || response.paymentIntent.status === "canceled") {
      throw response.error || new Error("Payment was cancelled");
    }

    if (response.paymentIntent.status === "processing") {
      toast.info("Payment processing");
      await delay(5000);
      return confirmPayment(clientSecret, token);
    }

    if (response.paymentIntent.status === "succeeded") return true;

    return false;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setPaymentLoading(true);

      if (!stripe || !stripeElements) {
        throw new Error("stripe and elements not yet initialized");
      }
      const cardNumberElement = stripeElements.getElement(CardNumberElement);

      if (!cardNumberElement) {
        throw new Error("Unable to create stripe element");
      }

      const { error: createTokenError, token: tokenObj } =
        await stripe.createToken(cardNumberElement);

      if (createTokenError) {
        throw createTokenError;
      }

      const { error: createPaymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: { token: tokenObj.id },
        });

      if (createPaymentMethodError) {
        throw createPaymentMethodError;
      }

      const { name, email, address } = cardData;

      const payload = {
        cardData: {
          name,
          email,
          address,
        },
        intentData: {
          amount: Number(paymentTier.creditsAmount) || 0,
          currency: "usd",
          name: paymentTier.creditsTierName,
          paymentMethodId: paymentMethod.id,
        },
        forEntityId,
      };

      const { data: createIntentResponse } = await axios.post(
        `${config.BACKEND_URL}api/entities/${entityId}/users/${userId}/create-payment-intent`,
        payload,
        {
          headers: {
            apiKey,
            apiSecret,
            entityId,
            userId,
            token,
          },
        }
      );

      if (createIntentResponse.success === false) {
        throw new Error(createIntentResponse.error);
      }

      await delay(1000);
      const createTokenTwo = await stripe.createToken(cardNumberElement);

      if (createTokenTwo.error) {
        throw createTokenTwo.error;
      }

      const confirmPaymentResponse = await confirmPayment(
        createIntentResponse.data.clientSecret,
        createTokenTwo.token.id
      );

      if (!confirmPaymentResponse) {
        throw new Error("Payment failed");
      }

      const { data: paymentConfirmResponse } = await axios.post(
        `${config.BACKEND_URL}api/entities/${entityId}/approve-payment`,
        {
          intentId: createIntentResponse.data.intentId,
        },
        {
          headers: {
            apiKey,
            apiSecret,
            entityId,
            userId,
            token,
          },
        }
      );

      if (paymentConfirmResponse.success === false) {
        throw new Error(paymentConfirmResponse.error);
      }

      toast.success("Payment successfull");
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
      console.log(error);
    } finally {
      setPaymentLoading(false);
    }
  };

  const checkCanPay = () => {
    let canPay = true;
    if (
      cardData.name === "" ||
      cardData.email === "" ||
      !cardData.cardNumber ||
      !cardData.cvv ||
      !cardData.expiration
    ) {
      canPay = false;
    }

    if (
      cardData.address.city === "" ||
      cardData.address.country === "" ||
      cardData.address.postal_code === "" ||
      cardData.address.state === ""
    ) {
      canPay = false;
    }

    return canPay;
  };

  const canPay = useMemo(checkCanPay, [cardData]);

  return (
    <div
      className="q-pyntg-main"
      style={
        !!modifyDesigns.pymentGatewayLayout
          ? modifyDesigns.pymentGatewayLayout == 2
            ? { flexDirection: "row" }
            : { flexDirection: "column" }
          : {}
      }
    >
      <form
        onSubmit={handleSubmit}
        className="q-pyntg-ch"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.50) 0px 0px 6px 0px",
          backgroundColor: `${modifyDesigns.bgColor}`,
          width: `${modifyDesigns.pymentGatewayLayout == 1 ? "100%" : ""}`,
          padding: `${
            modifyDesigns.pymentGatewayLayout == 1 ? "28px 24px" : ""
          }`,
        }}
      >
        <p
          className="q-pyntg-ch-div"
          style={{ color: `${modifyDesigns.fontColor}` }}
        >
          Payment
        </p>
        <div style={{ marginBottom: "1.25rem" }}>
          <p
            style={{
              color: `${modifyDesigns.fontColor}`,
              marginBottom: ".75rem",
            }}
          >
            Card holder name
          </p>
          <input
            type="text"
            className="q-pyntg-ch-div-inp"
            placeholder="name"
            name="name"
            value={cardData.name}
            onChange={(event) => {
              setCardData(
                (prev) => ({ ...prev, name: event.target.value } as ICardData)
              );
            }}
            required={true}
            style={{
              backgroundColor: `${modifyDesigns.inputBgColor}`,
            }}
          />
        </div>
        <div style={{ marginBottom: "1.25rem" }}>
          <p
            style={{
              color: `${modifyDesigns.fontColor}`,
              marginBottom: ".75rem",
            }}
          >
            Billing email
          </p>
          <input
            type="email"
            value={cardData.email}
            onChange={(event) => {
              setCardData(
                (prev) => ({ ...prev, email: event.target.value } as ICardData)
              );
            }}
            className="q-pyntg-ch-div-inp"
            placeholder="Billing email"
            name="email"
            required={true}
            style={{
              backgroundColor: `${modifyDesigns.inputBgColor}`,
            }}
          />
        </div>
        <div style={{ marginBottom: "1.25rem" }}>
          <p style={{ color: `${modifyDesigns.fontColor}` }}>Card Number</p>
          <div
            className="q-pyntg-ch-div-inp"
            style={{
              backgroundColor: `${modifyDesigns.inputBgColor}`,
            }}
          >
            <CardNumberElement
              options={CARD_OPTIONS}
              onChange={(event) => {
                setCardData(
                  (prev) =>
                    ({ ...prev, cardNumber: event.complete } as ICardData)
                );
              }}
            />
          </div>
        </div>
        <div className="q-pyntg-ch-div2">
          <div>
            <p style={{ color: `${modifyDesigns.fontColor}` }}>
              Expiration Date
            </p>
            <div
              className="q-pyntg-ch-div-inp"
              style={{
                backgroundColor: `${modifyDesigns.inputBgColor}`,
              }}
            >
              <CardExpiryElement
                options={CARD_OPTIONS}
                onChange={(event) => {
                  setCardData(
                    (prev) =>
                      ({ ...prev, expiration: event.complete } as ICardData)
                  );
                }}
              />
            </div>
          </div>
          <div>
            <p style={{ color: `${modifyDesigns.fontColor}` }}>CVV</p>
            <div
              className="q-pyntg-ch-div-inp"
              style={{
                backgroundColor: `${modifyDesigns.inputBgColor}`,
              }}
            >
              <CardCvcElement
                options={CARD_OPTIONS}
                onChange={(event) => {
                  setCardData(
                    (prev) => ({ ...prev, cvv: event.complete } as ICardData)
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className="q-pyntg-ch-div2">
          <div>
            <p style={{ color: `${modifyDesigns.fontColor}` }}>Country</p>
            <input
              type="text"
              className="q-pyntg-ch-div-inp"
              placeholder="Country"
              name="country"
              value={cardData.address.country}
              onChange={(event) => {
                setCardData((prev) => ({
                  ...prev,
                  address: { ...prev.address, country: event.target.value },
                }));
              }}
              required={true}
              style={{
                backgroundColor: `${modifyDesigns.inputBgColor}`,
              }}
            />
          </div>
          <div>
            <p style={{ color: `${modifyDesigns.fontColor}` }}>Postal Code</p>
            <input
              type="number"
              className="q-pyntg-ch-div-inp"
              placeholder="Postal code"
              name="postal_code"
              value={cardData.address.postal_code}
              onChange={(event) => {
                setCardData((prev) => ({
                  ...prev,
                  address: { ...prev.address, postal_code: event.target.value },
                }));
              }}
              required={true}
              style={{
                backgroundColor: `${modifyDesigns.inputBgColor}`,
              }}
            />
          </div>
        </div>
        <div className="q-pyntg-ch-div3">
          <div>
            <p style={{ color: `${modifyDesigns.fontColor}` }}>City</p>
            <input
              type="text"
              className="q-pyntg-ch-div-inp"
              placeholder="city"
              name="city"
              value={cardData.address.city}
              onChange={(event) => {
                setCardData((prev) => ({
                  ...prev,
                  address: { ...prev.address, city: event.target.value },
                }));
              }}
              required={true}
              style={{
                backgroundColor: `${modifyDesigns.inputBgColor}`,
              }}
            />
          </div>
          <div>
            <p style={{ color: `${modifyDesigns.fontColor}` }}>State</p>
            <input
              type="text"
              className="q-pyntg-ch-div-inp"
              placeholder="state"
              name="state"
              value={cardData.address.state}
              onChange={(event) => {
                setCardData((prev) => ({
                  ...prev,
                  address: { ...prev.address, state: event.target.value },
                }));
              }}
              required={true}
              style={{
                backgroundColor: `${modifyDesigns.inputBgColor}`,
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          className="q-pyntg-ch-div-btn"
          style={{
            backgroundColor: `${modifyDesigns.buttonBgColor}`,
            color: `${modifyDesigns.btnTextColor}`,
          }}
          disabled={!canPay || paymentLoading}
        >
          {paymentLoading ? "Processing payment" : "Pay now"}
        </button>
      </form>
      <div
        className="q-pyntg-rg"
        style={{
          backgroundColor: `${modifyDesigns.bgColor}`,
          width: `${modifyDesigns.pymentGatewayLayout == 1 ? "100%" : ""}`,
        }}
      >
        <div
          className="q-pyntg-rg-div"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.50) 0px 0px 6px 0px",
            padding: `${
              modifyDesigns.pymentGatewayLayout == 1 ? "28px 24px" : ""
            }`,
          }}
        >
          <p
            className="q-pyntg-rg-div-p"
            style={{ color: `${modifyDesigns.fontColor}` }}
          >
            {!!paymentTier?.creditsTierName &&
            paymentTier.creditsTierName.toLowerCase().includes(" plan")
              ? paymentTier.creditsTierName
              : paymentTier.creditsTierName + " Plan"}
          </p>
          <p
            className="q-pyntg-rg-div-p2"
            style={{ color: `${modifyDesigns.fontColor}` }}
          >
            {description}
          </p>
          <div className="q-pyntg-rg-div-p3">
            <p
              className="q-pyntg-rg-div-p3-p"
              style={{ color: `${modifyDesigns.fontColor}` }}
            >
              ${paymentTier.creditsAmount}
            </p>
            <p
              className="q-pyntg-rg-div-p4"
              style={{ color: `${modifyDesigns.fontColor}` }}
            >
              {paymentTier.recurringTimePeriod == "ONETIME"
                ? "/one-time"
                : paymentTier.recurringTimePeriod == "MONTHLY"
                ? "/months"
                : "/years"}
            </p>
          </div>
          <div className="q-pyntg-rg-div-br"></div>
          <p className="q-pyntg-rg-div-fea">FEATURES</p>
          <div className=" q-pyntg-rg-div2">
            {!!banefits &&
              !!banefits.included &&
              banefits.included.map((banefits: string, i: number) => (
                <div
                  className="q-pyntg-rg-div2-ben"
                  key={i}
                  style={{
                    color: `${modifyDesigns.fontColor}`,
                  }}
                >
                  <img src={tick} className="q-pyntg-rg-div2-img" />
                  <p>{banefits}</p>
                </div>
              ))}
            {!!banefits &&
              !!banefits.notIncluded &&
              banefits.notIncluded.map((banefits: string, i: number) => (
                <div className="q-pyntg-rg-div2-ben2" key={i}>
                  <img src={untick} className="q-pyntg-rg-div2-img" />
                  <p color="#9CA3AF">{banefits}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
