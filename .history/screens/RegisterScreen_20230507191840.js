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
        <SafeAreaView style={{ flex: 1, position: 'relative', backgroundColor: '#F0F4F7' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ marginTop: 56, paddingHorizontal: 3, width: '100%', height: '100%', alignItems: 'center' }}>
                    <View style={{ paddingVertical: 2 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000' }}>Create Your Account</Text>
                    </View>
                    <View style={{ width: '100%', height: '100%', paddingHorizontal: 12, marginTop: 4 }}>
                        <Input placeholder="Full Name" leftIcon={<MaterialCommunityIcons name="account" size={20} />} autoFocus={true} type="text" value={name} onChangeText={(text) => setName(text)} />
                        <Input placeholder='Email' leftIcon={<MaterialCommunityIcons name="email" size={20} />} autoFocus={true} type="email" value={email} onChangeText={(text) => setEmail(text)} />
                        <Input placeholder="Phone Number" leftIcon={<MaterialCommunityIcons name="phone" size={20} />} autoFocus={true} type="number" value={phone} onChangeText={(text) => setPhone(text)} errorStyle={{ color: 'red' }} />
                        <Input placeholder='Password' leftIcon={<MaterialCommunityIcons name="onepassword" size={20} />} secureTextEntry={true} type="password" value={password} onChangeText={(text) => setPassword(text)} />
                        <View style={{ marginBottom: 20, marginTop:30, }}>
                            <Button loadingProps={{ animating: true }} raised title="Register" onPress={register} />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default RegisterScreen
