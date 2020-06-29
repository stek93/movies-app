import React from "react";
import '../styles/index.css';
import { AppProps } from "next/app";
import { UserProvider } from "../services/UserContext";

const MoviesApp = ({ Component, pageProps }: AppProps) => {
    return (
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    );
}

export default MoviesApp;