import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import {useAppNavigation} from '../../../hooks/useAppNavigation';
import styles from './styles';
import {Icon} from '@rneui/base';
import globalStyles from '../../../styles/globalStyles';
import colors from '../../../styles/colors';
import {database} from '../../../../firebaseConfig';
import {onValue, push, ref, set} from 'firebase/database';
import {MessageProps} from '../../../interfaces/chat';
import {delay} from '../../../utils/delay';

export default function Chat() {
  const {route} = useAppNavigation();
  const {requestId} = route?.params ?? {};

  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [inputHeight, setInputHeight] = useState(40);

  const flatListRef = useRef<FlatList<MessageProps>>(null);

  useEffect(() => {
    const messagesRef = ref(database, `chats/${requestId}/messages`);

    const unsubscribe = onValue(messagesRef, async snapshot => {
      const data = snapshot.val();
      if (data) {
        const parsedMessages = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setMessages(parsedMessages);

        setInputHeight(40);

        await delay();
        flatListRef.current?.scrollToEnd({animated: true});
      }
    });

    return () => unsubscribe();
  }, [requestId]);

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        text: inputMessage,
        sentAt: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isDogWalkerMessage: false,
      };

      const messageRef = push(ref(database, `chats/${requestId}/messages`));
      set(messageRef, newMessage);
      setInputMessage('');

      setInputHeight(40);

      flatListRef.current?.scrollToEnd({animated: true});
    }
  };

  const renderItem = ({item}: {item: MessageProps}) => (
    <View
      style={[
        styles.messageContainer,
        item.isDogWalkerMessage ? styles.dogWalkerMessage : styles.userMessage,
      ]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.sentAt}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text className="text-dark text-2xl text-center">Chat</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.messagesList}
        keyboardShouldPersistTaps="handled"
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput, {height: inputHeight}]}
          value={inputMessage}
          onChangeText={setInputMessage}
          multiline={true}
          onContentSizeChange={event => {
            setInputHeight(Math.min(120, event.nativeEvent.contentSize.height));
          }}
          placeholder="Escreva uma mensagem..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Icon
            type="material"
            name="send"
            color={colors.dark}
            size={20}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
