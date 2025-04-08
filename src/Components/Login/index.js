import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../api/authApi";
import ReCAPTCHA from "react-google-recaptcha";

const LoginForm = ({ handleTabClick }) => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!loginDetails.email) {
      formErrors.email = "Email is required.";
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(loginDetails.email)
    ) {
      formErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!loginDetails.password) {
      formErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    if (!captchaVerified) {
      setErrorMessage("Please verify you're not a robot.");
      return;
    }

    if (!validateForm()) return;

    try {
      const res = await loginUser(loginDetails, navigate);
      console.log("Login Success:", res);
    } catch (err) {
      console.error("Login Error:", err.response ? err.response.data : err.message);
      setErrorMessage(err.response ? err.response.data.error : "An unexpected error occurred.");
    }
  };

  const handleCaptcha = (token) => {
    if (token) {
      setCaptchaVerified(true);
      setErrorMessage(null);
    } else {
      setCaptchaVerified(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitLogin} className="auth-form-container">
        <input
          name="email"
          value={loginDetails.email}
          onChange={handleChange}
          className={`auth-input ${errors.email ? "error-border" : ""}`}
          type="email"
          placeholder="Enter your email"
        />
        {errors.email && <p className="auth-error">{errors.email}</p>}

        <input
          name="password"
          value={loginDetails.password}
          onChange={handleChange}
          className={`auth-input ${errors.password ? "error-border" : ""}`}
          type="password"
          placeholder="Enter your password"
        />
        {errors.password && <p className="auth-error">{errors.password}</p>}

        <div className="captcha-container">
          <ReCAPTCHA
            sitekey="6Ldy9w4rAAAAAJ78Rsu_YRwqfAa_AIJIXvQ263wQ" 
            onChange={handleCaptcha}
          />
        </div>

        <button type="submit" className="auth-btn">
          Login
        </button>

        <p className="auth-forgot-password" onClick={() => handleTabClick("forgot-form")}>
          Forgot password?
        </p>

        {errorMessage && <p className="auth-error server-error">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
