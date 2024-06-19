import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {CheckBox, Icon} from '@rneui/base';
import colors from '../../../styles/colors';
import {Dog} from '../../../interfaces/dog';

function DogsList() {
  const [checkedItems, setCheckedItems] = useState<{[key: number]: boolean}>(
    {},
  );

  const dogs = [
    {
      id: 1,
      name: 'Laika',
      breed: 'Chow Chow',
      year: 4,
    },
    {
      id: 2,
      name: 'Luke',
      breed: 'Labrador',
      year: 4,
    },
    {
      id: 3,
      name: 'Bela',
      breed: 'Pinscher',
      year: 4,
    },
    {
      id: 4,
      name: 'Test',
      breed: 'Test',
      year: 4,
    },
  ];

  const handleCheckBoxPress = (id: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderItem = ({item, index}: {item: Dog; index: number}) => {
    const isLastItem = index === dogs.length - 1;

    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.checkBoxContainer, !isLastItem && styles.itemMargin]}
        onPress={() => handleCheckBoxPress(item.id)}>
        <View style={styles.dog}>
          <View style={styles.checkBoxContainer}>
            <Text style={styles.dogName}>{item.name}</Text>
            <Text style={styles.dogInfo}>
              {item.breed}, {item.year} {item.year === 1 ? 'ano' : 'anos'}
            </Text>
            <CheckBox
              right
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={!!checkedItems[item.id]}
              onPress={() => handleCheckBoxPress(item.id)}
              checkedColor={colors.dark}
              uncheckedColor={colors.dark}
              containerStyle={styles.checkBox}
              size={17}
            />
          </View>
          <Icon
            type="material-community"
            name="dog-side"
            size={24}
            color={colors.dark}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>Seus dogs</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={dogs}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    </>
  );
}

export default DogsList;
