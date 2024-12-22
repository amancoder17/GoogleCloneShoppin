import React, {useState, useEffect, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../RootStackParamList';
const {width, height} = Dimensions.get('window');

const Search: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleTextChange = () => {
    navigation.navigate('SearchScreen');
  };
  const handleCamera = () => {
    navigation.navigate('GoogleLens');
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <View style={{flexDirection: 'row'}}>
            <Avatar.Image
              source={require('../../assets/images/search.png')}
              size={25}
              style={styles.icon}
            />

            <TouchableOpacity onPress={() => handleTextChange()}>
              <Text style={styles.input}>Search</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => console.log('Microphone pressed')}>
              <Avatar.Image
                source={require('../../assets/images/mic.png')}
                size={25}
                style={styles.icon2}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCamera()}>
              <Avatar.Image
                source={require('../../assets/images/lens.png')}
                size={25}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 50,
    backgroundColor: '#2a2a2a',
    paddingHorizontal: width * 0.04, 
    height: height * 0.08, 
    width: width * 0.9, 
  },
  icon: {
    marginHorizontal: width * 0.02,
    backgroundColor: '#2a2a2a',
  },
  icon2: {
    marginRight: width * 0.04, 
    backgroundColor: '#2a2a2a',
  },
  input: {
    fontSize: width * 0.045, 
    color: '#808284',
    width: width * 0.5, 
  },
});


export default Search;
