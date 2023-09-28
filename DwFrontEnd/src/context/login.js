import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = React.createContext();

export const AuthContextProvider = ({children}) => {
  console.log(API_URL);
  const [currentUser, setCurrentUser] = React.useState([]);

  // saving in local storage
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async value => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, value, {
        withCredentials: true,
      });
      setCurrentUser(res.data);
      storeData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(currentUser);

  return (
    <AuthContext.Provider value={{signIn, currentUser, setCurrentUser}}>
      {children}
    </AuthContext.Provider>
  );
};
