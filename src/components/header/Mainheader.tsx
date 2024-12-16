import React, { FunctionComponent, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {Avatar, Card, Icon, IconButton} from 'react-native-paper';
import MenuModal from "./MenuModal";
// import Icon from 'react-native-vector-icons/Entypo';


const Mainheader:React.FC=() =>{

    const [isModalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => setModalVisible(true);
    const handleCloseModal = () => setModalVisible(false);
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
return(
    <View style={[style.flask,{height:windowHeight*0.1,width:windowWidth-20}]}>
          <Avatar.Image source={require('../../assets/images/labflask.png')} size={35} style={{backgroundColor:'#1E1E1E',marginTop:5}}/>

        <View style={[style.centermain,{height:windowHeight/10-25,width:windowWidth/3+10}]}>
                <View style={[style.centerin]}>

                        <Avatar.Image source={require('../../assets/images/googlelogo.png')} size={30} style={{backgroundColor:'#1E1E1E'}}/>

                        <Text style={{color:"#ffffff",marginTop:4,marginStart:5,fontSize:16}}>
                         Search
                        </Text>

                </View>

                <Avatar.Image source={require('../../assets/images/geminilogo.png')} style={{backgroundColor:'#2a2a2a',marginEnd:10}} size={25}/>
        </View>
            <TouchableOpacity onPress={handleOpenModal}>
            <Avatar.Image source={require('../../assets/images/letterlogo.png')} size={35} style={{marginTop:5}}/>
            </TouchableOpacity>
            <MenuModal isVisible={isModalVisible} onClose={handleCloseModal} />
    </View>
  
    
)


}

const style= StyleSheet.create({
    flask:{
        flexDirection:'row',
        marginHorizontal:'auto',
        marginVertical:40,
        justifyContent:"space-between"
        
    },
    centerin:{
        flexDirection:"row",
        backgroundColor:"#1E1E1E",
        marginStart:5,
        padding:10,
        borderRadius:10

    },
    centermain:{
        backgroundColor:"#2a2a2a",
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius:10,
        marginTop:-10
    }
})

export default Mainheader;