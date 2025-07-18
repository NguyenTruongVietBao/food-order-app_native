import { cn } from '@/lib/utils';
import { Category } from '@/type';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Platform, Text, TouchableOpacity } from 'react-native';

export default function MenuFilter({ categories }: { categories: Category[] }) {
  const searchParams = useLocalSearchParams();
  const [active, setActive] = useState<string>('all');

  const filterData = useMemo(() => {
    const baseData = [{ $id: 'all', name: 'All' }];
    return categories ? [...baseData, ...categories] : baseData;
  }, [categories]);

  useEffect(() => {
    const categoryParam = searchParams.category;
    let newActive = 'all';

    if (typeof categoryParam === 'string' && categoryParam) {
      newActive = categoryParam;
    } else if (Array.isArray(categoryParam) && categoryParam[0]) {
      newActive = categoryParam[0];
    }

    setActive(newActive);
  }, [searchParams.category]);

  const handleFilter = useCallback(
    (id: string) => {
      if (id === active) return;
      setActive(id);
      setTimeout(() => {
        if (id === 'all') {
          router.setParams({ category: undefined });
        } else {
          router.setParams({ category: id });
        }
      }, 0);
    },
    [active]
  );

  const renderItem = useCallback(
    ({ item }: { item: Category | { $id: string; name: string } }) => (
      <TouchableOpacity
        onPress={() => handleFilter(item.$id)}
        className={cn(
          'filter px-4 py-2 rounded-full border',
          active === item.$id
            ? 'bg-primary border-primary'
            : 'bg-white border-gray-300'
        )}
        style={
          Platform.OS === 'android'
            ? { elevation: 2, shadowColor: '#878787' }
            : {}
        }
        activeOpacity={0.7}
      >
        <Text
          className={cn(
            'body-medium font-medium',
            active === item.$id ? 'text-white' : 'text-gray-600'
          )}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    ),
    [active, handleFilter]
  );

  return (
    <FlatList
      data={filterData}
      keyExtractor={(item) => item.$id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName='gap-x-2 pb-3'
      renderItem={renderItem}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
      removeClippedSubviews={false}
    />
  );
}
