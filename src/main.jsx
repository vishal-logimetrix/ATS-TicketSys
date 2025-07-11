import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
// import { TicketProvider } from "./context/TicketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <TicketProvider> */}
        <App />
      {/* </TicketProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
