import {StyleSheet} from 'react-native';
import globalStyles from '../../../styles/globalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    ...globalStyles.button,
    width: '90%',
    marginBottom: 20,
  },
});

export default styles;
