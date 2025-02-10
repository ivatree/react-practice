import Button from 'components/Button';
import React from 'react';

interface ChoiseProps {
  choiseOptions: {
    [key: string]: { title: string };
  };
  onChoiseChange: (choiseOption: string) => void;
}

export function Choise({ choiseOptions, onChoiseChange }: ChoiseProps) {
  const handleChoiseClick = (choiseOption: string) => {
    onChoiseChange(choiseOption);
  };

  return (
    <ul className="choise-container">
      {Object.keys(choiseOptions).map((choiseOption) => (
        <Button
          key={choiseOption}
          className="choise"
          text={choiseOptions[choiseOption].title}
          onClick={() => {
            handleChoiseClick(choiseOption);
          }}
        ></Button>
      ))}
    </ul>
  );
}
