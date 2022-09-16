import "../styles/globals.css";
import "../styles/variables.scss";
import type { AppProps } from "next/app";
import GeneralLayout from "../layout/general/GeneralLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GeneralLayout>
      <Component {...pageProps} />
    </GeneralLayout>
  );
}

export default MyApp;
