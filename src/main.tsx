import React from "react";
import ReactDOM from "react-dom/client";

import { Root } from "./Root";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.querySelector("#root")!).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
);
