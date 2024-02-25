import { API_BASE_URL } from "./constant";
import axios from "axios";

export const httpCall = {
  post: async (endpoint, { data }) => {
    return await axios.post(`${API_BASE_URL}/api/${endpoint}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDhkNjliNWE4OWJjZTNlZWZjMTIxZSIsImlhdCI6MTcwODc5NDIzNCwiZXhwIjoxNzA4ODgwNjM0fQ._9LOUWg-CDKuReksSUitGueJkPcgawCtMU9hMzRGCDw`,
      },
    });
  },
  get: async (endpoint) => {
    return await axios.get(`${API_BASE_URL}/api/${endpoint}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDhkNjliNWE4OWJjZTNlZWZjMTIxZSIsImlhdCI6MTcwODc5NDIzNCwiZXhwIjoxNzA4ODgwNjM0fQ._9LOUWg-CDKuReksSUitGueJkPcgawCtMU9hMzRGCDw",
      },
    });
  },
  patch: () => {},
  delete: () => {},
};
