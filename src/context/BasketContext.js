import { createContext, useContext, useEffect, useState } from "react";
import { DataStore } from "aws-amplify"
import { Basket, BasketDish } from "../models";
import '@azure/core-asynciterator-polyfill';
import { useAuthContext } from "./Authcontext"

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
    const { dbUser } = useAuthContext();

    const [basketRestaurant, setBasketRestaurant] = useState(null);
    const [basket, setBasket] = useState(null);
    const [basketDishes, setBasketDishes] = useState([]);
    useEffect(() => {
        DataStore.query(Basket, b => b.restaurantID.eq(basketRestaurant.id).userID.eq(dbUser.id)
        ).then(baskets => setBasket(baskets[0]));
    }, [dbUser, basketRestaurant])
    const addDishToBasket = async (dish, quantity) => {

        let theBasket = basket || await createNewBasket();

        DataStore.save(new BasketDish ({quantity ,Dish:dish ,basketID:theBasket.id}))
    };
    const createNewBasket = async () => {
        const newBasket = await DataStore.save(new Basket({ userID: dbUser.id, restaurantID: basketRestaurant.id })
        );
        setBasket(newBasket);
        return newBasket;
    };
    return (
        <BasketContext.Provider value={{ addDishToBasket, setBasketRestaurant }}>
            {children}
        </BasketContext.Provider>
    )
}
export default BasketContextProvider;
export const useBasketContext = () => useContext(BasketContext);