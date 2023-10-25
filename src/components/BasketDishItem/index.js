import { StyleSheet , View ,Text} from 'react-native';
const BasketDishItem = ({ basketDish }) => {
    return (
        <View style={styles.row}>
            <View style={styles.quantitycontainer}>
                <Text>1</Text>
            </View>
            <Text style={{ fontWeight: "600" }}>{basketDish.name}</Text>
            <Text style={{ marginLeft: "auto" }}>${basketDish.price}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    row: {
        marginVertical: 15,
        flexDirection: "row",
        alignItems: "center"
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
