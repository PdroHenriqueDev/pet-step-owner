import React from 'react';
import {View, Text} from 'react-native';
import {Avatar} from '@rneui/base';
import styles from './styles';
import {truncateText} from '../../../utils/textUtils';
import globalStyles from '../../../styles/globalStyles';
import {WalkProps} from '../../../interfaces/walk';

export default function HistoryCard(data: WalkProps) {
  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row">
        <Avatar
          rounded
          source={{
            uri:
              data.dogWalker?.profileUrl ||
              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
        />
        <View className="flex-col ml-2">
          <View className="flex-row items-center">
            <Text className="mr-3" style={styles.name}>
              {truncateText({
                text: data.dogWalker?.name || '',
                maxLength: 15,
              })}
            </Text>
          </View>

          <Text style={globalStyles.infoText}>
            {' '}
            {data.startDate
              ? new Date(data.startDate).toLocaleDateString()
              : ''}
          </Text>
        </View>
      </View>

      <Text style={styles.price}>R$ {data.price}</Text>
    </View>
  );
}
