import { useEffect, useState } from 'react'
import { StyleSheet, FlatList, View } from 'react-native';
import RestaurantItem from '../../components/RestaurantItem';
import '@azure/core-asynciterator-polyfill'
import { DataStore } from 'aws-amplify';
import { Restaurant } from '../../models';
export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]);

  
  useEffect(() => {
    DataStore.query(Restaurant)
      .then((data) => {
        console.log("Fetched restaurants:", data);
        setRestaurants(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <View style={styles.page}>
      <FlatList data={restaurants}
        renderItem={({ item }) => <RestaurantItem restaurant={item} />} 
        showsVerticalScrollIndicator={false}/>
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
    paddingVertical: 30
  },
  page: {
    padding: 10,
  }
});
