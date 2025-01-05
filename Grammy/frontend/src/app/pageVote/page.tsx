"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import GlobalStyle from "../../styles/GlobalStyle";
import Card from "../../components/Cards";
import { addVote, getVotingResults } from "@/services/Web3Services";
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
type ResultData = {
  option: string;
  votes: number;
};

export default function PageVote() {
  const [activeDiv, setActiveDiv] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [results, setResults] = useState<ResultData[]>([]);

  useEffect(() => {
    const fetchVotingResults = async (): Promise<void> => {
      try {
        const votingResults = await getVotingResults();
        setResults(votingResults);
      } catch (error) {
        console.error("Error fetching voting results:", error);
        setMessage("An unexpected error occurred while fetching results. ❌");
      }
    };

    fetchVotingResults();
  }, []);

  const handleDivClick = async (
    divNumber: number,
    singerName: string
  ): Promise<void> => {
    setActiveDiv(divNumber);
    setMessage(`Processing vote for ${singerName}...`);

    try {
      await addVote(divNumber);
      setMessage(
        `Your vote for ${singerName} has been successfully registered! 🎉`
      );

      // Atualiza os resultados após o voto
      const updatedResults = await getVotingResults();
      setResults(updatedResults);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("You already voted")) {
          setMessage(
            "You have already voted! Each user can only vote once per session. 🛑"
          );
        } else if (error.message.includes("Invalid option")) {
          setMessage(
            "Invalid vote option selected. Please choose a valid candidate. ⚠️"
          );
        } else if (error.message.includes("Voting is closed")) {
          setMessage(
            "Voting for this session has closed. Thank you for your interest! ⏳"
          );
        } else {
          setMessage(
            "An error occurred while processing your vote. Please try again later. ❌"
          );
        }
      } else {
        console.error("Unknown error occurred:", error);
        setMessage("An unknown error occurred. Please try again later. ❌");
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
            <img
              src="/images/metamask.png"
              alt="metamask logo"
              width={50}
              height={50}
            />
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
                  backgroundColor: message.includes("successfully")
                    ? "#d4edda"
                    : "#f8d7da",
                  padding: "10px",
                  borderRadius: "5px",
                  marginTop: "20px",
                  textAlign: "center",
                  fontWeight: "bold",
                  whiteSpace: "pre-wrap",
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
