import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ScrollView, TextInput, Button} from 'react-native';

export default function SectionItem({ item })
{
    return (
        <TouchableOpacity>
            <Text style ={styles.item}>{item.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 10,
    }
})