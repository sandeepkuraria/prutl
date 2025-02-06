import React, { useState, useEffect } from 'react';

const EditableSelectInput = ({
  label,
  name,
  options,
  value,
  onChange,
  editable = true,
  error,
  placeholder = "Select or enter an option",
  showRequired = false,
  id,
  isNumeric = false, // New prop for numeric input
  maxDigits = null, // New prop for maximum digits
  renderOption // New prop for rendering options
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [displayValue, setDisplayValue] = useState(''); // Show the input value

  // Find and set the display value (event_name) for the given value (event_id)
  useEffect(() => {
    const selectedOption = options.find(option => option.value === value);
    if (selectedOption) {
      setDisplayValue(selectedOption.label); // Set the event_name in input
    }
  }, [value, options]);

  // // Handle input change for editable mode
  // const handleInputChange = (e) => {
  //   const inputValue = e.target.value;

  //   // If isNumeric, restrict input to digits only
  //   if (isNumeric) {
  //     const numericValue = inputValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
  //     if (maxDigits && numericValue.length > maxDigits) {
  //       return; // Prevent further input if maxDigits is exceeded
  //     }
  //     setDisplayValue(numericValue); // Show numeric input value
  //     onChange({ target: { name, value: numericValue } }); // Update the parent with the typed value
  //   } else {
  //     setDisplayValue(inputValue); // Show input value
  //     if (editable) {
  //       setFilteredOptions(
  //         options.filter(option =>
  //           option.label.toLowerCase().includes(inputValue.toLowerCase())
  //         )
  //       );
  //       setIsDropdownOpen(true); // Show dropdown when typing
  //       onChange({ target: { name, value: inputValue } }); // Update the parent with the typed value
  //     }
  //   }
  // };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
  
    // If isNumeric, allow digits and one decimal point
    if (isNumeric) {
      const numericValue = inputValue.replace(/[^0-9.]/g, ''); // Allow digits and decimal point
      // Prevent multiple decimal points
      if ((numericValue.match(/\./g) || []).length > 1) {
        return; // Don't allow more than one decimal point
      }
      if (maxDigits && numericValue.replace('.', '').length > maxDigits) {
        return; // Prevent further input if maxDigits is exceeded
      }
      setDisplayValue(numericValue); // Show the numeric input value
      onChange({ target: { name, value: numericValue } }); // Update the parent with the typed value
    } else {
      setDisplayValue(inputValue); // Show input value
      if (editable) {
        setFilteredOptions(
          options.filter(option =>
            // option.label.toLowerCase().includes(inputValue.toLowerCase()))
            {
              // Check if option.label exists before calling toLowerCase
              return option.label && option.label.toLowerCase().includes(inputValue.toLowerCase());
            })
        );
        setIsDropdownOpen(true); // Show dropdown when typing
        onChange({ target: { name, value: inputValue } }); // Update the parent with the typed value
      }
    }
  };
  
  // // Handle dropdown option click
  // const handleOptionClick = (option) => {
  //   setDisplayValue(option.label); // Show the event_name in the input field
  //   onChange({ target: { name, value: option.value } }); // Update the actual value in the parent (event_id)
  //   setIsDropdownOpen(false); // Close dropdown after selection
  // };
  // Handle dropdown option click
const handleOptionClick = (option) => {
  setDisplayValue(option.label); // Show the selected option's label in the input field
  onChange({ target: { name, value: option.value } }, option); // Pass option as the second argument
  setIsDropdownOpen(false); // Close dropdown after selection
};



  // Handle focus and blur events
  const handleFocus = () => {
    setFilteredOptions(options); // Show all options initially
    setIsDropdownOpen(true); // Open dropdown on focus
  };

  const handleBlur = () => {
    setTimeout(() => setIsDropdownOpen(false), 200); // Delay closing dropdown to allow option click
  };

  return (
    <div className="relative input-group row-span-3">
      <label htmlFor={id || name}>
        {label} {showRequired && <span className="error-message">*</span>}
      </label>
      <input
        type="text"
        id={id || name}
        name={name}
        className="w-full pr-8 cursor-pointer border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={displayValue} // Show display value (event_name) or the selected option
        onChange={editable ? handleInputChange : undefined} // Allow typing only when editable
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        readOnly={!editable} // Disable typing when not editable
      />
      {isDropdownOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full backgroundLightDark rounded-md max-h-48 overflow-y-auto mt-1 shadow-lg">
          {filteredOptions.map(option => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={renderOption ? () => renderOption(option) : undefined} // Trigger hover event
              className="cursor-pointer px-3 p-0 hover:bg-blue-500 hover:text-white"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {isDropdownOpen && filteredOptions.length === 0 && (
        <ul className="absolute z-10 w-full backgroundLightDark rounded-md max-h-48 overflow-y-auto mt-1 shadow-lg">
          <li className="px-3 py-2 text-gray-500">No options found</li>
        </ul>
      )}
      {error && <p className="error-message text-sm mt-1">{error}</p>}
    </div>
  );
};

export default EditableSelectInput;


// import React, { useState, useEffect } from 'react';

// const EditableSelectInput = ({
//   label,
//   name,
//   options,
//   value,
//   onChange,
//   editable = true,
//   error,
//   placeholder = "Select or enter an option",
//   showRequired = false,
//   id,
//   isNumeric = false, // New prop for numeric input
//   maxDigits = null, // New prop for maximum digits
// }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [filteredOptions, setFilteredOptions] = useState(options);
//   const [displayValue, setDisplayValue] = useState(''); // Show the input value

//   // Find and set the display value (event_name) for the given value (event_id)
//   useEffect(() => {
//     const selectedOption = options.find(option => option.value === value);
//     if (selectedOption) {
//       setDisplayValue(selectedOption.label); // Set the event_name in input
//     }
//   }, [value, options]);

//   // Handle input change for editable mode
//   const handleInputChange = (e) => {
//     const inputValue = e.target.value;

//     // If isNumeric, restrict input to digits only
//     if (isNumeric) {
//       // Allow only digits and restrict to maxDigits if provided
//       const numericValue = inputValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
//       if (maxDigits && numericValue.length > maxDigits) {
//         return; // Prevent further input if maxDigits is exceeded
//       }
//       setDisplayValue(numericValue); // Show numeric input value
//       onChange({ target: { name, value: numericValue } }); // Update the parent with the typed value
//     } else {
//       setDisplayValue(inputValue); // Show input value
//       if (editable) {
//         setFilteredOptions(
//           options.filter(option =>
//             option.label.toLowerCase().includes(inputValue.toLowerCase())
//           )
//         );
//         setIsDropdownOpen(true); // Show dropdown when typing
//         onChange({ target: { name, value: inputValue } }); // Update the parent with the typed value
//       }
//     }
//   };

//   // Handle dropdown option click
//   const handleOptionClick = (option) => {
//     setDisplayValue(option.label); // Show the event_name in the input field
//     onChange({ target: { name, value: option.value } }); // Update the actual value in the parent (event_id)
//     setIsDropdownOpen(false); // Close dropdown after selection
//   };

//   // Handle focus and blur events
//   const handleFocus = () => {
//     setFilteredOptions(options); // Show all options initially
//     setIsDropdownOpen(true); // Open dropdown on focus
//   };

//   const handleBlur = () => {
//     setTimeout(() => setIsDropdownOpen(false), 200); // Delay closing dropdown to allow option click
//   };

//   return (
//     <div className="relative input-group row-span-3">
//       <label htmlFor={id || name}>
//         {label} {showRequired && <span className="error-message">*</span>}
//       </label>
//       <input
//         type="text"
//         id={id || name}
//         name={name}
//         className="w-full pr-8 cursor-pointer border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         value={displayValue} // Show display value (event_name) or the selected option
//         onChange={editable ? handleInputChange : undefined} // Allow typing only when editable
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//         placeholder={placeholder}
//         readOnly={!editable} // Disable typing when not editable
//       />
//       {isDropdownOpen && filteredOptions.length > 0 && (
//         <ul className="absolute z-10 w-full backgroundLightDark rounded-md max-h-48 overflow-y-auto mt-1 shadow-lg">
//           {filteredOptions.map(option => (
//             <li
//               key={option.value}
//               onClick={() => handleOptionClick(option)}
//               className="cursor-pointer px-3 p-0 hover:bg-blue-500 hover:text-white"
//             >
//               {option.label}
//             </li>
//           ))}
//         </ul>
//       )}
//       {isDropdownOpen && filteredOptions.length === 0 && (
//         <ul className="absolute z-10 w-full backgroundLightDark rounded-md max-h-48 overflow-y-auto mt-1 shadow-lg">
//           <li className="px-3 py-2 text-gray-500">No options found</li>
//         </ul>
//       )}
//       {error && <p className="error-message text-sm mt-1">{error}</p>}
//     </div>
//   );
// };

// export default EditableSelectInput;


// import React, { useState, useEffect } from 'react';

// const EditableSelectInput = ({
//   label,
//   name,
//   options,
//   value,
//   onChange,
//   editable = true,
//   error,
//   placeholder = "Select or enter an option",
//   showRequired = false,
//   id
// }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [filteredOptions, setFilteredOptions] = useState(options);
//   const [displayValue, setDisplayValue] = useState(''); // Show the input value

//   // Find and set the display value (event_name) for the given value (event_id)
//   useEffect(() => {
//     const selectedOption = options.find(option => option.value === value);
//     if (selectedOption) {
//       setDisplayValue(selectedOption.label); // Set the event_name in input
//     }
//   }, [value, options]);

//   // Handle input change for editable mode
//   const handleInputChange = (e) => {
//     const inputValue = e.target.value;
//     setDisplayValue(inputValue); // Show input value
//     if (editable) {
//       setFilteredOptions(
//         options.filter(option =>
//           option.label.toLowerCase().includes(inputValue.toLowerCase())
//         )
//       );
//       setIsDropdownOpen(true); // Show dropdown when typing
//       onChange({ target: { name, value: inputValue } }); // Update the parent with the typed value
//     }
//   };

//   // Handle dropdown option click
//   const handleOptionClick = (option) => {
//     setDisplayValue(option.label); // Show the event_name in the input field
//     onChange({ target: { name, value: option.value } }); // Update the actual value in the parent (event_id)
//     setIsDropdownOpen(false); // Close dropdown after selection
//   };

//   // Handle focus and blur events
//   const handleFocus = () => {
//     setFilteredOptions(options); // Show all options initially
//     setIsDropdownOpen(true); // Open dropdown on focus
//   };

//   const handleBlur = () => {
//     setTimeout(() => setIsDropdownOpen(false), 200); // Delay closing dropdown to allow option click
//   };

//   return (
//     <div className="relative input-group row-span-3">
//       <label htmlFor={id || name}>
//         {label} {showRequired && <span className="error-message">*</span>}
//       </label>
//       <input
//         type="text"
//         id={id || name}
//         name={name}
//         className="w-full pr-8 cursor-pointer border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         value={displayValue} // Show display value (event_name) or the selected option
//         onChange={editable ? handleInputChange : undefined} // Allow typing only when editable
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//         placeholder={placeholder}
//         readOnly={!editable} // Disable typing when not editable
//       />
//       {isDropdownOpen && filteredOptions.length > 0 && (
//         <ul className="absolute z-10 w-full backgroundLightDark rounded-md max-h-48 overflow-y-auto mt-1 shadow-lg">
//           {filteredOptions.map(option => (
//             <li
//               key={option.value}
//               onClick={() => handleOptionClick(option)}
//               className="cursor-pointer px-3 p-0 hover:bg-blue-500 hover:text-white"
//             >
//               {option.label}
//             </li>
//           ))}
//         </ul>
//       )}
//       {isDropdownOpen && filteredOptions.length === 0 && (
//         <ul className="absolute z-10 w-full backgroundLightDark rounded-md max-h-48 overflow-y-auto mt-1 shadow-lg">
//           <li className="px-3 py-2 text-gray-500">No options found</li>
//         </ul>
//       )}
//       {error && <p className="error-message  text-sm mt-1">{error}</p>}
//     </div>
//   );
// };

// export default EditableSelectInput;


// import React, { useState, useRef } from 'react';

// const EditableSelectInput = ({
//   label,
//   name,
//   options,
//   value,
//   onChange,
//   editable = true,
//   error,
//   placeholder = "Select or enter an option",
//   showRequired = false,
//   id
// }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [filteredOptions, setFilteredOptions] = useState(options);
//   const [displayValue, setDisplayValue] = useState(''); // State to hold the display value
//   const inputRef = useRef(null);

//   // Common styles for both input and dropdown options
//   const inputStyles =
//     "w-full pr-8 cursor-pointer border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

//   const handleInputChange = (e) => {
//     const inputValue = e.target.value;
//     setDisplayValue(inputValue);
//     onChange({ target: { name, value: '' } }); // Clear the actual value when typing
//     setFilteredOptions(
//       options.filter(option =>
//         option.label.toLowerCase().includes(inputValue.toLowerCase())
//       )
//     );
//     setIsDropdownOpen(true); // Show dropdown on input change
//   };

//   const handleOptionClick = (option) => {
//     setDisplayValue(option.label); // Show the label (user.name) in the input
//     onChange({ target: { name, value: option.value } }); // Set the actual value (user.user_id)
//     setIsDropdownOpen(false); // Close dropdown after selection
//   };

//   const handleFocus = () => {
//     setIsDropdownOpen(true);
//   };

//   const handleBlur = () => {
//     setTimeout(() => setIsDropdownOpen(false), 200); // Delay closing to allow click
//   };

//   return (
//     <div className="relative input-group row-span-3">
//       <label htmlFor={id || name}>
//         {label} {showRequired && <span style={{ color: "red" }}>*</span>}
//       </label>
//       <input
//         type="text"
//         id={id || name}
//         name={name}
//         className={inputStyles}
//         value={displayValue} // Show display value
//         onChange={handleInputChange}
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//         placeholder={placeholder}
//         ref={inputRef}
//       />
//       {isDropdownOpen && (
//         <ul className="absolute z-10 w-full backgroundLightDark rounded-md max-h-48 overflow-y-auto mt-1 shadow-lg">
//           {filteredOptions.map(option => (
//             <li
//               key={option.key || option.value}
//               onClick={() => handleOptionClick(option)}
//               className="cursor-pointer px-3 p-0 hover:bg-blue-500 hover:text-white"
//             >
//               {option.label}
//             </li>
//           ))}
//           {filteredOptions.length === 0 && (
//             <li className="px-3 py-2 text-gray-500">No options found</li>
//           )}
//         </ul>
//       )}
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// };

// export default EditableSelectInput;

// import React from 'react';

// const EditableSelectInput = ({
//   label,
//   name,
//   options,
//   value,
//   onChange,
//   editable = false,
//   error,
//   placeholder = "Select an option",
//   showRequired = false,
//   id
// }) => {
//   // Common styles for both input and select elements
// //   const inputStyles = "w-full pr-8 cursor-pointer border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

//   return (
//     <div className="input-group row-span-3">
//       <label htmlFor={id || name} >
//         {label} {showRequired && <span style={{ color: "red" }}>*</span>}
//       </label>
//       <div>
//         {editable ? (
//           // Input field for editable mode
//           <input
//             type="text"
//             id={id || name}
//             name={name}
//             // className={inputStyles}
//             value={value || ""}
//             onChange={onChange}
//             placeholder={`Enter ${label}`}
//           />
//         ) : (
//           // Select dropdown for non-editable mode
//           <select
//             // className={inputStyles}
//             id={id || name}
//             name={name}
//             value={value || ""}
//             onChange={onChange}
//           >
//             <option value="">{placeholder}</option>
//             {options.map((option) => (
//               <option key={option.key || option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         )}
//       </div>

//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// };

// export default EditableSelectInput;
