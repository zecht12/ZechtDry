import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const [userList, setUserList] = useState([]);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "ZechtDry",
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
            headerRight:()=>(
                <View style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Image source={{ uri: item.photoURL }} style={{ width: 200, height: 200, borderColor:'black', borderWidth:2, borderRadius:100, padding:4,}} />
                </View>
            )
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