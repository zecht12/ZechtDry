import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { db, storage, auth } from '../firebase';

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
            <View>
                <View style={{ paddingTop:30, backgroundColor:"#2089dc", flexDirection:'row', justifyContent:'center', alignItems:'center', height:110, paddingHorizontal:20}}>
                    <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center', marginRight:}}>
                        <Text style={{color:"white", fontWeight:'bold', fontSize: 20}}>ZechtDry</Text>
                    </View>
                    <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <Image source={{ uri: item.photoURL }} style={{ width:30, height: 30, borderColor:'white', borderWidth:2, borderRadius:100, padding:4,}} />
                    </View>
                </View>
                <Text>Welcome</Text>
            </View>
        );
    };

    return (
        <View style={{ backgroundColor:'#fff', flex:1 }}>
            <FlatList
            data={userList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})