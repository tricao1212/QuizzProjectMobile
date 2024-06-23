import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Loading from '../Components/Loading';
import {Icon} from 'react-native-paper';
import axios from 'axios';
import {useSelector} from 'react-redux';

const Questions = ({navigation, route}) => {
  const user = useSelector(state => state.UserRedux.user);
  const id = route.params.data;
  const [questions, setQuestions] = useState();
  const [options, setOptions] = useState();
  const [index, setIndex] = useState(0);
  const [haveAnswer, setHaveAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const url1 = 'http://10.30.230.117:3031';
  const url2 = 'http://192.168.100.2:3031';
  const handleQuit = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to quit ? You will not receive any score !!!',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => navigation.goBack(),
        },
      ],
      {cancelable: false},
    );
  };

  const handleNext = () => {
    setHaveAnswer(false);
    setIndex(index + 1);
    setOptions(generateOption(questions[index + 1]));
  };

  const handleSelected = option => {
    setHaveAnswer(true);
    if (option === questions[index].correct_answer) {
      setScore(score + 10);
    }
  };

  const handleFinish = async () => {
    await axios
      .put(
        url2+'/api/Users/AddPoint?id=' +
          user.id +
          '&point=' +
          score,
      )
      .then(() => {})
      .catch(error => {
        console.log(error);
      });
    navigation.navigate('Result', {data: score});
  };

  const fetchQuiz = async () => {
    const url =
      'https://opentdb.com/api.php?amount=10&category=' +
      id +
      '&type=multiple&encode=url3986';
    const res = await fetch(url);
    const data = await res.json();
    setQuestions(data.results);
    setOptions(generateOption(data.results[0]));
  };

  const randomQues = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const generateOption = data => {
    const opt = [...data.incorrect_answers];
    opt.push(data.correct_answer);
    randomQues(opt);
    return opt;
  };

  const BlockOption = option => {
    return (
      <TouchableOpacity
        onPress={() => handleSelected(option.option)}
        className="w-full my-2 rounded-xl bg-cyan-200 h-20 items-center justify-center">
        <Text className="text-black">{decodeURIComponent(option.option)}</Text>
      </TouchableOpacity>
    );
  };

  const BlockOptionResult = option => {
    return option.option === questions[index].correct_answer ? (
      <View className="w-full my-2 border-green-700 border-4 rounded-xl bg-cyan-200 h-20 items-center justify-center">
        <Text className="text-black">{decodeURIComponent(option.option)}</Text>
      </View>
    ) : (
      <View className="w-full my-2 border-red-600 border-4 rounded-xl bg-cyan-200 h-20 items-center justify-center">
        <Text className="text-black">{decodeURIComponent(option.option)}</Text>
      </View>
    );
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  if (!questions || !options) {
    return <Loading />;
  }
  return (
    <SafeAreaView className="bg-[#F3EFD4] h-full">
      <TouchableOpacity
        onPress={() => handleQuit()}
        className="rounded-full mt-2 ml-2 bg-white w-14 justify-center items-center">
        <Icon source="arrow-left" size={40} />
      </TouchableOpacity>
      <View className="bg-green-300 rounded-lg m-2 p-3 h-[90%]">
        <Text className="text-base text-blue-500">Questions:</Text>
        <Text className="text-black text-base">
          {decodeURIComponent(questions[index].question)}
        </Text>
        <View className="h-1 bg-black w-full my-3" />
        <View>
          {haveAnswer ? (
            <FlatList
              data={options}
              renderItem={({item}) => <BlockOptionResult option={item} />}
              keyExtractor={item => item}
            />
          ) : (
            <FlatList
              data={options}
              renderItem={({item}) => <BlockOption option={item} />}
              keyExtractor={item => item}
            />
          )}
        </View>
        {haveAnswer ? (
          index !== 9 ? (
            <TouchableOpacity
              onPress={() => handleNext()}
              className="absolute bottom-0 right-0 m-3 bg-white rounded-lg w-24 h-14 items-center justify-center">
              <Text className="text-black">Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => handleFinish()}
              className="absolute bottom-0 right-0 m-3 bg-white rounded-lg w-24 h-14 items-center justify-center">
              <Text className="text-black">Finish</Text>
            </TouchableOpacity>
          )
        ) : (
          <></>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Questions;
