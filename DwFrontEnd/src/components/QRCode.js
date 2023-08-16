import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import BottomTab from './BottomTab';
import Icon from 'react-native-vector-icons/Ionicons';
let logoFromFile = require('../../assets/images/favicon.png');
const QRCodeGen = ({navigation}) => {
  return (
    <>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        className="flex-1 px-5 py-5  ">
        <View className="head flex-row gap-2 mt-5 items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon size={30} name="arrow-back" color="white" />
          </TouchableOpacity>
          <Text
            className="text-white text-lg"
            style={{fontFamily: 'Poppins-Bold'}}>
            QR Code
          </Text>
        </View>
        <View className=" flex-1 items-center justify-center">
          <QRCode
            value="http://awesome.link.qr"
            logo={logoFromFile}
            logoSize={30}
            backgroundColor="white"
            size={300}
          />
        </View>
      </LinearGradient>
      <View className="absolute bottom-0 w-full h-16">
        <BottomTab navigation={navigation} />
      </View>
    </>
  );
};

export default QRCodeGen;
