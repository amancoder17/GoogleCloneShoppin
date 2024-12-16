import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
interface SmallCard1Props {
    imagePath: any;
    size?:number
    color?:string
    text1?:string
    text2?:string
  }

const SmallCard1: React.FC<SmallCard1Props> = ({
    imagePath,
    size=20,
    color="#2a2a2a",
    text1,
    text2
}) =>{

    return(
        <View style={[styles.button,{backgroundColor:"#2a2a2a"}]}>
            <Text style={[styles.textstyle1,{marginLeft:15}]} numberOfLines={1}>{text1}</Text>
            <View style={styles.innertyle}>
            <Text style={styles.textstyle} numberOfLines={1}>
                {text2}
            </Text>
             <Avatar.Image
            source={imagePath}
            size={size}
            style={[{backgroundColor:color}]}
          />
         
            </View>
          
        </View>
    )
}

const styles=StyleSheet.create({
    button:{
        justifyContent:'center',
        borderRadius: 20,
        height: 100,
        width: 160,
        
    },
    innertyle:{
        // flex:1,
        flexDirection:'row',
        marginHorizontal:'auto',
        marginTop:10
    },
    textstyle:{
        width:'70%',
        fontSize:15,
        color:"#ffffff"
    },
    textstyle1:{
        width:'70%',
        fontSize:13,
        color:"#ffffff"
    }
})

export default SmallCard1;