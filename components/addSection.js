import React, {useState} from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, Button} from 'react-native';

export default function AddSection() {
    const [text, setText] = useState('');

    const changeHandler = (val) => {
        setText(val);
    }



    return(
        <View>
            <ScrollView>
                <TextInput
                style = {styles.input}
                    placeholder='new Section..'
                    onChangeText={changeHandler}
                />
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',

    },
})
