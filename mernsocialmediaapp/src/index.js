import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom"
import CssBaseline from "@mui/material/CssBaseline";
import {store} from './reducer'
import "./index.scss";
import {Provider} from "react-redux";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <>
        <CssBaseline />
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        </ThemeProvider>
    </>
);
