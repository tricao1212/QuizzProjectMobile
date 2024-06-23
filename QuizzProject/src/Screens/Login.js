import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {setUser} from '../Store/Store';
import LottieView from 'lottie-react-native';
import Loading from '../Components/Loading';
import axios from 'axios';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const url1 = 'http://10.30.230.117:3031';
  const url3 = 'https://localhost:7117'
  const url2 = 'http://192.168.100.2:3031';
  GoogleSignin.configure({
    webClientId:
      '908279014078-dfe5e2ruaq026etnvem1p9bfoc3n2h15.apps.googleusercontent.com',
  });

  const createUser = async data => {
    const newUser = {
      name: data.name,
      email: data.email,
      avatarURL: data.photo,
    };
    await axios
      .post(url2+'/api/Users/', newUser)
      .then(res => {
        dispatch(setUser(res.data));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const checkNewUser = async data => {
    const email = data.email;
    await axios
      .get(url2+'/api/Users/' + email)
      .then(async res => {
        const id = res.data.id;
        if (id == 0) {
          await createUser(data);
        }
        else{
          dispatch(setUser(res.data));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      setLoading(true);
      const currentUser = await GoogleSignin.getCurrentUser();
      await checkNewUser(currentUser.user);
      setLoading(false);
      if (!loading) {
        navigation.navigate('Main');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-blue-200">
      <View className="h-3/5">
        <LottieView source={require('../assets/welcome.json')} autoPlay loop />
      </View>
      <SafeAreaView className="flex-1 items-center">
        <View className="flex-1 items-center">
          <Text className="font-bold text-xl text-blue-500">
            Welcome to Quizz World !!!
          </Text>
          <Text className="text-xs text-center text-gray-400 mx-5">
            Test your knowledge, challenge yourself, and have fun with our
            engaging quizzes.
          </Text>
          <View className="mt-5">
            <GoogleSigninButton onPress={() => onGoogleButtonPress()} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Login;
