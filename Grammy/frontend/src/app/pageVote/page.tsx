"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import GlobalStyle from "../../styles/GlobalStyle";
import Card from "../../components/Cards";
import { getCurrentVoting, addVote } from "@/services/Web3Services";
import {
  MainContainer,
  Container,
  TopHearder,
  H1,
  Nav,
  DivTitle,
  P,
  P_end,
  DivCard,
  DivGraphical,
  DivMsg,
} from "../../styles/pageVoteStyles";

export default function PageVote() {
  const { push } = useRouter();
  const [activeDiv, setActiveDiv] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [voting, setVoting] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Função para buscar dados de votação
    const fetchVoting = async () => {
      setLoading(true);
      try {
        const result = await getCurrentVoting();
        setVoting(result);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching voting data:", error.message);
        } else {
          console.error("Error fetching voting data:", error);
        }
        setMessage("No active voting available.");
      } finally {
        setLoading(false);
      }
    };

    fetchVoting();
  }, []); // Nenhuma dependência para garantir execução única.

  const handleDivClick = async (divNumber: number, singerName: string) => {
    setActiveDiv(divNumber);
    setMessage(`Processing vote for ${singerName}...`);
    try {
      const receipt = await addVote(divNumber); // Certifique-se de que `addVote` está funcionando.
      setMessage(`You successfully voted for ${singerName}`);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Failed to vote for ${singerName}: ${error.message}`);
      } else {
        setMessage(`Failed to vote for ${singerName}`);
      }
    }
  };


  return (
    <>
      <Head>
        <title>Grammy</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Diplomata&display=swap"
          rel="stylesheet"
        />
      </Head>

      <GlobalStyle />

      <MainContainer>
        <TopHearder>
          <H1>VOTE FOR THE</H1>
          <Nav>
            <p>Grammy Awards</p>
            <p>Best Singer</p>
            <p>2025 Edition</p>
            <img src="/images/metamask.png" alt="metamask logo" />
          </Nav>
        </TopHearder>
        <Container>
          <DivTitle>
            <h2>BEST SINGER OF 2025</h2>
          </DivTitle>
          <P_end>
            <p>GRAMMY</p>
          </P_end>
          <P>Vote for the best singer of 2025.</P>
          <DivCard>
            <Card
              name="Taylor Swift"
              subtitle="Nominee"
              year={2025}
              image="/images/taylorSwift.webp"
              icon="/images/vitrola.png"
            />
            <Card
              name="Ed Sheeran"
              subtitle="Nominee"
              year={2025}
              image="/images/edSheeran.jpg"
              icon="/images/vitrola.png"
            />
            <Card
              name="Benson Boone"
              subtitle="Nominee"
              year={2025}
              image="/images/BensonBoone.avif"
              icon="/images/vitrola.png"
            />
          </DivCard>
          <DivGraphical>
            <div
              onClick={() => handleDivClick(1, "Taylor Swift")}
              className={activeDiv === 1 ? "active" : ""}
            >
              <p>Taylor Swift</p>
            </div>
            <div
              onClick={() => handleDivClick(2, "Ed Sheeran")}
              className={activeDiv === 2 ? "active" : ""}
            >
              <p>Ed Sheeran</p>
            </div>
            <div
              onClick={() => handleDivClick(3, "Benson Boone")}
              className={activeDiv === 3 ? "active" : ""}
            >
              <p>Benson Boone</p>
            </div>
          </DivGraphical>
          <DivMsg>
            <p>{message}</p>
          </DivMsg>
        </Container>
      </MainContainer>
    </>
  );
}
