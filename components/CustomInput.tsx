import { cn } from '@/lib/utils';
import { CustomInputProps } from '@/type';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

export default function CustomInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  label,
}: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className='w-full'>
      <Text className='label'>{label}</Text>
      <TextInput
        autoCapitalize='none'
        autoComplete='off'
        autoCorrect={false}
        keyboardType={keyboardType}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={'#888'}
        className={cn(
          'input',
          isFocused ? 'border-primary' : 'border-gray-300'
        )}
      />
    </View>
  );
}
