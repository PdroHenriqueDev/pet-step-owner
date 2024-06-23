import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    marginBottom: 20,
  },
  icon: {
    marginRight: 16,
  },
  input: {
    color: colors.dark,
  },
});

export default styles;
