import React, { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";

const DashValidationStage = () => {
  const [showModal, setShowModal] = useState(false);
  const [etudiantData, setEtudiant] = useState([]);
  const [projects, setProjects] = useState([]);

  const getProjet = async () => {
    try {
      const response = await axiosInstance.get(`/projet/attpremier`);
      console.log(response.data);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projet:", error);
    }
  };

  useEffect(() => {
    getProjet();
  }, []);

  useEffect(() => {
    const getProjet = async () => {
      try {
        const response = await axiosInstance.get(`/projet/attpremier`);
        console.log(response.data);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projet:", error);
      }
    };

    getProjet();
  }, []);

  const getEtudiant = async (idEtudiant) => {
    try {
      const response = await axiosInstance.get(
        `/utilisateur/user/${idEtudiant}`
      );
      console.log(response.data);
      setEtudiant(response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const changeEtatPremier = async (idProjet) => {
    try {
      const response = await axiosInstance.patch(
        `/projet/change-etat/premier/${idProjet}`
      );
      console.log(response.data);
      getProjet();
    } catch (error) {
      console.error("Error fetching projet data:", error);
    }
  };

  const changeEtatNonPremier = async (idProjet) => {
    try {
      const response = await axiosInstance.patch(
        `/projet/change-etat/nonPremier/${idProjet}`
      );
      console.log(response.data);
      getProjet();
    } catch (error) {
      console.error("Error fetching projet data:", error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Function to close the modal
  const closeModal = () => {
    toggleModal();
  };

  return (
    <div>
      <form className="max-w-md mx-auto mt-3 mb-2">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Chercher PFE"
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                Titre du PFE
              </th>
              <th scope="col" className="px-6 py-3">
                Problématique
              </th>
              <th scope="col" className="px-6 py-3">
                Nature Sujet
              </th>
              <th scope="col" className="px-6 py-3">
                Entreprise d'accueil
              </th>
              <th scope="col" className="px-6 py-3">
                Nom encadreur entreprise
              </th>
              <th scope="col" className="px-6 py-3">
                Attestation d'inscription
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td className="flex">
                  <button
                    onClick={() => {
                      toggleModal();
                      getEtudiant(project.idEtudiant);
                    }}
                    className="block mr-1 pr-3 pl-3 pb-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                  >
                    <span className="material-symbols-outlined">
                      visibility
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      changeEtatPremier(project._id);
                    }}
                    className="block mr-1 pr-3 pl-3 pb-1 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    type="button"
                  >
                    <span className="material-symbols-outlined">check</span>
                  </button>
                  <button
                    onClick={() => {
                      changeEtatNonPremier(project._id);
                    }}
                    className="block pr-3 pl-3 pb-1 text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                    type="button"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{project.titre}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {project.problematique}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {project.natureSujet}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {project.entrepriseAccuel.nom}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {project.encadreurEntreprise.nomEncadreurE}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {project.attestation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
            onClick={closeModal}
          ></div>
          <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Détails de l'étudiant
              </h3>
              <button
                onClick={closeModal}
                type="button"
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <p>
                <strong>Nom:</strong> {etudiantData.nom}
              </p>
              <p>
                <strong>Prénom:</strong> {etudiantData.prenom}
              </p>
              <p>
                <strong>Sexe:</strong> {etudiantData.sexe}
              </p>
              <p>
                <strong>Email:</strong> {etudiantData.email}
              </p>
              <p>
                <strong>Téléphone:</strong> {etudiantData.telephone}
              </p>
              <p>
                <strong>Pièce d'identité:</strong> {etudiantData.pieceIdentite}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashValidationStage;
