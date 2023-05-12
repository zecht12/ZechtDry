import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
const OrderScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const pickUpDetails = route.params?.pickUpDetails;

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
        <Text style={styles.detailsText}>
          {pickUpDetails.name}, {pickUpDetails.phone}
        </Text>
        <Text style={styles.detailsText}>
          {pickUpDetails.address}, {pickUpDetails.city}{" "}
          {pickUpDetails.postalCode}
        </Text>
      </View>
      <View style={styles.orderContainer}>
        <Text style={styles.orderTitle}>Order Summary:</Text>
        {orders.map((order) => (
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
  container: 
    flex: 1;
    background-color: #fff;
    padding: 20px;
  `,
  detailsContainer: css`
    margin-bottom: 20px;
  `,
  detailsText: css`
    font-size: 18px;
    margin-bottom: 5px;
  `,
  orderContainer: css`
    flex: 1;
  `,
  orderTitle: css`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  `,
  orderItem: css`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    background-color: #eee;
    padding: 10px;
    border-radius: 5px;
  `,
  orderItemName: css`
    font-size: 18px;
  `,
  orderItemQty: css`
    font-size: 18px;
  `,
  orderItemPrice: css`
    font-size: 18px;
  `,
});

export default OrderScreen;