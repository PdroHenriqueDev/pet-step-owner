import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from '../screens/home';
import Account from "../screens/account";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from "@rneui/themed";
import colors from "../styles/colors";
import { Text } from "react-native";
import globalStyles from "../styles/globalStyles";

const { Navigator, Screen } = createBottomTabNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={() => ({
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.accent,
                tabBarLabelStyle: globalStyles.label
            })}>
                <Screen name="Inicio" component={Home} options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            type='feather'
                            name='map-pin'
                            size={22}
                            color={focused ? colors.primary : colors.accent}
                        />
                    ),
                    // tabBarLabel: () => (
                    //     <Text style={globalStyles.label}>Inicio</Text>
                    // )
                }}/>
                <Screen name="Conta" component={Account}/>
            </Navigator>
        </NavigationContainer>
    );
}

export default Routes;