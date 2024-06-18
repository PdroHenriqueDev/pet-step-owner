import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    backgroundColor: colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  iconContainer: {
    position: 'relative',
    padding: 5,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.border,
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: colors.danger,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.secondary,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default styles;
