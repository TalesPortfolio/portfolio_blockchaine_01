import React, { useState } from "react";
import Head from "next/head";
import { getCampaign, donate } from "@/services/Web3Service";
import { Container, SearchDiv } from "../css/doneteStyles";
import GlobalStyles from "../../GlobalStyles";
import Footer from "../app/components/footer/Footer";
import { P,H1,Input,DivInput } from "@/css/doneteStyles";

const Donate = () => {
  const [campaign, setCampain] = useState({});
  const [donation, setDonation] = useState(0);
  const [message, setMessage] = useState("");

  function onChangeId(evt) {
    campaign.id = evt.target.value;
  }

  function btnSearchClick() {
    setMessage("Searching, please wait...");
    getCampaign(campaign.id)
      .then((result) => {
        console.log("Campaign result: ", result); // Adicione isso para verificar o retorno
        setMessage("");
        setCampain({
          ...result,
          id: campaign.id,
          balance: result.balance || 0,
        });
      })
      .catch((err) => setMessage(err.message));
  }

  function onChangeValue(evt) {
    setDonation(evt.target.value);
  }

  function btnDonateClick() {
    setMessage("Donating, please wait...");
    donate(campaign.id, donation)
      .then((tx) => {
        setMessage(
          `Donation made successfully. Tx hash: ${tx.transactionHash}`
        );
      })
      .catch((err) => setMessage(err.message));
  }

  return (
    <>
      <GlobalStyles />
      <Head>
        <title>Donate Crypto | Make a donation</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="Generated by Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container>
        {!campaign.id ? (
          <>
            <SearchDiv>
              <div>
                <h1>Donate Crypto</h1>
                <h2>What is the campaign ID you are looking for?</h2>
                <input
                  type="number"
                  id="campaignId"
                  onChange={onChangeId}
                  value={campaign.id}
                />
                <input type="button" value="Search" onClick={btnSearchClick} />
              </div>
              <Footer />
            </SearchDiv>
          </>
        ) : (
          <Container>
            <H1>
              Please check if this is the right campaign before finalizing your
              donation.
            </H1>
            <hr />
            <div>
              <div>
                {campaign.videoUrl ? (
                  <iframe
                    width="100%"
                    height="480"
                    src={campaign.videoUrl}
                  ></iframe>
                ) : (
                  <img src={campaign.imageUrl} width="640" height="480" />
                )}
              </div>
              <div>
                <P>{campaign.title}</P>
                <P>
                  <strong>Autor:</strong>
                  {campaign.author}
                </P>
                <P>
                  <strong>Description:</strong>
                  {campaign.description}
                </P>
                {campaign.videoUrl ? (
                  <P>
                    watch the video below to understand more about our campaign
                  </P>
                ) : null}
                <P>
                  So, what did you think of the project? It has already been
                  raised{" "}
                  {typeof campaign.balance === "bigint"
                    ? (campaign.balance / BigInt(10 ** 18)).toString()
                    : "0"}{" "}
                  BNB in this campaign
                </P>

                <P>How much do you want to donate?</P>
                <div>
                  <DivInput>
                    <Input
                      type="number"
                      id="donation"
                      onChange={onChangeValue}
                      value={donation}
                    />
                    <Input
                      type="button"
                      value="Donate"
                      onClick={btnDonateClick}
                    />
                  </DivInput>
                </div>
              </div>
            </div>
          </Container>
        )}
        {message ? <P>{message}</P> : null}
      </Container>
    </>
  );
};

export default Donate;