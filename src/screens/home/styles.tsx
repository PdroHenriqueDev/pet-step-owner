import {StyleSheet} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  container: {
    ...globalStyles.backgroudContainer,
  },
  requestContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginVertical: 16,
  },
});

export default styles;
