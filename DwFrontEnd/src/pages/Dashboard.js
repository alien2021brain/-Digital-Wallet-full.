import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import Lottie from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import BottomTab from '../components/BottomTab';

const Dashboard = ({navigation}) => {
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');

        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        // Error reading value
        console.log('Error reading value:', e);
      }
    };

    getData(); // Call the getData function inside the useEffect hook
  }, []);
  const People = Array(10).fill('');

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <View className="container mx-auto max-w-xs">
          <View className="navbar py-5 flex-row justify-between items-center mt-2 ">
            <View>
              <Text
                className="font-extrabold text-2xl"
                style={{fontFamily: 'Poppins-Black'}}>
                Hello!
              </Text>
              <Text className="">Sachin Pandey</Text>
            </View>
            <View className="relative">
              <Icon name="notifications-outline" size={30} />
              <View className="rounded-full bg-red-600 absolute -top-1 right-0 h-5 w-5 ">
                <Text className="text-white text-center">1</Text>
              </View>
            </View>
          </View>
          <View
            className="balance  rounded-xl border border-gray-300 mt-4"
            style={{
              shadowColor: '#000',
              shadowOffset: {
                x: 10,
                y: 10,
              },
              shadowOpacity: 1,
              shadowRadius: 1,
              elevation: 3,
            }}>
            <LinearGradient
              colors={['#4c669f', '#3b5998', '#192f6a']}
              className="flex-row items-center rounded-md ">
              <Lottie
                source={require('../../assets/animation_ll0poz8l.json')}
                autoPlay
                loop
                style={{height: 120}}
              />
              <View className="balance">
                <Text
                  className="text-[#F8F8FF] text-2xl mb-1"
                  style={{fontFamily: 'Poppins-Black'}}>
                  Total Balance
                </Text>
                <View className="flex-row items-center gap-3 ">
                  <Icon2 size={30} name="rupee" color="white" />
                  <Text
                    className="text-[#F8F8FF] text-2xl"
                    style={{fontFamily: 'Poppins-SemiBold'}}>
                    500000
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          <View className="features mt-10">
            <Text style={{fontFamily: 'Poppins-Bold'}} className="mb-5">
              Features
            </Text>
            <View className=" feature-container  flex-row flex-wrap items-center justify-between gap-5">
              <View className="feature-item">
                <TouchableOpacity
                  className="rounded-full bg-gray-100 p-3 items-center h-14 w-14 "
                  onPress={() => navigation.navigate('QRcode')}
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      x: 10,
                      y: 10,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 1,
                    elevation: 3,
                  }}>
                  <Icon2 name="qrcode" size={34} color="#0C6914" />
                </TouchableOpacity>

                <Text
                  style={{fontFamily: 'Poppins-Medium'}}
                  className="text-center">
                  Scan
                </Text>
              </View>

              <View className="feature-item">
                <TouchableOpacity
                  className="rounded-full bg-gray-200 p-3 items-center h-14 w-14 "
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      x: 10,
                      y: 10,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 1,
                    elevation: 3,
                  }}
                  onPress={() => navigation.navigate('Transfer')}>
                  <Icon2 name="send" size={30} color="#DD3224" />
                </TouchableOpacity>

                <Text style={{fontFamily: 'Poppins-Medium'}}>Transfer</Text>
              </View>
              <View className="feature-item">
                <TouchableOpacity
                  className="rounded-full bg-gray-100 p-3 items-center h-14 w-14 "
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      x: 10,
                      y: 10,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 1,
                    elevation: 3,
                  }}>
                  <Icon2 name="globe" size={34} color="#0C6914" />
                </TouchableOpacity>

                <Text style={{fontFamily: 'Poppins-Medium'}}>Internet</Text>
              </View>
              <View className="feature-item">
                <TouchableOpacity
                  className="rounded-full bg-gray-200 p-3 items-center h-14 w-14 "
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      x: 10,
                      y: 10,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 1,
                    elevation: 3,
                  }}>
                  <Icon name="wallet" size={30} color="#099091" />
                </TouchableOpacity>

                <Text
                  style={{fontFamily: 'Poppins-Medium'}}
                  className="text-center">
                  Wallet
                </Text>
              </View>
              <View className="feature-item">
                <TouchableOpacity
                  className="rounded-full bg-gray-200 p-3 items-center h-14 w-14 "
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      x: 10,
                      y: 10,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 1,
                    elevation: 3,
                  }}>
                  <Icon name="cash" size={30} color="#099091" />
                </TouchableOpacity>

                <Text
                  style={{fontFamily: 'Poppins-Medium'}}
                  className="text-center mt-1">
                  Bill
                </Text>
              </View>

              <View className="feature-item">
                <TouchableOpacity
                  className="rounded-full bg-gray-100 p-3 items-center h-14 w-14 "
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      x: 10,
                      y: 10,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 1,
                    elevation: 3,
                  }}>
                  <Icon2 name="signal" size={30} color="#EAAA00" />
                </TouchableOpacity>

                <Text style={{fontFamily: 'Poppins-Medium'}}>Top up</Text>
              </View>
              <View className="feature-item">
                <TouchableOpacity
                  className="rounded-full bg-gray-200 p-3 items-center h-14 w-14 "
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      x: 10,
                      y: 10,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 1,
                    elevation: 3,
                  }}>
                  <Icon2 name="history" size={34} color="#DD3224" />
                </TouchableOpacity>

                <Text
                  style={{fontFamily: 'Poppins-Medium'}}
                  className="text-center">
                  History
                </Text>
              </View>
              <View className="feature-item">
                <TouchableOpacity
                  className="rounded-full bg-gray-100 p-3 items-center h-14 w-14 "
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      x: 10,
                      y: 10,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 1,
                    elevation: 3,
                  }}>
                  <Icon2 name="th-large" size={30} color="#EAAA00" />
                </TouchableOpacity>

                <Text
                  style={{fontFamily: 'Poppins-Medium'}}
                  className="text-center">
                  More
                </Text>
              </View>
            </View>
            {/* number
          <View className="phone items-center mt-5 ">
            <Text
              className="bg-gray-200 py-1 px-3 rounded-3xl "
              style={{fontFamily: 'Poppins-Medium'}}>
              PHONE NO: 8859331535
            </Text>
          </View> */}
            {/* People */}
            <View className="mb-14">
              <Text style={{fontFamily: 'Poppins-Bold'}} className="mb-7">
                People
              </Text>

              <View className="flex-row  items-center flex-wrap gap-10">
                {People.map((_, index) => (
                  <View key={index}>
                    <View className="bg-gray-300 rounded-full h-12 w-12 items-center justify-center ">
                      <Text
                        className="text-3xl items-center justify-center"
                        style={{fontFamily: 'Poppins-Bold'}}>
                        S
                      </Text>
                    </View>
                    <Text className="text-center">Sachin</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* BottomTab  */}
      <View className="absolute bottom-0 w-full h-16">
        <BottomTab navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
