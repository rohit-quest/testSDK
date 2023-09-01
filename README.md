# Quest React SDK

Welcome to the Quest React SDK repository! This library provides a set of reusable React components.

## Features

- **Login Component**: Our login component offers a straightforward way to integrate secure user authentication into your React applications. Easily customize the login UI with a variety of options and flow to match your project's requirements.

- **Onboarding**: In addition to the login component, we provide a collection of other React components and utilities that can enhance your application's functionality and user experience.

## Getting Started

To get started using the Quest React SDK, follow these simple steps:

1. **Installation**: Add the SDK to your project by including it as a dependency. Detailed installation instructions can be found in the documentation.

2. **Usage**: Integrate the login component into your application, configure it to work with your authentication system, and start providing a seamless login experience for your users.

## Documentation

For comprehensive usage instructions, configuration options, and examples, please refer to our [documentation](link-to-your-documentation).

## Example

To see the Quest React SDK in action, check out our [live demo](link-to-your-demo) or explore the example folder in this repository for sample usage.

## Props of Login component

The `QuestLogin` component accepts the following props:

- `googleClientId` (string, required): The Google Client ID for OAuth 2.0 authentication.

- `redirectUri` (string, required for google): The URI where users will be redirected after authentication.(this URL should match the one configured in your OAuth provider)  [Google Console](https://console.cloud.google.com/apis/credentials/oauthclient).

- `redirectURL` (string, required): The URL where users will be redirected after authentication. 

- `entityId` (string, required): An entity identifier for your application.

- `apiKey` (string, required): An API key for your application.

- `apiSecret` (string, required): An API secret for your application.

- `btnColor` (string, optional): The background color of the login button. Defaults to a platform-specific color if not specified.

- `email` (boolean, optional): If `true`, includes an option for users to log in with their email.

- `google` (boolean, optional): If `true`, includes an option for users to log in with Google.

- `btnTextColor` (string, optional): The text color of the login button. Defaults to a platform-specific color if not specified.

- `textColor` (string, optional): The text color of other UI elements in the component. Defaults to a platform-specific color if not specified.

- `backgroundColor` (string, optional): The background color of the entire component. Defaults to a platform-specific color if not specified.

- `font` (string, optional): The font style for text in the component. Defaults to a platform-specific font if not specified.

### Example Usage

```jsx
<QuestLogin
  font='script'
  textColor='blue'
  btnTextColor="white"
  btnColor="#8B0000"
  backgroundColor="gray"
  googleClientId="103xxxxxxxxxxxxxxxxxxxxxxa.apps.googleusercontent.com"
  entityId="e-xxxxxxx-xxxx-xxxw16"
  redirectUri="http:xxxxxxxxxx"
  redirectURL="http:xxxxxxx"
  apiKey="k-xxxxxxxxxxxxxxxxxxxxxx"
  apiSecret="s-xxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxx-xxxxxxxxxxx"
/>
```

## Contributing

We welcome contributions from the community! If you find a bug, have an idea for an enhancement, or want to contribute code, please refer to our [contribution guidelines](link-to-contributing-guidelines).

## Support

If you encounter any issues or have questions while using the Quest React SDK, please don't hesitate to [reach out to us](link-to-support).

## License

The Quest React SDK is open-source and available under the [MIT License](link-to-license).
