import {StyleSheet} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.backgroudContainer,
  },
  requestContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 10,
  },
});

export default styles;
