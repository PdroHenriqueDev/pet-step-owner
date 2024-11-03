import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {CheckBox, Icon} from '@rneui/base';
import colors from '../../../styles/colors';
import {ScrollView} from 'react-native-gesture-handler';
import {useRequest} from '../../../contexts/requestContext';
import {useAuth} from '../../../contexts/authContext';

function DogsList() {
  const {user} = useAuth();
  const {selectedDogIds, onDogSelectionChanged} = useRequest();

  const handleCheckBoxPress = (id: string) => {
    onDogSelectionChanged(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      return [...prev, id];
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Qual Dog vai passear?</Text>
      <View style={styles.listContainer}>
        <ScrollView>
          {user?.dogs?.map((item, index) => (
            <TouchableOpacity
              key={item._id}
              style={[
                styles.checkBoxContainer,
                index !== user.dogs!.length - 1 && styles.itemMargin,
              ]}
              onPress={() => handleCheckBoxPress(item._id!)}>
              <View style={styles.dog}>
                <View style={styles.checkBoxContainer}>
                  <View className="flex-row items-center">
                    <Text className="mr-2" style={styles.dogName}>
                      {item.name}
                    </Text>
                    <Icon type="font-awesome" name="paw" size={10} />
                  </View>
                  {/* <Text style={styles.dogInfo}>
                    {item.breed}, {item.age} {item.age === 1 ? 'ano' : 'anos'}
                  </Text> */}
                  <Text style={styles.dogInfo}>
                    {item.breed === 'unknown breed' ? 'SRD' : item.breed}
                  </Text>
                </View>
                <View className="items-center">
                  <CheckBox
                    right
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={selectedDogIds.includes(item._id!)}
                    onPress={() => handleCheckBoxPress(item._id!)}
                    checkedColor={colors.dark}
                    uncheckedColor={colors.dark}
                    containerStyle={styles.checkBox}
                    size={17}
                  />
                  <Text style={styles.selectedText}>
                    {selectedDogIds.includes(item._id!)
                      ? 'Selecionado'
                      : 'Não selecionado'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default DogsList;
