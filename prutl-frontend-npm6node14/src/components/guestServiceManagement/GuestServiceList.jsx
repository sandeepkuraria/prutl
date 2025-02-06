import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGuestServices,
  createNewGuestService,
  updateGuestService,
  deleteGuestService,
} from "../../redux/slices/guestServiceSlice.js";
import ErrorModal from "../common/ErrorModal.jsx";
import EditableSelectInput from "../common/EditableSelectInput .jsx";

const GuestServiceList = () => {
  const dispatch = useDispatch();
  const { guestServices, loading, error } = useSelector(
    (state) => state.guestServices
  );
  const [editingGuestService, setEditingGuestService] = useState(null);
  const [newGuestService, setNewGuestService] = useState({
    // service_code: "",
    service_name: "",
    description: "",
    cost_per_unit: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getAllGuestServices());
  }, [dispatch]);

  const handleDelete = (serviceId) => {
    dispatch(deleteGuestService(serviceId));
  };

  const handleEdit = (guestService) => {
    setEditingGuestService({ ...guestService });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingGuestService) {
      setEditingGuestService({ ...editingGuestService, [name]: value });
    } else {
      setNewGuestService({ ...newGuestService, [name]: value });
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    // if (!formData.service_code)
    //   newErrors.service_code = "Service Code is required";
    if (!formData.service_name)
      newErrors.service_name = "Service Name is required";
    if (!formData.cost_per_unit)
      newErrors.cost_per_unit = "Cost per Unit is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingGuestService) {
      if (editingGuestService.service_id && editingGuestService) {
        dispatch(
          updateGuestService({
            serviceId: editingGuestService.service_id,
            data: editingGuestService,
          })
        );
      } else {
        console.error("Error: serviceId or editingGuestService is undefined");
      }
      setEditingGuestService(null);
    } else {
      if (validateForm(newGuestService)) {
        dispatch(createNewGuestService(newGuestService));
        setNewGuestService({
          // service_code: "",
          service_name: "",
          description: "",
          cost_per_unit: "",
          remark: "",
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingGuestService(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewGuestService({
      // service_code: "",
      service_name: "",
      description: "",
      cost_per_unit: "",
      remark: "",
    });
  };

  // Check for specific error
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
      console.log("Loading Guest Services...");
    }
    if (error) {
      console.error("Error fetching Guest Services:", error);
    }
    if (guestServices.length > 0) {
      console.log("Fetched Guest Services:", guestServices);
    }
  }, [loading, error, guestServices]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="guest-service-list overflow-auto">
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
        Create New Guest Service
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
                Service ID
              </th> */}
              {/* <th className="px-4 py-2 whitespace-nowrap">Service Code</th> */}
              <th className="px-4 py-2 whitespace-nowrap">Service Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Description</th>
              <th className="px-4 py-2 whitespace-nowrap">Cost per Unit</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {guestServices.map((guestService) => (
              <tr key={guestService.service_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
                  {guestService.service_id}
                </td> */}
                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingGuestService &&
                  editingGuestService.service_id === guestService.service_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="service_code"
                        value={editingGuestService.service_code || ""}
                        onChange={handleInputChange}
                        placeholder="Service Code"
                      />
                    </div>
                  ) : (
                    guestService.service_code
                  )}
                </td> */}
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingGuestService &&
                  editingGuestService.service_id === guestService.service_id ? (
                    <EditableSelectInput
                      name="service_name"
                      options={guestServices.map((guestService) => ({
                        value: guestService.service_name, // Actual value (service_name)
                        label: guestService.service_name, // Display value (guestService.service_name)
                      }))}
                      value={editingGuestService.service_name}
                      onChange={handleInputChange}
                      editable={true} // Allows typing or selection from dropdown
                      // error={errors.service_name}
                      placeholder="Select Service Name"
                      id="service_name"
                    />
                  ) : (
                    guestService.service_name
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingGuestService &&
                  editingGuestService.service_id === guestService.service_id ? (
                    <EditableSelectInput
                      name="description"
                      options={guestServices.map((guestService) => ({
                        value: guestService.description, // Actual value (description)
                        label: guestService.description, // Display value (guestService.description)
                      }))}
                      value={editingGuestService.description}
                      onChange={handleInputChange}
                      editable={true} // Allows typing or selection from dropdown
                      // error={errors.description}
                      placeholder="Select Description"
                      id="description"
                    />
                  ) : (
                    guestService.description
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingGuestService &&
                  editingGuestService.service_id === guestService.service_id ? (
                    <EditableSelectInput
                      name="cost_per_unit"
                      options={guestServices.map((guestService) => ({
                        value: guestService.cost_per_unit, // Actual value (description)
                        label: guestService.cost_per_unit, // Display value (guestService.cost_per_unit)
                      }))}
                      value={editingGuestService.cost_per_unit}
                      onChange={handleInputChange}
                      editable={true} // Allows typing or selection from dropdown
                      // error={errors.cost_per_unit}
                      placeholder="Select or Enter cost/unit"
                      id="cost_per_unit"
                      isNumeric={true}
                    />
                  ) : (
                    guestService.cost_per_unit
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingGuestService &&
                  editingGuestService.service_id === guestService.service_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingGuestService.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    guestService.remark
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingGuestService &&
                  editingGuestService.service_id === guestService.service_id ? (
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
                        className="bg-blue-500 text-white px-5 py-1 mx-5 rounded"
                        onClick={() => handleEdit(guestService)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded"
                        onClick={() => handleDelete(guestService.service_id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal for Creating a New Guest Service */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center mt-12 z-30">
          <div className="registerCard px-6 py-1 rounded-lg shadow-lg w-full max-w-6xl">
            <h2 className="text-2xl font-semibold mb-4">
              Create New Guest Service
            </h2>
            <form className="grid grid-cols-4 gap-4">
              {/* <div className="input-group row-span-3">
                <label htmlFor="service_code">Service Code</label>
                <input
                  type="text"
                  id="service_code"
                  name="service_code"
                  value={newGuestService.service_code}
                  onChange={handleInputChange}
                  placeholder="Service Code"
                />
                {errors.service_code && (
                  <p className="error-message">{errors.service_code}</p>
                )}
              </div> */}

              <EditableSelectInput
                label="Service Name"
                name="service_name"
                options={guestServices.map((guestService) => ({
                  value: guestService.service_name, // Actual value (service_name)
                  label: guestService.service_name, // Display value (guestService.service_name)
                }))}
                value={newGuestService.service_name}
                onChange={handleInputChange}
                editable={true} // Allows typing or selection from dropdown
                error={errors.service_name}
                showRequired={true}
                placeholder="Select Service Name"
                id="service_name"
              />

              <EditableSelectInput
                label="Cost Per Unit"
                name="cost_per_unit"
                options={guestServices.map((guestService) => ({
                  value: guestService.cost_per_unit, // Actual value (description)
                  label: guestService.cost_per_unit, // Display value (guestService.cost_per_unit)
                }))}
                value={newGuestService.cost_per_unit}
                onChange={handleInputChange}
                editable={true} // Allows typing or selection from dropdown
                error={errors.cost_per_unit}
                showRequired={true}
                placeholder="Select or Enter cost/unit"
                id="cost_per_unit"
                isNumeric={true}
              />

              <div className="input-group row-span-3">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newGuestService.description || ""}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>
              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>
                <textarea
                  id="remark"
                  name="remark"
                  value={newGuestService.remark || ""}
                  onChange={handleInputChange}
                  placeholder="Remark"
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>
              <div className="col-span-4 text-center">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-4"
                  type="button"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  type="button"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestServiceList;
