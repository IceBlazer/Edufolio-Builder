//To begin running terminal commands do: cd PROJECTNAME
//To start server do: npx expo start
//To stop server do: CTRL+C
//To close an existing server do: "netstat -ano | findstr :<PORT NUMBER BEING TAKEN>" and then do: "taskkill /PID <GIVEN LISTENING PID> /F"

import React, {useState, useEffect} from 'react';

// import {StatusBar} from 'expo-status-bar'
import { Linking, Platform, ActivityIndicator, Alert, KeyboardAvoidingView, Modal, Dimensions, TouchableWithoutFeedback, Keyboard, FlatList, View, Text, Image, ScrollView, TextInput, StyleSheet, Button, TouchableOpacity, useWindowDimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {FontAwesome, Entypo, EvilIcons, Ionicons, MaterialIcons, AntDesign, Feather} from '@expo/vector-icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { printToFileAsync} from 'react-native';
import { shareAsync} from 'expo-sharing';
import * as Print from 'expo-print';
import { AppProvider, useAppContext } from './AppContext';
import HTML from 'react-native-render-html';
import RenderHtml from 'react-native-render-html';

import AddSection from './components/addSection'
import SectionItem from './components/sectionItem'
import Sandbox from './components/sandbox'
import Header from './shared/header'; //custom component for Header
import AppLoading from "expo-app-loading";


function Card(props) //custom component for Card
{
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    )
}


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
      
      <Text style = {{fontWeight: 'bold'}}>Todo List: </Text>
      <Text style = {{fontWeight: 'bold'}}>- Add function to generate portfolio somehow</Text>
      <Text style = {{fontWeight: 'bold'}}>- Make app look good</Text>
      <Text style = {{fontWeight: 'bold'}}>- Create App Icon and Include Images</Text>
      <Text style = {{fontWeight: 'bold'}}>- Add at least 2 social media app connections in the about me section</Text>
      <Text style = {{fontWeight: 'bold'}}>- Implement add sections and make sections hide unless selected by the user to include in the portfolio</Text>



      </ScrollView>
    </View>
  );
}

function PortfolioList({navigation}) //Portfolio List Screen
{
  const [portfolios, setPortfolio] = useState([
    { name: 'Portfolio 1', key: '1'},
  ]);


  return(
    
    <View style = {styles.container}>
    <ScrollView>
    
    { portfolios.map((item) => {
      return (
        <View key = {item.key}>
          <TouchableOpacity onPress={() => navigation.navigate('Portfolio 1 Builder')}>
          <View style = {styles.portfolioButton}>
            <AntDesign name = 'right' size={30} />
            <Text style = {styles.portfolioButtonText} >{item.name}</Text>
          </View>
          </TouchableOpacity>
        </View>
      )
    })}

    
    
      <Text>This will be the list of all the user's portfolios.</Text>
      <Text>User can click on one portfolio and start adding/removing sections and editing.</Text>
      
      </ScrollView>
    </View>
    
  );
}

function Portfolio1Builder({navigation}) //Portfolio Builder Screen with all the sections
{
  const iconMappings = {
    'Personal Info': 'user-circle',
    'Education': 'university',
    'Volunteer Services': 'gratipay',
    'Extracurricular Activities': 'puzzle-piece',
    'Awards/Certificates': 'certificate',
    'Skills/Academic Achievements': 'book',
    'Music/Artistic Achievements': 'music',
    'Athletic Achievements': 'soccer-ball-o',
    'Leadership': 'users',
    'Honors Classes': 'graduation-cap',
    'Additional Information': 'info-circle',

  };
  const [sections, setSection] = useState([
    { name: 'Personal Info', key: '1'},
    { name: 'Education', key: '2'},
    { name: 'Volunteer Services', key: '3'},
    { name: 'Extracurricular Activities', key: '4'},
    { name: 'Awards/Certificates', key: '5'},
    { name: 'Skills/Academic Achievements', key: '6'},
    { name: 'Music/Artistic Achievements', key: '7'},
    { name: 'Athletic Achievements', key: '8'},
    { name: 'Leadership', key: '9'},
    { name: 'Honors Classes', key: '10'},
    { name: 'Additional Information', key: '11'},

  ])

  

  return (
    <TouchableWithoutFeedback onPress={() => {  //these 3 lines are dispersed throughout the code. They are meant to dismiss the keyboard upon tapping on the screen
      Keyboard.dismiss();
    }}>
    
    <View style={styles.portfolioBuilderContainer}>
    
    {/* <Button 
        title = "View Portfolio"
        onPress={() => navigation.navigate('Portfolio Viewer')} // go to line 2606 for the HTML Code, still WIP
      />  */}
      <Text style = {{textAlign: 'center'}}>Click on any of the sections to start adding information!</Text>
      <Text style = {{textAlign: 'center'}}>Press the check mark in the top right once you are done.</Text>
      <View style = {styles.content}>
        <View style = {styles.list}>
          <FlatList //renders the title of each section in a card component with icons predefined in iconMappings, and also will go to their respective screen upon press
            data={sections}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => navigation.navigate(item.name)}>
                <Card onPress={() => navigation.navigate(item.name)}>
                <TouchableOpacity onPress={() => navigation.navigate(item.name)}>
                  <View>
                  {iconMappings[item.name] && (
                          <FontAwesome
                            name={iconMappings[item.name]}
                            size={30}
                            onPress={() => navigation.navigate(item.name)}
                          />
                          )}
                  </View>
                  <View style = {styles.rightIcon}>
                  <AntDesign name = 'right' size={30} onPress={() => navigation.navigate(item.name)}/>
                  </View>
                </TouchableOpacity>
                <Text style={styles.portfolioBuilderCard}>{item.name}</Text>
                </Card>
                  
                
              </TouchableOpacity>
            )}  
          />
        </View>
      </View>
      
      
      
    </View>
    </TouchableWithoutFeedback>
  );
}

function PersonalInfo({navigation}) //Personal Info Screen
{
  const [personalInfo, setPersonalInfo] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    loadPersonalInfo(); 
  }, []); 

  const loadPersonalInfo = async () => { //implementing AsyncStorage to save and load all data entered by the user
    console.log("load personalInfo called");
    try {
      const storedPersonalInfo = await AsyncStorage.getItem("storedPersonalInfo");
      if (storedPersonalInfo !== null) {
        setPersonalInfo(JSON.parse(storedPersonalInfo));
       
      }
      
    } catch (e) {
      alert('Failed to fetch the input from storage: ' + e);
    }
  };
  const addPersonalInfo = async (personal) => {
    personal.key = Math.random().toString();
    const newPersonalInfo = [...personalInfo, personal];

    try {
      await AsyncStorage.setItem("storedPersonalInfo", JSON.stringify(newPersonalInfo));
      setPersonalInfo(newPersonalInfo);
      setModalOpen(false);
      console.log({ personalInfo: newPersonalInfo });
    } catch (error) {
      console.log(error);
    }
  };
  const removePersonalInfo = async (personal) => {
    try {
      const newPersonalInfo = personalInfo.filter(item => item !== personal);

      await AsyncStorage.setItem("storedPersonalInfo", JSON.stringify(newPersonalInfo));
      setPersonalInfo(newPersonalInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return(
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('keyboard dismissed');
    }}>
    <View>
      
        <FlatList data = {personalInfo} renderItem = {({item}) => ( //renders the personalInfo overview card, can be pressed to see more details
          <Card>
            <TouchableOpacity onPress={()=>Alert.alert( //alert to delete the card and its corresponding data permanently
              'Are you sure you want to delete this?',
              'You cannot undo this action.',
              [
                {
                  text: 'No',
                  onPress: () => console.log('Cancelled'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => removePersonalInfo(item),
                }
              ], 
              { cancelable: 'false'}
            )}>
                <MaterialIcons name = 'delete' size={30} color = "red"  />
                <Text style={styles.sectionInfoCard}>{item.firstName} {item.lastName}</Text>
                <Text style={styles.infoSubtitle}>Address: {item.address}</Text>
                <Text style={styles.infoSubtitle}>Phone Number: {item.phoneNum}</Text>
                <Text style={styles.infoSubtitle}>Email: {item.email}</Text>
            </TouchableOpacity>
          </Card>
        )}/>
      {personalInfo.length === 0 && ( //if user has already entered their personalInformation, modal will not toggle, otherwise it will pop up (check only happens for personalInfo section)
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => setModalOpen(true)}
          >
            <Ionicons name="md-add-circle-outline" size={50} color="black" />
          </TouchableOpacity>
        )}      
        <Modal visible={modalOpen} animationType="slide">
          <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={styles.modalContent}>
                <MaterialIcons
                  name="close"
                  size={50}
                  color="black"
                  style={{ ...styles.modalToggle, ...styles.modalClose }}
                  onPress={() => setModalOpen(false)}
                />
                <PersonalInfoForm addPersonalInfo={addPersonalInfo}/> 
                {/* imported Form Component using Formik, all values submitted will be saved to personalInfo data */}
               </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </Modal>
        <ScrollView>
          <Text>
            
            <View style={{ paddingLeft: 170, paddingTop: 20 }}>
              <TouchableOpacity>
              </TouchableOpacity>
            </View>
          </Text>
        </ScrollView>
    </View>
  </TouchableWithoutFeedback>
  )
}

