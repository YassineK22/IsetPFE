import React, { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";

const DemandeEncadrement = () => {
  const [jurys, setJury] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("tous");
  const [project, setProject] = useState([]);
  const payloadSM = JSON.parse(localStorage.getItem("payload_SM"));

  useEffect(() => {
    const getProjet = async () => {
      try {
        const response = await axiosInstance.get(
          `/projet/etudiant/${payloadSM.sub}`
        );
        // Assuming that the response contains the etatProjet value
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching projet:", error);
      }
    };

    getProjet();
  }, []);

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

  const addEnseignant = async (jury) => {
    // Pass jury object as an argument
    try {
      const response1 = await axiosInstance.patch(
        `/projet/${project._id}`,
        { encadreurEnseignant: jury }
      );
      const response2 = await axiosInstance.patch(
        `/projet/change-etat/enAttente/${project._id}`
      );
      window.location.reload()
    } catch (error) {
      console.error("Error fetching projet data:", error);
    }
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getJury();
  };

  return (
    <div>
      <form className="max-w-md mx-auto mt-3 mb-2" onSubmit={handleSubmit}>
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
                      addEnseignant(jury._id);
                    }}
                    className="block mr-1 pr-3 pl-3 pb-1 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    type="button"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{jury.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{jury.prenom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{jury.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {jury.specialite}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DemandeEncadrement;
