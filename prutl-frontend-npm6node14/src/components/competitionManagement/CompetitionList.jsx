// prutl-frontend-npm6node14/src/components/competitionManagement/CompetitionList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCompetitions,
  createNewCompetition,
  updateCompetition,
  deleteCompetition,
} from "../../redux/slices/competitionSlice.js";
import { getAllCategories } from "../../redux/slices/categorySlice";
import { getAllEvents } from "../../redux/slices/eventSlice.js";
import ErrorModal from "../common/ErrorModal.jsx";
import EditableSelectInput from "../common/EditableSelectInput .jsx";
import { getAllPassionFrameworkDimensions } from "../../redux/slices/passionFrameworkDimensionSlice.js";
import { getAllPrutlFrameworkDimensions } from "../../redux/slices/prutlFrameworkDimensionSlice.js";
import { getAllVenues } from "../../redux/slices/venueSlice.js";

const CompetitionList = () => {
  const dispatch = useDispatch();

  const { competitions, loading, error } = useSelector(
    (state) => state.competitions
  );
  const { categories, loadingCategories, errorCategories } = useSelector(
    (state) => state.categories
  );
  const { events, loadingEvents, errorEvents } = useSelector(
    (state) => state.events
  );
  const { venues, loadingVenues, errorVenues } = useSelector(
    (state) => state.venues
  );
  const {
    passionFrameworkDimensions,
    loadingPassionFrameworkDimensions,
    errorPassionFrameworkDimensions,
  } = useSelector((state) => state.passionFrameworkDimensions);
  const {
    prutlFrameworkDimensions,
    loadingPrutlFrameworkDimensions,
    errorPrutlFrameworkDimensions,
  } = useSelector((state) => state.prutlFrameworkDimensions);

  const [editingCompetition, setEditingCompetition] = useState(null);
  const [newCompetition, setNewCompetition] = useState({
    // competition_code:null,
    event_id: null,
    category_id: null,
    passion_dimension_id: null,
    prutl_dimension_id: null,
    venue_id: null,
    competition_name: null,
    type: null,
    start_date: null,
    end_date: null,
    location: null,
    remark: null,
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getAllCompetitions());
    // Dispatch the action to fetch categories when the component mounts
    dispatch(getAllCategories());
    // Dispatch the action to fetch events when the component mounts
    dispatch(getAllEvents());
    // Dispatch the action to fetch passionFrameworkDimensions when the component mounts
    dispatch(getAllPassionFrameworkDimensions());
    // Dispatch the action to fetch prutlFrameworkDimensions when the component mounts
    dispatch(getAllPrutlFrameworkDimensions());
    // Dispatch the action to fetch prutlFrameworkDimensions when the component mounts
    dispatch(getAllVenues());
  }, [dispatch]);

  const handleDelete = (competitionId) => {
    dispatch(deleteCompetition(competitionId));
  };

  const handleEdit = (competition) => {
    setEditingCompetition({ ...competition });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingCompetition) {
      setEditingCompetition({ ...editingCompetition, [name]: value });
    } else {
      setNewCompetition({ ...newCompetition, [name]: value });
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};

    // // Validate competition_code
    // if (!formData.competition_code) {
    //   newErrors.competition_code = "Competition code is required";
    // }

    // Validate event_name
    if (!formData.event_id) {
      newErrors.event_id = "Event is Required";
    }
    // Validate category
    if (!formData.category_id) {
      newErrors.category_id = "Category is Required";
    }
    // Validate Passion Dimension
    if (!formData.passion_dimension_id) {
      newErrors.passion_dimension_id = "Passion Dimension is Required";
    }
    // Validate Prutl Dimension
    if (!formData.prutl_dimension_id) {
      newErrors.prutl_dimension_id = "Prutl Dimension is Required";
    }

    // Validate competition_name
    if (!formData.competition_name) {
      newErrors.competition_name = "Competition Name is Required";
    }

    // Validate start_date
    if (!formData.start_date) {
      newErrors.start_date = "Select Start Date";
    }

    // Validate end_date
    if (!formData.end_date) {
      newErrors.end_date = "Select End Date";
    }

    // Validate that end_date is not earlier than start_date
    if (formData.start_date && formData.end_date) {
      const startDate = new Date(formData.start_date);
      const endDate = new Date(formData.end_date);

      if (endDate < startDate) {
        newErrors.end_date = "End date cannot be earlier than the start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingCompetition) {
      if (editingCompetition.competition_id) {
        dispatch(
          updateCompetition({
            competitionId: editingCompetition.competition_id,
            data: editingCompetition,
          })
        );
      } else {
        console.error(
          "Error: competitionId or editingCompetition is undefined"
        );
      }
      setEditingCompetition(null);
    } else {
      if (validateForm(newCompetition)) {
        dispatch(createNewCompetition(newCompetition));
        setNewCompetition({
          // competition_code:null,
          event_id: null,
          category_id: null,
          passion_dimension_id: null,
          prutl_dimension_id: null,
          venue_id: null,
          competition_name: null,
          type: null,
          start_date: null,
          end_date: null,
          location: null,
          remark: null,
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingCompetition(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewCompetition({
      // competition_code:null,
      event_id: null,
      category_id: null,
      passion_dimension_id: null,
      prutl_dimension_id: null,
      venue_id: null,
      competition_name: null,
      type: null,
      start_date: null,
      end_date: null,
      location: null,
      remark: null,
    });
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading competitions...");
    }
    if (error) {
      console.error("Error fetching competitions:", error);
    }
    if (competitions.length > 0) {
      console.log("Fetched competitions:", competitions);
    }
    if (loadingCategories) {
      console.log("Loading categories...");
    }
    if (errorCategories) {
      console.error("Error fetching categories:", errorCategories);
    }
    if (categories.length > 0) {
      console.log("Fetched categories:", categories);
    }
    if (loadingEvents) {
      console.log("Loading events...");
    }
    if (errorEvents) {
      console.log("Error fetching events:", errorEvents);
    }
    if (events.length > 0) {
      console.log("Fetched events:", events);
    }
    if (loadingPassionFrameworkDimensions) {
      console.log("Loading passionFrameworkDimensions...");
    }
    if (errorPassionFrameworkDimensions) {
      console.log(
        "Error fetching passionFrameworkDimensions:",
        errorPassionFrameworkDimensions
      );
    }
    if (passionFrameworkDimensions.length > 0) {
      console.log(
        "Fetched passionFrameworkDimensions:",
        passionFrameworkDimensions
      );
    }
    if (loadingPrutlFrameworkDimensions) {
      console.log("Loading prutlFrameworkDimensions...");
    }
    if (errorPrutlFrameworkDimensions) {
      console.log(
        "Error fetching prutlFrameworkDimensions:",
        errorPrutlFrameworkDimensions
      );
    }
    if (prutlFrameworkDimensions.length > 0) {
      console.log(
        "Fetched prutlFrameworkDimensions:",
        prutlFrameworkDimensions
      );
    }
    if (loadingVenues) {
      console.log("Loading venues...");
    }
    if (errorVenues) {
      console.log("Error fetching errorVenues:", errorVenues);
    }
    if (venues.length > 0) {
      console.log("Fetched venues:", venues);
    }
  }, [
    loading,
    error,
    competitions,
    loadingCategories,
    errorCategories,
    categories,
    loadingEvents,
    errorEvents,
    events,
    loadingPassionFrameworkDimensions,
    errorPassionFrameworkDimensions,
    passionFrameworkDimensions,
    loadingPrutlFrameworkDimensions,
    errorPrutlFrameworkDimensions,
    prutlFrameworkDimensions,
    venues,
    loadingVenues,
    errorVenues,
  ]);

  // Check for specific error
  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handleCloseModal = () => {
    setShowError(false);
  };
  
  if (loading) return <p>Loading Competitions...</p>;
  // if (error)
  //   return (
  //     <p className="error-message">
  //       {showError && <ErrorModal message={error} onClose={handleCloseModal} />}
  //     </p>
  //   );
  if (loadingCategories) return <p>Loading Categories...</p>;
  if (errorCategories)
    return <p className="error-message">{errorCategories}</p>;
  if (loadingEvents) return <p>Loading Events...</p>;
  if (errorEvents) return <p className="error-message">{errorEvents}</p>;
  if (loadingPassionFrameworkDimensions)
    return <p>Loading PassionFrameworkDimensions...</p>;
  if (errorPassionFrameworkDimensions)
    return <p className="error-message">{errorPassionFrameworkDimensions}</p>;
  if (loadingPrutlFrameworkDimensions)
    return <p>Loading PrutlFrameworkDimensions...</p>;
  if (errorPrutlFrameworkDimensions)
    return <p className="error-message">{errorPrutlFrameworkDimensions}</p>;
  if (loadingVenues) return <p>Loading venues...</p>;
  if (errorVenues) return <p className="error-message">{errorVenues}</p>;

  return (
    <div className="competition-list overflow-auto">
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
        Create New Competition
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete  ">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
                Competition ID
              </th> */}
              {/* <th className="px-4 py-2 whitespace-nowrap">Competition Code</th> */}
              <th className="px-28 py-2 mx-28 whitespace-nowrap">
                Competition Name
              </th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">Event Name</th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">Category</th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">
                Passion Dimension
              </th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">
                Prutl Dimension
              </th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">Venue Name</th>
             
              <th className="px-40 py-2 mx-40 whitespace-nowrap">Type</th>
              <th className="px-4 py-2 whitespace-nowrap">Start Date</th>
              <th className="px-4 py-2 whitespace-nowrap">End Date</th>
              <th className="px-4 py-2 whitespace-nowrap">Location</th>
              <th className="px-28 py-2 mx-28 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {competitions.map((competition) => (
              <tr key={competition.competition_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete z-10">
                  {competition.competition_id}
                </td> */}
 <td className="px-4 py-2 whitespace-nowrap">
                  {editingCompetition &&
                  editingCompetition.competition_id ===
                    competition.competition_id ? (
                    <EditableSelectInput
                      name="competition_name"
                      options={competitions.map((competition) => ({
                        value: competition.competition_name, // Actual value (competition_name)
                        label: competition.competition_name, // Display value (competition.competition_name)
                      }))}
                      value={editingCompetition.competition_name}
                      onChange={handleInputChange}
                      editable={true} // Allows both typing and selection from dropdown
                      // error={errors.competition_name}
                      placeholder="Select Competition Name"
                      id="competition_name"
                    />
                  ) : (
                    competition.competition_name
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingCompetition &&
                  editingCompetition.competition_id ===
                    competition.competition_id ? (
                    <EditableSelectInput
                      name="event_id"
                      options={events.map((event) => ({
                        value: event.event_id, // Actual value (event_id)
                        label: event.event_name, // Display value (event.event_name)
                      }))}
                      value={editingCompetition.event_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.event_name}
                      placeholder="Select Event Name"
                      id="event_id"
                    />
                  ) : (
                    // event.event_id
                    // Display event name based on event_id when not in edit mode
                    events.find(
                      (event) => event.event_id === competition.event_id
                    )?.event_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingCompetition &&
                  editingCompetition.competition_id ===
                    competition.competition_id ? (
                    <EditableSelectInput
                      name="category_id"
                      options={categories.map((category) => ({
                        value: category.category_id, // Actual value (category_id)
                        label: category.category_name, // Display value (categories.category_name)
                      }))}
                      value={editingCompetition.category_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.category_id}
                      placeholder="Select Category Name"
                      id="category_id"
                    />
                  ) : (
                    // competition.category_id
                    // Display category name based on category id when not in edit mode
                    categories.find(
                      (category) =>
                        category.category_id === competition.category_id
                    )?.category_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingCompetition &&
                  editingCompetition.competition_id ===
                    competition.competition_id ? (
                    <EditableSelectInput
                      name="passion_dimension_id"
                      options={passionFrameworkDimensions.map(
                        (passionFrameworkDimension) => ({
                          value: passionFrameworkDimension.dimension_id, // Actual value (dimension_id)
                          label: passionFrameworkDimension.dimension_name, // Display value (passionFrameworkDimension.passion_dimension)
                        })
                      )}
                      value={editingCompetition.passion_dimension_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errorPassionFrameworkDimensions.passion_dimension_id}
                      placeholder="Select Passion Dimension Name"
                      id="passion_dimension_id"
                    />
                  ) : (
                    // passionFrameworkDimensions.passion_dimension
                    // Display passion_dimension name based on dimension_id when not in edit mode
                    passionFrameworkDimensions.find(
                      (passionFrameworkDimension) =>
                        passionFrameworkDimension.dimension_id ===
                        competition.passion_dimension_id
                    )?.dimension_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingCompetition &&
                  editingCompetition.competition_id ===
                    competition.competition_id ? (
                    <EditableSelectInput
                      name="prutl_dimension_id"
                      options={prutlFrameworkDimensions.map(
                        (prutlFrameworkDimension) => ({
                          value: prutlFrameworkDimension.prutl_id, // Actual value (prutl_id)
                          label: prutlFrameworkDimension.prutl_name, // Display value (prutlFrameworkDimension.prutl_name)
                        })
                      )}
                      value={editingCompetition.prutl_dimension_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.prutl_dimension_id}
                      placeholder="Select Prutl Dimension Name"
                      id="prutl_dimension_id"
                    />
                  ) : (
                    // prutlFrameworkDimensions.prutl_name
                    // Display prutl_dimension name based on prutl_dimension id when not in edit mode
                    prutlFrameworkDimensions.find(
                      (prutlFrameworkDimension) =>
                        prutlFrameworkDimension.prutl_id ===
                        competition.prutl_dimension_id
                    )?.prutl_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingCompetition &&
                  editingCompetition.competition_id ===
                    competition.competition_id ? (
                    <EditableSelectInput
                      name="venue_id"
                      options={venues.map((venue) => ({
                        value: venue.venue_id, // Actual value (venue_id)
                        label: venue.venue_name, // Display value (venue.venue_name)
                      }))}
                      value={editingCompetition.venue_id}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.venue_id}
                      placeholder="Select Venue Name"
                      id="venue_id"
                    />
                  ) : (
                    // competition.venue_name
                    // Display venue name based on venue id when not in edit mode
                    venues.find(
                      (venue) => venue.venue_id === competition.venue_id
                    )?.venue_name || ""
                  )}
                </td>

               

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingCompetition &&
                  editingCompetition.competition_id ===
                    competition.competition_id ? (
                    <EditableSelectInput
                      name="type"
                      options={competitions.map((competition) => ({
                        value: competition.type, // Actual value (type)
                        label: competition.type, // Display value (competition.type)
                      }))}
                      value={editingCompetition.type}
                      onChange={handleInputChange}
                      editable={true} // Allows both typing and selection from dropdown
                      // error={errors.type}
                      placeholder="Select Type"
                      id="type"
                    />
                  ) : (
                    competition.type
                  )}
                </td>

                

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingCompetition &&
                  editingCompetition.competition_id ===
                    competition.competition_id ? (
                    <div className="input-group">
                      <input
                        type="date"
                        name="start_date"
                        // value={editingCompetition.start_date.split("T")[0] || ""}
                        value={
                          editingCompetition.start_date
                            ? editingCompetition.start_date.split("T")[0]
                            : "" // Fallback to an empty string if undefined
                        }
                        onChange={handleInputChange}
                        placeholder="Start Date"
                      />
                    </div>
                  ) : (
                    new Date(competition.start_date).toLocaleDateString()
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingCompetition &&
                  editingCompetition.competition_id ===
                    competition.competition_id ? (
                    <div className="input-group">
                      <input
                        type="date"
                        name="end_date"
                        // value={editingCompetition.end_date.split("T")[0] || ""}
                        value={
                          editingCompetition.end_date
                            ? editingCompetition.end_date.split("T")[0]
                            : "" // Fallback to an empty string if undefined
                        }
                        onChange={handleInputChange}
                        placeholder="End Date"
                      />
                    </div>
                  ) : (
                    new Date(competition.end_date).toLocaleDateString()
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingCompetition &&
                  editingCompetition.competition_id ===
                    competition.competition_id ? (
                    <EditableSelectInput
                      name="location"
                      options={competitions.map((competition) => ({
                        value: competition.location,
                        label: competition.location,
                      }))}
                      value={editingCompetition.location}
                      onChange={handleInputChange}
                      editable={true} // Allows both typing and selection from dropdown
                      placeholder="Select Location"
                      id="location"
                    />
                  ) : (
                    competition.location
                  )}
                </td>

               

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingCompetition &&
                  editingCompetition.competition_id ===
                    competition.competition_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingCompetition.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    competition.remark
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingCompetition &&
                  editingCompetition.competition_id ===
                    competition.competition_id ? (
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
                        onClick={() => handleEdit(competition)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 my-1 rounded"
                        onClick={() => handleDelete(competition.competition_id)}
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
            <h2 className="text-2xl font-semibold mb-4">
              Register New Competition
            </h2>
            <form className="grid grid-cols-4 gap-4">
              {/* <EditableSelectInput
                label="Competition Code"
                name="competition_code"
                options={competitions.map((competition) => ({
                  value: competition.competition_code, // Actual value (competition_code)
                  label: competition.competition_code, // Display value (competition.competition_code)
                }))}
                value={newCompetition.competition_code}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.competition_code}
                placeholder="Select or Enter competition_code"
                showRequired={true}
                id="passion_dimension_id"
              /> */}
               <EditableSelectInput
                label="Competition Name"
                name="competition_name"
                options={competitions.map((competition) => ({
                  value: competition.competition_name, // Actual value (competition_name)
                  label: competition.competition_name, // Display value (competition.competition_name)
                }))}
                value={newCompetition.competition_name}
                onChange={handleInputChange}
                editable={true} // Allows both typing and selection from dropdown
                error={errors.competition_name}
                placeholder="Select or Enter Competition Name"
                showRequired={true}
                id="competition_name"
              />

              <EditableSelectInput
                label="Event Name"
                name="event_id"
                options={events.map((event) => ({
                  value: event.event_id, // Actual value (event_id)
                  label: event.event_name, // Display value (event.event_name)
                }))}
                value={newCompetition.event_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.event_id}
                placeholder="Select Event Name"
                showRequired={true}
                id="event_id"
              />

              <EditableSelectInput
                label="Category"
                name="category_id"
                options={categories.map((category) => ({
                  value: category.category_id, // Actual value (category_id)
                  label: category.category_name, // Display value (category.category_name)
                }))}
                value={newCompetition.category_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.category_id}
                placeholder="Select Category"
                showRequired={true}
                id="category_id"
              />

              <EditableSelectInput
                label="Passion Dimension"
                name="passion_dimension_id"
                options={passionFrameworkDimensions.map(
                  (passionFrameworkDimension) => ({
                    value: passionFrameworkDimension.dimension_id, // Actual value (dimension_id)
                    label: passionFrameworkDimension.dimension_name, // Display value (passionFrameworkDimension.dimension_name)
                  })
                )}
                value={newCompetition.passion_dimension_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.passion_dimension_id}
                placeholder="Select Passion Dimension"
                showRequired={true}
                id="passion_dimension_id"
              />

              <EditableSelectInput
                label="Prutl Dimension"
                name="prutl_dimension_id"
                options={prutlFrameworkDimensions.map(
                  (prutlFrameworkDimension) => ({
                    value: prutlFrameworkDimension.prutl_id, // Actual value (prutl_id)
                    label: prutlFrameworkDimension.prutl_name, // Display value (prutlFrameworkDimension.prutl_name)
                  })
                )}
                value={newCompetition.prutl_dimension_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.prutl_dimension_id}
                placeholder="Select Prutl Dimension"
                showRequired={true}
                id="prutl_dimension_id"
              />

              <EditableSelectInput
              label="Venue Name"
                name="venue_id"
                options={venues.map((venue) => ({
                  value: venue.venue_id, // Actual value (venue_id)
                  label: venue.venue_name, // Display value (venue.venue_name)
                }))}
                value={newCompetition.venue_id}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.venue_id}
                placeholder="Select Venue Name"
                id="venue_id"
              />

              <EditableSelectInput
                label="Type"
                name="type"
                options={competitions.map((competition) => ({
                  value: competition.type, // Actual value (type)
                  label: competition.type, // Display value (competition.type)
                }))}
                value={newCompetition.type}
                onChange={handleInputChange}
                editable={true} // Allows both typing and selection from dropdown
                error={errors.type}
                placeholder="Select or Enter Type"
                // showRequired={true}
                id="type"
              />

              <div className="input-group row-span-3">
                <label htmlFor="start_date">
                  Start Date <span className="error-message">*</span>
                </label>
                <input
                  type="date"
                  name="start_date"
                  // value={newCompetition.start_date || ""}
                  // value={newCompetition.start_date.split("T")[0] || ""}
                  value={
                    newCompetition.start_date
                      ? newCompetition.start_date.split("T")[0]
                      : "" // Fallback to an empty string if undefined
                  }
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.start_date && (
                  <p className="error-message text-sm">
                    {errors.start_date}
                  </p>
                )}
              </div>
              <div className="input-group row-span-3">
                <label htmlFor="end_date">
                  End Date <span className="error-message">*</span>
                </label>
                <input
                  type="date"
                  name="end_date"
                  // value={newCompetition.end_date || ""}
                  // value={newCompetition.end_date.split("T")[0] || ""}
                  value={
                    newCompetition.end_date
                      ? newCompetition.end_date.split("T")[0]
                      : "" // Fallback to an empty string if undefined
                  }
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4 border rounded"
                />
                {errors.end_date && (
                  <p className="error-message text-sm">
                    {errors.end_date}
                  </p>
                )}
              </div>

              <EditableSelectInput
                label="Location"
                name="location"
                options={competitions.map((competition) => ({
                  value: competition.location, // Actual value (location)
                  label: competition.location, // Display value (competition.location)
                }))}
                value={newCompetition.location}
                onChange={handleInputChange}
                editable={true} // Allows both typing and selection from dropdown
                error={errors.location}
                placeholder="Select or Enter Location"
                // showRequired={true}
                id="location"
              />

              {/* <EditableSelectInput
                label="Location"
                name="location"
                options={competitions.map((competition) => ({
                  value: competition.location, // Actual value (location)
                  label: competition.location, // Display value (competition.location)
                }))}
                value={newCompetition.location}
                onChange={handleInputChange}
                editable={true} // Allows both typing and selection from dropdown
                error={errors.location}
                placeholder="Select or Enter Location"
                // showRequired={true}
                id="location"
              /> */}

              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={
                    newCompetition.remark || ""
                  }
                  onChange={handleInputChange}
                  placeholder="Remark"
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetitionList;
