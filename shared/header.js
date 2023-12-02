import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MaterialIcons, AntDesign, Feather} from '@expo/vector-icons';

export default function Header() {
    return (
        <View style = {styles.header}>
        {/*icon for header */}
            <View>
                <Text style = {styles.headerText}>
                    Gazomezone
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerText: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#333',
        letterSpacing: 1,
    },


});