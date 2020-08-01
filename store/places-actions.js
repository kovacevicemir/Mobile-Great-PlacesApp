import * as FileSystem from "expo-file-system";

//ACTIONS

export const ADD_PLACE = "ADD_PLACE";

//ACTION CREATORS

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
    } catch (err) {
      console.log(error);
      throw err;
    }

    dispatch({ type: ADD_PLACE, payload: { title: title, image: newPath } });
  };
};
