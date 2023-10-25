import { StyleSheet, Text, View, Image,Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const DishListItem = ({ dish }) => {
    const navigation =useNavigation();
    return (
        <Pressable onPress={() => navigation.navigate("Dish" , {id: dish.id})} 
        style={styles.container}>
            <View style={{flex:1}}>
            <Text style={styles.name}>{dish.name}</Text>
            <Text style={styles.description}>{dish.description}</Text>
            <Text style={styles.price}>$ {dish.price}</Text>
            </View>
           { dish.image && <Image source={{uri : dish.image}} style={styles.image}/>}
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal:20,
        paddingVertical: 10,
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
        flexDirection:"row",
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: 0.5,
    },
    description: {
        color: "gray",
        marginVertical: 5,
    },
    price: {
        fontSize: 16,
    },
    image:{
        height:75,
        aspectRatio:1,
    },
});
export default DishListItem;