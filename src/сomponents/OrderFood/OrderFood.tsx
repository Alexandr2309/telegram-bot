import "./OrderFood.css";
import { IOrder } from "../../types/foodOrder.interface";
import { url } from "../../services/getProducts";
import { convertSATSToAED } from "../../shared/lib/convert";

interface IOrderFoodProps {
  cartItems: IOrder[];
  setIsOrderFood: React.Dispatch<React.SetStateAction<boolean>>;
  comments: string;
  setComments: React.Dispatch<React.SetStateAction<string>>;
}

export const OrderFood = ( {
                             cartItems,
                             setIsOrderFood,
                             comments,
                             setComments,
                           }: IOrderFoodProps ): JSX.Element => {
  return (
    <div className="your-order__wrapper">
      <div className="your-order__container">
        <div className="your-order__title">
          <div>YOUR ORDER</div>
          <button
            className="your-order__button"
            onClick={() => {
              setIsOrderFood(false);
            }}
          >
            Edit
          </button>
        </div>

        <div className="your-order__cart-items">
          {cartItems.map(( item ) => {
            const srcImage = `${url}/${item.media}`;
            return (
              <div key={item.product_id} className="your-order__cart-item">
                <img className="your-order__cart-item__image" src={srcImage}/>
                <div className="your-order__cart-item__info">
                  <div className="your-order__cart-item__info-name">
                    {item.name}{" "}
                    <span className="your-order__cart-item__info-name-quantity">
                      x{item.count}
                    </span>
                  </div>
                  <div className="your-order__cart-item__info-description">
                    {item.descr}
                  </div>
                </div>
                <div className="your-order__cart-item__price">
                  {convertSATSToAED(item.price) * item.count} AED
                </div>
              </div>
            );
          })}
        </div>

        <textarea
          className="your-order__textarea"
          placeholder="Add comment..."
          value={comments}
          onChange={( event: React.ChangeEvent<HTMLTextAreaElement> ) => {
            setComments(event.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
};
