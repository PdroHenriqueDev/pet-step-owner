import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './styles';
import globalStyles from '../../styles/globalStyles';
import {useOwner} from '../../contexts/ownerContext';
import {truncateText} from '../../utils/textUtils';
import {Icon, ListItem} from '@rneui/base';
import colors from '../../styles/colors';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {FieldOwnerProps} from '../../interfaces/owner';

function Account() {
  const {owner} = useOwner();
  const {navigation} = useAppNavigation();

  if (!owner) {
    return (
      <View className="flex-1 justify-center">
        <Text style={globalStyles.text}>Faça o login</Text>
      </View>
    );
  }

  const fields: FieldOwnerProps[] = [
    {
      id: '1',
      label: 'Dogs',
      value: owner.dogs,
      hide: true,
    },
    {
      id: '2',
      label: 'Nome',
      value: owner.name,
    },
    {
      id: '3',
      label: 'Sobrenome',
      value: owner.lastName,
    },
    {
      id: '4',
      label: 'Número',
      value: owner.phoneNumber,
    },
    {
      id: '5',
      label: 'Email',
      value: owner.email,
    },
    {
      id: '6',
      label: 'Senha',
      value: owner.password,
      hide: true,
    },
    {
      id: '7',
      label: 'Desativar conta',
      hide: true,
    },
  ];

  const handlePress = (field: FieldOwnerProps) => {
    navigation.navigate('UpdateOwnerScreen', {field});
  };

  const renderItem = ({item}: {item: FieldOwnerProps}) => (
    <ListItem bottomDivider onPress={() => handlePress(item)}>
      <ListItem.Content>
        <ListItem.Title>{item.label}</ListItem.Title>
      </ListItem.Content>
      <View className="flex-row items-center justify-between">
        <Text className="mr-2">
          {!item?.hide &&
            typeof item.value === 'string' &&
            (item?.value ?? 'vazio')}
        </Text>
        <ListItem.Chevron />
      </View>
    </ListItem>
  );

  return (
    <View className="flex-1 bg-primary p-5">
      <View className="flex-col items-center mb-5">
        <Text style={globalStyles.headerTitle}>
          {truncateText({
            text: owner.name || '',
            maxLength: 25,
          })}
        </Text>
        <View
          style={styles.rateContainer}
          className="flex-row items-center justify-between">
          <Icon type="feather" name="star" size={16} color={colors.dark} />
          <Text style={globalStyles.label}>{owner?.rate}</Text>
        </View>
      </View>
      <FlatList
        data={fields}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

export default Account;
