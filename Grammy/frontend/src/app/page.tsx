"use client";
import { useState } from "react";
import React from "react";
import Head from "next/head";
import GlobalStyle from "../styles/GlobalStyle";
import { MainContainer, Content, Title, Img, ImgMeta, H2, P, Message } from "../styles/pageStyles";
import Button from "@/components/Button";
import { doLogin } from "@/services/Web3Services";
import { useRouter } from "next/navigation"; // Correção para App Router

export default function Home() {
  const router = useRouter(); // Hook para navegação no App Router
  const [message, setMessage] = useState(""); // Estado para a mensagem de erro

  async function btnLoginClick() {
    try {
      const account = await doLogin();
      setMessage(`Connected account: ${account}`);
      router.push("/pageVote"); // Redireciona para a página após login
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unknown error occurred");
      }
    }
  }

  return (
    <>
      {/* Metadados da Página */}
      <Head>
        <title>Grammy</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sansita+Swashed:wght@300..900&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Estilos Globais */}
      <GlobalStyle />

      {/* Conteúdo Principal */}
      <MainContainer>
        <Content>
          <Title>Vote For the <br />BEST SINGER<br />of 2025</Title>
          <Img src="/images/vitrola2.png" alt="vitrola" />
          <H2>Vote for the best singer of 2025</H2>
          <P>Connect your wallet to vote</P>
          <Button onClick={btnLoginClick}>CONNECT WALLET</Button>
          <Message>{message}</Message>
          <ImgMeta src="/images/metamask.png" alt="metamask logo" />
        </Content>
      </MainContainer>
    </>
  );
}
