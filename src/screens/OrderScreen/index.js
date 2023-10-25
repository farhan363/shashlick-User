import { View, Text , FlatList} from 'react-native'
import OrderListItem from '../../components/OrderListItem';
import Orders from '../../../assets/data/orders.json'
const OrderScreen = () => {
    return (
        <View style={{flex:1,width:"100%",}}>
            <FlatList data={Orders} renderItem={({item}) => <OrderListItem order={item}/>}/>
        </View>
    );
};
export default OrderScreen;