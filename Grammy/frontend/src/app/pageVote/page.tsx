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
  const [voting, setVoting] = useState<VotingData | null>(null); // Dados da votação atual
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento
  const [results, setResults] = useState<ResultData[]>([]); // Resultados da votação
  const [hasVoted, setHasVoted] = useState<boolean>(false); // Se o usuário já votou

  useEffect(() => {
    const fetchVoting = async (): Promise<void> => {
      setLoading(true);
      try {
        const result = await getCurrentVoting();
        setVoting(result as VotingData);

        // Busca os resultados da votação ao carregar
        const votingResults = await getVotingResults();
        setResults(votingResults);
      } catch (error) {
        if (error instanceof Error) {
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
      setMessage(`Your vote for ${singerName} has been successfully registered! 🎉`);
      setHasVoted(true);
    
      // Atualiza os resultados após o voto
      const updatedResults = await getVotingResults();
      setResults(updatedResults);
      console.log("Transaction receipt:", receipt);
    } catch (error: any) {
      // Tratando erros com mensagens genéricas para o usuário
      if (error?.message?.includes("You already voted")) {
        setMessage("You have already voted! Each user can only vote once per session. 🛑");
      } else if (error?.message?.includes("Invalid option")) {
        setMessage("Invalid vote option selected. Please choose a valid candidate. ⚠️");
      } else if (error?.message?.includes("Voting is closed")) {
        setMessage("Voting for this session has closed. Thank you for your interest! ⏳");
      } else {
        setMessage("An error occurred while processing your vote. Please try again later. ❌");
      }
  
      // Log completo do erro apenas no console para depuração
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
            {message && (
              <div
                style={{
                  color: message.includes("successfully") ? "green" : "red",
                  backgroundColor: "#f8d7da",
                  padding: "10px",
                  borderRadius: "5px",
                  marginTop: "20px",
                  textAlign: "left",
                  fontWeight: "bold",
                  whiteSpace: "pre-wrap", // Permite quebrar linhas
                }}
              >
                {message}
              </div>
            )}
          </DivMsg>

          {/* Exibe os resultados */}
          <div>
            <h3>Current Voting Results:</h3>
            <ul>
              {results.map((result, index) => (
                <li key={index}>
                  {result.option}: {result.votes} votes
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </MainContainer>
    </>
  );
}
