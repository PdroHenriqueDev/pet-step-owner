import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {getHeaderTitle} from '@react-navigation/elements';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import styles from './styles';
import {Icon} from '@rneui/base';
import {StackHeaderProps} from '@react-navigation/stack';
import colors from '../../styles/colors';

function Header({navigation, route, options, back}: StackHeaderProps) {
  const title = getHeaderTitle(options, route.name);
  const [notification] = useState(true);
  return (
    <View>
      {!back && (
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
      )}

      {back ? (
        <View style={styles.headerInvisible}>
          <TouchableOpacity onPress={navigation.goBack}>
            <View style={styles.backIconContainer}>
              <Icon
                type="material"
                name="arrow-back-ios-new"
                size={14}
                color={colors.primary}
              />
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

export default Header;
