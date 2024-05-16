import React, { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";

const DashValidationStage = () => {
  useEffect(() => {
    const getProjet = async () => {
      try {
        const response = await axiosInstance.get(`/projet/attpremier`);
        // Assuming that the response contains the etatProjet value
      } catch (error) {
        console.error("Error fetching projet:", error);
      }
    };

    getProjet();
  }, []);

  const getEtudiant = async () => {
    try {
      const response = await axiosInstance.get(`/utilisateur/${idE}`);
    } catch (error) {
      console.error("Error fetching projet:", error);
    }
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
            <tr>
              <td>
                <button
                  type="button"
                  className="text-white pr-3 pl-3 pb-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashValidationStage;
