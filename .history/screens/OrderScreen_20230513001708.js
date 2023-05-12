import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const OrderScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { pickUpDetails, orders } = route.params || {};

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Back",
            headerTintColor: "white",
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
        <View style={styles.container}>
            <View style={styles.detailsContainer}>
                <Text style={styles.detailsText}>Pickup Details:</Text>
                {pickUpDetails ? (
                    <>
                        <Text style={styles.detailsText}>
                            {pickUpDetails.name}, {pickUpDetails.phone}
                        </Text>
                        <Text style={styles.detailsText}>
                            {pickUpDetails.address}, {pickUpDetails.city}{" "}
                            {pickUpDetails.postalCode}
                        </Text>
                    </>
                ) : (
                    <Text style={styles.detailsText}>No pickup details found.</Text>
                )}
            </View>
            <View style={styles.orderContainer}>
                <Text style={styles.orderTitle}>Order Summary:</Text>
                {Array.isArray(orders) && orders.map((order) => (
    <View key={order.id} style={styles.orderItem}>
        <Text style={styles.orderItemName}>{order.name}</Text>
        <Text style={styles.orderItemQty}>Qty: {order.quantity}</Text>
        <Text style={styles.orderItemPrice}>Price: ${order.price}</Text>
    </View>
))}

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    detailsContainer: {
        marginBottom: 20,
    },
    detailsText: {
        fontSize: 18,
        marginBottom: 5,
    },
    orderContainer: {
        flex: 1,
    },
    orderTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    orderItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        backgroundColor: "#eee",
        padding: 10,
        borderRadius: 5,
    },
    orderItemName: {
        fontSize: 18,
    },
    orderItemQty: {
        fontSize: 18,
    },
    orderItemPrice: {
        fontSize: 18,
    },
});

export default OrderScreen;
