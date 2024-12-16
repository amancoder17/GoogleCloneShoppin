import React from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList } from 'react-native';
import Mainheader from './components/header/Mainheader';
import Search from './components/searchSection/Search';
import Button1 from './components/commenComponents/Button1';
import { buttonData, smallCard } from './dummy';
import { Divider } from 'react-native-paper';
import SmallCard1 from './components/commenComponents/SmallCard1';
import SmallCard2 from './components/commenComponents/SmallCard2';
import Feeds from './components/feedSection/Feeds';
import BrandHead from './components/searchSection/BrandHead';
import Footer from './components/footer/Footer';

const Index: React.FC = () => {

  const renderButton=({item,index}:{item:any,index:number})=>{
    return(
      <View style={{marginHorizontal:10}}>
       <Button1 imagePath={item.pic} size={item.size} color={item.bgcolor}/>
      </View>
    )
  }
  const renderSmall = ({ item, index }: { item: any; index: number }) => {
    return item.id < 3 ? (
      <View style={{ marginHorizontal: 10 }}>
        <SmallCard1 imagePath={item.pic} size={item.size} color={item.color} text1={item.text1} text2={item.text2} />
      </View>
    ) : (
      <SmallCard2 imagePath={item.pic} text1={item.text1} text2={item.text2} color={item.color} size={item.size} />
    );
  };

  return (
    <>
    <ScrollView 
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[2]}
      style={{backgroundColor:"#1E1E1E"}}
    >
      <View style={[styles.container, { backgroundColor: "#1E1E1E" }]}>
        <Mainheader />
      </View>
      <BrandHead/>
      <View style={styles.stickyHeader}>
        <Search />
      </View>
      <View style={styles.list}>
        <FlatList
          data={buttonData}
          renderItem={renderButton}
          horizontal
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentPadding}
          keyExtractor={(_, index) => index.toString()}
        />
        <Divider style={styles.divider} />
      </View>
      <View style={styles.list1}>
        <FlatList
          data={smallCard}
          renderItem={renderSmall}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.contentPadding}
        />
      </View>
      <Feeds />
    </ScrollView>
    <Footer/>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor:"#1E1E1E" },
  stickyHeader: { backgroundColor: '#1E1E1E', zIndex: 10 },
  list: { width: "100%", padding: 12, paddingTop: -5 , backgroundColor:"#1E1E1E"},
  divider: { marginTop: 20 },
  list1: {backgroundColor:"#1E1E1E"},
  marginHorizontal: { marginHorizontal: 10 },
  contentPadding: { paddingRight: 10 }
});

export default Index;
