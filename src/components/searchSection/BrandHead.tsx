import React from "react";
import { Image, StyleSheet, View } from "react-native";

const BrandHead:React.FC= ()=>{
    return(
        <View>
            <View style={styles.brandhead}>
        <Image source={require('../../assets/images/googlebrand.png')} style={[styles.brandlogo]} />
      </View>
        </View>
    )
}

const styles= StyleSheet.create({
    brandhead:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    brandlogo: {
        width: 150,
        height: 45,
        resizeMode: 'center'
      },
})

export default BrandHead;