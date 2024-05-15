import React, { useEffect } from "react";
import { Routes, Route, useLocation,Navigate } from "react-router-dom";


import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import SeConnecter from "./pages/SeConnecter";
import Protected from "./components/Protected";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route
          path="/seconnecter"
          element={<Protected Component={SeConnecter} />}
        />
        <Route
          path="/dashboard"
          element={<Protected Component={Dashboard} />}
        />
        <Route path="*" element={<Navigate to="/seconnecter" />} />
      </Routes>
    </>
  );
}

export default App;
