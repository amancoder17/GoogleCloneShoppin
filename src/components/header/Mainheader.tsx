import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from 'react-native-paper';
import MenuModal from "./MenuModal";

const Mainheader: React.FC = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => setModalVisible(true);
    const handleCloseModal = () => setModalVisible(false);

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    return (
        <View style={[styles.flask, { height: windowHeight * 0.1, width: windowWidth - 20 }]}>
            <Avatar.Image source={require('../../assets/images/labflask.png')} size={35} style={{ backgroundColor: '#1E1E1E', marginTop: 5 }} />

            <View style={[
                styles.centermain, 
                { height: windowHeight * 0.075, width: windowWidth * 0.33 }
            ]}>
                <View style={[styles.centerin, { padding: windowWidth * 0.02 }]}>
                    <Avatar.Image source={require('../../assets/images/googlelogo.png')} size={30} style={{ backgroundColor: '#1E1E1E' }} />
                    <Text style={[styles.searchText, { fontSize: windowWidth * 0.03 }]}>
                        Search
                    </Text>
                </View>
                <Avatar.Image source={require('../../assets/images/geminilogo.png')} style={{ backgroundColor: '#2a2a2a', marginEnd: 10 }} size={25} />
            </View>

            <TouchableOpacity onPress={handleOpenModal}>
                <Avatar.Image source={require('../../assets/images/letterlogo.png')} size={35} style={{ marginTop: 5 }} />
            </TouchableOpacity>
            <MenuModal isVisible={isModalVisible} onClose={handleCloseModal} />
        </View>
    );
}

const styles = StyleSheet.create({
    flask: {
        flexDirection: 'row',
        marginHorizontal: 'auto',
        marginVertical: 40,
        justifyContent: "space-between"
    },
    centerin: {
        flexDirection: "row",
        backgroundColor: "#1E1E1E",
        marginStart: 5,
        borderRadius: 10,
        alignItems: 'center'
    },
    centermain: {
        backgroundColor: "#2a2a2a",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: -10
    },
    searchText: {
        color: "#ffffff",
        marginTop: 4,
        marginStart: 5,
    }
});

export default Mainheader;
