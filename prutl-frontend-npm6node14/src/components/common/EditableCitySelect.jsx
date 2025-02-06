import React, { useState } from 'react';
import { CitySelect } from 'react-country-state-city'; // Adjust import as needed

const EditableCitySelect = ({
    label,
  name,
  value,
  onChange,
  countryId,
  stateId,
  editable = true,
  error,
  placeholder = "Select City",
  showRequired = false,
  id,
}) => {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCityChange = (city) => {
    setSelectedCity(city);
    if (editable) {
      onChange({
        target: { name, value: city.name },
      });
    }
  };

  return (
    <div className="relative input-group row-span-3">
      <label htmlFor={id || name}>
        {label} {showRequired && <span className="error-message">*</span>}
      </label>
      <CitySelect
        value={selectedCity}
        countryid={countryId}
        stateid={stateId}
        onChange={handleCityChange}
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

export default EditableCitySelect;