function PersonalInfoForm({addPersonalInfo}, {personalInfo}) //actual form that users will input answers validated by Yup
{
  const personalSchema = yup.object({
    firstName: yup.string().required('This field is required.').min(2, 'Must be at least 2 characters'),
    lastName: yup.string().required('This field is required.').min(2, 'Must be at least 2 characters'),
    address: yup.string().required('This field is required.').min(2, 'Must be at least 2 characters'),
    phoneNum: yup.number().required('This field is required.').positive(),
    email: yup.string().required('This field is required.').email("Invalid email address"),

  })

  return (
    <View>
      <Formik
        initialValues={{ firstName: '', lastName: '', address: '', phoneNum: '', email: ''}}
        validationSchema={personalSchema}
        onSubmit={(values) => {
          console.log(values);
          addPersonalInfo(values);
          
        }}
      >
      {(props) => (
          <KeyboardAwareScrollView>
            <Text style = {{marginTop: 5}}>First Name: </Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='First Name: '
              onChangeText={props.handleChange('firstName')}
              value={props.values.firstName}
              onBlur={props.handleBlur('firstName')}
            />
            <Text style = {styles.errorText}>{props.touched.firstName && props.errors.firstName}</Text> 
            {/* displays error messages if applicable */}

            <Text style = {{marginTop: 5}}>Last Name: </Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Last Name: '
              onChangeText={props.handleChange('lastName')}
              value={props.values.lastName}
              onBlur={props.handleBlur('lastName')}
            />
            <Text style = {styles.errorText}>{props.touched.lastName && props.errors.lastName}</Text>
            <Text style = {{marginTop: 5}}>Address: </Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Address: '
              onChangeText={props.handleChange('address')}
              value={props.values.address}
              onBlur={props.handleBlur('address')}
            />
            <Text style = {styles.errorText}>{props.touched.address && props.errors.address}</Text>
            <Text style = {{marginTop: 5}}>Phone Number: </Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Phone Number: '
              maxLength={15}
              minLength={5}
              keyboardType='numeric'
              onChangeText={props.handleChange('phoneNum')}
              value={props.values.phoneNum}
              onBlur={props.handleBlur('phoneNum')}
            />
            <Text style = {styles.errorText}>{props.touched.phoneNum && props.errors.phoneNum}</Text>
            <Text style = {{marginTop: 5}}>Email: </Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Email: '
              onChangeText={props.handleChange('email')}
              value={props.values.email}
              onBlur={props.handleBlur('email')}
            />
            <Text style = {styles.errorText}>{props.touched.email && props.errors.email}</Text>
            <Button title='Submit' onPress={props.handleSubmit} />
            </KeyboardAwareScrollView>
        )}
      </Formik>
    </View> 
  )
}
 
/* 
All functions from this point follow the same logic and structure until the last section "Additional Information".
First function is named according to its section is responsible for displaying all instances of data. E.g. all sports played by the user.
Second function is the actual form displayed in the modal, which the user will prompt to open with the plus button in the first function's screen to add more information.
Third function is a detailed info screen that will open if the user presses on one of their overview cards in the first function's screen.


*/


