// LoadingScreen.js
import React from 'react';
import {View, ActivityIndicator, Text, SafeAreaView} from 'react-native';

const Loading = () => {
  return (
      <View className="flex-1 justify-center">
        <ActivityIndicator size={100} color="#0000ff" />
        <Text className="text-center">Loading</Text>
      </View>
  );
};

export default Loading;
