import React from 'react'
import { StyleSheet, Text, Image, View, Button, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import Colors from '../constants/Colors'

const ImgPicker = (props) => {

    const verifyPermissions = async () =>{
        const result = await Permissions.askAsync(Permissions.CAMERA)
        if(result.status !== 'granted'){
            Alert.alert('Insufficient permissions!', 'You need to allow camera in this app.', [{text:'OK'}])
            return false;
        }

        return true
    }

    const takeImageHandler = async () =>{
        const hasPermission = await verifyPermissions()
        if(!hasPermission){
            return;
        }
        
        ImagePicker.launchCameraAsync();
    }

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                <Text >No image picked yet.</Text>
                <Image style={styles.image}/>
            </View>
            <Button title='Take Image' color={Colors.primary} onPress={takeImageHandler}/>
        </View>
    )
}

export default ImgPicker

const styles = StyleSheet.create({
    imagePicker:{
        alignItems: 'center'
    },
    imagePreview:{
        width:'100%',
        height:200,
        marginBottom:10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image:{
        width:'100%',
        height:'100%'
    }
})
