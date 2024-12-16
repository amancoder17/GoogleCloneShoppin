import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

interface CardImageTextProps {
  title: string;
  description?: string;
  tagText?: string;
  imageUrl: string;
  width?: number;
  height?: number;
  maxLineTitle?: number;
  maxLineDescription?: number;
  onPress?: () => void;
  accessibilityLabel?: string;
  accessibilityRole?: any;
}

const CardImageText: React.FC<CardImageTextProps> = ({
  title,
  description = '',
  tagText = '',
  imageUrl,
  width = 150,
  height = 180,
  maxLineTitle = 1,
  maxLineDescription = 2,
  onPress,
  accessibilityLabel = 'Press me',
  accessibilityRole = 'button',
}) => {


  return (
    <View style={{margin: 8}}>
      <TouchableRipple
        onPress={onPress}
        style={[styles.card, {maxWidth: width, height: height}]}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={accessibilityRole}
        accessible={true}>
        <View>    
            <Image source={{uri:imageUrl}} style={{width: width, height: height * 0.8}}/>
          {tagText && (
            <Text
              style={[
                {
                  marginHorizontal: 10,
                  marginTop: 10,
                  marginBottom: -5,
                },
              ]}
              numberOfLines={1}>
              {tagText}
            </Text>
          )}
          <Text
            style={[
          
              {
                color:"#ffffff",
                
                marginHorizontal: 10,
                marginTop: 10,
              },
            ]}
            numberOfLines={maxLineTitle}>
            {title}
          </Text>
          {description && (
            <Text
              style={[
              
                {
                  color:"#ffffff",
                  marginHorizontal: 10,
                  marginRight: 10,
                },
              ]}
              numberOfLines={maxLineDescription}>
              {description}
            </Text>
          )}
        </View>
      </TouchableRipple>
    </View>
  );
};



const styles= StyleSheet.create({
  card:{
    borderRadius: 20,
    overflow: 'hidden',
  }
})

export default CardImageText;
