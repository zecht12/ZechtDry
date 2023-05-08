import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { db, storage, auth } from '../firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import {MaterialCommunityIcons} from 'react-native-vector-icons'
import { normalize } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';

const ProfileScreen = () => {
    const [userList, setUserList] = useState([]);
    const navigation = useNavigation();

    useLayoutEffect (() => {
        navigation.setOptions({
            headerTintColor: 'white',
            headerShown: true,
            headerTitle: 'Back To Home',
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
            },
            headerStyle:  {
                backgroundColor: "#2089dc",
                height: 110,
                borderBottomColor: "transparent",
                shadowColor: "transparent",
            },
        })
    },[])

    useEffect(() => {
        const fetchUserList = async () => {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const users = [];
            querySnapshot.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id });
            });
            setUserList(users);
        };
        fetchUserList();
    }, []);

    const onSignOut = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
    };


    const renderItem = ({ item }) => {
        return (
            <View style={{marginTop:10}}>
                <View style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Image source={{ uri: item.photoURL }} style={{ width: 200, height: 200, borderColor:'black', borderWidth:2, borderRadius:100, padding:4,}} />
                </View>
                <View style={{paddingHorizontal:20, paddingVertical:32, flex:1, justifyContent:'center', alignItems:'center'}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center',gap:4, width:"80%" }}>
                        <View>
                            <Image source={require('../assets/user.png')} style={{ width: 20, height: 20}}/>
                        </View>
                        <View>
                            <Text style={{color:"gray"}}>Name :</Text>
                            <Text style={{fontSize: normalize(16)}}>{item.name}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center',gap:4, width:"80%", paddingVertical:32,}}>
                        <View>
                            <MaterialCommunityIcons name="email" size={22} color="black" />
                        </View>
                        <View>
                            <Text style={{color:"gray"}}>Email:</Text>
                            <Text style={{fontSize: normalize(16)}}>{item.email}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center',gap:4, width:"80%"}}>
                        <View>
                            <MaterialCommunityIcons name="phone" size={22} color="black" />
                        </View>
                        <View>
                            <Text style={{color:"gray"}}>Phone:</Text>
                            <Text style={{fontSize: normalize(16)}}>{item.phone}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Pressable onPress={() => navigation.navigate("Update")} style={{padding:20,}}>
                        <Text style={{ textAlign: "center", color: "white",fontWeight:"bold",fontSize:17, backgroundColor:"green", paddingVertical:4, paddingHorizontal:8, borderRadius:10, }}>
                            Update Profile
                        </Text>
                    </Pressable>
                    <Pressable onPress={onSignOut} style={{ paddingHorizontal:20}}>
                        <Text style={{ textAlign: "center", color: "white",fontWeight:"bold",fontSize:17, backgroundColor:"red", paddingVertical:4, paddingHorizontal:8, borderRadius:10, }}>
                            Sign Out
                        </Text>
                    </Pressable>
                </View>
            </View>
        );
    };
    return (
        <View>
            <FlatList
            data={userList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})