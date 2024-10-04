import {StyleSheet} from 'react-native';
import colors from '../../../../styles/colors';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  location: {
    color: colors.dark,
  },
  editContainer: {
    padding: 5,
    backgroundColor: colors.accent,
    borderRadius: 5,
    color: colors.dark,
  },
  indicator: {
    backgroundColor: colors.dark,
  },
  spinnerContainer: {
    width: '100%',
  },
});

export default styles;
