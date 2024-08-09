import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {getHeaderTitle} from '@react-navigation/elements';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import styles from './styles';
import {Icon} from '@rneui/base';
import colors from '../../styles/colors';
import {useFocusEffect} from '@react-navigation/native';

function NotificationHeader({
  navigation,
  route,
  options,
}: BottomTabHeaderProps) {
  const [notification] = useState(true);
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          {notification && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>1</Text>
            </View>
          )}

          <Icon type="material" name="notifications-none" size={22} />
        </View>
      </View>
    </View>
  );
}

export default NotificationHeader;
