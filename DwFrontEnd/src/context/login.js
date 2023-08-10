import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';
export const AuthContext = React.createContext();

export const AuthContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = React.useState([]);
  const signIn = async value => {
    try {
      const res = await axios.post(
        'http://192.168.1.6:8000/auth/login',
        value,
        {
          withCredentials: true,
        },
      );
      setCurrentUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, []);

  return (
    <AuthContext.Provider value={{signIn, currentUser}}>
      {children}
    </AuthContext.Provider>
  );
};
