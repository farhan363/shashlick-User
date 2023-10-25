import { StyleSheet, View,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import config from './src/aws-exports'
Amplify.configure({
  ...config,
  Analytics:{
    disabled:true
  },
});
 function App() {
  return (
    <NavigationContainer>
     <RootNavigator/>
    </NavigationContainer>
  );
}
export default withAuthenticator(App);