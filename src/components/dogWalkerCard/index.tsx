import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Avatar, Icon} from '@rneui/base';
import styles from './styles';
import colors from '../../styles/colors';
import {DogWalker} from '../../interfaces/dogWalker';

interface DogWalkerCardProps {
  dogWalker: DogWalker;
  isLastItem: boolean;
  onPress?: () => void;
}

const DogWalkerCard: React.FC<DogWalkerCardProps> = ({
  dogWalker,
  isLastItem,
  onPress,
}) => {
  return (
    <View
      style={[!isLastItem && styles.itemMargin]}
      className="flex-row justify-between">
      <View className="flex-row">
        <Avatar
          rounded
          source={{
            uri:
              dogWalker.profileUrl ||
              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}>
          <View
            style={[
              styles.statusIndicator,
              dogWalker.isOnline ? styles.online : styles.offline,
            ]}
          />
        </Avatar>
        <View className="flex-col ml-2">
          <View className="flex-row items-center">
            <Text className="mr-3" style={styles.name}>
              {dogWalker.name}
            </Text>
            <Icon type="feather" name="star" size={14} color={colors.dark} />
            <Text style={styles.rate} className="ml-2">
              {dogWalker.rate}
            </Text>
          </View>
          <Text style={styles.info}>{dogWalker.distance}</Text>
        </View>
      </View>
      <TouchableOpacity
        disabled={!dogWalker.isOnline}
        style={[styles.button, !dogWalker.isOnline && styles.disabledButton]}
        onPress={onPress}>
        <Text
          style={[
            styles.buttonText,
            !dogWalker.isOnline && styles.buttonDisabledText,
          ]}>
          Contratar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DogWalkerCard;
