import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from 'store';
import { getBasket, clearBasket, deleteItem } from 'utils/firebase';
import { AiOutlineClose } from 'react-icons/ai';
import Card from 'components/Card/ProductCard';
import Button from 'components/Button';
import {
  addProductToBasket,
  removeProductFromBasket,
} from 'store/slices/productSlice';
import './styles.scss';

interface BasketItem {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

interface BasketProps {
  isOpen: boolean;
  closeBasket: () => void;
  initialItems: BasketItem[];
}

export function Basket({
  isOpen,
  closeBasket,
  initialItems = [],
}: BasketProps) {
  const dispatch = useDispatch();
  const productCards = useSelector((state: RootState) => state.productCards);
  const [basketItems, setBasketItems] = useState(initialItems);

  useEffect(() => {
    if (isOpen) {
      const fetchBasket = async () => {
        const fetchItems = await getBasket();
        if (fetchItems) {
          setBasketItems(fetchItems);
          fetchItems.forEach((item) => dispatch(addProductToBasket(item)));
        } else {
          setBasketItems([]);
        }
        console.log(store.getState());
      };
      fetchBasket();
    }
  }, [isOpen, dispatch]);

  const deleteProduct = async (itemToDelete) => {
    await deleteItem(itemToDelete);
    setBasketItems((prevItems) =>
      prevItems.filter((item) => item !== itemToDelete)
    );
    dispatch(removeProductFromBasket({ id: itemToDelete.id }));
  };

  const clearBasketPage = async () => {
    setBasketItems([]);
    await clearBasket();
    productCards.forEach((item) =>
      dispatch(removeProductFromBasket({ id: item.id }))
    );
  };

  const finishBuy = async () => {
    if (basketItems.length) {
      alert('Ваш заказ одобрен!');
      setBasketItems([]);
      await clearBasket();
      productCards.forEach((item) =>
        dispatch(removeProductFromBasket({ id: item.id }))
      );
      closeBasket();
    } else {
      alert('В вашей корзине ничего нет :с');
    }
  };

  const getTotalPrice = () => {
    const total = basketItems.reduce((total, item) => total + item.price, 0);
    return total.toFixed(2);
  };

  return (
    <div>
      <div className="basket-container">
        <div className="basket-head">
          <h2 className="basket-title">Корзина</h2>
        </div>
        <div className="basket-body">
          {basketItems.length > 0 ? (
            basketItems.map((item, index) => (
              <div key={index} className="basket-item">
                <Card
                  key={index}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  onClick={() => console.log('')}
                >
                  <div className="delete-item">
                    <Button
                      className="deleteItem"
                      onClick={() => deleteProduct(item)}
                      text={<AiOutlineClose />}
                    />
                  </div>
                </Card>
              </div>
            ))
          ) : (
            <h3 className="basket-message">Корзина пустая</h3>
          )}
        </div>
        <div className="btn-container">
          <Button
            className="regBtn"
            onClick={finishBuy}
            text={`Заказать: ${getTotalPrice()} руб.`}
          />
          <Button
            className="addProduct"
            onClick={clearBasketPage}
            text="Очистить"
          />
        </div>
      </div>
    </div>
  );
}
