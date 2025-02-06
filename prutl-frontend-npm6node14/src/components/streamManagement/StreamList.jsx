// prutl-frontend-npm6node14/src/components/streamManagement/StreamList.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllStreams,
  createNewStream,
  updateStream,
  deleteStream,
} from "../../redux/slices/streamSlice.js";
import ErrorModal from "../common/ErrorModal.jsx";
import EditableSelectInput from "../common/EditableSelectInput .jsx";
import { getAllCompetitions } from "../../redux/slices/competitionSlice.js";

const StreamList = () => {
  const dispatch = useDispatch();
  const { streams, loading, error } = useSelector((state) => state.streams);
  const { competitions, loadingCompetitions, errorCompetitions } = useSelector(
    (state) => state.competitions
  );
  const [editingStream, setEditingStream] = useState(null);
  const [newStream, setNewStream] = useState({
    competition_id: "",
    stream_url: "",
    stream_start_time: "",
    stream_end_time: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getAllStreams());
    dispatch(getAllCompetitions());
  }, [dispatch]);

  const handleDelete = (streamId) => {
    dispatch(deleteStream(streamId));
  };

  const handleEdit = (stream) => {
    setEditingStream({ ...stream });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingStream) {
      setEditingStream({ ...editingStream, [name]: value });
    } else {
      setNewStream({ ...newStream, [name]: value });
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    if (!formData.competition_id)
      newErrors.competition_id = "Competition Name is required";
    if (!formData.stream_url) newErrors.stream_url = "Stream URL is required";
    if (!formData.stream_start_time)
      newErrors.stream_start_time = "Stream start time is required";
    if (!formData.stream_end_time)
      newErrors.stream_end_time = "Stream end time is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingStream) {
      if (editingStream.stream_id && editingStream) {
        dispatch(
          updateStream({
            streamId: editingStream.stream_id,
            data: editingStream,
          })
        );
      } else {
        console.error("Error: streamId or editingStream is undefined");
      }
      setEditingStream(null);
    } else {
      if (validateForm(newStream)) {
        dispatch(createNewStream(newStream));
        setNewStream({
          competition_id: "",
          stream_url: "",
          stream_start_time: "",
          stream_end_time: "",
          remark: "",
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingStream(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewStream({
      competition_id: "",
      stream_url: "",
      stream_start_time: "",
      stream_end_time: "",
      remark: "",
    });
  };

  const handleCloseModal = () => {
    setShowError(false);
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading streams...");
    }
    if (error) {
      console.error("Error fetching streams:", error);
    }
    if (streams.length > 0) {
      console.log("Fetched streams:", streams);
    }
    if (loadingCompetitions) {
      console.log("Loading competitions...");
    }
    if (errorCompetitions) {
      console.error("Error fetching competitions:", errorCompetitions);
    }
    if (competitions.length > 0) {
      console.log("Fetched streams:", competitions);
    }
  }, [
    loading,
    error,
    streams,
    competitions,
    loadingCompetitions,
    errorCompetitions,
  ]);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p className="error-message">{error}</p>;
  if (loadingCompetitions) return <p>Loading...</p>;
  if (errorCompetitions)
    return <p className="error-message">{errorCompetitions}</p>;

  return (
    <div className="stream-list overflow-auto">
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
        Create New Stream
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete  ">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
                Stream ID
              </th> */}
              <th className="px-4 py-2 whitespace-nowrap">Competition Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Stream URL</th>
              <th className="px-4 py-2 whitespace-nowrap">Start Time</th>
              <th className="px-4 py-2 whitespace-nowrap">End Time</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {streams.map((stream) => (
              <tr key={stream.stream_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
                  {stream.stream_id}
                </td> */}

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingStream &&
                  editingStream.stream_id === stream.stream_id ? (
                    <EditableSelectInput
                      name="competition_id"
                      options={competitions.map((competition) => ({
                        value: competition.competition_id, // Actual value (competition_id)
                        label: competition.competition_name, // Display value (competition.competition_name)
                      }))}
                      value={editingStream.competition_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.competition_id}
                      placeholder="Select Competition Name"
                      id="competition_id"
                    />
                  ) : (
                    // stream.competition_id
                    // Display competition name based on competition id when not in edit mode
                    competitions.find(
                      (competition) =>
                        competition.competition_id === stream.competition_id
                    )?.competition_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingStream &&
                  editingStream.stream_id === stream.stream_id ? (
                    <EditableSelectInput
                      name="stream_url"
                      options={streams.map((stream) => ({
                        value: stream.stream_url, // Actual value (stream_url)
                        label: stream.stream_url, // Display value (stream.stream_url)
                      }))}
                      value={editingStream.stream_url}
                      onChange={handleInputChange}
                      editable={true} // Allows typing and selection from dropdown
                      // error={errors.stream_url}
                      placeholder="Select Stream Name"
                      id="stream_url"
                    />
                  ) : (
                    stream.stream_url
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingStream &&
                  editingStream.stream_id === stream.stream_id ? (
                    <div className="input-group">
                      <input
                        type="datetime-local"
                        name="stream_start_time"
                        value={editingStream.stream_start_time || ""}
                        onChange={handleInputChange}
                        placeholder="Start Time"
                      />
                    </div>
                  ) : (
                    new Date(stream.stream_start_time).toLocaleString()
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingStream &&
                  editingStream.stream_id === stream.stream_id ? (
                    <div className="input-group">
                      <input
                        type="datetime-local"
                        name="stream_end_time"
                        value={editingStream.stream_end_time || ""}
                        onChange={handleInputChange}
                        placeholder="End Time"
                      />
                    </div>
                  ) : (
                    new Date(stream.stream_end_time).toLocaleString()
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingStream &&
                  editingStream.stream_id === stream.stream_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingStream.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    stream.remark
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingStream &&
                  editingStream.stream_id === stream.stream_id ? (
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
                        onClick={() => handleEdit(stream)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 my-1 rounded"
                        onClick={() => handleDelete(stream.stream_id)}
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

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center mt-12 z-30">
          <div className="registerCard px-6 py-1 rounded-lg shadow-lg w-full max-w-6xl">
            <h2 className="text-2xl font-semibold mb-4">Register New Stream</h2>
            <form className="grid grid-cols-4 gap-4">
              <EditableSelectInput
                label="Competition Name"
                name="competition_id"
                options={competitions.map((competition) => ({
                  value: competition.competition_id, // Actual value (competition_id)
                  label: competition.competition_name, // Display value (competition.competition_name)
                }))}
                value={newStream.competition_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.competition_id}
                showRequired={true}
                placeholder="Select Competition Name"
                id="competition_id"
              />

              <EditableSelectInput
              label="Stream URL"
                name="stream_url"
                options={streams.map((stream) => ({
                  value: stream.stream_url, // Actual value (stream_url)
                  label: stream.stream_url, // Display value (stream.stream_url)
                }))}
                value={newStream.stream_url}
                onChange={handleInputChange}
                editable={true} // Allows typing and selection from dropdown
                error={errors.stream_url}
                showRequired={true}
                placeholder="Select Stream Name"
                id="stream_url"
              />

              <div className="input-group row-span-3">
                <label htmlFor="stream_start_time">
                  Start Time <span className="error-message">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="stream_start_time"
                  value={newStream.stream_start_time || ""}
                  onChange={handleInputChange}
                  placeholder="Start Time"
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.stream_start_time && (
                  <p className="error-message text-sm">{errors.stream_start_time}</p>
                )}
              </div>

              <div className="input-group row-span-3">
                <label htmlFor="stream_end_time">
                  End Time <span className="error-message">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="stream_end_time"
                  value={newStream.stream_end_time || ""}
                  onChange={handleInputChange}
                  placeholder="End Time"
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.stream_end_time && (
                  <p className="error-message text-sm">{errors.stream_end_time}</p>
                )}
              </div>

              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={newStream.remark || ""}
                  onChange={handleInputChange}
                  placeholder="Remark"
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>

              <div className="col-span-4 text-center">
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-500 text-white px-4 py-2 mt-4 rounded ml-2"
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

export default StreamList;
