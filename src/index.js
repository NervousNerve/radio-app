import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register(
      process.env.PUBLIC_URL + "/service-worker.js"
    );
  });
}
