import type { AppProps } from "next/app";
import styled from "@emotion/styled";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "../store";
import theme from "../theme";
import "../styles/global.scss";
import "react-toastify/dist/ReactToastify.css";

import { StyledToastContainer } from "./index.styles";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <StyledToastContainer
          position="top-right"
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}
