import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "./axiosInstance";
import SeConnecter from "../pages/SeConnecter";

const Protected = (props) => {
  const { Component, hideHeader } = props;
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("authToken");
    const checkToken = async () => {
      if (token) {
        try {
          // Make a request to the server to validate the token
          const response = await axiosInstance.post("/auth/validateToken", {
            token,
          });

          // If the server responds with user information, set isAuthenticated to true
          const data = response.data;
          localStorage.setItem("payload_SM", JSON.stringify(data));
          if (Component === SeConnecter || Component === "MotDePasseOubliee") {
            navigate("/dashboard");
          }
        } catch (error) {
          // If there's an error (e.g., token is invalid), set isAuthenticated to false
          console.error("Error validating token:", error);
          if (Component === "MotDePasseOubliee") {
            navigate("/motdepasseoubliee");
          } else {
            navigate("/seconnecter");
          }
        }
      } else {
        if (Component === "MotDePasseOubliee") {
          navigate("/motdepasseoubliee");
        } else {
          navigate("/seconnecter");
        }
      }
    };
    checkToken();
  }, [Component, navigate]);

  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
