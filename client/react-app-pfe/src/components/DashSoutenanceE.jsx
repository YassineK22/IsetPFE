import React, { useState, useEffect } from "react";
import ResultatStageE from "./ResultatStageE";
import axiosInstance from "./axiosInstance";
import EnvoyerRapport from "./EnvoyerRapport";

const DashSoutenanceE = () => {
  const [etatSoutenance, setEtatSoutenance] = useState(null);

  const payloadSM = JSON.parse(localStorage.getItem("payload_SM"));

  const changeNoEtat = async () => {
    try {
      // const response = await axiosInstance.patch(
      //   `/Soutenance/change-etat/NoEtat/etudiant/${payloadSM.sub}`
      // );
      console.log(response.data);
      setEtatSoutenance(response.data.etatSoutenance);
    } catch (error) {
      console.error("Error fetching Soutenance data:", error);
    }
  };

  useEffect(() => {
    const getSoutenace = async () => {
      try {
        const response = await axiosInstance.get(
          `/soutenance/etudiant/${payloadSM.sub}`
        );
        console.log(response)
        setEtatSoutenance(response.data.soutenances.etat);
      } catch (error) {
        console.error("Error fetching Soutenance:", error);
      }
    };

    getSoutenace();
  }, [etatSoutenance]);

  // Render the component based on the value of etatSoutenance
  const renderComponentBasedOnEtatSoutenance = () => {
    switch (etatSoutenance) {
      case "premier":
        return (
          <div className="text-yellow-600">
            En attente d'affectation des jury
          </div>
        );
      case "Attpremier":
        return (
          <div className="text-yellow-600">
            Soutenance EnAttente d'acceptation
          </div>
        );
      case "nonPremier":
        return (
          <div className="text-red-600">
            Soutenance non accepté
            <button
              onClick={() => {
                changeNoEtat();
              }}
              className="block text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              type="button"
            >
              Renoyver le Rapport
            </button>
          </div>
        );
      case "enAttenteS":
        return (
          <div className="text-teal-600">En attente d'affectation de note</div>
        );
      case "noteDonner":
        return (
          <div className="text-gray-500">
            En attente de la validation de note par le responsable
          </div>
        );
      case "noteValider":
        return <ResultatStageE />;
      case "noteNValider":
        return <div className="text-red-600">La note n'est pas Valider</div>;
      default:
        return <EnvoyerRapport />;
    }
  };

  return <div>{renderComponentBasedOnEtatSoutenance()}</div>;
};

export default DashSoutenanceE;
