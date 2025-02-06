//prutl-frontend-npm6node14/src/components/userManagement/UserList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  deleteUser,
  updateUser,
} from "../../redux/slices/userSlice";
import {
  // registerUser,
  registerUserByAdmin,
} from "../../redux/slices/authSlice";
import { getAllMemberships } from "../../redux/slices/membershipSlice";
import { getAllUserGroups } from "../../redux/slices/userGroupSlice";
import EditableSelectInput from "../common/EditableSelectInput ";
import EditablePhoneInput from "../common/EditablePhoneInput";
import EditableCountrySelect from "../common/EditableCountrySelect";
import EditableStateSelect from "../common/EditableStateSelect ";
import EditableCitySelect from "../common/EditableCitySelect";
import ErrorModal from "../common/ErrorModal";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const { memberships, loadingMemberships, errorMemberships } = useSelector(
    (state) => state.memberships
  );
  const { userGroups, loadingUserGroups, errorUserGroups } = useSelector(
    (state) => state.userGroups
  );
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    // user_code: null,
    name: "",
    date_of_birth: "",
    email: "",
    password: "",
    phone_number: "",
    user_type: "",
    membership_id: null,
    usergroup_id: null,
    referrer_id: null,
    city: "",
    county: "",
    state: "",
    country: "",
    pin_code: "",
    remark: "",
    profile_picture_url: null, // Profile picture in the state
  });
  // console.log('users in UserList page++++++++++++++++',users)
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [countryId, setCountryId] = useState(0);
  const [stateId, setStateId] = useState(0);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllMemberships());
    dispatch(getAllUserGroups());
  }, [dispatch]);

  useEffect(() => {
    console.log("newUser state updated:", newUser);
  }, [newUser]);

  const validateForm = (formData) => {
    let newErrors = {};

    // Validate name: must be alphabetic and include at least a surname (i.e., two words)
    if (!formData.name || !/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name must include alphabetic characters and a surname.";
    } else if (formData.name.trim().split(" ").length < 2) {
      newErrors.name = "Name must contain at least two words.";
    }

    // Validate email with detailed error conditions
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (
      formData.email.startsWith("@") ||
      formData.email.startsWith(".")
    ) {
      newErrors.email = "Email cannot start with '@' or '.'.";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Email must contain '@'.";
    } else if (!formData.email.includes(".")) {
      newErrors.email = "Email must contain a domain name (e.g., '.com').";
    } else if (
      formData.email.includes("@.") ||
      formData.email.indexOf("@") === formData.email.length - 1
    ) {
      newErrors.email =
        "Email cannot have a period right after '@' or be missing a domain name.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validate password: minimum 8 characters, including uppercase, number, and special character
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter.";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number.";
    } else if (!/[!@#$%^&*]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one special character.";
    }

    // Validate phone number: must be in international format
    if (
      !formData.phone_number ||
      !/^\+?[1-9]\d{1,14}$/.test(formData.phone_number)
    ) {
      newErrors.phone_number = "Please enter a valid phone number.";
    }

    // Validate country
    if (!formData.country || formData.country.trim() === "") {
      newErrors.country = "Please select a country.";
    }

    // Validate state
    if (!formData.state || formData.state.trim() === "") {
      newErrors.state = "Please select a state.";
    }

    // Validate city
    if (!formData.city || formData.city.trim() === "") {
      newErrors.city = "Please select a city.";
    }

    // Validate pin code: must be a 6-digit number
    if (!formData.pin_code || !/^\d{6}$/.test(formData.pin_code)) {
      newErrors.pin_code = "Please enter a valid 6-digit pin code.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
    //  console.log('userId sent on delete button',user_id)
  };
  // const handleEdit = (user) => {
  //   // setEditingUser({ ...user });
  //   setCountryId(user.country); // Set the country based on the current user
  //   setStateId(user.state); // Set the state based on the current user
  //   setEditingUser({
  //     ...user,
  //     profile_picture_url: user.profile_picture_url || null,
  //   });
  //   console.log("profile picture url +++++++", user.profile_picture_url);
  // };
  const handleEdit = (user) => {
    setCountryId(user.country); // Set the country based on the current user
    setStateId(user.state); // Set the state based on the current user
    setEditingUser({
      ...user,
      profile_picture_url: user.profile_picture_url || null, // Ensure profile_picture_url is either valid or null
    });
    console.log("profile picture url +++++++", user.profile_picture_url);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file); // Log to ensure the file is selected
    if (file && file instanceof File) {
      if (editingUser) {
        setEditingUser({ ...editingUser, profile_picture_url: file });
        console.log("editingUser with updated Profile Picture:", {
          ...editingUser,
          profile_picture_url: file,
        });
      } else {
        setNewUser({ ...newUser, profile_picture_url: file });
        console.log("New User with updated Profile Picture:", {
          ...newUser,
          profile_picture_url: file,
        });
      }
    } else {
      console.log("Invalid file selection or no file selected");
    }
  };

  // const handleDeleteProfilePicture = () => {
  //   if (editingUser) {
  //     setEditingUser({ ...editingUser, profile_picture_url: null });
  //   } else {
  //     setNewUser({ ...newUser, profile_picture_url: null });
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingUser) {
      setEditingUser({ ...editingUser, [name]: value });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const handleCountryChange = (e) => {
    const { value, countryId } = e.target;
    setCountryId(countryId);

    if (editingUser) {
      setEditingUser((prev) => ({
        ...prev,
        country: value,
        state: "",
        city: "",
      }));
    } else {
      setNewUser((prev) => ({
        ...prev,
        country: value,
        state: "",
        city: "",
      }));
    }
  };

  const handleStateChange = (e) => {
    const { value, stateId } = e.target;
    setStateId(stateId);

    if (editingUser) {
      setEditingUser((prev) => ({
        ...prev,
        state: value,
        city: "",
      }));
    } else {
      setNewUser((prev) => ({
        ...prev,
        state: value,
        city: "",
      }));
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    if (editingUser) {
      if (editingUser.user_id) {
        // formData.append("userId", editingUser.user_id);
        formData.append("name", editingUser.name);
        formData.append("date_of_birth", editingUser.date_of_birth);
        formData.append("email", editingUser.email);
        formData.append("phone_number", editingUser.phone_number);
        formData.append("password", editingUser.password || ""); // Fix key
        formData.append("user_type", editingUser.user_type);
        formData.append("membership_id", editingUser.membership_id || null);
        formData.append("usergroup_id", editingUser.usergroup_id || null);
        formData.append("referrer_id", editingUser.referrer_id || null);
        formData.append("city", editingUser.city);
        formData.append("county", editingUser.county);
        formData.append("state", editingUser.state);
        formData.append("country", editingUser.country);
        formData.append("pin_code", editingUser.pin_code);
        formData.append("remark", editingUser.remark);
        // Check if the profile picture is a File before appending
        if (editingUser.profile_picture_url instanceof File) {
          formData.append(
            "profile_picture",
            editingUser.profile_picture_url || null
          );
        }

        // Logging FormData content
        for (let [key, value] of formData.entries()) {
          if (key === "profile_picture") {
            console.log(
              `${key}: ${value.name}, type: ${value.type}, size: ${value.size} bytes`
            );
          } else {
            console.log(`${key}: ${value}`);
          }
        }
        dispatch(
          updateUser({ userId: editingUser.user_id, data: formData })
          // updateUser({ userId: editingUser.user_id, data: editingUser })
        );
      } else {
        console.error("Error: user_id or editingUser is undefined");
      }
      setEditingUser(null);
    } else {
      if (validateForm(newUser)) {
        formData.append("name", newUser.name);
        formData.append("date_of_birth", newUser.date_of_birth);
        formData.append("email", newUser.email);
        formData.append("phone_number", newUser.phone_number);
        formData.append("password", newUser.password || "");
        formData.append("user_type", newUser.user_type);
        formData.append("membership_id", newUser.membership_id || null);
        formData.append("usergroup_id", newUser.usergroup_id || null);
        formData.append("referrer_id", newUser.referrer_id || null);
        formData.append("city", newUser.city);
        formData.append("county", newUser.county);
        formData.append("state", newUser.state);
        formData.append("country", newUser.country);
        formData.append("pin_code", newUser.pin_code);
        formData.append("remark", newUser.remark);

        if (newUser.profile_picture_url instanceof File) {
          formData.append(
            "profile_picture",
            newUser.profile_picture_url || null
          );
        }

        // Logging FormData content
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
        dispatch(registerUserByAdmin(formData));
        //     dispatch(registerUserByAdmin(newUser));
        setNewUser({
          name: "",
          date_of_birth: "",
          email: "",
          phone_number: "",
          password: "",
          user_type: "",
          membership_id: null,
          usergroup_id: null,
          referrer_id: null,
          city: "",
          county: "",
          state: "",
          country: "",
          pin_code: "",
          remark: "",
          profile_picture_url: null,
        });
        setCountryId(null); // Reset country ID on save
        setStateId(null); // Reset state ID on save
        setShowModal(false);
      }
    }
  };

  // const handleSave = () => {
  //   const formData = new FormData();
  //   if (editingUser) {
  //     if (validateForm(editingUser)) {
  //       formData.append("userId", editingUser.user_id);
  //       formData.append("name", editingUser.name);
  //       formData.append("date_of_birth", editingUser.date_of_birth);
  //       formData.append("email", editingUser.email);
  //       formData.append("phone_number", editingUser.phone_number);
  //       formData.append(" password:",editingUser.password);
  //       formData.append("user_type", editingUser.user_type);
  //       formData.append("membership_id", editingUser.membership_id);
  //       formData.append("usergroup_id", editingUser.usergroup_id);
  //       formData.append("referrer_id", editingUser.referrer_id);
  //       formData.append("city", editingUser.city);
  //       formData.append("county", editingUser.county);
  //       formData.append("state", editingUser.state);
  //       formData.append("country", editingUser.country);
  //       formData.append("pin_code", editingUser.pin_code);
  //       formData.append("remark", editingUser.remark);
  //       if (editingUser.profile_picture_url) {
  //         formData.append("profile_picture", editingUser.profile_picture_url);
  //       }
  //       dispatch(updateUser({ userId: editingUser.user_id, data: formData }));
  //       setEditingUser(null);
  //     }
  //   } else {
  //     if (validateForm(newUser)) {
  //       formData.append("name", newUser.name);
  //       formData.append("date_of_birth", newUser.date_of_birth);
  //       formData.append("email", newUser.email);
  //       formData.append("phone_number", newUser.phone_number);
  //       formData.append("password", newUser.password);
  //       formData.append("user_type", newUser.user_type);
  //       formData.append("membership_id", newUser.membership_id);
  //       formData.append("usergroup_id", newUser.usergroup_id);
  //       formData.append("referrer_id", newUser.referrer_id);
  //       formData.append("city", newUser.city);
  //       formData.append("county", newUser.county);
  //       formData.append("state", newUser.state);
  //       formData.append("country", newUser.country);
  //       formData.append("pin_code", newUser.pin_code);
  //       formData.append("remark", newUser.remark);
  //       if (newUser.profile_picture_url) {
  //         formData.append("profile_picture", newUser.profile_picture_url);
  //       }
  //       dispatch(registerUserByAdmin(formData));
  //       setNewUser({
  //         name: "",
  //         date_of_birth: "",
  //         email: "",
  //         phone_number: "",
  //         password: "",
  //         user_type: "",
  //         membership_id: null,
  //         usergroup_id: null,
  //         referrer_id: null,
  //         city: "",
  //         county: "",
  //         state: "",
  //         country: "",
  //         pin_code: "",
  //         remark: "",
  //         profile_picture_url:null,
  //       });
  //       setShowModal(false);
  //     }
  //   }
  // };

  const handleUndo = () => {
    setEditingUser(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewUser({
      name: "",
      date_of_birth: "",
      email: "",
      phone_number: "",
      password: "",
      user_type: "",
      membership_id: null,
      usergroup_id: null,
      referrer_id: null,
      city: "",
      county: "",
      state: "",
      country: "",
      pin_code: "",
      remark: "",
      profile_picture_url: null,
    });
    setCountryId(null); // Reset country ID on save
    setStateId(null); // Reset state ID on save
    // setErrors('');
  };

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handleCloseModal = () => {
    setShowError(false);
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading users...");
    }
    if (error) {
      console.error("Error fetching users:", error);
    }
    if (users.length > 0) {
      console.log("Fetched users:", users);
    }
    if (loadingMemberships) {
      console.log("Loading memberships...");
    }
    if (errorMemberships) {
      console.error("Error fetching memberships:", errorMemberships);
    }
    if (memberships.length > 0) {
      console.log("Fetched memberships:", memberships);
    }
    if (loadingUserGroups) {
      console.log("Loading usergroups...");
    }
    if (errorUserGroups) {
      console.error("Error fetching userGroups:", errorUserGroups);
    }
    if (userGroups.length > 0) {
      console.log("Fetched userGroups:", userGroups);
    }
  }, [
    loading,
    error,
    users,
    memberships,
    loadingMemberships,
    errorMemberships,
    userGroups,
    loadingUserGroups,
    errorUserGroups,
  ]);

  if (loading) {
    return <p>Loading...</p>;
  }
  // if (error) {
  //   return <p className="error-message">{error}</p>;
  // }
  if (loadingMemberships) {
    return <p>Loading...</p>;
  }
  if (errorMemberships) {
    return <p className="error-message">{errorMemberships}</p>;
  }
  if (loadingUserGroups) {
    return <p>Loading...</p>;
  }
  if (errorUserGroups) {
    return <p className="error-message">{errorMemberships}</p>;
  }

  return (
    <div className="user-list overflow-auto ">
      {error && (
        <p className="error-message">
          {showError && (
            <ErrorModal message={error} onClose={handleCloseModal} />
          )}
        </p>
      )}
      <button
        className="bg-blue-500 text-white px-4 py-2 m-2 rounded mb-4"
        onClick={toggleModal}
      >
        Create New User
      </button>

      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete  ">
            <tr>
              <th className="px-4 py-2 whitespace-nowrap">Name</th>
              <th className="px-4 py-2 whitespace-nowrap">DOB</th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">Email</th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">Password</th>
              <th className="px-28 py-2 mx-28  whitespace-nowrap">Phone</th>
              <th className="px-4 py-2 whitespace-nowrap">Type</th>
              <th className="px-4 py-2 whitespace-nowrap">Membership</th>
              <th className="px-4 py-2 whitespace-nowrap">Usergroup Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Referrer Name</th>
              <th className="px-28 py-2 mx-28  whitespace-nowrap">Country</th>
              <th className="px-28 py-2 mx-28  whitespace-nowrap">State</th>
              <th className="px-28 py-2 mx-28  whitespace-nowrap">City</th>
              <th className="px-28 py-2 mx-28  whitespace-nowrap">County</th>
              <th className="px-4 py-2 whitespace-nowrap">Pin Code</th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">Remark</th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">
                Profile Image
              </th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
                  {user.user_id}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingUser && editingUser.user_id === user.user_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="user_code"
                        value={editingUser.user_code || null}
                        onChange={handleInputChange}
                        placeholder="User Code"
                      />
                    </div>
                  ) : (
                    user.user_code
                  )}
                </td> */}

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingUser && editingUser.user_id === user.user_id ? (
                    <EditableSelectInput
                      name="name"
                      options={users.map((user) => ({
                        value: user.name, // Actual value (name)
                        label: user.name, // Display value (user.name)
                      }))}
                      value={editingUser.name}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.name}
                      placeholder="Select Name"
                      id="name"
                    />
                  ) : (
                    user.name
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingUser && editingUser.user_id === user.user_id ? (
                    <div className="input-group">
                      <input
                        type="date"
                        name="date_of_birth"
                        value={editingUser.date_of_birth || ""}
                        onChange={handleInputChange}
                        placeholder="Start DOB"
                      />
                    </div>
                  ) : (
                    // user.date_of_birth
                    new Date(user.date_of_birth).toLocaleDateString()
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingUser && editingUser.user_id === user.user_id ? (
                    <EditableSelectInput
                      name="email"
                      options={users.map((user) => ({
                        value: user.email, // Actual value (email)
                        label: user.email, // Display value (user.email)
                      }))}
                      value={editingUser.email}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.email}
                      placeholder="Select User Email"
                      id="email"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingUser && editingUser.user_id === user.user_id ? (
                    <div className="input-group">
                      <input
                        type="password"
                        name="password"
                        value={editingUser.password || ""}
                        onChange={handleInputChange}
                        placeholder="Password"
                      />
                    </div>
                  ) : (
                    // user.password
                    ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingUser && editingUser.user_id === user.user_id ? (
                    <EditablePhoneInput
                      // label="Phone Number"
                      name="phone_number"
                      value={editingUser.phone_number}
                      onChange={handleInputChange}
                      editable={true} // Allows editing
                      placeholder="Enter Phone Number"
                      // error={errors.phone_number} // Pass any error message if needed
                      country="in" // Set country to 'in' (India) or any other country code
                    />
                  ) : (
                    user.phone_number || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingUser && editingUser.user_id === user.user_id ? (
                    <EditableSelectInput
                      name="user_type"
                      options={users.map((user) => ({
                        value: user.user_type, // Actual value (user_type)
                        label: user.user_type, // Display value (user.user_type)
                      }))}
                      value={editingUser.user_type}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.user_type}
                      placeholder="Select User Type"
                      id="user_type"
                    />
                  ) : (
                    user.user_type
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingUser && editingUser.user_id === user.user_id ? (
                    <EditableSelectInput
                      name="membership_id"
                      options={memberships.map((membership) => ({
                        value: membership.membership_id, // Actual value (membership_id)
                        label: membership.membership_type, // Display value (membership.membership_type)
                      }))}
                      value={editingUser.membership_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.membership_id}
                      placeholder="Select Membership Type"
                      id="membership_id"
                    />
                  ) : (
                    // user.user_type
                    // Display membership type based on membership id when not in edit mode
                    memberships.find(
                      (membership) =>
                        membership.membership_id === user.membership_id
                    )?.membership_type || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingUser && editingUser.user_id === user.user_id ? (
                    <EditableSelectInput
                      name="usergroup_id"
                      options={userGroups.map((usergroup) => ({
                        value: usergroup.usergroup_id, // Actual value (usergroup_id)
                        label: usergroup.group_name, // Display value (userGroup.group_name)
                      }))}
                      value={editingUser.usergroup_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.usergroup_id}
                      placeholder="Select User Group Name"
                      id="usergroup_id"
                    />
                  ) : (
                    // user.usergroup_id
                    // Display membership type based on membership id when not in edit mode
                    userGroups.find(
                      (usergroup) =>
                        usergroup.usergroup_id === user.usergroup_id
                    )?.group_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingUser && editingUser.user_id === user.user_id ? (
                    <EditableSelectInput
                      name="referrer_id"
                      options={users.map((user) => ({
                        value: user.user_id, // Actual value (user_id)
                        label: user.name, // Display value (user.name)
                      }))}
                      value={editingUser.referrer_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      placeholder="Select Referrer Name"
                      id="referrer_id"
                    />
                  ) : (
                    // Find the referrer's name based on referrer_id
                    users.find(
                      (referrer) => referrer.user_id === user.referrer_id
                    )?.name || "No Referrer"
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingUser && editingUser.user_id === user.user_id ? (
                    <EditableCountrySelect
                      // label="Country"
                      name="country"
                      value={editingUser.country} // The country code
                      onChange={handleCountryChange} // Update function
                      editable={true} // Allows editing
                      placeholder="Select Country"
                      // error={errors.country} // Pass any error message if needed
                    />
                  ) : (
                    user.country || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingUser && editingUser.user_id === user.user_id ? (
                    <EditableStateSelect
                      // label="State"
                      countryId={countryId}
                      name="state"
                      value={editingUser.state || ""}
                      onChange={handleStateChange}
                      editable={!!countryId} // Enable only if a country is selected
                      placeholder="Select State"
                      // error={errors.state}
                    />
                  ) : (
                    user.state || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingUser && editingUser.user_id === user.user_id ? (
                    <EditableCitySelect
                      // label="City"
                      countryId={countryId}
                      stateId={stateId}
                      name="city"
                      value={editingUser.city || ""}
                      onChange={handleInputChange}
                      editable={!!stateId} // Enable only if a state is selected
                      placeholder="Select City"
                      // error={errors.city}
                    />
                  ) : (
                    user.city || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingUser && editingUser.user_id === user.user_id ? (
                    <EditableSelectInput
                      name="county"
                      options={users.map((user) => ({
                        value: user.county, // Actual value (county)
                        label: user.county, // Display value (user.county)
                      }))}
                      value={editingUser.county}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.county}
                      placeholder="Select County Name"
                      id="county"
                    />
                  ) : (
                    user.county
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingUser && editingUser.user_id === user.user_id ? (
                    <EditableSelectInput
                      name="pin_code"
                      options={users.map((user) => ({
                        value: user.pin_code, // Actual value (pin_code)
                        label: user.pin_code, // Display value (user.pin_code)
                      }))}
                      value={editingUser.pin_code}
                      onChange={handleInputChange}
                      editable={true} // Allows typing or selection from dropdown
                      // error={errors.pin_code}
                      // showRequired={true}
                      placeholder="Select or Enter Pin Code"
                      id="pin_code"
                      isNumeric="true"
                      maxDigits={6}
                    />
                  ) : (
                    user.pin_code
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap ">
                  {editingUser && editingUser.user_id === user.user_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingUser.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    user.remark
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingUser && editingUser.user_id === user.user_id ? (
                    <>
                      {/* Check if the profile picture is a file (selected by the user) */}
                      <div className="flex items-center space-x-4">
                        {editingUser.profile_picture_url instanceof File ? (
                          <img
                            src={URL.createObjectURL(
                              editingUser.profile_picture_url
                            )}
                            alt="Profile"
                            width="50"
                            height="50"
                          />
                        ) : editingUser.profile_picture_url ? (
                          /* If the profile picture is a URL (from the database) */
                          <img
                            // src={`http://localhost:5000${editingUser.profile_picture_url}`} // Ensure the backend URL is correctly prefixed
                            src={`${process.env.REACT_APP_BACKEND_URL}${editingUser.profile_picture_url}`} // Use environment variable
                            alt="Profile"
                            width="50"
                            height="50"
                          />
                        ) : (
                          <p>No Profile Picture</p>
                        )}
                        <input
                          type="file"
                          name="profile_picture"
                          accept="image/*" // Accept only image files
                          onChange={handleProfilePictureChange}
                        />
                      </div>
                    </>
                  ) : /* Display user profile picture from the user object if available */
                  user.profile_picture_url ? (
                    <img
                      // src={`http://localhost:5000${user.profile_picture_url}`} // Prefixing the URL with backend address
                      src={`${process.env.REACT_APP_BACKEND_URL}${user.profile_picture_url}`} // Use environment variable
                      alt="Profile"
                      width="50"
                      height="50"
                    />
                  ) : (
                    <p>No Profile Picture</p>
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingUser && editingUser.user_id === user.user_id ? (
                    <>
                      <button
                        className="bg-green-500 text-white px-4 py-1 mx-5 rounded"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 text-white px-3 py-1 rounded"
                        onClick={handleUndo}
                      >
                        Undo
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-blue-500 text-white my-1 px-5 py-1 mx-5 rounded"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 my-1 rounded"
                        onClick={() => handleDelete(user.user_id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {showModal && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center mt-12 z-30  ">
                <div className="registerCard px-6 py-1 rounded-lg shadow-lg w-full max-w-6xl  ">
                  <h2 className="text-2xl font-semibold mb-4">
                    Register New User
                  </h2>
                  <form className="grid grid-cols-5 gap-4 ">
                    {/* <div className="input-group">
                      <label htmlFor="user_code">User Code</label>
                      <input
                        type="text"
                        name="user_code"
                        // value={newUser.user_code || null}
                        value={
                          (editingUser
                            ? editingUser.user_code
                            : newUser.user_code) || null
                        }
                        onChange={handleInputChange}
                        placeholder="User Code"
                        className="w-full p-2 mb-4 border rounded"
                      />
                     
                    </div> */}

                    <EditableSelectInput
                      label="Name"
                      name="name"
                      options={users.map((user) => ({
                        value: user.name, // Actual value (name)
                        label: user.name, // Display value (user.name)
                      }))}
                      value={newUser.name}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      error={errors.name}
                      showRequired={true}
                      placeholder="Select Name"
                      id="name"
                    />

                   

                    <EditableSelectInput
                      label="Email"
                      name="email"
                      options={users.map((user) => ({
                        value: user.email, // Actual value (email)
                        label: user.email, // Display value (user.email)
                      }))}
                      value={newUser.email}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      error={errors.email}
                      showRequired={true}
                      placeholder="Select User Email"
                      id="email"
                    />

                    <div className="input-group row-span-3">
                      <label htmlFor="password">
                        Password <span className="error-message">*</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        // value={newUser.password || ""}
                        value={newUser.password || ""}
                        onChange={handleInputChange}
                        placeholder="Password"
                      />
                      {errors.password && (
                        <p className="error-message text-sm">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <EditablePhoneInput
                      label="Phone Number"
                      name="phone_number"
                      value={newUser.phone_number}
                      onChange={handleInputChange}
                      editable={true} // Allows editing
                      placeholder="Enter Phone Number"
                      error={errors.phone_number} // Pass any error message if needed
                      showRequired={true}
                      country="in" // Set country to 'in' (India) or any other country code
                    />

<div className="input-group row-span-3 ml-20">
                      <label htmlFor="start_date">
                        DOB <span className="error-message">*</span>
                      </label>
                      <input
                        type="date"
                        name="date_of_birth"
                        value={newUser.date_of_birth || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 mb-4 border rounded"
                      />
                      {errors.start_date && (
                        <p className="error-message text-sm">
                          {errors.date_of_birth}
                        </p>
                      )}
                    </div>

                    {/* <div className="input-group row-span-3 ml-20"> */}
                      <EditableSelectInput
                        label="Type"
                        name="user_type"
                        options={users.map((user) => ({
                          value: user.user_type, // Actual value (user_type)
                          label: user.user_type, // Display value (user.user_type)
                        }))}
                        value={newUser.user_type}
                        onChange={handleInputChange}
                        editable={true} // Allows typing and selection from dropdown
                        error={errors.user_type}
                        // showRequired={true}
                        placeholder="Select User Type"
                        id="user_type"
                      />
                    {/* </div> */}
                    <EditableSelectInput
                      label="Membership Type"
                      name="membership_id"
                      options={memberships.map((membership) => ({
                        value: membership.membership_id, // Actual value (membership_id)
                        label: membership.membership_type, // Display value (membership.membership_type)
                      }))}
                      value={newUser.membership_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      error={errors.membership_id}
                      // showRequired={true}
                      placeholder="Select Membership Type"
                      id="membership_id"
                    />

                    <EditableSelectInput
                      label="User Group"
                      name="usergroup_id"
                      options={userGroups.map((usergroup) => ({
                        value: usergroup.usergroup_id, // Actual value (usergroup_id)
                        label: usergroup.group_name, // Display value (userGroup.group_name)
                      }))}
                      value={newUser.usergroup_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      error={errors.usergroup_id}
                      // showRequired={true}
                      placeholder="Select User Group Name"
                      id="usergroup_id"
                    />
                    <EditableSelectInput
                      label="Referrer Name"
                      name="referrer_id"
                      options={users.map((user) => ({
                        value: user.user_id, // Actual value (user_id)
                        label: user.name, // Display value (user.name)
                      }))}
                      value={newUser.referrer_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      error={errors.referrer_id} // Pass any error message if needed
                      placeholder="Select Referrer Name"
                      id="referrer_id"
                    />

                    <EditableCountrySelect
                      label="Country"
                      name="country"
                      value={newUser.country} // The country code
                      onChange={handleCountryChange} // Update function
                      editable={true} // Allows editing
                      placeholder="Select Country"
                      error={errors.country} // Pass any error message if needed
                      showRequired={true}
                    />

                    <EditableStateSelect
                      label="State"
                      countryId={countryId}
                      name="state"
                      value={newUser.state || ""}
                      onChange={handleStateChange}
                      editable={!!countryId} // Enable only if a country is selected
                      placeholder="Select State"
                      error={errors.state}
                      showRequired={true}
                    />

                    <EditableCitySelect
                      label="City"
                      countryId={countryId}
                      stateId={stateId}
                      name="city"
                      value={newUser.city || ""}
                      onChange={handleInputChange}
                      editable={!!stateId} // Enable only if a state is selected
                      placeholder="Select City"
                      error={errors.city}
                      showRequired={true}
                    />

                    <EditableSelectInput
                      label="County"
                      name="county"
                      options={users.map((user) => ({
                        value: user.county, // Actual value (county)
                        label: user.county, // Display value (user.county)
                      }))}
                      value={newUser.county}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      error={errors.county}
                      placeholder="Select County Name"
                      id="county"
                    />

                    <EditableSelectInput
                      label="Pin Code"
                      name="pin_code"
                      options={users.map((user) => ({
                        value: user.pin_code, // Actual value (pin_code)
                        label: user.pin_code, // Display value (user.pin_code)
                      }))}
                      value={newUser.pin_code}
                      onChange={handleInputChange}
                      editable={true} // Allows typing or selection from dropdown
                      error={errors.pin_code}
                      showRequired={true}
                      placeholder="Select or Enter Pin Code"
                      id="pin_code"
                      isNumeric="true"
                      maxDigits={6}
                    />

                    <div className="input-group row-span-3">
                      <label htmlFor="remark">Remark</label>
                      <textarea
                        name="remark"
                        value={newUser.remark}
                        onChange={handleInputChange}
                        placeholder="Remark"
                        className="w-full p-2 mb-4 border rounded"
                      />
                    </div>
                    <div className="input-group row-span-3">
                      <label htmlFor="profile_picture_url">Profile Image</label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="file"
                          name="profile_picture"
                          accept="image/*" // Accept only image files
                          onChange={handleProfilePictureChange}
                        />

                        {newUser.profile_picture_url && (
                          <img
                            src={URL.createObjectURL(
                              newUser.profile_picture_url
                            )}
                            alt="Profile"
                            width="50"
                            height="50"
                          />
                        )}
                      </div>

                      {/* <button onClick={handleDeleteProfilePicture}>
                        Delete Picture
                      </button> */}
                    </div>

                    <div className="col-span-5 text-center">
                      <button
                        type="button"
                        className="bg-green-500 text-white px-4 py-2  rounded "
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="bg-gray-500 text-white px-4 py-2  rounded ml-2"
                        onClick={toggleModal}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;

// //prutl-frontend-npm6node14/src/components/userManagement/UserList.jsx
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllUsers,
//   deleteUser,
//   updateUser,
// } from "../../redux/slices/userSlice";
// import { registerUser } from "../../redux/slices/authSlice";
// import EditableSelectInput from "../common/EditableSelectInput ";
// import EditablePhoneInput from "../common/EditablePhoneInput";
// import ErrorModal from "../common/ErrorModal";
// import { getAllMemberships } from "../../redux/slices/membershipSlice";
// import { getAllUserGroups } from "../../redux/slices/userGroupSlice";
// import EditableCountrySelect from "../common/EditableCountrySelect";
// import EditableStateSelect from "../common/EditableStateSelect ";
// import EditableCitySelect from "../common/EditableCitySelect";

// const UserList = () => {
//   const dispatch = useDispatch();
//   // const { users, loading, error } = useSelector((state) => state.users);
//   const { users, loading, error } = useSelector((state) => state.users);
//   const { memberships, loadingMemberships, errorMemberships } = useSelector(
//     (state) => state.memberships
//   );
//   const { userGroups, loadingUserGroups, errorUserGroups } = useSelector(
//     (state) => state.userGroups
//   );
//   const [editingUser, setEditingUser] = useState(null);
//   const [newUser, setNewUser] = useState({
//     // user_code: null,
//     name: "",
//     email: "",
//     password: "",
//     phone_number: "",
//     user_type: "",
//     membership_id: "",
//     usergroup_id: "",
//     referrer_id: "",
//     city: "",
//     county: "",
//     state: "",
//     country: "",
//     pin_code: "",
//     remark: "",
//   });
//   // console.log('users in UserList page++++++++++++++++',users)
//   const [errors, setErrors] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [showError, setShowError] = useState(false);
//   const [countryId, setCountryId] = useState(0);
//   const [stateId, setStateId] = useState(0);

//   useEffect(() => {
//     dispatch(getAllUsers());
//     dispatch(getAllMemberships());
//     dispatch(getAllUserGroups());
//   }, [dispatch]);

//   const handleDelete = (userId) => {
//     dispatch(deleteUser(userId));
//     //  console.log('userId sent on delete button',user_id)
//   };
//   const handleEdit = (user) => {
//     setEditingUser({ ...user });
//     setCountryId(user.country); // Set the country based on the current user
//     setStateId(user.state); // Set the state based on the current user
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (editingUser) {
//       setEditingUser({ ...editingUser, [name]: value });
//     } else {
//       setNewUser({ ...newUser, [name]: value });
//     }
//   };

//   const handleCountryChange = (e) => {
//     const { value, countryId } = e.target;
//     setCountryId(countryId);

//     if (editingUser) {
//       setEditingUser((prev) => ({
//         ...prev,
//         country: value,
//         state: "",
//         city: "",
//       }));
//     } else {
//       setNewUser((prev) => ({
//         ...prev,
//         country: value,
//         state: "",
//         city: "",
//       }));
//     }
//   };

//   const handleStateChange = (e) => {
//     const { value, stateId } = e.target;
//     setStateId(stateId);

//     if (editingUser) {
//       setEditingUser((prev) => ({
//         ...prev,
//         state: value,
//         city: "",
//       }));
//     } else {
//       setNewUser((prev) => ({
//         ...prev,
//         state: value,
//         city: "",
//       }));
//     }
//   };

//   const validateForm = (formData) => {
//     let newErrors = {};

//     if (!formData.name || !/^[a-zA-Z\s]+$/.test(formData.name)) {
//       newErrors.name = "Required name with surname.";
//     }

//     if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Required email address.";
//     }

//     if (!formData.password || formData.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters long.";
//     }

//     // if (
//     //   !formData.phone_number ||
//     //   !/^\+?[1-9]\d{1,14}$/.test(formData.phone_number)
//     // ) {
//     //   newErrors.phone_number = "Required phone number";
//     // }

//     // if (!formData.country) {
//     //   newErrors.country = "Please select a country.";
//     // }

//     // if (!formData.state) {
//     //   newErrors.state = "Please select a state.";
//     // }

//     // if (!formData.city) {
//     //   newErrors.city = "Please select a city.";
//     // }

//     // if (
//     //   !formData.pin_code ||
//     //   formData.pin_code.length !== 6 ||
//     //   !/^\d{6}$/.test(formData.pin_code)
//     // ) {
//     //   newErrors.pin_code = "Please enter a valid 6-digit pin code.";
//     // }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSave = () => {
//     if (editingUser) {
//       if (editingUser.user_id && editingUser) {
//         dispatch(
//           updateUser({ userId: editingUser.user_id, data: editingUser })
//         );
//       } else {
//         console.error("Error: user_id or editingUser is undefined");
//       }
//       setEditingUser(null);
//     } else {
//       if (validateForm(newUser)) {
//         dispatch(registerUser(newUser));
//         setNewUser({
//           // user_code: null,
//           name: "",
//           email: "",
//           phone_number: "",
//           password: "",
//           user_type: "",
//           membership_id: "",
//           usergroup_id: "",
//           referrer_id: "",
//           city: "",
//           county: "",
//           state: "",
//           country: "",
//           pin_code: "",
//           remark: "",
//         });
//         setCountryId(null); // Reset country ID on save
//         setStateId(null); // Reset state ID on save
//         setShowModal(false);
//       }
//     }
//   };

//   const handleUndo = () => {
//     setEditingUser(null);
//   };

//   const toggleModal = () => {
//     setShowModal(!showModal);
//     setNewUser({
//       // user_code: null,
//       name: "",
//       email: "",
//       phone_number: "",
//       password: "",
//       user_type: "",
//       membership_id: "",
//       usergroup_id: "",
//       referrer_id: "",
//       city: "",
//       county: "",
//       state: "",
//       country: "",
//       pin_code: "",
//       remark: "",
//     });
//     setCountryId(null); // Reset country ID on save
//     setStateId(null); // Reset state ID on save
//   };

//   const handleCloseModal = () => {
//     setShowError(false);
//   };

//   useEffect(() => {
//     if (loading) {
//       console.log("Loading users...");
//     }
//     if (error) {
//       console.error("Error fetching users:", error);
//     }
//     if (users.length > 0) {
//       console.log("Fetched users:", users);
//     }
//     if (loadingMemberships) {
//       console.log("Loading memberships...");
//     }
//     if (errorMemberships) {
//       console.error("Error fetching memberships:", errorMemberships);
//     }
//     if (memberships.length > 0) {
//       console.log("Fetched memberships:", memberships);
//     }
//     if (loadingUserGroups) {
//       console.log("Loading usergroups...");
//     }
//     if (errorUserGroups) {
//       console.error("Error fetching userGroups:", errorUserGroups);
//     }
//     if (userGroups.length > 0) {
//       console.log("Fetched userGroups:", userGroups);
//     }
//   }, [
//     loading,
//     error,
//     users,
//     memberships,
//     loadingMemberships,
//     errorMemberships,
//     userGroups,
//     loadingUserGroups,
//     errorUserGroups,
//   ]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   // if (error) {
//   //   return <p className="error-message">{error}</p>;
//   // }

//   if (loadingMemberships) {
//     return <p>Loading...</p>;
//   }
//   if (errorMemberships) {
//     return <p className="error-message">{errorMemberships}</p>;
//   }
//   if (loadingUserGroups) {
//     return <p>Loading...</p>;
//   }
//   if (errorUserGroups) {
//     return <p className="error-message">{errorMemberships}</p>;
//   }

//   return (
//     <div className="user-list overflow-auto ">
//       {error && (
//         <p className="error-message">
//           {showError && (
//             <ErrorModal message={error} onClose={handleCloseModal} />
//           )}
//         </p>
//       )}
//       <button
//         className="bg-blue-500 text-white px-4 py-2 m-2 rounded mb-4"
//         onClick={toggleModal}
//       >
//         Create New User
//       </button>

//       <div className="table-wrapper max-h-80 overflow-y-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete  ">
//             <tr>
//               {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
//                 User Id
//               </th> */}
//               {/* <th className="px-4 py-2 whitespace-nowrap">User Code</th> */}
//               <th className="px-4 py-2 whitespace-nowrap">Name</th>
//               <th className="px-28 py-2 mx-28 whitespace-nowrap">Email</th>
//               <th className="px-28 py-2 mx-28 whitespace-nowrap">Password</th>
//               <th className="px-28 py-2 mx-28  whitespace-nowrap">Phone</th>
//               <th className="px-4 py-2 whitespace-nowrap">Type</th>
//               <th className="px-4 py-2 whitespace-nowrap">Membership Name</th>
//               <th className="px-4 py-2 whitespace-nowrap">Usergroup Name</th>
//               <th className="px-4 py-2 whitespace-nowrap">Referrer Name</th>
//               <th className="px-28 py-2 mx-28  whitespace-nowrap">Country</th>
//               <th className="px-28 py-2 mx-28  whitespace-nowrap">City</th>
//               <th className="px-28 py-2 mx-28  whitespace-nowrap">State</th>
//               <th className="px-28 py-2 mx-28  whitespace-nowrap">County</th>
//               <th className="px-4 py-2 whitespace-nowrap">Pin Code</th>
//               <th className="px-28 py-2 mx-28 whitespace-nowrap">Remark</th>
//               <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.user_id}>
//                 {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
//                   {user.user_id}
//                 </td> */}
//                 {/* <td className="px-4 py-2 whitespace-nowrap">
//                   {editingUser && editingUser.user_id === user.user_id ? (
//                     <div className="input-group">
//                       <input
//                         type="text"
//                         name="user_code"
//                         value={editingUser.user_code || null}
//                         onChange={handleInputChange}
//                         placeholder="User Code"
//                       />
//                     </div>
//                   ) : (
//                     user.user_code
//                   )}
//                 </td> */}
//                 <td className="px-4 py-2 whitespace-nowrap">
//                   {editingUser && editingUser.user_id === user.user_id ? (
//                     <EditableSelectInput
//                       name="name"
//                       options={users.map((user) => ({
//                         value: user.name, // Actual value (name)
//                         label: user.name, // Display value (user.name)
//                       }))}
//                       value={editingUser.name}
//                       onChange={handleInputChange}
//                       editable={true} // Allows typing and selection from dropdown
//                       // error={errors.name}
//                       placeholder="Select Name"
//                       id="name"
//                     />
//                   ) : (
//                     user.name
//                   )}
//                 </td>

//                 <td className="px-4 py-2 whitespace-nowrap">
//                   {editingUser && editingUser.user_id === user.user_id ? (
//                     <EditableSelectInput
//                       name="email"
//                       options={users.map((user) => ({
//                         value: user.email, // Actual value (email)
//                         label: user.email, // Display value (user.email)
//                       }))}
//                       value={editingUser.email}
//                       onChange={handleInputChange}
//                       editable={true} // Allows typing and selection from dropdown
//                       // error={errors.email}
//                       placeholder="Select User Email"
//                       id="email"
//                     />
//                   ) : (
//                     user.email
//                   )}
//                 </td>
//                 <td className="px-4 py-2 whitespace-nowrap">
//                   {editingUser && editingUser.user_id === user.user_id ? (
//                     <div className="input-group">
//                       <input
//                         type="password"
//                         name="password"
//                         value={editingUser.password || ""}
//                         onChange={handleInputChange}
//                         placeholder="Password"
//                       />
//                     </div>
//                   ) : (
//                     user.password

//                   )}
//                 </td>
//                 {/*  */}

//                 <td className="px-4 py-2 whitespace-nowrap">
//                   {editingUser && editingUser.user_id === user.user_id ? (
//                     <EditablePhoneInput
//                       // label="Phone Number"
//                       name="phone_number"
//                       value={editingUser.phone_number}
//                       onChange={handleInputChange}
//                       editable={true} // Allows editing
//                       placeholder="Enter Phone Number"
//                       // error={errors.phone_number} // Pass any error message if needed
//                       country="in" // Set country to 'in' (India) or any other country code
//                     />
//                   ) : (
//                     user.phone_number || ""
//                   )}
//                 </td>

//                 <td className="px-4 py-2 whitespace-nowrap">
//                   {editingUser && editingUser.user_id === user.user_id ? (
//                     <EditableSelectInput
//                       name="user_type"
//                       options={users.map((user) => ({
//                         value: user.user_type, // Actual value (user_type)
//                         label: user.user_type, // Display value (user.user_type)
//                       }))}
//                       value={editingUser.user_type}
//                       onChange={handleInputChange}
//                       editable={true} // Allows typing and selection from dropdown
//                       // error={errors.user_type}
//                       placeholder="Select User Type"
//                       id="user_type"
//                     />
//                   ) : (
//                     user.user_type
//                   )}
//                 </td>

//                 <td className="px-4 py-2 whitespace-nowrap">
//                   {editingUser && editingUser.user_id === user.user_id ? (
//                     <EditableSelectInput
//                       name="membership_id"
//                       options={memberships.map((membership) => ({
//                         value: membership.membership_id, // Actual value (membership_id)
//                         label: membership.membership_type, // Display value (membership.membership_type)
//                       }))}
//                       value={editingUser.membership_id}
//                       onChange={handleInputChange}
//                       editable={false} // Allows selection from dropdown
//                       // error={errors.membership_id}
//                       placeholder="Select Membership Type"
//                       id="membership_id"
//                     />
//                   ) : (
//                     // user.user_type
//                     // Display membership type based on membership id when not in edit mode
//                     memberships.find(
//                       (membership) =>
//                         membership.membership_id === user.membership_id
//                     )?.membership_type || ""
//                   )}
//                 </td>

//                 <td className="px-4 py-2 whitespace-nowrap">
//                   {editingUser && editingUser.user_id === user.user_id ? (
//                     <EditableSelectInput
//                       name="usergroup_id"
//                       options={userGroups.map((usergroup) => ({
//                         value: usergroup.usergroup_id, // Actual value (usergroup_id)
//                         label: usergroup.group_name, // Display value (userGroup.group_name)
//                       }))}
//                       value={editingUser.usergroup_id}
//                       onChange={handleInputChange}
//                       editable={false} // Allows selection from dropdown
//                       // error={errors.usergroup_id}
//                       placeholder="Select User Group Name"
//                       id="usergroup_id"
//                     />
//                   ) : (
//                     // user.usergroup_id
//                     // Display membership type based on membership id when not in edit mode
//                     userGroups.find(
//                       (usergroup) =>
//                         usergroup.usergroup_id === user.usergroup_id
//                     )?.group_name || ""
//                   )}
//                 </td>

//                 <td className="px-4 py-2 whitespace-nowrap">
//                   {editingUser && editingUser.user_id === user.user_id ? (
//                     <EditableSelectInput
//                       name="referrer_id"
//                       options={users.map((user) => ({
//                         value: user.user_id, // Actual value (user_id)
//                         label: user.name, // Display value (user.name)
//                       }))}
//                       value={editingUser.referrer_id}
//                       onChange={handleInputChange}
//                       editable={false} // Allows selection from dropdown
//                       placeholder="Select Referrer Name"
//                       id="referrer_id"
//                     />
//                   ) : (
//                     // Find the referrer's name based on referrer_id
//                     users.find(
//                       (referrer) => referrer.user_id === user.referrer_id
//                     )?.name || "No Referrer"
//                   )}
//                 </td>

//                 <td className="px-4 py-2 whitespace-nowrap">
//                   {editingUser && editingUser.user_id === user.user_id ? (
//                     <EditableCountrySelect
//                       // label="Country"
//                       name="country"
//                       value={editingUser.country} // The country code
//                       onChange={handleCountryChange} // Update function
//                       editable={true} // Allows editing
//                       placeholder="Select Country"
//                       // error={errors.country} // Pass any error message if needed
//                     />
//                   ) : (
//                     user.country || ""
//                   )}
//                 </td>

//                 <td className="px-4 py-2 whitespace-nowrap">
//                   {editingUser && editingUser.user_id === user.user_id ? (
//                     <EditableStateSelect
//                       // label="State"
//                       countryId={countryId}
//                       name="state"
//                       value={editingUser.state || ""}
//                       onChange={handleStateChange}
//                       editable={!!countryId} // Enable only if a country is selected
//                       placeholder="Select State"
//                       // error={errors.state}
//                     />
//                   ) : (
//                     user.state || ""
//                   )}
//                 </td>

//                 <td className="px-4 py-2 whitespace-nowrap">
//                   {editingUser && editingUser.user_id === user.user_id ? (
//                     <EditableCitySelect
//                       // label="City"
//                       countryId={countryId}
//                       stateId={stateId}
//                       name="city"
//                       value={editingUser.city || ""}
//                       onChange={handleInputChange}
//                       editable={!!stateId} // Enable only if a state is selected
//                       placeholder="Select City"
//                       // error={errors.city}
//                     />
//                   ) : (
//                     user.city || ""
//                   )}
//                 </td>

//                 <td className="px-4 py-2 whitespace-nowrap">
//                   {editingUser && editingUser.user_id === user.user_id ? (
//                     <EditableSelectInput
//                       name="county"
//                       options={users.map((user) => ({
//                         value: user.county, // Actual value (county)
//                         label: user.county, // Display value (user.county)
//                       }))}
//                       value={editingUser.county}
//                       onChange={handleInputChange}
//                       editable={true} // Allows typing and selection from dropdown
//                       // error={errors.county}
//                       placeholder="Select County Name"
//                       id="county"
//                     />
//                   ) : (
//                     user.county
//                   )}
//                 </td>

//                 <td className="px-4 py-2 whitespace-nowrap">
//                   {editingUser && editingUser.user_id === user.user_id ? (
//                     <EditableSelectInput
//                       name="pin_code"
//                       options={users.map((user) => ({
//                         value: user.pin_code, // Actual value (pin_code)
//                         label: user.pin_code, // Display value (user.pin_code)
//                       }))}
//                       value={editingUser.pin_code}
//                       onChange={handleInputChange}
//                       editable={true} // Allows typing or selection from dropdown
//                       // error={errors.pin_code}
//                       // showRequired={true}
//                       placeholder="Select or Enter Pin Code"
//                       id="pin_code"
//                       isNumeric="true"
//                       maxDigits={6}
//                     />
//                   ) : (
//                     user.pin_code
//                   )}
//                 </td>

//                 <td className="px-4 py-2 flex-wrap ">
//                   {editingUser && editingUser.user_id === user.user_id ? (
//                     <div className="input-group">
//                       <input
//                         type="text"
//                         name="remark"
//                         value={editingUser.remark || ""}
//                         onChange={handleInputChange}
//                         placeholder="Remark"
//                       />
//                     </div>
//                   ) : (
//                     user.remark
//                   )}
//                 </td>
//                 <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
//                   {editingUser && editingUser.user_id === user.user_id ? (
//                     <>
//                       <button
//                         className="bg-green-500 text-white px-4 py-1 mx-5 rounded"
//                         onClick={handleSave}
//                       >
//                         Save
//                       </button>
//                       <button
//                         className="bg-gray-500 text-white px-3 py-1 rounded"
//                         onClick={handleUndo}
//                       >
//                         Undo
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         className="bg-blue-500 text-white my-1 px-5 py-1 mx-5 rounded"
//                         onClick={() => handleEdit(user)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="bg-red-500 text-white px-2 py-1 my-1 rounded"
//                         onClick={() => handleDelete(user.user_id)}
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}

//             {showModal && (
//               <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center mt-12 z-30">
//                 <div className="registerCard px-6 py-1 rounded-lg shadow-lg w-full max-w-6xl">
//                   <h2 className="text-2xl font-semibold mb-4">
//                     Register New User
//                   </h2>
//                   <form className="grid  gap-1 ">
//                     {/* <form className="grid grid-cols-4 gap-4"> */}
//                     {/* <div className="input-group">
//                       <label htmlFor="user_code">User Code</label>
//                       <input
//                         type="text"
//                         name="user_code"
//                         // value={newUser.user_code || null}
//                         value={
//                           (editingUser
//                             ? editingUser.user_code
//                             : newUser.user_code) || null
//                         }
//                         onChange={handleInputChange}
//                         placeholder="User Code"
//                         className="w-full p-2 mb-4 border rounded"
//                       />
//                     </div> */}
//                     <EditableSelectInput
//                       label="Name"
//                       name="name"
//                       options={users.map((user) => ({
//                         value: user.name, // Actual value (name)
//                         label: user.name, // Display value (user.name)
//                       }))}
//                       value={newUser.name}
//                       onChange={handleInputChange}
//                       editable={true} // Allows typing and selection from dropdown
//                       error={errors.name}
//                       showRequired={true}
//                       placeholder="Select Name"
//                       id="name"
//                     />

//                     <EditableSelectInput
//                       label="Email"
//                       name="email"
//                       options={users.map((user) => ({
//                         value: user.email, // Actual value (email)
//                         label: user.email, // Display value (user.email)
//                       }))}
//                       value={newUser.email}
//                       onChange={handleInputChange}
//                       editable={true} // Allows typing and selection from dropdown
//                       error={errors.email}
//                       showRequired={true}
//                       placeholder="Select User Email"
//                       id="email"
//                     />

//                     <div className="input-group row-span-3">
//                       <label htmlFor="password">
//                         Password <span className="error-message">*</span>
//                       </label>
//                       <input
//                         type="password"
//                         name="password"
//                         // value={newUser.password || ""}
//                         value={newUser.password || ""}
//                         onChange={handleInputChange}
//                         placeholder="Password"
//                       />
//                       {errors.password && (
//                         <p className="error-message text-sm">
//                           {errors.password}
//                         </p>
//                       )}
//                     </div>

//                     <EditablePhoneInput
//                       label="Phone Number"
//                       name="phone_number"
//                       value={newUser.phone_number}
//                       onChange={handleInputChange}
//                       editable={true} // Allows editing
//                       placeholder="Enter Phone Number"
//                       error={errors.phone_number} // Pass any error message if needed
//                       showRequired={true}
//                       country="in" // Set country to 'in' (India) or any other country code
//                     />

//                     <EditableSelectInput
//                       label="Type"
//                       name="user_type"
//                       options={users.map((user) => ({
//                         value: user.user_type, // Actual value (user_type)
//                         label: user.user_type, // Display value (user.user_type)
//                       }))}
//                       value={newUser.user_type}
//                       onChange={handleInputChange}
//                       editable={true} // Allows typing and selection from dropdown
//                       error={errors.user_type}
//                       // showRequired={true}
//                       placeholder="Select User Type"
//                       id="user_type"
//                     />

//                     <EditableSelectInput
//                       label="Membership Type"
//                       name="membership_id"
//                       options={memberships.map((membership) => ({
//                         value: membership.membership_id, // Actual value (membership_id)
//                         label: membership.membership_type, // Display value (membership.membership_type)
//                       }))}
//                       value={newUser.membership_id}
//                       onChange={handleInputChange}
//                       editable={false} // Allows selection from dropdown
//                       error={errors.membership_id}
//                       // showRequired={true}
//                       placeholder="Select Membership Type"
//                       id="membership_id"
//                     />

//                     <EditableSelectInput
//                       label="User Group"
//                       name="usergroup_id"
//                       options={userGroups.map((usergroup) => ({
//                         value: usergroup.usergroup_id, // Actual value (usergroup_id)
//                         label: usergroup.group_name, // Display value (userGroup.group_name)
//                       }))}
//                       value={newUser.usergroup_id}
//                       onChange={handleInputChange}
//                       editable={false} // Allows selection from dropdown
//                       error={errors.usergroup_id}
//                       // showRequired={true}
//                       placeholder="Select User Group Name"
//                       id="usergroup_id"
//                     />
//                     <EditableSelectInput
//                       label="Referrer Name"
//                       name="referrer_id"
//                       options={users.map((user) => ({
//                         value: user.user_id, // Actual value (user_id)
//                         label: user.name, // Display value (user.name)
//                       }))}
//                       value={newUser.referrer_id}
//                       onChange={handleInputChange}
//                       editable={false} // Allows selection from dropdown
//                       error={errors.referrer_id} // Pass any error message if needed
//                       placeholder="Select Referrer Name"
//                       id="referrer_id"
//                     />
//                     <EditableCountrySelect
//                       label="Country"
//                       name="country"
//                       value={newUser.country} // The country code
//                       onChange={handleCountryChange} // Update function
//                       editable={true} // Allows editing
//                       placeholder="Select Country"
//                       error={errors.country} // Pass any error message if needed
//                     />
//                     <EditableStateSelect
//                       label="State"
//                       countryId={countryId}
//                       name="state"
//                       value={newUser.state || ""}
//                       onChange={handleStateChange}
//                       editable={!!countryId} // Enable only if a country is selected
//                       placeholder="Select State"
//                       error={errors.state}
//                     />

//                     <EditableCitySelect
//                       label="City"
//                       countryId={countryId}
//                       stateId={stateId}
//                       name="city"
//                       value={newUser.city || ""}
//                       onChange={handleInputChange}
//                       editable={!!stateId} // Enable only if a state is selected
//                       placeholder="Select City"
//                       error={errors.city}
//                     />

//                     <EditableSelectInput
//                       label="County"
//                       name="county"
//                       options={users.map((user) => ({
//                         value: user.county, // Actual value (county)
//                         label: user.county, // Display value (user.county)
//                       }))}
//                       value={newUser.county}
//                       onChange={handleInputChange}
//                       editable={true} // Allows typing and selection from dropdown
//                       error={errors.county}
//                       placeholder="Select County Name"
//                       id="county"
//                     />
//                     <EditableSelectInput
//                       label="Pin Code"
//                       name="pin_code"
//                       options={users.map((user) => ({
//                         value: user.pin_code, // Actual value (pin_code)
//                         label: user.pin_code, // Display value (user.pin_code)
//                       }))}
//                       value={newUser.pin_code}
//                       onChange={handleInputChange}
//                       editable={true} // Allows typing or selection from dropdown
//                       error={errors.pin_code}
//                       // showRequired={true}
//                       placeholder="Select or Enter Pin Code"
//                       id="pin_code"
//                       isNumeric="true"
//                       maxDigits={6}
//                     />
//                     <div className="input-group ">
//                       <label htmlFor="remark">Remark</label>
//                       <textarea
//                         name="remark"
//                         value={newUser.remark || ""}
//                         onChange={handleInputChange}
//                         placeholder="Remark"
//                         className="w-full p-2 mb-4 border rounded"
//                       />
//                     </div>

//                     <div className="col-span-5 text-center">
//                       <button
//                         className="bg-green-500  text-white px-4 py-2 mt-4 rounded"
//                         onClick={handleSave}
//                       >
//                         Save
//                       </button>
//                       <button
//                         className="bg-gray-500 text-white px-4 py-2 mt-4 rounded ml-2"
//                         onClick={toggleModal}
//                       >
//                         Close
//                       </button>
//                     </div>
//                     {/* <div className="col-span-5 text-center">
//                       <button
//                         type="button"
//                         className="bg-green-500 text-white px-4 py-2  rounded "
//                         onClick={handleSave}
//                       >
//                         Save
//                       </button>
//                       <button
//                         type="button"
//                         className="bg-gray-500 text-white px-4 py-2  rounded ml-2"
//                         onClick={toggleModal}
//                       >
//                         Close
//                       </button>
//                     </div> */}
//                   </form>
//                 </div>
//               </div>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserList;
