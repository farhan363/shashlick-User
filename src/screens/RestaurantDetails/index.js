import { StyleSheet, View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DishListItem from '../../components/DishListItem';
import Header from './Header';
import styles from './styles';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Restaurant, Dish } from '../../models'
import { useBasketContext } from '../../context/BasketContext';

const RestaurantDetailsPage = () => {
    const [restaurant, setRestaurant] = useState(null);
    const [dishes, setDishes] = useState([]);

    const route = useRoute();
    const navigation = useNavigation();

    const id = route.params.id;
    const {setBasketRestaurant} = useBasketContext();
    useEffect(() => {
        if (!id) {
            return;
        }
        setBasketRestaurant(null);

        DataStore.query(Restaurant, id).then(setRestaurant);
        DataStore.query(Dish, (dish) => dish.restaurantID.eq(id)).then(setDishes);
    }, [id]);
    useEffect(() => {
        setBasketRestaurant(restaurant);
    }, [restaurant]);

    if (!restaurant) {
        return (<ActivityIndicator size={'large'} color='red' />)
    }
    return (
        <View style={styles.page}>
            <FlatList
                ListHeaderComponent={() => <Header restaurant={restaurant} />}
                data={dishes}
                renderItem={({ item }) => <DishListItem dish={item} />}
                keyExtractor={(item) => item.name}
            />
            <Ionicons onPress={() => navigation.goBack()}
                name='arrow-back-circle'
                size={45}
                color='white'
                style={styles.IconContainer}
            />
        </View>
    );
};

export default RestaurantDetailsPage;