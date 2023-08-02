import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Butttons = props => {
  console.log(props);
  return (
    <TouchableOpacity
      className={` px-12 py-3 rounded-md mb-5  ${props.custom}`}
      onPress={
        props.name == 'SignUp' ? props.handleSignUp : props.handleSignIn
      }>
      <Text
        className="text-white text-2xl"
        style={{fontFamily: 'Poppins-Bold'}}>
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};

export default Butttons;
