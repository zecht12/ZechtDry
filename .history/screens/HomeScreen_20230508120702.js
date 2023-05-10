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

    const cart = useSelector((state) => state.cart.cart);
    const [items,setItems] = useState([]);
    const total = cart.map((item) => item.quantity * item.price).reduce((curr,prev) => curr + prev,0);
    const navigation = useNavigation();
    console.log(cart);
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
      // console.log(coords)
      if (coords) {
        const { latitude, longitude } = coords;
  
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
  
        // console.log(response)
  
        for (let item of response) {
          let address = `${item.name} ${item.city} ${item.postalCode}`;
          setdisplayCurrentAddress(address);
        }
      }
    };
    const product = useSelector((state) => state.product.product);
    const dispatch = useDispatch();
    useEffect(() => {
      if (product.length > 0) return;
  
      const fetchProducts = async () => {
        const colRef = collection(db,"types");
        const docsSnap = await getDocs(colRef);
        docsSnap.forEach((doc) => {
          items.push(doc.data());
        });
        items?.map((service) => dispatch(getProducts(service)));
      };
      fetchProducts();
    }, []);
    console.log(product);
    const services = [
      {
        id: "0",
        image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
        name: "shirt",
        quantity: 0,
        price: 10,
      },
      {
        id: "11",
        image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
        name: "T-shirt",
        quantity: 0,
        price: 10,
      },
      {
        id: "12",
        image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
        name: "dresses",
        quantity: 0,
        price: 10,
      },
      {
        id: "13",
        image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
        name: "jeans",
        quantity: 0,
        price: 10,
      },
      {
        id: "14",
        image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
        name: "Sweater",
        quantity: 0,
        price: 10,
      },
      {
        id: "15",
        image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
        name: "shorts",
        quantity: 0,
        price: 10,
      },
      {
        id: "16",
        image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
        name: "Sleeveless",
        quantity: 0,
        price: 10,
      },
    ];

    const renderItem = ({ item }) => {
        return (
            <ScrollView>
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
                    <Services/>
                    {product.map((item, index)=>(
                        <DressItem item={item} key={index} />
                    ))}
                </View>
            </ScrollView>
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