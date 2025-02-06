import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const EditablePhoneInput = ({
  label,
  name,
  value,
  onChange,
  editable = true,
  error,
  placeholder = "Enter Phone Number",
  showRequired = false,
  id,
  country = 'in' // Default country set to 'us', can be passed as a prop
}) => {
  const [displayValue, setDisplayValue] = useState(value); // Show the input value

  // Update displayValue whenever the value prop changes
  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  // Handle input change for editable mode
  const handleInputChange = (phone) => {
    setDisplayValue(phone); // Update display value with the new phone number
    if (editable) {
      onChange({ target: { name, value: phone } }); // Update the parent with the typed value
    }
  };

  return (
    <div className="relative input-group row-span-3">
      <label htmlFor={id || name}>
        {label} {showRequired && <span className="error-message">*</span>}
      </label>
      <PhoneInput
        country={country} // Use the country prop here
        value={displayValue}
        onChange={handleInputChange}
        inputClass={`w-full pr-8 cursor-pointer border border-gray-300 rounded-md py-5 px-3 text-black-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? "border-red-500" : ""
        }`}
        placeholder={placeholder}
        readOnly={!editable} // Disable typing when not editable
      />
      {error && <p className="error-message text-sm mt-1">{error}</p>}
    </div>
  );
};

export default EditablePhoneInput;

// import React, { useState, useEffect } from 'react';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';

// const EditablePhoneInput = ({
//   label,
//   name,
//   value,
//   onChange,
//   editable = true,
//   error,
//   placeholder = "Enter Phone Number",
//   showRequired = false,
//   id
// }) => {
//   const [displayValue, setDisplayValue] = useState(value); // Show the input value

//   // Update displayValue whenever the value prop changes
//   useEffect(() => {
//     setDisplayValue(value);
//   }, [value]);

//   // Handle input change for editable mode
//   const handleInputChange = (phone) => {
//     setDisplayValue(phone); // Update display value with the new phone number
//     if (editable) {
//       onChange({ target: { name, value: phone } }); // Update the parent with the typed value
//     }
//   };

//   return (
//     <div className="relative input-group row-span-3">
//       <label htmlFor={id || name}>
//         {label} {showRequired && <span className="error-message">*</span>}
//       </label>
//       <PhoneInput
//         country={'in'}
//         value={displayValue}
//         onChange={handleInputChange}
//         inputClass={`w-full pr-8 cursor-pointer border border-gray-300 rounded-md py-5 px-3 text-black-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//           error ? "border-red-500" : ""
//         }`}
//         placeholder={placeholder}
//         readOnly={!editable} // Disable typing when not editable
//       />
//       {error && <p className="error-message text-sm mt-1">{error}</p>}
//     </div>
//   );
// };

// export default EditablePhoneInput;
