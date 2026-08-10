import axios from "axios";
import { getStoredToken, clearStoredToken } from "./utils/authStorage";

let redirectingToLogin = false;

// Frontend and API are now served by the same Next.js process/deploy, so
// requests are same-origin — no baseURL needed (all request paths already
// include /api/...).
const currentBaseURL = "";

const client = axios.create({
  baseURL: currentBaseURL,
});

client.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers = {
        ...(config.headers || {}),
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error?.config || {};
    const status = error?.response?.status;

    // On 401 (expired / invalid token), clear storage and send to login.
    // Skip if the failing request is already the login endpoint itself.
    if (status === 401 && !originalConfig.url?.includes('/login')) {
      if (!redirectingToLogin) {
        redirectingToLogin = true;
        clearStoredToken();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default client;
export const getApiBase = () => currentBaseURL;
