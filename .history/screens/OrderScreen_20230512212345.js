import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from "../firebase";

const OrderScreen = () => {
    const navigation = useNavigation();
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const user = auth.currentUser;
            if (user) {
                const favoritesRef = collection(db, 'users');
                const q = query(favoritesRef, where('userId', '==', user.uid));
                const snapshot = await getDocs(q);
                const lists = [];
                if (!snapshot.empty) {
                    snapshot.forEach((doc) => {
                        const item = {
                            id: item.id,
                            image: item.image,
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                        };
                        const docFavorites = doc.data().users;
                        if (Array.isArray(docFavorites)) {
                        docFavorites.forEach((favorite) => {
                            item.favorites.push({ id: favorite.id, ...favorite });
                        });
                        }
                        lists.push(item);
                    });
                    }
            setOrderData(orders);
            }
        };
        console.log(fetchData);
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
            <View style={{ marginVertical: 20 }}>
                {orderData.map((order) => (
                    <View key={order.id}>
                        {order.items.map((item) => (
                            <View key={item.id} style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
                            <Image source={{ uri: item.image }} style={{ height: 50, width: 50, marginRight: 10 }} />
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.name}</Text>
                                <Text style={{ fontSize: 14, color: "gray" }}>Price: {item.price}</Text>
                                <Text style={{ fontSize: 14, color: "gray" }}>Quantity: {item.quantity}</Text>
                            </View>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </SafeAreaView>
    );
};

export default OrderScreen;

const styles = StyleSheet.create({});