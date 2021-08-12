import "../../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  console.log("hello from app");

  return <Component {...pageProps} />;
}
export default MyApp;
