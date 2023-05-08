import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import {MaterialCommunityIcons} from 'react-native-vector-icons'

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const route = useRoute();
    const navigation = useNavigation();
    console.log(route.params);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if (authUser) {
                navigation.navigate("Main");
            }
        })
        return unsubscribe;
    }, [navigation]);

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("user credential", userCredential);
                const user = userCredential.user;
                console.log("user details", user);
            })
            .catch((error) => {
                console.log("authentication failed", error);
            });
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Login",
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
            },
            headerStyle: {
                backgroundColor: "#039008",
                height: 110,
                borderBottomColor: "transparent",
                shadowColor: "transparent",
            },
        });
    }, [navigation]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F4F7' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ marginTop: 80, paddingHorizontal: 3, width: '100%', height: '100%', alignItems: 'center', justifyContent:'center' }}>
                    <View style={{paddingTop: 90}}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000000' }}>Login To Your Account</Text>
                    </View>
                    <View style={{ width: '100%', height: '100%', paddingHorizontal: 12, marginTop: 16, }}>
                        <View>
                            <Input placeholder='Email' leftIcon={<MaterialCommunityIcons name="email" size={20} />} autoFocus={true} keyboardType='email-address' value={email} onChangeText={(text) => setEmail(text)} errorStyle={{ color: 'red' }} errorMessage='Please enter the correct email/password' />
                            <Input placeholder='Password' leftIcon={<MaterialCommunityIcons name="onepassword" size={20} />} secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} errorStyle={{ color: 'red' }} errorMessage='Please enter the correct email/password' />
                            <View style={{ marginVertical: 20, }}>
                                <Button ViewComponent={LinearGradient} linearGradientProps={{
    colors: ['#FF9800', '#F44336'],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  }} loading title="LOGIN" onPress={signIn} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}>
                            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                                <Text style={{ color: 'black', fontSize: 16, paddingTop: 4 }}> Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;


const styles = StyleSheet.create({
})