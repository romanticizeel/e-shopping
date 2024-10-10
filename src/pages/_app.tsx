import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Lato } from "next/font/google";
import Navbar from "@/components/fragments/Navbar";
import { useRouter } from "next/router";
import { disableNavbar } from "@/config/disableNavbar";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { pathname } = useRouter(); // Get the current pathname

  return (
    <SessionProvider session={session}>
      <main className={lato.className}>
        {!disableNavbar.includes(pathname.split("/")[1]) && <Navbar />}
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
