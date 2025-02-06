import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  createNewCategory,
  updateCategory,
  deleteCategory,
} from "../../redux/slices/categorySlice.js";
import EditableSelectInput from "../common/EditableSelectInput .jsx";
import { getAllPassionFrameworkDimensions } from "../../redux/slices/passionFrameworkDimensionSlice.js";
import { getAllPrutlFrameworkDimensions } from "../../redux/slices/prutlFrameworkDimensionSlice.js";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
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

  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    category_name: "",
    passion_dimension: "",
    prutl_dimension: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getAllCategories());
    // Dispatch the action to fetch passionFrameworkDimensions when the component mounts
    dispatch(getAllPassionFrameworkDimensions());
    // Dispatch the action to fetch prutlFrameworkDimensions when the component mounts
    dispatch(getAllPrutlFrameworkDimensions());
  }, [dispatch]);

  const handleDelete = (categoryId) => {
    dispatch(deleteCategory(categoryId));
  };

  const handleEdit = (category) => {
    setEditingCategory({ ...category });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingCategory) {
      setEditingCategory({ ...editingCategory, [name]: value });
    } else {
      setNewCategory({ ...newCategory, [name]: value });
    }
  };

  const validateForm = (formData) => {
    let newErrors = {};
    if (!formData.category_name)
      newErrors.category_name = "Category Name is required";
    if (!formData.passion_dimension)
      newErrors.passion_dimension = "Passion Dimension is required";
    if (!formData.prutl_dimension)
      newErrors.prutl_dimension = "PRUTL Dimension is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (editingCategory) {
      if (editingCategory.category_id && editingCategory) {
        dispatch(
          updateCategory({
            categoryId: editingCategory.category_id,
            data: editingCategory,
          })
        );
      } else {
        console.error("Error: categoryId or editingCategory is undefined");
      }
      setEditingCategory(null);
    } else {
      if (validateForm(newCategory)) {
        dispatch(createNewCategory(newCategory));
        setNewCategory({
          category_name: "",
          passion_dimension: "",
          prutl_dimension: "",
          remark: "",
        });
        setShowModal(false);
      }
    }
  };

  const handleUndo = () => {
    setEditingCategory(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setNewCategory({
      category_name: "",
      passion_dimension: "",
      prutl_dimension: "",
      remark: "",
    });
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading categories...");
    }
    if (error) {
      console.error("Error fetching categories:", error);
    }
    if (categories.length > 0) {
      console.log("Fetched categories:", categories);
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
  }, [
    loading,
    error,
    categories,
    loadingPassionFrameworkDimensions,
    errorPassionFrameworkDimensions,
    passionFrameworkDimensions,
    loadingPrutlFrameworkDimensions,
    errorPrutlFrameworkDimensions,
    prutlFrameworkDimensions,
  ]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (loadingPassionFrameworkDimensions)
    return <p>Loading PassionFrameworkDimensions...</p>;
  if (errorPassionFrameworkDimensions)
    return <p className="error-message">{errorPassionFrameworkDimensions}</p>;
  if (loadingPrutlFrameworkDimensions)
    return <p>Loading PrutlFrameworkDimensions...</p>;
  if (errorPrutlFrameworkDimensions)
    return <p className="error-message">{errorPrutlFrameworkDimensions}</p>;

  return (
    <div className="category-list overflow-auto">
      <button
        className="bg-blue-500 text-white px-4 py-2 m-2 rounded mb-4"
        onClick={toggleModal}
      >
        Create New Category
      </button>
      <div className="table-wrapper max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="whitespace-nowrap sticky top-0 z-30 tableHeadEditDelete">
            <tr>
              {/* <th className="px-4 py-2 whitespace-nowrap sticky top-0 left-0 z-20 tableHeadEditDelete">
                Category ID
              </th> */}
              <th className="px-4 py-2 whitespace-nowrap">Category Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Passion Dimension</th>
              <th className="px-4 py-2 whitespace-nowrap">PRUTL Dimension</th>
              <th className="px-4 py-2 whitespace-nowrap">Remark</th>
              <th className="px-4 py-2 whitespace-nowrap sticky top-0 right-0 z-20 tableHeadEditDelete">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.category_id}>
                {/* <td className="px-4 py-2 whitespace-nowrap sticky left-0 tableHeadEditDelete">
                  {category.category_id}
                </td> */}

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingCategory &&
                  editingCategory.category_id === category.category_id ? (
                    <EditableSelectInput
                      name="category_name"
                      options={categories.map((category) => ({
                        value: category.category_name, // Actual value (category_name)
                        label: category.category_name, // Display value (categories.category_name)
                      }))}
                      value={editingCategory.category_name}
                      onChange={handleInputChange}
                      editable={true} // Allows typing text or selection from dropdown
                      // error={errors.category_name}
                      placeholder="Select or Enter Category Name"
                      id="category_name"
                    />
                  ) : (
                    category.category_name
                    // Display category name based on category name when not in edit mode
                  )}
                </td>

                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingCategory &&
                  editingCategory.category_id === category.category_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="category_name"
                        value={editingCategory.category_name || ""}
                        onChange={handleInputChange}
                        placeholder="Category Name"
                      />
                    </div>
                  ) : (
                    category.category_name
                  )}
                </td> */}

                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {editingCategory &&
                  editingCategory.category_id === category.category_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="passion_dimension"
                        value={editingCategory.passion_dimension || ""}
                        onChange={handleInputChange}
                        placeholder="Passion Dimension"
                      />
                    </div>
                  ) : (
                    category.passion_dimension
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {editingCategory &&
                  editingCategory.category_id === category.category_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="prutl_dimension"
                        value={editingCategory.prutl_dimension || ""}
                        onChange={handleInputChange}
                        placeholder="PRUTL Dimension"
                      />
                    </div>
                  ) : (
                    category.prutl_dimension
                  )}
                </td> */}
                  <td className="px-4 py-2 whitespace-nowrap">
                  {editingCategory &&
                  editingCategory.category_id ===
                    category.category_id ? (
                    <EditableSelectInput
                      name="passion_dimension"
                      options={passionFrameworkDimensions.map(
                        (passionFrameworkDimension) => ({
                          value: passionFrameworkDimension.dimension_name, // Actual value (passion_dimension)
                          label: passionFrameworkDimension.dimension_name, // Display value (passionFrameworkDimension.passion_dimension)
                        })
                      )}
                      value={editingCategory.passion_dimension}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errorPassionFrameworkDimensions.passion_dimension}
                      placeholder="Select Passion Dimension Name"
                      id="passion_dimension"
                    />
                  ) : (
                    // passionFrameworkDimensions.passion_dimension
                    // Display passion_dimension name based on passion_dimension name when not in edit mode
                    passionFrameworkDimensions.find(
                      (passionFrameworkDimension) =>
                        passionFrameworkDimension.dimension_name ===
                        category.passion_dimension
                    )?.dimension_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingCategory &&
                  editingCategory.category_id ===
                    category.category_id ? (
                    <EditableSelectInput
                      name="prutl_dimension"
                      options={prutlFrameworkDimensions.map(
                        (prutlFrameworkDimension) => ({
                          value: prutlFrameworkDimension.prutl_name, // Actual value (prutl_name)
                          label: prutlFrameworkDimension.prutl_name, // Display value (prutlFrameworkDimension.prutl_name)
                        })
                      )}
                      value={editingCategory.prutl_dimension}
                      onChange={handleInputChange}
                      editable={false} // Allows selection from dropdown
                      // error={errors.prutl_dimension}
                      placeholder="Select Prutl Dimension Name"
                      id="prutl_dimension"
                    />
                  ) : (
                    // prutlFrameworkDimensions.prutl_name
                    // Display prutl_dimension name based on prutl_dimension name when not in edit mode
                    prutlFrameworkDimensions.find(
                      (prutlFrameworkDimension) =>
                        prutlFrameworkDimension.prutl_name ===
                        category.prutl_dimension
                    )?.prutl_name || ""
                  )}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {editingCategory &&
                  editingCategory.category_id === category.category_id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        name="remark"
                        value={editingCategory.remark || ""}
                        onChange={handleInputChange}
                        placeholder="Remark"
                      />
                    </div>
                  ) : (
                    category.remark
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap sticky right-0 tableHeadEditDelete">
                  {editingCategory &&
                  editingCategory.category_id === category.category_id ? (
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
                        onClick={() => handleEdit(category)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded"
                        onClick={() => handleDelete(category.category_id)}
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
      {/* Modal for Creating a New Category */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center mt-12 z-30">
          <div className="registerCard px-6 py-1 rounded-lg shadow-lg w-full max-w-6xl">
            <h2 className="text-2xl font-semibold mb-4">Create New Category</h2>
            <form className="grid grid-cols-4 gap-4">
              {/* <div className="input-group row-span-3">
                <label htmlFor="category_name">Category Name</label>
                <input
                  type="text"
                  id="category_name"
                  name="category_name"
                  value={newCategory.category_name}
                  onChange={handleInputChange}
                  placeholder="Category Name"
                />
                {errors.category_name && (
                  <span className="text-red-500">{errors.category_name}</span>
                )}
              </div> */}
              <EditableSelectInput
                label="Category Name"
                name="category_name"
                options={categories.map((category) => ({
                  value: category.category_name, // Actual value (category_name)
                  label: category.category_name, // Display value (category.category_name)
                }))}
                value={newCategory.category_name}
                onChange={handleInputChange}
                editable={true} // Allows typing and selection from dropdown
                error={errors.category_name}
                placeholder="Select or Enter Category Name"
                showRequired={true}
                id="category_name"
              />
               <EditableSelectInput
                label="Passion Dimension"
                name="passion_dimension"
                options={passionFrameworkDimensions.map(
                  (passionFrameworkDimension) => ({
                    value: passionFrameworkDimension.dimension_name, // Actual value (passion_dimension)
                    label: passionFrameworkDimension.dimension_name, // Display value (passionFrameworkDimension.passion_dimension)
                  })
                )}
                value={newCategory.passion_dimension}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.passion_dimension}
                placeholder="Select Passion Dimension"
                showRequired={true}
                id="passion_dimension"
              />

              <EditableSelectInput
                label="Prutl Dimension"
                name="prutl_dimension"
                options={prutlFrameworkDimensions.map((prutlFrameworkDimension) => ({
                  value: prutlFrameworkDimension.prutl_name, // Actual value (prutl_name)
                  label: prutlFrameworkDimension.prutl_name, // Display value (prutlFrameworkDimension.prutl_name)
                }))}
                value={newCategory.prutl_dimension}
                onChange={handleInputChange}
                editable={false} // Allows selection from dropdown
                error={errors.prutl_dimension}
                placeholder="Select Prutl Dimension"
                showRequired={true}
                id="prutl_dimension"
              />
              {/* <div className="input-group row-span-3">
                <label htmlFor="passion_dimension">Passion Dimension</label>
                <input
                  type="text"
                  id="passion_dimension"
                  name="passion_dimension"
                  value={newCategory.passion_dimension}
                  onChange={handleInputChange}
                  placeholder="Passion Dimension"
                />
                {errors.passion_dimension && (
                  <span className="text-red-500">
                    {errors.passion_dimension}
                  </span>
                )}
              </div>
              <div className="input-group row-span-3">
                <label htmlFor="prutl_dimension">PRUTL Dimension</label>
                <input
                  type="text"
                  id="prutl_dimension"
                  name="prutl_dimension"
                  value={newCategory.prutl_dimension}
                  onChange={handleInputChange}
                  placeholder="PRUTL Dimension"
                />
                {errors.prutl_dimension && (
                  <span className="text-red-500">{errors.prutl_dimension}</span>
                )}
              </div> */}
              <div className="input-group row-span-3">
                <label htmlFor="remark">Remark</label>
                <textarea
                  name="remark"
                  value={newCategory.remark || ""}
                  onChange={handleInputChange}
                  placeholder="Remark"
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>
            </form>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
