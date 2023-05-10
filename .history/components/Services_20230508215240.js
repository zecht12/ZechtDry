import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper';

const services = [
    {
        id: "0",
        image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
        name: "shirt",
        quantity: 0,
        price: 10,
    },
    {
        id: "11",
        image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
        name: "T-shirt",
        quantity: 0,
        price: 10,
    },
    {
        id: "12",
        image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
        name: "dresses",
        quantity: 0,
        price: 10,
    },
    {
        id: "13",
        image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
        name: "jeans",
        quantity: 0,
        price: 10,
    },
    {
        id: "14",
        image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
        name: "Sweater",
        quantity: 0,
        price: 10,
    },
    {
        id: "15",
        image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
        name: "shorts",
        quantity: 0,
        price: 10,
    },
    {
        id: "16",
        image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
        name: "Sleeveless",
        quantity: 0,
        price: 10,
    },
];

const Services = () => {
    return (
        <View style={{padding:10}}>
            <Text style={{fontSize:16,fontWeight:"500",marginBottom:7}}>Services Available</Text>
            <Swiper showsButtons={false} style={{height:250}} loadMinimalSize={3} renderPagination={() => <View />} >
                {services.map((service,index) => (
                    <Pressable style={{margin:10,backgroundColor:"white",padding:20,borderRadius:7, justifyContent:'center', alignItems:'center'}} key={index}>
                        <Image source={{uri:service.image}} style={{width:70,height:70}}/>
                        <Text style={{textAlign:"center",marginTop:10}}>{service.name}</Text>
                    </Pressable>
                ))}
            </Swiper>
        </View>
    )
}

export default Services

const styles = StyleSheet.create({})