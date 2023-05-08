import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";

const Carousel = ({items}) => {
    const items = undefined;

    const images = [
        "https://media.istockphoto.com/id/1247884083/vector/laundry-service-room-vector-illustration-washing-and-drying-machines-with-cleansers-on-shelf.jpg?s=612x612&w=0&k=20&c=myaNEKlqX7R--bzWGDoMI7PhdxG_zdQTKYEBlymJQGk=",
        "https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=800",
    ];

    return (
        <Swiper showsButtons={true}>
            {items.map((item, index) => (
                <View key={index} style={{ flex: 1 }}>
                    <Image style={{ flex: 1 }} source={{ uri: item }} />
                </View>
            ))}
        </Swiper>
    );
};

export default Carousel;

const styles = StyleSheet.create({});