import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useLayoutEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Back To order",
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
            <LottieView source={require("../assets/thumbs.json")}style={{height: 360,width:300,alignSelf: "center",marginTop: 40,justifyContent: "center",}} autoPlayloop={false} speed={0.7}/>
            <Text style={{ marginTop: 40, fontSize: 19, fontWeight: "600", textAlign: "center",}}>
                Your order has been placed
            </Text>
            <LottieView source={require("../assets/sparkle.json")}
                style={{
                height: 300,
                position: "absolute",
                top: 100,
                width: 300,
                alignSelf: "center",
                }} 
                autoPlay loop={false} speed={0.7}/>
        </SafeAreaView>
    );
};

export default OrderScreen;

const styles = StyleSheet.create({});