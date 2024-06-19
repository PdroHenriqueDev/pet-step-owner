import {StyleSheet} from 'react-native';
import globalStyles from '../../../styles/globalStyles';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 1.6,
    borderColor: '#fff',
  },
  online: {
    backgroundColor: '#4CCD59',
  },
  offline: {
    backgroundColor: '#D3D3D3',
  },
  name: {
    fontSize: 14,
    color: colors.dark,
  },
  info: {
    fontSize: 12,
    color: colors.accent,
  },
  rate: {
    color: colors.dark,
  },
  button: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    alignItems: 'center',
    padding: 8,
  },
  buttonText: {
    fontSize: 14,
    color: colors.dark,
  },
  itemMargin: {
    marginBottom: 24,
  },
});

export default styles;
