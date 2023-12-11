# Edufolio Builder  
## Overview
A React Native mobile application built for iOS for the 2023-24 FBLA Mobile Application Development Competition. This app allows highschool students to create a portfolio of their highschool experiences. We used React Native primarily because it could support both iOS and Android and is also very versatile. We also used Expo Go to deploy our application during testing and is also how the app runs. The app is not planned for release to the App Store yet. Some of the main challenges we faced were figuring out how to save and load data while also being able to add and delete data. Furthermore, we also had difficulty getting all this data from different screens to collect into an individual screen to display as a portfolio.

## How to Install and Run the Project

### Prerequisites

To start, you will need to install the Expo Go Application on your iPhone of iOS 13 or later. You will also need the latest recommended release of [Node.js LTS](https://nodejs.org/en/) as well as [Git](https://git-scm.com/) for source control to clone our Github repository into a code editor of your choice (We recommend Visual Studio Code). You will also need to create an Expo account to use the Expo Go Application.

Follow the [Expo Go](https://docs.expo.dev/get-started/expo-go/) documentation guide to get started and receive additional help. 

#### Documentation and External Dependencies Required
A list of all dependencies we installed. If needed, run these commands in your terminal:
- [Asynchronous Storage](https://react-native-async-storage.github.io/async-storage/docs/install/) `npx expo install @react-native-async-storage/async-storage`
- [React Native Context & Reducer](https://react.dev/learn/managing-state) No installation required.
- [React Native Navigation](https://reactnavigation.org/docs/getting-started/) `npx expo install react-native-screens react-native-safe-area-context`
- [React Native Stack Navigation](https://reactnavigation.org/docs/native-stack-navigator/) `npm install @react-navigation/native-stack`
- [Expo Splash Screen](https://docs.expo.dev/versions/latest/sdk/splash-screen/#usage) `npx expo install expo-splash-screen`
- [Expo Print](https://docs.expo.dev/versions/latest/sdk/print/) `npx expo install expo-print`
- [Expo Sharing](https://docs.expo.dev/versions/latest/sdk/sharing/) `npx expo install expo-sharing`
- [Expo Vector Icons](https://www.npmjs.com/package/@expo/vector-icons/v/6.3.1) `npm i @expo/vector-icons@6.3.1`
- [Formik](https://formik.org/docs/overview) `npm install formik --save`
- [React Native Elements](https://reactnativeelements.com/docs) `npm install react-native-elements`
- [React Native Keyboard Aware ScrollView](https://www.npmjs.com/package/react-native-keyboard-aware-scroll-view) `npm i react-native-keyboard-aware-scroll-view --save`
- [React Native Safe Area Context](https://docs.expo.dev/versions/latest/sdk/safe-area-context/) `npx expo install react-native-safe-area-context`
- [React Native Screens](https://github.com/software-mansion/react-native-screens) `npx expo install react-native-screens`
- [React Native Share](https://github.com/react-native-share/react-native-share) `npm i react-native-share --save`
- [Yup Validation](https://www.npmjs.com/package/yup) `npm i yup`

### Running the Project
Once you have cloned our repository, you can open up the files with a code editor of your choice. To start a development server, you will need to first run the command in the terminal: `cd PROJECTNAME`. Replace PROJECTNAME with the name of the folder that contains all of our project files. This ensures you are in the directory of our project if not already. Ensure that your phone and the computer/laptop are connected to the same WiFi network. Next, run the command: `npx expo start` to run the development server. This will print out a QR code in the terminal which you will need to scan using the camera. This will open up the Expo Go app and run the application directly on your phone! It also prints out a list of other commands you can type into the terminal in case you need more help or information. To stop running the server, press `CTRL+C` in the terminal to quit the process and end the server.

Follow the [Expo Go](https://docs.expo.dev/get-started/create-a-project/) documentation guide to run the project. **(You are not creating a new project)**. You pretty much only need to follow steps 2-3.

## Credits
- Team Members: Hemant C, Prabhath K, Aryan P
- Big thank you to [Net Ninja](https://www.youtube.com/@NetNinja) for helping us learn React Native!
		- [React Native Beginner Playlist](https://www.youtube.com/watch?v=ur6I5m2nTvk&list=PL4cUxeGkcC9ixPU-QkScoRBVxtPPzVjrQ)
- [Expo Vector Icons](https://icons.expo.fyi/Index)

