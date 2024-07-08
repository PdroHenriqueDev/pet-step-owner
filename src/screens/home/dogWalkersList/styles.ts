import {StyleSheet} from 'react-native';
import globalStyles from '../../../styles/globalStyles';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: 20,
  },
  label: {
    ...globalStyles.label,
    marginBottom: 24,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLabel: {
    ...globalStyles.label,
    fontSize: 14,
    textAlignVertical: 'center',
    margin: 0,
    padding: 0,
  },
  icon: {
    marginTop: 2,
    marginLeft: 10,
  },
  info: {
    fontSize: 12,
    color: colors.accent,
  },
});

export default styles;
