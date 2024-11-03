import {Platform, StyleSheet} from 'react-native';
import {PlataformEnum} from '../../../enums/platform.enum';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerFixed: {
    left: '46%',
    top: Platform.OS === PlataformEnum.IOS ? '49%' : '47.5%',
    position: 'absolute',
  },
  marker: {
    margin: 0,
  },
  bottomSheetContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});

export default styles;
