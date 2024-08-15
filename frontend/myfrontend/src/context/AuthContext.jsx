import { createContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode"; // Make sure to install this
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert2";
import PropTypes from "prop-types";
import React from "react";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(JSON.parse(localStorage.getItem("authTokens")).access)
      : null
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const loginUser = async (email, password) => {
    const response = await fetch(
      "https://my-django-react.onrender.com/authentication/token/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/dashboard");
      swal.fire({
        title: "Login Successful",
        icon: "success",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      setAuthTokens(null);
      setUser(null);
      localStorage.removeItem("authTokens");
      swal.fire({
        title: "Username or password does not exist",
        icon: "error",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const registerUser = async (email, username, password, password2) => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");

    const response = await fetch(
      "https://my-django-react.onrender.com/authentication/register/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password, password2 }),
      }
    );
    if (response.status === 201) {
      navigate("/login");
      swal.fire({
        title: "Registration Successful, Login Now",
        icon: "success",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      swal.fire({
        title: "An Error Occurred " + response.status,
        icon: "error",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const logoutUser = useCallback(() => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
    swal.fire({
      title: "You have been logged out...",
      icon: "success",
      toast: true,
      timer: 3000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }, [navigate]);

  const refreshToken = async () => {
    try {
      const response = await fetch(
        "https://my-django-react.onrender.com/authentication/token/refresh/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: authTokens?.refresh }),
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        return data.access;
      } else {
        logoutUser();
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logoutUser();
    }
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens]);

  useEffect(() => {
    let logoutTimer;

    const handleActivity = () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
      logoutTimer = setTimeout(logoutUser, 5 * 60 * 1000); // 5 minutes
    };

    if (location.pathname === "/dashboard") {
      window.addEventListener("mousemove", handleActivity);
      window.addEventListener("keydown", handleActivity);
      window.addEventListener("click", handleActivity);

      handleActivity(); // Start timer immediately

      return () => {
        window.removeEventListener("mousemove", handleActivity);
        window.removeEventListener("keydown", handleActivity);
        window.removeEventListener("click", handleActivity);
        if (logoutTimer) {
          clearTimeout(logoutTimer);
        }
      };
    }
  }, [location.pathname, logoutUser]);

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    refreshToken, // Ensure this function is included
    loginUser,
    logoutUser,
    registerUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
