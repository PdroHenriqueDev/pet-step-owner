import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: colors.primary,
    borderRadius: 12,
  },
  title: {
    color: colors.dark,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 600,
  },
});

export default styles;
