import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CartScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    const route = useRoute();
    const total = cart
      .map((item) => item.quantity * item.price)
      .reduce((curr, prev) => curr + prev, 0);
    const navigation = useNavigation();
    const userUid = auth.currentUser.uid;
    const dispatch = useDispatch();
    const placeOrder = async () => {
      navigation.navigate("Order");
      dispatch(cleanCart());
      await setDoc(
        doc(db, "users", `${userUid}`),
        {
          orders: { ...cart },
          pickUpDetails: route.params,
        },
        {
          merge: true,
        }
      );
    };

    return (
        <View>
            <Text>CartScreen</Text>
        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({})