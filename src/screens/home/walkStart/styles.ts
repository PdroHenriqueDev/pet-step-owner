import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  notificationMessage: {
    ...globalStyles.label,
    textAlign: 'center',
  },
});

export default styles;
