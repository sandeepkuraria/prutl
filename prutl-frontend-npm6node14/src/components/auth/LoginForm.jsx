// src/components/auth/LoginForm.jsx
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import Loader from "../common/Loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ErrorModal from '../common/ErrorModal';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  // const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handleCloseModal = () => {
    setShowError(false);
  };

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setShowWarning(true);
      return;
    }

    if (!validatePassword(password)) {
      setShowWarning(true);
      return;
    }

    const resultAction = await dispatch(loginUser({ email, password, keepSignedIn }));
    if (loginUser.fulfilled.match(resultAction)) {
      // navigate('/profile');
      navigate('/dashboard');
    } else if (loginUser.rejected.match(resultAction)) {
      setShowWarning(true);
      // setShowError(true);
    }
  };

  // const handleCloseWarning = () => {
  //   setShowWarning(false);
  // };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

 
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="loginFormContainer shadow-md rounded-lg p-8 w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-6 text-center text-gray-800">Login</h1>
        {/* {showWarning && error && <ErrorModal message={error} onClose={handleCloseWarning} />} */}
        {error && (
        <div className="error-message">
          {showError && (
            <ErrorModal message={error} onClose={handleCloseModal} />
          )}
        </div>
      )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="input-group relative pl-4">
            <label htmlFor="email" className="block text-fontColor text-sm md:text-base lg:text-lg xl:text-xl">
              Email <span className="errorTextColor">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={showWarning && !validateEmail(email)}
              aria-describedby={showWarning && !validateEmail(email) ? "email-error" : null}
              className={`w-full px-3 py-2 border ${showWarning && !validateEmail(email) ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          {showWarning && !validateEmail(email) && (
            <span id="email-error" className="errorTextColor text-sm md:text-base lg:text-lg xl:text-xl">
              Please enter a valid email address.
            </span>
          )}
          <div className="input-group relative pl-4">
            <label htmlFor="password" className="block text-fontColor text-sm md:text-base lg:text-lg xl:text-xl">
              Password <span className="errorTextColor">*</span>
            </label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-invalid={showWarning && !validatePassword(password)}
              aria-describedby={showWarning && !validatePassword(password) ? "password-error" : null}
              className={`w-full px-3 py-2 border ${showWarning && !validatePassword(password) ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute top-8 bottom-0 right-2 pr-3 flex items-center text-gray-500 cursor-pointer"
            >
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </span>
          </div>
          {showWarning && !validatePassword(password) && (
            <span id="password-error" className="errorTextColor text-sm md:text-base lg:text-lg xl:text-xl">
              Password must be at least 8 characters long, including uppercase, lowercase, number, and special character.
            </span>
          )}
          <div className="flex items-center pl-4">
            <input
              type="checkbox"
              id="keepSignedIn"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
            />
            <label htmlFor="keepSignedIn" className="ml-2 block text-fontColor text-sm md:text-base lg:text-lg xl:text-xl">
              Keep me signed in
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-themeColorOrange text-white py-2 px-4 rounded-md hover:bg-hoverButtonColorOrange text-sm md:text-base lg:text-lg xl:text-xl"
            disabled={loading}
          >
            {loading ? <Loader /> : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-fontColor text-sm md:text-base lg:text-lg xl:text-xl">Don't have an account? </span>
          <Link to="/signup" className="text-blue-500 hover:text-blue-700 text-sm md:text-base lg:text-lg xl:text-xl">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;