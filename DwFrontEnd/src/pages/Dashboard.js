import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
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

  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  );
};

export default Dashboard;
