import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, SafeAreaView, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc,doc } from 'firebase/firestore';
import {MaterialCommunityIcons} from 'react-native-vector-icons'

const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [phone,setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const register = () => {
        if(name === "" || email === "" || password === ""|| phone === "" ){
            Alert.alert(
                "Invalid Detials",
                "Please enter all the credentials",
                [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        }
        createUserWithEmailAndPassword(auth,email,password).then((userCredentials) => {
            const user = userCredentials._tokenResponse.email;
            const uid = auth.currentUser.uid;
            setDoc(doc(db,"users",`${uid}`),{
                email:user,
                name:name,
                photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_MYjqcjhwBkZAfgfzxNcQD1xkSedxo6P_PA&usqp=CAU",
                phone:phone,
                password:password
            })
        })
    }

    useLayoutEffect (() => {
        navigation.setOptions({
            headerTintColor: 'white',
            headerShown: true,
            headerTitle: 'Back To Login',
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
            },
            headerStyle:  {
                backgroundColor: "#0c8708",
                height: 110,
                borderBottomColor: "transparent",
                shadowColor: "transparent",
            },
        })
    },[])

    return (
        import * as React from "react";
        import { Button } from "@rneui/base";
        import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
        import LinearGradient from "react-native-linear-gradient";
        
        export default () => {
          return (
            <Button
              buttonStyle={{ width: 150 }}
              containerStyle={{ margin: 5 }}
              disabledStyle={{
                borderWidth: 2,
                borderColor: "#00F"
              }}
              disabledTitleStyle={{ color: "#00F" }}
              linearGradientProps={null}
              icon={<Icon name="react" size={15} color="#0FF" />}
              iconContainerStyle={{ background: "#000" }}
              loadingProps={{ animating: true }}
              loadingStyle={{}}
              onPress={() => alert("click")}
              title="Hello"
              titleProps={{}}
              titleStyle={{ marginHorizontal: 5 }}
            />
          );
        }
    )
}

export default RegisterScreen
