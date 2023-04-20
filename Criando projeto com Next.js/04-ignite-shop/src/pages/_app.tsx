import type { AppProps } from "next/app";
import { globalStyles } from "../styles/global";

import logoImg from "../assets/Logo.svg";
import { Container, Header } from "../styles/pages/app";

import Image from "next/image";

globalStyles();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg.src} width={100} height={100} alt="img" />
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
