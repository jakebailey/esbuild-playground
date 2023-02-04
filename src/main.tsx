import React from "react";
import ReactDOM from "react-dom/client";
3
import { Root } from "./Root";

ReactDOM.createRoot(document.querySelector("#root")!).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
);
