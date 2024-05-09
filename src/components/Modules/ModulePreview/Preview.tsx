// import { Referral as ReferEarn } from './ReferEarn'
// import { QuestProvider } from "../../QuestWrapper";
import { useRef, useState } from "react";

// import {
//   Header,
//   HeaderCloseButton,
//   HeaderDesciption,
//   HeaderHeading,
//   HeaderTextContainer,
// } from "../Modularization/Modules/HeaderModule";

// import { Input } from "../Modularization/Modules/InputModule";
// import { Label } from "../Modularization/Modules/LabelModule";
import { ButtonModule } from "../ButtonModule";
import {
  Card,
  CardBody,
  CardBodyDescription,
  CardBodyHeading,
  CardButton,
  CardImage,
} from "../Card";

import { ComponentBody } from "../ComponentBody";

import {
  Header,
  HeaderCloseButton,
  HeaderDesciption,
  HeaderHeading,
  HeaderTextContainer,
} from "../Header";

import { InputImage } from "../InputImage";

import { InputModule } from "../InputModule";
// import TextArea from "../Modularization/Modules/TextAreaModule";
// import TeaxtAreaWordCounter from "../Modularization/Modules/TeaxtCounterModule";

// import {
//   Card,
//   CardBody,
//   CardBodyDescription,
//   CardBodyHeading,
//   CardButton,
//   CardImage,
// } from "../Modularization/Modules/CardModule";

// import {
//   SearchBody,
//   SearchComponent,
// } from "../Modularization/ModularComponents/SearchComponent";

import "../../../index.css";
import "./Preview.css";
import CrossBtn from "../assets/CrossBtn.svg";
import { InputRating } from "../InputRating";
import { LabelModule } from "../LabelModule";
import { Option } from "../Option";
import { OptionsContainer } from "../OptionsContainer";
import { Question } from "../Question";
import QuestLabsFooter from "../QuestLabsFooterModule";
import { Search, SearchIcon } from "../Search";
import TextAreaWordCounter from "../TextAreaWordCounter";
import { TextAreaModule } from "../TextAreaModule";
import TextArea from "../TextArea";
import FeedbackWorkflow from "../Modularization/FeedbackWorkflow";
import OnboardingOffline from "../Modularization/OnboardingOffline";
// import CardImageIcon from "./Modules/assets/CardImageSvg.svg";
// import { SearchModule, SearchModuleIcon } from "../Modularization/Modules/SearchModule";
// import QuestLabsFooterModule from "../Modularization/Modules/QuestLabsFooterModule";
// import { Loader } from "../Modularization/Modules/Loader";
// import OnBoardingOfflinePreview from "../Modularization/ModularComponents/OnboardingOffline";
// import { Question } from "../Modularization/Modules/Question";
// import { Options } from "../Modularization/Modules/OptionsContainer";

// import FeedbackWorkflow from "../Modularization/ModularComponents/FeedbackWorkflow";
// import InputRating from "../Modularization/Modules/InputRating";
export const questId = "q-3225e0c4-9bbe-46c6-a0a0-0bffd77e004f";
export const apiKey = "k-fe5a805c-77ed-4cae-bd33-9591ebed2805";
export const apiSecret =
  "s-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42";
export const entityId = "e-9850377b-f88f-4426-a2ac-56206c74655a";
export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTgyNjhmNWUxLWY1YTEtNDQwYy1hMzMzLTBmNTU3OGE3Mzg0NyIsImlhdCI6MTcxMzc5NTk2OCwiZXhwIjoxNzE0NDAwNzY4fQ.YB5kwwQ5BwIS-kITDGncRxrcms1dNaQ873LIrpnsmwI";
export const userId = "u-8268f5e1-f5a1-440c-a333-0f5578a73847";

