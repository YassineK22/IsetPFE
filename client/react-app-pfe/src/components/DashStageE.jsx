import React, { useState, useEffect } from "react";
import DemandeEncadrement from "./DemandeEncadrement";
import ResultatStageE from "./ResultatStageE";
import DemandePFE from "./DemandePFE";
import axiosInstance from "./axiosInstance";

const DashStageE = () => {
  const [etatProjet, setEtatProjet] = useState(null);

  const payloadSM = JSON.parse(localStorage.getItem("payload_SM"));

  useEffect(() => {
    const getProjet = async () => {
      try {
        const response = await axiosInstance.get(
          `/projet/etudiant/${payloadSM.sub}`
        );
        // Assuming that the response contains the etatProjet value
        setEtatProjet(response.data.etatProjet);
      } catch (error) {
        console.error("Error fetching projet:", error);
      }
    };

    getProjet();
  }, []);

  // Render the component based on the value of etatProjet
  const renderComponentBasedOnEtatProjet = () => {
    switch (etatProjet) {
      case "premier":
        return <DemandeEncadrement />;
      case "Attpremier":
        return <div>Projet EnAttente d'acceptation</div>;
      case "nonPremier":
        return <div>Projet non accepté</div>;
      case "enAttente":
        return <div>En attente de l'acceptation de l'encadrement</div>;
      case "confirmer":
        return <ResultatStageE />;
      case "annuler":
        return <div>L'encadrement n'a pas accepté</div>;
      default:
        return <DemandePFE />;
    }
  };

  return <div>{renderComponentBasedOnEtatProjet()}</div>;
};

export default DashStageE;
