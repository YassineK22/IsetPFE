import React, { useState } from "react";
import AlertErreur from "../components/AlertErreur";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../components/axiosInstance";
import ThemeToggle from "../components/ThemeToggle";

const SeConnecter = () => {
  const [pieceIdentite, setpieceIdentite] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        pieceIdentite,
        motDePasse,
      });
      console.log(response);

      // Store the token in localStorage
      localStorage.setItem("authToken", response.data.access_token);

      // Redirect the user to /dashboard
      navigate("/dashboard?tab=Stage");
      // Reload the page
      setTimeout(() => {
        window.location.reload();
      }, (50));
    } catch (error) {
      console.error("Error during login:", error);

      if (error.response.status === 404) {
        // User not found
        setErrorMessage("Il n'y a pas de compte avec cet pieceIdentite");
      } else if (error.response.status === 401) {
        // Incorrect password
        setErrorMessage("Mot de passe incorrecte");
      } else {
        setErrorMessage("Les champs avec * sont obligatoires");
      }
    }
  };
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            Iset PFE
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex items-center justify-between w-full mb-6">
                <a
                  href="#"
                  className="text-2xl font-semibold text-gray-900 dark:text-white"
                >
                  Se Connecter
                </a>
                <ThemeToggle />
              </div>
              <div className="space-y-4 md:space-y-6" >
                <div>
                  <label
                    htmlFor="id"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    pieceIdentite <span className="text-danger-50">*</span>
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="id"
                    id="id"
                    placeholder="Saisir votre pieceIdentite"
                    onChange={(e) => setpieceIdentite(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mot de passe <span className="text-danger-50">*</span>
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Saisir votre mot de passe"
                    onChange={(e) => setMotDePasse(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    to="/motdepasseoubliee"
                  >
                    {" "}
                    Mot De Passe Oublié ?
                  </Link>
                </div>
                <button
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={handleLogin}
                >
                  Se Connecter
                </button>

                {errorMessage && (
                  <div className="alert">
                    <AlertErreur message={errorMessage} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SeConnecter;
