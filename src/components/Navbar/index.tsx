import React, { useState } from 'react';
import './styles.scss';
import Button from 'components/Button';
import { Menu } from 'components/Navbar/SortList';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { Choise } from 'components/Navbar/ChoiseList';

interface NavbarProps {
  setSorting: (option: string) => void;
  setScrollToCategory: (category: string) => void;
  setIsAscending: (isAscending: boolean) => void;
  isAscending: boolean;
  setCatName: (choiceOptions: string) => void;
}

export default function Navbar({
  setSorting,
  setScrollToCategory,
  setIsAscending,
  isAscending,
  setCatName,
}: NavbarProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState('popular');
  const arrow = openMenu ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />;
  const [choiseButton] = useState('all');
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
    mega: { title: 'Сытные' },
    meat: { title: 'Мясные' },
    spicy: { title: 'Острые' },
    veg: { title: 'Вегетарианские' },
  };

  const handleChoiseChange = (choiseOption: string) => {
    setScrollToCategory(choiseOption);
    setCatName(choiceOptions[choiseOption].title);
  };

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };

  return (
    <>
      <nav className="settings-container">
        <div className="choise-container">
          <Choise
            choiseOptions={choiceOptions}
            onChoiseChange={handleChoiseChange}
            choiseButton={choiseButton}
          />
        </div>
        <div className="sort-settings">
          <Button
            className="openSort"
            onClick={() => setOpenMenu((prev) => !prev)}
            text={
              <>
                <span className="selected-arrow">{arrow}</span>
                <span className="selected-text">
                  Сортировка по:&nbsp;
                  <span className="selected-option">
                    {options[selectedOption].title}
                  </span>
                </span>
              </>
            }
          />
          {openMenu && (
            <Menu
              selectedOption={selectedOption}
              options={options}
              onOptionChange={handleOptionChange}
              toggleSortOrder={toggleSortOrder}
            />
          )}
        </div>
      </nav>
    </>
  );
}
