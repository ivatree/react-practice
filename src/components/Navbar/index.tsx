import React, { useState } from 'react';
import './styles.scss';
import Button from 'components/Button';
import { Menu } from 'components/Navbar/SortList';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { Choise } from 'components/Navbar/ChoiseList';

interface NavbarProps {
  setSorting: (option: string) => void;
}

export default function Navbar({ setSorting }: NavbarProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState('popular');
  const [selectedChoiseOption, setSelectedChoiseOption] = useState('all');
  const arrow = openMenu ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />;

  const options = {
    popular: {
      title: 'популярности',
      sortKey: 'popular',
    },
    price: {
      title: 'цене',
      sortKey: 'price',
    },
    title: {
      title: 'алфавиту',
      sortKey: 'title',
    },
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    setSorting(option);
    setOpenMenu(false);
  };

  const choiceOptions = {
    all: { title: 'Все' },
    meat: { title: 'Мясные' },
    vegetarian: { title: 'Вегетарианские' },
    grill: { title: 'Гриль' },
    spisy: { title: 'Острые' },
  };

  const handleChoiseChange = (choiseOption: string) => {
    setSelectedChoiseOption(choiseOption);
  };

  return (
    <>
      <nav className="settings-container">
        <div className="choise-container">
          <Choise
            selectedChoiseOption={selectedChoiseOption}
            choiseOptions={choiceOptions}
            onChoiseChange={handleChoiseChange}
          />
        </div>
        <div className="sort-settings">
          <Button
            className="openSort"
            onClick={() => setOpenMenu((prev) => !prev)}
            text={
              <>
                <span className="selected-arrow">{arrow}</span>
                <span className="selected-text">Сортировка по:</span>
                <span className="selected-option">
                  {options[selectedOption].title}
                </span>
              </>
            }
          />
          {openMenu && (
            <Menu
              selectedOption={selectedOption}
              options={options}
              onOptionChange={handleOptionChange}
            />
          )}
        </div>
      </nav>
    </>
  );
}
