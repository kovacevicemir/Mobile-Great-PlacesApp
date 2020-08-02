import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../helpers/db";

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
export const addPlace = (title, image) => {
  return async (dispatch) => {
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
        "Dummy address",
        15.6,
        12.3
      );
      console.log(dbResult);
      dispatch({
        type: ADD_PLACE,
        payload: { id: dbResult.insertId, title: title, image: newPath },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
