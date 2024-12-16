import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
interface SmallCard2Props {
    imagePath: any;
    size?:number
    color?:string
    text1?:string
    text2?:string
  }

const SmallCard2: React.FC<SmallCard2Props> = ({
    imagePath,
    size=20,
    color="#2a2a2a",
    text1,
    text2
}) =>{

    return(
        <View style={[styles.button,{backgroundColor:'#2a2a2a'}]}>
            <View style={styles.innertyle}>
            <Avatar.Image
            source={imagePath}
            size={size}
            style={[{backgroundColor:'#2a2a2a'}]}
          />
            <Text style={styles.textstyle1}>
                {text1}
            </Text>
           
         
            </View>
            <Text style={[styles.textstyle,{marginLeft:15}]}>{text2}</Text>
          
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
    },
    textstyle:{
        width:'70%',
        fontSize:10,
        marginTop:15,
        color:"#ffffff"
    },
    textstyle1:{
        width:'70%',
        fontSize:13,
        marginLeft:8,
        color:"#96abce"
    }
})

export default SmallCard2;