// src/components/auth/SignupForm.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import { Link, useNavigate } from "react-router-dom";
import "react-country-state-city/dist/react-country-state-city.css";
import Loader from "../common/Loader";
import WarningCard from "../common/WarningCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import EditablePhoneInput from "../common/EditablePhoneInput";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    user_code: "",
    country: "",
    state: "",
    city: "",
    pin_code: "",
    county: "",
    user_type: "",
    membership_id: "",
    usergroup_id: "",
    referrer_id: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Allow only numeric values and ensure it's no more than 6 digits for pin_code
    if (name === 'pin_code') {
      if (!/^\d*$/.test(value) || value.length > 6) {
        return; // Prevent non-numeric input or more than 6 digits
      }
    }
  
    setFormData({ ...formData, [name]: value });
  };
  
  
  const handleCountryChange = (country) => {
    setCountryid(country.id);
    setFormData({ ...formData, country: country.name, state: "", city: "" });
  };

  const handleStateChange = (state) => {
    setStateid(state.id);
    setFormData({ ...formData, state: state.name, city: "" });
  };

  const handleCityChange = (city) => {
    setFormData({ ...formData, city: city.name });
  };

  const validateForm = () => {
    let newErrors = {};

    // Name validation (first and last names, spaces allowed)
    if (!formData.name || !/^[a-zA-Z\s'-]+$/.test(formData.name.trim())) {
      newErrors.name = "Please enter a valid full name.";
    }

    // Email validation
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation (at least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character)
    if (
      !formData.password ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must be at least 8 characters long, including uppercase, lowercase, number, and special character.";
    }

    // Phone number validation (E.164 format)
    if (
      !formData.phone_number ||
      !/^\+?[1-9]\d{1,14}$/.test(formData.phone_number.replace(/[\s-]/g, ""))
    ) {
      newErrors.phone_number =
        "Please enter a valid phone number with country code.";
    }

    // Country validation (should be selected)
    if (!formData.country) {
      newErrors.country = "Please select a country.";
    }

    // State validation (should be selected)
    if (!formData.state) {
      newErrors.state = "Please select a state.";
    }

    // City validation (should be selected)
    if (!formData.city) {
      newErrors.city = "Please select a city.";
    }

    // // PIN code validation (exactly 6 digits)
    // if (!formData.pin_code || !/^\d{6}$/.test(formData.pin_code)) {
    //   newErrors.pin_code = "Please enter a valid 6-digit PIN code.";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const filteredFormData = Object.fromEntries(
        Object.entries(formData).filter(
          ([_, value]) => value !== "" && value !== null
        )
      );
      dispatch(registerUser(filteredFormData)).then((response) => {
        if (response.error) {
          setShowWarning(true);
        } else {
          localStorage.clear();
          sessionStorage.clear();
          navigate("/");
        }
      });
    }
  };

  const handleCloseWarning = () => {
    setShowWarning(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="loginFormContainer shadow-md rounded-lg p-8 w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-6 text-center text-gray-800">
          Signup
        </h1>
        {showWarning && error && (
          <WarningCard message={error} onClose={handleCloseWarning} />
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-2 ">
            {/* Form fields */}
            <div className="input-group">
              <label
                htmlFor="name"
                className="block text-fontColor text-sm md:text-base lg:text-lg xl:text-xl"
              >
                Name <span className="errorTextColor">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
              {errors.name && (
                <p className="errorTextColor mt-1 text-sm">{errors.name}</p>
              )}
            </div>

            <div className="input-group">
              <label
                htmlFor="email"
                className="block text-fontColor text-sm md:text-base lg:text-lg xl:text-xl"
              >
                Email <span className="errorTextColor">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
              {errors.email && (
                <p className="errorTextColor mt-1 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
            <EditablePhoneInput
                      label="Phone Number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      editable={true} // Allows editing
                      placeholder="Enter Phone Number"
                      error={errors.phone_number} // Pass any error message if needed
                      showRequired={true}
                      country="in" // Set country to 'in' (India) or any other country code
                    />
                       </div>
            {/* <div>
              <div className="input-group relative">
              
                <PhoneInput
                  country={"us"}
                  value={formData.phone_number}
                  onChange={(phone) =>
                    setFormData({ ...formData, phone_number: phone })
                  }
                  required
                  inputClass="w-full px-4 py-2 border rounded-md focus:outline-none"
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute top-0 left-12 pl-1 flex items-center errorTextColor cursor-pointer"
                >
                  *
                </span>
              </div>
              {errors.phone_number && (
                <p className="errorTextColor mt-1 text-sm">
                  {errors.phone_number}
                </p>
              )}
            </div> */}

<div>
              <div className="input-group  ml-20 relative">
                <label
                  htmlFor="password"
                  className="block text-fontColor text-sm md:text-base lg:text-lg xl:text-xl"
                >
                  Password <span className="error-message">*</span>
                </label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute top-8 bottom-0 right-2 pr-3 flex items-center text-gray-500 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={passwordVisible ? faEyeSlash : faEye}
                  />
                </span>
              </div>
              {errors.password && (
                        <p className="error-message text-sm">
                          {errors.password}
                        </p>
                      )}
            </div>

            <div className="input-group">
              <label
                htmlFor="country"
                className="block text-fontColor text-sm md:text-base lg:text-lg xl:text-xl"
              >
                Country <span className="errorTextColor">*</span>
              </label>
              <CountrySelect
                onChange={handleCountryChange}
                value={formData.country}
                placeHolder="Select Country"
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
              {errors.country && (
                <p className="errorTextColor mt-1 text-sm">{errors.country}</p>
              )}
            </div>

            <div className="input-group">
              <label
                htmlFor="state"
                className="block text-fontColor text-sm md:text-base lg:text-lg xl:text-xl"
              >
                State <span className="errorTextColor">*</span>
              </label>
              <StateSelect
                countryid={countryid}
                onChange={handleStateChange}
                value={formData.state}
                placeHolder="Select State"
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
              {errors.state && (
                <p className="errorTextColor mt-1 text-sm">{errors.state}</p>
              )}
            </div>

            <div className="input-group">
              <label
                htmlFor="city"
                className="block text-fontColor text-sm md:text-base lg:text-lg xl:text-xl"
              >
                City <span className="errorTextColor">*</span>
              </label>
              <CitySelect
                countryid={countryid}
                stateid={stateid}
                onChange={handleCityChange}
                value={formData.city}
                placeHolder="Select City"
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
              {errors.city && (
                <p className="errorTextColor mt-1 text-sm">{errors.city}</p>
              )}
            </div>

            <div className="input-group">
  <label
    htmlFor="pin_code"
    className="block text-fontColor text-sm md:text-base lg:text-lg xl:text-xl"
  >
    Pin Code <span className="errorTextColor">*</span>
  </label>
  <input
    type="text"
    id="pin_code"
    name="pin_code"
    value={formData.pin_code}
    onChange={handleChange}
    required
    className="w-full px-4 py-2 border rounded-md focus:outline-none"
    inputMode="numeric"
  />
  {errors.pin_code && (
    <p className="errorTextColor mt-1 text-sm">{errors.pin_code}</p>
  )}
</div>


            <div className="input-group">
              <label
                htmlFor="user_type"
                className="block text-fontColor text-sm md:text-base lg:text-lg xl:text-xl"
              >
                User Type
              </label>
              <input
                type="text"
                id="user_type"
                name="user_type"
                value={formData.user_type}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
            </div>

            <div className="input-group">
              <label
                htmlFor="membership_id"
                className="block text-fontColor text-sm md:text-base lg:text-lg xl:text-xl"
              >
                Membership ID
              </label>
              <input
                type="text"
                id="membership_id"
                name="membership_id"
                value={formData.membership_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
            </div>

            <div className="input-group">
              <label
                htmlFor="usergroup_id"
                className="block text-fontColor text-sm md:text-base lg:text-lg xl:text-xl"
              >
                User Group ID
              </label>
              <input
                type="text"
                id="usergroup_id"
                name="usergroup_id"
                value={formData.usergroup_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
            </div>

            <div className="input-group">
              <label
                htmlFor="referrer_id"
                className="block text-fontColor text-sm md:text-base lg:text-lg xl:text-xl "
              >
                Referrer ID
              </label>
              <input
                type="text"
                id="referrer_id"
                name="referrer_id"
                value={formData.referrer_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
            </div>

            <div className="input-group">
              <label
                htmlFor="remark"
                className="block text-fontColor text-sm md:text-base lg:text-lg xl:text-xl"
              >
                Remark
              </label>
              <textarea
                id="remark"
                name="remark"
                value={formData.remark}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-themeColorOrange text-white py-2 px-4 rounded-md hover:bg-hoverButtonColorOrange text-sm md:text-base lg:text-lg xl:text-xl"
            disabled={loading}
          >
            {loading ? <Loader /> : "Signup"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-fontColor text-sm md:text-base lg:text-lg xl:text-xl">
            Already have an account?{" "}
          </span>
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 text-sm md:text-base lg:text-lg xl:text-xl"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
