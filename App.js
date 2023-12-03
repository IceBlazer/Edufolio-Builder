//To begin running terminal commands do: cd PROJECTNAME
//To start server do: npx expo start
//To stop server do: CTRL+C
//To close an existing server do: "netstat -ano | findstr :<PORT NUMBER BEING TAKEN>" and then do: "taskkill /PID <GIVEN LISTENING PID> /F"

import React, {useState} from 'react';

// import {StatusBar} from 'expo-status-bar'
import {KeyboardAvoidingView, Modal, Dimensions, TouchableWithoutFeedback, Keyboard, FlatList, View, Text, Image, ScrollView, TextInput, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Ionicons, MaterialIcons, AntDesign, Feather} from '@expo/vector-icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
      <Text style = {{fontWeight: 'bold'}}>Todo List: </Text>
      <Text style = {{fontWeight: 'bold'}}>- Add delete function for the cards in the sections</Text>
      <Text style = {{fontWeight: 'bold'}}>- Implement add sections and make sections hide unless selected by the user to include in the portfolio</Text>
      <Text style = {{fontWeight: 'bold'}}>- Make app look good</Text>
      </ScrollView>
    </View>
  );
}

function PortfolioList({navigation}) //Portfolio List Screen
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
            <AntDesign name = 'right' size={30} />
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

function Portfolio1Builder({navigation}) //Portfolio Builder Screen with all the sections (need to implement adding sections)
{

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
    {name: 'Additional Information', key: '10'}

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

function PersonalInfo({navigation}) //Personal Info Screen
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

function AthleticAchievements({navigation}) //Athletic Achievement Screen
{

  const [sports, setSports] = useState([
    {sportName: 'Soccer', startDate: '2021/3/12', endDate: '2022/5/12', avgHrsPerWeek: '3', totalHrs: '123', gradesParticipated: '6, 7, 8', comments: "i'm himothy", key: '1'},

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
        <View style = {styles.rightIcon}>
        <AntDesign name = 'right' size={30} />
          <Text style={styles.sectionInfoCard}>
            {item.sportName}
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
    avgHrsPerWeek: yup.number().required('This field is required.').positive().max(168, 'Must be less than 168'),
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
          <KeyboardAwareScrollView>
            <Text style = {{marginTop: 5}}>Sport Name: </Text>
            <TextInput 
              style={styles.formikInput}
              placeholder='Sport Name '
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
            <TouchableOpacity>
          <MaterialIcons name = 'delete' size={30} color = "red" />
          </TouchableOpacity>
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
  const [educations, setEducations] = useState([
    {schoolName: 'ETES', Location: '900 Stribling Way', beginningGrade: '9', startDate: '2021/3/12', endDate: '2022/5/12', comments: 'idk', key: '1'},

  ])
  const addEducation = (education) => {
    education.key = Math.random().toString();
    setEducations((currentEducations) => {
      return [education, ...currentEducations]
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
      data={educations}
      renderItem={({item}) =>(
        <Card>
        <TouchableOpacity onPress={() => navigation.navigate('Education Info', {item})}>
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
            <TouchableOpacity>
          <MaterialIcons name = 'delete' size={30} color = "red" />
          </TouchableOpacity>
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
  const [volunteerServices, setVolunteerServices] = useState([
    {positionTitle: 'Helper', organization: 'Target', location: '', startDate: '', endDate: '', totalHrs: '', gradesParticipated: '', comments: '', key: '1'},

  ])
  const addVolunteerServices = (volunteerService) => {
    volunteerService.key = Math.random().toString();
    setVolunteerServices((currentVolunteerServices) => {
      return [volunteerService, ...currentVolunteerServices]
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
      data={volunteerServices}
      renderItem={({item}) =>(
        <Card>
        <TouchableOpacity onPress={() => navigation.navigate('Volunteer Services Info', {item})}>
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
            <TouchableOpacity>
          <MaterialIcons name = 'delete' size={30} color = "red" />
          </TouchableOpacity>
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

function EC({navigation})
{
  const [ecs, setECS] = useState([
    {activity: 'Taekwondo', startDate: '2021/3/12', endDate: '2022/5/12', avgHrsPerWeek: '4', totalHrs: '234', gradesParticipated: '9, 10, 11', comments: "i'm bruce lee", key: '1'},

  ])
  const addEC = (ec) => {
    ec.key = Math.random().toString();
    setECS((currentEC) => {
      return [ec, ...currentEC]
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
      data={ecs}
      renderItem={({item}) =>(
        <Card>
        <TouchableOpacity onPress={() => navigation.navigate('Extracurricular Activities Info', {item})}>
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
        validationSchema={sportsSchema}
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
      <View style = {styles.rightIcon}>
            <TouchableOpacity>
          <MaterialIcons name = 'delete' size={30} color = "red" />
          </TouchableOpacity>
        </View>
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
        <Stack.Screen name = "Education" component={Education}/>
        <Stack.Screen name = "Education Info" component={EducationInfo}/>
        <Stack.Screen name = "Volunteer Services" component={VolunteerServices}/>
        <Stack.Screen name = "Volunteer Services Info" component={VolunteerServicesInfo}/>
        <Stack.Screen name = "Extracurricular Activities" component={EC}/>
        <Stack.Screen name = "Extracurricular Activities Info" component={ECInfo}/>
        
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
},

sectionInfoCard: {
  flex: 1,
  textAlign: 'left',
  //flexDirection: 'row',
  fontSize: 30,
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