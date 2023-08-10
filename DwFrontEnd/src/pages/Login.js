import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import {AuthContext} from '../context/login';
const Login = ({navigation}) => {
  const [user, setUser] = useState({});
  const {signIn} = useContext(AuthContext);

  const handleInputs = (name, text) => {
    setUser(pre => ({...pre, [name]: text}));
  };
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
      navigation.navigate('Dashboard');
    } catch (e) {
      console.log('something went wrong while storing user', e);
    }
  };
  const handleSubmit = async () => {
    console.log('user submitted', user);
    try {
      const res = await signIn(user);
      if (res) {
        storeData(res.data);
      }
    } catch (error) {
      console.log('something went wronge', error);
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      className="flex-1 px-5 py-5 ">
      <ScrollView>
        <View className="top flex flex-row gap-5 items-baseline mt-2">
          <Icon
            color="white"
            size={24}
            name="arrow-left"
            style={{fontFamily: 'Poppins-Medium'}}
          />
          <Text
            className="text-2xl text-white"
            style={{fontFamily: 'Poppins-Medium'}}>
            Sigin
          </Text>
        </View>

        <View className="Container flex-1 flex gap-5 items-center justify-center  w-full">
          <Image
            source={require('../../assets/images/avtar.png')}
            className="h-52 w-52"
          />
          <View className="self-start w-full flex gap-5">
            <View className="formControl">
              <Text
                className="text-white mb-2"
                style={{fontFamily: 'Poppins-Medium'}}>
                Username
              </Text>
              <View className="flex flex-row">
                <View className="border border-white w-12 p-2 px-3 rounded-l-md bg-gray-400">
                  <Icon color="white" size={30} name="user" />
                </View>
                <TextInput
                  placeholder="John Smith"
                  className=" border border-white p-2  h-12 flex-1 rounded-r-md text-white"
                  placeholderTextColor={'white'}
                  style={{fontFamily: 'Poppins-Regular'}}
                  onChangeText={text => handleInputs('username', text)}
                />
              </View>
            </View>
            <View className="formControl ">
              <Text
                className="text-white mb-2"
                style={{fontFamily: 'Poppins-Medium'}}>
                Password
              </Text>
              <View className="flex flex-row">
                <View className="border w-12 border-white p-2 px-3 bg-gray-400 rounded-l-md">
                  <Icon name="lock" size={30} color="white" />
                </View>
                <TextInput
                  placeholder="****************** "
                  className=" border border-white p-2 pt-4 h-12 flex-1 rounded-r-md text-white "
                  placeholderTextColor={'white'}
                  style={{fontFamily: 'Poppins-Regular'}}
                  onChangeText={text => handleInputs('password', text)}
                  secureTextEntry={true}
                />
              </View>
              <Text
                className="text-white mb-2 self-end mt-2"
                style={{fontFamily: 'Poppins-Bold'}}>
                Forget Password ?
              </Text>
            </View>
            <TouchableOpacity
              className="items-center  p-2 rounded-md bg-green-400 "
              style={{
                shadowColor: '#000',
                shadowOpacity: 0.5,
                shadowRadius: 6,
                elevation: 6,
              }}
              onPress={handleSubmit}>
              <Text
                className="text-white text-lg "
                style={{fontFamily: 'Poppins-ExtraBold'}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Login;
