import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Avatar } from 'react-native-paper';
import { footer } from '../../dummy';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../RootStackParamList';

const Footer: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    const handleTextChange = () => {
        navigation.navigate('SearchScreen');
      };
  const renderSmall = ({ item }: { item: any }) => {
    return item.id == 2 ? (
      <TouchableOpacity style={styles.tab} onPress={()=>handleTextChange()}>
        <Avatar.Image
          source={item.pic}
          size={item.size}
          style={styles.avatar}
          
        />
        <Text style={styles.text}>{item.text}</Text>
      </TouchableOpacity> ): (
      <TouchableOpacity style={styles.tab}>
        <Avatar.Image
          source={item.pic}
          size={item.size}
          style={styles.avatar}
          
        />
        <Text style={styles.text}>{item.text}</Text>
      </TouchableOpacity> )
    ;
  };

  return (
    <View style={styles.footer}>
      <FlatList
        data={footer}
        renderItem={renderSmall}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#121212', 
    paddingVertical: 10,
  },
  flatList: {
    justifyContent:'space-evenly',
    width:"100%",
    paddingHorizontal: 10,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  avatar: {
    backgroundColor: '#121212',
  },
  text: {
    color: '#fff',
    fontSize: 11,
    marginTop: 6,
    fontWeight: '500',
  },
});

export default Footer;
