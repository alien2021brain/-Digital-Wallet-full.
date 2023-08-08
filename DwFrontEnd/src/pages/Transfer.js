import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomTab from '../components/BottomTab';

const Transfer = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="container mx-auto max-w-xs">
        <View className="head flex-row gap-2 mt-5 items-center">
          <Icon size={30} name="arrow-back" color="#3b5998" />
          <Text
            className="text-[#3b5998] text-lg"
            style={{fontFamily: 'Poppins-Bold'}}>
            Transfer
          </Text>
        </View>
        <View className="where flex-row justify-between mt-10">
          <View>
            <Text
              className="text-xl text-[#3b5998]"
              style={{fontFamily: 'Poppins-Black'}}>
              Where
            </Text>
            <Text
              style={{fontFamily: 'Poppins-Black'}}
              className="text-xl text-[#3b5998]">
              to Send?
            </Text>
          </View>
          <Icon name="qr-code" size={32} color="#3b5998" />
        </View>
        <View className="transfer-Box flex gap-5 mt-5">
          {/* wallet to Contact */}
          <View className="wallet rounded-lg flex-row justify-evenly items-center bg-green-900/5 px-3 py-7">
            <View className="bg-green-600 rounded-md items-center justify-center h-10 w-10 ">
              <Icon name="phone-portrait-outline" size={28} color="white" />
            </View>
            <View className="">
              <Text className="text-xs" style={{fontFamily: 'Poppins-Light'}}>
                Transfer your money
              </Text>
              <Text className="" style={{fontFamily: 'Poppins-Black'}}>
                Pay Phone Number
              </Text>
            </View>
          </View>

          <View className="wallet rounded-lg flex-row justify-evenly items-center bg-red-100 px-3 py-7">
            <View className="bg-yellow-600 rounded-md items-center justify-center h-10 w-10 ">
              <Icon name="wallet-outline" size={28} color="white" />
            </View>
            <View className="">
              <Text className="text-xs" style={{fontFamily: 'Poppins-Light'}}>
                Transfer your money
              </Text>
              <Text className="" style={{fontFamily: 'Poppins-Black'}}>
                Wallet to Wallet
              </Text>
            </View>
          </View>
          {/* wallet to Bank */}
          <View className="wallet rounded-lg flex-row justify-evenly items-center bg-blue-900/5 px-3 py-7 mb-5">
            <View className="bg-blue-600 rounded-md items-center justify-center h-10 w-10 ">
              <Icon name="home-outline" size={28} color="white" />
            </View>
            <View className="">
              <Text className="text-xs" style={{fontFamily: 'Poppins-Light'}}>
                Transfer your money
              </Text>
              <Text className="" style={{fontFamily: 'Poppins-Black'}}>
                Wallet to Bank
              </Text>
            </View>
          </View>
          <View className="id items-center justify-center">
            <Text className="bg-gray-300 rounded-3xl py-1 px-3">
              WALLET ID: 1111sachin2021
            </Text>
          </View>
        </View>
      </View>
      {/* BottomTab  */}
      <View className="absolute bottom-0 w-full h-16">
        <BottomTab />
      </View>
    </SafeAreaView>
  );
};

export default Transfer;
