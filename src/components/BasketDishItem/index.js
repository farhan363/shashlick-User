import { StyleSheet, View, Text } from 'react-native';
const BasketDishItem = ({ basketDish }) => {
    console.log('Basket Dish:', basketDish);
    return (
        <View style={styles.row}>
            <View style={styles.quantitycontainer}>
                <Text>{basketDish.quantity}</Text>
            </View>
            <Text style={{ fontWeight: "600" }}>
                {basketDish && basketDish.Dish && basketDish.Dish.name
                    ? basketDish.Dish.name
                    : 'Name Unavailable'
                }
            </Text>

            <Text style={{ marginLeft: "auto" }}>
                {basketDish && basketDish.Dish && typeof basketDish.Dish.price === 'number'
                    ? `$${basketDish.Dish.price}`
                    : 'Price Unavailable'
                }

            </Text>

        </View>
    );
};
const styles = StyleSheet.create({
    row: {
        marginVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    quantitycontainer: {
        backgroundColor: "lightgray",
        paddingHorizontal: 5,
        marginRight: 10,
        paddingVertical: 2,
        borderRadius: 3,
    }
});
export default BasketDishItem;
