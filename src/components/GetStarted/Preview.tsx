import { useState } from "react";
import { QuestProvider } from "../QuestWrapper";
import GetStarted from "./GetStarted";
import GetStartedOff from "./OfflineComponent";

export const questId = 'q-9b0238cb-c673-421e-9790-63051d64f95f';
export const apiKey = "k-e6ec8094-6eef-4e80-a804-112a63607bf5";
export const apiSecret = "s-9503fd7a-8f44-4e5a-bf37-f5a023510b03606feb6c-15cb-4640-88a1-0addfba3b2ef";
export const entityId = "e-5768fd26-d226-4ac1-81e6-3c99427f3fb3";
export const userId = "u-88350caa-4080-4505-a169-09f3f15e83b7";
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTg4MzUwY2FhLTQwODAtNDUwNS1hMTY5LTA5ZjNmMTVlODNiNyIsImlhdCI6MTcxNTIyMTcyOSwiZXhwIjoxNzE1ODI2NTI5fQ.Pk5uMZsrn34PCabjZSOj5Kg-t-xdaZCLDnFb8hbJVNs'

export default function GetStartedPreview({
  online = true,
}: {
  online?: boolean;
}) {
  let [state, setstate] = useState([
    {
      id: 1,
      type: "LINK_OPEN_READ",
      title: "Create a Quest Campaign",
      url: "https://www.youtube.com/",
      description:
        "Choose template, customize UI, add actions and deploy SDK Component in a no-code way",
      btn1: "Get Demo",
      btn2: "Create Campaign",
      btn1Link: "https://calendly.com/debparna/15-min",
      criteriaId: "ec-868df9ea-b029-4ca9-9e83-0140f8b376d0",
      completed: false,
      imageUrl:
        "https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1710576000&semt=ais",
      longDescription:
        "Be sure to check out the Quest labs community for support, plus tips & tricks from Quest users",
    },
    {
      id: 2,
      type: "LINK_OPEN_READ",
      title: "Sign-up for Demo & Join our Slack Community",
      url: "https://calendly.com/debparna/15-min",
      description:
        "Get a demo of the entire Quest platform as well as a sneak peak of whats on our roadmap ",
      btn1: "Join Slack",
      btn2: "Book Demo",
      btn1Link:
        "https://join.slack.com/t/quest-ewq8314/shared_invite/zt-25wut50tj-YyIFs~H9d4LHjNYqJmlkow",
      criteriaId: "ec-166aa74a-748d-4cf6-8329-b487efb49720",
      completed: false,
      imageUrl:
        "https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1710576000&semt=ais",
      longDescription:
        "Be sure to check out the Quest labs community for support, plus tips & tricks from Quest users",
    },
    {
      id: 3,
      type: "LINK_OPEN_READ",
      title: "Integrate Data Sources",
      url: "/admin/settings/#integrations",
      description:
        "Integrate with data sources to enable intelligent data flow into components",
      btn1: "Get Demo",
      btn2: "Try Now!",
      btn1Link: "https://calendly.com/debparna/15-min",
      criteriaId: "ec-3b238eb3-2a1f-48bb-a9ac-44e48edf880f",
      completed: false,
      imageUrl:
        "https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1710576000&semt=ais",
      longDescription:
        "Be sure to check out the Quest labs community for support, plus tips & tricks from Quest users",
    },
  ]);

  const handleCallback = (action: any) => {
    if (action=='https://www.youtube.com/') {
      console.log(action)
    } else {
     window.open(action, '_blank')
    }
  }

  if (online)
    return (
      <QuestProvider
        apiKey={apiKey}
        apiSecret="s-7462f377-2ce4-4593-a907-3a2a00cdf951be06358a-d95d-4576-b3b4-a07dda2dab36"
        entityId={entityId}
        featureFlags={{}}
        apiType="STAGING"
      // themeConfig={{ fontFamily: "cursive" }}
      >
        <GetStarted
          questId={questId}
          userId={userId}
          token={token}
          isImageOpen={false}
          // buttonColor="yellow"
          cardBackground="yellowGreen"
          cardBorderColor="red"
          // iconUrls={[
          //     "https://pin.questprotocol.xyz/ipfs/QmWSjM2BwmSW7pda3YmWxyFQ7sCJ9PVmVAwj1W9K7XAHhG",
          //     "https://pin.questprotocol.xyz/ipfs/QmRC5SwJpBup4wRB32DxjPV2fEnccpJkuMTBtzS9aiJg42",
          //     "https://pin.questprotocol.xyz/ipfs/QmcYB6T27vbqdaaeJdx1Cz3nz9oYMhTegpWjhSff7aX2Mi",
          //     "https://pin.questprotocol.xyz/ipfs/QmavuprWaHKvd5JZvkdgathYKLr5Zcshc1EPRzRzBJaPqw"
          // ]}
          // anouncement
          allowMultiClick={false}
          autoHide={false}
          headingText="What’s new"
          onCompleteAllStatus={() => {
            // showToast.success({ text: "completed successfully" })
          }}
          template={2}
          showLoadingIndicator={true}
          // showDropDown
          //   uniqueUserId="soumitra.petbindhi+1@gmail.com"
         
          showProgressBar
          showFooter={false}
          styleConfig={{
            Arrow: {
              //   Background: "red",
              //   CompletedBackground: "yellow",
              //   CompletedIconColor: "red",
              //   IconColor: "blue",
            },
            Card: {
              //   backgroundColor: "",
              //   border: "1px solid blue",
              //   borderRadius: "15px",
            },
            Description: {
              //   color: "red",
              //   background: "yellow",
            },
            Footer: {
              //   color: "red",
              //   background: "red",
            },
            Form: {
              //   color: "red",
              //   background: "red",
            },
            Heading: {
              //   color: "red",
              //   background: "red",
            },
            Icon: {
              //   color: "red",
            },
            PrimaryButton: {
              //   color: "red",
              //   background: "yellow",
              //   border: "red",
              //   borderColor: "red",
            },
            ProgressBar: {
              //   barColor: "red",
              //   barParentColor: "red",
              ProgressText: {
                // color: "red",
              },
            },
            SecondaryButton: {
              //   color: "red",
              //   background: "red",
              //   borderColor: "yellow",
            },
            // Card:{backgroundColor:'red',borderBottom:'1px solid blue'}
            Topbar: { border: "none" },
            CardContainer: {
              //   color: "red",
              //   background: "red",
              //   gap: "25px",
            },
            IsImageOpen: {
              ContainerDiv: {
                // background: "yellow",
                // height: "300px",
                // width: "100px",
                // borderRadius: "100px",
              },
              ImageContainer: {
                ImageContainerProperties: {
                  //   background: "yellow",
                  //   borderRadius: "0",
                },
                Image: {
                  // borderRadius: "50px",
                  //   height: "150px",
                },
              },
            },
          }}
          ButtonType="Buttons"
        />
      </QuestProvider>
    );

  return (
    <GetStartedOff
      iconUrls={[
        "https://pin.questprotocol.xyz/ipfs/QmWSjM2BwmSW7pda3YmWxyFQ7sCJ9PVmVAwj1W9K7XAHhG",
        "https://pin.questprotocol.xyz/ipfs/QmRC5SwJpBup4wRB32DxjPV2fEnccpJkuMTBtzS9aiJg42",
        "https://pin.questprotocol.xyz/ipfs/QmcYB6T27vbqdaaeJdx1Cz3nz9oYMhTegpWjhSff7aX2Mi",
        "https://pin.questprotocol.xyz/ipfs/QmavuprWaHKvd5JZvkdgathYKLr5Zcshc1EPRzRzBJaPqw",
      ]}
      ButtonType="Buttons"
      allowMultiClick={true}
      // width="50vw"
      autoHide={false}
      // arrowColor='red'
      cardBorderColor="red"
      headingText="What’s new"
      onCompleteAllStatus={() => {
        // showToast.success({ text: "completed successfully" })
      }}
      onLinkTrigger={handleCallback}
      // onLinkTrigger = {()=>{

      // }}
      isImageOpen={true}
      template={2}
      styleConfig={{
        Arrow: {
          //   Background: "red",
          //   CompletedBackground: "yellow",
          //   CompletedIconColor: "red",
          //   IconColor: "blue",
        },
        Card: {
          //   backgroundColor: "",
          //   border: "1px solid blue",
          //   borderRadius: "15px",
        },
        Description: {
          //   color: "red",
          //   background: "yellow",
        },
        Footer: {
          //   color: "red",
          //   background: "red",
        },
        Form: {
          //   color: "red",
          //   background: "red",
        },
        Heading: {
          //   color: "red",
          //   background: "red",
        },
        Icon: {
          //   color: "red",
        },
        PrimaryButton: {
          //   color: "red",
          //   background: "yellow",
          //   border: "red",
          //   borderColor: "red",
        },
        ProgressBar: {
          //   barColor: "red",
          //   barParentColor: "red",
          ProgressText: {
            // color: "red",
          },
        },
        SecondaryButton: {
          //   color: "red",
          //   background: "red",
          //   borderColor: "yellow",
        },
        // Card:{backgroundColor:'red',borderBottom:'1px solid blue'}
        Topbar: { border: "none" },
        CardContainer: {
          //   color: "red",
          //   background: "red",
          //   gap: "25px",
        },
        IsImageOpen: {
          ContainerDiv: {
            // background: "yellow",
            // height: "300px",
            // width: "100px",
            // borderRadius: "100px",
          },
          ImageContainer: {
            ImageContainerProperties: {
              //   background: "yellow",
              //   borderRadius: "0",
            },
            Image: {
              //   borderRadius: "50px",
              //   height: "150px",
            },
          },
        },
      }}
      offlineData={state}
    />
  );
}
