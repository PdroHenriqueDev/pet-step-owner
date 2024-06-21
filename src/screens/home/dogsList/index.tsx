import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {CheckBox, Icon} from '@rneui/base';
import colors from '../../../styles/colors';
import CustomButton from '../../../components/customButton';
import {ScrollView} from 'react-native-gesture-handler';
import {useDialog} from '../../../contexts/dialogContext';

function DogsList() {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const {showDialog, hideDialog} = useDialog();

  const dogs = [
    {
      id: 1,
      name: 'Laika',
      breed: 'Chow Chow',
      year: 8,
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
    setCheckedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }

      return [...prev, id];
    });
  };

  const handleClick = () => {
    if (checkedItems.length === 0 || checkedItems.length > 3) {
      showDialog({
        title:
          checkedItems.length === 0
            ? 'É preciso no mínimo 1 dog'
            : 'Só é permitido no máximo 3 dogs',
        confirm: {
          confirmLabel: 'Entendi',
          onConfirm: () => {
            hideDialog();
          },
        },
      });
      return;
    }
    console.log('Selected Dogs:', checkedItems);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Qual Dog vai passear?</Text>
      <View style={styles.listContainer}>
        <ScrollView>
          {dogs.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.checkBoxContainer,
                index !== dogs.length - 1 && styles.itemMargin,
              ]}
              onPress={() => handleCheckBoxPress(item.id)}>
              <View style={styles.dog}>
                <View style={styles.checkBoxContainer}>
                  <View className="flex-row items-center">
                    <Text className="mr-2" style={styles.dogName}>
                      {item.name}
                    </Text>
                    <Icon type="font-awesome" name="paw" size={10} />
                  </View>
                  <Text style={styles.dogInfo}>
                    {item.breed}, {item.year} {item.year === 1 ? 'ano' : 'anos'}
                  </Text>
                </View>
                <View className="items-center">
                  <CheckBox
                    right
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={checkedItems.includes(item.id)}
                    onPress={() => handleCheckBoxPress(item.id)}
                    checkedColor={colors.dark}
                    uncheckedColor={colors.dark}
                    containerStyle={styles.checkBox}
                    size={17}
                  />
                  <Text style={styles.selectText}>
                    {checkedItems.includes(item.id)
                      ? 'Selecionado'
                      : 'Não selecionado'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <CustomButton onPress={handleClick} title="Solicitar passeio" />
      </View>
    </View>
  );
}

export default DogsList;
