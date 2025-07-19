import { images } from '@/constants';
import { Alert, Image, TextInput, TouchableOpacity, View } from 'react-native';

export default function MenuSearch() {
  return (
    <View className='searchbar'>
      <TextInput
        className='flex-1 p-5'
        placeholder='Search for food'
        placeholderTextColor={'#A0A0A0'}
        returnKeyType='search'
      />
      <TouchableOpacity
        className='pr-5'
        onPress={() => Alert.alert('This is a test')}
      >
        <Image
          source={images.search}
          className='size-6'
          resizeMode='contain'
          tintColor={'#A0A0A0'}
        />
      </TouchableOpacity>
    </View>
  );
  // const params = useLocalSearchParams<{ query: string }>();
  // const [query, setQuery] = useState(params.query);
  // const handleSearch = (text: string) => {
  //   setQuery(text);
  //   if (!text) {
  //     router.setParams({ query: undefined });
  //   }
  // };
  // const handleSubmit = () => {
  //   if (query.trim()) {
  //     router.setParams({ query: query });
  //   }
  // };
  // return (
  //   <View className='searchbar'>
  //     <TextInput
  //       className='flex-1 p-5'
  //       placeholder='Search for food'
  //       value={query}
  //       onChangeText={handleSearch}
  //       onSubmitEditing={handleSubmit} // Enter in keyboard
  //       placeholderTextColor={'#A0A0A0'}
  //       returnKeyType='search'
  //     />
  //     <TouchableOpacity
  //       className='pr-5'
  //       onPress={() => router.setParams({ query: query })}
  //     >
  //       <Image
  //         source={images.search}
  //         className='size-6'
  //         resizeMode='contain'
  //         tintColor={'#A0A0A0'}
  //       />
  //     </TouchableOpacity>
  //   </View>
  // );
}
