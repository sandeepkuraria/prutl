import React, { useState } from 'react';
import { StateSelect } from 'react-country-state-city'; // Adjust import as needed

const EditableStateSelect = ({
    label,
  name,
  value,
  onChange,
  countryId,
  editable = true,
  error,
  placeholder = "Select State",
  showRequired = false,
  id,
}) => {
  const [selectedState, setSelectedState] = useState(null);

  const handleStateChange = (state) => {
    setSelectedState(state);
    if (editable) {
      onChange({
        target: { name, value: state.name, stateId: state.id },
      });
    }
  };

  return (
    <div className="relative input-group row-span-3">
      <label htmlFor={id || name}>
        {label} {showRequired && <span className="error-message">*</span>}
      </label>
      <StateSelect
        value={selectedState}
        countryid={countryId}
        onChange={handleStateChange}
        className={`w-full cursor-pointer border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? 'border-red-500' : ''
        }`}
        placeholder={placeholder}
        readOnly={!editable}
      />
      {error && <p className="error-message text-sm mt-1">{error}</p>}
    </div>
  );
};

export default EditableStateSelect;


// import React, { useState, useEffect } from 'react';
// import { State, Country } from 'country-state-city';

// const EditableStateSelect = ({
//   label,
//   name,
//   value,
//   onChange,
//   editable = true,
//   error,
//   placeholder = "Select State",
//   showRequired = false,
//   id,
//   countryId // The selected country ID passed as a prop
// }) => {
//   const [states, setStates] = useState([]);
//   const [displayValue, setDisplayValue] = useState(value); // Show the selected state value

//   // Fetch states based on the selected country ID
//   useEffect(() => {
//     if (countryId) {
//       const fetchedStates = State.getStatesOfCountry(countryId);
//       setStates(fetchedStates);
//     }
//   }, [countryId]);

//   // Update displayValue whenever the value prop changes
//   useEffect(() => {
//     setDisplayValue(value);
//   }, [value]);

//   // Handle state change
//   const handleStateChange = (event) => {
//     const selectedState = event.target.value;
//     setDisplayValue(selectedState); // Update the display value with the selected state's name
//     if (editable) {
//       onChange({ target: { name, value: selectedState } }); // Update the parent with the selected state name
//     }
//   };

//   return (
//     <div className="relative input-group row-span-3">
//       <label htmlFor={id || name}>
//         {label} {showRequired && <span className="error-message">*</span>}
//       </label>
//       <select
//         id={id || name}
//         name={name}
//         value={displayValue}
//         onChange={handleStateChange}
//         className={`w-full cursor-pointer border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//           error ? "border-red-500" : ""
//         }`}
//         placeholder={placeholder}
//         disabled={!editable || !countryId} // Disable when not editable or no country selected
//       >
//         <option value="" disabled>
//           {placeholder}
//         </option>
//         {states.map((state) => (
//           <option key={state.isoCode} value={state.name}>
//             {state.name}
//           </option>
//         ))}
//       </select>
//       {error && <p className="error-message text-sm mt-1">{error}</p>}
//     </div>
//   );
// };

// export default EditableStateSelect;
