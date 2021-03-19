/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import type { AppProps } from "next/app";
import Header from "../components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div>
            <Header />
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
