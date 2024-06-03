import React from 'react';
import { Icon, Card, CheckBox, Input } from '@rneui/themed';
import { Text, TouchableOpacity, View } from 'react-native';
import globalStyles from '../../../../styles/globalStyles';
import colors from '../../../../styles/colors';
import styles from './styles';
import { Controller, useForm } from 'react-hook-form';

const { Title } = Card;

const times = [
  {id: 1, displayName: '15 min', value: '15'},
  {id: 2, displayName: '30 min', value: '30'},
  {id: 4, displayName: '60 min', value: '60'},
];

function Request({ address, navigation }: any) {  
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      startLocation: '',
      selectedTime: '15',
    }
    
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  if (address) {
    setValue('startLocation', address);
  }

  return (
    <View style={styles.container}>
      <Card containerStyle={globalStyles.card}>
        <Title style={globalStyles.text}>Solicite quem vai levar seu cachorro para passear!</Title>
        <TouchableOpacity onPress={() => navigation.navigate('LocationSelector')}>
          <Controller
            control={control}
            name="startLocation"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={globalStyles.input}
                placeholderTextColor={globalStyles.text.color}
                placeholder="Inicio do passeio"
                leftIcon={
                  <Icon
                    type='font-awesome-6'
                    name='location-pin'
                    size={20}
                    color={globalStyles.text.color}
                  />
                }
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                editable={false}
              />
            )}
          />
        </TouchableOpacity>

        <Text style={globalStyles.label}>Selecione o tempo:</Text>

          {times.map((time) => (
            <Controller
              key={time.id}
              control={control}
              name="selectedTime"
              render={({ field: { onChange, value } }) => (
                <CheckBox
                  title={time.displayName}
                  checkedColor={colors.primary}
                  checked={value === time.value}
                  onPress={() => onChange(time.value)}
                />
              )}
            />
          ))}
          <TouchableOpacity onPress={handleSubmit(onSubmit)} style={globalStyles.button}>
            <Text style={globalStyles.buttonText}>Buscar Dog Walker</Text>
          </TouchableOpacity>
      </Card>
    </View>
  );
}

export default Request;