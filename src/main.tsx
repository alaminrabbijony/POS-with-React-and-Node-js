import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import ErrorBoundary from "./comp/ErrorBoundary.js";

import App from "./app.js";

import { Provider } from "react-redux";
import store from "./store/redux/store.js";
// Ensure TypeScript knows this element is not null
const rootEl = document.getElementById("app") as HTMLElement;

ReactDOM.createRoot(rootEl).render(
  <StrictMode>
   <Provider store={store}>
       <ErrorBoundary>
      <App />
    </ErrorBoundary>
   </Provider>
  </StrictMode>
);
