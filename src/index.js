import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import App from "./App";

/* const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement); */

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App tab="home" />
        </PersistGate>
    </Provider>
);
