import { useContext } from "react";
import AuthContext from "../context/AuthContext"; // Adjust based on your file structure
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "https://my-django-react.onrender.com/authentication/refresh/";

const useAuth = () => {
  const { authTokens, setAuthTokens } = useContext(AuthContext);

  const getAuthHeaders = async () => {
    if (!authTokens) {
      throw new Error("No authentication tokens found.");
    }

    let headers = {
      Authorization: `Bearer ${authTokens.access}`,
    };

    // Check if token has expired and needs refreshing
    const isTokenExpired = () => {
      const expiry = jwtDecode(authTokens.access).exp * 1000;
      return Date.now() >= expiry;
    };

    if (isTokenExpired() && authTokens.refresh) {
      try {
        const response = await axios.post(API_URL, {
          refresh: authTokens.refresh,
        });
        const newTokens = response.data;
        setAuthTokens(newTokens);
        localStorage.setItem("authTokens", JSON.stringify(newTokens));
        headers.Authorization = `Bearer ${newTokens.access}`;
      } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
      }
    }

    return headers;
  };

  return { getAuthHeaders };
};

export default useAuth;
