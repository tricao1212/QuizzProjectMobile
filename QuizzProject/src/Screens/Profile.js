import {View, Text, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {removeUser} from '../Store/Store';
import LinearGradient from 'react-native-linear-gradient';
import Loading from '../Components/Loading';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const Profile = ({navigation}) => {
  const [rendered, setRendered] = useState(false);
  const user = useSelector(state => state.UserRedux.user);
  const [userInfo, setUserInfo] = useState();
  const dispatch = useDispatch();
  const url1 = 'http://10.30.230.117:3031';
  const url2 = 'http://192.168.100.2:3031';
  const handleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      // dispatch(removeUser());
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  const fecthUser = async data => {
    const email = data.email;
    await axios
      .get(url1+'/api/Users/' + email)
      .then(res => {
        setUserInfo(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      fecthUser(user);
    }, []),
  );

  if (!userInfo) {
    return <Loading />;
  }

  return (
    <LinearGradient
      className="flex-1"
      colors={['rgba(0,215,255,0.41)', 'rgba(25,0,193,0.26)']}>
      <SafeAreaView className="flex-1">
        <View className="h-[93%] bg-cyan-200 m-5 rounded-lg p-5">
          <Text className="font-bold text-xl mb-10 text-center">Account</Text>
          <View className="flex-row">
            <Image
              source={{uri: userInfo.avatarURL}}
              className="w-20 h-20 rounded-md mr-5"
            />
            <View>
              <Text className="font-bold text-lg">{userInfo.name}</Text>
              <Text className="text-sm">{userInfo.email}</Text>
            </View>
          </View>
          <View className="mt-10 flex-row justify-between">
            <View className="rounded-full bg-teal-100 w-[45%] h-14 items-center justify-center">
              <Text className="font-bold text-base">
                Level: <Text className="font-normal">{userInfo.level}</Text>
              </Text>
            </View>
            <View className="rounded-full bg-teal-100 w-[45%] h-14 items-center justify-center">
              <Text className="font-bold text-base">
                Point: <Text className="font-normal">{userInfo.point}</Text>
              </Text>
            </View>
          </View>
          <View className="flex-1 justify-end items-center">
            <TouchableOpacity
              className="w-full h-16 rounded-lg justify-center bg-white"
              onPress={handleSignOut}>
              <Text className="text-center">Sign out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Profile;
