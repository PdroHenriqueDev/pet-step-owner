import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import styles from './styles';
import {Avatar, Icon} from '@rneui/base';
import colors from '../../../styles/colors';
import {DogWalker} from '../../../interfaces/dogWalker';

function DogWalkerList() {
  const dogWalkers: DogWalker[] = [
    {
      id: '1',
      name: 'Pedro Henrique',
      date: '10 abr',
      time: '13h',
      distance: '5km',
      rate: 4.5,
      isOnline: false,
    },
    {
      id: '6',
      name: 'Pedro Henrique',
      date: '10 abr',
      time: '13h',
      distance: '5km',
      rate: 4.5,
      isOnline: false,
    },
    {
      id: '21',
      name: 'Pedro Henrique',
      date: '10 abr',
      time: '13h',
      distance: '5km',
      rate: 4.5,
      isOnline: false,
    },
    {
      id: '2',
      name: 'Pedro Henrique',
      date: '10 abr',
      time: '13h',
      distance: '5km',
      rate: 4.5,
      isOnline: false,
    },
    {
      id: '3',
      name: 'Pedro Henrique',
      date: '10 abr',
      time: '13h',
      distance: '5km',
      rate: 4.5,
      isOnline: false,
    },
    {
      id: '4',
      name: 'Pedro Henrique',
      date: '10 abr',
      time: '13h',
      distance: '5km',
      rate: 4.5,
      isOnline: false,
    },
  ];

  const renderItem = ({item, index}: {item: DogWalker; index: number}) => {
    const isOnline = item.isOnline;
    const isLastItem = index === dogWalkers.length - 1;

    return (
      <View
        style={!isLastItem && styles.itemMargin}
        className="flex-row justify-between">
        <View className="flex-row">
          <Avatar
            rounded
            source={{
              uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}>
            <View
              style={[
                styles.statusIndicator,
                isOnline ? styles.online : styles.offline,
              ]}
            />
          </Avatar>
          <View className="flex-col ml-2">
            <View className="flex-row items-center">
              <Text className="mr-3" style={styles.name}>
                {item.name}
              </Text>
              <Icon type="feather" name="star" size={14} color={colors.dark} />
              <Text style={styles.rate} className="ml-2">
                {item.rate}
              </Text>
            </View>
            <Text style={styles.info}>
              {item.date}, {item.time}, {item.distance}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Contratar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Dog Walkers recentes</Text>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonLabel}>ver todos</Text>
          <Icon
            type="material"
            name="arrow-forward-ios"
            size={12}
            color={colors.dark}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={dogWalkers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View />
    </View>
  );
}

export default DogWalkerList;
