import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeScreen = () => {
    return (
import * as React from "react";
import { Button } from "@rneui/base";
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";

export default () => {
  return (
    <Button
      type="outline"
      buttonStyle={{ width: 150 }}
      containerStyle={{ margin: 5 }}
      disabledStyle={{
        borderWidth: 2,
        borderColor: "#00F"
      }}
      disabledTitleStyle={{ color: "#00F" }}
      linearGradientProps={null}
      icon={<Icon name="react" size={15} color="#0FF" />}
      iconContainerStyle={{ background: "#000" }}
      loadingProps={{ animating: true }}
      loadingStyle={{}}
      onPress={() => alert("click")}
      title="Hello"
      titleProps={{}}
      titleStyle={{ marginHorizontal: 5 }}
    />
  );
}
    )
}

export default HomeScreen

const styles = StyleSheet.create({})