import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { signIn } from '@/lib/configs/user.appwrite';
import useAuthStore from '@/stores/auth.store';
import * as Sentry from '@sentry/react-native';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';

export default function SignIn() {
  const { fetchAuthenticatedUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = async () => {
    const { email, password } = form;
    setIsLoading(true);
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    try {
      await signIn({ email, password });
      await fetchAuthenticatedUser();
      Alert.alert('Success', 'Sign in successful');
    } catch (error: any) {
      Alert.alert('Error', error.message);
      Sentry.captureException(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
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
        title='Sign In'
        onPress={handleSignIn}
        isLoading={isLoading}
      />
      <View className='flex-center flex-row gap-2'>
        <Text className='base-regular text-gray-100'>
          Don&apos;t have an account?
        </Text>
        <Link href='/(auth)/sign-up' className='base-bold text-primary'>
          Sign up
        </Link>
      </View>
    </View>
  );
}
