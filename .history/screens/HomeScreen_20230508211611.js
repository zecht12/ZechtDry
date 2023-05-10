import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { db, storage, auth } from '../firebase';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import Carousel from '../components/Caraousel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';

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

    const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
        "we are loading your location"
    );
    const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
        useEffect(() => {
            checkIfLocationEnabled();
            getCurrentLocation();
    }, []);
    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
            Alert.alert(
                "Location services not enabled",
                "Please enable the location services",
                [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                { text: "OK", onPress: () => console.log("OK Pressed") },
                ],
                { cancelable: false }
            );
        } else {
            setlocationServicesEnabled(enabled);
        }
    };

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission denied",
                "allow the app to use the location services",
                [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                { text: "OK", onPress: () => console.log("OK Pressed") },
                ],
            { cancelable: false }
        );
    }

    const { coords } = await Location.getCurrentPositionAsync();
        if (coords) {
            const { latitude, longitude } = coords;
            let response = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });
            for (let item of response) {
                let address = `${item.name} ${item.city} ${item.postalCode}`;
                setdisplayCurrentAddress(address);
            }
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View>
                <View style={{ paddingTop:30, backgroundColor:"#0c8708", flexDirection:'row', justifyContent:'space-between', alignItems:'center', height:110, paddingHorizontal:20}}>
                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', gap:4,}}>
                        <MaterialIcons name="location-on" size={30} color="red" />
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: "600", color:"#fff" }}>ZechtDry</Text>
                            <Text style={{color:"#fff"}}>{displayCurrentAddress}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                            <Image source={{ uri: item.photoURL }} style={{ width:40, height: 40, borderColor:'white', borderWidth:2, borderRadius:100, padding:4,}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <View style={{flexDirection:'row',alignItems:'center',gap:10, paddingHorizontal:8,borderColor:"#0c8708",borderWidth:2,paddingVertical:10,borderRadius:10, marginVertical:15, marginHorizontal:6}}>
                        <Ionicons name="search" size={24} color="black" />
                        <TextInput placeholderTextColor="black" placeholder={"Enter Your Destination"}/>
                    </View>
                    <Carousel />
                </View>
            </View>
        );
    };

    return (
        <ScrollView style={{ backgroundColor:'#fff', flex:1 }}>
            <FlatList
            data={userList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            />
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})