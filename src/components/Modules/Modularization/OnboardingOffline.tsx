import { useState } from "react";

import {
  Header,
  HeaderCloseButton,
  HeaderDesciption,
  HeaderHeading,
  HeaderTextContainer,
} from "../Header";

import QuestLabsFooter from "../QuestLabsFooterModule";
import { ComponentBody } from "../ComponentBody";
import { LabelModule } from "../LabelModule";
import { InputModule } from "../InputModule";
import { Question } from "../Question";
import { ButtonModule } from "../ButtonModule";
import { OptionsContainer } from "../OptionsContainer";
import { Option } from "../Option";

export default function OnBoardingOfflinePreview() {
  const [value, setValue] = useState("");
  const [state, setState] = useState([
    {
      type: "USER_INPUT_TEXT",
      question: "First name",
      options: [""],
      criteriaId: "ec-2733e056-350c-40d9-acfd-833882e99117",
      required: true,
      linkTitle: "",
      linkUrl: "",
      manualInput: false,
      placeholder: "",
    },
    {
      type: "USER_INPUT_TEXT",
      question: "Last name",
      options: [""],
      criteriaId: "ec-77026e10-1bdf-45fd-8523-29733212a359",
      required: true,
      linkTitle: "",
      linkUrl: "",
      manualInput: false,
      placeholder: "",
    },
    {
      type: "USER_INPUT_DATE",
      question: "Date Of Birth",
      options: [""],
      criteriaId: "ec-84192fef-c917-410f-9bc5-d4ace713aaea",
      required: true,
      linkTitle: "",
      linkUrl: "",
      manualInput: false,
      placeholder: "",
    },
    {
      type: "USER_INPUT_TEXT",
      question: "What is your company name?",
      options: [""],
      criteriaId: "ec-bf34d35d-11bd-4ebd-a1e1-76a81e1beec1",
      required: true,
      linkTitle: "",
      linkUrl: "",
      manualInput: false,
      placeholder: "",
    },
    {
      type: "USER_INPUT_SINGLE_CHOICE",
      question: "Your hobbies?",
      options: ["Playing", "Coding", "Gaming"],
      criteriaId: "ec-87fb0e54-c0e3-4fad-a865-37da2f9d68fb",
      required: true,
      linkTitle: "",
      linkUrl: "",
      manualInput: false,
      placeholder: "",
    },
    {
      type: "USER_INPUT_TEXT",
      question: "What is your role in the company?",
      options: [""],
      criteriaId: "ec-d8a11765-2493-40da-ad76-2d9f55ac8d9f",
      required: true,
      linkTitle: "",
      linkUrl: "",
      manualInput: false,
      placeholder: "",
    },
  ]);

  const onChange = (e:any) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };
  return (
    <div
      style={{
        width: "400px",
      }}
    >
      <Header>
        <HeaderTextContainer>
          <HeaderHeading headingText="Head" />
          <HeaderDesciption descriptionText="Desc" />
        </HeaderTextContainer>
        <HeaderCloseButton />
      </Header>

      <ComponentBody questionData={state}>
        {state?.map((criteria, index) => {
          return (
            <Question>
              <LabelModule style={{}}>{criteria.question}</LabelModule>

              {(criteria?.type === "USER_INPUT_TEXT" && (
                <InputModule
                  className=""
                  key={""}
                  type={"text"}
                  iconColor=""
                  logoPosition="right"
                  onChange={onChange}
                  placeholder=""
                  style={{}}
                  value={value}
                />
              )) ||
                (criteria?.type === "USER_INPUT_DATE" && (
                  <InputModule
                    className=""
                    key={""}
                    type={"date"}
                    iconColor=""
                    logoPosition="right"
                    onChange={onChange}
                    placeholder=""
                    style={{}}
                    value={value}
                  />
                )) ||
                (criteria?.type === "USER_INPUT_SINGLE_CHOICE" && (
                  <OptionsContainer>
                    {criteria?.options?.map((value, index) => {
                      return (
                        <Option
                          onClick={() => {
                            console.log(value);
                          }}
                        >
                          {value}
                        </Option>
                      );
                    })}
                  </OptionsContainer>
                ))}
            </Question>
          );
        })}
        <ButtonModule type="button">Submit</ButtonModule>
      </ComponentBody>

      <QuestLabsFooter />
    </div>
  );
}
