import React, { useState } from "react";
import AlertErreur from "../components/AlertErreur";
import { Link , useNavigate } from "react-router-dom";
import axiosInstance from "../components/axiosInstance";
import "../styles/seConnecter.css"

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
      console.log(response)

      // Store the token in localStorage
      localStorage.setItem("authToken", response.data.access_token);

      // Redirect the user to /patients
      navigate("/calendrier");
      // Reload the page
      setTimeout(() => {
        window.location.reload();
      }, 50);
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
      <div className="logo">IsetPFE</div>
      <div className="form">
        <div>
          <div className="w3"></div>
          <div className="form-name">Se Connecter</div>
          <div className="sous-f-name">
            <span className="border-b-t">Information personel</span>
          </div>
          <br />

          <div className="input-container">
            <label htmlFor="id" className="label-1">
              pieceIdentite <span className="required">*</span>
            </label>
            <input
              className="input-1"
              type="text"
              name="id"
              id="id"
              placeholder="Saisir votre pieceIdentite"
              onChange={(e) => setpieceIdentite(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="label-1">
              Mot de passe <span className="required">*</span>
            </label>
            <input
              className="input-1"
              type="password"
              name="password"
              id="password"
              placeholder="Saisir votre mot de passe"
              onChange={(e) => setMotDePasse(e.target.value)}
              required
            />
          </div>

          <button className="btn-sub-1" onClick={handleLogin}>
            Se connecter
          </button>
          <div className="center">
            <span className="label-1">
              Vous N'aver Pas Un Compte ?
              <Link className="link" to="/sinscrire">
                {" "}
                S'inscrire
              </Link>
              <br />
              <Link className="link" to="/motdepasseoubliee">
                {" "}
                Mot De Passe Oublié ?
              </Link>
            </span>
          </div>

          {errorMessage && (
            <div className="alert">
              <AlertErreur message={errorMessage} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeConnecter;
