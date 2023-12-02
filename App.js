//To begin running terminal commands do: cd PROJECTNAME
//To start server do: npx expo start
//To stop server do: CTRL+C
//To close an existing server do: "netstat -ano | findstr :<PORT NUMBER BEING TAKEN>" and then do: "taskkill /PID <GIVEN LISTENING PID> /F"

import React, {useState} from 'react';

// import {StatusBar} from 'expo-status-bar'
import {TouchableWithoutFeedback, Keyboard, FlatList, View, Text, Image, ScrollView, TextInput, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Ionicons, MaterialIcons, AntDesign} from '@expo/vector-icons';
import AddSection from './components/addSection'
import SectionItem from './components/sectionItem'
import Sandbox from './components/sandbox'



function HomeScreen({navigation}) { //homeScreen
  return (
    <View style={styles.container}>
    <ScrollView>
      <Text style={styles.homeText}>Welcome!</Text>
      <Text>To start building your portfolio press Start.</Text>
      <Button 
        title = "Start"
        onPress={() => navigation.navigate('Portfolio List')}
      />
      </ScrollView>
    </View>
  );
}

function PortfolioList({navigation})
{
  const [portfolios, setPortfolio] = useState([
    { name: 'Portfolio 1', key: '1'},
    { name: 'Portfolio 2', key: '2'},
  ]);

  

  

  return(
    
    <View style = {styles.container}>
    <ScrollView>
    
    { portfolios.map((item) => {
      return (
        <View key = {item.key}>
          <TouchableOpacity onPress={() => navigation.navigate('Portfolio 1 Builder')}>
          <View style = {styles.portfolioButton}>
            <AntDesign name = 'rightcircleo' size={30} />
            <Text style = {styles.portfolioButtonText} >{item.name}</Text>
          </View>
          </TouchableOpacity>
        </View>
      )
    })}

    
    
      <Text>This will be the list of all the user's portfolios.</Text>
      <Text>User can click on one portfolio and start adding/removing sections and editing.</Text>
      <Text>Most likely will add a custom button component to display a portfolio.</Text>
      <Text>Add ScrollView as well and list component.</Text>
      </ScrollView>
    </View>
    
  );
}

function Portfolio1Builder({navigation})
{

  const [sections, setSection] = useState([
    { name: 'Personal Info', key: '1'},
    { name: 'Athletic Achievements', key: '2'},
  ])

  return (
    <View style={styles.portfolioBuilderContainer}>
    <AddSection /> 
      <View style = {styles.content}>
        <View style = {styles.list}>
          <FlatList 
            data={sections}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => navigation.navigate(item.name)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}  
          />
        </View>
      </View>
      
    </View>
  );
}

function PersonalInfo({navigation})
{
  const [personalInfo, setPersonalInfo] = useState([
    {firstName: '', lastName: '', address: '', phoneNum: '', email: '' }
  ])

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [addres, setAddress] = useState();
  const [phoneNum, setPhoneNum] = useState();
  const [email, setEmail] = useState();



  return(
  //  <Sandbox />
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('keyboard dismissed');
    }}>
    <View>
      <ScrollView>
        <View style = {styles.personalInfoText}>
        <Text >What is your name?</Text>
        <TextInput 
        style = {styles.input}
        placeholder = 'First Name'
        onChangeText={(val) => setFirstName(val)}
        />
        <TextInput 
        style = {styles.input}
        placeholder = 'Last Name'
        onChangeText={(val) => setLastName(val)}
        />
        <Text >Address: </Text>
        <TextInput 
        style = {styles.input}
        placeholder = '123 Example Way, Example City, FL, 12345'
        onChangeText={(val) => setAddress(val)}
        />
        <Text >Phone Number: </Text>
        <TextInput 
        style = {styles.input}
        placeholder='1234567890'
        maxLength={10}
        multiline={false}
        onChangeText={(val) => setPhoneNum(val)}
        />
        <Text>Email: </Text>
        <TextInput
          style = {styles.input}
          placeholder =  'johndoe@example.com'
          onChangeText={(val) => setEmail(val)}
          />


        </View>
      </ScrollView>
    </View>
  </TouchableWithoutFeedback>
  )
}

function AthleticAchievements({navigation})
{
  const[sportsNames, setSportsNames] = useState([]);

  const addSportName = (newName) => {
    setSportsNames([...sportsNames, newName]);
  };

 
  <View>
    <Text>
     
    </Text>
  </View>
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
        <Stack.Screen name = "Portfolio List" component={PortfolioList} />
        <Stack.Screen name = "Portfolio 1 Builder" component={Portfolio1Builder}/>
        <Stack.Screen name = "Personal Info" component={PersonalInfo}/>
        <Stack.Screen name = "Athletic Achievements" component={AthleticAchievements}/>
        
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
    //backgroundColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
  },

  portfolioBuilderContainer: {
    flex: 1,
    padding: 20
  },

  homeText: {
    flex: 1,
    padding: 20,
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  personalInfoText: {
    padding: 20,
    flex: 1,
    
  },



  portfolioButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    padding: 16,
    backgroundColor: '#FFF5F3',
    fontSize: 24,
    borderWidth: 3,
    borderColor: '#6D6D6D',
    borderRadius: 15,
    flexDirection: 'row-reverse',
    
  },

  portfolioButtonText: {
    flex: 1,
    paddingLeft: 70,
    textAlign: 'left',
    fontSize: 30,
    
  },

  content: {
   // padding: 40,

  },
  list: {
   // marginTop: 20,

  },

 /* item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: '#FFF5F3',
    fontSize: 24,
    borderWidth: 3,
    borderColor: '#6D6D6D',

  }, */

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
    borderRadius: 15,
    padding: 8,
    margin: 10,
    width: 200,
  },
   

});