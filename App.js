//To begin running terminal commands do: cd PROJECTNAME
//To start server do: npx expo start
//To stop server do: CTRL+C
//To close an existing server do: "netstat -ano | findstr :<PORT NUMBER BEING TAKEN>" and then do: "taskkill /PID <GIVEN LISTENING PID> /F"

import React, {useState} from 'react';

// import {StatusBar} from 'expo-status-bar'
import {View, Text, Image, ScrollView, TextInput, StyleSheet, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({navigation}) { //homeScreen
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <Text>To start building your portfolio, press Start.</Text>
      <Button 
        title = "Start"
        onPress={() => navigation.navigate('Portfolio Builder')}
      />
    </View>
  );
}

function PortfolioBuilder({navigation})
{
  return(
    <View style = {styles.container}>
      <Text>This will be the list of all the user's portfolios.</Text>
      <Text>User can click on one portfolio and start adding/removing sections and editing.</Text>
      <Text>Most likely will add a custom button component to display a portfolio.</Text>
      <Text>Add ScrollView as well and list component.</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();


export default function App() {
 /* const [name, setName] = useState('Harry');
  const [userInfo, setUserInfo] = useState({firstName: 'First Name', lastName: 'Last Name', email: 'user@example.com', phoneNum: 1234567890, address: '123 Sleepy Lane'});
  const [age, setAge] = useState(30); 

  const pressHandler = () => {
    setName('Harold');
    setAge('50');
    setUserInfo({firstName: 'Jeff', lastName: 'Doe', email: 'johndoe@hotmail.com', phoneNum: 2224568765, address: '9110 Trenton Way' });
  } */

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name = "Portfolio Builder" component={PortfolioBuilder} />
      </Stack.Navigator>
    </NavigationContainer>
   
    
    
   /* <View style={styles.container}>
      <Text>My name is {name} and my age is {age}.</Text>
      <Text>User's name is {userInfo.firstName} {userInfo.lastName}.</Text>
      <Text>Contact Info: {userInfo.email} {userInfo.phoneNum}</Text>
      <Text>Address: {userInfo.address}</Text>
      <Text>Enter name:</Text>

      <TextInput 
        multiline
        style={styles.input}
        placeholder='e.g. John Doe'
        onChangeText={(val) => setName(val)}
        />

      <Text>Enter age:</Text>
      <TextInput
        keyboardType='numeric'
        style = {styles.input}
        placeholder = 'e.g. 23'
        onChangeText = {(val) => setAge(val)}
        />


      <View style={styles.buttonContainer}>
        <Button title='Back' onPress={pressHandler}/> 
      </View>

    </View> */
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonContainer: {
    marginTop: 20,
  },

  header: {
    backgroundColor: 'pink',
    padding:20,
  },

  boldText: {
    fontWeight: 'bold',
  },
  body: {
    backgroundColor: 'yellow',
    padding: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
  },
   

});