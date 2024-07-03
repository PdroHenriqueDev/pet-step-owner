import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Avatar, Icon} from '@rneui/base';
import colors from '../../../styles/colors';
import {DogWalker} from '../../../interfaces/dogWalker';
import {getRecommedDogWalkers} from '../../../services/dogWalkerService';

function DogWalkerList() {
  const [dogWalkers, setDogWalkers] = useState<DogWalker[]>([]);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const ownerData = await getRecommedDogWalkers();
        setDogWalkers(ownerData);
      } catch (error) {
        console.error('Failed to fetch owner data:', error);
      }
    };

    fetchOwner();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Dog Walkers recomendados</Text>
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
      {dogWalkers.length === 0 ? (
        <Text style={styles.info}>
          Ainda não há nenhum dog waker recomendado
        </Text>
      ) : (
        dogWalkers.map((item, index) => (
          <View
            key={item.id}
            style={index !== dogWalkers.length - 1 && styles.itemMargin}
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
                    item.isOnline ? styles.online : styles.offline,
                  ]}
                />
              </Avatar>
              <View className="flex-col ml-2">
                <View className="flex-row items-center">
                  <Text className="mr-3" style={styles.name}>
                    {item.name}
                  </Text>
                  <Icon
                    type="feather"
                    name="star"
                    size={14}
                    color={colors.dark}
                  />
                  <Text style={styles.rate} className="ml-2">
                    {item.rate}
                  </Text>
                </View>
                <Text style={styles.info}>{item.distance}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Contratar</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
      <View />
    </View>
  );
}

export default DogWalkerList;
