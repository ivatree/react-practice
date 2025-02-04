import React, { useState } from 'react';
import './styles.scss';
import Button from '../Button';
import { Menu } from './SortList';

import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { Choise } from './ChoiseList';

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState('popular');
  const [selectedChoiseOption, setSelectedChoiseOption] = useState('all');
  const navigate = useNavigate();
  const arrow = openMenu ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />;

  const options = {
    popular: {
      title: 'популярности',
      url: () => navigate('/'),
    },
    cost: {
      title: 'цене',
      url: () => navigate('/Price'),
    },
    alphabet: {
      title: 'алфавиту',
      url: () => navigate('/Name'),
    },
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
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
            onClick={() => setOpenMenu((prev: boolean) => !prev)}
            text={
              <>
                {arrow} Сортировка по:{' '}
                <span className="selected-option">
                  {options[selectedOption].title}
                </span>
              </>
            }
          ></Button>
        </div>
      </nav>
      {openMenu && (
        <Menu
          selectedOption={selectedOption}
          options={options}
          onOptionChange={handleOptionChange}
        />
      )}
    </>
  );
}
