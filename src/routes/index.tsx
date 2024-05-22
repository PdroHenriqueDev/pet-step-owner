import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from '../screens/Home';
import Account from "../screens/Account";
import Ionicons from 'react-native-vector-icons/Ionicons';

const { Navigator, Screen } = createBottomTabNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Navigator>
                <Screen  name="Home" component={Home}/>
                <Screen name="Teste" component={Account}/>
            </Navigator>
        </NavigationContainer>
    );
}

export default Routes;