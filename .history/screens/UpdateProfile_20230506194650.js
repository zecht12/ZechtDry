import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import * as FileSystem from 'expo-file-system';


const UpdateProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [photoURL, setPhotoURL] = useState(null);
    const user = auth.currentUser;

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Back To Profile",
            headerTintColor: 'white',
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
    }, []);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            base64: true,
        });
        if (!result.canceled) {
            setPhotoURL(result.assets[0].uri);
        }
    };

    const handleUpdateProfile = async () => {
        const userRef = doc(db, 'users', user.uid);
        try {
            await updateDoc(userRef, {
                name: name,
                phone: phone,
                email: email,
                photoURL: photoURL,
            });
            alert('Profile updated successfully!');
            navigation.goBack();
        } catch (error) {
            console.log(error);
            alert('Failed to update profile.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage}>
                {photoURL ? (
                <Image source={{ uri: photoURL }} style={styles.profileImage} />
                ) : (
                <View style={styles.profileImage}>
                    <Text style={styles.addPhotoText}>Add Photo</Text>
                </View>
                )}
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={(text) => setPhone(text)}
            />
            <Button title="Update Profile" onPress={handleUpdateProfile} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addPhotoText: {
        fontSize: 20,
        color: '#555',
    },
    input: {
        width: '80%',
        height: 50,
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        fontSize: 18,
    },
});

export default UpdateProfile;