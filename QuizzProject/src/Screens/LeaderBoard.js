import {View, Text, FlatList, SafeAreaView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Loading from '../Components/Loading';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

const LeaderBoard = ({navigation}) => {
  const user = useSelector(state => state.UserRedux.user);
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);
  const url1 = 'http://10.30.230.117:3031';
  const url2 = 'http://192.168.100.2:3031';
  let index = 0;
  const [currentTop, setCurrentTop] = useState();

  const fetchAllUsers = async () => {
    await axios
      .get(url1 + '/api/Users')
      .then(res => {
        setUsers(res.data.sort((a, b) => b.point - a.point));
        for (let x = 0; x < res.data.length; x++) {
          if (res.data[x].id === user.id) {
            setCurrentUser(res.data[x]);
            x = x + 1;
            setCurrentTop(x);
            break;
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAllUsers();
      index = 0;
    }, []),
  );

  const Block = data => {
    index = index + 1;
    return (
      <View className="flex-row justify-around my-3 items-center bg-slate-50 rounded-xl py-5">
        <View className="items-center">
          <Text>{index}</Text>
        </View>
        <View className="items-center">
          <Image
            source={{uri: data.data.avatarURL}}
            className="h-12 w-12 rounded-full"
            onError={({nativeEvent: {error}}) => {
              console.log(error);
            }}
          />
        </View>
        <View className="items-center">
          <Text>{data.data.name}</Text>
        </View>
        <View className="items-center">
          <Text>{data.data.point}</Text>
        </View>
      </View>
    );
  };

  if (!users && !currentUser && !currentTop) {
    return <Loading />;
  }

  return (
    <LinearGradient
      className="flex-1"
      colors={['rgba(0,215,255,0.41)', 'rgba(25,0,193,0.26)']}>
      <SafeAreaView className="flex-1 mx-5">
        <View className="bg-teal-100 rounded-b-3xl mb-10">
          <Text className="text-center text-black font-bold text-lg my-4">
            Leader Board
          </Text>
        </View>
        <View>
          <Text className="text-center font-bold text-lg text-black">
            Your rank
          </Text>
          <View className="flex-row justify-around my-3 items-center bg-slate-50 rounded-xl py-5">
            <View className="items-center">
              <Text>{currentTop}</Text>
            </View>
            <View className="items-center">
              <Image
                source={{uri: currentUser.avatarURL}}
                className="h-12 w-12 rounded-full"
                onError={({nativeEvent: {error}}) => {
                  console.log(error);
                }}
              />
            </View>
            <View className="items-center">
              <Text>{currentUser.name}</Text>
            </View>
            <View className="items-center">
              <Text>{currentUser.point}</Text>
            </View>
          </View>
        </View>
        <Text className="text-center font-bold text-lg text-black">
          Rank table
        </Text>
        <FlatList
          data={users}
          renderItem={({item}) => <Block data={item} />}
          extraData={item => item.id}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LeaderBoard;
