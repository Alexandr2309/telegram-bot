import "./Menu.css";
import {IOrder, IProduct} from "../../types/foodOrder.interface";
import {ListFood} from "../ListFood/LIstFood";
import {useCallback, useEffect, useState} from "react";
import {Loading} from "../../сomponents/Loading/Loading";
import {setCartsToSessionStorge} from "../../services/sessionStorage";

interface IMenuProps {
  foods: IProduct[];
  cartItems: IOrder[];
  setCartItems: React.Dispatch<React.SetStateAction<IOrder[]>>;
}

export const Menu = ({
                       foods,
                       cartItems,
                       setCartItems,
                     }: IMenuProps): JSX.Element => {
  const [inputValue, setInputValue] = useState("");
  const [foodToSHow, setFoodToSHow] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [choseCategory, setChoseCategory] = useState<string>("all");

  useEffect(() => {
    setFoodToSHow(foods);
    const categoriesFood = Array.from(
      new Set(foods.map((food) => food.category_name))
    );
    setCategories(categoriesFood);
    if (foods.length !== 0) {
      setIsLoading(false);
    }
  }, [foods.length]);

  const onAdd = (food: IProduct) => {
    const exist = cartItems.find((x) => x.product_id === food.product_id);
    if (exist) {
      const updatedCart = cartItems.map((x) =>
        x.product_id === food.product_id
          ? {...exist, count: exist.count + 1}
          : x
      );
      setCartItems(updatedCart);
      setCartsToSessionStorge(updatedCart);
    } else {
      setCartItems([...cartItems, {...food, count: 1}]);
      setCartsToSessionStorge([...cartItems, {...food, count: 1}]);
    }
  };

  const onRemove = (food: IProduct) => {
    const exist = cartItems.find((x) => x.product_id === food.product_id);
    if (exist && exist.count === 1) {
      const updatedCart = cartItems.filter(
        (x) => x.product_id !== food.product_id
      );
      setCartItems(updatedCart);
      setCartsToSessionStorge(updatedCart);
    } else {
      if (exist) {
        const updatedCart = cartItems.map((x) =>
          x.product_id === food.product_id
            ? {...exist, count: exist.count - 1}
            : x
        );
        setCartItems(updatedCart);
        setCartsToSessionStorge(updatedCart);
      }
    }
  }

  const searchFood = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChoseCategory("all");
    if (event.target.value.length) {
      setFoodToSHow(
        foods.filter((food) =>
          food.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    } else {
      setFoodToSHow(foods);
    }

    setInputValue(event.target.value);
  };

  const choseFoodsByCategory = (category: string) => {
    setFoodToSHow(foods.filter((food) => food.category_name === category));
    setChoseCategory(category);
  };

  const choseAllFoods = () => {
    setFoodToSHow(foods);
    setChoseCategory("all");
  };

  return (
    <>
      <form className="menu__wrapper-form">
        <input
          className="menu__wrapper-form__input"
          type="search"
          placeholder="Search food..."
          value={inputValue}
          onChange={searchFood}
        />
      </form>
      <div className="category-button-group">
        {categories.length
          ? categories.map((category) => {
            return (
              <button
                className="button-choose-category"
                style={{
                  color: choseCategory === category ? "orange" : "white",
                  background: choseCategory === category ? "white" : "orange",
                }}
                key={category}
                onClick={() => {
                  choseFoodsByCategory(category);
                }}
              >
                {category}
              </button>
            );
          })
          : null}
        {categories.length ? (
          <button
            style={{
              color: choseCategory === "all" ? "orange" : "white",
              background: choseCategory === "all" ? "white" : "orange",
            }}
            className="button-choose-category"
            onClick={() => {
              choseAllFoods();
            }}
          >
            All foods
          </button>
        ) : null}
      </div>
      {isLoading ? (
        <Loading/>
      ) : foodToSHow.length === 0 && foods.length !== 0 ? (
        <div className="menu__empty-food-to-show">
          <span>Try other search terms</span>
        </div>
      ) : (
        <ListFood
          cartItems={cartItems}
          foods={foodToSHow}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      )}
    </>
  );
};
