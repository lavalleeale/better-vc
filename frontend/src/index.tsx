/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/GlobalStyles.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
    <CookiesProvider>
        <App />
    </CookiesProvider>,
    document.getElementById("root")
);

serviceWorkerRegistration.register();
