import {StyleSheet} from 'react-native';
import colors from '../../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    marginHorizontal: 20,
  },
  indicator: {
    backgroundColor: colors.dark,
  },
  titleText: {
    color: colors.dark,
    fontSize: 16,
  },
});

export default styles;
