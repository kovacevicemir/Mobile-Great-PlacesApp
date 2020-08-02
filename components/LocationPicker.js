import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";

//style={styles.something}
const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);
  
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to allow location permissions in this app.",
        [{ text: "OK" }]
      );
      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });

      console.log(location);
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Could not fetch location1",
        "Please try again later or pick a location on the map",
        [{ text: "OK" }]
      );
    }

    setIsFetching(false);
  };


  //pick on map
  const pickOnMapHandler = () =>{
    props.navigation.navigate('Map');
  }


  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={pickOnMapHandler}>
        <View style={styles.mapPreview}>
          {isFetching ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <Text>No location chosen yet!</Text>
          )}
        </View>
      </MapPreview>

      {/* buttons */}
      <View style={styles.actions}>
        <Button
            title="Get User Location"
            color={Colors.primary}
            onPress={getLocationHandler}
        />
        <Button
            title="Pick on Map"
            color={Colors.primary}
            onPress={pickOnMapHandler}
        />
      </View>
      
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  actions:{
      flexDirection:'row',
      justifyContent:'space-around',
      width:'100%'
  }
});
