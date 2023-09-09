# Quest React SDK

Welcome to the Quest React SDK repository! This library provides a set of reusable React components.

## Features

- **Login Component**: Our login component offers a straightforward way to integrate secure user authentication into your React applications. Easily customize the login UI with a variety of options and flow to match your project's requirements.

- **Onboarding**: In addition to the login component, we provide Onboarding component which contains quizzes for users.

## Getting Started

To get started using the Quest React SDK, follow these simple steps:

1. **Installation**: Add the SDK to your project by including it as a dependency. Detailed installation instructions can be found in the documentation.

2. **Usage**: import the CSS, import the QuestProvider component, pass the required props to it (apiKey, apiSecret, entityId). now add the component inside, pass the props and you are good to go! 

## Example

To see the Quest React SDK in action, check out our [live demo](link-to-your-demo) or explore the example folder in this repository for sample usage.

## Props of QuestProvider component

The `QuestProvider` component accepts the following props:

- `entityId` (string, required): An entity identifier for your application.
- `apiKey` (string, required): An API key for your application.
- `apiSecret` (string, required): An API secret for your application.

## Props of Login component

The `QuestLogin` component accepts the following props:

- `googleClientId` (string, required): The Google Client ID for OAuth 2.0 authentication.

- `redirectUri` (string, required for google): The URI where users will be redirected after authentication.(this URL should match the one configured in your OAuth provider)  [Google Console](https://console.cloud.google.com/apis/credentials/oauthclient).

- `redirectURL` (string, required): The URL where users will be redirected after authentication. 
- `btnColor` (string, optional): The background color of the login button. Defaults to a platform-specific color if not specified.
- `email` (boolean, optional): If `true`, includes an option for users to log in with their email.
- `google` (boolean, optional): If `true`, includes an option for users to log in with Google.
- `btnTextColor` (string, optional): The text color of the login button. Defaults to a platform-specific color if not specified.
- `textColor` (string, optional): The text color of other UI elements in the component. Defaults to a platform-specific color if not specified.
- `backgroundColor` (string, optional): The background color of the entire component. Defaults to a platform-specific color if not specified.
- `font` (string, optional): The font style for text in the component. Defaults to a platform-specific font if not specified.

### Example Usage
You have to wrap the components inside QuestProvider and You have to import the CSS too along with the components. 
```
import '@questlabs/react-sdk/dist/style.css';
```

```jsx
<QuestProvider apiKey="k-xxxxxxxxxxxxxxxxxxxxxx" apiSecret="s-xxxxxxxxxxxxxxx-xxxxxxxxxxxx" entityId="e-xxxxxxx-xxxx-xxxw16">
  <QuestLogin
    font='script'
    textColor='blue'
    btnTextColor="white"
    btnColor="#8B0000"
    backgroundColor="gray"
    googleClientId="103xxxxxxxxxxxxxxxxxxxxxxa.apps.googleusercontent.com"
    redirectUri="http:xxxxxxxxxx"
    redirectURL="http:xxxxxxx"
  />
</QuestProvider>
```

## Props of Onboarding component

The `Onboarding` component accepts the following props:

- `token` (string, required): A userToken which you get after login need to pass here to fetch the data.
- `questId` (string, required):  This take a particular questId to fetch the data.
- `answer` (useState property(get), required): To read all answer.
- `setAnswer` (useState property(set), required): To set all the answer according to their id's.
- `color` (string, optional): To set a color in all lebels.
- `bgColor` (string, optional): To set the background color on the webpage.
- `headingSize` (string, optional): To add a fontSize of headings.
- `descSize` (string, optional): To add a fontSize of description.
- `inputFieldType` (object, optional): By this we add the type of a specific input box. Eg. {"ec-d176b702-2a05-4394-83ce-a1657e26dfd9": "textArea"} //The input box of that particular id is set as textarea.
- `btnColor` (string, optional): To add a color to all buttons.
- `btnSize` (string, optional): Give a size of your buttons
- `inputBgColor` (string, optional): To add a background color in all input fields.
- `inputBorder` (string, optional): To set border property of input boxes.
- `singleChoice` (string, optional): Select a single-choice design, it can be `modal1` or `modal2`, initially it selected `modal1`.
- `multiChoice` (string, optional): Select a multi-choice design, it can be `modal1` or `modal2`, initially it selected `modal1`.
- `design` (arrar of array, optional): Using this field we can divide questions into screens, rearrange the questions. Eg. [ [ 2, 3 ], [ 1, 4 ] ] //It means 2nd and 3rd show on 1st screen and 1st and 4th show on 2nd screens.
- `headingScreen` (array of array / object, optional): Using this field we can add a heading in all screens or add different headings for different screens. Eg. 1. [ { name: “n1”, desc: “d1” }, { name: “n2”, desc: “d2” } ] // It means n1 and d1 show on 1st screen and n2 and d2 show on 2nd screens. 2. { name: “n1”, desc: “d1” } //  It means n1 and d1 show on all screen
- `answers` (callback function, optional): It’s a callback function to get an answer
- `customComponents` (component, optional): To pass a custom component if you want.
- `customComponentPositions` (number, optional): To set a position of your custom component.
- `getAnswers` (callback function, optional): To get all the answer after completion of all required questions.

### Example Usage
You have to wrap the components inside QuestProvider and You have to import the CSS too along with the components. 
```
import '@questlabs/react-sdk/dist/style.css';
```

```jsx
<QuestProvider
  apiKey="k-xxxxxxxxxxxxxxxxx"
  apiSecret="s-xxxxxxxxxxxxxxxxxxxxxxxxxxx"
  entityId="e-xxxxxxxxxxxx"
>
  <OnBoarding
    questId="q-xxxxxxxxxxxxxx"
    userId="u-xxxxxxxxxxxxxx"
    token="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxI"
    answer={answer}
    setAnswer={setAnswer}
    color="black"
    bgColor="gray"
    headingSize="24px"
    descSize="18px"
    inputFieldType={{
      "ec-xxxxxxxxxxxxxxxxx": "textArea",
    }}
    btnColor="#0284fe"
    btnSize="200px"
    inputBgColor="#e5e7eb"
    inputBorder="1px solid gray"
    singleChoose="modal1"
    multiChoice="modal2"
    design={[[1, 2], [3, 4, 5], [6, 7]]}
    headingScreen={{name : "n1", desc : "d1"}}
    customComponents={<CustomButton />}
    customComponentPositions={5}
    getAnswers={printAnswer}
  />
</QuestProvider>
```

## Props of Feedback component

The `Onboarding` component accepts the following props:

- `token` (string, required): A userToken which you get after login need to pass here to fetch the data.
- `questId` (string, required):  This take a particular questId to fetch the data.
- `userId` (string, required): This is your quest User ID.
- `textColor` (string, optional): To set a color of the text.
- `bgColor` (string, optional): To set the background color on the webpage.
- `btnColor` (string, optional): To add a color to all buttons.
- `btnTextColor` (string, optional): The text color of the login button. Defaults to a platform-specific color if not specified.
- `font` (string, optional): The font style for text in the component. Defaults to a platform-specific font if not specified.
- `heading` (string, required): heading of the component
- `subheading` (string, required): sub heading of the component

## Contributing

We welcome contributions from the community! If you find a bug, have an idea for an enhancement, or want to contribute code, please refer to our [contribution guidelines](link-to-contributing-guidelines).

## Support

If you encounter any issues or have questions while using the Quest React SDK, please don't hesitate to [reach out to us](link-to-support).

## License

The Quest React SDK is open-source and available under the [MIT License](link-to-license).
