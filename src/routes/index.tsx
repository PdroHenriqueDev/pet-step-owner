import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Account from '../screens/account';
import {Icon} from '@rneui/themed';
import colors from '../styles/colors';
import globalStyles from '../styles/globalStyles';
import HomeStackNavigator from '../screens/home/routes';
import Header from '../components/header';

const {Navigator, Screen} = createBottomTabNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={() => ({
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.accent,
          tabBarLabelStyle: globalStyles.label,
          header: props => <Header {...props} />,
        })}>
        <Screen
          name="Inicio"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                type="feather"
                name="map-pin"
                size={22}
                color={focused ? colors.primary : colors.accent}
              />
            ),
          }}
        />
        <Screen name="Conta" component={Account} />
      </Navigator>
    </NavigationContainer>
  );
}

export default Routes;
