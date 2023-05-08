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

    return (
        <View style={{ backgroundColor:'#fff', flex:1 }}>
            <View style={{backgroundColor:"#"}}>

            </View>
            <Text>Welcome</Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})