import React, { useState, useRef } from 'react';
import { View, Text, Modal, FlatList, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';

export default function Third() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const data = [
    { id: '1', image: 'https://via.placeholder.com/150', text: 'Item 1' },
    { id: '2', image: 'https://via.placeholder.com/150', text: 'Item 2' },
    // Add more items as needed
  ];

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);

    // Reset slide animation and start sliding in
    slideAnim.setValue(0);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item.image)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text>{item.text}</Text>
    </TouchableOpacity>
  );

  const renderModal = () => {
    if (!selectedImage) return null;

    const slideInStyle = {
      transform: [{
        translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [500, 0] // Slide up from 500 units below to original position
        }),
      }],
    };

    return (
      <Modal visible={modalVisible} transparent={true} animationType="none">
        <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
          <Animated.View style={[styles.modalContent, slideInStyle]}>
            <Image source={{ uri: selectedImage }} style={styles.modalImage} />
            <Text>Image Details</Text>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {renderModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});
