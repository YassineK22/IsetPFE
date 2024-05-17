import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashSoutenanceE from "../components/DashSoutenanceE";
import DashSoutenanceR from "../components/DashSoutenanceR";
import DashSoutenanceJ from "../components/DashSoutenanceJ";
import DashStageE from "../components/DashStageE";
import DashStageR from "../components/DashStageR";
import DashDemandesEncadrement from "../components/DashDemandesEncadrement";
import DashValidationStage from "../components/DashValidationStage";
import DashValidationResultat from "../components/DashValidationResultat";
import DashAffecterEncadrent from "../components/DashAffecterEncadrent";
import DashAffecterJury from "../components/DashAffecterJury";
import DashStageEN from "../components/DashStageEN";

const Dashboard = () => {
  const location = useLocation();
  const payloadSM = JSON.parse(localStorage.getItem("payload_SM"));
  const [tab, setTab] = useState("");
  const [section, setSection] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    const sectionFromUrl = urlParams.get("section");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    if (sectionFromUrl) {
      setSection(sectionFromUrl);
    }
  }, [location.search]);

  return (
    <div className="flex h-screen overflow-hidden">
      <br />
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          {tab === "Soutenance" &&
            payloadSM &&
            payloadSM.role === "etudiant" && <DashSoutenanceE />}
          {tab === "Soutenance" &&
            payloadSM &&
            payloadSM.role === "responsable" && <DashSoutenanceR />}
          {tab === "Soutenance" &&
            payloadSM &&
            payloadSM.role === "enseignant" && <DashSoutenanceJ />}
          {tab === "Stage" && payloadSM && payloadSM.role === "etudiant" && (
            <DashStageE />
          )}
          {tab === "Stage" && payloadSM && payloadSM.role === "responsable" && (
            <DashStageR />
          )}
           {tab === "Stage" && payloadSM && payloadSM.role === "enseignant" && (
            <DashStageEN />
          )}
          {tab === "DemandeEncadrement" &&
            payloadSM &&
            payloadSM.role === "enseignant" && <DashDemandesEncadrement />}
          {tab === "VaildationStage" &&
            payloadSM &&
            payloadSM.role === "responsable" && <DashValidationStage />}
          {tab === "VaildationResultat" &&
            payloadSM &&
            payloadSM.role === "responsable" && <DashValidationResultat />}
          {tab === "AffecterEncadrent" &&
            payloadSM &&
            payloadSM.role === "responsable" && <DashAffecterEncadrent />}
             {tab === "AffecterJury" &&
            payloadSM &&
            payloadSM.role === "responsable" && <DashAffecterJury />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
