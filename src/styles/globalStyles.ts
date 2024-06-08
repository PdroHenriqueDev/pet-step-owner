import { StyleSheet } from 'react-native';
import colors from './colors';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.text,
  },
  label: {
    fontSize: 14,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 14,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    borderColor: colors.border,
  },
  input: {
    backgroundColor: colors.secondary,
    borderColor: colors.border,
    fontSize: 16,
  },
});

export default globalStyles;