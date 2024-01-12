import { createContext, useContext, useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Order, OrderDish, Basket } from "../models";
import { useAuthContext } from "./Authcontext";
import { useBasketContext } from "./BasketContext";
import '@azure/core-asynciterator-polyfill';

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();
  const { basketRestaurant, totalPrice, basketDishes, basket } = useBasketContext();

  const { orders, setOrders } = useState([]);

  useEffect(() => {
    DataStore.query(Order, (o) => o.userID.eq(dbUser.id)).then(setOrders);
  }, [dbUser]);

  const createOrder = async () => {
    const newOrder = await DataStore.save(new Order({
      userID: dbUser.id,
      Restaurant: basketRestaurant,
      Status: "NEW",
      Total: totalPrice,
    }));
    await Promise.all(
      basketDishes.map((basketDish) =>{
       return DataStore.save(
          new OrderDish({
            quantity: basketDish.quantity,
            orderID: newOrder.id,
            Dish: basketDish.Dish,
          })
        )
        })
    );
    await DataStore.delete(basket);
    setOrders([...orders, newOrder])
  };

  return (
    <OrderContext.Provider value={{ createOrder , orders}}>
      {children}
    </OrderContext.Provider>
  );
};
export default OrderContextProvider;
export const useOrderContext = () => useContext(OrderContext);