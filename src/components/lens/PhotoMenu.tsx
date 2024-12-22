import React from 'react';
import { Dimensions, StyleSheet, Touchable, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { dummyImage } from '../../dummy';
import CardPhotosSearch from '../commenComponents/CardPhotosSearch';

const cardWidth = Dimensions.get('window').width / 2 - 20;

const PhotoMenu = () => {
  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity  style={styles.cardContainer}>
        <CardPhotosSearch imageUrl={item.url} title={item.data} />
      </TouchableOpacity>
   
    );
  };

  return (
    
      <FlatList
        data={dummyImage}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        scrollEnabled={true}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        
      />
    
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
    paddingBottom:310
  },
  cardContainer: {
    flex: 1,
    margin: 5, // Space between cards
    maxWidth: cardWidth,
  },
});

export default PhotoMenu;
