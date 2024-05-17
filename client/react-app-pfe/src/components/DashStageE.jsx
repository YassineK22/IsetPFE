import React, { useState, useEffect } from "react";
import DemandeEncadrement from "./DemandeEncadrement";
import ResultatStageE from "./ResultatStageE";
import DemandePFE from "./DemandePFE";
import axiosInstance from "./axiosInstance";

const DashStageE = () => {
  const [etatProjet, setEtatProjet] = useState(null);

  const payloadSM = JSON.parse(localStorage.getItem("payload_SM"));

  const changeNoEtat = async () => {
    try {
      const response = await axiosInstance.patch(
        `/projet/change-etat/NoEtat/etudiant/${payloadSM.sub}`
      );
      console.log(response.data);
      setEtatProjet(response.data.etatProjet);
    } catch (error) {
      console.error("Error fetching projet data:", error);
    }
  };

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
  }, [etatProjet]);

  // Render the component based on the value of etatProjet
  const renderComponentBasedOnEtatProjet = () => {
    switch (etatProjet) {
      case "premier":
        return <DemandeEncadrement />;
      case "Attpremier":
        return (
          <div className="text-yellow-600">Projet EnAttente d'acceptation</div>
        );
      case "nonPremier":
        return (
          <div className="text-red-600">
            Projet non accepté
            <button
              onClick={() => {
                changeNoEtat();
              }}
              className="block text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              type="button"
            >
              Refaire une autre Demande
            </button>
          </div>
        );
      case "enAttente":
        return (
          <div className="text-teal-600">
            En attente de l'acceptation de l'encadrement
          </div>
        );
      case "confirmer":
        return <ResultatStageE />;
      case "annuler":
        return (
          <div className="text-red-600">L'encadrement n'a pas accepté</div>
        );
      default:
        return <DemandePFE />;
    }
  };

  return <div>{renderComponentBasedOnEtatProjet()}</div>;
};

export default DashStageE;
