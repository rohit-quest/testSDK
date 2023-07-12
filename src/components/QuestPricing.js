import React, { useEffect } from "react";
// import axios from "axios";

const QuestPricing = ({
  bgColor = "#ffffff",
  color = "#000000",
  buttonColor = "#008CBA",
  source = "WEB",
  entityId = "e-8aec3f79-d976-4f33-8bc9-59b2088e7f74",
}) => {

    const creditTiers = [
        {
            "recurringTimePeriod": "ONETIME",
            "extraCreditsAmount": 0,
            "entityId": "e-8aec3f79-d976-4f33-8bc9-59b2088e7f74",
            "creditsAmount": 20,
            "price": 0,
            "creditsTierId": "free",
            "creditsTierName": "Free"
        },
        {
            "recurringTimePeriod": "ONETIME",
            "extraCreditsAmount": 0,
            "entityId": "e-8aec3f79-d976-4f33-8bc9-59b2088e7f74",
            "creditsAmount": 50,
            "price": 10,
            "creditsTierId": "growth",
            "creditsTierName": "Growth Plan"
        },
        {
            "recurringTimePeriod": "ONETIME",
            "extraCreditsAmount": 50,
            "entityId": "e-8aec3f79-d976-4f33-8bc9-59b2088e7f74",
            "creditsAmount": 250,
            "price": 50,
            "creditsTierId": "scale",
            "creditsTierName": "Scale Plan"
        },
        {
            "recurringTimePeriod": "ONETIME",
            "extraCreditsAmount": 250,
            "entityId": "e-8aec3f79-d976-4f33-8bc9-59b2088e7f74",
            "creditsAmount": 500,
            "price": 100,
            "creditsTierId": "master",
            "creditsTierName": "Master Plan"
        }
    ]
//   useEffect(() => {
//     const bgColorParam = General.shareInstance.getQueryParam("bgcolor");
//     const colorParam = General.shareInstance.getQueryParam("color");
//     const buttonColorParam = General.shareInstance.getQueryParam("buttoncolor");
//     const sourceParam = General.shareInstance.getQueryParam("source");
//     const entityIdParam = General.shareInstance.getQueryParam("entityId");

//     if (bgColorParam) bgColor = bgColorParam;
//     if (colorParam) color = colorParam;
//     if (buttonColorParam) buttonColor = buttonColorParam;
//     if (sourceParam) source = sourceParam;
//     if (entityIdParam) entityId = entityIdParam;

//     if (entityId) {
//       let request = General.shareInstance.createUrl(
//         `api/payment/entities/${entityId}/credits`
//       );
//       axios
//         .get(request.url)
//         .then((response) => {
//           if (response.data.success) {
//             setCreditTiers(response.data.data);
//           }
//         })
//         .catch((error) => console.error(error));
//     }
//   }, []);

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color,
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "10% 20%",
        textAlign: "center",
      }}
    >
      <h1 style={{ color }}>Select your Plan</h1>
      {!entityId ? (
        <h4 style={{ color }}>Please provide entity id in the query params</h4>
      ) : (
        <>
          <h4 style={{ color }}>Choose one of the following credit tiers</h4>
          <p style={{ color, fontSize: "10px", marginBottom: "40px" }}>
            ** Powered by Quest Labs
          </p>
          <div className="row">
            {creditTiers.map((tier) => (
              <div
                className="col-sm-3"
                style={{ marginBottom: "20px" }}
                key={tier.creditsTierId}
              >
                <div
                  className="tier-box"
                  style={{
                    border: `2px solid ${color}`,
                    borderRadius: "10px",
                    padding: "20px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3 style={{ color }}>{tier.creditsTierName}</h3>
                  </div>
                  <div>
                    <p
                      style={{
                        color,
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      {tier.creditsAmount}
                      {tier.extraCreditsAmount > 0 && (
                        <span style={{ color: "green" }}>
                          {" "}
                          + {tier.extraCreditsAmount}
                        </span>
                      )}{" "}
                      credits
                    </p>
                    <button
                      style={{
                        backgroundColor: buttonColor,
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                      onClick={() =>
                        alert(`Buying ${tier.creditsTierName} for $${tier.price}`)
                      }
                    >
                      Buy for ${tier.price}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default QuestPricing;
