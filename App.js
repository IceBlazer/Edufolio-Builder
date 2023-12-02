//To begin running terminal commands do: cd PROJECTNAME
//To start server do: npx expo start
//To stop server do: CTRL+C
//To close an existing server do: "netstat -ano | findstr :<PORT NUMBER BEING TAKEN>" and then do: "taskkill /PID <GIVEN LISTENING PID> /F"

import React, {useState} from 'react';

// import {StatusBar} from 'expo-status-bar'
import {Modal, Dimensions, TouchableWithoutFeedback, Keyboard, FlatList, View, Text, Image, ScrollView, TextInput, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Ionicons, MaterialIcons, AntDesign, Feather} from '@expo/vector-icons';
import {Formik} from 'formik';
import * as yup from 'yup';
import AddSection from './components/addSection'
import SectionItem from './components/sectionItem'
import Sandbox from './components/sandbox'
import Header from './shared/header';





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
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      //console.log('keyboard dismissed');
    }}>
    <View style={styles.portfolioBuilderContainer}>
    
    <AddSection /> 
      <View style = {styles.content}>
        <View style = {styles.list}>
          <FlatList 
            data={sections}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => navigation.navigate(item.name)}>
                <Card>
                <Text>{item.name}</Text>
                </Card>
                  
                
              </TouchableOpacity>
            )}  
          />
        </View>
      </View>
      <View>
        <ScrollView>
          <Text style = {{fontSize: 24}}>Add check marks in the header or a done button</Text>
        </ScrollView>
      </View>
      
      
    </View>
    </TouchableWithoutFeedback>
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

  const [sports, setSports] = useState([
    {sportName: 'Soccer', startDate: '12/3/2021', endDate: '12/5/2022', avgHrsPerWeek: '3', totalHrs: '123', gradesParticipated: '6, 7, 8', comments: "i'm himothy", key: '1'},

  ])
  const addSport = (sport) => {
    sport.key =  Math.random().toString();
    setSports((currentSports) => {
      return [sport, ...currentSports]
    });
    setModalOpen(false);
  }
  const [modalOpen, setModalOpen] = useState(false);

  
  
  


  return(
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('keyboard dismissed');
    }}>
  <View>
    <FlatList
      data={sports}
      renderItem={({item}) =>(
        <Card>
        <TouchableOpacity onPress={() => navigation.navigate('Sport Info', {item})}>
          <Text>
            {item.sportName}
          </Text>
        </TouchableOpacity>
        </Card>
      )}
     />
    <Modal visible={modalOpen} animationType='slide'>
    <ScrollView>
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('keyboard dismissed');
    }}>
      <View style={styles.modalContent}>
        <MaterialIcons 
              name="close" 
              size={50} 
              color="black"
              style={{...styles.modalToggle, ...styles.modalClose}}
              onPress={() => setModalOpen(false)} 
          />
        <SportsForm addSport={addSport} />
      </View>
      </TouchableWithoutFeedback>
      </ScrollView>
    </Modal>
    <ScrollView>
      <Text>
      Sport Name, Start Date, End Date, Average Hours per Week, Total Hours, Grades Participated, Description/Comments
        <View style = {{paddingLeft: 170, paddingTop: 20}}>
        <TouchableOpacity>
          <Ionicons 
            name="md-add-circle-outline" 
            size={50} 
            color="black"
            style={styles.modalToggle}
            onPress={() => setModalOpen(true)}
             />
          </TouchableOpacity>
        
        </View>
      </Text>
    </ScrollView>
  </View>
  </TouchableWithoutFeedback>
  )
}

function Card(props)
{
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    )
}

