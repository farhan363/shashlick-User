import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import restaurants from '../../../assets/data/restaurants.json'
import { useNavigation, useRoute } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import '@azure/core-asynciterator-polyfill'
import { Dish } from '../../models';
import { useBasketContext } from '../../context/BasketContext';

const DishDetailsScreen = () => {
    const [dish, setDishes] = useState(null);
    const [quantity, setquantity] = useState(1);

    const navigation = useNavigation();

    const route = useRoute();
    const id = route.params.id;
    const { AddDishToBasket } = useBasketContext();

    useEffect(() => {
        if (id) {
            DataStore.query(Dish, id).then(setDishes);
        }
    }, [id])
    const onAddToBasket = async () => {
     await AddDishToBasket(dish , quantity);
     navigation.goBack();
    }
    const onMinus = () => {
        if (quantity > 1) {
            setquantity(quantity - 1)
        }
    };
    const onPlus = () => {
        setquantity(quantity + 1)
    };
    const gettotal = () => {
        return (dish.price * quantity).toFixed(2);
    }
    if (!dish) {
        return <ActivityIndicator size="large" color="red" />
    }
    return (
        <View style={styles.page}>
            <Text style={styles.name}>{dish.name}</Text>
            <Text style={styles.description}>{dish.description}</Text>
            <View style={styles.separator} />
            <View style={styles.row}>
                <AntDesign name='minuscircleo' size={60} color={"black"} onPress={onMinus} />
                <Text style={styles.quantity}>{quantity}</Text>
                <AntDesign name='pluscircleo' size={60} color={"black"} onPress={onPlus} />
            </View>
            <Pressable onPress={onAddToBasket}
                style={styles.button}>
                <Text style={styles.buttontext}>Add {quantity} to basket &#8226;  $ {gettotal()}</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    page: {
        flex: 1,
        width: "100%",
        paddingVertical: 30,
        padding: 10,
    },
    name: {
        fontSize: 30,
        fontWeight: "600",
        marginVertical: 10,
    },
    description: {
        color: "gray"
    },
    separator: {
        height: 1,
        backgroundColor: "lightgrey",
        marginVertical: 10,
    },
    quantity: {
        marginHorizontal: 20,
        fontSize: 25,
    },
    row: {
        marginTop: 50,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center"
    },
    button: {
        backgroundColor: "black",
        marginTop: "auto",
        padding: 20,
        alignItems: "center"
    },
    buttontext: {
        fontWeight: "600",
        fontSize: 18,
        color: 'white'
    }
});
export default DishDetailsScreen;