function AthleticAchievements({ navigation }) {
  const [sports, setSports] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadSports(); 
  }, []); 

  const loadSports = async () => {
    console.log("load sports called");
    try {
      const storedSports = await AsyncStorage.getItem("storedSports");
      if (storedSports !== null) {
        setSports(JSON.parse(storedSports));
      }
    } catch (e) {
      alert('Failed to fetch the input from storage: ' + e);
    }
  };

  const addSport = async (sport) => {
    sport.key = Math.random().toString();
    const newSports = [...sports, sport];

    try {
      await AsyncStorage.setItem("storedSports", JSON.stringify(newSports));
      setSports(newSports);
      setModalOpen(false);
      console.log({ sports: newSports });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSports = async () => {
    try {
      await AsyncStorage.setItem("storedSports", JSON.stringify([]));
      setSports([]);
    } catch (error) {
      console.log(error);
    }
  };


  const removeSport = async (sport) => {
    try {
      const newSports = sports.filter(item => item !== sport);

      await AsyncStorage.setItem("storedSports", JSON.stringify(newSports));
      setSports(newSports);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <FlatList
          data={sports}
          renderItem={({ item }) => (
            <Card>
              <TouchableOpacity
                onPress={() => navigation.navigate('Sport Info', { item })}
              >
              <TouchableOpacity onPress={()=>Alert.alert(
              'Are you sure you want to delete this?',
              'You cannot undo this action.',
              [
                {
                  text: 'No',
                  onPress: () => console.log('Cancelled'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => removeSport(item),
                }
              ], 
              { cancelable: 'false'}
            )}>
                <MaterialIcons name = 'delete' size={30} color = "red"  /> 
               
              </TouchableOpacity>
                <View style={styles.rightIcon}>
                  <AntDesign name="right" size={30} />
                  <Text style={styles.sectionInfoCard}>{item.sportName}</Text>
                </View>
              </TouchableOpacity>
            </Card>
          )}
        />
        <Modal visible={modalOpen} animationType="slide">
          <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={styles.modalContent}>
                <MaterialIcons
                  name="close"
                  size={50}
                  color="black"
                  style={{ ...styles.modalToggle, ...styles.modalClose }}
                  onPress={() => setModalOpen(false)}
                />
                <SportsForm addSport={addSport} />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </Modal>
        <ScrollView>
          <Text>
            
            <View style={{ paddingLeft: 170, paddingTop: 20 }}>
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
  );
}




function SportsForm({addSport}, {sports})
{
  const sportsSchema = yup.object({
    sportName: yup.string().required('This field is required.').min(3, 'Must be at least 3 characters'),
    startDate: yup.date().required('This field is required.').max(new Date()),
    endDate: yup.date().required("If still continuing, put today's date.").max(new Date()),
    avgHrsPerWeek: yup.number().required('This field is required.').positive().max(168, 'Must be less than 168'),
    totalHrs: yup.number().required('This field is required.').positive(),
    gradesParticipated: yup.string().required('This field is required.'),
    comments: yup.string()

    
  })

  // const save = async() => {
  //   try{
  //     await AsyncStorage.setItem("SportKey", sports)
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const load = async () =>{
  //   try {
  //     let sport = await AsyncStorage.getItem("SportKey");
  //     if(sport != null){

  //       setSports(sport);
  //     }
  //   } catch(err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   load();
  // }, []);

  return(
    <View>
      <Formik
        initialValues={{ sportName: '', startDate: '', endDate: '', avgHrsPerWeek: '', totalHrs: '', gradesParticipated: '', comments: ''}}
        validationSchema={sportsSchema}
        onSubmit={(values) => {
          console.log(values);
          addSport(values);
          //{save}
        }}
      >
        {(props) => (
          <KeyboardAwareScrollView>
            <Text style = {{marginTop: 5}}>Sport Name: </Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Sport Name: '
              onChangeText={props.handleChange('sportName')}
              value={props.values.sportName}
              onBlur={props.handleBlur('sportName')}
            />
            <Text style = {styles.errorText}>{props.touched.sportName && props.errors.sportName}</Text>

            <Text style = {{marginTop: 5}}>Start Date: (YYYY-MM-DD)</Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Start Date: (YYYY-MM-DD) '
              onChangeText={props.handleChange('startDate')}
              value={props.values.startDate}
              onBlur={props.handleBlur('startDate')}
            />
            <Text style = {styles.errorText}>{props.touched.startDate && props.errors.startDate}</Text>
            <Text style = {{marginTop: 5}}>End Date: (YYYY-MM-DD)</Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='End Date: (YYYY-MM-DD) '
              onChangeText={props.handleChange('endDate')}
              value={props.values.endDate}
              onBlur={props.handleBlur('endDate')} 
            />
            <Text style = {styles.errorText}>{props.touched.endDate && props.errors.endDate}</Text>
            <Text style = {{marginTop: 5}}>Average Number of Hours Played Per Week:</Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Average Number of Hours Played Per Week: '
              onChangeText={props.handleChange('avgHrsPerWeek')}
              value={props.values.avgHrsPerWeek}
              keyboardType='numeric'
              onBlur={props.handleBlur('avgHrsPerWeek')}
            />
            <Text style = {styles.errorText}>{props.touched.avgHrsPerWeek && props.errors.avgHrsPerWeek}</Text>
            <Text style = {{marginTop: 5}}>Total Hours Played: </Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Total Hours Played: '
              onChangeText={props.handleChange('totalHrs')}
              value={props.values.totalHrs}
              onBlur={props.handleBlur('totalHrs')}
              keyboardType='numeric'
            />
            <Text style = {styles.errorText}>{props.touched.totalHrs && props.errors.totalHrs}</Text>
            <Text style = {{marginTop: 5}}>Grades Participated: </Text>
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
            <Text style = {styles.errorText}>{props.touched.comments && props.errors.comments}</Text>

            
            <Button title='Submit' onPress={props.handleSubmit} />
          </KeyboardAwareScrollView>
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
      <View style = {styles.rightIcon}>
        </View>
        <Text>Sport Name: {item.sportName}</Text>
        <Text>Start Date: {item.startDate}</Text>
        <Text>End Date: {item.endDate} </Text>
        <Text>Average Hours Per Week: {item.avgHrsPerWeek} </Text>
        
        <Text>Total Hours: {item.totalHrs}</Text>
        <Text>Grades Participated: {item.gradesParticipated}</Text>
        <Text>Comments: {item.comments} </Text>

      </View>
    </Card>
    </View>
    
  );
}

function Education({navigation})
{
  // const [educations, setEducations] = useState([
  //   {schoolName: 'ETES', location: '900 Stribling Way', beginningGrade: '9', startDate: '2021/3/12', endDate: '2022/5/12', comments: 'idk', key: '1'},

  // ])
  const [educations, setEducations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);


  

  useEffect(() => {
    loadEducations(); 
  }, []); 

  const loadEducations = async () => {
    console.log("load educations called");
    try {
      const storedEducations = await AsyncStorage.getItem("storedEducations");
      if (storedEducations !== null) {
        setEducations(JSON.parse(storedEducations));
      }
    } catch (e) {
      alert('Failed to fetch the input from storage: ' + e);
    }
  };

  const addEducation = async (education) => {
    education.key = Math.random().toString();
    const newEducations = [...educations, education];

    try {
      await AsyncStorage.setItem("storedEducations", JSON.stringify(newEducations));
      setEducations(newEducations);
      setModalOpen(false);
      console.log({ educations: newEducations });
    } catch (error) {
      console.log(error);
    }
  };

  const removeEducation = async (education) => {
    try {
      const newEducations = educations.filter(item => item !== education);

      await AsyncStorage.setItem("storedEducations", JSON.stringify(newEducations));
      setEducations(newEducations);
    } catch (error) {
      console.log(error);
    }
  };
  
  return(
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('keyboard dismissed');
    }}>
      <View>
    <FlatList
      data={educations}
      renderItem={({item}) =>(
        <Card>
        
        <TouchableOpacity onPress={() => navigation.navigate('Education Info', {item})}>
        <TouchableOpacity onPress={()=>Alert.alert(
              'Are you sure you want to delete this?',
              'You cannot undo this action.',
              [
                {
                  text: 'No',
                  onPress: () => console.log('Cancelled'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => removeEducation(item),
                }
              ], 
              { cancelable: 'false'}
            )}>
                <MaterialIcons name = 'delete' size={30} color = "red"  /> 
               
              </TouchableOpacity>
        <View style = {styles.rightIcon}>
        <AntDesign name = 'right' size={30} />
          <Text style={styles.sectionInfoCard}>
            {item.schoolName}
          </Text>
        </View>
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
        <EducationsForm addEducation={addEducation} />
      </View>
      </TouchableWithoutFeedback>
      </ScrollView>
    </Modal>
    <ScrollView>
      <Text>
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

function EducationsForm({addEducation})
{
  const educationsSchema = yup.object({
    schoolName: yup.string().required('This field is required.').min(3, 'Must be at least 3 characters'),
    location: yup.string().required('This field is required.').min(3, 'Must be at least 3 characters'),
    beginningGrade: yup.number().required('This field is required.').positive().max(12, 'Cannot be higher than 12'),
    startDate: yup.date().required('This field is required.').max(new Date()),
    endDate: yup.date().max(new Date()),
    comments: yup.string()
  })
  return(
    <View>
      <Formik
        initialValues={{ schoolName: '', location: '', beginningGrade: '', startDate: '', endDate: '', comments: ''}}
        validationSchema={educationsSchema}
        onSubmit={(values) => {
          console.log(values);
          addEducation(values);
        }}
      >
      {(props) => (
          <KeyboardAwareScrollView>
            <Text style = {{marginTop: 5}}>School Name: </Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='School Name: '
              onChangeText={props.handleChange('schoolName')}
              value={props.values.schoolName}
              onBlur={props.handleBlur('schoolName')}
            />
            <Text style = {styles.errorText}>{props.touched.schoolName && props.errors.schoolName}</Text>

            <Text style = {{marginTop: 5}}>Location: </Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Location: '
              onChangeText={props.handleChange('location')}
              value={props.values.location}
              onBlur={props.handleBlur('location')}
            />
            <Text style = {styles.errorText}>{props.touched.location && props.errors.location}</Text>
            
            <Text style = {{marginTop: 5}}>Beginning Grade: </Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Beginning Grade: '
              onChangeText={props.handleChange('beginningGrade')}
              value={props.values.beginningGrade}
              onBlur={props.handleBlur('beginningGrade')}
              keyboardType='numeric'
            />
            <Text style = {styles.errorText}>{props.touched.beginningGrade && props.errors.beginningGrade}</Text>

            <Text style = {{marginTop: 5}}>Start Date: (YYYY-MM-DD)</Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Start Date: (YYYY-MM-DD) '
              onChangeText={props.handleChange('startDate')}
              value={props.values.startDate}
              onBlur={props.handleBlur('startDate')}
            />
            <Text style = {styles.errorText}>{props.touched.startDate && props.errors.startDate}</Text>
            <Text style = {{marginTop: 5}}>End Date: (YYYY-MM-DD)</Text>
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
              multiline
              placeholder='Comments: '
              onChangeText={props.handleChange('comments')}
              value={props.values.comments}
              onBlur={props.handleBlur('comments')}
            />
            <Text style = {styles.errorText}>{props.touched.comments && props.errors.comments}</Text>

            
            <Button title='Submit' onPress={props.handleSubmit} />
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  )
}

function EducationInfo({route, navigation})
{
  
  const {item} = route.params;
  return(
    <View>
    <Card>
      <View>
      <View style = {styles.rightIcon}>
            
        </View>
        <Text>School Name: {item.schoolName}</Text>
        <Text>Location: {item.location} </Text>
        <Text>Beginning Grade: {item.beginningGrade} </Text>
        <Text>Start Date: {item.startDate}</Text>
        <Text>End Date: {item.endDate} </Text>
        <Text>Comments: {item.comments} </Text>

      </View>
    </Card>
    </View>
  );
}

function VolunteerServices({navigation})
{
  // const [volunteerServices, setVolunteerServices] = useState([
  //   {positionTitle: 'Helper', organization: 'Target', location: '', startDate: '', endDate: '', totalHrs: '', gradesParticipated: '', comments: '', key: '1'},

  // ])
  const [volunteerServices,setVolunteerServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadVolunteerServices(); 
  }, []); 

  const loadVolunteerServices = async () => {
    console.log("load VolunteerServices called");
    try {
      const storedVolunteerServices = await AsyncStorage.getItem("storedVolunteerServices");
      if (storedVolunteerServices !== null) {
        setVolunteerServices(JSON.parse(storedVolunteerServices));
      }
    } catch (e) {
      alert('Failed to fetch the input from storage: ' + e);
    }
  };

  const addVolunteerServices = async (volunteerService) => {
    volunteerServices.key = Math.random().toString();
    const newVolunteerServices = [...volunteerServices, volunteerService];

    try {
      await AsyncStorage.setItem("storedVolunteerServices", JSON.stringify(newVolunteerServices));
      setVolunteerServices(newVolunteerServices);
      setModalOpen(false);
      console.log({ volunteerServices: newVolunteerServices });
    } catch (error) {
      console.log(error);
    }
  };
  const removeVolunteerService = async (volunteerService) => {
    try {
      const newVolunteerServices = volunteerServices.filter(item => item !== volunteerService);

      await AsyncStorage.setItem("storedVolunteerServices", JSON.stringify(newVolunteerServices));
      setVolunteerServices(newVolunteerServices);
    } catch (error) {
      console.log(error);
    }
  };
 

  return(
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('keyboard dismissed');
    }}>
      <View>
    <FlatList
      data={volunteerServices}
      renderItem={({item}) =>(
        <Card>
        <TouchableOpacity onPress={() => navigation.navigate('Volunteer Services Info', {item})}>
        <TouchableOpacity onPress={()=>Alert.alert(
              'Are you sure you want to delete this?',
              'You cannot undo this action.',
              [
                {
                  text: 'No',
                  onPress: () => console.log('Cancelled'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => removeVolunteerService(item),
                }
              ], 
              { cancelable: 'false'}
            )}>
                <MaterialIcons name = 'delete' size={30} color = "red"  /> 
               
              </TouchableOpacity>
        <View style = {styles.rightIcon}>
        <AntDesign name = 'right' size={30} />
          <Text style={styles.sectionInfoCard}>
            {item.positionTitle}, {item.organization}
          </Text>
        </View>
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
        <VolunteerServicesForm addVolunteerServices={addVolunteerServices} />
      </View>
      </TouchableWithoutFeedback>
      </ScrollView>
    </Modal>
    <ScrollView>
      <Text>
      
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
//positionTitle: '', organization: '', location: '', startDate: '', endDate: '', totalHrs: '', gradesParticipated: '', comments: ''
function VolunteerServicesForm({addVolunteerServices})
{
  const volunteerServicesSchema = yup.object({
    positionTitle: yup.string().required('This field is required.').min(3, 'Must be at least 3 characters'),
    organization: yup.string().required('This field is required.').min(3, 'Must be at least 3 characters'),
    location: yup.string().required('This field is required.').min(3, 'Must be at least 3 characters'),  
    startDate: yup.date().required('This field is required.').max(new Date()),
    endDate: yup.date().max(new Date()),
    totalHrs: yup.number().required('This field is required.').positive(),
    gradesParticipated: yup.string().required('This field is required.'),
    comments: yup.string()
  })

  return(
    <View>
      <Formik
        initialValues={{ positionTitle: '', organization: '', location: '', startDate: '', endDate: '', totalHrs: '', gradesParticipated: '', comments: ''}}
        validationSchema={volunteerServicesSchema}
        onSubmit={(values) => {
          console.log(values);
          addVolunteerServices(values);
        }}
      >
      {(props) => (
          <KeyboardAwareScrollView>
            <Text style = {{marginTop: 5}}>Position Title:</Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Position Title: '
              onChangeText={props.handleChange('positionTitle')}
              value={props.values.positionTitle}
              onBlur={props.handleBlur('positionTitle')}
            />
            <Text style = {styles.errorText}>{props.touched.positionTitle && props.errors.positionTitle}</Text>
            
            <Text style = {{marginTop: 5}}>Organization:</Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Organization: '
              onChangeText={props.handleChange('organization')}
              value={props.values.organization}
              onBlur={props.handleBlur('organization')}
            />
            <Text style = {styles.errorText}>{props.touched.organization && props.errors.organization}</Text>

            <Text style = {{marginTop: 5}}>Location:</Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Location: '
              onChangeText={props.handleChange('location')}
              value={props.values.location}
              onBlur={props.handleBlur('location')}
            />
            <Text style = {styles.errorText}>{props.touched.location && props.errors.location}</Text>

            <Text style = {{marginTop: 5}}>Start Date: (YYYY-MM-DD)</Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Start Date: (YYYY-MM-DD) '
              onChangeText={props.handleChange('startDate')}
              value={props.values.startDate}
              onBlur={props.handleBlur('startDate')}
            />
            <Text style = {styles.errorText}>{props.touched.startDate && props.errors.startDate}</Text>
            <Text style = {{marginTop: 5}}>End Date: (YYYY-MM-DD)</Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='End Date: (YYYY-MM-DD) '
              onChangeText={props.handleChange('endDate')}
              value={props.values.endDate}
              onBlur={props.handleBlur('endDate')} 
            />
            <Text style = {styles.errorText}>{props.touched.endDate && props.errors.endDate}</Text>

            <Text style = {{marginTop: 5}}>Total Hours: </Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Total Hours: '
              onChangeText={props.handleChange('totalHrs')}
              value={props.values.totalHrs}
              onBlur={props.handleBlur('totalHrs')}
              keyboardType='numeric'
            />
            <Text style = {styles.errorText}>{props.touched.totalHrs && props.errors.totalHrs}</Text>
            <Text style = {{marginTop: 5}}>Grades Participated: </Text>
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
            <Text style = {styles.errorText}>{props.touched.comments && props.errors.comments}</Text>

            
            <Button title='Submit' onPress={props.handleSubmit} />
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  )
}
function VolunteerServicesInfo({route, navigation})
{
  const {item} = route.params;

  

  return(
    <View>
    <Card>
      <View>
      <View style = {styles.rightIcon}>
            
        </View>
        <Text>Position Title: {item.positionTitle}</Text>
        <Text>Organization: {item.organization} </Text>
        <Text>Location: {item.location} </Text>
        <Text>Start Date: {item.startDate}</Text>
        <Text>End Date: {item.endDate} </Text>
        <Text>Total Hours: {item.totalHrs}</Text>
        <Text>Grades Participated: {item.gradesParticipated}</Text>
        <Text>Comments: {item.comments} </Text>

      </View>
    </Card>
    </View>
    
  );
}

function EC({navigation}) //Extracurricular Activities
{
  // const [ecs, setECS] = useState([
  //   {activity: 'Taekwondo', startDate: '2021/3/12', endDate: '2022/5/12', avgHrsPerWeek: '4', totalHrs: '234', gradesParticipated: '9, 10, 11', comments: "i'm bruce lee", key: '1'},

  // ])
  // const addEC = (ec) => {
  //   ec.key = Math.random().toString();
  //   setECS((currentEC) => {
  //     return [ec, ...currentEC]
  //   });
  //   setModalOpen(false);
  // }

  const [ecs, setECS] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    loadECS(); 
  }, []);
  const loadECS = async () => {
    console.log("load ECS called");
    try {
      const storedECS = await AsyncStorage.getItem("storedECS");
      if (storedECS !== null) {
        setECS(JSON.parse(storedECS));
      }
    } catch (e) {
      alert('Failed to fetch the input from storage: ' + e);
    }
  };

  const addEC = async (ec) => {
    ec.key = Math.random().toString();
    const newECS = [...ecs, ec];

    try {
      await AsyncStorage.setItem("storedECS", JSON.stringify(newECS));
      setECS(newECS);
      setModalOpen(false);
      console.log({ ecs: newECS });
    } catch (error) {
      console.log(error);
    }
  };
  const removeEC = async (ec) => {
    try {
      const newECS = ecs.filter(item => item !== ec);

      await AsyncStorage.setItem("storedECS", JSON.stringify(newECS));
      setECS(newECS);
    } catch (error) {
      console.log(error);
    }
  };

  return(
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('keyboard dismissed');
    }}>
  <View>
    <FlatList
      data={ecs}
      renderItem={({item}) =>(
        <Card>
        <TouchableOpacity onPress={() => navigation.navigate('Extracurricular Activities Info', {item})}>
        <TouchableOpacity onPress={()=>Alert.alert(
              'Are you sure you want to delete this?',
              'You cannot undo this action.',
              [
                {
                  text: 'No',
                  onPress: () => console.log('Cancelled'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => removeEC(item),
                }
              ], 
              { cancelable: 'false'}
            )}>
                <MaterialIcons name = 'delete' size={30} color = "red"  /> 
                </TouchableOpacity>
        <View style = {styles.rightIcon}>
        <AntDesign name = 'right' size={30} />
          <Text style={styles.sectionInfoCard}>
            {item.activity}
          </Text>
        </View>
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
        <ECSForm addEC={addEC} />
      </View>
      </TouchableWithoutFeedback>
      </ScrollView>
    </Modal>
    <ScrollView>
      <Text>
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

function ECSForm({addEC})
{
  const ECSchema = yup.object({
    activity: yup.string().required('This field is required.').min(3, 'Must be at least 3 characters'),
    startDate: yup.date().required('This field is required.').max(new Date()),
    endDate: yup.date().max(new Date()),
    avgHrsPerWeek: yup.number().required('This field is required.').positive().max(168, 'Must be less than 168'),
    totalHrs: yup.number().required('This field is required.').positive(),
    gradesParticipated: yup.string().required('This field is required.'),
    comments: yup.string()

    
  })

  return(
    <View>
      <Formik
        initialValues={{ activity: '', startDate: '', endDate: '', avgHrsPerWeek: '', totalHrs: '', gradesParticipated: '', comments: ''}}
        validationSchema={ECSchema}
        onSubmit={(values) => {
          console.log(values);
          addEC(values);
        }}
      >
      {(props) => (
          <KeyboardAwareScrollView>
            <Text style = {{marginTop: 5}}>Activity: </Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Activity: '
              onChangeText={props.handleChange('activity')}
              value={props.values.activity}
              onBlur={props.handleBlur('activity')}
            />
            <Text style = {styles.errorText}>{props.touched.activity && props.errors.activity}</Text>
            <Text style = {{marginTop: 5}}>Start Date: (YYYY-MM-DD)</Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Start Date: (YYYY-MM-DD) '
              onChangeText={props.handleChange('startDate')}
              value={props.values.startDate}
              onBlur={props.handleBlur('startDate')}
            />
            <Text style = {styles.errorText}>{props.touched.startDate && props.errors.startDate}</Text>
            <Text style = {{marginTop: 5}}>End Date: (YYYY-MM-DD)</Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='End Date: (YYYY-MM-DD) '
              onChangeText={props.handleChange('endDate')}
              value={props.values.endDate}
              onBlur={props.handleBlur('endDate')} 
            />
            <Text style = {styles.errorText}>{props.touched.endDate && props.errors.endDate}</Text>
            <Text style = {{marginTop: 5}}>Average Number of Hours Per Week:</Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Average Number of Hours Per Week: '
              onChangeText={props.handleChange('avgHrsPerWeek')}
              value={props.values.avgHrsPerWeek}
              keyboardType='numeric'
              onBlur={props.handleBlur('avgHrsPerWeek')}
            />
            <Text style = {styles.errorText}>{props.touched.avgHrsPerWeek && props.errors.avgHrsPerWeek}</Text>
            <Text style = {{marginTop: 5}}>Total Hours: </Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Total Hours: '
              onChangeText={props.handleChange('totalHrs')}
              value={props.values.totalHrs}
              onBlur={props.handleBlur('totalHrs')}
              keyboardType='numeric'
            />
            <Text style = {styles.errorText}>{props.touched.totalHrs && props.errors.totalHrs}</Text>
            <Text style = {{marginTop: 5}}>Grades Participated: </Text>
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
            <Text style = {styles.errorText}>{props.touched.comments && props.errors.comments}</Text>

            
            <Button title='Submit' onPress={props.handleSubmit} />
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  )
}

function ECInfo({route, navigation})
{
  const {item} = route.params;

  

  return(
    <View>
    <Card>
      <View>
      
        <Text>Activity Name: {item.activity}</Text>
        <Text>Start Date: {item.startDate}</Text>
        <Text>End Date: {item.endDate} </Text>
        <Text>Average Hours Per Week: {item.avgHrsPerWeek} </Text>
        
        <Text>Total Hours: {item.totalHrs}</Text>
        <Text>Grades Participated: {item.gradesParticipated}</Text>
        <Text>Comments: {item.comments} </Text>

      </View>
    </Card>
    </View>
    
  );
}

function AwardsCertificates({navigation})
{
  const[acs, setACS] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadACS(); 
  }, []); 

  const loadACS = async () => {
    console.log("load acs called");
    try {
      const storedACS = await AsyncStorage.getItem("storedACS");
      if (storedACS !== null) {
        setACS(JSON.parse(storedACS));
      }
    } catch (e) {
      alert('Failed to fetch the input from storage: ' + e);
    }
  };
  const addAC = async (ac) => {
    ac.key = Math.random().toString();
    const newACS = [...acs, ac];

    try {
      await AsyncStorage.setItem("storedACS", JSON.stringify(newACS));
      setACS(newACS);
      setModalOpen(false);
      console.log({ acs: newACS });
    } catch (error) {
      console.log(error);
    }
  };
  const removeAC = async (ac) => {
    try {
      const newACS = acs.filter(item => item !== ac);

      await AsyncStorage.setItem("storedACS", JSON.stringify(newACS));
      setACS(newACS);
    } catch (error) {
      console.log(error);
    }
  };
  

  return(
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('keyboard dismissed');
    }}>
  <View>
    <FlatList
      data={acs}
      renderItem={({item}) =>(
        <Card>
        <TouchableOpacity onPress={() => navigation.navigate('Awards/Certificates Info', {item})}>
        <TouchableOpacity onPress={()=>Alert.alert(
              'Are you sure you want to delete this?',
              'You cannot undo this action.',
              [
                {
                  text: 'No',
                  onPress: () => console.log('Cancelled'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => removeAC(item),
                }
              ], 
              { cancelable: 'false'}
            )}>
                <MaterialIcons name = 'delete' size={30} color = "red"  /> 
               
              </TouchableOpacity>
        <View style = {styles.rightIcon}>
        <AntDesign name = 'right' size={30} />
          <Text style={styles.sectionInfoCard}>
            {item.awardName}
          </Text>
        </View>
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
        <ACSForm addAC={addAC} />
      </View>
      </TouchableWithoutFeedback>
      </ScrollView>
    </Modal>
    <ScrollView>
      <Text>
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
  );

}

function ACSForm({addAC}) //Awards/Certificates form
{
  const acsSchema = yup.object({
    awardName: yup.string().required('This field is required.').min(3, 'Must be at least 3 characters'),
    dateReceived: yup.date().required('This field is required.').max(new Date()),
    gradesReceived: yup.string().required('This field is required.'),
    comments: yup.string()
  })
  return(
    <View>
      <Formik
        initialValues={{ awardName: '', dateReceived: '', gradesReceived: '', comments: ''}}
        validationSchema={acsSchema}
        onSubmit={(values) => {
          console.log(values);
          addAC(values);
        }}
      >
      {(props) => (
        <KeyboardAwareScrollView>
            <Text style = {{marginTop: 5}}>Award Name: </Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Award Name: '
              onChangeText={props.handleChange('awardName')}
              value={props.values.awardName}
              onBlur={props.handleBlur('awardName')}
            />
            <Text style = {styles.errorText}>{props.touched.awardName && props.errors.awardName}</Text>
            <Text style = {{marginTop: 5}}>Date Received: (YYYY-MM-DD)</Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Date Received: (YYYY-MM-DD) '
              onChangeText={props.handleChange('dateReceived')}
              value={props.values.dateReceived}
              onBlur={props.handleBlur('dateReceived')}
            />
            <Text style = {styles.errorText}>{props.touched.dateReceived && props.errors.dateReceived}</Text>

            <Text style = {{marginTop: 5}}>Grades Received: </Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Grades Received: '
              onChangeText={props.handleChange('gradesReceived')}
              value={props.values.gradesReceived}
              onBlur={props.handleBlur('gradesReceived')}
            />
            <Text style = {styles.errorText}>{props.touched.gradesReceived && props.errors.gradesReceived}</Text>
            <TextInput 
              style={styles.formikInput}
              multiline
              placeholder='Comments: '
              onChangeText={props.handleChange('comments')}
              value={props.values.comments}
              onBlur={props.handleBlur('comments')}
            />
            <Text style = {styles.errorText}>{props.touched.comments && props.errors.comments}</Text>
            <Button title='Submit' onPress={props.handleSubmit} />
          </KeyboardAwareScrollView>
    
      )}
      </Formik>
    </View>
  )
}

function AwardsCertificatesInfo({route, navigation})
{
  const {item} = route.params;

  

  return(
    <View>
    <Card>
      <View>
      <View style = {styles.rightIcon}>
            
        </View>
        <Text>Award Name: {item.awardName}</Text>
        <Text>Date Received: {item.dateReceived} </Text>
        
        <Text>Grades Received: {item.gradesReceived}</Text>
        <Text>Comments: {item.comments} </Text>

      </View>
    </Card>
    </View>
    
  );
}

function SA({navigation}) //Skills/Achievements
{
  const [sas, setSAS] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadSAS(); 
  }, []); 

  const loadSAS = async () => {
    console.log("load sas called");
    try {
      const storedSAS = await AsyncStorage.getItem("storedSAS");
      if (storedSAS !== null) {
        setSAS(JSON.parse(storedSAS));
      }
    } catch (e) {
      alert('Failed to fetch the input from storage: ' + e);
    }
  };

  const addSA = async (sa) => {
    sa.key = Math.random().toString();
    const newSAS = [...sas, sa];

    try {
      await AsyncStorage.setItem("storedSAS", JSON.stringify(newSAS));
      setSAS(newSAS);
      setModalOpen(false);
      console.log({ sas: newSAS });
    } catch (error) {
      console.log(error);
    }
  };
  const removeSA = async (sa) => {
    try {
      const newSAS = sas.filter(item => item !== sa);

      await AsyncStorage.setItem("storedSAS", JSON.stringify(newSAS));
      setSAS(newSAS);
    } catch (error) {
      console.log(error);
    }
  };

  return(
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <FlatList
          data={sas}
          renderItem={({ item }) => (
            <Card>
              <TouchableOpacity
                onPress={() => navigation.navigate('Skill/Academic Achievements Info', { item })}
              >
              <TouchableOpacity onPress={()=>Alert.alert(
              'Are you sure you want to delete this?',
              'You cannot undo this action.',
              [
                {
                  text: 'No',
                  onPress: () => console.log('Cancelled'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => removeSA(item),
                }
              ], 
              { cancelable: 'false'}
            )}>
                <MaterialIcons name = 'delete' size={30} color = "red"  /> 
               
              </TouchableOpacity>
                <View style={styles.rightIcon}>
                  <AntDesign name="right" size={30} />
                  <Text style={styles.sectionInfoCard}>{item.SAName}</Text>
                </View>
              </TouchableOpacity>
            </Card>
          )}
        />
        <Modal visible={modalOpen} animationType="slide">
          <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={styles.modalContent}>
                <MaterialIcons
                  name="close"
                  size={50}
                  color="black"
                  style={{ ...styles.modalToggle, ...styles.modalClose }}
                  onPress={() => setModalOpen(false)}
                />
                <SASForm addSA={addSA} />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </Modal>
        <ScrollView>
          <Text>
            
            <View style={{ paddingLeft: 170, paddingTop: 20 }}>
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
  );
}

function SASForm({addSA}, {sas})
{
  const sasSchema = yup.object({
    SAName: yup.string().required('This field is required.').min(3, 'Must be at least 3 characters'),
    dateAwarded: yup.date().required('This field is required.').max(new Date()),
    comments: yup.string()
  })

  return(
    <View>
      <Formik
        initialValues={{ SAName: '', dateAwarded: '', comments: ''}}
        validationSchema={sasSchema}
        onSubmit={(values) => {
          console.log(values);
          addSA(values);
          
        }}
      >
      {(props) => (
          <KeyboardAwareScrollView>
            <Text style = {{marginTop: 5}}>Skill/Achievement: </Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Skill/Achievement: '
              onChangeText={props.handleChange('SAName')}
              value={props.values.SAName}
              onBlur={props.handleBlur('SAName')}
            />
            <Text style = {styles.errorText}>{props.touched.SAName && props.errors.SAName}</Text>

            <Text style = {{marginTop: 5}}>Date Awarded: (YYYY-MM-DD)</Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Date Awarded: (YYYY-MM-DD) '
              onChangeText={props.handleChange('dateAwarded')}
              value={props.values.dateAwarded}
              onBlur={props.handleBlur('dateAwarded')}
            />
            <Text style = {styles.errorText}>{props.touched.dateAwarded && props.errors.dateAwarded}</Text>
            <TextInput 
              style={styles.formikInput}
              multiline
              placeholder='Comments: '
              onChangeText={props.handleChange('comments')}
              value={props.values.comments}
              onBlur={props.handleBlur('comments')}
            />
            <Text style = {styles.errorText}>{props.touched.comments && props.errors.comments}</Text>

            
            <Button title='Submit' onPress={props.handleSubmit} />
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  )
}

function SAInfo({route})
{
  const {item} = route.params;
  return (
    <View>
    <Card>
      <View>
      <View style = {styles.rightIcon}>
        </View>
        <Text>Skill/Achievement: {item.SAName}</Text>
        <Text>Date Awarded: {item.dateAwarded}</Text>
        <Text>Comments: {item.comments} </Text>

      </View>
    </Card>
    </View>
  );
}

function MA({navigation}) //Music/Artistic Achievements
{
  const [mas, setMAS] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadMAS(); 
  }, []); 

  const loadMAS = async () => {
    console.log("load mas called");
    try {
      const storedMAS = await AsyncStorage.getItem("storedMAS");
      if (storedMAS !== null) {
        setMAS(JSON.parse(storedMAS));
      }
    } catch (e) {
      alert('Failed to fetch the input from storage: ' + e);
    }
  };

  const addMA = async (ma) => {
    ma.key = Math.random().toString();
    const newMAS = [...mas, ma];

    try {
      await AsyncStorage.setItem("storedMAS", JSON.stringify(newMAS));
      setMAS(newMAS);
      setModalOpen(false);
      console.log({ mas: newMAS });
    } catch (error) {
      console.log(error);
    }
  };
  const removeMA = async (ma) => {
    try {
      const newMAS = mas.filter(item => item !== ma);

      await AsyncStorage.setItem("storedMAS", JSON.stringify(newMAS));
      setMAS(newMAS);
    } catch (error) {
      console.log(error);
    }
  };

  return(
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <FlatList
          data={mas}
          renderItem={({ item }) => (
            <Card>
              <TouchableOpacity
                onPress={() => navigation.navigate('Music/Artistic Achievements Info', { item })}
              >
              <TouchableOpacity onPress={()=>Alert.alert(
              'Are you sure you want to delete this?',
              'You cannot undo this action.',
              [
                {
                  text: 'No',
                  onPress: () => console.log('Cancelled'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => removeMA(item),
                }
              ], 
              { cancelable: 'false'}
            )}>
                <MaterialIcons name = 'delete' size={30} color = "red"  /> 
               
              </TouchableOpacity>
                <View style={styles.rightIcon}>
                  <AntDesign name="right" size={30} />
                  <Text style={styles.sectionInfoCard}>{item.MAName}</Text>
                </View>
              </TouchableOpacity>
            </Card>
          )}
        />
        <Modal visible={modalOpen} animationType="slide">
          <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={styles.modalContent}>
                <MaterialIcons
                  name="close"
                  size={50}
                  color="black"
                  style={{ ...styles.modalToggle, ...styles.modalClose }}
                  onPress={() => setModalOpen(false)}
                />
                <MASForm addMA={addMA} />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </Modal>
        <ScrollView>
          <Text>
            
            <View style={{ paddingLeft: 170, paddingTop: 20 }}>
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
  );
}

function MASForm({addMA}, {mas})
{
  const masSchema = yup.object({
    MAName: yup.string().required('This field is required.').min(3, 'Must be at least 3 characters'),
    dateAwarded: yup.date().required('This field is required.').max(new Date()),
    avgHrsPerWeek: yup.number().required('This field is required.').positive().max(168, 'Must be less than 168'),
    totalHrs: yup.number().required('This field is required.').positive(),
    comments: yup.string()
  })
  return(
    <View>
      <Formik
        initialValues={{ MAName: '', dateAwarded: '', avgHrsPerWeek: '', totalHrs: '', comments: ''}}
        validationSchema={masSchema}
        onSubmit={(values) => {
          console.log(values);
          addMA(values);
        }}
      >
      {(props) => (
          <KeyboardAwareScrollView>
            <Text style = {{marginTop: 5}}>Music/Artistic Achievement: </Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Music/Artistic Achievement:: '
              onChangeText={props.handleChange('MAName')}
              value={props.values.MAName}
              onBlur={props.handleBlur('MAName')}
            />
            <Text style = {styles.errorText}>{props.touched.MAName && props.errors.MAName}</Text>
            <Text style = {{marginTop: 5}}>Date Awarded: (YYYY-MM-DD)</Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Date Awarded: (YYYY-MM-DD) '
              onChangeText={props.handleChange('dateAwarded')}
              value={props.values.dateAwarded}
              onBlur={props.handleBlur('dateAwarded')}
            />
            <Text style = {styles.errorText}>{props.touched.dateAwarded && props.errors.dateAwarded}</Text>
            <Text style = {{marginTop: 5}}>Average Number of Hours Per Week:</Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Average Number of Hours Per Week: '
              onChangeText={props.handleChange('avgHrsPerWeek')}
              value={props.values.avgHrsPerWeek}
              keyboardType='numeric'
              onBlur={props.handleBlur('avgHrsPerWeek')}
            />
            <Text style = {styles.errorText}>{props.touched.avgHrsPerWeek && props.errors.avgHrsPerWeek}</Text>
            <Text style = {{marginTop: 5}}>Total Hours: </Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Total Hours: '
              onChangeText={props.handleChange('totalHrs')}
              value={props.values.totalHrs}
              onBlur={props.handleBlur('totalHrs')}
              keyboardType='numeric'
            />
            <Text style = {styles.errorText}>{props.touched.totalHrs && props.errors.totalHrs}</Text>
            <TextInput 
              style={styles.formikInput}
              multiline
              placeholder='Comments: '
              onChangeText={props.handleChange('comments')}
              value={props.values.comments}
              onBlur={props.handleBlur('comments')}
            />
            <Text style = {styles.errorText}>{props.touched.comments && props.errors.comments}</Text>

            
            <Button title='Submit' onPress={props.handleSubmit} />
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  )
}

function MAInfo({route})
{
  const {item} = route.params;

  

  return(
    <View>
    <Card>
      <View>
      
        <Text>Music/Artistic Achievement: {item.MAName}</Text>
        <Text>Date Awarded: {item.dateAwarded}</Text>
        <Text>Average Hours Per Week: {item.avgHrsPerWeek} </Text>
        <Text>Total Hours: {item.totalHrs}</Text>
        <Text>Comments: {item.comments} </Text>

      </View>
    </Card>
    </View>
    
  );
}

function Leadership({navigation}) //Leaderships
{
  const [leaderships, setLeaderships] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    loadLeaderships(); 
  }, []);
  const loadLeaderships = async () => {
    console.log("load leaderships called");
    try {
      const storedLeaderships = await AsyncStorage.getItem("storedLeaderships");
      if (storedLeaderships !== null) {
        setLeaderships(JSON.parse(storedLeaderships));
      }
    } catch (e) {
      alert('Failed to fetch the input from storage: ' + e);
    }
  };

  const addLeadership = async (l) => {
    l.key = Math.random().toString();
    const newLeaderships = [...leaderships, l];

    try {
      await AsyncStorage.setItem("storedLeaderships", JSON.stringify(newLeaderships));
      setLeaderships(newLeaderships);
      setModalOpen(false);
      console.log({ leaderships: newLeaderships });
    } catch (error) {
      console.log(error);
    }
  };
  const removeLeadership = async (l) => {
    try {
      const newLeaderships = leaderships.filter(item => item !== l);

      await AsyncStorage.setItem("storedLeaderships", JSON.stringify(newLeaderships));
      setLeaderships(newLeaderships);
    } catch (error) {
      console.log(error);
    }
  };

  return(
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('keyboard dismissed');
    }}>
  <View>
    <FlatList
      data={leaderships}
      renderItem={({item}) =>(
        <Card>
        <TouchableOpacity onPress={() => navigation.navigate('Leadership Info', {item})}>
        <TouchableOpacity onPress={()=>Alert.alert(
              'Are you sure you want to delete this?',
              'You cannot undo this action.',
              [
                {
                  text: 'No',
                  onPress: () => console.log('Cancelled'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => removeLeadership(item),
                }
              ], 
              { cancelable: 'false'}
            )}>
                <MaterialIcons name = 'delete' size={30} color = "red"  /> 
                </TouchableOpacity>
        <View style = {styles.rightIcon}>
        <AntDesign name = 'right' size={30} />
          <Text style={styles.sectionInfoCard}>
            {item.position}
          </Text>
        </View>
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
        <LeadershipForm addLeadership={addLeadership} />
      </View>
      </TouchableWithoutFeedback>
      </ScrollView>
    </Modal>
    <ScrollView>
      <Text>
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

function LeadershipForm({addLeadership})
{
  const leadershipSchema = yup.object({
    position: yup.string().required('This field is required.').min(3, 'Must be at least 3 characters'),
    comments: yup.string()
  })
  return(
    <View>
      <Formik
        initialValues={{ position: '', comments: ''}}
        validationSchema={leadershipSchema}
        onSubmit={(values) => {
          console.log(values);
          addLeadership(values);
        }}
      >
      {(props) => (
          <KeyboardAwareScrollView>
            <Text style = {{marginTop: 5}}>Position: </Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Position: '
              onChangeText={props.handleChange('position')}
              value={props.values.position}
              onBlur={props.handleBlur('position')}
            />
            <Text style = {styles.errorText}>{props.touched.position && props.errors.position}</Text>
            <TextInput 
              style={styles.formikInput}
              multiline
              placeholder='Comments: '
              onChangeText={props.handleChange('comments')}
              value={props.values.comments}
              onBlur={props.handleBlur('comments')}
            />
            <Text style = {styles.errorText}>{props.touched.comments && props.errors.comments}</Text>

            
            <Button title='Submit' onPress={props.handleSubmit} />
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  )
}

function LeadershipInfo({route})
{
  const {item} = route.params;

  

  return(
    <View>
    <Card>
      <View>
      
        <Text>Position: {item.position}</Text>
        <Text>Comments: {item.comments} </Text>

      </View>
    </Card>
    </View>
    
  );
}

function HC({navigation}) //Honors Classes
{
  const[hcs, setHCS] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    loadHCS(); 
  }, []);
  const loadHCS = async () => {
    console.log("load hcs called");
    try {
      const storedHCS = await AsyncStorage.getItem("storedHCS");
      if (storedHCS !== null) {
        setHCS(JSON.parse(storedHCS));
      }
    } catch (e) {
      alert('Failed to fetch the input from storage: ' + e);
    }
  };

  const addHC = async (hc) => {
    hc.key = Math.random().toString();
    const newHCS = [...hcs, hc];

    try {
      await AsyncStorage.setItem("storedHCS", JSON.stringify(newHCS));
      setHCS(newHCS);
      setModalOpen(false);
      console.log({ hcs: newHCS });
    } catch (error) {
      console.log(error);
    }
  };
  const removeHC = async (hc) => {
    try {
      const newHCS = hcs.filter(item => item !== hc);

      await AsyncStorage.setItem("storedHCS", JSON.stringify(newHCS));
      setHCS(newHCS);
    } catch (error) {
      console.log(error);
    }
  };
  
  return(
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('keyboard dismissed');
    }}>
  <View>
    <FlatList
      data={hcs}
      renderItem={({item}) =>(
        <Card>
        <TouchableOpacity onPress={() => navigation.navigate('Honors Classes Info', {item})}>
        <TouchableOpacity onPress={()=>Alert.alert(
              'Are you sure you want to delete this?',
              'You cannot undo this action.',
              [
                {
                  text: 'No',
                  onPress: () => console.log('Cancelled'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => removeHC(item),
                }
              ], 
              { cancelable: 'false'}
            )}>
                <MaterialIcons name = 'delete' size={30} color = "red"  /> 
                </TouchableOpacity>
        <View style = {styles.rightIcon}>
        <AntDesign name = 'right' size={30} />
          <Text style={styles.sectionInfoCard}>
            {item.className}
          </Text>
        </View>
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
        <HCSForm addHC={addHC} />
      </View>
      </TouchableWithoutFeedback>
      </ScrollView>
    </Modal>
    <ScrollView>
      <Text>
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

function HCSForm({addHC})
{
  const HCSchema = yup.object({
    className: yup.string().required('This field is required.').min(3, 'Must be at least 3 characters'),
    startDate: yup.date().required('This field is required.').max(new Date()),
    endDate: yup.date().max(new Date()),
    comments: yup.string()
  })
  return(
    <View>
      <Formik
        initialValues={{ className: '', startDate: '', endDate: '', comments: ''}}
        validationSchema={HCSchema}
        onSubmit={(values) => {
          console.log(values);
          addHC(values);
        }}
      >
      {(props) => (
          <KeyboardAwareScrollView>
            <Text style = {{marginTop: 5}}>Class Name: </Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Class Name: '
              onChangeText={props.handleChange('className')}
              value={props.values.className}
              onBlur={props.handleBlur('className')}
            />
            <Text style = {styles.errorText}>{props.touched.className && props.errors.className}</Text>
            <Text style = {{marginTop: 5}}>Start Date: (YYYY-MM-DD)</Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Start Date: (YYYY-MM-DD) '
              onChangeText={props.handleChange('startDate')}
              value={props.values.startDate}
              onBlur={props.handleBlur('startDate')}
            />
            <Text style = {styles.errorText}>{props.touched.startDate && props.errors.startDate}</Text>
            <Text style = {{marginTop: 5}}>End Date: (YYYY-MM-DD)</Text>
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
              multiline
              placeholder='Comments: '
              onChangeText={props.handleChange('comments')}
              value={props.values.comments}
              onBlur={props.handleBlur('comments')}
            />
            <Text style = {styles.errorText}>{props.touched.comments && props.errors.comments}</Text>

            
            <Button title='Submit' onPress={props.handleSubmit} />
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  )
} 

function HCInfo({route})
{
  const {item} = route.params;

  

  return(
    <View>
    <Card>
      <View>
      
        <Text>Class Name: {item.className}</Text>
        <Text>Start Date: {item.startDate}</Text>
        <Text>End Date: {item.endDate} </Text>
        <Text>Comments: {item.comments} </Text>

      </View>
    </Card>
    </View>
    
  );
}

function AdditionalInfo({navigation}) // Additional Information
{
  const [aI, setAI] = useState([]);
  const [modalOpen, setModalOpen] = useState(true);
  useEffect(() => {
    loadAI(); 
  }, []); 

  const loadAI = async () => {
    console.log("load AI called");
    try {
      const storedAI = await AsyncStorage.getItem("storedAI");
      if (storedAI !== null) {
        setAI(JSON.parse(storedAI));
       
      }
      
    } catch (e) {
      alert('Failed to fetch the input from storage: ' + e);
    }
  };
  const addAI = async (ai) => {
    ai.key = Math.random().toString();
    const newAI = [...aI, ai];

    try {
      await AsyncStorage.setItem("storedAI", JSON.stringify(newAI));
      setAI(newAI);
      setModalOpen(false);
      console.log({ aI: newAI });
    } catch (error) {
      console.log(error);
    }
  };
  const removeAI = async (ai) => {
    try {
      const newAI = aI.filter(item => item !== ai);

      await AsyncStorage.setItem("storedAI", JSON.stringify(newAI));
      setAI(newAI);
    } catch (error) {
      console.log(error);
    }
  };

  return(
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
        console.log('keyboard dismissed');
      }}>
      <View>
        
          <FlatList data = {aI} renderItem = {({item}) => (
            <Card>
              <TouchableOpacity onPress={()=>Alert.alert(
                'Are you sure you want to delete this?',
                'You cannot undo this action.',
                [
                  {
                    text: 'No',
                    onPress: () => console.log('Cancelled'),
                    style: 'cancel',
                  },
                  {
                    text: 'Yes',
                    onPress: () => removeAI(item),
                  }
                ], 
                { cancelable: 'false'}
              )}>
                  <MaterialIcons name = 'delete' size={30} color = "red"  />
                  <Text style={styles.infoSubtitle}>{item.comments}</Text>
              </TouchableOpacity>
            </Card>
          )}/>
          <Modal visible={modalOpen} animationType="slide">
            <ScrollView>
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.modalContent}>
                  <MaterialIcons
                    name="close"
                    size={50}
                    color="black"
                    style={{ ...styles.modalToggle, ...styles.modalClose }}
                    onPress={() => setModalOpen(false)}
                  />
                  <AIForm addAI={addAI}/>
                 </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </Modal>
          <ScrollView>
            <Text>
              
              <View style={{ paddingLeft: 170, paddingTop: 20 }}>
                <TouchableOpacity>
                </TouchableOpacity>
              </View>
            </Text>
          </ScrollView>
      </View>
    </TouchableWithoutFeedback>
    )
}

function AIForm({addAI})
{
  const AISchema = yup.object({
    comments: yup.string().required(),
  })

  return(
    <View>
      <Formik
        initialValues={{comments: ''}}
        validationSchema={AISchema}
        onSubmit={(values) => {
          console.log(values);
          addAI(values);
        }}
      >
      {(props) => (
        <KeyboardAwareScrollView>
        <TextInput 
              style={styles.formikInput}
              multiline
              placeholder='Additional Info: '
              onChangeText={props.handleChange('comments')}
              value={props.values.comments}
              onBlur={props.handleBlur('comments')}
            />
            <Text style = {styles.errorText}>{props.touched.comments && props.errors.comments}</Text>

            
            <Button title='Submit' onPress={props.handleSubmit} />
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  )
}

function PortfolioViewer() // This screen is where user can see a collection of all the information they inputted as a list of all their notable achievements. 
{
  const source = { //display portfolio as a HTML file
    html: `
  <p style='text-align:center;'>
    Hello World!
  </p>`
  };
  const { width} = useWindowDimensions();
  const labelMappings = {
      
    firstName: 'First Name',
    lastName: 'Last Name',
    phoneNum: 'Phone Number',
    email: 'Email',
    address: 'Address',

    
    sportName: 'Sport Name',
    avgHrsPerWeek: 'Average Hours per Week',
    totalHrs: 'Total Hours',
    gradesParticipated: 'Grades Participated',

    
    className: 'Class Name',
    schoolName: 'School Name',
    beginningGrade: 'Beginning Grade',
    dateReceived: 'Date Received',
    dateAwarded: 'Date Awarded',
    gradesReceived: 'Grades Received',
    SAName: 'Skill/Academic Achievement',
    MAName: 'Music/Artistic Achievement',

  
    organization: 'Organization',
    location: 'Location',



    
    positionTitle: 'Position Title',
    activity: 'Activity',
    awardName: 'Award Name',
    
    startDate: 'Start Date',
    endDate: 'End Date',
    comments: 'Comments',
  };

  const { state, dispatch } = useAppContext(); // global state system using React Context and Reducer (Refer to AppContext.js for more information on how it is implemented)
  const { personalInfo,
        sports,
        educations,
        volunteerServices, 
        ecs, 
        acs, 
        sas, 
        mas, 
        leaderships, 
        hcs, 
        aI} = state;
    const [sections, setSections] = useState([]);

   
  const [personalInfoData, setPersonalInfoData] = useState([]);
  const [sportsData, setSportsData] = useState([]);
  const[educationsData, setEducationsData] = useState([]);
  const [volunteerServicesData, setVolunteerServicesData] = useState([]);
  const [ecsData, setECSData] = useState([]);
  const [acsData, setACSData] = useState([]);
  const [sasData, setSASData] = useState([]);
  const [masData, setMASDATA] = useState([]);
  const [leadershipsData, setLeadershipsData] = useState([]);
  const [hcsData, setHCSData] = useState([]);
  const [aiData, setAIData] = useState([]);
  
  const fetchData = async () => { //fetches data from all sections and pushes them into their respective sections in state
    try {
      const newSections = [];
      const storedPersonalInfo = await AsyncStorage.getItem("storedPersonalInfo");
      const storedSports = await AsyncStorage.getItem("storedSports");
      const storedEducations = await AsyncStorage.getItem("storedEducations");
      const storedVolunteerServices = await AsyncStorage.getItem("storedVolunteerServices");
      const storedECS = await AsyncStorage.getItem("storedECS");
      const storedACS = await AsyncStorage.getItem("storedACS");
      const storedSAS = await AsyncStorage.getItem("storedSAS");
      const storedMAS = await AsyncStorage.getItem("storedMAS");
      const storedLeaderships = await AsyncStorage.getItem("storedLeaderships");
      const storedHCS = await AsyncStorage.getItem("storedHCS");
      const storedAI = await AsyncStorage.getItem("storedAI");

      if (storedPersonalInfo !== null) {
        const personalInfoData = JSON.parse(storedPersonalInfo);
       // setPersonalInfoData(personalInfoData);
       if(personalInfoData.length > 0)
       {
        newSections.push({ title: 'Personal Info Data', data: personalInfoData });
        dispatch({ type: 'SET_PERSONALINFO', payload: personalInfoData });
       }
       
      }
      if (storedSports !== null) {
        const sportsData = JSON.parse(storedSports);
      //  setSportsData(sportsData);
      if(sportsData.length > 0)
      {
        newSections.push({ title: 'Sports Data', data: sportsData });
        dispatch({ type: 'SET_SPORTS', payload: sportsData });
      }
 
      }
      if (storedEducations !== null) {
        const educationsData = JSON.parse(storedEducations);
       // setEducationsData(educationsData);
       if(educationsData.length > 0)
       {
        newSections.push({ title: 'Educations Data', data: educationsData });
       
        dispatch({ type: 'SET_EDUCATIONS', payload: educationsData });
       }
       
      }
      if (storedVolunteerServices !== null) {
        const volunteerServicesData = JSON.parse(storedVolunteerServices);
       //setVolunteerServicesData(volunteerServicesData);
       if(volunteerServicesData.length > 0)
       {
        newSections.push({ title: 'Volunteer Services Data', data: volunteerServicesData });
        dispatch({ type: 'SET_VOLUNTEERSERVICES', payload: volunteerServicesData });
       }
       
      }
      if (storedECS !== null) {
        const ecsData = JSON.parse(storedECS);
        //setECSData(ecsData);
        if(ecsData.length > 0)
       {
        newSections.push({ title: 'ECS Data', data: ecsData });
        dispatch({ type: 'SET_ECS', payload: ecsData });
       }
        
      }
      if (storedACS !== null) {
        const acsData = JSON.parse(storedACS);
       //setACSData(acsData);
       if(acsData.length > 0)
       {
        newSections.push({ title: 'ACS Data', data: acsData });
        dispatch({ type: 'SET_ACS', payload: acsData });
       }
       
      }
      if (storedSAS !== null) {
        const sasData = JSON.parse(storedSAS);
      // setSASData(sasData);
        if(sasData.length > 0)
        {
          newSections.push({ title: 'SAS Data', data: sasData });
          dispatch({ type: 'SET_SAS', payload: sasData });
        }
      
      }
      if (storedMAS !== null) {
        const masData = JSON.parse(storedMAS);
      // setMASDATA(masData);
        if(masData.length > 0)
        {
          newSections.push({ title: 'MAS Data', data: masData });
          dispatch({ type: 'SET_MAS', payload: masData });
        }
       
      }
      if (storedLeaderships !== null) {
        const leadershipsData = JSON.parse(storedLeaderships);
        //setLeadershipsData(leadershipsData);
        if(leadershipsData.length > 0)
        {
          newSections.push({ title: 'Leaderships Data', data: leadershipsData });
          dispatch({ type: 'SET_LEADERSHIPS', payload: leadershipsData });
        }
       
      }
      if (storedHCS !== null) {
        const hcsData = JSON.parse(storedHCS);
        //setHCSData(hcsData);
        if(hcsData.length > 0) {
          newSections.push({ title: 'HCS Data', data: hcsData });
        // Update the global state or perform any other actions with the fetched HCS data
        dispatch({ type: 'SET_HCS', payload: hcsData });
        }
        
      }

      if (storedAI !== null) {
        const aiData = JSON.parse(storedAI);
       // setAIData(aiData);
       if(aiData.length > 0) {
        newSections.push({ title: 'AI Data', data: aiData });
        // Update the global state or perform any other actions with the fetched AI data
        dispatch({ type: 'SET_AI', payload: aiData });
       }
        
      }
      setSections(prevSections => [...prevSections, ...newSections]);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
      
  
    }
  
    useEffect(() => {
      fetchData();
    }, []);

   
    const renderLabel = (key) => labelMappings[key] || key;
    const renderItem = ({ item }) => {
      // Render individual properties of each object
      const properties = Object.entries(item).map(([key, value]) => (
        <Text key={key}>
          {key}: {value}
        </Text>
      ));
       const { MAName, dateAwarded, SAName, activity, awardName, dateReceived, gradesReceived, positionTitle, organization, schoolName, location, beginningGrade, 
        sportName, avgHrsPerWeek, totalHrs, gradesParticipated, firstName, lastName, address, phoneNum, email, className, startDate, endDate, comments } = item;
  
      // const { className, startDate, endDate, comments} = item;
      return (
        <View>
          <Card>
          {/* Display properties of each object */}
         {item.firstName && <Text>First Name: {item.firstName}</Text>}
         {item.lastName  && <Text>Last Name: {item.lastName}</Text>}
         {item.phoneNum  && <Text>Phone Number: {item.phoneNum}</Text>}
         {item.email  && <Text>Email: {item.email}</Text>}
         {item.organization  && <Text>Organization: {item.organization}</Text>}
         {item.className && <Text>Class Name: {item.className}</Text>}
          {item.MAName && <Text>Music/Artistic Achievement: {item.MAName}</Text>}
         {item.SAName  && <Text>Skill/Academic Achievement: {item.SAName}</Text>}
         {item.positionTitle  &&<Text>Position Title: {item.positionTitle}</Text>}
         {item.activity  && <Text>Activity: {item.activity}</Text>}
         {item.awardName  && <Text>Award Name: {item.awardName}</Text>}
         {item.schoolName && <Text>School Name: {item.schoolName}</Text>}
         {item.sportName  && <Text>Sport Name: {item.sportName}</Text>}

         {item.organization && <Text>Organization: {item.organization}</Text>}
         {item.location  && <Text>Location: {item.location}</Text>}

         {item.beginningGrade && <Text>Beginning Grade: {item.beginningGrade}</Text>}

         {item.dateReceived  && <Text>Date Received: {item.dateReceived}</Text>}
         {item.dateAwarded  && <Text>Date Awarded: {item.dateAwarded}</Text>} 
         {item.startDate && <Text>Start Date: {item.startDate}</Text>}
         {item.endDate && <Text>End Date: {item.endDate}</Text>}

          {item.avgHrsPerWeek && <Text>Average Hours per Week: {item.avgHrsPerWeek}</Text>}
         {item.totalHrs  && <Text>Total Hours: {item.totalHrs}</Text>}

         {item.gradesReceived  && <Text>Grades Received: {item.gradesReceived}</Text>}
         {item.gradesParticipated && <Text>Grades Participated: {item.gradesParticipated}</Text>} 

         {item.comments && <Text>Comments: {item.comments}</Text>}
          
          
          </Card>
        </View>
      );
    };
   
  return (
    
    //  <RenderHtml contentWidth={width} source={source}/> 
    <View>
      <ScrollView>
  {sections.map((section, sectionIndex) => (
    section.data.length > 0 && (
      <View key={sectionIndex} style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{section.title}</Text>
        {section.data.map((item, itemIndex) => (
          <View key={itemIndex} style={{ marginVertical: 5 }}>
            <Card>
              {Object.entries(item)
                .filter(([key]) => key !== 'key')
                .map(([key, value]) => (
                  // Conditionally render if the value exists and is not empty
                  value && (
                    <Text key={key}>{renderLabel(key)}: {value}</Text>
                  )
                ))}
            </Card>
          </View>
        ))}
      </View>
    )
  ))}
</ScrollView>
    {/* {personalInfoData.length > 0 && (
          <>
          
            <Text>Personal Info Data:</Text>
            
            <FlatList
              data={personalInfoData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          
          </>
        )}
        {sportsData.length > 0 && (
          <>
          
            <Text>Sports Data:</Text>
            
            <FlatList
              data={sportsData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          
          </>
        )}
        
       {educationsData.length > 0 && (
          <>
          
            <Text>Education Data:</Text>
            
            <FlatList
              data={educationsData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          
          </>
        )}
        {volunteerServicesData.length > 0 && (
          <>
          
            <Text>Volunteer Services Data:</Text>
            
            <FlatList
              data={volunteerServicesData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          
          </>
        )}
        {ecsData.length > 0 && (
          <>
          
            <Text>ECS Data:</Text>
            
            <FlatList
              data={ecsData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          
          </>
        )}
        {acsData.length > 0 && (
          <>
          
            <Text>ACS Data:</Text>
            
            <FlatList
              data={acsData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          
          </>
        )}
        {sasData.length > 0 && (
          <>
          
            <Text>SAS Data:</Text>
            
            <FlatList
              data={sasData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          
          </>
        )}
        {masData.length > 0 && (
          <>
          
            <Text>MAS Data:</Text>
            
            <FlatList
              data={masData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          
          </>
        )}
        {leadershipsData.length > 0 && (
          <>
          
            <Text>Leadership Data:</Text>
            
            <FlatList
              data={leadershipsData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          
          </>
        )}
      {hcsData.length > 0 && (
        <>
          <Text>HCS Data:</Text>
          
          <FlatList
            
            data={hcsData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        
        </>
      )}

      {aiData.length > 0 && (
        <>
          <Text>AI Data:</Text>
          <FlatList
            data={aiData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )} */}

      {/* Other UI components */}
      
    </View>
    
  );
}

const Stack = createNativeStackNavigator(); //App runs on stack navigation


export default function App({navigation}) { //main App function
  
  const html = `
  
  <html>
    <body>
      <h1>Hi buddy </h1>
      <p style="color red;">Hello. Bonjour. </p>
    </body
  </html>
`;

const generatePDF = async () => {
  console.log('print pdf called');
  const file = await printToFileAsync({
    html: html,
    base64: false
  });

  await shareAsync(file.uri);
}

const [selectedPrinter, setSelectedPrinter] = useState();

const print = async () => {
  await Print.printAsync({
    html,
    printerUrl: selectedPrinter?.url,
  });
};

const printToFile = async () => {
  const {uri} = await Print.printToFileAsync({html});
  console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
};

const selectPrinter = async () => {
  const printer = await Print.selectPrinterAsync(); // iOS only
  setSelectedPrinter(printer);
};

    
  return (
    <AppProvider> 
    {/* AppProvider lets use React Context and Reducer by wrapping it across all screens. */}
    <NavigationContainer>
      <Stack.Navigator > 
      {/* all the different screens  */}
        <Stack.Screen 
          name = "Home" 
          component={HomeScreen}
          options={{ headerTitle: (props) => <Header {...props} />, headerBackTitleVisible: false}}
          // options={({props}) => ({
          //   headerLeft: () => (
              
          //       <Image 
          //         source={require('./assets/icon.png')}
          //         style = {{paddingLeft: 5}}
                  
          //       />
             
          //   ),
          //   headerTitle: (props) => <Header {...props} />, headerBackTitle: false
          // })}
        />
        <Stack.Screen name = "Portfolio List" component={PortfolioList} />
        <Stack.Screen 
          name = "Portfolio 1 Builder" 
          component={Portfolio1Builder} //onPress={printToFile}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity>
                <Feather
                  name="check"
                  size={40}
                  style={{ paddingRight: 10 }}
                  color="blue"
                  onPress={() => navigation.navigate('Portfolio Viewer')}
                />
              </TouchableOpacity>
            ),
          })}

          />
        <Stack.Screen 
          name = "Personal Info"
          component={PersonalInfo}
          //options={{ headerTitle: (props) => <Header {...props} />, headerBackTitleVisible: false}}
           />
        <Stack.Screen name = "Athletic Achievements"  component={AthleticAchievements}/>
        <Stack.Screen name = "Sport Info" component={SportInfo}/>
        <Stack.Screen name = "Education" component={Education}/>
        <Stack.Screen name = "Education Info" component={EducationInfo}/>
        <Stack.Screen name = "Volunteer Services" component={VolunteerServices}/>
        <Stack.Screen name = "Volunteer Services Info" component={VolunteerServicesInfo}/>
        <Stack.Screen name = "Extracurricular Activities" component={EC}/>
        <Stack.Screen name = "Extracurricular Activities Info" component={ECInfo}/>
        <Stack.Screen name = "Awards/Certificates" component ={AwardsCertificates}/>
        <Stack.Screen name = "Awards/Certificates Info" component = {AwardsCertificatesInfo}/>
        <Stack.Screen name = "Skills/Academic Achievements" component ={SA}/>
        <Stack.Screen name = "Skill/Academic Achievements Info" component = {SAInfo}/>
        <Stack.Screen name = "Music/Artistic Achievements" component ={MA}/>
        <Stack.Screen name = "Music/Artistic Achievements Info" component = {MAInfo}/>
        <Stack.Screen name = "Leadership" component={Leadership}/>
        <Stack.Screen name = "Leadership Info" component={LeadershipInfo}/>
        <Stack.Screen name = "Additional Information" component={AdditionalInfo}/>
        <Stack.Screen name = "Honors Classes" component={HC}/>
        <Stack.Screen name = "Honors Classes Info" component={HCInfo}/>
        <Stack.Screen name = "Portfolio Viewer" component={PortfolioViewer}/>

      </Stack.Navigator>
    </NavigationContainer>
    </AppProvider>
    
    
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

const styles = StyleSheet.create({ //all styles for components seen throughout the App
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

  deleteIcon: {
    color: 'crimson',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    textAlign: 'right',
    

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

rightIcon: {
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  alignItems: 'center',
  //padding: 3,
},

sectionInfoCard: {
  flex: 1,
  textAlign: 'left',
  //flexDirection: 'row',
  fontSize: 30,
  padding: 6,
  
},
portfolioBuilderCard: {
  flex: 1,
  textAlign: 'left',
  fontSize: 26,
  padding:5 ,
},
infoSubtitle: {
  flex: 1,
  textAlign: 'left',
  //flexDirection: 'row',
  fontSize: 18,
  padding: 6,
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