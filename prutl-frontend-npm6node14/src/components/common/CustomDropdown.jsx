
import React, { useState, useEffect, useRef } from "react";

const CustomSelect = ({
  label,
  name,
  options,
  value,
  onChange,
  editable = false,
  error,
  placeholder = "Select an option",
  showRequired = false, // New prop to control the asterisk display

}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [searchValue, setSearchValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (editable) {
      setInputValue(newValue);
      onChange(e); // Notify parent about the change
    }
    setSearchValue(newValue); // Update search value
    setShowOptions(true); // Show dropdown while typing
    // onChange(e);
  };

  const handleOptionClick = (optionValue) => {
    setInputValue(optionValue);
    setSearchValue(optionValue); // fill selected option in the search input after selection
    setShowOptions(false); // Hide dropdown after selection
    onChange({ target: { name, value: optionValue } }); // Notify parent of the selected value
  };

  const handleArrowClick = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions); // Toggle dropdown visibility
    if (editable) {
      setInputValue(value || ""); // Keep the previously selected value in the input
    }
    inputRef.current.focus(); // Focus input when arrow is clicked
  };

  const handleFocus = () => {
    setShowOptions(true); // Show dropdown when input is focused
  };

  const handleBlur = () => {
    // Delay hiding the dropdown to allow click events to register
    setTimeout(() => setShowOptions(false), 200);
  };

  // // Filter and sort options based on search input
  // const filteredOptions = options.filter((option) =>
  //   option.label.toLowerCase().includes(searchValue.toLowerCase())
  // );
// Ensure searchValue is always treated as a string
const normalizedSearchValue = String(searchValue).toLowerCase();

// Filter and sort options based on search input
const filteredOptions = options.filter((option) => {
  // Convert the option to a string based on its type
  const optionString = typeof option === 'string' 
    ? option 
    : typeof option === 'number' 
    ? option.toString() 
    : typeof option === 'object' && option !== null && option.label 
    ? option.label.toString() 
    : '';

  // Check if the string representation includes the search value
  return optionString.toLowerCase().includes(normalizedSearchValue);
});

  useEffect(() => {
    // Reset input value when `value` prop changes
    setInputValue(value || "");
  }, [value]);

  return (
    <div className="input-group row-span-3 relative">
      <label htmlFor={name}>
        {label} {showRequired && <span style={{ color: "red" }}>*</span>}
      </label>
      <div className="relative">
        {/* Input field with dropdown arrow */}
        <input
          ref={inputRef}
          className=" w-full pr-8 cursor-pointer" // Add padding for the arrow
          name={name}
          placeholder={placeholder}
          type="text"
          value={editable ? inputValue :searchValue} // Show search value for filtering
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={() => setShowOptions(true)} // Show options on click
          readOnly={false} // Allow typing for search if non-editable
        />

        {/* Dropdown arrow */}
        <span
          className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
          onClick={handleArrowClick} // Toggle dropdown on arrow click
        >
          ▼
        </span>
      </div>

      {showOptions && (
        <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-y-auto backgroundLightDark rounded shadow">
          {filteredOptions.length === 0 ? (
            <div>
              {editable === (false)? ( <li className="p-2 text-gray-500">Select from options</li>):( <li className="p-2 text-gray-500">No options found</li>)}
 
            </div>
         
          ) : (
            filteredOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className="p-1 cursor-pointer hover:bg-blue-500 hover:text-white"
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
      )}

      {error && <p className="error-message">{error}</p>}
      
    </div>
  );
};

export default CustomSelect;

// import React, { useState, useEffect } from "react";

// const CustomSelect = ({
//   label,
//   name,
//   options,
//   value,
//   onChange,
//   editable = false,
//   error,
//   placeholder = "Select an option",
// }) => {
//   const [inputValue, setInputValue] = useState(value || "");
//   const [showOptions, setShowOptions] = useState(false);

//   const handleInputChange = (e) => {
//     const newValue = e.target.value;
//     setInputValue(newValue);
//     setShowOptions(true); // Show dropdown while typing
//     onChange(e); // Notify parent about the change
//   };

//   const handleOptionClick = (optionValue) => {
//     setInputValue(optionValue);
//     setShowOptions(false); // Hide dropdown after selection
//     onChange({ target: { name, value: optionValue } }); // Notify parent of the selected value
//   };

//   const handleArrowClick = () => {
//     setShowOptions((prevShowOptions) => !prevShowOptions); // Toggle dropdown visibility
//     setInputValue(value || ""); // Keep the previously selected value in the input
//   };

//   const handleFocus = () => {
//     setShowOptions(true); // Show dropdown when input is focused
//   };

//   const handleBlur = () => {
//     // Delay hiding the dropdown to allow click events to register
//     setTimeout(() => setShowOptions(false), 200);
//   };

//   // Highlight matching options and sort them to the top
//   const filteredOptions = inputValue
//     ? options.filter((option) =>
//         option.label.toLowerCase().includes(inputValue.toLowerCase())
//       )
//     : options; // Show all options if no input value

//   // Sort filtered options to the top
//   const sortedOptions = [
//     ...filteredOptions,
//     ...options.filter(
//       (option) =>
//         !filteredOptions.includes(option) // Add the non-matching options after the filtered ones
//     ),
//   ];

//   useEffect(() => {
//     // Reset input value when `value` prop changes
//     setInputValue(value || "");
//   }, [value]);

//   return (
//     <div className="input-group row-span-3 relative">
//       <label htmlFor={name}>
//         {label} <span style={{ color: "red" }}>*</span>
//       </label>
//       <div className="relative">
//         {/* Input field with dropdown arrow */}
//         <input
//           className="selection input w-full pr-8 cursor-pointer" // Add padding for the arrow
//           name={name}
//           placeholder={placeholder}
//           type="text"
//           value={inputValue}
//           onChange={editable ? handleInputChange : undefined}
//           onFocus={handleFocus}
//           onBlur={handleBlur}
//           onClick={() => {
//             if (!editable) setShowOptions(true); // Show options on click if non-editable
//           }}
//           readOnly={!editable}
//         />

//         {/* Dropdown arrow */}
//         <span
//           className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
//           onClick={handleArrowClick} // Toggle dropdown on arrow click
//         >
//           ▼
//         </span>
//       </div>

//       {showOptions && (
//         <ul className="selection absolute z-10 mt-1 max-h-40 w-full overflow-y-auto bg-white border border-gray-300 rounded shadow">
//           {sortedOptions.length === 0 ? (
//             <li className="p-2 text-gray-500">No options found</li>
//           ) : (
//             sortedOptions.map((option, index) => (
//               <li
//                 key={option.value}
//                 onClick={() => handleOptionClick(option.value)}
//                 className={`p-2 cursor-pointer hover:bg-blue-500 hover:text-white ${
//                   filteredOptions.includes(option) && index < filteredOptions.length
//                     ? " font-bold " // Highlight the filtered options
//                     : ""
//                 }`}
//               >
//                 {option.label}
//               </li>
//             ))
//           )}
//         </ul>
//       )}

//       {error && <p className="error-message">{error}</p>}
//     </div>
//   );
// };

// export default CustomSelect;
