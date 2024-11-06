import React, {useEffect, useState} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {useAuth} from '../../../contexts/authContext';
import {useAppNavigation} from '../../../hooks/useAppNavigation';
import globalStyles from '../../../styles/globalStyles';
import {ListItem} from '@rneui/base';
import {Dog} from '../../../interfaces/dog';
import {PlataformEnum} from '../../../enums/platform.enum';
import {FlatList} from 'react-native-gesture-handler';

export default function DogListScreen() {
  const {user} = useAuth();
  const {navigation} = useAppNavigation();
  const [dogs, setDogs] = useState(user?.dogs || []);

  useEffect(() => {
    setDogs(user?.dogs || []);
  }, [user]);

  const handleSelectDog = (dog: Dog) => {
    navigation.navigate('DogUpdate', {dog});
  };

  const handleAddDog = () => {
    navigation.navigate('AddDogs');
  };

  const renderItem = ({item}: {item: Dog}) => (
    <ListItem bottomDivider onPress={() => handleSelectDog(item)}>
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem.Content>
      <View className="flex-row items-center justify-between">
        <Text className="mr-2">
          {item.breed === 'unknown breed' ? 'SRD' : item.breed}
        </Text>
        <ListItem.Chevron />
      </View>
    </ListItem>
  );

  return (
    <View
      className={`bg-primary flex-1 ${
        Platform.OS === PlataformEnum.IOS ? 'px-5 py-20' : 'p-5'
      }`}>
      <View
        className={`flex-row justify-between items-start ${
          Platform.OS === PlataformEnum.IOS ? 'mt-16 mb-2' : 'my-5'
        }`}>
        <Text className="text-dark text-center text-2xl font-bold">
          Lista de Cães
        </Text>
        <TouchableOpacity onPress={handleAddDog}>
          <Text style={globalStyles.headerSubtitle}>Adicionar cão</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={dogs}
        keyExtractor={item => item._id!.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Nenhum cão cadastrado.</Text>}
      />
    </View>
  );
}
