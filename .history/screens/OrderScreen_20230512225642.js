import { StyleSheet, Text, View, SafeAreaView, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { auth, db } from "../firebase";

const OrderScreen = () => {
    const navigation = useNavigation();
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
            const userId = auth.currentUser.uid;
            const ordersRef = collection(db, 'users', userId, 'orders');
            const querySnapshot = await getDocs(ordersRef);
            const orders = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                const items = data.orders.map((item) => ({
                    id: item.id,
                    image: item.image,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                }));
                return {
                    id: doc.id,
                    items: items,
                };
            });
            setOrderData(orders);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Back",
            headerTintColor: 'white',
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
            },
            headerStyle: {
                backgroundColor: "#0c8708",
                height: 110,
                borderBottomColor: "transparent",
                shadowColor: "transparent",
            },
        });
    }, []);
    return (
        <SafeAreaView>
            {loading ? ( // show ActivityIndicator while loading
                
            ) : (orderData.map((order) => (
                <View key={order.id}>
                <Text>Order ID: {order.id}</Text>
                {order.items.map((item) => (
                    <View key={item.id}>
                    <Text>Name: {item.name}</Text>
                    <Text>Price: {item.price}</Text>
                    <Text>Quantity: {item.quantity}</Text>
                    </View>
                ))}
                </View>
            ))
            )}
        </SafeAreaView>
    );
};

export default OrderScreen;

const styles = StyleSheet.create({});