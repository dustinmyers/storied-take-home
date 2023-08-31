'use client'

import React, { useState, useRef, ChangeEvent } from 'react';
import useOutsideClick from '@/app/_hooks/useOutsideClick';
import { useFocusedIndex, useToggle } from '@/app/_hooks/useDropdown';

export interface Option {
  value: string;
  label: string;
}

interface DropdownSelectProps {
  label: string;
  options: Option[];
  onChange: (value: Option) => void;
  isSearchable?: boolean;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  label,
  options,
  onChange,
  isSearchable,
}) => {
  const [isOpen, toggleDropdown] = useToggle(false);
  const { focusedIndex, setFocusedIndex, handleMouseEnter, handleMouseLeave } = useFocusedIndex();
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDropdownAndResetFocus = () => {
    toggleDropdown();
    setFocusedIndex(null);
  };
  
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(dropdownRef, () => {
    toggleDropdown();
    setFocusedIndex(null);
  });

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onChange(option);
    toggleDropdownAndResetFocus();
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (isOpen) {
      const totalOptions = filteredOptions.length;
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex((prevIndex) =>
            prevIndex === null ? 0 : (prevIndex + 1) % totalOptions
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex((prevIndex) =>
            prevIndex === null ? totalOptions - 1 : (prevIndex - 1 + totalOptions) % totalOptions
          );
          break;
        case 'Enter':
          if (focusedIndex !== null) {
            handleOptionClick(filteredOptions[focusedIndex]);
            toggleDropdownAndResetFocus();
          }
          break;
        default:
          break;
      }
    }
  };

  const handleOptionKeyDown = (
    event: React.KeyboardEvent<HTMLLIElement>,
    index: number
  ) => {
    const totalOptions = filteredOptions.length;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex((prevIndex) =>
          prevIndex === null ? 0 : (prevIndex + 1) % totalOptions
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex((prevIndex) =>
          prevIndex === null ? totalOptions - 1 : (prevIndex - 1 + totalOptions) % totalOptions
        );
        break;
      case 'Enter':
        handleOptionClick(filteredOptions[index]);
        break;
      default:
        break;
    }
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab') {
      toggleDropdownAndResetFocus();
    }
  };

  return (
    <div 
      ref={dropdownRef} 
      className="relative"
      onKeyDown={handleTabKeyDown}
    >
      <button
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className="w-48 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
      >
        {selectedOption ? selectedOption.label : label}
      </button>
      {isOpen && (
        <div className="absolute mt-2 py-2 border border-gray-300 rounded-lg shadow-lg w-48">
          {isSearchable && (
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border-b border-gray-300 bg-transparent focus:outline-none focus:ring focus:border-blue-300"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          )}
          <ul>
            {filteredOptions.map((option, index) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option)}
                onKeyDown={(event) => handleOptionKeyDown(event, index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                tabIndex={0}
                className={`cursor-pointer hover:bg-blue-700 p-2 ${
                  focusedIndex === index ? 'bg-blue-700' : ''
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
