import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from '../screens/HomeScreen';
import RestaurantDetailsPage from '../screens/RestaurantDetails';
import DishDetailsScreen from '../screens/DishDetialsScreen';
import Basket from '../screens/Basket';
import OrderScreen from '..//screens/OrderScreen';
import ProfileScreen from '..//screens/ProfileScreen';
import OrderDetails from '../screens/OrderDetails';
import { useAuthContext } from "../context/Authcontext";
import { Foundation, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
const Stack = createNativeStackNavigator();
const RootNavigator = () => {
    const { dbUser } = useAuthContext();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {dbUser ? (
                <Stack.Screen name="HomeTabs" component={HomeTabs} />
            ) : (
                <Stack.Screen name="Profile" component={ProfileScreen} />
            )}
        </Stack.Navigator>
    );
};
const Tab = createBottomTabNavigator();
const HomeTabs = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} barStyle={{ backgroundColor: "white" }}>
            <Tab.Screen name="Home" component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({ color }) =>
                        <Foundation name="home" size={24} color={color} />
                }} />
            <Tab.Screen name="Orders" component={OrderStackNavigator}
                options={{
                    tabBarIcon: ({ color }) =>
                        <MaterialIcons name="list-alt" size={24} color={color} />
                }} />
            <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color }) =>
                        <FontAwesome5 name="user-alt" size={24} color={color} />
                }} />
        </Tab.Navigator>
    );
};
const HOmeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
    return (
        <HOmeStack.Navigator>
            <HOmeStack.Screen name="Restaurants" component={HomeScreen} />
            <HOmeStack.Screen name="Restaurant" component={RestaurantDetailsPage} options={{ headerShown: false }} />
            <HOmeStack.Screen name="Dish" component={DishDetailsScreen} />
            <HOmeStack.Screen name="Basket" component={Basket} />
        </HOmeStack.Navigator>
    );
};
const OrederStack = createNativeStackNavigator();

const OrderStackNavigator = () => {
    return (
        <OrederStack.Navigator>
            <OrederStack.Screen name="Orders" component={OrderScreen} />
            <OrederStack.Screen name="Order" component={OrderDetails} />
        </OrederStack.Navigator>
    );
};
export default RootNavigator;