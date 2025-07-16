import { images } from '@/constants';
import { cn } from '@/lib/utils';
import { TabBarIconProps } from '@/type';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => {
  return (
    <View className='tab-icon'>
      <Image
        source={icon}
        className='size-7'
        resizeMode='contain'
        tintColor={focused ? '#FE8C00' : '#5D5F6D'}
      />
      <Text
        className={cn(
          'text-sm font-bold',
          focused ? 'text-primary' : 'text-gray-200'
        )}
      >
        {title}
      </Text>
    </View>
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          backgroundColor: '#ffffff',
          position: 'absolute',
          height: 80,
          bottom: 40,
          elevation: 5,
          marginHorizontal: 20,
        },
      }}
      initialRouteName='home'
    >
      <Tabs.Screen
        name='home'
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.home} title='Home' />
          ),
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.search} title='Search' />
          ),
        }}
      />
      <Tabs.Screen
        name='cart'
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.bag} title='Cart' />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.user} title='Profile' />
          ),
        }}
      />
    </Tabs>
  );
}
