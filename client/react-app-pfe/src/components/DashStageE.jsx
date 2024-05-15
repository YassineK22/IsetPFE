import React from "react";
import DemandeEncadrement from "./DemandeEncadrement";
import ResultatStageE from "./ResultatStageE";
import DemandePFE from "./DemandePFE";

const DashStageE = () => {
  return (
    <div>
      <DemandePFE />
      <DemandeEncadrement />
      <ResultatStageE />
    </div>
  );
};

export default DashStageE;
