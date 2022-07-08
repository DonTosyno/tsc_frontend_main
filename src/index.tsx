import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import rootReducer from "./redux/reducers";
import { legacy_createStore as createStore } from "redux";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/theme.css";
import "./assets/css/index.css";
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);
const store = createStore(rootReducer);
root.render(
  <CookiesProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </CookiesProvider>
);
