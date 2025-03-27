import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";

export const loginUser = async (loginDetails, navigate) => {
  try {
    const response = await axiosInstance.post("/login", loginDetails);

    const token = response?.data?.token;
    const userData = response?.data?.user;

    if (!token || !userData) {
      throw new Error("Invalid login response");
    }

    Cookies.set("jwtToken", token, { expires: 30 });

    navigate("/dashboard", { replace: true });
    window.location.reload();

    return response.data;
  } catch (error) {
    console.error(
      "Login Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error;
  }
};

export const getUserDetails = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user-details/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Get User Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error;
  }
};

export const getUsersByRole = async (roleId) => {
  try {
    const response = await axiosInstance.get("/users-by-role/" + roleId);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Get User Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error;
  }
};

export const registerUser = async (registerDetails) => {
  try {
    const response = await axiosInstance.post("/register", registerDetails);
    return response.data;
  } catch (error) {
    console.error(
      "Register Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error;
  }
};

export const updatePassword = async (passwordDetails) => {
  const response = await axiosInstance.post(
    "/update-password",
    passwordDetails
  );
  return response.data;
};

export const sendOtp = (email) => {
  return axiosInstance.post("/send-otp", { email });
};

export const verifyOtp = (email, otp, token) => {
  return axiosInstance.post("/verify-otp", { email, otp, token });
};

export const resetPassword = (resetToken, newPassword) => {
  return axiosInstance.post("/reset-password", { resetToken, newPassword });
};
