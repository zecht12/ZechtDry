import React, { useState, createContext, useContext, useEffect } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import SavedScreen from './screens/SavedScreen';
import BookingScreen from './screens/BookingScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import PlacesScreen from './screens/PlacesScreen';
import MapScreen from './screens/MapScreen';
import PropertyInfoscreen from './screens/PropertyInfoscreen';
import RoomsScreen from './screens/RoomsScreen';
import UserScreen from './screens/UserScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { auth } from './firebase';
import store from "./store";
import { onAuthStateChanged } from 'firebase/auth';
import { Provider } from 'react-redux';
import { ModalPortal } from 'react-native-modals';
import UpdateProfile from './screens/UpdateProfile';



const Tab = createBottomTabNavigator();
const AuthenticatedUserContext = createContext({});
const Stack = createStackNavigator();


const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function BooksStack() {
  function BottomTabs(){
    return(
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabel:"Home",headerShown:false, tabBarIcon:({focused})=> focused ?(
        <Ionicons name="home" size={24} color="black" />
      ):(
        <Ionicons name="home-outline" size={24} color="black" />
      )}} />
      <Tab.Screen name="Saved" component={SavedScreen} options={{tabBarLabel:"Saved",headerShown:false, tabBarIcon:({focused})=> focused ?(
        <AntDesign name="heart" size={24} color="black" />
      ):(
        <AntDesign name="hearto" size={24} color="black" />
      )}} />
      <Tab.Screen name="Bookings" component={BookingScreen} options={{tabBarLabel:"Bookings",headerShown:false, tabBarIcon:({focused})=> focused ?(
        <Ionicons name="ios-notifications" size={24} color="black" />
      ):(
        <Ionicons name="notifications-outline" size={24} color="black" />
      )}} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarLabel:"Profile",headerShown:false, tabBarIcon:({focused})=> focused ?(
        <Ionicons name="person" size={24} color="black" />
      ):(
        <Ionicons name="person-outline" size={24} color="black" />
      )}} />
    </Tab.Navigator>
  )
}
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator defaultScreenOption={BottomTabs}>
        <Stack.Screen name="Main" component={BottomTabs} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    return () => unsubscribeAuth();
  }, [auth]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <BooksStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <Provider store={store}>
        <RootNavigator/>
        <ModalPortal />
      </Provider>
    </AuthenticatedUserProvider>
  );
}
