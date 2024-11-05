import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
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
  emptyContainer: {
    marginTop: 20,
  },
});

export default styles;
