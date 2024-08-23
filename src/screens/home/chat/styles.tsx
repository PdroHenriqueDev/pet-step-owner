import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.primary,
  },
  header: {
    padding: 16,
    borderBottomWidth: 2,
    borderColor: colors.border,
    marginBottom: 20,
  },
  messagesList: {
    flex: 1,
  },
  messageContainer: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.secondary,
  },
  dogWalkerMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.border,
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: colors.border,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 2.5,
  },
});

export default styles;
