import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
interface ButtonProps {
    imagePath: any;
    size?:number
    color?:string
  }

const Button1: React.FC<ButtonProps> = ({
    imagePath,
    size=20,
    color="#2a2a2a"
}) =>{

    return(
        <View style={[styles.button,{backgroundColor:color}]}>
            <TouchableOpacity style={styles.imagestyle}>
             <Avatar.Image
            source={imagePath}
            size={size}
            style={[{backgroundColor:color}]}
          />
          </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
    button:{
        justifyContent:'center',
        borderRadius: 30,
        height: 60,
        width: 80,
        
    },
    imagestyle:{
        // flex:1,
        alignItems:'center',
    }
})

export default Button1;