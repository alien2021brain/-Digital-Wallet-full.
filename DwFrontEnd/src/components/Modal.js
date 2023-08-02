import React from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';

export const RenderItem = ({item, setCountry, setModalOpen}) => {
  const handleClick = () => {
    setCountry(item);
    setModalOpen(false);
  };

  return (
    <TouchableOpacity className="mb-2" onPress={handleClick} key={item.id}>
      <View className="flex flex-row items-center gap-5">
        <Image
          style={{width: 50, height: 50, resizeMode: 'contain'}}
          source={{
            uri: item.flag,
          }}
          className=" border h-2 w-2 rounded-md "
        />
        <Text style={{color: 'black'}}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ModalFunc = ({modalOpen, setModalOpen, data, setCountry}) => {
  return (
    <Modal
      animationType="slide"
      visible={modalOpen}
      onRequestClose={() => {
        setModalOpen(!modalOpen);
      }}
      transparent={true}>
      <Pressable
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 22,
        }}
        onPress={() => setModalOpen(false)}>
        <View
          style={{
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            height: 600,
          }}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <RenderItem
                item={item}
                setCountry={setCountry}
                setModalOpen={setModalOpen}
              />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default ModalFunc;
