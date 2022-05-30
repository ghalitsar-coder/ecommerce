import "../styles/globals.css";
import React from "react";
import { Layout } from "../components";
import store from "../redux/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Toaster />
        <Component {...pageProps} />;
      </Layout>
    </Provider>
  );
}

export default MyApp;
