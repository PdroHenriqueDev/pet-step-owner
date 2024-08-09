import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {getHeaderTitle} from '@react-navigation/elements';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import styles from './styles';
import {Icon} from '@rneui/base';
import {StackHeaderProps} from '@react-navigation/stack';
import colors from '../../styles/colors';
import {useFocusEffect} from '@react-navigation/native';

function CustomHeader({navigation, route, options, back}: StackHeaderProps) {
  return (
    <View>
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

export default CustomHeader;
