import "@/styles/globals.css";
import Toaster from "../components/common/Toaster";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}
