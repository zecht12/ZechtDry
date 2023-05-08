import React, { useState, createContext, useContext, useEffect } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { auth } from './firebase';
import store from "./store";
import { onAuthStateChanged } from 'firebase/auth';
import { Provider } from 'react-redux';
import { ModalPortal } from 'react-native-modals';
import HomeScreen from './screens/HomeScreen';
import UpdateProfile from './screens/UpdateProfile';
import ProfileScreen from './screens/ProfileScreen';



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
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator defaultScreenOption={HomeScreen}>
        <Stack.Screen name="Main" component={HomeScreen} options={{headerShown:false}} />
        \<Stack.Screen name="Info" component={ProfileScreen} options={{headerShown:false}} />
        <Stack.Screen name="Update" component={UpdateProfile} />
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
