import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../helpers/db";
import ENV from "../env";

//ACTIONS

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

//ACTION CREATORS

//@GETall
export const setPlaces = () => {
  return async (dispatch) => {
    try {
      const places = await fetchPlaces();
      dispatch({ type: SET_PLACES, payload: places.rows._array });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

//@addplace
export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    //getting geolocation
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
    );

    if (!response.ok) {
      throw new Error("something went wrong geo location pt1");
    }

    const resData = await response.json();
    console.log('THIS IS resData!', resData)

    // if (!resData.ok) {
    //   throw new Error("something went wrong geo location pt2");
    // }

    const address = resData.results[0].formatted_address;

    //1 FILE NAME & FILE PATH
    //it splits image uri by / into array, and it takes last element with pop()
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    //2 MOVE FILE
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });

      //add to sqlite
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );
      console.log(dbResult);
      dispatch({
        type: ADD_PLACE,
        payload: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
          address,
          coords: { lat: location.lat, lng: location.lng },
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
