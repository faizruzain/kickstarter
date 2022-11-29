import React from "react";
import { useParams } from "react-router-dom";

function CampaignPage() {
  let { address } = useParams();
  return <h1>This is Campaign Page of {address}</h1>;
}

export default CampaignPage;
