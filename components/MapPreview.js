import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import ENV from "../env";

const apikey = ENV.googleApiKey;

const MapPreview = (props) => {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${apikey}`;
  } 

  return (
    <TouchableOpacity onPress={props.onPress} style={{...styles.mapPreview, ...props.style}}>
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};


export default MapPreview;

const styles = StyleSheet.create({
    mapPreview:{
        justifyContent:'center',
        alignItems:'center'
    },
    mapImage:{
        width:'100%',
        height:'100%'
    }
});
