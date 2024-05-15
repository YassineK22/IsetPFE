import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BACK,
  headers: {
    // headers here
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});

export default axiosInstance;