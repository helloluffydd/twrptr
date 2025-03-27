'use client';

import React, { useState, useRef } from 'react';
import { Option } from '@/data/options';
import useDropdown from '@/hooks/useDropdown';
import useDynamicVisibleItems from '@/hooks/useDynamicVisibleItems';
import './style.css';

interface MultiSelectProps {
  options: Option[];
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useDropdown(dropdownRef);
  const selectedItemsRef = useRef<HTMLDivElement>(null);
  const { dynamicVisibleItems } = useDynamicVisibleItems(selectedItemsRef);

  const handleOptionClick = (value: string) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item) => item !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };

  const renderSelectedItems = () => {
    if (selected.length === 0) {
      return <span className="placeholder">請選擇選項...</span>;
    }

    const visibleItems = selected.slice(0, dynamicVisibleItems);
    const hiddenCount = selected.length - visibleItems.length;

    return (
      <>
        {visibleItems.map((value) => {
          const option = options.find((opt) => opt.value === value);
          return (
            <div key={value} className="selected-item">
              <span>{option?.label}</span>
              <button
                className="remove-btn"
                onClick={() => handleOptionClick(value)}
              >
                ✕
              </button>
            </div>
          );
        })}
        {hiddenCount > 0 && (
          <div className="selected-item more-count">+{hiddenCount}...</div>
        )}
      </>
    );
  };

  return (
    <div className="multi-select-container" ref={dropdownRef}>
      <div className="multi-select-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="selected-items" ref={selectedItemsRef}>
          {renderSelectedItems()}
        </div>
        <div className="dropdown-arrow">{isOpen ? '∧' : '∨'}</div>
      </div>

      {isOpen && (
        <div className="dropdown-container">
          <div className="options-container">
            {options.length > 0 &&
              options.map((option) => (
                <div
                  key={option.value}
                  className={`option ${
                    selected.includes(option.value) ? 'selected' : ''
                  }`}
                  onClick={() => handleOptionClick(option.value)}
                >
                  <div className="option-label">
                    {option.label}
                  </div>
                  <div className="option-checkbox">
                    {selected.includes(option.value) && <span>✓</span>}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
