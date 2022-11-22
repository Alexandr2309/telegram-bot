import {useEffect, useState} from "react";
import "./App.css";
import {OrderFood} from "./сomponents/OrderFood/OrderFood";
import {Menu} from "./сomponents/Menu/Menu";
import {getProducts} from "./services/getProducts";
import {
  getCartsFromSessionStorge,
  getProductsFromSessionStorge,
  setProductsToSessionStorge,
} from "./services/sessionStorage";
import {currencySatoshiFromAED} from "./services/getCurrency";
import PayMethodToggle, {PayMethod} from "./сomponents/PayMethodToggler/PayMethodToggle";
import {OpenStreetMapComponent} from "./сomponents/OpenStreetMap/OpenStreetMapComponent";

const tele = window.Telegram.WebApp;

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [comments, setComments] = useState("");
  const [isOrderFood, setIsOrderFood] = useState(false);
  const [foods, setFoods] = useState([]);
  const [addressLatLon, setAddressLatLon] = useState({lat: null, lng: null});
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [payMethod, setPayMethod] = useState({currency: PayMethod.SATS, satoshi: 0})
  
  useEffect(() => {
    if (getProductsFromSessionStorge()) {
      setFoods(getProductsFromSessionStorge());
      currencySatoshiFromAED().then(course => {
        setPayMethod({...payMethod, satoshi: course.satoshi})
      })
    } else {
      Promise.all([getProducts(), currencySatoshiFromAED()])
        .then((response) => {
          const foods = response[0]
            .map((category) => {
              return category.products.map((product) => {
                return {...product, category_name: category.category_name};
              });
            })
            .flat();
          const satoshiCourse = response[1].satoshi;
          setPayMethod({...payMethod, satoshi: satoshiCourse})
          // console.log(satoshi)
          // const changedPriceSatsFoods = foods.map((food) => {
          //   return { ...food, price: food.price / satoshi };
          // });
          setFoods(foods);
          setProductsToSessionStorge(foods);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (getCartsFromSessionStorge()) {
      setCartItems(getCartsFromSessionStorge());
    }
  }, []);
  
  useEffect(() => {
    tele.ready();
  });
  
  useEffect(() => {
    if (isOrderFood) {
      const totalPrice = cartItems.reduce((acc, object) => {
        acc = acc + object.price * object.count;
        return acc;
      }, 0);
      tele.MainButton.text = payMethod?.currency === PayMethod?.AED
        ? `Pay ${Math.ceil(totalPrice)} AED`
        : `Pay ${Math.ceil(totalPrice / payMethod.satoshi)} SATS`
      tele.MainButton.show();
      tele.MainButton.onClick(onClickMainButton);
    }
    
    if (!isOrderFood && cartItems.length) {
      tele.MainButton.text = "VIEW ORDER";
      tele.MainButton.show();
      tele.MainButton.onClick(onClickMainButton);
    }
    
    return () => {
      tele.MainButton.offClick(onClickMainButton);
    };
  }, [cartItems, isOrderFood, comments, addressLatLon, payMethod.currency]);
  
  function onClickMainButton() {
    
    if (!isOrderFood) {
      setIsOrderFood(true);
    }
    if (isOrderFood) {
      const order = cartItems.map((item) => {
        return {product_id: item.product_id, count: item.count};
      });
      
      const totalPrice = cartItems.reduce((acc, object) => {
        acc = acc + object.price * object.count;
        return acc;
      }, 0);
      
      const responseForBot = {
        sum: payMethod?.currency === PayMethod?.AED
          ? Math.ceil(totalPrice)
          : Math.ceil(totalPrice / payMethod.satoshi),
        currency: payMethod?.currency,
        order: order,
        comments: comments,
        coord: {lat: addressLatLon.lat, lng: addressLatLon.lng},
      };
      
      tele.sendData(JSON.stringify(responseForBot));
    }
  }
  
  return (
    <>
      {isOrderFood ? (
        <>
          <OrderFood
            comments={comments}
            setComments={setComments}
            cartItems={cartItems}
            setIsOrderFood={setIsOrderFood}
            payMethod={payMethod}
          />
          <PayMethodToggle
            onClickHandler={setPayMethod}
            currentValue={payMethod}
          />
          <div className="openmap-container">
            <button
              className="openmap-container-button"
              onClick={() => {
                setIsOpenMap(!isOpenMap);
              }}
            >
              {isOpenMap ? "Hide map" : "Show map"}
            </button>
            {isOpenMap ? (
              <OpenStreetMapComponent
                addressLatLon={addressLatLon}
                setAddressLatLon={setAddressLatLon}
              />
            ) : null}
          </div>
        </>
      ) : (
        <>
          <Menu
            foods={foods}
            setFoods={setFoods}
            cartItems={cartItems}
            setCartItems={setCartItems}
            satoshiCourse={payMethod.satoshi || 1}
          />
        </>
      )}
    </>
  );
}

export default App;
