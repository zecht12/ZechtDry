import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { db, storage, auth } from '../firebase';
import {MaterialIcons} from 'react-native-vector-icons'
import { useDispatch, useSelector } from 'react-redux';

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
        const product = useSelector((state) => state.product.product);
        const dispatch = useDispatch();

    const renderItem = ({ item }) => {
        return (
            <View>
                <View style={{ paddingTop:30, backgroundColor:"#2089dc", flexDirection:'row', justifyContent:'space-between', alignItems:'center', height:110, paddingHorizontal:20}}>
                    <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
                            <MaterialIcons name="notifications" size={27} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color:"white", fontWeight:'bold', fontSize: 20}}>ZechtDry</Text>
                    </View>
                    <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                            <Image source={{ uri: item.photoURL }} style={{ width:40, height: 40, borderColor:'white', borderWidth:2, borderRadius:100, padding:4,}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text>Welcome</Text>
                </View>
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