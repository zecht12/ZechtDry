import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";

const images = [
    "https://media.istockphoto.com/id/1247884083/vector/laundry-service-room-vector-illustration-washing-and-drying-machines-with-cleansers-on-shelf.jpg?s=612x612&w=0&k=20&c=myaNEKlqX7R--bzWGDoMI7PhdxG_zdQTKYEBlymJQGk=",
    "https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=800",
];

const Carousel = () => {
    return (
        <Swiper showsButtons={true}>
        {images.map((item, index) => (
            <View key={index} style={{ flex: 1 }}>
            <Image style={{ import React from 'react'
            import { connect } from 'react-redux'
            import PropTypes from 'prop-types'
            
            export const mapStateToProps = state => ({})
            
            export const mapDispatchToProps = {}
            
            export const first = (WrappedComponent) => {
              const hocComponent = ({ ...props }) => <WrappedComponent {...props} />
            
              hocComponent.propTypes = {}
            
              return hocComponent
            }
            
            export default WrapperComponent => connect(mapStateToProps, mapDispatchToProps)(first(WrapperComponent))
             }} source={{ uri: item }} />
            </View>
        ))}
        </Swiper>
    );
};

export default Carousel;

const styles = StyleSheet.create({});