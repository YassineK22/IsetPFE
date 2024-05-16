import React, { useState } from "react";
import axiosInstance from "./axiosInstance";

const DemandePFE = () => {
  const payloadSM = JSON.parse(localStorage.getItem("payload_SM"));

  const [projetForm, setProjetForm] = useState({
    idEtudiant: payloadSM.sub,
    titre: "",
    problematique: "",
    natureSujet: "",
    nom: "",
    adresseEntreprise: "",
    governorat: "",
    nomEncadreurE: "",
    emailEncadreurE: "",
    telephoneEncadreurE: "",
    attestation: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const addProjet = async () => {
    try {
      setProjetForm({
        ...projetForm,
        idEtudiant: payloadSM.sub,
      })
      console.log(payloadSM.sub)
      for (const key in projetForm) {
        if (!projetForm[key]) {
          setFormError("Veuillez remplir tous les champs du formulaire.");
          return;
        }
      }
      const data = {
        idEtudiant: projetForm.idEtudiant,
        titre: projetForm.titre,
        problematique: projetForm.problematique,
        natureSujet: projetForm.natureSujet,
        entrepriseAccuel: {
          nom: projetForm.nom,
          adresseEntreprise: projetForm.adresseEntreprise,
          governorat: projetForm.governorat,
        },
        encadreurEntreprise: {
          nomEncadreurE: projetForm.nomEncadreurE,
          emailEncadreurE: projetForm.emailEncadreurE,
          telephoneEncadreurE: projetForm.telephoneEncadreurE,
        },
        attestation: projetForm.attestation,
      };

      await axiosInstance.post("/projet", data);
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error adding projet:", error);
    }
  };

  return (
    <div>
      <form className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="titre_pfe"
            id="titre_pfe"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={projetForm.titre}
            onChange={(e) =>
              setProjetForm({
                ...projetForm,
                titre: e.target.value,
              })
            }
          />
          <label
            htmlFor="titre_pfe"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Titre du PFE
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <textarea
            name="problematique"
            id="problematique"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={projetForm.problematique}
            onChange={(e) =>
              setProjetForm({
                ...projetForm,
                problematique: e.target.value,
              })
            }
          ></textarea>
          <label
            htmlFor="problematique"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Problématique
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="nature_sujet"
            id="nature_sujet"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={projetForm.natureSujet}
            onChange={(e) =>
              setProjetForm({
                ...projetForm,
                natureSujet: e.target.value,
              })
            }
          />
          <label
            htmlFor="nature_sujet"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nature Sujet
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="entreprise_accueil"
            id="entreprise_accueil"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={projetForm.nom}
            onChange={(e) =>
              setProjetForm({
                ...projetForm,
                nom: e.target.value,
              })
            }
          />
          <label
            htmlFor="entreprise_accueil"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Entreprise d'accueil
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="adresse_entreprise"
            id="adresse_entreprise"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={projetForm.adresseEntreprise}
            onChange={(e) =>
              setProjetForm({
                ...projetForm,
                adresseEntreprise: e.target.value,
              })
            }
          />
          <label
            htmlFor="adresse_entreprise"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Adresse de l'entreprise
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <select
            name="gouvernorat"
            id="gouvernorat"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
            value={projetForm.governorat}
            onChange={(e) =>
              setProjetForm({
                ...projetForm,
                governorat: e.target.value,
              })
            }
          >
            <option
              value=""
              className="dark:text-gray-500"
              defaultValue
              disabled
            >
              --sélectionner un Gouvernorat--
            </option>
            <option className="dark:text-gray-900" value="Ariana">
              Ariana
            </option>
            <option className="dark:text-gray-900" value="Béja">
              Béja
            </option>
            <option className="dark:text-gray-900" value="Ben Arous">
              Ben Arous
            </option>
            <option className="dark:text-gray-900" value="Bizerte">
              Bizerte
            </option>
            <option className="dark:text-gray-900" value="Gabes">
              Gabes
            </option>
            <option className="dark:text-gray-900" value="Gafsa">
              Gafsa
            </option>
            <option className="dark:text-gray-900" value="Jendouba">
              Jendouba
            </option>
            <option className="dark:text-gray-900" value="Kairouan">
              Kairouan
            </option>
            <option className="dark:text-gray-900" value="Kasserine">
              Kasserine
            </option>
            <option className="dark:text-gray-900" value="Kebilli">
              Kebilli
            </option>
            <option className="dark:text-gray-900" value="Le Kef">
              Le Kef
            </option>
            <option className="dark:text-gray-900" value="Mahdia">
              Mahdia
            </option>
            <option className="dark:text-gray-900" value="Mannouba">
              Mannouba
            </option>
            <option className="dark:text-gray-900" value="Médenine">
              Médenine
            </option>
            <option className="dark:text-gray-900" value="Monastir">
              Monastir
            </option>
            <option className="dark:text-gray-900" value="Nabeul">
              Nabeul
            </option>
            <option className="dark:text-gray-900" value="Sfax">
              Sfax
            </option>
            <option className="dark:text-gray-900" value="Sidi Bouzid">
              Sidi Bouzid
            </option>
            <option className="dark:text-gray-900" value="Siliana">
              Siliana
            </option>
            <option className="dark:text-gray-900" value="Sousse">
              Sousse
            </option>
            <option className="dark:text-gray-900" value="Tataouine">
              Tataouine
            </option>
            <option className="dark:text-gray-900" value="Tozeur">
              Tozeur
            </option>
            <option className="dark:text-gray-900" value="Tunis">
              Tunis
            </option>
            <option className="dark:text-gray-900" value="Zagouane">
              Zagouane
            </option>
          </select>
          <label
            htmlFor="gouvernorat"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Gouvernorat lieu de Stage PFE
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="nom_encadreur"
            id="nom_encadreur"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={projetForm.nomEncadreurE}
            onChange={(e) =>
              setProjetForm({
                ...projetForm,
                nomEncadreurE: e.target.value,
              })
            }
          />
          <label
            htmlFor="nom_encadreur"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nom encadreur entreprise
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email_encadreur"
            id="email_encadreur"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={projetForm.emailEncadreurE}
            onChange={(e) =>
              setProjetForm({
                ...projetForm,
                emailEncadreurE: e.target.value,
              })
            }
          />
          <label
            htmlFor="email_encadreur"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Adresse mail encadreur entreprise
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="tel_encadreur"
            id="tel_encadreur"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={projetForm.telephoneEncadreurE}
            onChange={(e) =>
              setProjetForm({
                ...projetForm,
                telephoneEncadreurE: e.target.value,
              })
            }
          />
          <label
            htmlFor="tel_encadreur"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Téléphone encadreur entreprise
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="file"
            name="formulaire_reponse"
            id="formulaire_reponse"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            disabled
          />
          <label
            htmlFor="formulaire_reponse"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Heberger le formulaire de réponse ou la convention de PFE
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="file"
            name="pdf_reponse"
            id="pdf_reponse"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            disabled
          />
          <label
            htmlFor="pdf_reponse"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Formulaire de Réponse sous format PDF
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="file"
            name="pdf_attestation"
            id="pdf_attestation"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
            value={projetForm.attestation}
            onChange={(e) =>
              setProjetForm({
                ...projetForm,
                attestation: e.target.value,
              })
            }
          />
          <label
            htmlFor="pdf_attestation"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Attestation d'inscription sous format PDF
          </label>
        </div>
        {/* Conditionally render form error message */}
        {formError && <p className="text-red-500">{formError}</p>}

        {/* Conditionally render button text based on form submission */}
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
          {formSubmitted ? "Demande PFE envoyée" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default DemandePFE;
