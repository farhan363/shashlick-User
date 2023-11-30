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
            if (dbUser && basketRestaurant) {
                DataStore.query(Basket)
                    .then(baskets => {
                        const filteredBaskets = baskets.filter(basket =>
                            basket.restaurantID === basketRestaurant.id &&
                            basket.userID === dbUser.id
                        );
                        if (filteredBaskets.length > 0) {
                            setBasket(filteredBaskets[0]);
                        } else {
                            setBasket(null);
                        }
                    })
            }
        }, [dbUser, basketRestaurant]);
        
    
    

    useEffect(() => {
        if (basket) {
            DataStore.query(BasketDish, bd => bd.basketID.eq(basket.id)).then(
                setBasketDishes
            );
        }
    }, [basket]);
    const addDishToBasket = async (dish, quantity) => {

        let theBasket = basket || await createNewBasket();

        const newDish = await DataStore.save(
            new BasketDish({ quantity, Dish: dish, basketID: theBasket.id })
        );
        setBasketDishes([...basketDishes, newDish])
    };
    const createNewBasket = async () => {
        const newBasket = await DataStore.save(new Basket({ userID: dbUser.id, restaurantID: basketRestaurant.id })
        );
        setBasket(newBasket);
        return newBasket;
    };
    return (
        <BasketContext.Provider value={{ addDishToBasket, setBasketRestaurant, basketRestaurant ,basket, basketDishes }}>
            {children}
        </BasketContext.Provider>
    )
}
export default BasketContextProvider;
export const useBasketContext = () => useContext(BasketContext);