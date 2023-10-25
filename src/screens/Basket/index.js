import { useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import restaurants from '../../../assets/data/restaurants.json'
import BasketDishItem from '../../components/BasketDishItem';
const restaurant = restaurants[0];
const Basket = () => {
    return (
        <View style={styles.page}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>Your Items</Text>
            <FlatList
                data={restaurant.dishes}
                renderItem={({ item }) => <BasketDishItem basketDish={item} />} />
            <View style={styles.separator} />
            <View style={styles.button}>
                <Text style={styles.buttontext}>Create Order</Text></View>
        </View>
    );
};
const styles = StyleSheet.create({
    page: {
        flex: 1,
        width: "100%",
        paddingVertical: 30,
        padding: 10,
    },
    name: {
        fontSize: 24,
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
        marginVertical: 15,
        flexDirection: "row",
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
    },
    quantitycontainer: {
        backgroundColor: "lightgray",
        paddingHorizontal: 5,
        marginRight: 10,
        paddingVertical: 2,
        borderRadius: 3,
    }
});
export default Basket;