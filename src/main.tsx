import React from "react";
import { createRoot } from "react-dom/client"; 
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement !== null) {
  createRoot(rootElement).render(<App />);
} else {
  throw new Error("Root element not found in the document");
}
