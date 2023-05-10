import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useLayoutEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
    const navigation = useNavigation();
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
      const unsubscribe = db.collection('users').doc(userId).collection('orders')
        .onSnapshot((snapshot) => {
          const orders = snapshot.docs.map((doc) => {
            const data = doc.data();
            const orderItems = data.orders.filter((item) => item.quantity > 1).map((item) => ({
              id: item.id,
              image: item.image,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            }));
            return {
              id: doc.id,
              items: orderItems,
            };
          });
          setOrderData(orders);
        });
  
      return unsubscribe;
    }, []);
  
    return (
      // render the orderData as needed
    );
  };
  In this code snippet, userId is the unique user ID obtained from Firebase Authentication. The onSnapshot() method listens for real-time updates to the orders collection for that user. Each order document contains an orders field that is an array of order items. The filter() method is used to select only the order items that have a quantity greater than 1, and the map() method is used to extract the relevant data fields (id, image, name, price, and quantity) for each selected order item. The resulting array of order items is stored in the orderItems variable, which is then used to create a new object with the order ID and the selected order items. Finally, the resulting array of order objects is stored in the orderData state variable and rendered in the component.
  
  Note that this code assumes that the user is authenticated and that you have obtained their unique user ID from Firebase Authentication. If you have not implemented Firebase Authentication in your app, you will need to do so before you can retrieve user-specific data from Firestore.
  
  
  
  
  
  
  

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Back",
            headerTintColor: 'white',
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
        <SafeAreaView>
            <LottieView source={require("../assets/thumbs.json")}style={{height: 300,width:300,alignSelf: "center",justifyContent: "center",}} autoPlayloop={false} speed={0.7}/>
            <Text style={{ fontSize: 19, fontWeight: "600", textAlign: "center",}}>
                Your order has been placed
            </Text>
            <LottieView source={require("../assets/sparkle.json")}
                style={{
                position: "absolute",
                alignSelf: "center",
                }} 
                autoPlay loop={false} speed={0.7}/>
        </SafeAreaView>
    );
};

export default OrderScreen;

const styles = StyleSheet.create({});