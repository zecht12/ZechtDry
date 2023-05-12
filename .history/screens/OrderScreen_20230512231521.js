import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OrderScreen = () => {
    const route = useRoute();
    const { pickUpDetails } = route.params;

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Order Details</Text>
        <View style={styles.detailsContainer}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{pickUpDetails.name}</Text>
        </View>
        <View style={styles.detailsContainer}>
            <Text style={styles.label}>Phone Number:</Text>
            <Text style={styles.value}>{pickUpDetails.phoneNumber}</Text>
        </View>
        <View style={styles.detailsContainer}>
            <Text style={styles.label}>Date and Time:</Text>
            <Text style={styles.value}>{pickUpDetails.dateAndTime}</Text>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    detailsContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    label: {
        fontWeight: "bold",
        marginRight: 10,
    },
    value: {
        flex: 1,
    },
});

export default OrderScreen;
