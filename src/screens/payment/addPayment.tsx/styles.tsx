import {StyleSheet, ViewStyle} from 'react-native';
import colors from '../../../styles/colors';
import {CardFieldInput} from '@stripe/stripe-react-native';

type CardFieldStyles = CardFieldInput.Styles & ViewStyle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: colors.primary,
  },
  cardStyle: {
    borderWidth: 1,
    borderColor: colors.border,
    textColor: colors.dark,
    placeholderColor: '#8080804D',
    backgroundColor: colors.primary,
  } as CardFieldStyles,
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 30,
  },
});

export default styles;
