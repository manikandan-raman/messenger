import { API_BASE_URL, PUBLIC_API_ENDPOINTS } from "./constant";
import axios from "axios";
import { useCookie } from "../hooks/useCookie";

const { getValueFromCookie } = useCookie();
let token = getValueFromCookie("token");

export const httpCall = {
  post: async (endpoint, { data }) => {
    PUBLIC_API_ENDPOINTS.includes(endpoint);
    try {
      return await axios.post(`${API_BASE_URL}/api/${endpoint}`, data, {
        headers: {
          ...{ "Content-Type": "application/json" },
          ...(!PUBLIC_API_ENDPOINTS.includes(endpoint) && {
            Authorization: `Bearer ${token}`,
          }),
        },
      });
    } catch (error) {
      return error.response;
    }
  },
  get: async (endpoint) => {
    if (!token) {
      token = getValueFromCookie("token");
    }
    return await axios.get(`${API_BASE_URL}/api/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  patch: async (endpoint, { data }) => {
    PUBLIC_API_ENDPOINTS.includes(endpoint);
    return await axios.patch(`${API_BASE_URL}/api/${endpoint}`, data, {
      headers: {
        ...{ "Content-Type": "application/json" },
        ...(!PUBLIC_API_ENDPOINTS.includes(endpoint) && {
          Authorization: `Bearer ${token}`,
        }),
      },
    });
  },
  delete: () => {},
};
