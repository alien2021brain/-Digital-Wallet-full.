import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomTab = ({navigation}) => {
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      className="h-full ">
      <View className="flex-row max-w-xs justify-between items-center mx-auto   h-full w-full">
        <View className="Home">
          <Icon2 name="home" size={40} color="#F8F8FF" />
        </View>
        <TouchableOpacity
          className="Account"
          onPress={() => navigation.navigate('AboutUser')}>
          <Icon2 name="user-circle-o" size={40} color="#F8F8FF" />
        </TouchableOpacity>
        <View className="Setting">
          <Icon name="settings" size={40} color="#F8F8FF" />
        </View>
      </View>
    </LinearGradient>
  );
};

export default BottomTab;
