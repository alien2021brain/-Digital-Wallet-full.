import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {API_URL} from '@env';
let newInputIndex = 0;
const OtpVerification = ({route}) => {
  const {user} = route.params;
  console.log('user', user);
  const input = useRef();
  // creating array of length 4
  const InputBox = Array(4).fill('');

  const [otp, setOtp] = useState({
    0: '',
    1: '',
    2: '',
    3: '',
  });
  const [nextInputIndex, setnextIndex] = useState(0);
  const handleText = (index, text) => {
    setOtp(pre => ({...pre, [index]: text}));
    if (!text) {
      newInputIndex = index === 0 ? 0 : newInputIndex - 1;
    } else {
      newInputIndex =
        index === InputBox.length - 1 ? InputBox.length - 1 : newInputIndex + 1;
    }

    setnextIndex(newInputIndex);
  };
  console.log('inputind', nextInputIndex);

  const openGmailApp = () => {
    const url = 'googlegmail:';

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          // Handle case where Gmail app is not installed
          // You can prompt the user to install the app or provide an alternative action
          if (Platform.OS === 'android') {
            // Android alternative action (e.g., open email link in browser)
            console.log('Gmail app is not installed. Opening link in browser.');
            const alternativeUrl = 'https://mail.google.com/';
            Linking.openURL(alternativeUrl);
          } else {
            // iOS alternative action
            console.log(
              'Gmail app is not installed. Provide alternative action for iOS.',
            );
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    input.current.focus();
  }, [nextInputIndex]);

  const handleOtp = () => {
    const optValues = Object.values(otp).join('');
    const {email} = user;
    const otpdata = {
      otp: optValues,
      email,
    };

    try {
      const res = axios.post(`${API_URL}/auth/otp`, otpdata, {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      className="flex-1 px-5 py-5  ">
      <View className="h-full mt-20 ">
        <TouchableOpacity onPress={openGmailApp} className="items-center">
          <Image
            source={require('../../assets/images/732200.png')}
            className="h-36 w-36"
          />
        </TouchableOpacity>
        <Text
          className="text-white text-center text-md mb-7 mt-2"
          style={{fontFamily: 'Poppins-Bold'}}>
          Please Enter the OTP Sent to Your Email
        </Text>
        <View className="flex flex-row gap-10  justify-center">
          {InputBox.map((data, index) => (
            <View
              key={index}
              className="border-white border w-10 h-10 rounded-md items-center overflow-hidden">
              <TextInput
                placeholder="0"
                placeholderTextColor={'white'}
                className="text-white px-2"
                inputMode="numeric"
                value={otp[index]}
                onChangeText={text => handleText(index, text)}
                maxLength={1}
                ref={nextInputIndex === index ? input : null}
              />
            </View>
          ))}
        </View>
        <TouchableOpacity
          className="items-center justify-center mt-10 bg-green-600 h-14 w-14 rounded-full self-center"
          style={style.shadow}
          onPress={handleOtp}>
          <Icons name="checkcircleo" size={42} color="white" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
const style = StyleSheet.create({
  shadow: {
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity (0 - 1)
    shadowRadius: 3, // Shadow blur radius
    elevation: 5, // Elevation (Android only)
  },
});

export default OtpVerification;
