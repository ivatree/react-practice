import React from 'react';
import './styles.scss';

interface MenuProps {
  options: {
    [key: string]: { title: string };
  };
  selectedOption: string;
  onOptionChange: (option: string) => void;
}

export function Menu({ options, onOptionChange }: MenuProps) {
  const handleOptionClick = (option: string) => {
    onOptionChange(option);
  };

  return (
    <div className="menu">
      <ul className="menu-list">
        {Object.keys(options).map((option) => (
          <li
            key={option}
            className="menu-item"
            onClick={() => {
              handleOptionClick(option);
            }}
          >
            {options[option].title}
          </li>
        ))}
      </ul>
    </div>
  );
}
