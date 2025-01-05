"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import GlobalStyle from "../../styles/GlobalStyle";
import Card from "../../components/Cards";
import {
  getCurrentVoting,
  addVote,
  getVotingResults,
} from "@/services/Web3Services";

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

// Tipos
type VotingData = {
  option1: string;
  votes1: number;
  option2: string;
  votes2: number;
  option3: string;
  votes3: number;
  maxDate: number;
};

type ResultData = {
  option: string;
  votes: number;
};

export default function PageVote() {
  const { push } = useRouter();
  const [activeDiv, setActiveDiv] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [voting, setVoting] = useState<VotingData | null>(null); // Consistente no SSR
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<ResultData[]>([]);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  useEffect(() => {
    const fetchVoting = async (): Promise<void> => {
      setLoading(true);
      try {
        const result = await getCurrentVoting();
        setVoting(result as VotingData);
      } catch (error) {
        if (error instanceof Error) {
          //console.error("Error fetching voting data:", error.message);
          if (error.message.includes("No voting available")) {
            setMessage("No active voting available.");
          } else {
            setMessage("An unexpected error occurred.");
          }
        } else {
          console.error("Error fetching voting data:", error);
          setMessage("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVoting();
  }, []);

  const handleDivClick = async (divNumber: number, singerName: string): Promise<void> => {
    setActiveDiv(divNumber);
    setMessage(`Processing vote for ${singerName}...`);
    try {
      const receipt = await addVote(divNumber);
      setMessage(`You successfully voted for ${singerName}`);
      setHasVoted(true); // Marca como já votado
      console.log("Transaction receipt:", receipt);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("User denied transaction signature")) {
          setMessage("Transaction was cancelled.");
        } else {
          setMessage(`Failed to vote: ${error.message}`);
        }
      } else {
        setMessage("Failed to vote.");
      }
      console.error("Error while voting:", error);
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
      {/* Exibe a mensagem somente se já votou */}
      {hasVoted && message && <p>{message}</p>}
    </DivMsg>
        </Container>
      </MainContainer>
    </>
  );
}
