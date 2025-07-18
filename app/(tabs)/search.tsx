import CartButton from '@/components/CartButton';
import MenuCart from '@/components/MenuCart';
import MenuFilter from '@/components/MenuFilter';
import MenuSearch from '@/components/MenuSearch';
import useAppwrite from '@/hooks/useAppwrite';
import { getCategories, getMenu } from '@/lib/configs/food.appwrite';
import { cn } from '@/lib/utils';
import { Category, MenuItem } from '@/type';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Search() {
  const { query, category } = useLocalSearchParams<{
    query?: string;
    category?: string;
  }>();

  const searchParams = useMemo(() => {
    const categoryParam = Array.isArray(category) ? category[0] : category;
    const queryParam = Array.isArray(query) ? query[0] : query;

    return {
      category: categoryParam || '',
      query: queryParam || '',
      limit: 6,
    };
  }, [query, category]);

  const { data: menu, refetch } = useAppwrite({
    fn: getMenu,
    params: searchParams,
  });

  const { data: categories } = useAppwrite({
    fn: getCategories,
  });

  useEffect(() => {
    refetch(searchParams);
  }, [searchParams, refetch]);

  const renderItem = useCallback(
    ({ item, index }: { item: MenuItem; index: number }) => {
      const isFirstRightColItem = index % 2 === 0;
      return (
        <View
          className={cn(
            'flex-1 max-w-[48%]',
            !isFirstRightColItem ? 'mt-10' : 'mt-0'
          )}
        >
          <MenuCart item={item} />
        </View>
      );
    },
    []
  );

  const ListHeaderComponent = useCallback(
    () => (
      <View className='my-5 gap-5'>
        <View className='flex-between flex-row w-full'>
          <View className='flex-start '>
            <Text className='small-bold uppercase text-primary'>
              Categories
            </Text>
            <View className='flex-start flex-row gap-x-1 mt-1'>
              <Text className='paragraph-semibold text-dark-100'>
                Find your favorite food
              </Text>
            </View>
          </View>
          <CartButton />
        </View>

        <MenuSearch />

        <MenuFilter categories={categories as Category[]} />
      </View>
    ),
    [categories]
  );

  const ListEmptyComponent = useCallback(
    () => (
      <View className='flex-1 items-center justify-center'>
        <Text className='paragraph-semibold text-dark-100'>
          No results found
        </Text>
      </View>
    ),
    []
  );

  return (
    <SafeAreaView className='h-full bg-white'>
      <FlatList
        data={menu as MenuItem[]}
        renderItem={renderItem}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName='gap-7'
        contentContainerClassName='gap-7 px-5 pb-32'
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={false}
      />
    </SafeAreaView>
  );
}
