import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {getHeaderTitle} from '@react-navigation/elements';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import styles from './styles';
import {Icon} from '@rneui/base';

function Header({navigation, route, options, back}: BottomTabHeaderProps) {
  const title = getHeaderTitle(options, route.name);
  const [notification] = useState(true);
  return (
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
  );
}

export default Header;
