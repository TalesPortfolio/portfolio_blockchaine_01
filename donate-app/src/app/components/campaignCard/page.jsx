import React from "react";
import { Content, Status, Img } from "./styles";

const CampaignCard = ({ campaign }) => {
  const shortDescription =
    campaign.description.length > 400
      ? `${campaign.description.substring(0, 400)}...`
      : campaign.description;
  return (
    <Content>
      <h2>{campaign.title}</h2>
      <p>{shortDescription}</p>
      <Img src={campaign.imageUrl || "https://via.placeholder.com/300x200"} alt={campaign.title} />
      <Status active={campaign.active}>
        {campaign.active ? "Active" : "Inactive"}
      </Status>
    </Content>
  );
};

export default CampaignCard;
