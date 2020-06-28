import React from "react";
import '../styles/index.css';
import { AppProps } from "next/app";
import { AuthProvider } from "../services/AuthContext";

const MoviesApp = ({ Component, pageProps }: AppProps) => {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MoviesApp;