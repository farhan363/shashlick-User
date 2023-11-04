import { StyleSheet, View, Text, Image} from 'react-native';
import styles from './styles'
const RestaurantHeader = ({restaurant}) => {
    return (
        <View style={styles.page}>
            <Image source={{ uri: restaurant.image }} style={styles.image} />
            <View style={styles.container}>
                <Text style={styles.title}>{restaurant.name}</Text>
                <Text style={styles.subtitle}>
                    $ ${restaurant.deliveryFee.toFixed(1)} &#8226;
                    {restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime} </Text>
                    <Text style={styles.menutitle}>Menu</Text>
            </View>
        </View>
    );
};

export default RestaurantHeader;