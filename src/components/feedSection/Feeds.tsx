import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View, ActivityIndicator, SafeAreaView, Dimensions, Linking } from "react-native";
import { fetchNewsResults } from "./FetchFeed"; // Adjust the path as per your file structure
import CardImageText from "../commenComponents/CardImageText";
import { Divider } from "react-native-paper";

const NewsApi: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const fetchedNews = await fetchNewsResults();
      setNews(fetchedNews);
      setLoading(false);
    };

    loadNews();
  }, []);

  const CardWidth=Dimensions.get("window").width

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={news}
            keyExtractor={(item, index) => `${item.title}-${index}`}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 16 }}
            renderItem={({ item }) => (
              <>
              <TouchableOpacity onPress={() => console.log("Selected:", item.url)}>
                <CardImageText imageUrl={item.urlToImage} title={item.title} width={CardWidth-20} height={250} maxLineTitle={3} onPress={() => {Linking.openURL(item.url)}}/>
              </TouchableOpacity>
              <Divider/>
              </>
              
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default NewsApi;
