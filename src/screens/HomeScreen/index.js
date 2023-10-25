import { StyleSheet, FlatList ,View} from 'react-native';
import restaurants from '../../../assets/data/restaurants.json'
import RestaurantItem from '../../components/RestaurantItem';
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.page}>
      <FlatList data={restaurants} 
      renderItem={({item})=> <RestaurantItem restaurant = {item}/>}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingVertical:30
  },
  page:{
    padding:10,
  }
});
