import React from 'react';
import { Icon, Input, Card, CheckBox } from '@rneui/themed';
import { Button, FlatList, Text, TouchableOpacity, View } from 'react-native';
import globalStyles from '../../../../styles/globalStyles';
import colors from '../../../../styles/colors';
import styles from './styles';

const { Title, Divider } = Card;

const dogWalkers = [
    {
        id: '1',
        name: 'Pedro',
    },
    {
        id: '2',
        name: 'Pedro',
    },
    {
        id: '3',
        name: 'Pedro',
    },
];

const renderDogWalkerCard = ({ item }: { item: { id: string; name: string } }) => (
    <Card containerStyle={globalStyles.card}>
        <Card.Title style={globalStyles.text}>{item.name}</Card.Title>
        <Card.Divider />
        <Text>Descrição ou mais detalhes aqui</Text>
    </Card>
);

function DogWalkerCardList() {
  return (
    <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={globalStyles.text}>Selecione um Dog Walker</Text>
            <TouchableOpacity>
                <Text style={styles.linkText}>Veja mais</Text>
            </TouchableOpacity>
            {/* <Text style={globalStyles.label}>Veja mais</Text> */}
        </View>
        <FlatList
            data={dogWalkers}
            renderItem={renderDogWalkerCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.list}
        />  
    </View>
  );
}

export default DogWalkerCardList;