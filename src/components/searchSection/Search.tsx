import React, { useState, useEffect, useRef } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { fetchBingResults } from "./SearchApi";
import { Avatar } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../RootStackParamList";
const { width, height } = Dimensions.get('window');


const Search: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()


  const handleTextChange = () => {
    navigation.navigate('SearchScreen');
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <View style={{flexDirection:"row"}}>
          <Avatar.Image source={require('../../assets/images/search.png')} size={25} style={styles.icon} />
          
          <TouchableOpacity onPress={()=>handleTextChange()}>
          <Text
            style={styles.input}
          >
            Search
          </Text>
          </TouchableOpacity>
          </View>
         
<View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => console.log('Microphone pressed')}>
            <Avatar.Image source={require('../../assets/images/mic.png')} size={25} style={styles.icon2} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Camera pressed')}>
          <Avatar.Image source={require('../../assets/images/lens.png')} size={25} style={styles.icon} />
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
    justifyContent: "space-between",
    borderRadius: 50,
    backgroundColor: '#2a2a2a',
    paddingHorizontal: width * 0.04, // 4% padding
    height: height * 0.08, // 8% of screen height
    width: width * 0.9, // 90% of screen width
  },
  icon: {
    marginHorizontal: width * 0.02, // 2% margin
    backgroundColor: "#2a2a2a"
  },
  icon2: {
    marginRight: width * 0.04, // 4% margin
    backgroundColor: "#2a2a2a"
  },
  input: {
    fontSize: width * 0.045, // Responsive font size
    color: '#808284',
    width: width * 0.5, // Adjust width dynamically
    // height: height * 0.04, // Adjust height dynamically
  },
});


// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     alignItems: 'center',
//   },
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent:"space-between",
//     borderRadius: 50,
//     backgroundColor: '#2a2a2a',
//     paddingHorizontal: 12,
//     height: 70,
//     width: '90%',
//   },
//   icon: {
//     marginHorizontal: 8,
//     backgroundColor:"#2a2a2a"
//   },
//   icon2: {
//     marginRight: 18,
//     backgroundColor:"#2a2a2a"
//   },
//   input: {
//     fontSize: 18,
//     color: '#808284',
//     width:200,
//     height:30
//   },
// });

export default Search;
