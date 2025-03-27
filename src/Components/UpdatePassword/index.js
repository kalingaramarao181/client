import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {sendOtp, verifyOtp, resetPassword} from "../../api/authApi";

const UpdatePassword = ({ handleTabClick }) => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleOTPChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5) e.target.nextSibling?.focus();
    }
  };

  const validateEmail = () => {
    let isValid = true;
    let formErrors = { ...errors };

    if (!loginDetails.email) {
      formErrors.email = "Email is required.";
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(
        loginDetails.email
      )
    ) {
      formErrors.email = "Enter a valid email address.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;
    if (isOtpSent) return alert("OTP already sent. Please check your email.");

    setLoading(true);
    try {
      const response = await sendOtp(loginDetails.email);
      Cookies.set("otpToken", response.data.token, { expires: 5 });
      setIsOtpSent(true);
      alert("OTP sent to your email!");
    } catch (error) {
      console.error("Send OTP Error:", error);
      alert(error.response?.data?.message || "Failed to send OTP.");
      setErrors({ ...errors, email: error.response?.data?.message });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.includes("")) return alert("Please enter the full OTP.");

    setLoading(true);
    try {
      const response = await verifyOtp(
        loginDetails.email,
        otp.join(""),
        Cookies.get("otpToken")
      );
      Cookies.set("resetToken", response.data.resetToken, { expires: 10 });
      setIsOtpVerified(true);
      alert("OTP Verified! Set your new password.");
    } catch (error) {
      console.error("Verify OTP Error:", error);
      if (error.response?.status === 401) {
        alert("Invalid or expired OTP. Please request a new one.");
        setErrors({ ...errors, email: "Invalid or expired OTP." });
        setIsOtpSent(false);
      } else {
        alert(error.response?.data?.message || "OTP verification failed.");
        setErrors({ ...errors, email: error.response?.data?.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!loginDetails.password) {
      setErrors({ password: "Password is required." });
      return;
    }
    if (loginDetails.password.length < 8) {
      setErrors({ password: "Password must be at least 8 characters long." });
      return;
    }

    setLoading(true);
    try {
      await resetPassword(
        Cookies.get("resetToken"),
        loginDetails.password
      );
      alert("Password updated successfully!");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Reset Password Error:", error);
      if (error.response?.status === 403) {
        alert("Session expired. Please restart the process.");
        setIsOtpSent(false);
        setIsOtpVerified(false);
      } else {
        alert(error.response?.data?.message || "Error resetting password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!isOtpSent ? (
        <form onSubmit={handleSendOtp} className="auth-form-container">
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={loginDetails.email}
            onChange={handleChange}
            className={`auth-input ${errors.email ? "error-border" : ""}`}
          />
          {errors.email && <p className="auth-error">{errors.email}</p>}
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Sending OTP..." : "Get OTP"}
          </button>
        </form>
      ) : !isOtpVerified ? (
        <div>
          <p>Enter OTP sent to your email</p>
          <div className="otp-container">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleOTPChange(e, index)}
                className="otp-input"
              />
            ))}
          </div>
          {errors.email && <p className="auth-error">{errors.email}</p>}
          <button onClick={handleVerifyOtp} className="auth-btn" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      ) : (
        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter new password"
            value={loginDetails.password}
            onChange={handleChange}
            className={`auth-input ${errors.password ? "error-border" : ""}`}
          />
          {errors.password && <p className="auth-error">{errors.password}</p>}
          <button onClick={handleResetPassword} className="auth-btn" disabled={loading}>
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </div>
      )}
      <p className="auth-forgot-password" onClick={() => handleTabClick("login")}>
        Keep SignIn
      </p>
    </div>
  );
};

export default UpdatePassword;
