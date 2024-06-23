import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-paper';

const Category = ({navigation}) => {
  const topic = [
    {
      name: 'Sports',
      id: 21,
    },
    {
      name: 'Films',
      id: 11,
    },
    {
      name: 'Animals',
      id: 27,
    },
    {
      name: 'Music',
      id: 12,
    },
  ];

  const handleQuestionType = id => {
    navigation.navigate('Question', {data: id});
  };

  const RenderBlock = ({data}) => {
    return (
      <View className="flex-1 items-center my-4">
        <View className="w-11/12 bg-white rounded-lg shadow-lg p-4">
          <Text className="text-base font-bold mb-4">{data.name}</Text>
          <View className="flex-row justify-end">
            <TouchableOpacity
              className="bg-yellow-300 py-2 px-4 w-20 rounded-full items-center"
              onPress={() => handleQuestionType(data.id)}>
              <Icon source="arrow-right-bold" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      className="flex-1"
      colors={['rgba(0,215,255,0.41)', 'rgba(25,0,193,0.26)']}>
      <SafeAreaView className="flex-1 mx-5">
        <View className="bg-teal-100 rounded-b-3xl mb-3">
          <Text className="text-center text-black font-bold text-lg my-4">
            List of topics
          </Text>
        </View>
        <FlatList
          data={topic}
          renderItem={({item}) => <RenderBlock data={item} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Category;
