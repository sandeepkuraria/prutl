import React, { useState } from 'react';
import { CountrySelect } from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';

const EditableCountrySelect = ({
  label,
  name,
  value,
  onChange,
  editable = true,
  error,
  placeholder = "Select Country",
  showRequired = false,
  id
}) => {
  const [selectedCountry, setSelectedCountry] = useState(null); // Holds the selected country object

  // Handle country change
  const handleCountryChange = (country) => {
    setSelectedCountry(country); // Update the selected country object
    if (editable) {
      onChange({
        target: { name, value: country.name, countryId: country.id },
      }); // Update the parent with the selected country's name and ID
    }
  };

  return (
    <div className="relative input-group row-span-3">
      <label htmlFor={id || name}>
        {label} {showRequired && <span className="error-message">*</span>}
      </label>
      <CountrySelect
        value={selectedCountry}
        onChange={handleCountryChange}
        className={`w-full cursor-pointer border border-gray-300 rounded-md py-1 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? 'border-red-500' : ''
        }`}
        placeholder={placeholder}
        readOnly={!editable} // Disable editing when not editable
      />
      {error && <p className="error-message text-sm mt-1">{error}</p>}
    </div>
  );
};

export default EditableCountrySelect;


// import React, { useState, useEffect } from 'react';
// import { CountrySelect } from 'react-country-state-city';
// import 'react-country-state-city/dist/react-country-state-city.css';

// const EditableCountrySelect = ({
//   label,
//   name,
//   value,
//   onChange,
//   editable = true,
//   error,
//   placeholder = "Select Country",
//   showRequired = false,
//   id
// }) => {
//   const [displayValue, setDisplayValue] = useState(value); // Show the selected country value

//   // Update displayValue whenever the value prop changes
//   useEffect(() => {
//     setDisplayValue(value);
//   }, [value]);

//   // Handle country change
//   const handleCountryChange = (country) => {
//     setDisplayValue(country.name); // Update the display value with the selected country's name
//     if (editable) {
//       onChange({ target: { name, value: country.name } }); // Update the parent with the selected country name
//     }
//   };

//   return (
//     <div className="relative input-group row-span-3">
//       <label htmlFor={id || name}>
//         {label} {showRequired && <span className="error-message">*</span>}
//       </label>
//       <CountrySelect
//         value={displayValue}
//         onChange={handleCountryChange}
//         className={`w-full cursor-pointer border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//           error ? "border-red-500" : ""
//         }`}
//         placeholder={placeholder}
//         readOnly={!editable} // Disable editing when not editable
//       />
//       {error && <p className="error-message text-sm mt-1">{error}</p>}
//     </div>
//   );
// };

// export default EditableCountrySelect;
