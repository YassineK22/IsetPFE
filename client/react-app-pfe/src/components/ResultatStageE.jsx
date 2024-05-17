import React, { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";

const ResultatStageE = () => {
  const payloadSM = JSON.parse(localStorage.getItem("payload_SM"));
  const [etatSoutenance, setEtatSoutenance] = useState(null);
  const [noteTechnique, setNoteTechnique] = useState(null);
  const [notePresentation, setNotePresentation] = useState(null);
  const [noteGeneral, setNoteGeneral] = useState(null);

  useEffect(() => {
    const getSoutenace = async () => {
      try {
        const response = await axiosInstance.get(
          `/soutenance/etudiant/${payloadSM.sub}`
        );
        console.log(response);
        const response2 = await axiosInstance.get(
          `/soutenance/${response.data.soutenances._id}/resultat`
        );
        console.log(response2);
        setEtatSoutenance(response.data.soutenances.etat);
        setNoteTechnique(response.data.soutenances.noteTechnique);
        setNotePresentation(response.data.soutenances.notePresentation);
        setNoteGeneral(response2.data);
      } catch (error) {
        console.error("Error fetching Soutenance:", error);
      }
    };

    getSoutenace();
  }, [etatSoutenance]);

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      <div className="flex space-x-4">
        <a
          href="#"
          className="w-60 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {etatSoutenance ? "Note Technique" : "Note Technique pas distribuée"}
          </h5>
          <p className="font-semibold text-gray-700 dark:text-gray-400">
            {etatSoutenance ? noteTechnique : "0"}
          </p>
        </a>
        <a
          href="#"
          className="w-60 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {etatSoutenance ? "Note Presentation"   : "Note Presentation pas distribuée"}
          </h5>
          <p className="font-semibold text-gray-700 dark:text-gray-400">
            {etatSoutenance ? notePresentation : "0"}
          </p>
        </a>
      </div>
      <div className="flex justify-center w-full">
        <a
          href="#"
          className="w-60 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {noteGeneral ? "Note General" : "Note n'est pas distribuée"}
          </h5>
          <p className="font-semibold text-gray-700 dark:text-gray-400">
            {noteGeneral ? noteGeneral : "0"}
          </p>
        </a>
      </div>
    </div>
  );
};

export default ResultatStageE;
