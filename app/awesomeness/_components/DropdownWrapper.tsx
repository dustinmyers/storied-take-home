'use client'

import React from 'react';
import DropdownSelect, { Option } from './DropdownSelect';

const options = [
  { value: 'red', label: 'Red' },
  { value: 'green', label: 'Green' },
  { value: 'blue', label: 'Blue' },
];

const DropdownWrapper: React.FC = () => {
  const handleChange = (value: Option) => {
    console.log('Selected:', value);
  };

  return (
    <div className="flex items-center justify-center">
      <DropdownSelect
        label="Select a color"
        options={options}
        onChange={handleChange}
        isSearchable
      />
    </div>
  );
};

export default DropdownWrapper;
