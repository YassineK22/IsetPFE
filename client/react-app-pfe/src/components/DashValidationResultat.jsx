import React, { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";

function DashValidationResultat() {
  const [showModal, setShowModal] = useState(false);
  const [etudiantData, setEtudiant] = useState([]);
  const [projects, setProjects] = useState([]);

  const getSoutenace = async () => {
    try {
      const response = await axiosInstance.get(`/soutenance/notedonner`);
      console.log(response.data);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projet:", error);
    }
  };

  useEffect(() => {
    getSoutenace();
  }, []);

  useEffect(() => {
    const getSoutenace = async () => {
      try {
        const response = await axiosInstance.get(`/soutenance/notedonner`);
        console.log(response.data);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projet:", error);
      }
    };

    getSoutenace();
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

  const changeEtatNoteValider = async (idProjet) => {
    try {
      const response = await axiosInstance.patch(
        `/soutenance/change-etat/notevalider/${idProjet}`
      );
      console.log(response.data);
      getSoutenace();
    } catch (error) {
      console.error("Error fetching projet data:", error);
    }
  };

  const changeEtatNoteNValider = async (idProjet) => {
    try {
      const response = await axiosInstance.patch(
        `/soutenance/change-etat/notenvalider/${idProjet}`
      );
      console.log(response.data);
      getSoutenace();
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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Etudiant
              </th>
              <th scope="col" className="px-6 py-3">
                Note Technique
              </th>
              <th scope="col" className="px-6 py-3">
                Note Presentation
              </th>
              <th scope="col" className="px-6 py-3">
                Jury technique
              </th>
              <th scope="col" className="px-6 py-3">
                Jury Presentation
              </th>
              <th scope="col" className="px-6 py-3">
                Details
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((soutenance) => (
              <tr
                key={soutenance._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <button
                    onClick={() => {
                      toggleModal();
                      getEtudiant(soutenance.idEtudiant);
                    }}
                    className="block mr-1 pr-3 pl-3 pb-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                  >
                    <span className="material-symbols-outlined">
                      visibility
                    </span>
                  </button>
                </td>
                <td className="px-6 py-4">{soutenance.noteTechnique}</td>
                <td className="px-6 py-4">{soutenance.notePresentation}</td>
                <td className="px-6 py-4">
                <button
                    onClick={() => {
                      toggleModal();
                      getEtudiant(soutenance.jugeTechnique);
                    }}
                    className="block mr-1 pr-3 pl-3 pb-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    type="button"
                  >
                    <span className="material-symbols-outlined">
                      visibility
                    </span>
                  </button></td>
                <td className="px-6 py-4"><button
                    onClick={() => {
                      toggleModal();
                      getEtudiant(soutenance.jugePresentation);
                    }}
                    className="block mr-1 pr-3 pl-3 pb-1 text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                    type="button"
                  >
                    <span className="material-symbols-outlined">
                      visibility
                    </span>
                  </button></td>
                <td className="px-6 py-4">
                  <a
                    onClick={() => {
                      toggleModal();
                      getEtudiant(soutenance.idEtudiant);
                    }}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Details Projet
                  </a>
                  <a
                     onClick={() => {
                      toggleModal();
                      getEtudiant(soutenance.idEtudiant);
                    }}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Details Soutenance
                  </a>
                </td>
                <td className="px-6 py-4 flex">
                  <button
                    onClick={() => {
                      changeEtatNoteValider(soutenance._id);
                    }}
                    className="block mr-1 pr-3 pl-3 pb-1 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    type="button"
                  >
                    <span className="material-symbols-outlined">check</span>
                  </button>
                  <button
                    onClick={() => {
                      changeEtatNoteNValider(soutenance._id);
                    }}
                    className="block pr-3 pl-3 pb-1 text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                    type="button"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
            onClick={closeModal}
          ></div>
          <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {etudiantData.role === "etudiant"
                  ? "Détails de l'étudiant"
                  : "Détails de jury"}
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
}

export default DashValidationResultat;
