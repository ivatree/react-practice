import Button from 'components/Button';
import { Input } from 'components/Form/Input';
import React, { useState } from 'react';

interface AddingProps {
  handleClick: (
    image: string,
    title: string,
    description: string,
    price: number
  ) => void;
}

export default function AddProduct({ handleClick }: AddingProps) {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  return (
    <div className="change-container">
      <span className="change-title">Добавление</span>
      <div className="change-body">
        <Input
          title="Изображение"
          type="text"
          value={image}
          handler={(e) => setImage(e.target.value)}
          text="Ссылка на изображение"
        />
        <Input
          title="Название"
          type="text"
          value={title}
          handler={(e) => setTitle(e.target.value)}
          text="Название"
        />
        <Input
          title="Описание"
          type="text"
          value={description}
          handler={(e) => setDescription(e.target.value)}
          text="Описание"
        />
        <Input
          title="Цена"
          type="text"
          value={price.toString()}
          handler={(e) => setPrice(e.target.value)}
          text="Цена"
        />
      </div>
      <div className="change-footer">
        <Button
          className="addProduct"
          onClick={() => handleClick(image, title, description, Number(price))}
          text="Сохранить"
        />
      </div>
    </div>
  );
}
