import React from "react";

const DashStageR = () => {
  return (
    <div>
      <form class="max-w-md mx-auto mt-3 mb-2">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required
          />
          <button
            type="submit"
            class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Titre du PFE
              </th>
              <th scope="col" class="px-6 py-3">
                Problématique
              </th>
              <th scope="col" class="px-6 py-3">
                Nature Sujet
              </th>
              <th scope="col" class="px-6 py-3">
                Entreprise d'accueil
              </th>
              <th scope="col" class="px-6 py-3">
                Adresse de l'entreprise
              </th>
              <th scope="col" class="px-6 py-3">
                Gouvernorat lieu de Stage PFE
              </th>
              <th scope="col" class="px-6 py-3">
                Nom encadreur entreprise
              </th>
              <th scope="col" class="px-6 py-3">
                Adresse mail encadreur entreprise
              </th>
              <th scope="col" class="px-6 py-3">
                Téléphone encadreur entreprise
              </th>
              <th scope="col" class="px-6 py-3">
                Formulaire de Réponse
              </th>
              <th scope="col" class="px-6 py-3">
                Attestation d'inscription
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default DashStageR;
