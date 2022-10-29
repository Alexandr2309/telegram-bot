import React from "react";
import "./LIstFood.css";
import { IOrder, IProduct } from "../../types/foodOrder.interface";
import { CardFood } from "../CardFood/CardFood";

interface IListFoodProps {
  cartItems: IOrder[];
  foods: IProduct[];
  onAdd: (food: IProduct) => void;
  onRemove: (food: IProduct) => void;
}

export const ListFood = React.memo(
  ({ cartItems, foods, onAdd, onRemove }: IListFoodProps): JSX.Element => {
    return (
      <div className="cards__container">
        {foods.length &&
          foods.map((food) => {
            return (
              <CardFood
                cartItems={cartItems}
                food={food}
                key={food.product_id}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            );
          })}
      </div>
    );
  }
);
