import axios from "axios";

// const baseURL = "https://opfactback1-d0aec8cfeqcmbec8.canadacentral-01.azurewebsites.net/api/";
 const baseURL = "http://localhost:5000/api/";

const AxiosService = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosService;
