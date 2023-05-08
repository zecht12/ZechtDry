import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { db, storage, auth } from '../firebase';
import { normalize } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
    const [userList, setUserList] = useState([]);
    const navigation = useNavigation();

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

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        }
    );

    }, [navigation]);

    const renderItem = ({ item }) => {
        return (
            <SafeAreaView style={{ margin: 10 }}>
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
            </SafeAreaView>
        );
    };

    return (
        <View style={{ backgroundColor:'#fff', flex:1 }}>
            <View style={{backgroundColor:"#2089dc", flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text></Text>
                <Text>ZechtDry</Text>
                <View style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Image source={{ uri: item.photoURL }} style={{ width:70, height: 70, borderColor:'black', borderWidth:2, borderRadius:100, padding:4,}} />
                </View>
            </View>
            <Text>Welcome</Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})