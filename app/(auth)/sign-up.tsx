import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { signUp } from '@/lib/configs/user.appwrite';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSignUp = async () => {
    const { name, email, password } = form;
    setIsLoading(true);
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      setIsLoading(false);
      return;
    }
    try {
      const newUser = await signUp({
        name,
        email,
        password,
      });
      if (!newUser) {
        Alert.alert('Error', 'Failed to create user');
        setIsLoading(false);
        return;
      }
      Alert.alert('Success', 'Sign up successful');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
      <CustomInput
        label='Name'
        placeholder='Enter your name'
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
        secureTextEntry={false}
        keyboardType='default'
      />
      <CustomInput
        label='Email'
        placeholder='Enter your email'
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
        secureTextEntry={false}
        keyboardType='email-address'
      />
      <CustomInput
        label='Password'
        placeholder='Enter your password'
        value={form.password}
        onChangeText={(text) => setForm({ ...form, password: text })}
        secureTextEntry={true}
        keyboardType='default'
      />
      <CustomButton
        title='Sign Up'
        onPress={handleSignUp}
        isLoading={isLoading}
      />

      <View className='flex-center flex-row gap-2'>
        <Text className='base-regular text-gray-100'>
          Already have an account?
        </Text>
        <Link href='/sign-in' className='base-bold text-primary'>
          Sign In
        </Link>
      </View>
    </View>
  );
}
