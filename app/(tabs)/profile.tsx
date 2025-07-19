import useAuthStore from '@/stores/auth.store';
import { router } from 'expo-router';
import React from 'react';
import { Button, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  const { signOut, user } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/sign-in');
  };
  return (
    <SafeAreaView>
      <Text>{user?.name}</Text>
      <Text>{user?.email}</Text>
      <Image
        source={{ uri: user?.avatar }}
        style={{ width: 100, height: 100 }}
      />
      <Button title='Sign Out' onPress={handleSignOut} />
    </SafeAreaView>
  );
}
