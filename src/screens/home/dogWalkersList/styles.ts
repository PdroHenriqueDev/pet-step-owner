import {StyleSheet} from 'react-native';
import globalStyles from '../../../styles/globalStyles';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
    marginBottom: 80,
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
});

export default styles;
