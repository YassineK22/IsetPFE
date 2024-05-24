import React, { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";

const DashAffecterJury = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [etudiantData, setEtudiant] = useState([]);
  const [projects, setProjects] = useState([]);
  const [jurys, setJury] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("tous");
  const [soutenance, setSoutenance] = useState([]);
  const payloadSM = JSON.parse(localStorage.getItem("payload_SM"));


  const getJury = async () => {
    try {
      const response = await axiosInstance.get(
        `/utilisateur/ens?searchQuery=${searchQuery}&searchCategory=${searchCategory}`
      );
      setJury(response.data);
    } catch (error) {
      console.error("Error fetching projet:", error);
    }
  };

  useEffect(() => {
    getJury();
  }, []);

  useEffect(() => {
    getJury();
  }, [searchQuery, searchCategory]);

  useEffect(() => {
    const getJury = async () => {
      try {
        const response = await axiosInstance.get(
          `/utilisateur/ens?searchQuery=${searchQuery}&searchCategory=${searchCategory}`
        );
        setJury(response.data);
      } catch (error) {
        console.error("Error fetching projet:", error);
      }
    };

    getJury();
  }, []);

  const addJury = async (jury, type) => {
    try {
      let response ="";
      if (type === "technique") {
        response = await axiosInstance.patch(`/soutenance/${soutenance}`, {
          jugeTechnique: jury,
        });
      } else if (type === "presentation") {
        response = await axiosInstance.patch(`/soutenance/${soutenance}`, {
          jugePresentation: jury,
        });
      }
    } catch (error) {
      console.error("Error updating projet data:", error);
    }
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getJury();
  };

  const getSoutenace = async () => {
    try {
      const response = await axiosInstance.get(`/soutenance/attpremier`);
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
        const response = await axiosInstance.get(`/soutenance/attpremier`);
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
      setEtudiant(response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const changeEtatPremier = async (idProjet) => {
    try {
      const response = await axiosInstance.patch(
        `/soutenance/change-etat/premier/${idProjet}`
      );
      getSoutenace();
    } catch (error) {
      console.error("Error fetching projet data:", error);
    }
  };

  const changeEtatNonPremier = async (idProjet) => {
    try {
      const response = await axiosInstance.patch(
        `/soutenance/change-etat/nonpremier/${idProjet}`
      );
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

  const toggleModal2 = () => {
    setShowModal2(!showModal2);
  };

  // Function to close the modal
  const closeModal2 = () => {
    toggleModal2();
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
                Rapport
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
                <td className="px-6 py-4">{soutenance.rapport}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      toggleModal2();
                      setSoutenance(soutenance._id)
                    }}
                    className="block mr-1 pr-3 pl-3 pb-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    type="button"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      toggleModal2();
                      setSoutenance(soutenance._id)
                    }}
                    className="block mr-1 pr-3 pl-3 pb-1 text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                    type="button"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </td>
                <td className="px-6 py-4">
                  <a
                    onClick={() => {
                      toggleModal2();
                      // getEtudiant(soutenance.idEtudiant);
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
                      changeEtatPremier(soutenance._id);
                    }}
                    className="block mr-1 pr-3 pl-3 pb-1 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    type="button"
                  >
                    <span className="material-symbols-outlined">check</span>
                  </button>
                  <button
                    onClick={() => {
                      changeEtatNonPremier(soutenance._id);
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

      {showModal2 && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
            onClick={closeModal2}
          ></div>
          <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                List des Jury
              </h3>
              <button
                onClick={closeModal2}
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
              <div>
                <form
                  className="max-w-md mx-auto mt-3 mb-2"
                  onSubmit={handleSubmit}
                >
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
                      placeholder="Chercher enseignant"
                      value={searchQuery}
                      onChange={handleChange}
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
                          Nom
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Prenom
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Specialite
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {jurys.map((jury) => (
                        <tr key={jury._id}>
                          <td className="flex">
                            <button
                              onClick={() => {
                                addJury(jury._id, "technique");
                              }}
                              className="block mr-1 pr-3 pl-3 pb-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                              type="button"
                            >
                              <span className="material-symbols-outlined">
                                add
                              </span>
                            </button>
                            <button
                              onClick={() => {
                                addJury(jury._id, "presentation");
                              }}
                              className="block mr-1 pr-3 pl-3 pb-1 text-white  bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                              type="button"
                            >
                              <span className="material-symbols-outlined">
                                add
                              </span>
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {jury.nom}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {jury.prenom}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {jury.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {jury.specialite}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashAffecterJury;
