import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:2000",
  // baseURL: "http://192.168.1.21:2000",
  headers: {
    ["x-secret-key"]: "dgreens",
  },
});
