import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

export default function OrderScreen({ route }) {
    const { pickUpDetails } = route.params;

    return (
        <View style={styles.container}>
        <Text style={styles.text}>
            Your order has been placed. Thank you for shopping with us!
        </Text>
        <Text style={styles.text}>
            Pick up details: {pickUpDetails.name}, {pickUpDetails.address}, {pickUpDetails.phone}
        </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
});