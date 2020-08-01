//REDUCER
import Place from '../models/Place'
import { ADD_PLACE } from "./places-actions";



const initialState ={
    places: []
}

export default (state = initialState, action) =>{
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(
                new Date().toString(),
                action.payload.title
            )
            const updated_places = state.places.concat(newPlace)
            return {
                places:updated_places
            }
        default:
            return state;
    }
}