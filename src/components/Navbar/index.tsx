import React, { useState } from 'react';
import './styles.scss';
import Button from '../Button';
import { Menu } from '../SortList';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState('popular');

  const arrow = openMenu ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />;

  const options: { [key: string]: string } = {
    popular: 'популярности',
    cost: 'цене',
    alphabet: 'алфавиту',
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    setOpenMenu(false);
  };

  return (
    <>
      <nav className="settings-container">
        <div className="choise-container">
          <Button
            className="choise"
            onClick={() => console.log()}
            text={'Все'}
          />
          <Button
            className="choise"
            onClick={() => console.log()}
            text={'Мясные'}
          />
          <Button
            className="choise"
            onClick={() => console.log()}
            text={'Вегетарианские'}
          />
          <Button
            className="choise"
            onClick={() => console.log()}
            text={'Гриль'}
          />
          <Button
            className="choise"
            onClick={() => console.log()}
            text={'Острые'}
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
                  {options[selectedOption]}
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
