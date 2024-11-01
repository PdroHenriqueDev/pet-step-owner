import React from 'react';
import {View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import colors from '../../styles/colors';

interface CustomPickerProps {
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
  items: {label: string; value: string}[];
  error?: string;
  label?: string;
}

export default function CustomPicker({
  selectedValue,
  onValueChange,
  items,
  error,
  label,
}: CustomPickerProps) {
  return (
    <View>
      <View className="border border-border rounded-lg">
        <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
          <Picker.Item
            style={{color: colors.accent}}
            key=""
            label={label}
            value={''}
            enabled={false}
          />
          {items.map(item => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
      {error && <Text className="text-danger text-sm mt-1">{error}</Text>}
    </View>
  );
}
