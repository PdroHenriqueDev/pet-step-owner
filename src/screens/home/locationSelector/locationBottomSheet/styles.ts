import {StyleSheet} from 'react-native';
import colors from '../../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  bottomSheet: {
    // width: Dimensions.get('window').width,
  },
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
});

export default styles;
