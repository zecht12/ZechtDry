import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

const NotificationScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect (() => {
        navigation.setOptions({
            headerTintColor: 'white',
            headerShown: true,
            headerTitle: 'Back To Home',
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
            },
            headerStyle:  {
                backgroundColor: "#0c8708",
                height: 110,
                borderBottomColor: "transparent",
                shadowColor: "transparent",
            },
        })
    },[])

    return (
        <View>
        <Text>NotificationScreen</Text>
        </View>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({})