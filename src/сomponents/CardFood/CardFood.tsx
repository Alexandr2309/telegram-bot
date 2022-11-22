import {memo, useState} from "react";
import "./CardFood.css";
import {IOrder, IProduct} from "../../types/foodOrder.interface";
import arrowRight from "../../images/arrow-right.svg";
import {url} from "../../services/getProducts";

interface ICardFoodProps {
  food: IProduct;
  cartItems: IOrder[];
  onAdd: (food: IProduct) => void;
  onRemove: (food: IProduct) => void;
}

export const CardFood = ({
                           cartItems,
                           food,
                           onAdd,
                           onRemove,
                         }: ICardFoodProps) => {
  const quantityFoodById = cartItems.find(
    (cartFood) => cartFood.product_id === food.product_id
  )?.count;
  const quantity = quantityFoodById ? quantityFoodById : 0;
  const [count, setCount] = useState(quantity);
  const {name, media, price, descr} = food;


  const srcImage = `${url}/${media}`;

  const handleIncrement = () => {
    setCount(count + 1);
    onAdd(food);
  };
  const handleDecrement = () => {
    setCount(count - 1);
    onRemove(food);
  };


  return (
    <div className="card">
      <span
        className={`${count !== 0 ? "card__badge" : "card__badge--hidden"}`}
      >
        {count}
      </span>
      <div className="image__container">
        <img src={srcImage} alt={name}/>
      </div>
      <div className="card-text">
        <span className="card__title">{name}</span>
        <span className="card__price">{price} AED</span>
        {count === 0 ? (
          <button className="btn-container" onClick={handleIncrement}>
            Add to Cart{" "}
            <img className="btn-container__image" src={arrowRight}/>
          </button>
        ) : (
          <div className="btn-container">
            <button className="btn-minus" onClick={handleDecrement}>
              -
            </button>
            <button className="btn-plus" onClick={handleIncrement}>
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
