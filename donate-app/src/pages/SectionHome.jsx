import React, { useState, useEffect } from "react";
import { Button, Container, ContaineBtn, Img, Description, H1, P, Span } from "../css/sectionHomeStyles"; // Importando o botão estilizado de outro arquivo
import { doLogin } from "@/services/Web3Service";
import Header from "../app/components/header/Header";
import Link from "next/link";
import Footer from "@/app/components/footer/Footer";

const SectionHome = () => {
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");

  // Função para verificar se há carteira armazenada no localStorage ao carregar a página
  useEffect(() => {
    const savedWallet = localStorage.getItem("walletAddress");
    if (savedWallet) {
      setWallet(savedWallet); // Se já existir, atualiza o estado da carteira
    }
  }, []);

  const connectWallet = () => {
    doLogin()
      .then((wallet) => {
        setWallet(wallet);
        localStorage.setItem("walletAddress", wallet); // Armazena a carteira no localStorage
      })
      .catch((error) => setError(error.message));
  };

  return (
    <>
      {!wallet ? (
        <Container>
          <Header />
          <p>{wallet}</p>
          <p>{error}</p>
          <Button size="large" onClick={connectWallet}>
            <Img src="/icon/metamask1.png" alt="" /> Conect Wallet!
          </Button>
          <Footer />
        </Container>
      ) : (
        <Container>
          <Header />
          <Description>
            <P>Welcome <Span>{wallet}</Span></P>
            <P>Your decentralized donation platform.</P>
            <P>Create your campaign or donate to existing campaigns</P>
          </Description>
          <ContaineBtn>
            <div>
              <Button size="large">
              <Link href="/donate">I want to make a donation</Link>{" "}
            </Button>
            <Button size="large">
              <Link href="/createCampaign">I want to create a campaign</Link>{" "}
            </Button>
            </div>
            <Footer />
          </ContaineBtn>
          
        </Container>
      )}
    </>
  );
};

export default SectionHome;
