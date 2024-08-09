import {StyleSheet} from 'react-native';
import colors from '../../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  list: {
    paddingVertical: 20,
  },
  linkText: {
    fontSize: 16,
    color: colors.primary,
  },
});

export default styles;
