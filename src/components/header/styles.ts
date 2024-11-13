import {Platform, StyleSheet} from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  headerInvisible: {
    padding: 10,
    paddingVertical: Platform.OS === 'ios' ? 50 : 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  backIconContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: colors.dark,
  },
});

export default styles;
