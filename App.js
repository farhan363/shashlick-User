import { StyleSheet, View,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation';
import { Amplify } from 'aws-amplify';
import '@azure/core-asynciterator-polyfill'
import { withAuthenticator } from 'aws-amplify-react-native';
import config from './src/aws-exports'
import AuthContextProvider from './src/context/Authcontext';
Amplify.configure({
  ...config,
  Analytics:{
    disabled:true,
  },
});
 function App() {
  return (
    <NavigationContainer>
     <AuthContextProvider>
     <RootNavigator/>
     </AuthContextProvider>
    </NavigationContainer>
  );
}
export default withAuthenticator(App);