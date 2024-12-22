import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface CardPhotosSearchProps {
  imageUrl: string;
  title: string;
}

const CardPhotosSearch: React.FC<CardPhotosSearchProps> = ({ imageUrl, title }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
    backgroundColor: '#000000',
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  text: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default CardPhotosSearch;
