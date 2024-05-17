import React, { useState } from "react";
import axiosInstance from "./axiosInstance";

const EnvoyerRapport = () => {
  const payloadSM = JSON.parse(localStorage.getItem("payload_SM"));

  const [soutenanceForm, setsoutenanceForm] = useState({
    idEtudiant: payloadSM.sub,
    rapport: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const addProjet = async () => {
    try {
      setsoutenanceForm({
        ...soutenanceForm,
        idEtudiant: payloadSM.sub,
      });
      console.log(payloadSM.sub);
      for (const key in soutenanceForm) {
        if (!soutenanceForm[key]) {
          setFormError("Veuillez Mettre le rapport sous format PDF.");
          return;
        }
      }
      const data = {
        idEtudiant: payloadSM.sub,
        rapport: soutenanceForm.rapport,
      };

      await axiosInstance.post("/soutenance", data); 
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error adding projet:", error);
    }
  };
  return (
    <div>
      <form className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Ropport de satge (Format pdf)
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            value={soutenanceForm.rapport}
            onChange={(e) =>
              setsoutenanceForm({
                ...soutenanceForm,
                rapport: e.target.value,
              })
            }
          />
        </div>
        {/* Conditionally render form error message */}
        {formError && <p className="text-red-500">{formError}</p>}
        <button
          type="button"
          onClick={addProjet}
          className={`${
            formSubmitted
              ? "bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
              : "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          }`}
          disabled={formSubmitted}
        >
          {formSubmitted ? "Rapport envoyée" : "Envoyer"}
        </button>
      </form>
    </div>
  );
};

export default EnvoyerRapport;
