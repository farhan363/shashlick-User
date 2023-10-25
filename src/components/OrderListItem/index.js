import { View, Text , Image ,Pressable} from 'react-native'
import { useNavigation } from '@react-navigation/native';

const OrderListItem = ({order}) => {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.navigate("Order" ,{id: order.id})} style={{flexDirection:'row',margin:10,alignItems:"center"}}>
           <Image source={{uri : order.Restaurant.image}} style={{width:75,marginRight:5,height:100}}/>
           <View>
            <Text style={{fontSize:16,fontWeight:'700'}}>{order.Restaurant.name}</Text>
            <Text style={{marginVertical:5,}}>3 item &#8226; $38.45</Text>
            <Text>2 days ago &#8226; {order.status}</Text>
           </View>
        </Pressable >
    );
};
export default OrderListItem;