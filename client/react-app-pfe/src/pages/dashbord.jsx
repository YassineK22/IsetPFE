import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import { useSelector } from "react-redux";
import DashSoutenanceEtdudiant from "../components/DashSoutenanceEtdudiant";
import DashSoutenanceEnseignant from "../components/DashSoutenanceEnseignant";
import DashSoutenanceResponsable from "../components/DashSoutenanceResponsable";
import DashDemande from "../components/DashDemande";
import DashMesPfe from "../components/DashMesPfe";
import DashOffreStage from "../components/DashOffreStage";
import DashValidation from "../components/DashValidation";
import DashRechercheStage from "../components/DashRechercheStage";
import DashRechercheEncadreur from "../components/DashRechercheEncadreur";
import DashAllEtudiant from "../components/DashAllEtudiant";
import DashProcedureStage from "../components/DashProcedureStage";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [testId, setTestId] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    const idFromUrl = urlParams.get("id");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    if (idFromUrl) {
      setTestId(idFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {tab === "profile" && <DashProfile />}
      {tab === "dash" && <DashAllEtudiant />}
      {tab === "Soutenance" && currentUser.role == "etudiant" && (
        <DashSoutenanceEtdudiant />
      )}
      {tab === "Soutenance" && currentUser.role == "enseignant" && (
        <DashSoutenanceEnseignant />
      )}
      {tab === "Soutenance" && currentUser.role == "responsable" && (
        <DashSoutenanceResponsable />
      )}
      {tab === "Demandes" && <DashDemande />}
      {tab === "Mes PFE" && <DashMesPfe />}
      {tab === "OffresStages" && <DashOffreStage />}
      {tab === "RechercheStage" && <DashRechercheStage />}
      {tab === "Validation" && <DashValidation />}
      {tab === "RechercheEncadreur" && <DashRechercheEncadreur />}
      {tab === "Procedure du stage" && currentUser.role == "etudiant" && (
        <DashProcedureStage />
      )}
    </div>
  );
};

export default Dashboard;
