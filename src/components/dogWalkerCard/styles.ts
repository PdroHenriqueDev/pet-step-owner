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
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
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
  selectedBorder: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 8,
  },
  iconWrapper: {
    marginRight: 5,
    marginTop: 3,
  },
});

export default styles;
