import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Avatar, Icon} from '@rneui/base';
import styles from './styles';
import colors from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';
import {truncateText} from '../../utils/textUtils';
import {DogWalkerCardProps} from '../../interfaces/dogWalkerCard';

export default function DogWalkerCard({
  dogWalker,
  isLastItem,
  isSelect,
  isSelected,
  onSelect,
}: DogWalkerCardProps) {
  const handlePress = () => {
    if (isSelect && onSelect) {
      onSelect(dogWalker._id);
    }
  };

  return (
    <TouchableOpacity
      style={[
        !isLastItem && styles.itemMargin,
        isSelected && styles.selectedBorder,
      ]}
      className="flex-row justify-between"
      onPress={handlePress}
      activeOpacity={isSelected ? 0.7 : 1}>
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
              {truncateText({
                text: dogWalker.name || '',
                maxLength: 15,
              })}
            </Text>
            <Icon type="feather" name="star" size={14} color={colors.dark} />
            <Text style={styles.rate} className="ml-2">
              {dogWalker.rate}
            </Text>
          </View>
          <Text style={globalStyles.infoText}>{dogWalker.distance} km</Text>
        </View>
      </View>
      {isSelect ? (
        isSelected && <Text style={globalStyles.selectedText}>selecionado</Text>
      ) : (
        <TouchableOpacity
          disabled={!dogWalker.isOnline}
          style={[styles.button, !dogWalker.isOnline && styles.disabledButton]}
          onPress={handlePress}>
          <Text
            style={[
              styles.buttonText,
              !dogWalker.isOnline && styles.buttonDisabledText,
            ]}>
            Contratar
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}
