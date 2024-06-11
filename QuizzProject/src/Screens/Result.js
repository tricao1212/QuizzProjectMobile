import {Text, SafeAreaView, Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
const Result = ({navigation, route}) => {
  const score = route.params.data;
  const imageSource = require('../../imgs/good.jpg');

  const handleBackHome = () => {
    navigation.navigate('Main');
  };
  return (
    <SafeAreaView className="h-full items-center">
      <Text className="font-bold text-2xl mt-5 mb-2">Your score</Text>
      <Text className="font-bold text-3xl text-black">{score}</Text>
      <Image
        className="w-full h-[70%]"
        source={imageSource}
        resizeMode="contain"
      />
      <View className="w-[80%] absolute bottom-10">
        <TouchableOpacity
          onPress={() => handleBackHome()}
          className="bg-blue-200 rounded-xl h-16 items-center justify-center">
          <Text>Go back home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Result;
