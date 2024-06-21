import React, {useEffect, useState} from 'react';
import {Icon, Card, Input} from '@rneui/themed';
import {Text, TouchableOpacity, View} from 'react-native';
import globalStyles from '../../../../styles/globalStyles';
import styles from './styles';
import {Controller, useForm} from 'react-hook-form';
import {useLocation} from '../../../../contexts/locationContext';
import {getNearestsDogWalkers} from '../../../../services/dogWalkerService';

const {Title} = Card;

const times = [
  {id: 1, displayName: '15 min', value: '15', price: 15.99},
  {id: 2, displayName: '30 min', value: '30', price: 30.38},
  {id: 4, displayName: '60 min', value: '60', price: 60.76},
];

const dogCounts = [
  {id: 1, displayName: '1 Dog', value: '1', price: 0},
  {id: 2, displayName: '2 Dogs', value: '2', price: 4.99},
  {id: 3, displayName: '3 Dogs', value: '3', price: 4.99 * 2},
];

function Request({address, navigation}: any) {
  const {receivedLocation} = useLocation();

  const {control, handleSubmit, setValue, watch} = useForm({
    defaultValues: {
      startLocation: '',
      selectedTime: '15',
      selectedDogCount: '1',
    },
  });

  const [totalPrice, setTotalPrice] = useState(0);

  const selectedTime = watch('selectedTime');
  const selectedDogCount = watch('selectedDogCount');

  useEffect(() => {
    const calculatePrice = () => {
      const timeOption = times.find(time => time.value === selectedTime);
      const dogCountOption = dogCounts.find(
        count => count.value === selectedDogCount,
      );
      if (timeOption && dogCountOption) {
        return timeOption.price + dogCountOption.price;
      }
      return 0;
    };

    setTotalPrice(calculatePrice());
  }, [selectedTime, selectedDogCount]);

  useEffect(() => {
    if (receivedLocation) {
      const {description} = receivedLocation;
      if (description) {
        setValue('startLocation', description);
      }
    }
  }, [receivedLocation, setValue]);

  const onSubmit = async (formData: any) => {
    if (!receivedLocation) {
      return;
    }

    const {selectedDogCount, selectedTime} = formData;
    const {longitude, latitude} = receivedLocation;

    const data = {
      selectedDogCount,
      selectedTime,
      longitude,
      latitude,
    };
    // console.log(data);
    try {
      await getNearestsDogWalkers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Card containerStyle={globalStyles.card}>
        <Title style={globalStyles.text}>
          Solicite quem vai levar seu cachorro para passear!
        </Title>
        <TouchableOpacity
          onPress={() => navigation.navigate('LocationSelector')}>
          <Controller
            control={control}
            name="startLocation"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                style={globalStyles.input}
                placeholderTextColor={globalStyles.text.color}
                placeholder="Inicio do passeio"
                leftIcon={
                  <Icon
                    type="font-awesome-6"
                    name="location-pin"
                    size={20}
                    color={globalStyles.text.color}
                  />
                }
                onBlur={onBlur}
                onChangeText={onChange}
                value={receivedLocation?.description}
                editable={false}
              />
            )}
          />
        </TouchableOpacity>

        {/* <Text style={globalStyles.label}>Selecione o tempo:</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {times.map(time => (
            <Controller
              key={time.id}
              control={control}
              name="selectedTime"
              render={({field: {onChange, value}}) => (
                <CheckBox
                  title={time.displayName}
                  checkedColor={colors.primary}
                  checked={value === time.value}
                  onPress={() => onChange(time.value)}
                />
              )}
            />
          ))}
        </View> */}

        {/* <Text style={globalStyles.label}>
          Selecione a quantidade de cachorros::
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {dogCounts.map(count => (
            <Controller
              key={count.id}
              control={control}
              name="selectedDogCount"
              render={({field: {onChange, value}}) => (
                <CheckBox
                  title={count.displayName}
                  checkedColor={colors.primary}
                  checked={value === count.value}
                  onPress={() => onChange(count.value)}
                  containerStyle={{
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                  }}
                  textStyle={{fontSize: 14}}
                />
              )}
            />
          ))}
        </View> */}

        {/* <Text style={{...globalStyles.label, marginVertical: 12}}>
          Preço Total: R$ {totalPrice.toFixed(2)}
        </Text> */}

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={globalStyles.button}>
          <Text style={globalStyles.buttonText}>Buscar Dog Walker</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
}

export default Request;
