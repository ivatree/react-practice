import React from 'react';
import './styles.scss';

interface MenuProps {
  options: {
    [key: string]: { title: string };
  };
  selectedOption: string;
  onOptionChange: (option: string) => void;
  toggleSortOrder: () => void;
}

export function Menu({ options, onOptionChange, toggleSortOrder }: MenuProps) {
  return (
    <div className="menu">
      <ul className="menu-list">
        {Object.keys(options).map((option) => (
          <li
            key={option}
            className="menu-item"
            onClick={() => {
              onOptionChange(option);
              toggleSortOrder();
            }}
          >
            {options[option].title}
          </li>
        ))}
      </ul>
    </div>
  );
}
