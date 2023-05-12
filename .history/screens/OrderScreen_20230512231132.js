import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

export default function OrderScreen({ params }) {
    const route = useRoute();
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
