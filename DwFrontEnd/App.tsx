import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';
import Splash from './src/pages/Splash';
import {NavigationContainer} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/pages/Login';
import SignUp from './src/pages/SignUp';
import Dashboard from './src/pages/Dashboard';
import OTP from './src/pages/OtpVerification';
import Transfer from './src/pages/Transfer';
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OtpVerification"
          component={OTP}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Transfer"
          component={Transfer}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
