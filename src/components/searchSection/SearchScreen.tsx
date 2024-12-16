import React, { useState, useRef } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Linking,
} from "react-native";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { fetchBingResults } from "./SearchApi";

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const navigation = useNavigation();

  const handleSearch = async (query: string) => {
    if (query.length < 3) {
      setResults([]);
      return;
    }
    const fetchedResults = await fetchBingResults(query);
    setResults(fetchedResults);
  };

  const handleTextChange = (text: string) => {
    setSearchQuery(text);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      handleSearch(text);
    }, 300);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity >
          <Avatar.Image
            source={require("../../assets/images/googlelogo.png")}
            size={25}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={handleTextChange}
        />
        {searchQuery.length > 0 ? (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Avatar.Image
              source={require("../../assets/images/close.png")}
              size={25}
              style={styles.icon}
            />
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity>
              <Avatar.Image
                source={require("../../assets/images/mic.png")}
                size={25}
                style={styles.icon1}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Avatar.Image
                source={require("../../assets/images/lens.png")}
                size={25}
                style={styles.icon1}
              />
            </TouchableOpacity>
          </>
        )}
      </View>

  

      {/* Search Results */}
      <View style={styles.container}>
        {results.length > 0 && (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.resultItem} onPress={() => {Linking.openURL(item.url)}}>
                <View style={{flexDirection:'row',justifyContent:"space-between"}}>
                <Text style={styles.resultTitle}>{item.name}</Text>
                 <Avatar.Image
                source={require("../../assets/images/leftarrow.png")}
                size={20}
                style={styles.recentIcon}
              />
              </View>
                <Text style={styles.resultUrl}>{item.url}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 12,
    height: 50,
    borderRadius: 25,
    margin: 16,
  },
  icon: {
    backgroundColor: "#2a2a2a",
  },
  icon1: {
    backgroundColor: "#2a2a2a",
    marginHorizontal:12
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    marginHorizontal: 8,
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  resultItem: {
    // backgroundColor: "#1e1e1e",
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
  },
  resultTitle: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
  },
  resultUrl: {
    fontSize: 14,
    color: "#aaa",
  },
  recentSearchContainer: {
    paddingHorizontal: 16,
  },
  recentTitle: {
    color: "#aaa",
    fontSize: 16,
    marginBottom: 8,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  recentIcon: {
    marginRight: 8,
    backgroundColor:"#000"
  },
  recentText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default SearchScreen;
