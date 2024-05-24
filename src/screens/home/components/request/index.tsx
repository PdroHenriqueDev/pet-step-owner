import React from 'react';
import { Icon, Input, Card, CheckBox } from '@rneui/themed';
import { Button, Text, TouchableOpacity } from 'react-native';
import globalStyles from '../../../../styles/globalStyles';
import colors from '../../../../styles/colors';

const { Title, Divider } = Card;

const times = [
  {id: 1, text: '15 min', checked: true},
  {id: 2, text: '30 min', checked: false},
  {id: 3, text: '45 min', checked: false},
  {id: 4, text: '60 min', checked: false},
]

function Request() {
  return (
    <>
      <Card containerStyle={globalStyles.card}>
        <Title style={globalStyles.text}>Solicite quem vai levar seu cachorro para passear!</Title>
        <Input
            style={globalStyles.input}
            placeholderTextColor={globalStyles.text.color}
            placeholder='Inicio do passeio'
            leftIcon={
                <Icon
                type='feather'
                name='map-pin'
                size={globalStyles.input.fontSize}
                color={globalStyles.text.color}
                />
            }
        />
          <Text style={globalStyles.label}>Selecione o tempo:</Text>
          {times.map((time) => 
            <CheckBox 
              title={time.text} 
              key={time.id}
              checkedColor={colors.primary} 
              checked={time.checked}
            />
          )}

          {/* <Button color={globalStyles.button.backgroundColor} title='Procurar dog walker'/> */}
          <TouchableOpacity
          style={globalStyles.button}
        >
          <Text style={globalStyles.buttonText}>Pressione Aqui</Text>
        </TouchableOpacity>
      </Card>
    </>
  );
}

export default Request;