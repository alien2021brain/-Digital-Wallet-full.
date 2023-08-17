import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconi from 'react-native-vector-icons/Ionicons';
import BottomTab from '../components/BottomTab';
import ProfileModal from '../components/ProfileModal';

const AboutUser = ({navigation}) => {
  const [show, setShow] = useState(false);

  return (
    <View className="aboutUser flex-1">
      <View className="container max-w-xs mx-auto flex-1">
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          className="p-10 rounded-lg justify-evenly items-center flex-row mt-16 mb-10 relative">
          <TouchableOpacity
            onPress={() => setShow(true)}
            className="profile border h-14 w-16 rounded-lg overflow-hidden ">
            <Image
              source={{
                uri: 'https://m.media-amazon.com/images/M/MV5BN2UxOTMxY2UtN2VjZS00YTIyLWE4ODktNTgyMDIzNDRjMTdkXkEyXkFqcGdeQXVyMTMxMzcxODk1._V1_.jpg',
              }}
              className="h-full w-full"
              resizeMode="cover"
            />
          </TouchableOpacity>

          <View className="userdetails">
            <Text className="text-white" style={{fontFamily: 'Poppins-Black'}}>
              Sachin Pandey
            </Text>
            <Text className="text-white">+1 8859331535</Text>
          </View>
          <View className="modal absolute top-5">
            <ProfileModal setModalVisible={setShow} modalVisible={show} />
          </View>
        </LinearGradient>

        <View className="categories gap-10">
          <View className="flex-row justify-between items-center">
            <View className="flex-row gap-2 items-center">
              <Icon name="money" color="#3b5998" size={30} />
              <Text className="text-gray-400">Balance</Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <Text className="text-gray-400">1000.00</Text>
              <Icon name="chevron-right" color="gray" />
            </View>
          </View>
          {/* orcode */}
          <TouchableOpacity
            onPress={() => navigation.navigate('QRcodeGen')}
            className="flex-row justify-between items-center">
            <View className="flex-row gap-2 items-center">
              <Icon name="qrcode" color="#3b5998" size={30} />
              <Text className="text-gray-400">OR Code</Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <Icon name="chevron-right" color="gray" />
            </View>
          </TouchableOpacity>
          {/* password */}
          <View className="flex-row justify-between items-center">
            <View className="flex-row gap-2 items-center">
              <Icon name="eye-slash" color="#3b5998" size={30} />
              <Text className="text-gray-400">Password</Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <Text className="text-gray-400">123*******</Text>
              <Icon name="chevron-right" color="gray" />
            </View>
          </View>
          {/* finger print  */}
          <View className="flex-row justify-between items-center">
            <View className="flex-row gap-2 items-center">
              <Iconi name="finger-print-outline" color="#3b5998" size={30} />
              <Text className="text-gray-400">Finger Print</Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <Icon name="chevron-right" color="gray" />
            </View>
          </View>
          {/* email */}
          <View className="flex-row justify-between items-center">
            <View className="flex-row gap-2 items-center">
              <Icon name="envelope-o" color="#3b5998" size={30} />
              <Text className="text-gray-400">Email</Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <Text className="text-gray-400">sachin@gmail.com</Text>
              <Icon name="chevron-right" color="gray" />
            </View>
          </View>
          {/* Signout */}
          <TouchableOpacity className="self-end  bg-slate-950/5 px-3 py-2 rounded-lg">
            <Text
              style={{fontFamily: 'Poppins-Bold'}}
              className="text-[#3b5998]">
              Signout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="absolute bottom-0 w-full h-16">
        <BottomTab navigation={navigation} />
      </View>
    </View>
  );
};

export default AboutUser;
