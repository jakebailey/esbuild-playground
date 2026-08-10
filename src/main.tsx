import { render } from "solid-js/web";

import { Root } from "./Root";

// oxlint-disable-next-line typescript/no-non-null-assertion
render(() => <Root />, document.querySelector("#root")!);
