import React from 'react'
import { StyleSheet, Text, View, Dimensions  } from 'react-native'
import MapView from 'react-native-maps';

const MapScreen = (props) => {

    const mapRegion = {
        latitude: 37.7,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    return (
        
        <View style={styles.container}>
            <MapView style={styles.mapStyle} region={mapRegion} />
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
