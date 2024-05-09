import axios from "axios";

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
console.log("REACT_APP_SERVER_URL", REACT_APP_SERVER_URL);

export const instance = axios.create({
  baseURL: REACT_APP_SERVER_URL,
  withCredentials: true,
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});
