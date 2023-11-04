import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const RestaurantItem = ({ restaurant }) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('Restaurant',{id:restaurant.id});
  }
  return (
    <Pressable onPress={onPress} style={styles.restaurantcontainer}>

      <Image source={{ uri: restaurant.image, }}
        style={styles.Image} />
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Text style={styles.subtitle}>
            $ ${restaurant.deliveryFee.toFixed(1)} &#8226;
            {restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime} </Text>
        </View>
        <View style={styles.rating}>
          <Text>{restaurant.rating.toFixed(1)}</Text>
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  restaurantcontainer: {
    width: '100%',
    marginVertical: 10,
  },
  Image: {
    width: "100%",
    aspectRatio: 5 / 3,
    marginBottom: 5
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5
  },
  subtitle: {
    color: 'grey'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rating: {
    marginLeft: 'auto',
    backgroundColor: 'lightgray',
    borderRadius: 20,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: 'center'
  }
});

export default RestaurantItem;