export default function ModularPreview() {
  const [value, setValue] = useState("");
  // for card
  const onMouseEnter = () => {
    console.log("mouse enter");
  };
  const onMouseLeave = () => {
    console.log("mouse left");
  };
  const onChange = (e: any) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const ref = useRef();

  console.log(value);

  return (
    <div>
      <ButtonModule
        children={"Button text"}
        className="sdk-class"
        disabled={true}
        id="sdk-id"
        isLoading={true}
        key={"sdk-key"}
        loaderPosition="right"
        loaderThickness={""}
        loadingText="Load text"
        onClick={() => {
          console.log("SDK btn Clicked");
        }}
        ref={ref}
        style={{}}
        type="submit"
      />

      {/* <Card
        className="card-classs"
        id="card-id"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{}}
        isSelected={false}
        selectedStyle={{}}
        onClick={() => {
          console.log("card clicked");
        }}
        // children
        key={"sdk-card-key"}
      >
        <CardImage
          className="card-img-class"
          id="card-img-id"
          key={""}
          // cardIcon={CardImageIcon}
          style={{}}
          cardIcon=""
          // children
        />

        <CardBody
          className="card-body-class"
          id="card-body-id"
          style={{}}
          key={""}
          // children
        >
          <CardBodyHeading
            style={{}}
            className=""
            id=""
            key={""}
            // children
          >
            Heading
          </CardBodyHeading>

          <CardBodyDescription
            style={{}}
            className=""
            id=""
            key={""}
            // children
          >
            Descrip
          </CardBodyDescription>
        </CardBody>

        <CardButton
          onClick={() => {
            console.log("click");
          }}
          style={{}}
          cardIcon=""
          // children
          className=""
          id=""
          key={""}
        />
      </Card> */}

      {/* <ComponentBody>Comp Body</ComponentBody> */}

      {/* <Header >
        <HeaderTextContainer >
          <HeaderHeading headingText="Heading" />
          <HeaderDesciption descriptionText="Desc" />
        </HeaderTextContainer>
        <HeaderCloseButton />
      </Header> */}

      {/* <InputImage
        file={null}
        isVisible={true}
        onStartCapture={() => {
          console.log("Cap start");
        }}
        screenshot={null}
        setFile={() => {
          console.log("set file");
        }}
        setIsVisible={() => {
          console.log("yes");
        }}
        setScreenshot={() => {
          console.log("setting sc");
        }}
      /> */}

      {/* <InputModule
        type="number"
        value={value}
        onChange={(e) => {
          console.log(e.target.value);
          setValue(e.target.value);
        }}
      /> */}

      {/* <InputRating
        className=""
        id=""
        key={""}
        setRating={setValue}
        StarStyle={{
          PrimaryColor: "red",
          SecondaryColor: "yellow",
          Size: 18,
          Style: {
            // background:'red'
          },
        }}
        ratingStyle="Star"
        style={{
          background: "red",
        }}
      /> */}

      {/* <LabelModule className=""  >
        Label
      </LabelModule> */}

      {/* <OptionsContainer >
        <Option onClick={()=>{console.log("one")}} >One</Option>
        <Option>One</Option>
        <Option>One</Option>
        <Option onClick={()=>{console.log("las")}}>One</Option>
      </OptionsContainer> */}

      {/* <Question >
        <LabelModule className="">Label</LabelModule>
        <InputModule
          type="number"
          value={value}
          onChange={(e) => {
            console.log(e.target.value);
            setValue(e.target.value);
          }}
        />
      </Question> */}

      {/* <QuestLabsFooter /> */}

      {/* <Search
        style={{
          gap: "10px",
        }}
      >
        <SearchIcon />
        <InputModule
          type="text"
          value={value}
          style={{
            input: {
              border: "none",
              width: "100%",
              padding: "0",
            },
          }}
          onChange={(e) => {
            console.log(e.target.value);
            setValue(e.target.value);
          }}
        />
      </Search> */}

      {/* <TextAreaWordCounter >
        120
      </TextAreaWordCounter> */}

      {/* <TextAreaModule maxLength={50}/> */}

      {/* <FeedbackWorkflow
        isOpen={true}
        offlineFormData={[
          [
            {
              type: "RATING",
              question: "Rating",
              options: [""],
              criteriaId: "ec-84192fef-c91c5-d4ace713aaeb",
              required: true,
            },
            {
              type: "USER_INPUT_EMAIL",
              question: "Enter your Email",
              options: [""],
              criteriaId: "ec-84192fef-c917-410f-4ace713aae",
              required: true,
            },
            {
              type: "USER_INPUT_TEXTAREA",
              question: "Comment",
              options: [""],
              criteriaId: "ec-84192fef-c917-410f-9d4ace713aae",
              required: true,
            },
            {
              type: "USER_INPUT_IMAGE",
              question: "",
              criteriaId: "ec-e32b88d7-0e43-4254-9c94-44859ceedcdc",
              required: true,
            },
          ],
          [
            {
              type: "USER_INPUT_TEXT",
              question: "Title",
              options: [""],
              criteriaId: "ec-84192fef-c917-410f-4ace713aee",
              required: true,
              placeholder: "",
            },
            {
              type: "USER_INPUT_EMAIL",
              question: "Email",
              options: [""],
              criteriaId: "ec-84192fef-c917-410f-9ace713aef",
              required: true,
              placeholder: "",
            },
            {
              type: "USER_INPUT_TEXTAREA",
              question: "Bug",
              options: [""],
              criteriaId: "ec-84192fef-c7-410f-9bc5-d4ce713aaeg",
              required: true,
              placeholder: "",
            },
          ],
          [
            {
              type: "USER_INPUT_TEXT",
              question: "What feature are you missing?",
              options: [""],
              criteriaId: "ec-84192fef-c917-410f-d4ace713aeh",
              required: true,
              placeholder: "",
            },
            {
              type: "USER_INPUT_EMAIL",
              question: "Your email address",
              options: [""],
              criteriaId: "ec-84192fef-c917-4101jioaaei",
              required: true,
              placeholder: "",
            },
            {
              type: "USER_INPUT_TEXT",
              question: "Tell us more about the problem",
              options: [""],
              criteriaId: "ec-84192fef-c9170f-9bc5acjie713aaej",
              required: true,
              placeholder: "",
            },
          ],
          [
            {
              type: "LINK_OPEN_READ",
              question: "",
              criteriaId: "ec-e32b88d7-0e43-4254-9c94-44859ceedcdc",
              required: true,
            },
          ],
        ]}
      /> */}

      {/* <Loader
        className="class"
        id="id"
        loaderColor="blue"
        loaderSize="100px"
        loaderThickness="10px"
      /> */}

      {/* <Button
        className="class"
        id="id-btn"
        // disabled={true}
        // isLoading={true}
        // loaderPosition="right"
        // loadingText="Loadin text"
        // loaderThickness={"8px"}
        type="button"
        style={
          {
            // background:"yellow",
            // fontSize: "50px",
          }
        }
        onClick={() => {
          console.log("btn clicked");
        }}
        ref={""}
      >
        Button
      </Button> */}

      {/* <Header
        // children
        className=""
        id=""
        key={""}
        style={
          {
            // background:"pink",
            // height:"300px",
            // display:'flex',
            // justifyContent:"center",
            // alignItems:'center'
          }
        }
      >
        <HeaderTextContainer
          // children
          className=""
          id=""
          key={""}
          style={{}}
        >
          <HeaderHeading
            style={{}}
            id=""
            key={""}
            headingText="Head"
            className=""
          />

          <HeaderDesciption
            className=""
            id=""
            key={""}
            style={{}}
            descriptionText="description"
          />
        </HeaderTextContainer>

        <HeaderCloseButton
          // children
          className=""
          iconColor=""
          id=""
          key={""}
          style={{}}
          onClose={() => {
            console.log("close");
          }}
        />
      </Header> */}

      {/* <InputRating /> */}

      {/* <Input
        className=""
        key={""}
        type="date"
        // children
        iconColor=""
        logoPosition="both"
        onChange={onChange}
        
        placeholder=""
        style={{}}
        value={value}
        
        // value=""
      /> */}

      {/* <Question>
        <Label style={{}}>Label</Label>

        <Input
          className=""
          key={""}
          type="date"
          // children
          iconColor=""
          logoPosition="both"
          // onChange={onChange}
          placeholder=""
          style={{}}
          value={value}
        />
      </Question> */}

      {/* <Options options={["one", "two", "three"]} optionsContainerStyle={{
        // flexDirection:'column'
        borderRadius:"0"
      }} optionsStyle={{
        color:"red"
      }} /> */}

      {/* <Label
        style={
          {
            // display:'flex',
            // background:'red',
            // color:"yellow",
            // width:"300px",
            // height:"400px",

            // fontSize:"25px",
            // margin:"25px",
            // padding:"25px"
          }
        }
      >
        Label
      </Label> */}

      {/* <QuestLabsFooterModule /> */}

      {/* <SearchModule style={{
        gap:"10px"
      }} >
        <SearchModuleIcon />
        <Input type="text" style={{
          input:{
            border:"none",
            width:"100%",
            padding:"0"
          }
        }}/>
      </SearchModule> */}

      {/* <TeaxtAreaWordCounter
        style={
          {
            // background:'red',
            // color:'yellow',
            // padding:"25px"
          }
        }
      >
        {`${120 - value.length}/120`}
      </TeaxtAreaWordCounter> */}

      {/* <Input
        type="email"
        placeholder="Enter..."
        value={value}
        style={{
          emailError: {
            color:'red'
          },
          input: {
            // background:'red',
            // width:"50px",
            // overflow:"hidden"
            // height:"400px"
          },
        }}
        onChange={onChange}
        // iconColor="red"
        logoPosition="both"
      >
        Error
      </Input> */}

      {/* <TextArea style={{
        background:"yellow",
        color:"red",
        padding:"50px",
        // width:"50px"
        // height:"400px"
        
      }} onChange={onChange} value={value}/>

     

      {/* <SearchComponent
        open={true}
        offlineFormatData={[
          {
            icon: "Layers",
            link: "/admin/campaigns",
            text: "Campaigns",
            description: "",
          },
          {
            icon: "Layers",
            link: "/admin/campaigns/template",
            text: "Create Campaign",
            description: "",
          },
          {
            icon: "membershipsIcon",
            link: "/admin/memberships",
            text: "Memberships",
            description: "",
          },
          {
            icon: "settingsIcon",
            link: "/admin/settings",
            text: "Settings",
            description: "",
          },
          {
            icon: "Audience",
            link: "/admin/audience",
            text: "Audience",
            description: "",
          },
        ]}
      >
        */}

      {/* <OnboardingOffline /> */}

      {/* <FeedbackWorkflow
        isOpen={true}
        offlineFormData={[
          [
            {
              type: "RATING",
              question: "Rating",
              options: [""],
              criteriaId: "ec-84192fef-c91c5-d4ace713aaeb",
              required: true,
            },
            {
              type: "USER_INPUT_EMAIL",
              question: "Enter your Email",
              options: [""],
              criteriaId: "ec-84192fef-c917-410f-4ace713aae",
              required: true,
            },
            {
              type: "USER_INPUT_TEXTAREA",
              question: "Comment",
              options: [""],
              criteriaId: "ec-84192fef-c917-410f-9d4ace713aae",
              required: true,
            },
            {
              type: "USER_INPUT_IMAGE",
              question: "",
              criteriaId: "ec-e32b88d7-0e43-4254-9c94-44859ceedcdc",
              required: true,
            },
          ],
          [
            {
              type: "USER_INPUT_TEXT",
              question: "Title",
              options: [""],
              criteriaId: "ec-84192fef-c917-410f-4ace713aee",
              required: true,
              placeholder: "",
            },
            {
              type: "USER_INPUT_EMAIL",
              question: "Email",
              options: [""],
              criteriaId: "ec-84192fef-c917-410f-9ace713aef",
              required: true,
              placeholder: "",
            },
            {
              type: "USER_INPUT_TEXTAREA",
              question: "Bug",
              options: [""],
              criteriaId: "ec-84192fef-c7-410f-9bc5-d4ce713aaeg",
              required: true,
              placeholder: "",
            },
          ],
          [
            {
              type: "USER_INPUT_TEXT",
              question: "What feature are you missing?",
              options: [""],
              criteriaId: "ec-84192fef-c917-410f-d4ace713aeh",
              required: true,
              placeholder: "",
            },
            {
              type: "USER_INPUT_EMAIL",
              question: "Your email address",
              options: [""],
              criteriaId: "ec-84192fef-c917-4101jioaaei",
              required: true,
              placeholder: "",
            },
            {
              type: "USER_INPUT_TEXT",
              question: "Tell us more about the problem",
              options: [""],
              criteriaId: "ec-84192fef-c9170f-9bc5acjie713aaej",
              required: true,
              placeholder: "",
            },
          ],
          [
            {
              type: "LINK_OPEN_READ",
              question: "",
              criteriaId: "ec-e32b88d7-0e43-4254-9c94-44859ceedcdc",
              required: true,
            },
          ],
        ]}
      /> */}
    </div>
  );
}
