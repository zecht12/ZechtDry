import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useLayoutEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";

const OrderScreen = () => {
    const navigation = useNavigation();
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const uid = auth.currentUser.uid;
        const unsubscribe = db.collection('users').doc(userId).collection('orders')
            .onSnapshot((snapshot) => {
            const orders = snapshot.docs.map((doc) => {
                const data = doc.data();
                const orderItems = data.orders.filter((item) => item.quantity > 1).map((item) => ({
                id: item.id,
                image: item.image,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                }));
                return {
                id: doc.id,
                items: orderItems,
                };
            });
            setOrderData(orders);
            });
        return unsubscribe;
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
            <LottieView source={require("../assets/thumbs.json")}style={{height: 300,width:300,alignSelf: "center",justifyContent: "center",}} autoPlayloop={false} speed={0.7}/>
            <Text style={{ fontSize: 19, fontWeight: "600", textAlign: "center",}}>
                Your order has been placed
            </Text>
            <LottieView source={require("../assets/sparkle.json")}
                style={{
                position: "absolute",
                alignSelf: "center",
                }} 
                autoPlay loop={false} speed={0.7}/>
        </SafeAreaView>
    );
};

export default OrderScreen;

const styles = StyleSheet.create({});