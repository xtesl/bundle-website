import axios from "axios";

const localAddress = "http://localhost:8000/api";
const publicAddress = "https://fastapi-backend-rfsj.onrender.com/api";

const apiClient = axios.create({
  baseURL: publicAddress, // Use publicAddress if deploying
  timeout: 50000, // optional: request timeout
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies with each request

});


export default apiClient;