import "@/styles/globals.css";
import { ReactElement } from "react";
// Next
import { Poppins } from "next/font/google";
// Interface
interface AppProps {
  Component: any;
  pageProps: any;
}

const poppinsFont = Poppins({
  subsets: ["latin-ext"],
  weight: ["400", "500", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return (
    <div className={poppinsFont?.className}>
      {getLayout(<Component {...pageProps} />)}
    </div>
  );
}
