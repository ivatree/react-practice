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
  category: string;
  handleSave: (
    id: string,
    image: string,
    title: string,
    description: string,
    price: number,
    category: string
  ) => void;
}

export default function CardChange({
  id,
  image,
  title,
  description,
  price,
  category,
  handleSave,
}: ChangeProps) {
  const [newImage, setNewImage] = useState(image);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newPrice, setNewPrice] = useState(price);
  const [newCategory, setNewCategory] = useState(category);

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
        <Input
          title="Категория"
          type="text"
          value={newCategory.toString()}
          handler={(e) => setNewCategory(e.target.value)}
          text="spicy | veg | meat | mega"
        />
      </div>
      <div className="change-footer">
        <Button
          className="choise"
          onClick={() =>
            handleSave(
              id,
              newImage,
              newTitle,
              newDescription,
              newPrice,
              newCategory
            )
          }
          text="Сохранить"
        />
      </div>
    </div>
  );
}
