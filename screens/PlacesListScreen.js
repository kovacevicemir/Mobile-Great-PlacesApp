import React, {useEffect} from "react";
import { StyleSheet, Platform, FlatList} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import PlaceItem from "../components/PlaceItem";
import * as placesActions from '../store/places-actions'

const PlacesListScreen = (props) => {
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(placesActions.setPlaces())
  },[dispatch])

  return (
      <FlatList
        data={places}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <PlaceItem
            image={itemData.item.imageUrl}
            onSelect={() => {
                props.navigation.navigate("PlaceDetail", {
                  placeTitle: itemData.item.title,
                  placeId: itemData.item.id,
                });
              }}
            title={itemData.item.title}
            address={itemData.item.address}
            keyExtractor={item => item.id.toString()}
          />
        )}
      />
  );
};

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Places",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("NewPlace");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default PlacesListScreen;

const styles = StyleSheet.create({});
