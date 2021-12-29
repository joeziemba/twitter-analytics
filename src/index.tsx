import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { TwitterContextProvider } from "./contexts/FollowersContext";
import { ControlsContextProvider } from "./contexts/ControlsContext";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TwitterContextProvider>
        <ControlsContextProvider>
          <App />
        </ControlsContextProvider>
      </TwitterContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
