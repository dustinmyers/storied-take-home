'use client'

import React, { useState } from 'react';
import DropdownSelect, { Option } from './DropdownSelect';

const options = [
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'blue', label: 'Blue' },
  { value: 'purple', label: 'Purple' },
];

const DropdownWrapper: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  const handleChange = (value: Option) => {
    console.log('Selected:', value);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex items-center">
        <label className="flex items-center cursor-pointer">
        <input
          className="
            peer relative appearance-none shrink-0 w-4 h-4 border-2 border-blue-200 rounded-sm mr-2
            focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100
            checked:bg-blue-500 checked:border-0
          "
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <svg
          className="absolute w-4 h-4 pointer-events-none hidden peer-checked:block stroke-white outline-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
          Should we use search functionality??
        </label>
      </div>
      <DropdownSelect
        label="Select a color"
        options={options}
        onChange={handleChange}
        isSearchable={isChecked}
      />
    </div>
  );
};

export default DropdownWrapper;
