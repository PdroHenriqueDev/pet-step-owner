import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  itemMargin: {
    marginBottom: 16,
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
  disabledButton: {
    backgroundColor: '#E0E0E0',
  },
  buttonText: {
    fontSize: 14,
    color: colors.dark,
  },
  buttonDisabledText: {
    color: colors.accent,
  },
  price: {
    color: colors.dark,
    alignSelf: 'center',
  },
  selectedBorder: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 8,
  },
});

export default styles;
