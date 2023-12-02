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
    const totalPrice = basketDishes.reduce((sum, basketDish) => {
        if (
            basketDish &&
            basketDish.Dish &&
            basketDish.Dish._j &&
            typeof basketDish.Dish._j.price === 'number' &&
            basketDish.Dish._j.price > 0 &&
            typeof basketDish.quantity === 'number' &&
            basketDish.quantity > 0
        ) {
            
            const itemPrice = basketDish.quantity * basketDish.Dish._j.price;
            
            return sum + itemPrice;
        } else {
            return sum;
        }
    }, basketRestaurant?.deliveryFee || 0);
    
    const [currentRestaurantBasket, setCurrentRestaurantBasket] = useState(null);

    // Function to add items to the current restaurant's basket
    const addToBasket = (item) => {
        if (!currentRestaurantBasket) {
            // If no basket exists for the current restaurant, create a new basket
            const newBasket = {
                restaurantID: restaurant.id, // Assuming restaurant.id is the restaurant's ID
                items: [item],
            };
            setCurrentRestaurantBasket(newBasket);
        } else {
            // If a basket exists for the current restaurant, add items to it
            const updatedBasket = {
                ...currentRestaurantBasket,
                items: [...currentRestaurantBasket.items, item],
            };
            setCurrentRestaurantBasket(updatedBasket);
        }
    };
    
    // Function to submit the basket to the database or perform further actions
    const submitBasket = () => {
        // Here, you can submit the currentRestaurantBasket to the database or perform other actions
        // Reset the currentRestaurantBasket state once submitted
        setCurrentRestaurantBasket(null);
    };
    
        
    
    

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
        <BasketContext.Provider value={{ addDishToBasket, setBasketRestaurant, basketRestaurant ,basket, basketDishes , totalPrice}}>
            {children}
        </BasketContext.Provider>
    )
}
export default BasketContextProvider;
export const useBasketContext = () => useContext(BasketContext);