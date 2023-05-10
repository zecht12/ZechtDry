import {StyleSheet,Text,View,SafeAreaView,ScrollView,Pressable,} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {cleanCart,decrementQuantity,incrementQuantity,} from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const CartScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    const route = useRoute();
    const total = cart
        .map((item) => item.quantity * item.price)
        .reduce((curr, prev) => curr + prev, 0);
        const navigation = useNavigation();
        const userUid = auth.currentUser.uid;
        const dispatch = useDispatch();
        const placeOrder = async () => {
        navigation.navigate("Order");
        dispatch(cleanCart());
        await setDoc(
            doc(db, "users", `${userUid}`),
            {
            orders: { ...cart },
            pickUpDetails: route.params,
            },
            {
            merge: true,
            }
        );
    };

    return (
        <>
            <ScrollView style={{ marginTop: 50 }}>
                        {total === 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ marginTop: 40 }}>Your cart is empty</Text>
          </View>
        ) : (
          <>
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                onPress={() => navigation.goBack()}
                name="arrow-back"
                size={24}
                color="black"
              />
              <Text>Your Bucket</Text>
            </View>

            <Pressable
              style={{
                backgroundColor: "white",
                borderRadius: 12,
                marginLeft: 10,
                marginRight: 10,
                padding: 14,
              }}
            >
            </ScrollView>
        </>
    )
}

export default CartScreen

const styles = StyleSheet.create({})