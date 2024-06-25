import {StyleSheet} from 'react-native';
import globalStyles from '../../../styles/globalStyles';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    ...globalStyles.label,
    marginBottom: 9,
  },
  dog: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFDB6A',
    borderRadius: 17,
    padding: 16,
    height: 60,
  },
  checkBoxContainer: {
    alignItems: 'flex-start',
  },
  dogName: {
    fontSize: 14,
    color: colors.dark,
  },
  dogInfo: {
    fontSize: 12,
    color: colors.accent,
    marginBottom: 8,
  },
  checkBox: {
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
  },
  listContainer: {
    maxHeight: 200,
  },
  itemMargin: {
    marginBottom: 10,
  },
  selectText: {
    fontSize: 10,
  },
});

export default styles;
