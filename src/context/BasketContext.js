import { createContext, useContext, useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import '@azure/core-asynciterator-polyfill';
import { Basket, BasketDish } from "../models";
import { useAuthContext } from "./Authcontext";

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
    const { dbUser } = useAuthContext();
    const [restaurant, setRestaurant] = useState(null);
    const [basket, setBasket] = useState(null);
    useEffect(() => {
        DataStore.query(Basket, (b) =>
            b.restaurantID.eq(restaurant.id).userID.eq(dbUser.id)
            ).then((baskets) => setBasket(baskets[0]));
    }, [dbUser, restaurant])
    const AddDishToBasket = async (dish, quantity) => {
        let theBasket = basket || await createNewBasket();
        DataStore.save(new BasketDish({quantity , Dish:dish , basketID:theBasket.id}))
    };
    const createNewBasket = async () => {
        const newBasket = await DataStore.save(
            new Basket({ userID: dbUser.id, restaurantID: restaurant.id })
        );
        setBasket(newBasket);
        return newBasket;
    };
    return (
        <BasketContext.Provider value={{ AddDishToBasket, setRestaurant }}>
            {children}
        </BasketContext.Provider>


    )
}
export default BasketContextProvider;
export const useBasketContext = () => useContext(BasketContext);