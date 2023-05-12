import React from "react";
import { StyleSheet, Text, View } from "react-native";

const OrderScreen = ({ route }) => {
  const { pickUpDetails, orders } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>Pickup Details:</Text>
        <Text style={styles.detailsText}>
          {pickUpDetails.name}, {pickUpDetails.phone}
        </Text>
        <Text style={styles.detailsText}>
          {pickUpDetails.address}, {pickUpDetails.city} {pickUpDetails.postalCode}
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailsText: {
    fontSize: 18,
    marginBottom: 5,
  },
  orderContainer: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 5,
  },
  orderItemName: {
    fontSize: 18,
  },
  orderItemQty: {
    fontSize: 18,
  },
  orderItemPrice: {
    fontSize: 18,
  },
});

export default OrderScreen;
