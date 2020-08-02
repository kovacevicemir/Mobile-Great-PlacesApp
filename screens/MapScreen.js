import React, { useState, useEffect, useCallback} from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";

const MapScreen = (props) => {
  const [selectedLocation, setSelectedLocation] = useState();

  const mapRegion = {
    latitude: 37.7,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const savePickedLocation = useCallback(() =>{
    if(!selectedLocation){
        return;
    }
    props.navigation.navigate('NewPlace',{pickedLocation:selectedLocation});
  },[selectedLocation])

  useEffect(()=>{
      props.navigation.setParams({saveLocation:savePickedLocation})
  },[savePickedLocation])

  let markerCoordinates;
  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <View style={styles.container}>
      <MapView
        onPress={selectLocationHandler}
        style={styles.mapStyle}
        region={mapRegion}
      >
        {markerCoordinates && (
          <Marker
            title="Picked Location"
            coordinate={markerCoordinates}
          ></Marker>
        )}
      </MapView>
    </View>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveFn = navData.navigation.getParam('saveLocation');
  return {
    headerRight: (
      <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    ),
  };
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  headerButton:{
      marginHorizontal:20,
  },
  headerButtonText:{
      fontSize:16,
      color: Platform.OS === 'android' ? 'white' : Colors.primary
  }
});
