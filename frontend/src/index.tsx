import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/GlobalStyles.css";

ReactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  document.getElementById("root")
);
