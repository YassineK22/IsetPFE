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

const Dashboard = () => {
  const location = useLocation();
  const payloadSM = JSON.parse(localStorage.getItem("payload_SM"));
  const [tab, setTab] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          {tab === "Soutenance" && payloadSM.role == "etudiant" && (
            <DashSoutenanceE />
          )}
          {tab === "Soutenance" && payloadSM.role == "responsable" && (
            <DashSoutenanceR />
          )}
          {tab === "Soutenance" && payloadSM.role == "enseignant" && (
            <DashSoutenanceJ />
          )}
          {tab === "Stage" && payloadSM.role == "etudiant" && <DashStageE />}
          {tab === "Stage" && payloadSM.role == "responsable" && <DashStageR />}
          {tab === "DemandeEncadrement" && payloadSM.role == "enseignant" && (
            <DashDemandesEncadrement />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
