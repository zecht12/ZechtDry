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
            </SafeAreaView>
        );
    };

    return (
    )
}

export default HomeScreen

const styles = StyleSheet.create({})