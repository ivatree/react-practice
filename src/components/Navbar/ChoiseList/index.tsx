import Button from 'components/Button';
import React, { useEffect, useState } from 'react';

interface ChoiseProps {
  choiseOptions: {
    [key: string]: { title: string; url?: () => void };
  };
  selectedChoiseOption: string;
  onChoiseChange: (choiseOption: string) => void;
}

export function Choise({ choiseOptions, onChoiseChange }: ChoiseProps) {
  const [choiseButton, setChoiseButton] = useState(() => {
    const storedChoiseButton = localStorage.getItem('choiseButton');
    return (
      storedChoiseButton || (window.location.pathname === '/' ? 'Все' : null)
    );
  });

  useEffect(() => {
    localStorage.setItem('choiseButton', choiseButton);
  }, [choiseButton]);

  const handleChoiseClick = (choiseOption: string) => {
    onChoiseChange(choiseOption);
    setChoiseButton(choiseOption);
  };

  return (
    <ul className="choise-container">
      {Object.keys(choiseOptions).map((choiseOption) => (
        <Button
          key={choiseOption}
          className={`${choiseButton === choiseOption ? 'active' : 'choise'}`}
          text={choiseOptions[choiseOption].title}
          onClick={() => {
            handleChoiseClick(choiseOption);
          }}
        ></Button>
      ))}
    </ul>
  );
}
