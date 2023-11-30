import { StyleSheet , View ,Text} from 'react-native';
const BasketDishItem = ({ basketDish }) => {
    
    console.log(basketDish.Dish);
    return (
        <View style={styles.row}>
            <View style={styles.quantitycontainer}>
                <Text>{basketDish.quantity}</Text>
            </View>
            <Text style={{ fontWeight: "600" }}>{basketDish.Dish._j.name}</Text>
            <Text style={{ marginLeft: "auto" }}>${basketDish.Dish._j.price}</Text>
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
