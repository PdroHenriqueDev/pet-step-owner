import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.primary,
  },
  list: {
    paddingBottom: 40,
  },
  listItem: {
    paddingLeft: 0,
  },
  cardNumber: {
    fontSize: 13,
    color: colors.dark,
  },
  cardExpiry: {
    fontSize: 12,
    color: colors.dark,
  },
});

export default styles;
