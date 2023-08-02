import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useQuery} from 'react-query';
import axios from 'axios';
import Modal from '../components/Modal';
import DocumentPicker from 'react-native-document-picker';

const SignUp = ({navigation}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [user, setUser] = useState({
    username: '',
    email: '',
    phoneno: '',
    password: '',
    profile: '',
  });
  const [country, setCountry] = useState({
    code: '+9',
    flag: 'https://flagcdn.com/w320/in.png',
    shortName: 'IN',
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get('https://restcountries.com/v3.1/all');
        const newdata = res.data.map(item => ({
          name: item.name.common,
          shortName: item.cca2,
          code: item.idd.root,
          flag: item.flags.png,
        }));
        setData(newdata);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchCountries();
  }, []);

  const handleProfile = async () => {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    });
    console.log(res, 'image');
    const form = new FormData();
    form.append('file', res[0]);

    try {
      const res = await axios.post(
        'http://192.168.1.6:8000/uploads/single',
        form,
        {
          withCredentials: true,
        },
      );
      console.log(res, 'response');
      setUser(pre => ({
        ...pre,
        profile: res.data,
      }));
    } catch (error) {
      console.log('something went rong', error);
    }
  };
  console.log('user', user);

  const handleInput = (name, text) => {
    setUser(pre => ({
      ...pre,
      [name]: text,
    }));
  };
  const handleSubmit = async () => {
    try {
      await axios.post('http://192.168.1.6:8000/auth/register', user, {
        withCredentials: true,
      });
      navigation.replace('OtpVerification');
    } catch (error) {
      console.log('something went rong', error);
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      className="flex-1 px-5 py-5 ">
      <View className="top flex flex-row gap-5 items-baseline mt-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            color="white"
            size={24}
            name="arrow-left"
            style={{fontFamily: 'Poppins-Medium'}}
          />
        </TouchableOpacity>
        <Text
          className="text-2xl text-white"
          style={{fontFamily: 'Poppins-Medium'}}>
          Sigup
        </Text>
      </View>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView
          className="flex gap-5 mt-10"
          showsVerticalScrollIndicator={false}>
          <View className="formcontrol">
            <Text className="text-white" style={{fontFamily: 'Poppins-Medium'}}>
              Username
            </Text>
            <View className="flex flex-row">
              <View className="h-10 border border-white w-12 items-center justify-center bg-gray-400">
                <Icon size={32} name="user" />
              </View>
              <TextInput
                placeholder="JohnSmith"
                placeholderTextColor={'white'}
                style={{fontFamily: 'Poppins-Light'}}
                className="border border-white p-2 rounded-r-md h-10 flex-1 text-white focus:border-red-400"
                onChangeText={text => handleInput('username', text)}
              />
            </View>
          </View>
          <View className="formcontrol">
            <Text className="text-white" style={{fontFamily: 'Poppins-Medium'}}>
              Email
            </Text>
            <View className="flex flex-row">
              <View className="h-10 border border-white w-12 items-center justify-center bg-gray-400">
                <MIcon size={32} name="email" />
              </View>
              <TextInput
                placeholder="john@gmail.com"
                placeholderTextColor={'white'}
                style={{fontFamily: 'Poppins-Light'}}
                className="border border-white p-2 rounded-r-md h-10 flex-1 text-white focus:border-red-400"
                onChangeText={text => handleInput('email', text)}
              />
            </View>
          </View>
          <View className="formcontrol">
            <Text className="text-white" style={{fontFamily: 'Poppins-Medium'}}>
              Phone No
            </Text>
            <View className="flex flex-row">
              <TouchableOpacity
                className=" border-white w-12 h-10 border overflow-hidden"
                onPress={() => setModalOpen(true)}>
                <Image
                  source={{
                    uri: country.flag,
                  }}
                  style={{resizeMode: 'cover'}}
                  className="h-10"
                />
              </TouchableOpacity>
              <TextInput
                placeholder={`${country.code}`}
                placeholderTextColor={'white'}
                style={{fontFamily: 'Poppins-Light'}}
                className="border border-white p-2 rounded-r-md h-10 flex-1 focus:border-red-400 text-white"
                onChangeText={text =>
                  handleInput('phoneno', `${country.code}` + text)
                }
              />
            </View>
          </View>
          <View className="formcontrol">
            <Text className="text-white" style={{fontFamily: 'Poppins-Medium'}}>
              Password
            </Text>
            <View className="flex flex-row">
              <View className="h-10 border border-white w-12 items-center justify-center bg-gray-400">
                <MIcon size={32} name="lock" />
              </View>
              <TextInput
                placeholder="***************"
                placeholderTextColor={'white'}
                style={{fontFamily: 'Poppins-Light'}}
                className="border text-white border-white p-2 rounded-r-md h-10 flex-1 focus:border-red-400"
                secureTextEntry={true}
                onChangeText={text => handleInput('password', text)}
              />
            </View>
          </View>
          <View className="formcontrol">
            <Text className="text-white" style={{fontFamily: 'Poppins-Medium'}}>
              Confirm Password
            </Text>
            <View className="flex flex-row">
              <View className="h-10 border  border-white w-12 items-center justify-center bg-gray-400">
                <MIcon size={32} name="lock" />
              </View>
              <TextInput
                placeholder="***************"
                placeholderTextColor={'white'}
                style={{fontFamily: 'Poppins-Light'}}
                className="border text-white border-white p-2 rounded-r-md h-10 flex-1 focus:border-red-400"
                secureTextEntry={true}
                onChangeText={text => handleInput('password', text)}
              />
            </View>
          </View>

          <View className="formcontrol">
            <Text className="text-white" style={{fontFamily: 'Poppins-Medium'}}>
              Profile
            </Text>

            <Pressable className="flex flex-row" onPress={handleProfile}>
              <View className="h-10 border border-white w-12 items-center justify-center bg-gray-400">
                <MIcon size={32} name="face-man-profile" />
              </View>
              <TextInput
                placeholder="Choose Profile"
                placeholderTextColor={'white'}
                style={{fontFamily: 'Poppins-Light'}}
                className="border border-white p-2 rounded-r-md h-10 flex-1 focus:border-red-400"
              />
            </Pressable>
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
              SignUp
            </Text>
          </TouchableOpacity>
          <Modal
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            data={data}
            setCountry={setCountry}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default SignUp;
