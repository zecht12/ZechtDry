import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeScreen = () => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Login",
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
            },
            headerStyle: {
                backgroundColor: "#2089dc",
                height: 110,
                borderBottomColor: "transparent",
                shadowColor: "transparent",
            },
        });
    }, [navigation]);
    return (
        <View>
        <Text>HomeScreen</Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})