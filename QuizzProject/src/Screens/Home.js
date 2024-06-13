import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Loading from '../Components/Loading';
import {Searchbar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

const Home = ({navigation}) => {
  const user = useSelector(state => state.UserRedux.user);
  console.log(user);
  const nameCategory = ['Sports', 'General Knowledge', 'Historical', 'Animal'];
  
  const capitalizeWords = str => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  const handleViewAll = () => {
    navigation.navigate('Category');
  };

  const MyComponent = ({name}) => {
    return (
      <View className="w-36 my-2 rounded-xl bg-cyan-200 h-20 items-center justify-center">
        <Text className="text-black">{name}</Text>
      </View>
    );
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <LinearGradient
      className="flex-1"
      colors={['rgba(0,215,255,0.41)', 'rgba(25,0,193,0.26)']}>
      <SafeAreaView className="h-full">
        <View className=" rounded-b-3xl">
          <View className="flex-row justify-between items-center m-5">
            <View>
              <Text className="text-lg font-bold text-black ">
                Hello, {capitalizeWords(user.name)}!
              </Text>
              <Text className="text-sm mt-2">Let's start your quiz now...</Text>
            </View>
            <Image
              source={{uri: user.avatarURL}}
              className="ml-auto w-14 h-14 rounded-full"
            />
          </View>
        </View>

        <View className="mx-5">
          <Searchbar placeholder="Search" className="rounded-xl bg-white" />
        </View>

        <View className="h-1/4 b mt-5 mx-5 bg-blue-300 rounded-lg">
          <LottieView source={require('../assets/banner.json')} autoPlay loop />
        </View>

        <View className="mx-5 mt-5">
          <View className="flex-row justify-between">
            <Text className="font-bold text-lg">Categories</Text>
            <TouchableOpacity
              className="justify-center"
              onPress={() => handleViewAll()}>
              <Text className="underline">View all</Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row flex-wrap justify-between">
            {nameCategory.map((text, index) => (
              <MyComponent key={index} name={text} />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;
