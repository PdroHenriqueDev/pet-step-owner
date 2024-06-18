import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './index';
import LocationSelector from './components/locationSelector';
import {Icon} from '@rneui/themed';
import colors from '../../styles/colors';
import {View} from 'react-native';

const {Navigator, Screen} = createStackNavigator();

function HomeStackNavigator() {
  return (
    <Navigator>
      <Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Screen
        name="LocationSelector"
        component={LocationSelector}
        options={{
          title: 'Selecionar localização',
          headerBackImage: () => (
            <>
              <View style={{marginLeft: 10}}>
                <Icon
                  type="material"
                  name="arrow-back"
                  size={26}
                  color={colors.primary}
                />
              </View>
            </>
          ),
        }}
      />
    </Navigator>
  );
}

export default HomeStackNavigator;
