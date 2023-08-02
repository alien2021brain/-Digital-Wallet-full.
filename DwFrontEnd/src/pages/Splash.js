import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../components/Butttons';

const Splash = ({navigation}) => {
  const handleSignIn = () => {
    navigation.navigate('Login');
  };
  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      className="flex-1 px-5 py-5">
      <View className=" flex-1 items-center justify-center mt-20 ">
        <Text
          className="  mt-10 text-4xl text-white"
          style={{fontFamily: 'Poppins-ExtraBoldItalic'}}>
          Cyber Purse
        </Text>

        <Lottie
          source={require('../../Logo.json')}
          autoPlay
          loop
          style={{height: 500, marginTop: -40}}
        />
      </View>
      <View className="buttons flex flex-row items-center justify-evenly">
        <Button
          name="Login"
          custom="bg-[#50C878]"
          handleSignIn={handleSignIn}
        />
        <Button name="SignUp" handleSignUp={handleSignUp} />
      </View>
    </LinearGradient>
  );
};

export default Splash;
