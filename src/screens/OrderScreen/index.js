import { View, Text , FlatList} from 'react-native'
import OrderListItem from '../../components/OrderListItem';
import { useOrderContext } from '../../context/OrderContext';
const OrderScreen = () => {
    const {Orders} = useOrderContext();
    return (
        <View style={{flex:1,width:"100%",}}>
            <FlatList data={Orders} renderItem={({item}) => <OrderListItem order={item}/>}/>
        </View>
    );
};
export default OrderScreen;