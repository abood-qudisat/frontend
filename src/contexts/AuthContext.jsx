import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  baseURL,
  clearAuthToken,
  post,
  setAuthToken,
} from "../WebService/RequestBuilder";
import Constants from "../config/globalConstants";
import { darkTheme, lightTheme } from "../config/constants";

const storeJsonData = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
const getStoreJsonData = (key) => JSON.parse(localStorage.getItem(key));
const removeStoreData = (key) => localStorage.removeItem(key);

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [currency, setCurrency] = useState("usd");
  const [currentTheme, setCurrentTheme] = useState("light");
  const [currentThemeColor, setCurrentThemeColor] = useState(lightTheme);

  const storeAuthData = async (token, userData, userType) => {
    storeJsonData(Constants.storageTokenKeyName, token);
    storeJsonData(Constants.userData, userData);
    storeJsonData(Constants.user_type, userType);
  };

  const initializeApp = async () => {
    setIsLoading(true);
    try {
      const storedToken = getStoreJsonData(Constants.storageTokenKeyName);
      if (storedToken) {
        setToken(storedToken);
        setAuthToken(storedToken);
        setIsLoggedIn(true);
      }

      const storedUser = getStoreJsonData(Constants.userData);
      if (storedUser) setUser(storedUser);

      const storedUserType = getStoreJsonData(Constants.user_type);
      if (storedUserType) setUserType(storedUserType);

      const storedBusiness = getStoreJsonData(Constants.businessData);
      if (storedBusiness) setBusinessData(storedBusiness);

      const storedCurrency = getStoreJsonData(Constants.default_currency);
      if (storedCurrency) setCurrency(storedCurrency);

      const storedTheme =
        getStoreJsonData(Constants.appTheme) ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");
      setCurrentTheme(storedTheme);
      setCurrentThemeColor(storedTheme === "dark" ? darkTheme : lightTheme);
    } catch (error) {
      console.error("Initialization error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeApp();
  }, []);

  const changeMode = async (theme) => {
    try {
      storeJsonData(Constants.appTheme, theme);
      setCurrentTheme(theme);
      setCurrentThemeColor(theme === "dark" ? darkTheme : lightTheme);
      await post(Constants.user.toggleDarkMde); // Sync with backend
      return true;
    } catch (error) {
      console.error("Theme change error:", error);
      return false;
    }
  };

  const login = async (data) => {
    try {
      const response = await axios.post(
        `${baseURL}${Constants.auth.login}`,
        data
      );
      const { token, user, message, success } = response.data;

      if (success && token && user) {
        await storeAuthData(token, user, user.role);
        storeJsonData(Constants.businessData);

        setAuthToken(token);
        setToken(token);
        setUser(user);
        setUserType(user.role);
        setIsLoggedIn(true);

        return {
          status: success,
          type: "success",
          message: message || "Login successful",
          userType: user.role,
        };
      }

      return {
        status: false,
        type: "warning",
        message: "Something went wrong, please try again",
      };
    } catch (error) {
      console.error("Login error:", error);
      return { status: false, type: "danger", message: "Network error" };
    }
  };

  const register = async (data) => {
    try {
      const response = await axios.post(
        `${baseURL}${Constants.auth.register}`,
        data
      );
      console.log(response);

      const { success, token, user, message } = response.data;

      if (!success) {
        return {
          status: false,
          type: "danger",
          message: message || "Registration failed, please try again",
        };
      }

      await storeAuthData(token, user, "user");
      setAuthToken(token);
      setToken(token);
      setUser(user);
      setUserType("user");
      setIsLoggedIn(true);

      return {
        status: true,
        type: "success",
        message: "User registered successfully",
      };
    } catch (error) {
      console.error("Register error:", error);
      return {
        status: false,
        type: "danger",
        message: "Network error, please try again later",
      };
    }
  };

  const logout = () => {
    setIsLoading(true);
    removeStoreData(Constants.storageTokenKeyName);
    removeStoreData(Constants.userData);
    removeStoreData(Constants.user_type);
    clearAuthToken();
    setIsLoggedIn(false);
    setToken(null);
    setUser(null);
    setUserType(null);
    setBusinessData(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        token,
        user,
        userType,
        businessData,
        currency,
        currentTheme,
        currentThemeColor,
        login,
        register,
        logout,
        changeMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
