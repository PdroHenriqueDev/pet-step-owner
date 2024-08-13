import {StyleSheet} from 'react-native';
import colors from '../../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    padding: 24,
  },
  contentContainer: {
    marginHorizontal: 20,
    paddingBottom: 100,
  },
  indicator: {
    backgroundColor: colors.dark,
  },
  titleText: {
    color: colors.dark,
    fontSize: 16,
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: colors.primary,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  icon: {
    marginRight: 10,
  },
  spinnerContainer: {
    height: '75%',
  },
});

export default styles;
