import React, {useState} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import {useAppNavigation} from '../../../hooks/useAppNavigation';
import styles from './styles';
import {Icon} from '@rneui/base';
import globalStyles from '../../../styles/globalStyles';
import colors from '../../../styles/colors';

export default function Chat() {
  const {route} = useAppNavigation();
  const {dogWalkerId, requestId} = route.params ?? {};

  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Olá, estou a caminho!',
      sentAt: '13:00',
      isUserMessage: false,
    },
    {
      id: '2',
      text: 'Olá, certo estou esperando.',
      sentAt: '13:00',
      isUserMessage: true,
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputMessage,
        sentAt: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isUserMessage: true,
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  const renderItem = ({item}) => (
    <View
      style={[
        styles.messageContainer,
        item.isUserMessage ? styles.userMessage : styles.dogWalkerMessage,
      ]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.sentAt}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={globalStyles.text}>Aloe Vera</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputMessage}
          onChangeText={setInputMessage}
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
