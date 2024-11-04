import {Platform, Text, View} from 'react-native';
import {PlataformEnum} from '../../../enums/platform.enum';

export default function RecommendedDogWalkersScreen() {
  return (
    <View
      className={`bg-primary flex-1 ${
        Platform.OS === PlataformEnum.IOS ? 'px-5 py-20' : 'px-5'
      }`}>
      <Text>RecommendedDogWalkersScreen</Text>
    </View>
  );
}