function SportsForm({addSport})
{
  const sportsSchema = yup.object({
    sportName: yup.string().required('This field is required.').min(3, 'Must be at least 3 characters'),
    startDate: yup.date().required('This field is required.').max(new Date()),
    endDate: yup.date().max(new Date()),
    avgHrsPerWeek: yup.number().required('This field is required.').positive().max(168),
    totalHrs: yup.number().required('This field is required.').positive(),
    gradesParticipated: yup.string().required('This field is required.'),
    comments: yup.string()

    
  })

  return(
    <View>
      <Formik
        initialValues={{ sportName: '', startDate: '', endDate: '', avgHrsPerWeek: '', totalHrs: '', gradesParticipated: '', comments: ''}}
        validationSchema={sportsSchema}
        onSubmit={(values) => {
          console.log(values);
          addSport(values);
        }}
      >
        {(props) => (
          <View>
            <TextInput 
              style={styles.formikInput}
              placeholder='Sport Name'
              onChangeText={props.handleChange('sportName')}
              value={props.values.sportName}
              onBlur={props.handleBlur('sportName')}
            />
            <Text style = {styles.errorText}>{props.touched.sportName && props.errors.sportName}</Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Start Date: (YYYY-MM-DD) '
              onChangeText={props.handleChange('startDate')}
              value={props.values.startDate}
              onBlur={props.handleBlur('startDate')}
            />
            <Text style = {styles.errorText}>{props.touched.startDate && props.errors.startDate}</Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='End Date: (YYYY-MM-DD) '
              onChangeText={props.handleChange('endDate')}
              value={props.values.endDate}
              onBlur={props.handleBlur('endDate')} 
            />
            <Text style = {styles.errorText}>{props.touched.endDate && props.errors.endDate}</Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Average Number of Hours Played per Week: '
              onChangeText={props.handleChange('avgHrsPerWeek')}
              value={props.values.avgHrsPerWeek}
              keyboardType='numeric'
              onBlur={props.handleBlur('avgHrsPerWeek')}
            />
            <Text style = {styles.errorText}>{props.touched.avgHrsPerWeek && props.errors.avgHrsPerWeek}</Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Total Hours Played: '
              onChangeText={props.handleChange('totalHrs')}
              value={props.values.totalHrs}
              onBlur={props.handleBlur('totalHrs')}
              keyboardType='numeric'
            />
            <Text style = {styles.errorText}>{props.touched.totalHrs && props.errors.totalHrs}</Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Grades Participated: '
              onChangeText={props.handleChange('gradesParticipated')}
              value={props.values.gradesParticipated}
              onBlur={props.handleBlur('gradesParticipated')}
            />
            <Text style = {styles.errorText}>{props.touched.gradesParticipated && props.errors.gradesParticipated}</Text>
            <TextInput 
              style={styles.formikInput}
              multiline
              placeholder='Comments: '
              onChangeText={props.handleChange('comments')}
              value={props.values.comments}
              onBlur={props.handleBlur('comments')}
            />
            <Text style = {styles.errorText}>{props.touched.comments && props.errors.avgHrsPerWeek}</Text>

            
            <Button title='submit' onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  )
}

function SportInfo({route,navigation})
{
  const {item} = route.params;

  return(
    <View>
    <Card>
      <View>
        <Text>Sport Name: {item.sportName}</Text>
        <Text>Start Date: {item.startDate}</Text>
        <Text>End Date: {item.endDate} </Text>
        <Text>Average Hours Per Week: {item.avgHrsPerWeek}</Text>
        <Text>Total Hours: {item.totalHrs}</Text>
        <Text>Grades Participated: {item.gradesParticipated}</Text>
        <Text>Comments: {item.comments}</Text>
      </View>
    </Card>
    </View>
    
  );
}


/*function HeaderBar({navigation}) {
  return (
      <View style = {styles.header}>
      {<Feather name="check" size ={20} onPress={navigation.navigate('Portfolio 1 Builder')} style = {styles.icon} />}
          <View>
              <Text style = {styles.headerText}>
                  Gazomezone
              </Text>
          </View>
      </View>
  );
} */

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
      <Stack.Navigator >
        <Stack.Screen 
          name = "Home" 
          component={HomeScreen} 
        />
        <Stack.Screen name = "Portfolio List" component={PortfolioList} />
        <Stack.Screen name = "Portfolio 1 Builder" component={Portfolio1Builder}/>
        <Stack.Screen 
          name = "Personal Info"
          component={PersonalInfo}
          //options={{ headerTitle: (props) => <HeaderBar {...props} />, headerBackTitleVisible: false}}
           />
        <Stack.Screen name = "Athletic Achievements" component={AthleticAchievements}/>
        <Stack.Screen name = "Sport Info" component={SportInfo}/>
        
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

  errorText: {
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center',
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
    //paddingLeft: 70,
    textAlign: 'left',
    fontSize: 30,
    
  },

  plus: {
   alignSelf: 'center',
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

  submitButton: {
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#24a0ed',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
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
card: {
  borderRadius: 6,
  elevation: 3,
  backgroundColor: '#fff',
  shadowOffset: {width: 1, height: 1},
  shadowColor: '#333',
  shadowOpacity: 0.3,
  shadowRadius: 2,
  marginHorizontal: 4,
  marginVertical: 6,

},
cardContent: {
  marginHorizontal: 18,
  marginVertical: 10,
},

modalToggle: {
  marginBottom: 10,
  borderWidth: 1,
  borderColor: '#f2f2f2',
  padding: 10,
  borderRadius: 10,
  alignSelf: 'center',
},
modalClose: {
  marginTop: 40,
  marginBottom: 0,
},
modalContent: {
  flex: 1,
},
formikInput: {
  borderWidth: 1,
  borderColor: '#ddd',
  padding: 10,
  fontSize: 18,
  borderRadius: 6,
},
   

});