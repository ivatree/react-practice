import Button from 'components/Button';
import { Input } from 'components/Form/Input';
import React, { useState } from 'react';
import './styles.scss';

interface ChangeProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  handleSave: (
    id: string,
    image: string,
    title: string,
    description: string,
    price: number
  ) => void;
}

export default function CardChange({
  id,
  image,
  title,
  description,
  price,
  handleSave,
}: ChangeProps) {
  const [newImage, setNewImage] = useState(image);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newPrice, setNewPrice] = useState(price);

  return (
    <div className="change-container">
      <span className="change-title">Редактирование</span>
      <div className="change-body">
        <Input
          title="Изображение"
          type="text"
          value={newImage}
          handler={(e) => setNewImage(e.target.value)}
          text="Ссылка на изображение"
        />
        <Input
          title="Название"
          type="text"
          value={newTitle}
          handler={(e) => setNewTitle(e.target.value)}
          text="Название"
        />
        <Input
          title="Описание"
          type="text"
          value={newDescription}
          handler={(e) => setNewDescription(e.target.value)}
          text="Описание"
        />
        <Input
          title="Цена"
          type="text"
          value={newPrice.toString()}
          handler={(e) => setNewPrice(Number(e.target.value))}
          text="Цена"
        />
      </div>
      <div className="change-footer">
        <Button
          className="addProduct"
          onClick={() =>
            handleSave(id, newImage, newTitle, newDescription, newPrice)
          }
          text="Сохранить"
        />
      </div>
    </div>
  );
}
