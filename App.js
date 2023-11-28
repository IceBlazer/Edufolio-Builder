//To begin running terminal commands do: cd PROJECTNAME
//To start server do: npx expo start
//To stop server do: CTRL+C
//To close an existing server do: "netstat -ano | findstr :<PORT NUMBER BEING TAKEN>" and then do: "taskkill /PID <GIVEN LISTENING PID> /F"

import React from 'react';
import {View, Text, Image, ScrollView, TextInput} from 'react-native';

const App = () => {
  return (
    <ScrollView>
      <Text>Some text</Text>
      <View>
        <Text>Some more text</Text>
        <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{width: 200, height: 200}}
        />
      </View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue="You can type in me"
      />
    </ScrollView>
  );
};

export default App;