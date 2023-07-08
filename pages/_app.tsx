import "@/styles/globals.css";
// Next
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";

const poppinsFont = Poppins({
  subsets: ["latin-ext"],
  weight: ["400", "500", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={poppinsFont?.className}>
      <Component {...pageProps} />
    </div>
  );
}
