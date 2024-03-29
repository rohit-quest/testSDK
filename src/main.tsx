import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

if (typeof document !== 'undefined') {
  const rootElement = document.getElementById("root");
  if (rootElement !== null) {
    ReactDOM.render(<App />, rootElement);
  } else {
    throw new Error("Root element not found in the document");
  }
} else {

  console.error("The document object is not available. Cannot render React app.");
}