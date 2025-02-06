import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllParkingAreas,
  createNewParkingArea,
  updateParkingArea,
  deleteParkingArea,
} from "../../redux/slices/parkingAreaSlice";
import ErrorModal from "../common/ErrorModal";
// import EditableSelectInput from "../common/EditableSelectInput";
import { getAllVehicles } from "../../redux/slices/vehicleSlice";
import EditableSelectInput from "../common/EditableSelectInput ";

const ParkingAreaList = () => {
  const dispatch = useDispatch();
  const { parkingAreas, loading, error } = useSelector(
    (state) => state.parkingAreas
  );
  //   const { vehicles, loadingVehicles, errorVehicles } = useSelector((state) => state.vehicles);

  const [editingParkingArea, setEditingParkingArea] = useState(null);
  const [newParkingArea, setNewParkingArea] = useState({
    pin_code: "",
    address: "",
    latitude: "",
    longitude: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getAllParkingAreas());
    dispatch(getAllVehicles());
  }, [dispatch]);

  const handleDelete = (parkingAreaId) => {
    dispatch(deleteParkingArea(parkingAreaId));
  };

  const handleEdit = (parkingArea) => {
    setEditingParkingArea({ ...parkingArea });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingParkingArea) {
      setEditingParkingArea({ ...editingParkingArea, [name]: value });
    } else {
      setNewParkingArea({ ...newParkingArea, [name]: value });
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    if (!formData.pin_code) newErrors.pin_code = "Pin Code is required";
    if (!formData.address) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingParkingArea) {
      if (editingParkingArea.parking_area_id && editingParkingArea) {
        dispatch(
          updateParkingArea({
            parkingAreaId: editingParkingArea.parking_area_id,
            data: editingParkingArea,
          })
        );
      } else {
        console.error(
          "Error: parkingAreaId or editingParkingArea is undefined"
        );
      }
      setEditingParkingArea(null);
    } else {
      if (validateForm(newParkingArea)) {
        dispatch(createNewParkingArea(newParkingArea));
        setNewParkingArea({
          pin_code: "",
          address: "",
          latitude: "",
          longitude: "",
          remark: "",
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingParkingArea(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewParkingArea({
      pin_code: "",
      address: "",
      latitude: "",
      longitude: "",
      remark: "",
    });
  };

  const handleCloseModal = () => {
    setShowError(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="parking-area-list overflow-auto">
      {error && <ErrorModal message={error} onClose={handleCloseModal} />}
      <button
        className="bg-blue-500 text-white px-4 py-2 m-2 rounded mb-4"
        onClick={toggleModal}
      >
        Create New Parking Area
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete">
            <tr>
              <th className="px-4 py-2 whitespace-nowrap">Pin Code</th>
              <th className="px-4 py-2 whitespace-nowrap">Address</th>
              <th className="px-4 py-2 whitespace-nowrap">Latitude</th>
              <th className="px-4 py-2 whitespace-nowrap">Longitude</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {parkingAreas.map((parkingArea) => (
              <tr key={parkingArea.parking_area_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingParkingArea &&
                  editingParkingArea.parking_area_id ===
                    parkingArea.parking_area_id ? (
                    <input
                      type="text"
                      name="pin_code"
                      value={editingParkingArea.pin_code}
                      onChange={handleInputChange}
                      placeholder="Pin Code"
                    />
                  ) : (
                    parkingArea.pin_code
                  )}
                </td> */}
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingParkingArea &&
                  editingParkingArea.parking_area_id ===
                    parkingArea.parking_area_id ? (
                    <EditableSelectInput
                      name="pin_code"
                      options={parkingAreas.map((parkingArea) => ({
                        value: parkingArea.pin_code, // Actual value (pin_code)
                        label: parkingArea.pin_code, // Display value (parkingArea.pin_code)
                      }))}
                      value={editingParkingArea.pin_code}
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
                    parkingArea.pin_code
                  )}
                </td>
                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingParkingArea &&
                  editingParkingArea.parking_area_id ===
                    parkingArea.parking_area_id ? (
                    <textarea
                      name="address"
                      value={editingParkingArea.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                    />
                  ) : (
                    parkingArea.address
                  )}
                </td> */}
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingParkingArea && editingParkingArea.parking_area_id ? (
                    <EditableSelectInput
                      // label="Address"
                      name="address"
                      options={parkingAreas.map((parkingArea) => ({
                        value: parkingArea.address, // Actual value (address)
                        label: parkingArea.address, // Display value (parkingArea.address)
                      }))}
                      value={editingParkingArea.address}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      error={errors.address}
                      // showRequired={true}
                      placeholder="Select Address"
                      id="address"
                    />
                  ) : (
                    parkingArea.address
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingParkingArea && editingParkingArea.parking_area_id ? (
                    <EditableSelectInput
                      // label="Latitude"
                      name="latitude"
                      options={parkingAreas.map((parkingArea) => ({
                        value: parkingArea.latitude, // Actual value (latitude)
                        label: parkingArea.latitude, // Display value (parkingArea.latitude)
                      }))}
                      value={editingParkingArea.latitude}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      error={errors.latitude}
                      // showRequired={true}
                      placeholder="Select Latitude"
                      id="latitude"
                    />
                  ) : (
                    parkingArea.latitude
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingParkingArea && editingParkingArea.parking_area_id ? (
                    <EditableSelectInput
                      // label="Longitude"
                      name="longitude"
                      options={parkingAreas.map((parkingArea) => ({
                        value: parkingArea.longitude, // Actual value (longitude)
                        label: parkingArea.longitude, // Display value (parkingArea.longitude)
                      }))}
                      value={editingParkingArea.longitude}
                      onChange={handleInputChange}
                      editable={true} // Allows selection from dropdown
                      error={errors.longitude}
                      // showRequired={true}
                      placeholder="Select Longitude"
                      id="longitude"
                    />
                  ) : (
                    parkingArea.longitude
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingParkingArea && editingParkingArea.parking_area_id ? (
                    <textarea
                      name="remark"
                      value={editingParkingArea.remark || ""}
                      onChange={handleInputChange}
                      placeholder="Remark"
                      className="border rounded p-2 w-full"
                    />
                  ) : (
                    parkingArea.remark
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingParkingArea &&
                  editingParkingArea.parking_area_id ===
                    parkingArea.parking_area_id ? (
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
                        onClick={() => handleEdit(parkingArea)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded"
                        onClick={() =>
                          handleDelete(parkingArea.parking_area_id)
                        }
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
      {/* Modal for Creating a New Parking Area */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center mt-12 z-30">
          <div className="registerCard px-6 py-1 rounded-lg shadow-lg w-full max-w-6xl">
            <h2 className="text-2xl font-semibold mb-4">
              Create New Parking Area
            </h2>
            <form className="grid grid-cols-4 gap-4">
              {/* <div className="input-group">
                <label>Pin Code</label>
                <input
                  type="text"
                  name="pin_code"
                  value={newParkingArea.pin_code}
                  onChange={handleInputChange}
                  placeholder="Pin Code"
                  className="input-box"
                />
                {errors.pin_code && (
                  <p className="error-message">{errors.pin_code}</p>
                )}
              </div> */}
              <EditableSelectInput
                label="Pin Code"
                name="pin_code"
                options={parkingAreas.map((parkingArea) => ({
                  value: parkingArea.pin_code, // Actual value (pin_code)
                  label: parkingArea.pin_code, // Display value (parkingArea.pin_code)
                }))}
                value={newParkingArea.pin_code}
                onChange={handleInputChange}
                editable={true} // Allows typing or selection from dropdown
                // error={errors.pin_code}
                // showRequired={true}
                placeholder="Select or Enter Pin Code"
                id="pin_code"
                isNumeric="true"
                maxDigits={6}
              />
              {/* <div className="input-group">
                <label>Address</label>
                <textarea
                  name="address"
                  value={newParkingArea.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  className="input-box"
                />
                {errors.address && (
                  <p className="error-message">{errors.address}</p>
                )}
              </div> */}
              <EditableSelectInput
                label="Address"
                name="address"
                options={parkingAreas.map((parkingArea) => ({
                  value: parkingArea.address, // Actual value (address)
                  label: parkingArea.address, // Display value (parkingArea.address)
                }))}
                value={newParkingArea.address}
                onChange={handleInputChange}
                editable={true} // Allows selection from dropdown
                error={errors.address}
                // showRequired={true}
                placeholder="Select Address"
                id="address"
              />
              <EditableSelectInput
                label="Latitude"
                name="latitude"
                options={parkingAreas.map((parkingArea) => ({
                  value: parkingArea.latitude, // Actual value (latitude)
                  label: parkingArea.latitude, // Display value (parkingArea.latitude)
                }))}
                value={newParkingArea.latitude}
                onChange={handleInputChange}
                editable={true} // Allows selection from dropdown
                error={errors.latitude}
                // showRequired={true}
                placeholder="Select Latitude"
                id="latitude"
              />
              <EditableSelectInput
                label="Longitude"
                name="longitude"
                options={parkingAreas.map((parkingArea) => ({
                  value: parkingArea.longitude, // Actual value (longitude)
                  label: parkingArea.longitude, // Display value (parkingArea.longitude)
                }))}
                value={newParkingArea.longitude}
                onChange={handleInputChange}
                editable={true} // Allows selection from dropdown
                error={errors.longitude}
                // showRequired={true}
                placeholder="Select Longitude"
                id="longitude"
              />
              <div className="input-group col-span-1">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={newParkingArea.remark}
                  onChange={handleInputChange}
                  placeholder="Remark"
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>

            </form>
            <div className="col-span-4 text-center">
                <button
                  type="button"
                  className="bg-green-500 text-white px-5 py-2 rounded mr-2"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingAreaList;
