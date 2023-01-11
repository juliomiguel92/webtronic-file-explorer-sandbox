import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

/* const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement); */

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App tab="home" />);
