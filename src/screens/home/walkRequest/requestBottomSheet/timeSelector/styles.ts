import {StyleSheet} from 'react-native';
import colors from '../../../../../styles/colors';

const styles = StyleSheet.create({
  titleText: {
    fontSize: 14,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionMargin: {
    marginBottom: 10,
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  optionText: {
    fontSize: 16,
    color: colors.dark,
  },
  checkBox: {
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
  },
});

export default styles;
